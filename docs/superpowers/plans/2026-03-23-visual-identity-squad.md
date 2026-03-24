# Visual Identity Squad Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the visual-identity-squad with 8 agents that generates complete visual identity kits (logos, mockups, stationery, guidelines, HTML presentation) using Gemini 3 Pro Image API.

**Architecture:** Executor squad following the brand-squad pattern — one chief orchestrator dispatches specialist agents via subagents. All pipeline steps route through the chief. Gemini 3 Pro Image is called via REST API for image generation.

**Tech Stack:** YAML config, Markdown agent prompts, Gemini 3 Pro Image API, Three.js (HTML presentation), frontend-design skill

**Spec:** `docs/superpowers/specs/2026-03-23-visual-identity-squad-design.md`

**Reference files:**
- `squads/brand-squad/squad.yaml` — YAML structure reference
- `squads/brand-squad/agents/brand-chief.agent.md` — chief agent pattern (~300 lines)
- `squads/brand-squad/agents/brand-identity-designer.agent.md` — specialist agent pattern (~230 lines)

---

### Task 1: Create directory structure and squad.yaml

**Files:**
- Create: `squads/visual-identity-squad/squad.yaml`
- Create: `squads/visual-identity-squad/_memory/memories.md`
- Create: `squads/visual-identity-squad/agents/` (directory)

- [ ] **Step 1: Create directory structure**

```bash
mkdir -p squads/visual-identity-squad/agents
mkdir -p squads/visual-identity-squad/_memory
```

- [ ] **Step 2: Create empty memory file**

Create `squads/visual-identity-squad/_memory/memories.md` with empty content (single newline).

- [ ] **Step 3: Create squad.yaml**

Create `squads/visual-identity-squad/squad.yaml` following the brand-squad YAML structure exactly. Must include:

```yaml
squad:
  code: visual-identity-squad
  name: Visual Identity Squad
  description: Complete visual identity kit — logo variations, material mockups, stationery, brand guidelines, and immersive HTML presentation
  icon: palette
  version: "1.0.0"
  category: marketing
  tags:
    - visual-identity
    - logo
    - branding
    - mockup
    - brand-assets

  company: "_expxagents/_memory/company.md"
  preferences: "_expxagents/_memory/preferences.md"
  memory: "_memory/memories.md"

  target_audience: "Founders, brand managers, and designers"
  platform: "Report"
  format: "visual-identity-kit"

  skills:
    - web_search
    - web_fetch
    - frontend-design

  schedule:
    enabled: true

  data: []

  agents:
    - id: visual-identity-chief
      name: Visual Identity Chief
      icon: palette
      prompt: agents/visual-identity-chief.agent.md
    - id: prompt-engineer
      name: Prompt Engineer
      icon: wand
      prompt: agents/prompt-engineer.agent.md
    - id: logo-designer
      name: Logo Designer
      icon: pen-tool
      prompt: agents/logo-designer.agent.md
    - id: mockup-artist
      name: Mockup Artist
      icon: image
      prompt: agents/mockup-artist.agent.md
    - id: stationery-designer
      name: Stationery Designer
      icon: file-text
      prompt: agents/stationery-designer.agent.md
    - id: brand-guidelines-writer
      name: Brand Guidelines Writer
      icon: book-open
      prompt: agents/brand-guidelines-writer.agent.md
    - id: presentation-designer
      name: Presentation Designer
      icon: monitor
      prompt: agents/presentation-designer.agent.md
    - id: quality-reviewer
      name: Quality Reviewer
      icon: check-circle
      prompt: agents/quality-reviewer.agent.md

  pipeline:
    steps:
      - id: step-01
        agent: visual-identity-chief
        label: Receive visual briefing and validate Gemini API key
        execution: inline

      - id: step-02
        agent: visual-identity-chief
        label: Craft all image generation prompts for Gemini
        deliverFrom: visual-identity-chief
        execution: inline
        output: step-02-prompts.md

      - id: step-03
        agent: visual-identity-chief
        label: Generate 7 logo variations via Gemini 3 Pro Image
        deliverFrom: visual-identity-chief
        execution: inline
        output: logos/

      - id: step-04
        agent: visual-identity-chief
        label: Present logos for approval checkpoint
        deliverFrom: visual-identity-chief
        execution: inline
        checkpoint: true
        on_reject: step-02

      - id: step-05
        agent: visual-identity-chief
        label: Generate material mockups and corporate stationery
        deliverFrom: visual-identity-chief
        execution: inline
        parallel_agents: true
        output: mockups/,stationery/

      - id: step-06
        agent: visual-identity-chief
        label: Document brand usage guidelines
        deliverFrom: visual-identity-chief
        execution: inline
        output: brand-guidelines.md

      - id: step-07
        agent: visual-identity-chief
        label: Quality review of all generated assets
        deliverFrom: visual-identity-chief
        execution: inline
        checkpoint: true
        on_reject: step-05

      - id: step-08
        agent: visual-identity-chief
        label: Generate immersive HTML presentation with Three.js
        deliverFrom: visual-identity-chief
        execution: inline
        output: visual-identity-presentation.html
        skill: frontend-design

      - id: step-09
        agent: visual-identity-chief
        label: Final checkpoint, memory update, and delivery
        deliverFrom: visual-identity-chief
        execution: inline
        checkpoint: true
```

