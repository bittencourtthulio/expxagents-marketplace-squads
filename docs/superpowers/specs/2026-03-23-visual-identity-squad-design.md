# Visual Identity Squad — Design Spec

**Date:** 2026-03-23
**Status:** Approved
**Category:** marketing

---

## 1. Overview

**visual-identity-squad** is an executor squad that receives a ready visual briefing (brand name, colors, fonts, style/references) and generates a complete visual identity kit: logo in multiple variations, mockups on physical materials, corporate stationery, brand usage guidelines, and an immersive HTML presentation page.

### Metadata

| Field | Value |
|-------|-------|
| Code | `visual-identity-squad` |
| Name | Visual Identity Squad |
| Icon | `palette` |
| Version | `"1.0.0"` |
| Category | `marketing` |
| Tags | `visual-identity`, `logo`, `branding`, `mockup`, `brand-assets` |
| Target Audience | Founders, brand managers, designers |
| Platform | Report |
| Format | `visual-identity-kit` |
| Skills | `web_search`, `web_fetch`, `frontend-design` |
| Language | Respond in the user's language (bilingual) |
| Company | `_expxagents/_memory/company.md` |
| Preferences | `_expxagents/_memory/preferences.md` |
| Memory | `_memory/memories.md` |
| Schedule | `enabled: true` |
| Data | `[]` |

### Image Generation Tool

- **Model:** Gemini 3 Pro Image
- **Endpoint:** `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image:generateContent`
- **Auth:** `GEMINI_API_KEY` env var configured by the user in `.env`
- **Approach:** API REST calls made directly by the chief (via subagents), images saved locally as `.png`

---

## 2. Agents (8)

| # | ID | Name | Icon | Base Agent | Role |
|---|---|---|---|---|---|
| 1 | `visual-identity-chief` | Visual Identity Chief | `palette` | `visual-designer` | Orchestrator — receives briefing, validates API key, coordinates pipeline, delivers final package |
| 2 | `prompt-engineer` | Prompt Engineer | `wand` | `visual-designer` | Crafts optimized prompts for Gemini 3 Pro Image, ensuring visual consistency across all pieces |
| 3 | `logo-designer` | Logo Designer | `pen-tool` | `visual-designer` | Generates 7 logo variations via Gemini API using crafted prompts |
| 4 | `mockup-artist` | Mockup Artist | `image` | `visual-designer` | Generates physical material applications (mug, t-shirt, squeeze, pen, notepad) |
| 5 | `stationery-designer` | Stationery Designer | `file-text` | `visual-designer` | Generates corporate stationery (letterhead, business card, envelope) |
| 6 | `brand-guidelines-writer` | Brand Guidelines Writer | `book-open` | `visual-designer` | Documents usage rules — spacing, protection area, allowed colors, do/don't |
| 7 | `presentation-designer` | Presentation Designer | `monitor` | `visual-designer` | Builds immersive HTML page with Three.js + frontend-design skill |
| 8 | `quality-reviewer` | Quality Reviewer | `check-circle` | `visual-designer` | Validates consistency across all pieces — colors, proportions, alignment, briefing fidelity |

### Routing Matrix (Chief)

| Request Type | Primary Agent | Secondary Agent | Keywords |
|---|---|---|---|
| Prompt generation | prompt-engineer | logo-designer | prompt, craft, consistency |
| Logo/variations | logo-designer | prompt-engineer | logo, variation, mark, symbol |
| Material mockups | mockup-artist | prompt-engineer | mockup, mug, shirt, squeeze, pen, notepad |
| Corporate stationery | stationery-designer | prompt-engineer | stationery, letterhead, business card, envelope |
| Brand guide | brand-guidelines-writer | quality-reviewer | guidelines, rules, usage, do, don't |
| HTML presentation | presentation-designer | quality-reviewer | presentation, HTML, page, showcase |
| Quality review | quality-reviewer | visual-identity-chief | review, consistency, check, validate |

---

## 3. Pipeline (9 Steps)

All pipeline steps route through the chief agent. The chief dispatches to specialist agents via subagent calls within each step, following the established ExpxAgents pattern.

### step-01 — Receive briefing and validate API key

- **Agent:** visual-identity-chief
- **Execution:** inline
- **Actions:**
  1. Receive and restate the visual briefing
  2. Confirm required inputs: brand name, colors (hex), fonts, style/references
  3. Read `GEMINI_API_KEY` from `.env`
  4. Test API key with a simple call to the Gemini API
  5. If missing info, ask via AskUserQuestion
  6. If API key is missing or invalid, instruct the user:
     > Para gerar as imagens, esta squad precisa de acesso a API do Google Gemini 3 Pro Image.
     > 1. Acesse https://ai.google.dev e crie uma API key
     > 2. No arquivo `.env` do seu projeto, adicione: `GEMINI_API_KEY=sua-chave-aqui`
     > 3. Confirme aqui quando estiver pronto

### step-02 — Craft all image generation prompts

