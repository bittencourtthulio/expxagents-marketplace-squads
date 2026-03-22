#!/usr/bin/env node
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';

const VALID_CATEGORIES = [
  'development', 'marketing', 'commercial', 'support',
  'hr', 'finance', 'operations', 'general'
];

let errors = 0;
const squadsDir = 'squads';

// Find all squad directories
const squadDirs = readdirSync(squadsDir)
  .map(d => join(squadsDir, d))
  .filter(d => statSync(d).isDirectory());

if (squadDirs.length === 0) {
  console.error('No squad directories found');
  process.exit(1);
}

for (const squadDir of squadDirs) {
  const yamlPath = join(squadDir, 'squad.yaml');
  console.log(`\nValidating ${yamlPath}...`);

  if (!existsSync(yamlPath)) {
    console.error(`  ERROR: missing squad.yaml`);
    errors++;
    continue;
  }

  const content = readFileSync(yamlPath, 'utf-8');

  // Check squad: wrapper
  if (!content.match(/^squad:/m)) {
    console.error(`  ERROR: missing top-level 'squad:' key`);
    errors++;
  }

  // Check required fields (indented under squad:)
  for (const field of ['code:', 'name:', 'description:', 'agents:', 'pipeline:']) {
    if (!content.includes(field)) {
      console.error(`  ERROR: missing required field '${field.replace(':', '')}'`);
      errors++;
    }
  }

  // Check category
  const categoryMatch = content.match(/category:\s*(\S+)/);
  if (categoryMatch) {
    const cat = categoryMatch[1];
    if (!VALID_CATEGORIES.includes(cat)) {
      console.error(`  ERROR: invalid category '${cat}'`);
      errors++;
    }
  }

  // Check agent prompt files exist
  const promptMatches = content.matchAll(/prompt:\s*(\S+)/g);
  for (const match of promptMatches) {
    const promptPath = join(squadDir, match[1]);
    if (!existsSync(promptPath)) {
      console.error(`  ERROR: agent file not found: ${promptPath}`);
      errors++;
    } else {
      console.log(`  OK: ${match[1]}`);
    }
  }
}

console.log(`\n${'='.repeat(40)}`);
console.log(`Squads validated: ${squadDirs.length}`);
console.log(`${errors === 0 ? 'All validations passed!' : `${errors} error(s) found.`}`);
process.exit(errors > 0 ? 1 : 0);
