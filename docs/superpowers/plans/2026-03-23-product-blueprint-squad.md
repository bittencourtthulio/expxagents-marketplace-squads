# Product Blueprint Squad Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the product-blueprint-squad (6 agents) for the expxagents marketplace — a squad that receives product briefings and delivers a Product Blueprint Report + HTML one-pager.

**Architecture:** Sequential pipeline of 6 agents (Blueprint Chief → Market Researcher → Value Architect → Product Modeler → MVP Strategist → Blueprint Visual Designer) with a quality checkpoint before HTML generation. Each agent inherits from `product-strategist` base agent and follows the exact file format of the landing-page-squad.

**Tech Stack:** Markdown agent definitions (YAML frontmatter + structured instructions), YAML squad configuration. No runtime code — agents are prompt definitions.

**Spec:** `docs/superpowers/specs/2026-03-23-product-blueprint-squad-design.md`

**Reference:** `squads/landing-page-squad/` (file format, frontmatter structure, agent conventions)

---

## File Structure

```
squads/product-blueprint-squad/
├── squad.yaml                              # Squad manifest and pipeline config
├── _memory/
│   └── memories.md                         # Squad-specific shared memory (empty template)
└── agents/
    ├── blueprint-chief.agent.md            # Orchestrator — diagnoses, routes, synthesizes
    ├── market-researcher.agent.md          # Market analysis, personas, competitors
    ├── value-architect.agent.md            # Value proposition, positioning, business model
    ├── product-modeler.agent.md            # Product modules, user journey, dependencies
    ├── mvp-strategist.agent.md             # MoSCoW prioritization, MVP definition, roadmap
    └── blueprint-visual-designer.agent.md  # HTML one-pager generation
```

---

### Task 0: Add "strategy" to validate.js valid categories

**Files:**
- Modify: `scripts/validate.js:5-8`

The validate.js script only allows: development, marketing, commercial, support, hr, finance, operations, general. The product-blueprint-squad uses `category: strategy`, which must be added.

- [ ] **Step 1: Add "strategy" to VALID_CATEGORIES**

In `scripts/validate.js`, line 5-8, add `'strategy'` to the array:

```javascript
const VALID_CATEGORIES = [
  'development', 'marketing', 'commercial', 'support',
  'hr', 'finance', 'operations', 'general', 'strategy'
];
```

- [ ] **Step 2: Run validate to confirm it passes with existing squads**

```bash
node scripts/validate.js
```

Expected: no errors (existing squads should still pass).

- [ ] **Step 3: Commit**

```bash
git add scripts/validate.js
git commit -m "feat: add strategy to valid squad categories"
```

---

### Task 1: Create squad directory structure and squad.yaml

**Files:**
- Create: `squads/product-blueprint-squad/squad.yaml`
- Create: `squads/product-blueprint-squad/_memory/memories.md`

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p squads/product-blueprint-squad/agents
mkdir -p squads/product-blueprint-squad/_memory
```

- [ ] **Step 2: Create _memory/memories.md**

```markdown
# Product Blueprint Squad — Shared Memory

