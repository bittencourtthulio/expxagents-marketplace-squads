# Marketing Web Squads Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Tasks 1-3 are independent and can be dispatched in parallel.

**Goal:** Create 3 marketing squads (institutional-web-squad, landing-page-squad, sales-page-squad) with 24 total agent files for web page strategy and design.

**Architecture:** Each squad is a self-contained directory under `squads/` with a `squad.yaml`, 8 agent `.md` files (1 chief + 7 specialists), and a `_memory/memories.md`. All agents produce strategic deliverables (no code). Bilingual — agents respond in the user's language.

**Tech Stack:** YAML for squad config, Markdown with YAML frontmatter for agent definitions.

**Spec:** `docs/superpowers/specs/2026-03-22-marketing-web-squads-design.md`

**Reference templates:**
- Chief agent template: `squads/brand-squad/agents/brand-chief.agent.md`
- Specialist agent template: `squads/brand-squad/agents/positioning-specialist.agent.md`
- Squad YAML template: `squads/brand-squad/squad.yaml`

---

## Task 1: Create institutional-web-squad (parallelizable)

**Files:**
- Create: `squads/institutional-web-squad/squad.yaml`
- Create: `squads/institutional-web-squad/_memory/memories.md`
- Create: `squads/institutional-web-squad/agents/institutional-web-chief.agent.md`
- Create: `squads/institutional-web-squad/agents/information-architect.agent.md`
- Create: `squads/institutional-web-squad/agents/ux-strategist.agent.md`
- Create: `squads/institutional-web-squad/agents/ui-art-director.agent.md`
- Create: `squads/institutional-web-squad/agents/content-strategist.agent.md`
- Create: `squads/institutional-web-squad/agents/seo-specialist.agent.md`
- Create: `squads/institutional-web-squad/agents/brand-alignment-specialist.agent.md`
- Create: `squads/institutional-web-squad/agents/web-analytics-planner.agent.md`

**Context:**
- base_agent: `web-strategist` for all agents
- icon: `globe` for chief
- Chief Calibration from spec lines 74-78
- Routing Matrix from spec lines 205-214
- All agent roles, frameworks, and expected outputs are defined in spec lines 197-286

**Instructions:**

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p squads/institutional-web-squad/agents squads/institutional-web-squad/_memory
```

- [ ] **Step 2: Create `_memory/memories.md`**

Create empty file at `squads/institutional-web-squad/_memory/memories.md`.

- [ ] **Step 3: Create `squad.yaml`**

Copy the complete YAML from the spec (lines 100-193) exactly as written into `squads/institutional-web-squad/squad.yaml`.

- [ ] **Step 4: Create chief agent `institutional-web-chief.agent.md`**

Read `squads/brand-squad/agents/brand-chief.agent.md` for the full structural template. Create `squads/institutional-web-squad/agents/institutional-web-chief.agent.md` following the exact same structure:

Frontmatter:
```yaml
---
base_agent: web-strategist
id: "squads/institutional-web-squad/agents/institutional-web-chief"
name: "Web Strategist Chief"
icon: globe
execution: inline
skills:
  - web_search
  - web_fetch
---
```

Sections to write (following brand-chief.agent.md structure):
- `## Role` — from spec line 201
- `## Calibration` — from spec lines 74-78
- `## Instructions` — 8 numbered instructions following brand-chief pattern: (1) receive/restate briefing, (2) diagnose site type, (3) select specialists using routing matrix, (4) invoke specialists, (5) identify convergence and tension, (6) synthesize web strategy, (7) define site architecture and hierarchy, (8) provide implementation roadmap
- `## Routing Matrix` — from spec lines 205-214
- `## Expected Input` — website briefing examples (new site, redesign, portfolio, corporate, etc.)
- `## Expected Output` — full markdown report template following brand-chief pattern, adapted for web strategy: Executive Summary, Specialist Perspectives, Site Architecture Synthesis (convergence/tensions), Site Architecture (sitemap, navigation, page hierarchy), Content Strategy, Visual Direction, Implementation Roadmap (30/90/365 days), Risk Watch
- `## Quality Criteria` — 6 bullets following brand-chief pattern
- `## Anti-Patterns` — 6 bullets following brand-chief pattern

