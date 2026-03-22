# Marketing Web Squads — Design Spec

**Date:** 2026-03-22
**Author:** Claude + Thulio
**Status:** Review

---

## Overview

Three new independent, self-sufficient squads for the marketing category focused on web page production at the strategic + design level (no code generation). Each squad covers a distinct page type with a fundamentally different mindset:

- **institutional-web-squad** — represent, inform, build credibility
- **landing-page-squad** — capture, convert a specific action
- **sales-page-squad** — persuade, sell, overcome objections

All squads are bilingual (respond in the user's language) and target all audience profiles: agencies, internal marketing teams, and solopreneurs.

---

## Design Decisions

### Why 3 squads instead of 1 or 2

Each page type requires a fundamentally different strategic mindset:

1. **Institutional sites** demand information architecture, multi-page navigation, brand consistency, and content hierarchy across sections. The goal is representation and credibility.
2. **Landing pages** demand conversion optimization, single-page focus, above-the-fold hierarchy, and A/B testing strategy. The goal is one specific action.
3. **Sales pages** demand persuasion frameworks, long-form copy structure, offer architecture, and objection handling. The goal is a purchase decision.

A single squad would need to context-switch between these mindsets. Separating them allows each chief and specialist team to be calibrated precisely for their domain.

### Why independent (not complementary to existing squads)

Each new squad includes its own copy, design, and strategy specialists — calibrated specifically for their page type context. A "persuasion copywriter" in the landing-page-squad operates differently from the generic copy-squad copywriter. This avoids cross-squad orchestration complexity and makes each squad immediately usable without prior knowledge of other squads.

### No code generation

All squads produce strategic deliverables: structure, wireframe direction, copy, UX/UI direction, and specifications. They do not generate HTML, CSS, or framework code. Output is designed for handoff to development teams or direct use in no-code/design tools.

### Agent ID overlap with existing squads

The sales-page-squad defines `offer-architect` and `launch-strategist` — IDs that also exist in the hormozi-squad. This is intentional. Each squad is directory-scoped (`squads/{squad}/agents/{id}`), so there is no file collision. The agents serve different contexts: hormozi-squad's offer-architect operates in a business scaling context, while sales-page-squad's operates specifically for sales page offer construction. Squad-scoped naming is the correct pattern in this project.

### Agent file structure

All agent `.md` files must follow the full structure established by existing squads (e.g., `brand-chief.agent.md`, `positioning-specialist.agent.md`):

- YAML frontmatter: `base_agent`, `id`, `name`, `icon`, `execution`, `skills`
- Sections: `## Role`, `## Calibration`, `## Instructions`, `## Routing Matrix` (chiefs only), `## Expected Input`, `## Expected Output`, `## Quality Criteria`, `## Anti-Patterns`

**The `id` field uses the fully qualified path format:** `"squads/{squad-code}/agents/{agent-id}"` (e.g., `"squads/institutional-web-squad/agents/institutional-web-chief"`).

### Base agents (per squad)

Following the project pattern where each squad has its own domain-specific base_agent:

| Squad | base_agent | Rationale |
|-------|-----------|-----------|
| institutional-web-squad | `web-strategist` | Reflects information architecture and multi-page site strategy focus |
| landing-page-squad | `conversion-strategist` | Reflects conversion optimization and single-page focus |
| sales-page-squad | `sales-strategist` | Reflects persuasion, offer construction, and sales psychology focus |

This follows the existing convention: brand-squad uses `brand-strategist`, copy-squad uses `copywriter`, traffic-masters uses `media-strategist`.

### Language / Bilingual behavior

All agents in these 3 squads use `**Language:** Respond in the user's language` in their Calibration section. This departs from existing squads (which use `**Language:** English`) because these squads target a global audience including Portuguese-speaking markets. The agent responds in whatever language the user writes in.

### Calibration reference for chiefs

Each chief agent's Calibration should follow this pattern (adapted per squad):

**institutional-web-chief:**
- **Style:** Architectural, systematic, and brand-aware — the voice of a senior web strategist who has planned dozens of corporate sites
- **Approach:** Structure first, content second, design third — never skip information architecture
- **Language:** Respond in the user's language
- **Tone:** Professional and methodical — clear recommendations backed by UX and IA principles

**landing-page-chief:**
- **Style:** Data-driven, conversion-obsessed, and pragmatic — the voice of a growth marketer who lives by the numbers
- **Approach:** Conversion goal first, then structure, then copy, then design — every decision serves the single CTA
- **Language:** Respond in the user's language
- **Tone:** Direct and results-oriented — no fluff, every recommendation tied to conversion impact

**sales-page-chief:**
- **Style:** Persuasion-literate, psychologically sharp, and commercially savvy — the voice of a direct response strategist who has built million-dollar sales pages
- **Approach:** Offer first, copy second, design third — the offer is the foundation, everything else amplifies it
- **Language:** Respond in the user's language
- **Tone:** Confident and strategic — blends sales psychology with ethical persuasion, never manipulative

Specialist agent Calibrations should be derived from their chief's style, adapted to their specific domain expertise. Use existing specialist agents (e.g., `positioning-specialist.agent.md`) as structural templates.

---

## Squad 1: institutional-web-squad

### Complete squad.yaml

```yaml
squad:
  code: institutional-web-squad
  name: Institutional Web Squad
  description: Strategy, structure, and design direction for institutional websites, corporate sites, portfolios, and multi-page web projects
  icon: globe
  version: "1.0.0"
  category: marketing
  tags:
    - institutional
    - website
    - corporate
    - portfolio
    - information-architecture
    - ux-design

  company: "_expxagents/_memory/company.md"
  preferences: "_expxagents/_memory/preferences.md"
  memory: "_memory/memories.md"

  target_audience: "Founders, marketing teams, agencies, and solopreneurs building institutional or corporate websites"
  platform: "Report"
  format: "institutional-web-strategy"

  skills:
    - web_search
    - web_fetch

  schedule:
    enabled: true

  data: []

  agents:
    - id: institutional-web-chief
      name: Web Strategist Chief
      icon: globe
      prompt: agents/institutional-web-chief.agent.md
    - id: information-architect
      name: Information Architect
      icon: sitemap
      prompt: agents/information-architect.agent.md
    - id: ux-strategist
      name: UX Strategist
      icon: users
      prompt: agents/ux-strategist.agent.md
    - id: ui-art-director
      name: UI Art Director
      icon: paintbrush
      prompt: agents/ui-art-director.agent.md
    - id: content-strategist
      name: Content Strategist
      icon: file-text
      prompt: agents/content-strategist.agent.md
    - id: seo-specialist
      name: SEO Specialist
      icon: search
      prompt: agents/seo-specialist.agent.md
    - id: brand-alignment-specialist
      name: Brand Alignment Specialist
      icon: check-circle
      prompt: agents/brand-alignment-specialist.agent.md
    - id: web-analytics-planner
      name: Web Analytics Planner
      icon: bar-chart
      prompt: agents/web-analytics-planner.agent.md

  pipeline:
    steps:
      - id: step-01
        agent: institutional-web-chief
        label: Receive briefing, diagnose site type and identify relevant specialists
        execution: inline
      - id: step-02
        agent: institutional-web-chief
        label: Route to Information Architect and UX Strategist for structure and user flows
        deliverFrom: institutional-web-chief
        execution: inline
      - id: step-03
        agent: institutional-web-chief
        label: Route to UI Art Director and Brand Alignment for visual direction
        deliverFrom: institutional-web-chief
        execution: inline
      - id: step-04
        agent: institutional-web-chief
        label: Route to Content Strategist and SEO Specialist for content and discoverability
        deliverFrom: institutional-web-chief
        execution: inline
      - id: step-05
        agent: institutional-web-chief
        label: Synthesize Web Strategy Report with Analytics Plan and implementation roadmap
        deliverFrom: institutional-web-chief
        execution: inline
```

### Agents (8)

#### 1. institutional-web-chief — Web Strategist Chief

**Icon:** `globe` | **Base Agent:** `web-strategist`

**Role:** Receives the website briefing, diagnoses site type (corporate, institutional, portfolio, multi-page), identifies target audience and business objectives, routes to the right specialists, and synthesizes a comprehensive Web Strategy Report.

**Routing Matrix:**

| Request Type | Primary Agent | Secondary Agent | Keywords |
|-------------|---------------|-----------------|----------|
| Site structure/navigation | information-architect | ux-strategist | sitemap, navigation, pages, structure, sections |
| User experience/usability | ux-strategist | information-architect | usability, flow, accessibility, user journey |
| Visual direction/design | ui-art-director | brand-alignment-specialist | visual, design, layout, typography, colors |
| Content strategy | content-strategist | seo-specialist | content, copy, text, tone, messaging |
| SEO/discoverability | seo-specialist | content-strategist | SEO, Google, search, ranking, meta tags |
| Brand consistency | brand-alignment-specialist | ui-art-director | brand, identity, guidelines, consistency |
| Metrics/analytics | web-analytics-planner | ux-strategist | metrics, KPIs, analytics, tracking, conversion |
| Full site project | information-architect | ux-strategist | new site, redesign, rebuild, full project |

**Expected Output:** Web Strategy Report with Executive Summary, Specialist Perspectives, Site Architecture, Content Strategy, Visual Direction, Implementation Roadmap, and Risk Watch.

#### 2. information-architect — Information Architect

**Icon:** `sitemap` | **Base Agent:** `web-strategist`

**Role:** Designs site structure, navigation hierarchy, sitemap, content taxonomy, and page-level content blocks. Applies information architecture principles to ensure users find what they need in 3 clicks or fewer.

**Key Frameworks:** Card sorting methodology, tree testing principles, content inventory, navigation patterns (global, local, contextual, utility).

**Expected Output:** Information Architecture Analysis with sitemap, navigation structure, content taxonomy, page hierarchy, and internal linking strategy.

#### 3. ux-strategist — UX Strategist

**Icon:** `users` | **Base Agent:** `web-strategist`

**Role:** Designs user flows, conceptual wireframes, usability guidelines, and accessibility requirements. Focuses on how users move through the site and complete key tasks.

**Key Frameworks:** Nielsen's heuristics, WCAG accessibility guidelines, user journey mapping, task analysis, responsive design principles.

**Expected Output:** UX Strategy Analysis with user flows, wireframe descriptions, usability guidelines, accessibility checklist, and responsive behavior specifications.

#### 4. ui-art-director — UI Art Director

**Icon:** `paintbrush` | **Base Agent:** `web-strategist`

**Role:** Defines visual direction including design system foundations, color palette strategy, typography hierarchy, grid systems, spacing, and moodboard direction. Does not produce final designs but provides clear creative direction for designers.

**Key Frameworks:** Design system thinking, visual hierarchy principles, Gestalt principles, typography scales, color theory for web.

**Expected Output:** Visual Direction Brief with design principles, color palette rationale, typography system, grid/spacing guidelines, component style direction, and moodboard references.

#### 5. content-strategist — Content Strategist

**Icon:** `file-text` | **Base Agent:** `web-strategist`

**Role:** Defines content strategy per page — what content each page needs, content hierarchy, tone of voice per section, microcopy guidelines, and content governance rules.

**Key Frameworks:** Content modeling, message architecture, content-first design, readability principles, content lifecycle management.

**Expected Output:** Content Strategy Document with page-by-page content requirements, content hierarchy, tone of voice guide, microcopy specifications, and content governance plan.

#### 6. seo-specialist — SEO Specialist

**Icon:** `search` | **Base Agent:** `web-strategist`

**Role:** Defines on-page SEO strategy including heading structure, meta tag strategy, URL structure, schema markup recommendations, internal linking strategy, and Core Web Vitals targets.

**Key Frameworks:** Google E-E-A-T principles, technical SEO best practices, semantic HTML guidelines, structured data (Schema.org), keyword intent mapping.

**Expected Output:** SEO Strategy Document with keyword mapping per page, heading structure, meta tag templates, URL architecture, schema markup plan, and performance targets.

#### 7. brand-alignment-specialist — Brand Alignment Specialist

**Icon:** `check-circle` | **Base Agent:** `web-strategist`

**Role:** Ensures the website aligns with existing brand identity, brandbook guidelines, and visual standards. Reviews all design and content decisions through the lens of brand consistency.

**Key Frameworks:** Brand consistency auditing, brand touchpoint mapping, brand voice alignment, visual identity compliance.

**Expected Output:** Brand Alignment Report with compliance assessment, gap analysis, alignment recommendations, and brand consistency checklist for ongoing maintenance.

#### 8. web-analytics-planner — Web Analytics Planner

**Icon:** `bar-chart` | **Base Agent:** `web-strategist`

**Role:** Designs the measurement strategy — what to track, which KPIs matter, event tagging plan, dashboard structure, and success criteria for the site launch.

**Key Frameworks:** Google Analytics 4 event model, UTM strategy, conversion funnel mapping, KPI hierarchies, data layer design.

**Expected Output:** Analytics Plan with KPI definitions, event taxonomy, tagging requirements, dashboard wireframes, and reporting cadence recommendations.

---

## Squad 2: landing-page-squad

### Complete squad.yaml

```yaml
squad:
  code: landing-page-squad
  name: Landing Page Squad
  description: Strategy, structure, and design direction for high-converting landing pages, capture pages, squeeze pages, and opt-in pages
  icon: target
  version: "1.0.0"
  category: marketing
  tags:
    - landing-page
    - conversion
    - capture-page
    - squeeze-page
    - opt-in
    - cro

  company: "_expxagents/_memory/company.md"
  preferences: "_expxagents/_memory/preferences.md"
  memory: "_memory/memories.md"

  target_audience: "Marketers, agencies, growth teams, and solopreneurs building conversion-focused landing pages"
  platform: "Report"
  format: "landing-page-strategy"

  skills:
    - web_search
    - web_fetch

  schedule:
    enabled: true

  data: []

  agents:
    - id: landing-page-chief
      name: Conversion Strategist Chief
      icon: target
      prompt: agents/landing-page-chief.agent.md
    - id: conversion-architect
      name: Conversion Architect
      icon: layout
      prompt: agents/conversion-architect.agent.md
    - id: persuasion-copywriter
      name: Persuasion Copywriter
      icon: edit
      prompt: agents/persuasion-copywriter.agent.md
    - id: cro-specialist
      name: CRO Specialist
      icon: trending-up
      prompt: agents/cro-specialist.agent.md
    - id: landing-ux-designer
      name: Landing Page UX/UI Designer
      icon: monitor
      prompt: agents/landing-ux-designer.agent.md
    - id: social-proof-strategist
      name: Social Proof Strategist
      icon: star
      prompt: agents/social-proof-strategist.agent.md
    - id: lead-magnet-architect
      name: Lead Magnet Architect
      icon: gift
      prompt: agents/lead-magnet-architect.agent.md
    - id: ab-testing-planner
      name: A/B Testing Planner
      icon: git-branch
      prompt: agents/ab-testing-planner.agent.md

  pipeline:
    steps:
      - id: step-01
        agent: landing-page-chief
        label: Receive briefing, diagnose conversion objective and audience awareness level
        execution: inline
      - id: step-02
        agent: landing-page-chief
        label: Route to Conversion Architect and Lead Magnet Architect for structure and offer
        deliverFrom: landing-page-chief
        execution: inline
      - id: step-03
        agent: landing-page-chief
        label: Route to Persuasion Copywriter and Social Proof Strategist for copy and trust
        deliverFrom: landing-page-chief
        execution: inline
      - id: step-04
        agent: landing-page-chief
        label: Route to Landing UX/UI Designer for visual conversion direction
        deliverFrom: landing-page-chief
        execution: inline
      - id: step-05
        agent: landing-page-chief
        label: Synthesize Landing Page Strategy Report with CRO analysis and testing roadmap
        deliverFrom: landing-page-chief
        execution: inline
```

### Agents (8)

#### 1. landing-page-chief — Conversion Strategist Chief

**Icon:** `target` | **Base Agent:** `conversion-strategist`

**Role:** Receives the landing page briefing, diagnoses conversion objective (lead capture, webinar registration, download, free trial, etc.), identifies the target audience and funnel stage, routes to specialists, and delivers a Landing Page Strategy Report.

**Routing Matrix:**

| Request Type | Primary Agent | Secondary Agent | Keywords |
|-------------|---------------|-----------------|----------|
| Page structure/flow | conversion-architect | landing-ux-designer | structure, blocks, sections, above-the-fold, flow |
| Headlines/copy | persuasion-copywriter | social-proof-strategist | headline, copy, CTA, text, messaging |
| Conversion optimization | cro-specialist | ab-testing-planner | conversion, rate, optimize, friction, drop-off |
| Visual layout/design | landing-ux-designer | conversion-architect | layout, design, form, mobile, responsive |
| Trust/credibility | social-proof-strategist | persuasion-copywriter | testimonial, trust, proof, logos, reviews |
| Lead magnet/offer | lead-magnet-architect | persuasion-copywriter | lead magnet, ebook, checklist, offer, free |
| Testing strategy | ab-testing-planner | cro-specialist | A/B test, variant, hypothesis, experiment |
| Full landing page | conversion-architect | persuasion-copywriter | new page, landing page, capture page, opt-in |

**Expected Output:** Landing Page Strategy Report with Executive Summary, Specialist Perspectives, Page Architecture, Copy Framework, Visual Direction, Testing Plan, and Conversion Metrics.

#### 2. conversion-architect — Conversion Architect

**Icon:** `layout` | **Base Agent:** `conversion-strategist`

**Role:** Designs the page structure — block sequence, content hierarchy, above-the-fold strategy, scroll flow, and section-by-section blueprint. Every structural decision optimizes for the single conversion goal.

**Key Frameworks:** Inverted pyramid for web, F-pattern and Z-pattern reading, above-the-fold hierarchy, progressive disclosure, friction reduction.

**Expected Output:** Page Architecture Blueprint with block-by-block structure, content hierarchy per section, above-the-fold specification, scroll flow rationale, and mobile adaptation notes.

#### 3. persuasion-copywriter — Persuasion Copywriter

**Icon:** `edit` | **Base Agent:** `conversion-strategist`

**Role:** Crafts headlines, subheadlines, bullet points, CTAs, and microcopy. Every word is calibrated for the specific conversion goal and audience awareness level.

**Key Frameworks:** Eugene Schwartz awareness levels, headline formulas (4U, PAS for headlines), power words, CTA psychology, benefit-over-feature writing.

**Expected Output:** Copy Framework with headline options (3-5 variants), subheadline, body copy structure, bullet points, CTA variations, and microcopy for forms and buttons.

#### 4. cro-specialist — CRO Specialist

**Icon:** `trending-up` | **Base Agent:** `conversion-strategist`

**Role:** Analyzes the page design through conversion rate optimization lenses — identifying friction points, cognitive load issues, decision fatigue risks, and optimization opportunities.

**Key Frameworks:** Cialdini's persuasion principles, Fogg Behavior Model (B=MAT), LIFT model (value proposition, relevance, clarity, urgency, anxiety, distraction), heuristic evaluation for conversion.

**Expected Output:** CRO Analysis with friction audit, heuristic evaluation scores, optimization recommendations (prioritized by impact/effort), and conversion rate benchmarks for the page type.

#### 5. landing-ux-designer — Landing Page UX/UI Designer

**Icon:** `monitor` | **Base Agent:** `conversion-strategist`

**Role:** Defines visual layout direction for high-conversion pages — form design, CTA placement and styling, visual hierarchy, whitespace strategy, contrast ratios, and responsive behavior.

**Key Frameworks:** Visual hierarchy for conversion, form UX best practices, CTA design psychology, mobile-first landing page patterns, attention ratio optimization.

**Expected Output:** Visual Layout Direction with layout wireframe description, form design specifications, CTA styling guidelines, visual hierarchy notes, and responsive breakpoint behavior.

#### 6. social-proof-strategist — Social Proof Strategist

**Icon:** `star` | **Base Agent:** `conversion-strategist`

**Role:** Designs the social proof strategy — what types of proof to use, where to place them, how to format them, and how to maximize their persuasive impact.

**Key Frameworks:** Types of social proof (expert, celebrity, user, wisdom of crowds, certification), trust signal hierarchy, testimonial structure (before/after, specific results), logo wall strategy.

**Expected Output:** Social Proof Strategy with proof type recommendations, placement map, testimonial templates, trust signal checklist, and proof collection guidelines.

#### 7. lead-magnet-architect — Lead Magnet Architect

**Icon:** `gift` | **Base Agent:** `conversion-strategist`

**Role:** Designs the lead magnet or capture offer — what to offer, how to frame the value proposition, the hook that drives opt-in, and alignment with the broader funnel.

**Key Frameworks:** Lead magnet types (checklists, templates, mini-courses, assessments, toolkits), value proposition canvas for lead magnets, perceived value vs. production effort matrix, funnel alignment.

**Expected Output:** Lead Magnet Strategy with offer recommendation, value proposition framing, hook/headline for the offer, delivery mechanism, and funnel alignment analysis.

#### 8. ab-testing-planner — A/B Testing Planner

**Icon:** `git-branch` | **Base Agent:** `conversion-strategist`

**Role:** Designs the testing roadmap — what to test first, hypothesis formulation, variant design, sample size requirements, and metrics hierarchy (primary, secondary, guardrail).

**Key Frameworks:** ICE scoring (Impact, Confidence, Ease), hypothesis-driven testing, statistical significance basics, test prioritization frameworks, multivariate vs. A/B decision criteria.

**Expected Output:** Testing Roadmap with prioritized test backlog (ICE-scored), hypothesis templates per test, variant descriptions, sample size guidance, and metrics hierarchy.

---

## Squad 3: sales-page-squad

### Complete squad.yaml

```yaml
squad:
  code: sales-page-squad
  name: Sales Page Squad
  description: Strategy, structure, and design direction for sales pages, VSL pages, launch pages, webinar pages, and long-form sales copy
  icon: dollar-sign
  version: "1.0.0"
  category: marketing
  tags:
    - sales-page
    - vsl
    - launch
    - long-form
    - persuasion
    - offer

  company: "_expxagents/_memory/company.md"
  preferences: "_expxagents/_memory/preferences.md"
  memory: "_memory/memories.md"

  target_audience: "Entrepreneurs, course creators, agencies, and marketing teams building high-ticket or direct-response sales pages"
  platform: "Report"
  format: "sales-page-strategy"

  skills:
    - web_search
    - web_fetch

  schedule:
    enabled: true

  data: []

  agents:
    - id: sales-page-chief
      name: Sales Page Architect Chief
      icon: dollar-sign
      prompt: agents/sales-page-chief.agent.md
    - id: offer-architect
      name: Offer Architect
      icon: package
      prompt: agents/offer-architect.agent.md
    - id: sales-copywriter
      name: Sales Copywriter
      icon: pen-tool
      prompt: agents/sales-copywriter.agent.md
    - id: objection-handler
      name: Objection Handler Specialist
      icon: shield
      prompt: agents/objection-handler.agent.md
    - id: sales-ux-designer
      name: Sales Page UX/UI Designer
      icon: smartphone
      prompt: agents/sales-ux-designer.agent.md
    - id: vsl-strategist
      name: VSL Strategist
      icon: video
      prompt: agents/vsl-strategist.agent.md
    - id: urgency-strategist
      name: Urgency & Scarcity Strategist
      icon: clock
      prompt: agents/urgency-strategist.agent.md
    - id: launch-strategist
      name: Launch Strategist
      icon: rocket
      prompt: agents/launch-strategist.agent.md

  pipeline:
    steps:
      - id: step-01
        agent: sales-page-chief
        label: Receive briefing, diagnose sale type and audience temperature
        execution: inline
      - id: step-02
        agent: sales-page-chief
        label: Route to Offer Architect and Launch Strategist for offer construction and strategy
        deliverFrom: sales-page-chief
        execution: inline
      - id: step-03
        agent: sales-page-chief
        label: Route to Sales Copywriter and Objection Handler for persuasion copy and resistance handling
        deliverFrom: sales-page-chief
        execution: inline
      - id: step-04
        agent: sales-page-chief
        label: Route to VSL Strategist for video sales letter direction (when applicable)
        deliverFrom: sales-page-chief
        execution: inline
      - id: step-05
        agent: sales-page-chief
        label: Synthesize Sales Page Strategy Report with visual direction and urgency strategy
        deliverFrom: sales-page-chief
        execution: inline
```

### Agents (8)

#### 1. sales-page-chief — Sales Page Architect Chief

**Icon:** `dollar-sign` | **Base Agent:** `sales-strategist`

**Role:** Receives the sales page briefing, diagnoses sale type (evergreen, launch, high-ticket, low-ticket, webinar replay, etc.), identifies the audience temperature (cold, warm, hot), routes to specialists, and delivers a Sales Page Strategy Report.

**Routing Matrix:**

| Request Type | Primary Agent | Secondary Agent | Keywords |
|-------------|---------------|-----------------|----------|
| Offer construction | offer-architect | sales-copywriter | offer, price, bonus, guarantee, stack, value |
| Sales copy/long-form | sales-copywriter | objection-handler | copy, headline, story, lead, body, close |
| Objection handling | objection-handler | sales-copywriter | objection, FAQ, doubt, risk, fear, concern |
| Page layout/design | sales-ux-designer | urgency-strategist | layout, design, sections, visual, mobile |
| Video sales letter | vsl-strategist | sales-copywriter | VSL, video, script, hook, webinar |
| Urgency/scarcity | urgency-strategist | offer-architect | urgency, scarcity, deadline, countdown, limited |
| Launch strategy | launch-strategist | offer-architect | launch, PLF, sequence, pre-launch, cart open |
| Full sales page | offer-architect | sales-copywriter | sales page, sell, product, course, program |

**Expected Output:** Sales Page Strategy Report with Executive Summary, Specialist Perspectives, Offer Architecture, Copy Framework, Visual Direction, Launch/Urgency Strategy, and Conversion Projections.

#### 2. offer-architect — Offer Architect

**Icon:** `package` | **Base Agent:** `sales-strategist`

**Role:** Constructs the irresistible offer — value stack, price anchoring, bonus strategy, guarantee design, and risk reversal. The offer is the foundation; copy and design amplify it.

**Key Frameworks:** Alex Hormozi's Value Equation (Dream Outcome x Perceived Likelihood / Time Delay x Effort & Sacrifice), value stacking, price anchoring psychology, guarantee spectrum (conditional to unconditional), bonus design principles.

**Expected Output:** Offer Architecture Document with value stack breakdown, price anchoring strategy, bonus recommendations, guarantee design, and risk reversal framework.

#### 3. sales-copywriter — Sales Copywriter

**Icon:** `pen-tool` | **Base Agent:** `sales-strategist`

**Role:** Crafts long-form sales copy using proven persuasion frameworks. Writes the lead, story, body, transition, offer presentation, and close — calibrated for audience temperature and product type.

**Key Frameworks:** AIDA (Attention, Interest, Desire, Action), PAS (Problem, Agitation, Solution), 4Ps (Promise, Picture, Proof, Push), Star-Story-Solution, Gary Halbert's "A-pile" philosophy, Eugene Schwartz's breakthrough advertising levels.

**Expected Output:** Sales Copy Framework with lead options (3 variants), story arc, body copy structure, transition to offer, offer presentation copy, close/CTA sequence, and P.S. strategy.

#### 4. objection-handler — Objection Handler Specialist

**Icon:** `shield` | **Base Agent:** `sales-strategist`

**Role:** Maps every objection the prospect will have and designs preemptive content blocks, strategic FAQ, and risk reversal messaging that neutralizes resistance before it crystallizes.

**Key Frameworks:** Objection categorization (price, timing, trust, need, authority), preemptive objection handling (address before they think it), FAQ as sales tool, fear-to-confidence arc.

**Expected Output:** Objection Handling Strategy with objection map (categorized and prioritized), preemptive content block recommendations, strategic FAQ (positioned as sales copy, not support), and risk reversal messaging.

#### 5. sales-ux-designer — Sales Page UX/UI Designer

**Icon:** `smartphone` | **Base Agent:** `sales-strategist`

**Role:** Defines visual direction for long-form sales pages — reading rhythm, visual breaks, pricing table design, CTA placement cadence, sticky elements, and mobile scroll optimization.

**Key Frameworks:** Long-form page rhythm (text-visual-text patterns), pricing table psychology, CTA repetition strategy, sticky header/footer patterns, visual storytelling for sales, mobile long-form optimization.

**Expected Output:** Visual Direction for Sales Page with layout rhythm map, section-by-section visual treatment, pricing table design direction, CTA placement strategy, and mobile adaptation guidelines.

#### 6. vsl-strategist — VSL Strategist

**Icon:** `video` | **Base Agent:** `sales-strategist`

**Role:** Designs Video Sales Letter strategy — script structure, hook types, pacing, video-page integration, and viewer retention tactics. Covers both standalone VSL pages and hybrid (video + long-form) formats.

**Key Frameworks:** VSL script structure (hook, story, content, pitch, close), hook typology (curiosity, contrarian, story, statistic), pacing and retention curves, video-page integration patterns, autoplay vs. click-to-play strategy.

**Expected Output:** VSL Strategy Document with script outline, hook options (3 variants), pacing guide, video-page integration spec, and retention optimization tactics.

#### 7. urgency-strategist — Urgency & Scarcity Strategist

**Icon:** `clock` | **Base Agent:** `sales-strategist`

**Role:** Designs ethical urgency and scarcity strategies — real deadlines, genuine limited availability, countdown mechanics, enrollment windows, and psychological triggers that accelerate decisions without manipulation.

**Key Frameworks:** Real vs. manufactured urgency (ethical boundaries), deadline types (hard close, evergreen with deadline funnels, cohort-based), scarcity types (quantity, time, bonus, price), countdown psychology, FOMO calibration.

**Expected Output:** Urgency & Scarcity Strategy with recommended urgency type, implementation mechanics, ethical guardrails, countdown specifications, and messaging templates for urgency elements.

#### 8. launch-strategist — Launch Strategist

**Icon:** `rocket` | **Base Agent:** `sales-strategist`

**Role:** Designs launch page sequences — pre-launch content (PLC), cart open/close pages, waitlist pages, webinar registration pages, and the full launch timeline with page dependencies.

**Key Frameworks:** Jeff Walker's Product Launch Formula (PLF), seed launch, internal launch, JV launch, evergreen launch funnels, launch page sequence mapping, pre-launch content strategy.

**Expected Output:** Launch Strategy Document with launch type recommendation, page sequence map, timeline, pre-launch content outlines, cart open/close page specifications, and post-launch follow-up page strategy.

---

## Summary

| Squad | Code | Agents | Category | Focus |
|-------|------|--------|----------|-------|
| Institutional Web Squad | institutional-web-squad | 8 | marketing | Sites, corporate, portfolios, multi-page |
| Landing Page Squad | landing-page-squad | 8 | marketing | Landing pages, capture, opt-in, squeeze pages |
| Sales Page Squad | sales-page-squad | 8 | marketing | Sales pages, VSL, launch, long-form |

**Total: 3 squads, 24 agents**

### Shared Characteristics

All three squads share:
- **Language:** Bilingual — agents respond in the user's language
- **No code generation** — all output is strategic, structural, and directional
- **Independent** — each squad is self-sufficient, no dependency on other squads
- **Global memory:** All squads reference `_expxagents/_memory/company.md` and `_expxagents/_memory/preferences.md`

### File Structure Per Squad

```
squads/[squad-name]/
├── squad.yaml
├── agents/
│   ├── [squad-name]-chief.agent.md
│   ├── [specialist-1].agent.md
│   ├── [specialist-2].agent.md
│   └── ... (6 more specialists)
└── _memory/
    └── memories.md
```