- [ ] **Step 4: Validate with npm run validate**

```bash
npm run validate
```

Expected: `All validations passed!` (will fail until agent files exist — that's ok, validates YAML structure)

- [ ] **Step 5: Commit**

```bash
git add squads/visual-identity-squad/squad.yaml squads/visual-identity-squad/_memory/memories.md
git commit -m "feat(visual-identity-squad): add squad.yaml and memory"
```

---

### Task 2: Create visual-identity-chief agent

**Files:**
- Create: `squads/visual-identity-squad/agents/visual-identity-chief.agent.md`

**Reference:** `squads/brand-squad/agents/brand-chief.agent.md` (follow same structure)

- [ ] **Step 1: Create the chief agent file**

Create `squads/visual-identity-squad/agents/visual-identity-chief.agent.md` with:

**Frontmatter:**
```yaml
---
base_agent: visual-designer
id: "squads/visual-identity-squad/agents/visual-identity-chief"
name: "Visual Identity Chief"
icon: palette
execution: inline
skills:
  - web_search
  - web_fetch
  - frontend-design
---
```

**Sections (follow brand-chief.agent.md structure):**

1. `## Role` — Orchestrator of the visual identity squad. Receives visual briefing (brand name, colors, fonts, style), validates Gemini API key, dispatches specialists, coordinates 9-step pipeline. Executor squad — does NOT do brand strategy work.

2. `## Calibration` — Style: systematic and visual-first. Approach: briefing validation first, prompt crafting second, generation third — never skip the prompt engineering step. Language: Respond in the user's language. Tone: precise and quality-obsessed.

3. `## Instructions` — 10 numbered instructions matching the 9 pipeline steps:
   1. Receive and validate briefing (brand name, hex colors for primary/secondary/accent, fonts, style/references). Check `GEMINI_API_KEY` in `.env`. Test with lightweight API call. If missing, provide setup instructions.
   2. Dispatch prompt-engineer via subagent. Collect all 15 prompts (7 logos + 5 mockups + 3 stationery). Verify prompts include hex colors, style, aspect ratios.
   3. Dispatch logo-designer via subagent. Generate 7 variations via Gemini API. Save to `output/vX/logos/`.
   4. Present 7 logo variations to user. Checkpoint approval. On reject, collect feedback and return to step-02.
   5. Dispatch mockup-artist AND stationery-designer in PARALLEL via subagents (both `run_in_background: true`). Wait for both to complete. Save to `output/vX/mockups/` and `output/vX/stationery/`.
   6. Dispatch brand-guidelines-writer via subagent. Document logo usage rules, color palette, typography, do/don't.
   7. Dispatch quality-reviewer via subagent. Validate consistency. On reject, return to step-05.
   8. Dispatch presentation-designer via subagent. Invoke `frontend-design` skill. Generate HTML with Three.js.
   9. Present all deliverables. Update memory. Final checkpoint.
   10. Deliver final package: 15 images + guidelines + prompts + HTML presentation.

4. `## Routing Matrix` — Same table from the spec (7 rows).

5. `## Gemini API Integration` — Full API call pattern from spec section 4. Include: endpoint URL, request body with `responseModalities: ["IMAGE"]`, aspect ratio table, error handling (3 retries with exponential backoff), API key validation instructions for user.

6. `## Expected Input` — Visual briefing with: brand name (required), colors — hex values for primary, secondary, accent (required), fonts (required), style/references (required), slogan (optional), existing assets (optional).

7. `## Expected Output` — Reference to deliverables tree from spec section 6.

8. `## Language & Accentuation Rules` — Same pattern as brand-chief: all outputs in user's language, accentuation rules for PT-BR, file names in English, prompts for Gemini in English.

9. `## Quality Criteria` — 6 criteria from spec.

10. `## Anti-Patterns` — 5 anti-patterns from spec.

11. `## Deliverables Per Run` — The full file tree from spec section 6.

- [ ] **Step 2: Commit**

```bash
git add squads/visual-identity-squad/agents/visual-identity-chief.agent.md
git commit -m "feat(visual-identity-squad): add visual-identity-chief agent"
```

---

### Task 3: Create prompt-engineer agent

**Files:**
- Create: `squads/visual-identity-squad/agents/prompt-engineer.agent.md`

**Reference:** `squads/brand-squad/agents/brand-identity-designer.agent.md` (specialist pattern)

- [ ] **Step 1: Create the prompt-engineer agent file**

**Frontmatter:**
```yaml
---
base_agent: visual-designer
id: "squads/visual-identity-squad/agents/prompt-engineer"
name: "Prompt Engineer"
icon: wand
execution: inline
skills:
  - web_search
---
```

**Sections:**

1. `## Role` — Specialist in crafting image generation prompts for Gemini 3 Pro Image. Ensures visual consistency across all 15 images by using consistent vocabulary, style descriptors, and color references. The quality of every generated image depends on prompt quality.

2. `## Calibration` — Style: meticulous and technically precise. Approach: systematic prompt construction — every prompt follows the same structure for consistency. Language: Respond in the user's language (but prompts always in English). Tone: detail-oriented.

3. `## Instructions` — 8 steps:
   1. Receive briefing from chief (brand name, hex colors, fonts, style, references).
   2. Define a consistent style vocabulary — a set of descriptors that will be reused across ALL prompts (e.g., "minimalist flat design", "clean vector illustration").
   3. Craft 7 logo prompts with structure: `[style] logo for [brand name], [description], [colors], [background], [aspect ratio], [negative prompt]`. Variations: main (1:1), vertical (9:16), horizontal (16:9), symbol-only (1:1), wordmark (1:1), negative/dark background (1:1), monochrome (1:1).
   4. Craft 5 mockup prompts: realistic product photography of [item] with logo applied. Items: mug (4:3), t-shirt (4:3), squeeze bottle (4:3), pen (4:3), notepad (4:3).
   5. Craft 3 stationery prompts: professional [item] design. Items: letterhead (16:9), business card (16:9), envelope (16:9).
   6. Include negative prompts where needed (no distorted text, no extra elements, no photorealistic faces).
   7. Validate all prompts reference exact hex colors from briefing.
   8. Save all prompts to `output/vX/step-02-prompts.md` in structured format.

4. `## Expected Input` — Visual briefing from chief with brand name, hex colors, fonts, style/references.

5. `## Expected Output` — Markdown document with 15 prompts organized by category (logos, mockups, stationery), each with: prompt text, target aspect ratio, target filename.

6. `## Quality Criteria` — Every prompt includes art style, exact hex colors, brand name, background type, aspect ratio. Consistent vocabulary across all prompts. Negative prompts where relevant.

7. `## Anti-Patterns` — Never write prompts in Portuguese. Never use vague color descriptions ("blue") instead of hex values. Never omit aspect ratio. Never use inconsistent style vocabulary across prompts.

- [ ] **Step 2: Commit**

```bash
git add squads/visual-identity-squad/agents/prompt-engineer.agent.md
git commit -m "feat(visual-identity-squad): add prompt-engineer agent"
```

---

### Task 4: Create logo-designer agent

**Files:**
- Create: `squads/visual-identity-squad/agents/logo-designer.agent.md`

- [ ] **Step 1: Create the logo-designer agent file**

**Frontmatter:**
```yaml
---
base_agent: visual-designer
id: "squads/visual-identity-squad/agents/logo-designer"
name: "Logo Designer"
icon: pen-tool
execution: inline
skills:
  - web_search
---
```

**Sections:**

1. `## Role` — Specialist in generating logo variations using the Gemini 3 Pro Image API. Takes crafted prompts from the prompt-engineer and executes API calls to generate 7 logo variations, handling retries and quality validation.

2. `## Calibration` — Style: execution-focused and quality-driven. Approach: systematic generation — one variation at a time, validate each before proceeding. Language: Respond in the user's language. Tone: methodical.

3. `## Instructions` — 7 steps:
   1. Read prompts from `output/vX/step-02-prompts.md`, extract the 7 logo prompts.
   2. Read `GEMINI_API_KEY` from `.env`.
   3. For each logo variation, call the Gemini 3 Pro Image API. Include full API call pattern (same as chief's Gemini section — endpoint, body with `responseModalities: ["IMAGE"]`, `imageSizeOptions`).
   4. Decode base64 response and save as PNG to `output/vX/logos/[filename].png`.
   5. Retry up to 3 times on failure (exponential backoff: 1s, 2s, 4s).
   6. If an image fails after 3 retries, log error and continue with remaining images.
   7. Report results: which images succeeded, which failed, paths saved.

   **Files to generate:**
   - `logo-main.png` (1:1)
   - `logo-vertical.png` (9:16)
   - `logo-horizontal.png` (16:9)
   - `logo-symbol.png` (1:1)
   - `logo-wordmark.png` (1:1)
   - `logo-negative.png` (1:1)
   - `logo-monochrome.png` (1:1)

4. `## Expected Input` — Prompts document from step-02 + GEMINI_API_KEY in .env.

5. `## Expected Output` — 7 PNG images in `output/vX/logos/` + generation report.

6. `## Quality Criteria` — All 7 variations generated. File names match spec exactly. Images saved as valid PNG files. Failures retried 3 times before skipping.

7. `## Anti-Patterns` — Never generate without prompts from prompt-engineer. Never skip retry logic. Never save images with wrong filenames. Never proceed silently on API errors.

- [ ] **Step 2: Commit**

```bash
git add squads/visual-identity-squad/agents/logo-designer.agent.md
git commit -m "feat(visual-identity-squad): add logo-designer agent"
```

---

### Task 5: Create mockup-artist agent

**Files:**
- Create: `squads/visual-identity-squad/agents/mockup-artist.agent.md`

- [ ] **Step 1: Create the mockup-artist agent file**

**Frontmatter:**
```yaml
---
base_agent: visual-designer
id: "squads/visual-identity-squad/agents/mockup-artist"
name: "Mockup Artist"
icon: image
execution: inline
skills:
  - web_search
---
```

**Sections:**

1. `## Role` — Specialist in generating realistic product mockups with the brand logo applied, using Gemini 3 Pro Image API. Creates photorealistic visualizations of how the brand identity looks on physical materials.

2. `## Calibration` — Style: photorealistic and product-focused. Approach: reference the approved logo and briefing colors to ensure mockups are on-brand. Language: Respond in the user's language. Tone: visual and detail-oriented.

3. `## Instructions` — 6 steps:
   1. Read mockup prompts from `output/vX/step-02-prompts.md`.
   2. Read `GEMINI_API_KEY` from `.env`.
   3. For each mockup, call Gemini 3 Pro Image API (4:3 aspect ratio for all).
   4. Save images to `output/vX/mockups/`: `mockup-mug.png`, `mockup-tshirt.png`, `mockup-squeeze.png`, `mockup-pen.png`, `mockup-notepad.png`.
   5. Retry up to 3 times on failure (exponential backoff).
   6. Report results with paths and any failures.

4. `## Expected Input` — Mockup prompts from step-02 + approved logo from step-04 + GEMINI_API_KEY.

5. `## Expected Output` — 5 PNG mockup images in `output/vX/mockups/`.

6. `## Quality Criteria` — All 5 mockups generated. Logo visible and legible on each material. Colors match briefing. Realistic product photography style.

7. `## Anti-Patterns` — Never generate mockups before logo approval. Never use prompts not crafted by prompt-engineer. Never ignore failed generations.

- [ ] **Step 2: Commit**

```bash
git add squads/visual-identity-squad/agents/mockup-artist.agent.md
git commit -m "feat(visual-identity-squad): add mockup-artist agent"
```

---

### Task 6: Create stationery-designer agent

**Files:**
- Create: `squads/visual-identity-squad/agents/stationery-designer.agent.md`

- [ ] **Step 1: Create the stationery-designer agent file**

**Frontmatter:**
```yaml
---
base_agent: visual-designer
id: "squads/visual-identity-squad/agents/stationery-designer"
name: "Stationery Designer"
icon: file-text
execution: inline
skills:
  - web_search
---
```

**Sections:**

1. `## Role` — Specialist in generating corporate stationery designs using Gemini 3 Pro Image API. Creates professional letterhead, business card, and envelope designs that apply the brand identity consistently.

2. `## Calibration` — Style: corporate and polished. Approach: professional print design sensibility — clean layouts, proper margins, brand elements placed with intention. Language: Respond in the user's language. Tone: refined and professional.

3. `## Instructions` — 6 steps:
   1. Read stationery prompts from `output/vX/step-02-prompts.md`.
   2. Read `GEMINI_API_KEY` from `.env`.
   3. For each stationery piece, call Gemini 3 Pro Image API (16:9 for all).
   4. Save images to `output/vX/stationery/`: `letterhead.png`, `business-card.png`, `envelope.png`.
   5. Retry up to 3 times on failure (exponential backoff).
   6. Report results with paths and any failures.

4. `## Expected Input` — Stationery prompts from step-02 + approved logo from step-04 + GEMINI_API_KEY.

5. `## Expected Output` — 3 PNG stationery images in `output/vX/stationery/`.

6. `## Quality Criteria` — All 3 stationery pieces generated. Professional print-ready appearance. Brand colors and logo correctly applied. Business card note: 16:9 is closest Gemini preset to standard card proportions.

7. `## Anti-Patterns` — Never generate before logo approval. Never use wrong aspect ratios. Never ignore brand color guidelines.

- [ ] **Step 2: Commit**

```bash
git add squads/visual-identity-squad/agents/stationery-designer.agent.md
git commit -m "feat(visual-identity-squad): add stationery-designer agent"
```

---

### Task 7: Create brand-guidelines-writer agent

**Files:**
- Create: `squads/visual-identity-squad/agents/brand-guidelines-writer.agent.md`

- [ ] **Step 1: Create the brand-guidelines-writer agent file**

**Frontmatter:**
```yaml
---
base_agent: visual-designer
id: "squads/visual-identity-squad/agents/brand-guidelines-writer"
name: "Brand Guidelines Writer"
icon: book-open
execution: inline
skills:
  - web_search
---
```

**Sections:**

1. `## Role` — Specialist in documenting brand usage rules. Creates a comprehensive brand guidelines document that ensures consistent application of the visual identity across all media and contexts.

2. `## Calibration` — Style: systematic and prescriptive. Approach: rules-based documentation — every guideline must be specific and actionable, not generic. Language: Respond in the user's language. Tone: authoritative and clear.

3. `## Instructions` — 7 steps:
   1. Review all generated assets (logos, mockups, stationery) and the original briefing.
   2. Document all 7 logo variations with: filename, use case, when to use, when NOT to use.
   3. Define protection area (clear space around logo) and minimum size for each variation.
   4. Document color palette: primary, secondary, accent, neutral — each with hex, RGB values, usage context.
   5. Document typography: primary font (headlines), secondary font (body), weights, sizes, hierarchy.
   6. Create Do/Don't section with specific examples of correct and incorrect logo usage.
   7. Save to `output/vX/brand-guidelines.md`.

4. `## Expected Input` — All generated assets + original visual briefing from chief.

5. `## Expected Output` — Markdown document structured as:
   ```
   # Brand Guidelines — [Brand Name]
   ## Logo Variations
   ## Protection Area & Minimum Size
   ## Color Palette
   ## Typography
   ## Do / Don't
   ```

6. `## Quality Criteria` — Every logo variation documented. Specific hex/RGB values (not color names). Actionable rules (not "maintain consistency"). Do/Don't with concrete examples.

7. `## Anti-Patterns` — Never use vague rules like "keep it clean". Never omit hex values. Never skip the Do/Don't section. Never document assets that were not generated.

- [ ] **Step 2: Commit**

```bash
git add squads/visual-identity-squad/agents/brand-guidelines-writer.agent.md
git commit -m "feat(visual-identity-squad): add brand-guidelines-writer agent"
```

---

### Task 8: Create presentation-designer agent

**Files:**
- Create: `squads/visual-identity-squad/agents/presentation-designer.agent.md`

**Reference:** Brand-chief's "Step 06 — Immersive Presentation Page" section for Three.js parameters and HTML requirements.

- [ ] **Step 1: Create the presentation-designer agent file**

**Frontmatter:**
```yaml
---
base_agent: visual-designer
id: "squads/visual-identity-squad/agents/presentation-designer"
name: "Presentation Designer"
icon: monitor
execution: inline
skills:
  - web_search
  - web_fetch
  - frontend-design
---
```

**Sections:**

1. `## Role` — Specialist in building immersive HTML presentation pages that showcase the complete visual identity kit. Uses Three.js for atmospheric 3D backgrounds and the `frontend-design` skill for production-grade UI.

2. `## Calibration` — Style: modern, immersive, and impactful. Approach: invoke `frontend-design` skill first, then build a single-file HTML page that tells the brand's visual story. Language: Respond in the user's language. Tone: visual and experiential.

3. `## Instructions` — 10 steps:
   1. Invoke `frontend-design` skill before generating any HTML.
   2. Collect all assets: 7 logos, 5 mockups, 3 stationery, brand guidelines, briefing colors.
   3. Build HTML structure with sections: Hero (3D animation + brand name), Logo Main, Logo Variations (grid), Mockups (gallery), Stationery (gallery), Brand Guidelines (summary), Final CTA.
   4. Add Three.js atmospheric background (same params as brand-squad): camera.position.z: 50, pointsMat.opacity: 0.25, lineMat.opacity: 0.06, mouse parallax 1.5x, AdditiveBlending. Colors from briefing palette. Fade on scroll.
   5. Add loading screen, scroll reveal with IntersectionObserver, progress bar, hover states, noise overlay.
   6. Make responsive for mobile.
   7. Reference images as local paths. If total base64 would exceed 2MB, use `<img src="relative/path">` references.
   8. Single-file HTML. Three.js via CDN (r128+). Fonts via Google Fonts. No other dependencies.
   9. Save to `output/vX/visual-identity-presentation.html`.
   10. Open in browser after saving.

4. `## Three.js Animation Parameters` — Full parameter table (from `squads/brand-squad/agents/brand-chief.agent.md:281-298`):

   | Parameter | Default Value | Note |
   |-----------|--------------|------|
   | camera.position.z | 50 | Far from content |
   | gridSize | 5 | Points per axis |
   | spacing | 3.5 | Distance between points |
   | density filter | > 0.35 | Removes 65% of points |
   | pointsMat.opacity | 0.25 | Discrete points |
   | pointsMat.size | 1 | Small points |
   | lineMat.opacity | 0.06 | Nearly invisible lines |
   | amberCount | 15 | Few accent particles |
   | amberMat.opacity | 0.35 | Subtle accent |
   | amberMat.size | 2 | Small accent |
   | mouse parallax | x 1.5 | Smooth movement |
   | blending | AdditiveBlending | Additive light on dark background |

   Particle and line colors must use the primary and accent colors from the briefing palette.

5. `## Expected Input` — All generated assets + briefing + brand guidelines.

6. `## Expected Output` — Single HTML file with all sections, Three.js background, responsive, < 50KB excluding CDN.

7. `## Quality Criteria` — All sections present. Three.js animation subtle (never competes with content). All images display correctly. Responsive on mobile. Progress bar works. Scroll reveal animates.

8. `## Anti-Patterns` — Never generate HTML without invoking `frontend-design` skill first. Never embed base64 images if total > 2MB. Never make Three.js animation distracting. Never skip mobile responsiveness.

- [ ] **Step 2: Commit**

```bash
git add squads/visual-identity-squad/agents/presentation-designer.agent.md
git commit -m "feat(visual-identity-squad): add presentation-designer agent"
```

---

### Task 9: Create quality-reviewer agent

**Files:**
- Create: `squads/visual-identity-squad/agents/quality-reviewer.agent.md`

- [ ] **Step 1: Create the quality-reviewer agent file**

**Frontmatter:**
```yaml
---
base_agent: visual-designer
id: "squads/visual-identity-squad/agents/quality-reviewer"
name: "Quality Reviewer"
icon: check-circle
execution: inline
skills:
  - web_search
---
```

**Sections:**

1. `## Role` — Specialist in quality assurance for visual identity assets. Reviews all generated images and documents for consistency with the original briefing — colors, proportions, legibility, and brand fidelity.

2. `## Calibration` — Style: critical and thorough. Approach: checklist-driven review — every asset checked against every criterion. Language: Respond in the user's language. Tone: honest and constructive.

3. `## Instructions` — 7 steps:
   1. Collect all generated assets and the original visual briefing.
   2. Validate colors: do hex values in images match the briefing? Check each logo, mockup, and stationery piece.
   3. Validate brand name: is it legible and correctly spelled in every piece where it appears?
   4. Validate proportions: is the logo properly proportioned in mockups (not stretched, not pixelated, not cropped)?
   5. Validate consistency: do all 7 logo variations share the same visual style?
   6. Validate guidelines: does the brand-guidelines.md accurately document what was generated?
   7. Produce a review report: PASS (all checks passed) or FAIL (list specific issues with asset name and issue description).

4. `## Expected Input` — All generated assets + visual briefing + brand guidelines.

5. `## Expected Output` — Quality review report:
   ```
   ## Quality Review Report
   **Status:** PASS / FAIL
   **Assets Reviewed:** [count]
   ### Findings
   | Asset | Check | Status | Issue |
   ### Recommendation
   [APPROVE or REJECT with specific items to regenerate]
   ```

6. `## Quality Criteria` — Every asset checked against every criterion. No asset skipped. Issues described specifically (not "looks wrong" but "logo is stretched horizontally by ~20%"). Recommendations are actionable.

7. `## Anti-Patterns` — Never approve without checking every asset. Never give vague feedback. Never reject without specific regeneration instructions. Never skip the guidelines review.

- [ ] **Step 2: Commit**

```bash
git add squads/visual-identity-squad/agents/quality-reviewer.agent.md
git commit -m "feat(visual-identity-squad): add quality-reviewer agent"
```

---

### Task 10: Final validation and publish

**Files:**
- Validate: all files in `squads/visual-identity-squad/`

- [ ] **Step 1: Run validation**

```bash
npm run validate
```

Expected: `All validations passed!` with all 8 agent files found.

- [ ] **Step 2: Final commit if any remaining changes**

```bash
git add squads/visual-identity-squad/
git commit -m "feat: add visual-identity-squad (8 agents)"
```

- [ ] **Step 3: Push to remote**

```bash
git push
```

- [ ] **Step 4: Publish to registry**

```bash
REGISTRY_API_KEY=$REGISTRY_API_KEY REGISTRY_SCOPE=community node scripts/publish-all.js visual-identity-squad
```

Expected: `OK: @community/visual-identity-squad@1.0.0`

- [ ] **Step 5: Verify in registry**

```bash
curl -s https://expxagents-marketplace-production.up.railway.app/api/squads/@community/visual-identity-squad | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'name: {d[\"name\"]}'); print(f'latestVersion: {d[\"latestVersion\"]}')"
```

Expected: `name: visual-identity-squad`, `latestVersion: 1.0.0`
