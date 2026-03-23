#!/usr/bin/env node
import { readFileSync, readdirSync, statSync, mkdtempSync, rmSync } from 'fs';
import { join, basename } from 'path';
import { execSync } from 'child_process';
import { tmpdir } from 'os';

const REGISTRY_URL = process.env.REGISTRY_URL || 'https://expxagents-marketplace-production.up.railway.app';
const API_KEY = process.env.REGISTRY_API_KEY;
const SCOPE = process.env.REGISTRY_SCOPE;
const DRY_RUN = process.argv.includes('--dry-run');

if (!API_KEY && !DRY_RUN) {
  console.error('ERROR: REGISTRY_API_KEY env var is required');
  console.error('Usage: REGISTRY_API_KEY=exr_... REGISTRY_SCOPE=myorg node scripts/publish-all.js [squad-names...] [--dry-run]');
  process.exit(1);
}

if (!SCOPE) {
  console.error('ERROR: REGISTRY_SCOPE env var is required');
  process.exit(1);
}

const squadsDir = 'squads';
const filterSquads = process.argv.slice(2).filter(a => !a.startsWith('--'));

// Find squad directories (optionally filtered by CLI args)
const squadDirs = readdirSync(squadsDir)
  .map(d => join(squadsDir, d))
  .filter(d => statSync(d).isDirectory())
  .filter(d => filterSquads.length === 0 || filterSquads.includes(basename(d)));

if (squadDirs.length === 0) {
  console.error('No squad directories found');
  process.exit(1);
}

function parseSquadYaml(content) {
  const get = (key) => {
    const match = content.match(new RegExp(`^\\s+${key}:\\s*"?([^"\\n]+)"?`, 'm'));
    return match ? match[1].trim() : null;
  };

  const tags = [];
  const tagsMatch = content.match(/tags:\s*\n((?:\s+-\s+\S+\n?)+)/);
  if (tagsMatch) {
    for (const t of tagsMatch[1].matchAll(/-\s+(\S+)/g)) {
      tags.push(t[1]);
    }
  }

  return {
    code: get('code'),
    name: get('name'),
    version: get('version'),
    description: get('description'),
    icon: get('icon'),
    category: get('category'),
    tags,
  };
}

async function publishSquad(squadDir) {
  const yamlPath = join(squadDir, 'squad.yaml');
  const content = readFileSync(yamlPath, 'utf-8');
  const manifest = parseSquadYaml(content);

  if (!manifest.code || !manifest.version) {
    console.error(`  SKIP: missing code or version in ${yamlPath}`);
    return 'skip';
  }

  const label = `@${SCOPE}/${manifest.code}@${manifest.version}`;

  if (DRY_RUN) {
    console.log(`  [dry-run] Would publish ${label}`);
    return 'ok';
  }

  console.log(`\nPublishing ${label}...`);

  // Create tarball in temp directory
  const tmpDir = mkdtempSync(join(tmpdir(), 'squad-'));
  const tarballPath = join(tmpDir, `${manifest.code}.tgz`);

  try {
    execSync(`tar -czf "${tarballPath}" -C "${squadsDir}" "${basename(squadDir)}"`, { stdio: 'pipe' });

    const tarballBuffer = readFileSync(tarballPath);

    const buildForm = () => {
      const form = new FormData();
      form.append('tarball', new Blob([tarballBuffer], { type: 'application/gzip' }), `${manifest.code}.tgz`);
      form.append('manifest', JSON.stringify(manifest));
      return form;
    };

    // Try PUT (existing squad) first
    let response = await fetch(`${REGISTRY_URL}/api/squads/@${SCOPE}/${manifest.code}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${API_KEY}` },
      body: buildForm(),
    });

    // If squad doesn't exist yet, POST to create it
    if (response.status === 404) {
      response = await fetch(`${REGISTRY_URL}/api/squads`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${API_KEY}` },
        body: buildForm(),
      });
    }

    const result = await response.json();

    if (response.ok) {
      console.log(`  OK: ${label}`);
      return 'ok';
    }

    if (result.code === 'VERSION_EXISTS') {
      console.log(`  SKIP: ${label} (already published)`);
      return 'skip';
    }

    console.error(`  FAIL: ${result.message || response.statusText}`);
    return 'fail';
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

// Main
console.log(`Registry: ${REGISTRY_URL}`);
console.log(`Scope:    @${SCOPE}`);
console.log(`Squads:   ${squadDirs.length}${DRY_RUN ? ' (dry-run)' : ''}`);

let ok = 0;
let skip = 0;
let fail = 0;

for (const squadDir of squadDirs) {
  const result = await publishSquad(squadDir);
  if (result === 'ok') ok++;
  else if (result === 'skip') skip++;
  else fail++;
}

console.log(`\n${'='.repeat(40)}`);
console.log(`Published: ${ok} | Skipped: ${skip} | Failed: ${fail}`);
process.exit(fail > 0 ? 1 : 0);