<!-- Squad-specific memories and learnings will be stored here -->
<!-- Format: date, context, learning -->
```

- [ ] **Step 3: Create squad.yaml**

Write the full squad.yaml following the spec (Section 3). Must match the landing-page-squad convention exactly:

```yaml
squad:
  code: product-blueprint-squad
  name: Product Blueprint Squad
  description: "Strategic product architecture — from briefing to blueprint. Personas, value proposition, modules, user journey, MVP prioritization, and a visual HTML one-pager for stakeholders and dev teams."
  icon: layers
  version: "1.0.0"
  category: strategy
  tags:
    - product
    - blueprint
    - strategy
    - mvp
    - product-design
    - roadmap
    - personas
    - value-proposition

  company: "_expxagents/_memory/company.md"
  preferences: "_expxagents/_memory/preferences.md"
  memory: "_memory/memories.md"

  target_audience: "Product managers, founders, CTOs, product designers, and teams structuring new products or pivoting existing ones"
  platform: "Report"
  format: "product-blueprint"

  skills:
    - web_search
    - web_fetch
    - frontend-design

  schedule:
    enabled: true

  data: []

  agents:
    - id: blueprint-chief
      name: Product Blueprint Chief
      icon: compass
      prompt: agents/blueprint-chief.agent.md
    - id: market-researcher
      name: Market Researcher
      icon: search
      prompt: agents/market-researcher.agent.md
    - id: value-architect
      name: Value Architect
      icon: target
      prompt: agents/value-architect.agent.md
    - id: product-modeler
      name: Product Modeler
      icon: box
      prompt: agents/product-modeler.agent.md
    - id: mvp-strategist
      name: MVP Strategist
      icon: filter
      prompt: agents/mvp-strategist.agent.md
    - id: blueprint-visual-designer
      name: Blueprint Visual Designer
      icon: layout
      prompt: agents/blueprint-visual-designer.agent.md

  pipeline:
    steps:
      - id: step-01
        agent: blueprint-chief
        label: Receive briefing, diagnose product type, maturity stage, and complexity
        execution: inline
      - id: step-02
        agent: market-researcher
        label: Map market landscape, competitors, and build prioritized personas
        deliverFrom: blueprint-chief
        execution: inline
      - id: step-03
        agent: value-architect
        label: Define value proposition, positioning, value curve, and business model
        deliverFrom: blueprint-chief
        execution: inline
      - id: step-04
        agent: product-modeler
        label: Map product modules with justification and design user journey
        deliverFrom: blueprint-chief
        execution: inline
      - id: step-05
        agent: mvp-strategist
        label: Prioritize modules (MoSCoW), define MVP, and build phased roadmap
        deliverFrom: blueprint-chief
        execution: inline
      - id: step-06
        agent: blueprint-chief
        label: Synthesize Product Blueprint Report from all specialist outputs
        deliverFrom: blueprint-chief
        execution: inline
        output: product-blueprint-report.md
      - id: step-07
        agent: blueprint-chief
        label: Quality checkpoint — review report completeness before HTML generation
        deliverFrom: blueprint-chief
        execution: inline
        checkpoint: true
        on_reject: step-06
      - id: step-08
        agent: blueprint-visual-designer
        label: Generate HTML one-pager from the approved Product Blueprint Report
        deliverFrom: blueprint-chief
        execution: inline
        skill: frontend-design
        output: product-blueprint.html
```

- [ ] **Step 4: Verify squad.yaml structure matches landing-page-squad**

Compare field order and structure with `squads/landing-page-squad/squad.yaml`. Verify all required fields are present: code, name, description, icon, version, category, tags, company, preferences, memory, target_audience, platform, format, skills, schedule, data, agents, pipeline.

- [ ] **Step 5: Commit**

```bash
git add squads/product-blueprint-squad/squad.yaml squads/product-blueprint-squad/_memory/memories.md
git commit -m "feat(product-blueprint-squad): add squad.yaml and memory template"
```

---

### Task 2: Create blueprint-chief.agent.md

**Files:**
- Create: `squads/product-blueprint-squad/agents/blueprint-chief.agent.md`

- [ ] **Step 1: Write the agent file**

Follow the exact format from `squads/landing-page-squad/agents/landing-page-chief.agent.md`:

**Frontmatter:**
```yaml
---
base_agent: product-strategist
id: "squads/product-blueprint-squad/agents/blueprint-chief"
name: "Product Blueprint Chief"
icon: compass
execution: inline
skills:
  - web_search
  - web_fetch
---
```

**Sections to include (in this order):**
1. `## Role` — Orchestrating intelligence that receives product briefing, diagnoses context, routes to specialists, synthesizes Product Blueprint Report. Full paragraph describing voice, authority, scope.
2. `## Calibration` — Style, Approach, Language, Tone (from spec Section 5 base agent, with Chief-specific overrides)
3. `## Instructions` — Numbered steps (8-10 steps):
   - Step 1: Receive and restate briefing
   - Step 2: Diagnose product type, maturity, complexity, audience
   - Step 3: Apply adaptation matrix to customize specialist briefings
   - Step 4: Brief and invoke Market Researcher
   - Step 5: Brief and invoke Value Architect (with market data)
   - Step 6: Brief and invoke Product Modeler (with market + value data)
   - Step 7: Brief and invoke MVP Strategist (with modules data)
   - Step 8: Identify convergence and tensions between specialists
   - Step 9: Synthesize Product Blueprint Report (all 10 sections)
   - Step 10: Validate report against quality criteria
4. `## Adaptation Matrix` — Full table from spec (5 product types × 4 specialists)
5. `## Expected Input` — Product briefing format (from spec)
6. `## Expected Output` — Full Product Blueprint Report template (all 10 sections with markdown structure from spec Section 4.1)
7. `## Quality Criteria` — 6-10 validation points (from spec)
8. `## Anti-Patterns` — 8-12 things NOT to do (from spec + add more following landing-page-chief pattern)

**Content source:** Spec Section 4.1 (Blueprint Chief) + Section 5 (base agent calibration)

- [ ] **Step 2: Verify structure matches landing-page-chief.agent.md format**