- [ ] **Step 5: Create 7 specialist agents**

For each specialist, read `squads/brand-squad/agents/positioning-specialist.agent.md` for the structural template. Create each file following the same structure.

Each specialist needs:
- YAML frontmatter with `base_agent: web-strategist`, full `id` path, correct `name`, `icon`, `execution: inline`, `skills`
- `## Role` — from the spec's role description
- `## Calibration` — 4 bullets (Style, Approach, Language: "Respond in the user's language", Tone) derived from the chief's calibration adapted to the specialist's domain
- `## Instructions` — 6-8 numbered instructions specific to the specialist's domain
- `## Expected Input` — what the chief sends to this specialist
- `## Expected Output` — full markdown report template with tables/sections like positioning-specialist has
- `## Quality Criteria` — 5-6 bullets
- `## Anti-Patterns` — 5-6 bullets

Specialists to create (use spec for Role, Key Frameworks, and Expected Output descriptions):

1. `information-architect.agent.md` — icon: `sitemap`
2. `ux-strategist.agent.md` — icon: `users`
3. `ui-art-director.agent.md` — icon: `paintbrush`
4. `content-strategist.agent.md` — icon: `file-text`
5. `seo-specialist.agent.md` — icon: `search`
6. `brand-alignment-specialist.agent.md` — icon: `check-circle`
7. `web-analytics-planner.agent.md` — icon: `bar-chart`

- [ ] **Step 6: Validate**

```bash
node scripts/validate.js
```

Expected: `squads/institutional-web-squad` passes with all 8 agent files found, 0 errors.

- [ ] **Step 7: Commit**

```bash
git add squads/institutional-web-squad/
git commit -m "feat: add institutional-web-squad (8 agents)"
```

---

## Task 2: Create landing-page-squad (parallelizable)

**Files:**
- Create: `squads/landing-page-squad/squad.yaml`
- Create: `squads/landing-page-squad/_memory/memories.md`
- Create: `squads/landing-page-squad/agents/landing-page-chief.agent.md`
- Create: `squads/landing-page-squad/agents/conversion-architect.agent.md`
- Create: `squads/landing-page-squad/agents/persuasion-copywriter.agent.md`
- Create: `squads/landing-page-squad/agents/cro-specialist.agent.md`
- Create: `squads/landing-page-squad/agents/landing-ux-designer.agent.md`
- Create: `squads/landing-page-squad/agents/social-proof-strategist.agent.md`
- Create: `squads/landing-page-squad/agents/lead-magnet-architect.agent.md`
- Create: `squads/landing-page-squad/agents/ab-testing-planner.agent.md`

**Context:**
- base_agent: `conversion-strategist` for all agents
- icon: `target` for chief
- Chief Calibration from spec lines 80-84
- Routing Matrix from spec lines 399-408
- All agent roles, frameworks, and expected outputs are defined in spec lines 391-480

**Instructions:**

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p squads/landing-page-squad/agents squads/landing-page-squad/_memory
```

- [ ] **Step 2: Create `_memory/memories.md`**

Create empty file at `squads/landing-page-squad/_memory/memories.md`.

- [ ] **Step 3: Create `squad.yaml`**

Copy the complete YAML from the spec (lines 294-387) exactly as written into `squads/landing-page-squad/squad.yaml`.

- [ ] **Step 4: Create chief agent `landing-page-chief.agent.md`**

Frontmatter:
```yaml
---
base_agent: conversion-strategist
id: "squads/landing-page-squad/agents/landing-page-chief"
name: "Conversion Strategist Chief"
icon: target
execution: inline
skills:
  - web_search
  - web_fetch