- **Agent:** visual-identity-chief
- **deliverFrom:** visual-identity-chief
- **Execution:** inline
- **Output:** `step-02-prompts.md`
- **Actions:**
  1. Dispatch prompt-engineer via subagent
  2. Craft 7 prompts for logo variations (principal, vertical, horizontal, symbol-only, wordmark, negative, monochromatic)
  3. Craft 5 prompts for mockups (mug, t-shirt, squeeze, pen, notepad)
  4. Craft 3 prompts for stationery (letterhead, business card, envelope)
  5. Every prompt must include: art style, exact hex colors, brand name, aspect ratio, background type, negative prompts when relevant
  6. All prompts in **English** (better generation quality)
  7. Use consistent vocabulary across all prompts to ensure visual coherence
  8. Save all prompts to `output/vX/step-02-prompts.md`

### step-03 — Generate logo variations

- **Agent:** visual-identity-chief
- **deliverFrom:** visual-identity-chief
- **Execution:** inline
- **Output:** `logos/`
- **Actions:**
  1. Dispatch logo-designer via subagent
  2. Read prompts from step-02
  3. Call Gemini 3 Pro Image API for each of the 7 variations
  4. Retry up to 3 times per image on failure (exponential backoff)
  5. Save images to `output/vX/logos/`:
     - `logo-main.png` (1:1)
     - `logo-vertical.png` (9:16)
     - `logo-horizontal.png` (16:9)
     - `logo-symbol.png` (1:1)
     - `logo-wordmark.png` (1:1)
     - `logo-negative.png` (1:1)
     - `logo-monochrome.png` (1:1)

### step-04 — Checkpoint: logo approval

- **Agent:** visual-identity-chief
- **deliverFrom:** visual-identity-chief
- **Execution:** inline
- **Checkpoint:** true
- **on_reject:** step-02
- **Actions:**
  1. Present all 7 logo variations to the user
  2. Ask for approval via AskUserQuestion
  3. If approved, proceed to step-05
  4. If adjustments needed, collect feedback and return to step-02
  5. **NEVER generate mockups without approved logo**

### step-05 — Generate mockups and stationery (parallel)

- **Agent:** visual-identity-chief
- **deliverFrom:** visual-identity-chief
- **Execution:** inline
- **parallel_agents:** true
- **Output:** `mockups/`, `stationery/`
- **Actions:**
  1. Dispatch mockup-artist and stationery-designer in parallel via subagents (both with `run_in_background: true`)
  2. **Mockup Artist** generates 5 images to `output/vX/mockups/`:
     - `mockup-mug.png` (4:3)
     - `mockup-tshirt.png` (4:3)
     - `mockup-squeeze.png` (4:3)
     - `mockup-pen.png` (4:3)
     - `mockup-notepad.png` (4:3)
  3. **Stationery Designer** generates 3 images to `output/vX/stationery/`:
     - `letterhead.png` (16:9)
     - `business-card.png` (16:9 — closest Gemini preset to standard card proportions)
     - `envelope.png` (16:9)
  4. Both use prompts from step-02, referencing the approved logo from step-04
  5. Retry up to 3 times per image on failure (exponential backoff)

### step-06 — Brand guidelines

- **Agent:** visual-identity-chief
- **deliverFrom:** visual-identity-chief
- **Execution:** inline
- **Output:** `brand-guidelines.md`
- **Actions:**
  1. Dispatch brand-guidelines-writer via subagent
  2. Document all logo variations and when to use each
  3. Define protection area and minimum size
  4. Color palette (primary, secondary, neutral) with hex/rgb values
  5. Typography (fonts, weights, hierarchy)
  6. Do/Don't examples for logo usage
  7. Save to `output/vX/brand-guidelines.md`

### step-07 — Quality review

- **Agent:** visual-identity-chief
- **deliverFrom:** visual-identity-chief
- **Execution:** inline
- **Checkpoint:** true
- **on_reject:** step-05
- **Actions:**
  1. Dispatch quality-reviewer via subagent
  2. Validate colors in all images match briefing hex values
  3. Verify brand name is legible and spelled correctly in all pieces
  4. Check logo proportions in mockups (not stretched, not pixelated)
  5. Verify visual consistency across all logo variations
  6. Confirm guidelines accurately document what was generated
  7. If issues found, list them and reject to step-05 for regeneration
  8. If all passes, approve to proceed

### step-08 — Immersive HTML presentation