Check: frontmatter fields match, section order matches, Expected Output uses markdown code block, Quality Criteria and Anti-Patterns are present.

- [ ] **Step 3: Commit**

```bash
git add squads/product-blueprint-squad/agents/blueprint-chief.agent.md
git commit -m "feat(product-blueprint-squad): add blueprint-chief agent"
```

---

### Task 3: Create market-researcher.agent.md

**Files:**
- Create: `squads/product-blueprint-squad/agents/market-researcher.agent.md`

- [ ] **Step 1: Write the agent file**

**Frontmatter:**
```yaml
---
base_agent: product-strategist
id: "squads/product-blueprint-squad/agents/market-researcher"
name: "Market Researcher"
icon: search
execution: inline
skills:
  - web_search
  - web_fetch
---
```

**Sections to include:**
1. `## Role` — Market analyst that maps competitive landscape, defines detailed personas using JTBD, identifies opportunities and threats. Full paragraph.
2. `## Calibration` — Style (data-driven, evidence-first), Approach (research before recommendation), Language (user's language), Tone (analytical, precise, signals estimates vs. data)
3. `## Instructions` — 7 numbered steps from spec Section 4.2
4. `## Frameworks` — JTBD, Porter simplified, Persona Canvas (brief description of each)
5. `## Expected Input` — Product briefing + Chief's diagnosis
6. `## Expected Output` — Full markdown template from spec Section 4.2 (Panorama, Análise Competitiva table, Concorrentes Indiretos, Lacunas, Personas with JTBD, Riscos)
7. `## Quality Criteria` — From spec
8. `## Anti-Patterns` — From spec (7 items)

**Content source:** Spec Section 4.2

- [ ] **Step 2: Commit**

```bash
git add squads/product-blueprint-squad/agents/market-researcher.agent.md
git commit -m "feat(product-blueprint-squad): add market-researcher agent"
```

---

### Task 4: Create value-architect.agent.md

**Files:**
- Create: `squads/product-blueprint-squad/agents/value-architect.agent.md`

- [ ] **Step 1: Write the agent file**

**Frontmatter:**
```yaml
---
base_agent: product-strategist
id: "squads/product-blueprint-squad/agents/value-architect"
name: "Value Architect"
icon: target
execution: inline
skills:
  - web_search
  - web_fetch
---
```

**Sections to include:**
1. `## Role` — Positioning strategist defining differentiation, value communication, business model viability. Full paragraph.
2. `## Calibration` — Style (strategic, framework-driven), Approach (value proposition first, then positioning, then model), Language, Tone
3. `## Instructions` — 5 numbered steps from spec Section 4.3
4. `## Frameworks` — Value Proposition Canvas (Osterwalder), Positioning Statement (April Dunford), Blue Ocean Curva de Valor
5. `## Expected Input` — Product briefing + Chief diagnosis + Market Researcher output (personas, competitive landscape)
6. `## Expected Output` — Full markdown template from spec Section 4.3 (VPC tables, Positioning Statement, Curva de Valor table, Modelo de Negócio, Promessa Central 3 variants)
7. `## Quality Criteria` — From spec
8. `## Anti-Patterns` — From spec (6 items)

**Content source:** Spec Section 4.3

- [ ] **Step 2: Commit**

```bash
git add squads/product-blueprint-squad/agents/value-architect.agent.md
git commit -m "feat(product-blueprint-squad): add value-architect agent"
```

---

### Task 5: Create product-modeler.agent.md

**Files:**
- Create: `squads/product-blueprint-squad/agents/product-modeler.agent.md`

- [ ] **Step 1: Write the agent file**

**Frontmatter:**
```yaml
---
base_agent: product-strategist
id: "squads/product-blueprint-squad/agents/product-modeler"
name: "Product Modeler"
icon: box
execution: inline
skills:
  - web_search
  - web_fetch
---
```

**Sections to include:**
1. `## Role` — Product architect transforming strategy into tangible structure. Maps modules with justification, designs user journey. Full paragraph.
2. `## Calibration` — Style (structural, systems-thinker), Approach (personas and value prop first, then modules, then journey), Language, Tone
3. `## Instructions` — 6 numbered steps from spec Section 4.4
4. `## Frameworks` — User Story Mapping (Jeff Patton), RICE simplificado, JTBD por módulo
5. `## Product Type Adaptation` — How module language changes per product type (SaaS → features/screens, Infoproduct → content modules, Physical → components, Service → delivery stages, Marketplace → seller/buyer experiences). From spec.
6. `## Expected Input` — Product briefing + Chief diagnosis + Market Researcher output + Value Architect output
7. `## Expected Output` — Full markdown template from spec Section 4.4 (Mapa de Módulos table with RICE, Dependências, Jornada do Usuário table, Aha Moment, Classificação Core/Auxiliar/Diferenciador)
8. `## Quality Criteria` — From spec
9. `## Anti-Patterns` — From spec (7 items)

**Content source:** Spec Section 4.4

- [ ] **Step 2: Commit**

```bash
git add squads/product-blueprint-squad/agents/product-modeler.agent.md
git commit -m "feat(product-blueprint-squad): add product-modeler agent"
```

---

### Task 6: Create mvp-strategist.agent.md

**Files:**
- Create: `squads/product-blueprint-squad/agents/mvp-strategist.agent.md`

- [ ] **Step 1: Write the agent file**

**Frontmatter:**
```yaml
---
base_agent: product-strategist
id: "squads/product-blueprint-squad/agents/mvp-strategist"
name: "MVP Strategist"
icon: filter
execution: inline
skills:
  - web_search
  - web_fetch
---
```

**Sections to include:**
1. `## Role` — Prioritization strategist defining MVP scope, phased roadmap, hypothesis validation. Full paragraph.
2. `## Calibration` — Style (lean, hypothesis-driven), Approach (prioritization first, then phasing, then validation), Language, Tone
3. `## Instructions` — 7 numbered steps from spec Section 4.5
4. `## Frameworks` — MoSCoW, Riskiest Assumption Test (RAT), Build-Measure-Learn (Lean Startup)
5. `## Expected Input` — Product briefing + Chief diagnosis + all prior specialist outputs (especially Product Modeler's module map with RICE scores)
6. `## Expected Output` — Full markdown template from spec Section 4.5 (MoSCoW table, MVP Definition, RAT, Roadmap Faseado 3 phases with transition criteria, Armadilhas de Escopo table)
7. `## Quality Criteria` — From spec
8. `## Anti-Patterns` — From spec (7 items)

**Content source:** Spec Section 4.5

- [ ] **Step 2: Commit**

```bash
git add squads/product-blueprint-squad/agents/mvp-strategist.agent.md
git commit -m "feat(product-blueprint-squad): add mvp-strategist agent"
```

---

### Task 7: Create blueprint-visual-designer.agent.md

**Files:**
- Create: `squads/product-blueprint-squad/agents/blueprint-visual-designer.agent.md`

- [ ] **Step 1: Write the agent file**

This is the most detailed agent — it contains all CSS-level implementation specs. Follow the same depth as `squads/landing-page-squad/agents/landing-ux-designer.agent.md`.

**Frontmatter:**
```yaml
---
base_agent: product-strategist
id: "squads/product-blueprint-squad/agents/blueprint-visual-designer"
name: "Blueprint Visual Designer"
icon: layout
execution: inline
skills:
  - frontend-design
---
```

**Sections to include:**
1. `## Role` — Designer generating HTML one-pager that serves as pitch for stakeholders AND technical reference for dev team. Uses same visual patterns as landing-page-squad but for informational/documentary content, not conversion. Full paragraph.
2. `## Calibration` — Style (visual, detail-oriented, implementation-grade), Approach (content structure first, then visual design, then interactivity), Language, Tone
3. `## Instructions` — Numbered steps covering:
   - Receive Product Blueprint Report from Chief
   - Define named visual theme derived from product sector
   - Define typography system (2-3 fonts, clamp sizes)
   - Define color token system (CSS custom properties)
   - Build 9-section HTML page structure
   - Implement effects and interactivity
   - Ensure responsive behavior
   - Validate accessibility and performance
4. `## Technical Standards` — Single HTML, inline CSS/JS, external deps (fonts + Three.js CDN only), Lighthouse 90+, above-the-fold without JS
5. `## Aesthetic Direction` — Named theme, dark mode default, off-black, glass-morphism specs (exact CSS), multi-layer shadows, accent glow
6. `## Typography System` — 2-3 fonts rules, ALL clamp() sizes, H1 minimum, font loading
7. `## Color Token System` — CSS custom properties in :root, primary/accent/neutral/semantic, body text opacity, zero hardcoded
8. `## Page Structure` — 9 sections with detailed specs for each:
   - Hero (product name, promise, badge, animated indicators)
   - Problema & Oportunidade (pain cards, market gaps)
   - Proposta de Valor (positioning statement, value curve visual)
   - Arquitetura do Produto (module grid cards with classification badges)
   - Jornada do Usuário (timeline, aha moment highlight)
   - Personas (persona cards with JTBD)
   - Roadmap MVP (phased timeline, MoSCoW badges)
   - Riscos & Próximos Passos (risk cards, action checklist)
   - Footer (metadata, internal nav, no CTA)
9. `## Key Differences from Landing Page Squad` — No CTAs, no forms, no social proof, informational focus, data-heavy sections
10. `## Effects & Interactivity` — Scroll reveal, nav glass-morphism, stats counter, Three.js, custom cursor, scroll progress, card hover, prefers-reduced-motion
11. `## Responsive Behavior` — Breakpoints table, element behavior per breakpoint (layout, nav, Three.js, cards, timeline, cursor)
12. `## Accessibility` — Semantic HTML, heading hierarchy, WCAG AA contrast, focus-visible, skip-to-content, aria-labels, lang attribute
13. `## Navigation` — Sticky header specs (height, transparent → glass-morphism, mobile hamburger)
14. `## CTA & Button Design` — Repurposed for internal navigation buttons (not conversion CTAs). Pill shape, hover effects.
15. `## Expected Input` — Product Blueprint Report completo do Chief
16. `## Expected Output` — Single HTML file description with all 9 sections
17. `## Quality Criteria` — From spec (7 items)
18. `## Anti-Patterns` — From spec (8 items)

**Content source:** Spec Section 4.6. Use the landing-page UX Designer agent (`squads/landing-page-squad/agents/landing-ux-designer.agent.md`) as reference for CSS-level detail and section formatting.

**IMPORTANT:** This agent's instructions must contain all CSS-level specs (exact clamp values, glass-morphism CSS, animation timings, breakpoint behaviors) inline in the `.agent.md` file. Do NOT leave specs only in the design doc.

- [ ] **Step 2: Verify CSS-level specs are complete**

Check that the agent file includes:
- Exact glass-morphism CSS (background, border, backdrop-filter, border-radius)
- Exact clamp() values for typography
- Exact color token structure for :root
- Exact animation specs (IntersectionObserver, stagger timing, easing)
- Exact breakpoint values and behavior table
- Exact nav height and transition specs
- prefers-reduced-motion and Three.js degradation rules

- [ ] **Step 3: Commit**

```bash
git add squads/product-blueprint-squad/agents/blueprint-visual-designer.agent.md
git commit -m "feat(product-blueprint-squad): add blueprint-visual-designer agent"
```

---

### Task 8: Update README.md and final validation

**Files:**
- Modify: `README.md` (add product-blueprint-squad entry)

- [ ] **Step 1: Read current README.md**

Check how other squads are listed (format, columns, ordering).

- [ ] **Step 2: Add product-blueprint-squad to README.md**

Add entry in **alphabetical order** within the existing table (the README uses a flat table, not category sections). Include:
- Squad name
- Agent count (6)
- Category (strategy)
- Description

Note: Many other squads are also missing from the README — this is an existing gap, not specific to this plan.

- [ ] **Step 3: Validate all files exist**

```bash
ls -la squads/product-blueprint-squad/
ls -la squads/product-blueprint-squad/agents/
ls -la squads/product-blueprint-squad/_memory/
```

Verify all 8 files exist:
- `squad.yaml`
- `_memory/memories.md`
- `agents/blueprint-chief.agent.md`
- `agents/market-researcher.agent.md`
- `agents/value-architect.agent.md`
- `agents/product-modeler.agent.md`
- `agents/mvp-strategist.agent.md`
- `agents/blueprint-visual-designer.agent.md`

- [ ] **Step 4: Run the repo validation script**

```bash
node scripts/validate.js
```

This checks: squad.yaml structure, required fields, valid categories, and that all agent `prompt:` paths point to existing files. All squads should pass.

- [ ] **Step 5: Validate YAML syntax independently**

```bash
python3 -c "import yaml; yaml.safe_load(open('squads/product-blueprint-squad/squad.yaml'))" && echo "YAML OK"
```

- [ ] **Step 6: Commit**

```bash
git add README.md
git commit -m "docs: add product-blueprint-squad to README"
```

---

### Task 9: Dry-run publish validation

**Files:** None (read-only validation)

- [ ] **Step 1: Run publish script in dry-run mode**

```bash
node scripts/publish-all.js --dry-run product-blueprint-squad
```

Note: The script uses positional arguments for squad filtering (not `--squad` flag). It requires `REGISTRY_SCOPE` env var to be set (already in `.env`). Verify the squad is recognized and no errors occur.

- [ ] **Step 2: Fix any issues found**

If dry-run fails, fix the issue and re-run.

- [ ] **Step 3: Final commit if needed**

Only if fixes were required.