---
```

Sections (following brand-chief structure):
- `## Role` — from spec line 395
- `## Calibration` — from spec lines 80-84
- `## Instructions` — 8 numbered: (1) receive/restate conversion briefing, (2) diagnose conversion objective and audience awareness level (Schwartz levels), (3) select specialists, (4) invoke specialists, (5) identify convergence/tension, (6) synthesize landing page strategy, (7) define page architecture and conversion flow, (8) provide testing and optimization roadmap
- `## Routing Matrix` — from spec lines 399-408
- `## Expected Input` — landing page briefing examples (lead capture, webinar, download, free trial, etc.)
- `## Expected Output` — full markdown report template: Executive Summary, Specialist Perspectives, Landing Page Strategy Synthesis (convergence/tensions), Page Architecture (block-by-block structure), Copy Framework (headlines, CTAs), Visual Direction, Social Proof Strategy, Testing Roadmap, Conversion Metrics & KPIs
- `## Quality Criteria` — 6 bullets
- `## Anti-Patterns` — 6 bullets

- [ ] **Step 5: Create 7 specialist agents**

Same structure as Task 1 Step 5, but with `base_agent: conversion-strategist`.

Specialists:
1. `conversion-architect.agent.md` — icon: `layout`
2. `persuasion-copywriter.agent.md` — icon: `edit`
3. `cro-specialist.agent.md` — icon: `trending-up`
4. `landing-ux-designer.agent.md` — icon: `monitor`
5. `social-proof-strategist.agent.md` — icon: `star`
6. `lead-magnet-architect.agent.md` — icon: `gift`
7. `ab-testing-planner.agent.md` — icon: `git-branch`

- [ ] **Step 6: Validate**

```bash
node scripts/validate.js
```

Expected: `squads/landing-page-squad` passes with all 8 agent files found, 0 errors.

- [ ] **Step 7: Commit**

```bash
git add squads/landing-page-squad/
git commit -m "feat: add landing-page-squad (8 agents)"
```

---

## Task 3: Create sales-page-squad (parallelizable)

**Files:**
- Create: `squads/sales-page-squad/squad.yaml`
- Create: `squads/sales-page-squad/_memory/memories.md`
- Create: `squads/sales-page-squad/agents/sales-page-chief.agent.md`
- Create: `squads/sales-page-squad/agents/offer-architect.agent.md`
- Create: `squads/sales-page-squad/agents/sales-copywriter.agent.md`
- Create: `squads/sales-page-squad/agents/objection-handler.agent.md`
- Create: `squads/sales-page-squad/agents/sales-ux-designer.agent.md`
- Create: `squads/sales-page-squad/agents/vsl-strategist.agent.md`
- Create: `squads/sales-page-squad/agents/urgency-strategist.agent.md`
- Create: `squads/sales-page-squad/agents/launch-strategist.agent.md`

**Context:**
- base_agent: `sales-strategist` for all agents
- icon: `dollar-sign` for chief
- Chief Calibration from spec lines 86-90
- Routing Matrix from spec lines 593-602
- All agent roles, frameworks, and expected outputs are defined in spec lines 585-674
- Note: `offer-architect` and `launch-strategist` IDs overlap with hormozi-squad — this is intentional (directory-scoped)

**Instructions:**

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p squads/sales-page-squad/agents squads/sales-page-squad/_memory
```

- [ ] **Step 2: Create `_memory/memories.md`**

Create empty file at `squads/sales-page-squad/_memory/memories.md`.

- [ ] **Step 3: Create `squad.yaml`**

Copy the complete YAML from the spec (lines 488-581) exactly as written into `squads/sales-page-squad/squad.yaml`.

- [ ] **Step 4: Create chief agent `sales-page-chief.agent.md`**

Frontmatter:
```yaml
---
base_agent: sales-strategist
id: "squads/sales-page-squad/agents/sales-page-chief"
name: "Sales Page Architect Chief"
icon: dollar-sign
execution: inline
skills:
  - web_search
  - web_fetch