- **Agent:** visual-identity-chief
- **deliverFrom:** visual-identity-chief
- **Execution:** inline
- **Output:** `visual-identity-presentation.html`
- **Skill:** frontend-design
- **Actions:**
  1. Dispatch presentation-designer via subagent
  2. Invoke `frontend-design` skill before generating HTML
  3. Build single-file HTML page with Three.js atmospheric background
  4. Required sections:
     - Hero with 3D animation and brand name
     - Logo Main (large showcase)
     - Logo Variations (grid with all 7 variations)
     - Mockups (gallery with all 5 material applications)
     - Stationery (gallery with all 3 corporate pieces)
     - Brand Guidelines (key rules summary)
     - Final CTA
  5. Three.js parameters (same as brand-squad):
     - camera.position.z: 50, pointsMat.opacity: 0.25, lineMat.opacity: 0.06
     - Mouse parallax: 1.5x, AdditiveBlending
     - Colors from briefing palette
  6. Effects: loading screen, scroll reveal, progress bar, hover states, noise overlay, responsive
  7. Images referenced as local paths (not base64 if total > 2MB)
  8. Single-file HTML, Three.js via CDN (r128+), fonts via Google Fonts
  9. Save to `output/vX/visual-identity-presentation.html`
  10. Open in browser after saving

### step-09 — Final checkpoint and delivery

- **Agent:** visual-identity-chief
- **deliverFrom:** visual-identity-chief
- **Execution:** inline
- **Checkpoint:** true
- **Actions:**
  1. Present complete deliverable package to user
  2. Update squad memory with key decisions
  3. Final approval

---

## 4. Gemini API Integration

### API Call Pattern

```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image:generateContent?key=${GEMINI_API_KEY}
Content-Type: application/json

{
  "contents": [{ "parts": [{ "text": "<prompt from step-02>" }] }],
  "generationConfig": {
    "responseModalities": ["IMAGE"],
    "imageSizeOptions": { "aspectRatio": "<ratio>" }
  }
}
```

Response contains base64-encoded image data, decoded and saved as `.png`.

### Aspect Ratios

| Type | Ratio | Note |
|---|---|---|
| Logo main, symbol, wordmark, negative, monochrome | 1:1 | Square format |
| Logo horizontal, letterhead, business card, envelope | 16:9 | Closest Gemini preset to standard proportions |
| Logo vertical | 9:16 | Portrait format |
| Mockups (mug, t-shirt, squeeze, pen, notepad) | 4:3 | Standard product photo |

### API Key Validation (step-01)

Test with a lightweight call before proceeding. If the key is missing or invalid, block execution and instruct the user to configure it in `.env`.

### Error Handling

- Retry up to 3 times per image on failure with exponential backoff (1s, 2s, 4s)
- If an image fails after 3 retries, log the error, skip the image, and continue with remaining images
- Report all failures at the end of the step so the user can decide whether to retry

---

## 5. Quality & Language Rules

### Language Rules

- All user-facing text in the user's language (from preferences.md)
- Complete and correct accentuation for Portuguese (Brasil): ç, ã/õ, é/ê, í, ó, ú, à
- File names and code remain in **English** without accents
- **Prompts for Gemini always in English** (better generation results)

### Prompt Engineer Quality Criteria

- Every prompt includes: art style, exact hex colors, brand name, background type, aspect ratio
- Consistent vocabulary across all prompts for visual coherence
- Negative prompts when relevant (e.g., "no photorealistic faces", "no text distortion")

### Quality Reviewer Criteria

- Colors in all images match briefing hex values
- Brand name legible and correctly spelled in all pieces
- Logo proportions adequate in mockups (not stretched, not pixelated)
- Logo variations visually consistent with each other
- Guidelines accurately document what was generated

### Anti-Patterns

- NEVER generate mockups before logo is approved at checkpoint
- NEVER send prompts in Portuguese to Gemini (worse results)
- NEVER skip API key validation — fail early is better than failing at step-03
- NEVER generate images without prompt-engineer's prompts — consistency depends on it
- NEVER embed images as base64 in HTML if total exceeds 2MB — use local references

---

## 6. Deliverables Per Run

```
output/vX/
├── step-02-prompts.md
├── logos/
│   ├── logo-main.png
│   ├── logo-vertical.png
│   ├── logo-horizontal.png
│   ├── logo-symbol.png
│   ├── logo-wordmark.png
│   ├── logo-negative.png
│   └── logo-monochrome.png
├── mockups/
│   ├── mockup-mug.png
│   ├── mockup-tshirt.png
│   ├── mockup-squeeze.png
│   ├── mockup-pen.png
│   └── mockup-notepad.png
├── stationery/
│   ├── letterhead.png
│   ├── business-card.png
│   └── envelope.png
├── brand-guidelines.md
└── visual-identity-presentation.html
```

**Total: 15 images + 1 guidelines doc + 1 prompts doc + 1 HTML presentation**

---

## 7. Expected Input

A visual briefing containing:
- **Brand name** (required)
- **Colors** — hex values for primary, secondary, accent (required)
- **Fonts** — font family names (required)
- **Style/references** — art style, mood, references, archetype (required)
- **Slogan/tagline** (optional)
- **Existing assets** (optional — if repositioning)

The squad does NOT do strategic brand work. For positioning, archetype, and messaging, use the brand-squad first.

---

*Design spec generated 2026-03-23 — Visual Identity Squad for ExpxAgents Marketplace*
