# Social Media Squad — Design Specification

**Date:** 2026-03-23
**Category:** marketing
**Architecture:** Hybrid — 4 strategic agents + 4 tactical agents (grouped by platform affinity)

---

## Overview

Squad that receives brand information, product details, and visual identity to build a complete social media positioning strategy across 7 channels: Instagram, Facebook, TikTok, LinkedIn, YouTube, Google Meu Negócio, and Blog SEO.

**Output:** Static HTML presentation page (same architecture as landing-page-squad) displaying the complete social media strategy as an explanatory/presentation document.

**Content focus:** Organic only (no paid media).

---

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Content type | Organic only | User preference |
| Calendar detail | Themes/pillars + post types per day (no ready copy) | Scalable, replicable by teams |
| Agent organization | Hybrid: strategic by function + tactical by platform | Best balance depth vs. squad size |
| HTML output | Static presentation page | Same architecture as landing-page-squad |
| All 7 channels | Yes, grouped into 4 tactical agents | User preference for completeness |
| Target audience | Social media managers, business owners, agencies | All three personas |

---

## Agent Architecture

### Strategic Agents (4)

| Agent ID | Name | Role | Key Frameworks |
|----------|------|------|---------------|
| social-media-chief | Social Media Strategist Chief | Orchestrator — receives briefing, routes to specialists, synthesizes report, generates HTML | Content Marketing Framework, Omnichannel Strategy, SB7 for report structure |
| brand-voice-strategist | Brand Voice Strategist | Tom de voz, personalidade de marca, mensagem-chave, do's & don'ts por canal | Brand Archetypes, Tone of Voice Matrix, Brand Personality Spectrum |
| audience-analyst | Audience Analyst | Personas, segmentação, mapeamento de dores e desejos, comportamento por canal | Buyer Persona Canvas, Empathy Map, Customer Journey by Channel |
| content-calendar-architect | Content Calendar Architect | Pilares de conteúdo, calendário semanal/mensal/trimestral, tipos de post, frequência | Content Pillar Strategy, 80/20 Rule, Content Mix Matrix |

### Tactical Agents (4 — grouped by platform affinity)

| Agent ID | Name | Platforms | Key Focus |
|----------|------|-----------|-----------|
| meta-specialist | Meta Platforms Specialist | Instagram + Facebook | Feed, stories, reels, carrosseis, formatos nativos Meta |
| short-video-specialist | Short Video Specialist | TikTok + YouTube Shorts | Trends, hooks, formatos virais, áudio, duração, hashtags |
| professional-content-specialist | Professional Content Specialist | LinkedIn + Blog SEO + YouTube Long-form | Thought leadership, artigos, SEO, vídeos educativos |
| local-presence-specialist | Local Presence Specialist | Google Meu Negócio | Posts, reviews, fotos, Q&A, categorias, atributos |

---

## Pipeline

| Step | Agent | Label |
|------|-------|-------|
| step-01 | social-media-chief | Receive briefing, diagnose brand positioning and channel priorities |
| step-02 | social-media-chief | Route to Brand Voice Strategist and Audience Analyst for foundation |
| step-03 | social-media-chief | Route to Content Calendar Architect for pillar and calendar strategy |
| step-04 | social-media-chief | Route to platform specialists for channel-specific adaptations |
| step-05 | social-media-chief | Synthesize Social Media Strategy Report with HTML presentation |

---

## Expected Report Structure

The chief synthesizes all specialist outputs into a unified report containing:

1. Executive Summary
2. Brand Voice & Personality (from brand-voice-strategist)
3. Target Audience & Personas (from audience-analyst)
4. Content Pillars & Calendar (from content-calendar-architect)
5. Platform Strategies (from each tactical specialist)
   - Instagram & Facebook
   - TikTok & YouTube Shorts
   - LinkedIn, Blog SEO & YouTube
   - Google Meu Negócio
6. Post Examples by Platform (3-5 examples per channel)
7. Weekly/Monthly/Quarterly Calendar Overview
8. KPIs & Success Metrics
9. Implementation Quality Standards

The HTML presentation page follows the same single-file architecture as landing-page-squad: inline CSS + JS, responsive, accessible, with a professional presentation layout.

---

## Conventions (following landing-page-squad patterns)

- All agents use `base_agent: social-media-strategist`
- All agents respond in user's language
- All agents include: Role, Calibration, Instructions, Expected Input, Expected Output, Quality Criteria, Anti-Patterns
- Skills: web_search, web_fetch
- Platform: Report
- Format: social-media-strategy