---
```

Sections (following brand-chief structure):
- `## Role` — from spec line 589
- `## Calibration` — from spec lines 86-90
- `## Instructions` — 8 numbered: (1) receive/restate sales challenge, (2) diagnose sale type and audience temperature (cold/warm/hot), (3) select specialists, (4) invoke specialists, (5) identify convergence/tension, (6) synthesize sales page strategy, (7) define offer architecture and page structure, (8) provide launch/optimization roadmap
- `## Routing Matrix` — from spec lines 593-602
- `## Expected Input` — sales page briefing examples (evergreen, launch, high-ticket, low-ticket, webinar replay, etc.)
- `## Expected Output` — full markdown report template: Executive Summary, Specialist Perspectives, Sales Page Strategy Synthesis (convergence/tensions), Offer Architecture (value stack, pricing, guarantee), Copy Framework (lead, story, body, close), Visual Direction, VSL Strategy (when applicable), Urgency & Scarcity Strategy, Launch Sequence (when applicable), Conversion Projections, Risk Watch
- `## Quality Criteria` — 6 bullets
- `## Anti-Patterns` — 6 bullets

- [ ] **Step 5: Create 7 specialist agents**

Same structure as Task 1 Step 5, but with `base_agent: sales-strategist`.

Specialists:
1. `offer-architect.agent.md` — icon: `package`
2. `sales-copywriter.agent.md` — icon: `pen-tool`
3. `objection-handler.agent.md` — icon: `shield`
4. `sales-ux-designer.agent.md` — icon: `smartphone`
5. `vsl-strategist.agent.md` — icon: `video`
6. `urgency-strategist.agent.md` — icon: `clock`
7. `launch-strategist.agent.md` — icon: `rocket`

- [ ] **Step 6: Validate**

```bash
node scripts/validate.js
```

Expected: `squads/sales-page-squad` passes with all 8 agent files found, 0 errors.

- [ ] **Step 7: Commit**

```bash
git add squads/sales-page-squad/
git commit -m "feat: add sales-page-squad (8 agents)"
```

---

## Task 4: Final validation and cleanup

**Files:**
- Read: `scripts/validate.js`

- [ ] **Step 1: Run full validation across all squads**

```bash
node scripts/validate.js
```

Expected: All squads pass validation, 0 errors. Note: brand-squad has 10 agents but these new squads each have 8 — follow the structural template from brand-squad, not the agent count.

- [ ] **Step 2: Verify file counts**

```bash
ls squads/institutional-web-squad/agents/ | wc -l   # Expected: 8
ls squads/landing-page-squad/agents/ | wc -l        # Expected: 8
ls squads/sales-page-squad/agents/ | wc -l          # Expected: 8
```

- [ ] **Step 3: Spot-check agent file structure**

Read one chief and one specialist from each squad to verify they have all required sections:
- YAML frontmatter (base_agent, id, name, icon, execution, skills)
- ## Role
- ## Calibration (Style, Approach, Language, Tone)
- ## Instructions (6-8 numbered)
- ## Routing Matrix (chiefs only)
- ## Expected Input
- ## Expected Output (with markdown template)
- ## Quality Criteria (5-6 bullets)
- ## Anti-Patterns (5-6 bullets)

If any section is missing, fix it before proceeding.

- [ ] **Step 4: Update spec status**

Change the spec status from "Review" to "Implemented":

```
docs/superpowers/specs/2026-03-22-marketing-web-squads-design.md
```

Edit line 5: `**Status:** Review` → `**Status:** Implemented`

- [ ] **Step 5: Commit status update**

```bash
git add docs/superpowers/specs/2026-03-22-marketing-web-squads-design.md
git commit -m "docs: mark marketing web squads spec as implemented"
```
