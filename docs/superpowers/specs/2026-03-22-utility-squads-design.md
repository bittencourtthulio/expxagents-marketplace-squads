# Utility Squads — Design Spec

**Date:** 2026-03-22
**Author:** Claude + Thulio
**Status:** Draft

---

## Overview

Six new independent, self-sufficient squads covering infrastructure, data/AI, product management, research, quality assurance, and developer experience. Inspired by patterns from the VoltAgent awesome-claude-code-subagents collection, adapted to the ExpxAgents squad model (chief + specialists with orchestrated pipeline).

All squads are bilingual (respond in the user's language), produce strategic deliverables, and follow the established squad patterns.

---

## Squad 1: devops-squad

### Complete squad.yaml

```yaml
squad:
  code: devops-squad
  name: DevOps Squad
  description: Infrastructure strategy, CI/CD architecture, containerization, orchestration, observability, and platform engineering
  icon: server
  version: "1.0.0"
  category: development
  tags:
    - devops
    - infrastructure
    - ci-cd
    - kubernetes
    - cloud
    - sre

  company: "_expxagents/_memory/company.md"
  preferences: "_expxagents/_memory/preferences.md"
  memory: "_memory/memories.md"

  target_audience: "CTOs, DevOps engineers, platform teams, and engineering leaders"
  platform: "Report"
  format: "devops-strategy"

  skills:
    - web_search
    - web_fetch

  schedule:
    enabled: true

  data: []

  agents:
    - id: devops-chief
      name: DevOps Chief
      icon: server
      prompt: agents/devops-chief.agent.md
    - id: ci-cd-architect
      name: CI/CD Architect
      icon: git-merge
      prompt: agents/ci-cd-architect.agent.md
    - id: container-specialist
      name: Container Specialist
      icon: box
      prompt: agents/container-specialist.agent.md
    - id: kubernetes-architect
      name: Kubernetes Architect
      icon: layers
      prompt: agents/kubernetes-architect.agent.md
    - id: cloud-architect
      name: Cloud Architect
      icon: cloud
      prompt: agents/cloud-architect.agent.md
    - id: sre-engineer
      name: SRE Engineer
      icon: activity
      prompt: agents/sre-engineer.agent.md
    - id: security-ops
      name: Security Ops Engineer
      icon: shield
      prompt: agents/security-ops.agent.md
    - id: platform-engineer
      name: Platform Engineer
      icon: cpu
      prompt: agents/platform-engineer.agent.md

  pipeline:
    steps:
      - id: step-01
        agent: devops-chief
        label: Diagnose infrastructure challenge and identify relevant specialists
        execution: inline
      - id: step-02
        agent: devops-chief
        label: Route to specialists for domain-specific analysis
        deliverFrom: devops-chief
        execution: inline
      - id: step-03
        agent: devops-chief
        label: Synthesize infrastructure strategy and validate decisions
        deliverFrom: devops-chief
        execution: inline
      - id: step-04
        agent: devops-chief
        label: Design implementation architecture and migration path
        deliverFrom: devops-chief
        execution: inline
      - id: step-05
        agent: devops-chief
        label: Final Infrastructure Strategy Report and implementation roadmap
        deliverFrom: devops-chief
        execution: inline
```

### Agents (8)

| # | Agent ID | Icon | Base Agent | Role Summary |
|---|----------|------|-----------|-------------|
| 1 | devops-chief | server | devops-strategist | Orchestrates infra challenges, routes to specialists, synthesizes Infrastructure Strategy Report |
| 2 | ci-cd-architect | git-merge | devops-strategist | CI/CD pipelines, deployment automation, branching strategy, release management, artifact management |
| 3 | container-specialist | box | devops-strategist | Docker, containerization, image optimization, multi-stage builds, registries, runtime security |
| 4 | kubernetes-architect | layers | devops-strategist | K8s cluster design, service mesh, autoscaling, helm charts, operators, multi-tenancy |
| 5 | cloud-architect | cloud | devops-strategist | Multi-cloud strategy, IaC (Terraform/Pulumi), cost optimization, well-architected frameworks |
| 6 | sre-engineer | activity | devops-strategist | Observability, SLOs/SLIs/SLAs, incident management, runbooks, chaos engineering, postmortems |
| 7 | security-ops | shield | devops-strategist | DevSecOps, supply chain security, secret management, compliance as code, vulnerability scanning |
| 8 | platform-engineer | cpu | devops-strategist | Internal developer platform, self-service infra, golden paths, developer experience, platform APIs |

### Chief Calibration

- **Style:** Infrastructure-minded, systems-thinking, and reliability-obsessed — the voice of a VP of Engineering who has scaled systems from startup to enterprise
- **Approach:** Reliability first, then velocity, then cost — never optimize for deploy speed at the expense of production stability
- **Language:** Respond in the user's language
- **Tone:** Pragmatic and evidence-based — no cloud hype, no tool worship, every recommendation backed by operational trade-offs

### Routing Matrix

| Request Type | Primary Agent | Secondary Agent | Keywords |
|-------------|---------------|-----------------|----------|
| CI/CD pipelines | ci-cd-architect | security-ops | pipeline, deploy, build, release, artifact, branching |
| Containers/Docker | container-specialist | kubernetes-architect | docker, container, image, registry, dockerfile |
| Kubernetes/orchestration | kubernetes-architect | container-specialist | k8s, cluster, pod, service, helm, ingress |
| Cloud infrastructure | cloud-architect | platform-engineer | aws, azure, gcp, terraform, cloud, IaC, cost |
| Reliability/monitoring | sre-engineer | cloud-architect | SLO, monitoring, alert, incident, observability, uptime |
| Security/compliance | security-ops | ci-cd-architect | security, secrets, compliance, vulnerability, scanning |
| Developer platform | platform-engineer | ci-cd-architect | platform, self-service, golden path, DX, internal tools |
| Full infrastructure | cloud-architect | sre-engineer | new infra, migration, architecture, redesign |

---

## Squad 2: data-ai-squad

### Complete squad.yaml

```yaml
squad:
  code: data-ai-squad
  name: Data & AI Squad
  description: Data engineering, machine learning, AI architecture, NLP, MLOps, and data-driven decision making
  icon: database
  version: "1.0.0"
  category: development
  tags:
    - data-engineering
    - machine-learning
    - ai
    - mlops
    - nlp
    - analytics

  company: "_expxagents/_memory/company.md"
  preferences: "_expxagents/_memory/preferences.md"
  memory: "_memory/memories.md"

  target_audience: "CTOs, data leaders, ML engineers, and teams building data-driven products"
  platform: "Report"
  format: "data-ai-strategy"

  skills:
    - web_search
    - web_fetch

  schedule:
    enabled: true

  data: []

  agents:
    - id: data-ai-chief
      name: Data & AI Chief
      icon: database
      prompt: agents/data-ai-chief.agent.md
    - id: data-engineer
      name: Data Engineer
      icon: hard-drive
      prompt: agents/data-engineer.agent.md
    - id: ml-architect
      name: ML Architect
      icon: cpu
      prompt: agents/ml-architect.agent.md
    - id: data-scientist
      name: Data Scientist
      icon: bar-chart
      prompt: agents/data-scientist.agent.md
    - id: nlp-engineer
      name: NLP Engineer
      icon: message-circle
      prompt: agents/nlp-engineer.agent.md
    - id: llm-architect
      name: LLM Architect
      icon: zap
      prompt: agents/llm-architect.agent.md
    - id: mlops-engineer
      name: MLOps Engineer
      icon: settings
      prompt: agents/mlops-engineer.agent.md
    - id: data-analyst
      name: Data Analyst
      icon: trending-up
      prompt: agents/data-analyst.agent.md

  pipeline:
    steps:
      - id: step-01
        agent: data-ai-chief
        label: Diagnose data/AI challenge and identify relevant specialists
        execution: inline
      - id: step-02
        agent: data-ai-chief
        label: Route to specialists for domain-specific analysis
        deliverFrom: data-ai-chief
        execution: inline
      - id: step-03
        agent: data-ai-chief
        label: Synthesize data/AI strategy and validate architecture
        deliverFrom: data-ai-chief
        execution: inline
      - id: step-04
        agent: data-ai-chief
        label: Design implementation plan and technology stack
        deliverFrom: data-ai-chief
        execution: inline
      - id: step-05
        agent: data-ai-chief
        label: Final Data & AI Strategy Report and implementation roadmap
        deliverFrom: data-ai-chief
        execution: inline
```

### Agents (8)

| # | Agent ID | Icon | Base Agent | Role Summary |
|---|----------|------|-----------|-------------|
| 1 | data-ai-chief | database | data-ai-strategist | Orchestrates data/AI challenges, routes to specialists, synthesizes Data & AI Strategy Report |
| 2 | data-engineer | hard-drive | data-ai-strategist | Data pipelines, ETL/ELT, data lakes, warehouses, streaming, data quality, governance |
| 3 | ml-architect | cpu | data-ai-strategist | ML system design, model selection, training infrastructure, feature stores, experiment tracking |
| 4 | data-scientist | bar-chart | data-ai-strategist | Statistical modeling, hypothesis testing, A/B experiments, causal inference, exploratory analysis |
| 5 | nlp-engineer | message-circle | data-ai-strategist | Text processing, embeddings, classification, NER, sentiment analysis, search/retrieval |
| 6 | llm-architect | zap | data-ai-strategist | LLM integration, RAG architecture, prompt engineering, fine-tuning, agent systems, guardrails |
| 7 | mlops-engineer | settings | data-ai-strategist | Model deployment, monitoring, drift detection, CI/CD for ML, model registry, A/B testing infra |
| 8 | data-analyst | trending-up | data-ai-strategist | Dashboard design, KPI frameworks, SQL optimization, business intelligence, data storytelling |

### Chief Calibration

- **Style:** Data-literate, architecturally rigorous, and business-aware — the voice of a Chief Data Officer who bridges technical depth with business impact
- **Approach:** Problem first, data second, model third — never build ML where a SQL query solves the problem
- **Language:** Respond in the user's language
- **Tone:** Analytical and honest — no AI hype, no "just add ML" solutions, every recommendation grounded in data maturity and business ROI

### Routing Matrix

| Request Type | Primary Agent | Secondary Agent | Keywords |
|-------------|---------------|-----------------|----------|
| Data pipelines/warehousing | data-engineer | data-analyst | pipeline, ETL, warehouse, lake, ingestion, Spark |
| ML system design | ml-architect | mlops-engineer | model, training, features, experiment, ML system |
| Statistical analysis | data-scientist | data-analyst | hypothesis, A/B test, statistics, correlation, experiment |
| Text/language processing | nlp-engineer | llm-architect | NLP, text, sentiment, classification, embeddings, search |
| LLM/GenAI integration | llm-architect | nlp-engineer | LLM, GPT, RAG, prompt, fine-tune, agent, chatbot |
| Model operations | mlops-engineer | ml-architect | deploy model, monitoring, drift, registry, serving |
| BI/dashboards | data-analyst | data-scientist | dashboard, KPI, report, visualization, metrics |
| Full data strategy | data-engineer | ml-architect | data strategy, maturity, architecture, platform |

---

## Squad 3: product-squad

### Complete squad.yaml

```yaml
squad:
  code: product-squad
  name: Product Squad
  description: Product strategy, requirements, roadmapping, user research, agile process, and go-to-market planning
  icon: package
  version: "1.0.0"
  category: general
  tags:
    - product-management
    - roadmap
    - requirements
    - user-research
    - agile
    - go-to-market

  company: "_expxagents/_memory/company.md"
  preferences: "_expxagents/_memory/preferences.md"
  memory: "_memory/memories.md"

  target_audience: "Product managers, founders, CPOs, and product teams"
  platform: "Report"
  format: "product-strategy"

  skills:
    - web_search
    - web_fetch

  schedule:
    enabled: true

  data: []

  agents:
    - id: product-chief
      name: Product Chief
      icon: package
      prompt: agents/product-chief.agent.md
    - id: product-strategist
      name: Product Strategist
      icon: compass
      prompt: agents/product-strategist.agent.md
    - id: ux-researcher
      name: UX Researcher
      icon: users
      prompt: agents/ux-researcher.agent.md
    - id: requirements-analyst
      name: Requirements Analyst
      icon: clipboard
      prompt: agents/requirements-analyst.agent.md
    - id: agile-coach
      name: Agile Coach
      icon: refresh-cw
      prompt: agents/agile-coach.agent.md
    - id: gtm-strategist
      name: Go-to-Market Strategist
      icon: rocket
      prompt: agents/gtm-strategist.agent.md
    - id: pricing-analyst
      name: Pricing Analyst
      icon: dollar-sign
      prompt: agents/pricing-analyst.agent.md
    - id: product-analyst
      name: Product Analyst
      icon: bar-chart
      prompt: agents/product-analyst.agent.md

  pipeline:
    steps:
      - id: step-01
        agent: product-chief
        label: Diagnose product challenge and identify relevant specialists
        execution: inline
      - id: step-02
        agent: product-chief
        label: Route to specialists for domain-specific analysis
        deliverFrom: product-chief
        execution: inline
      - id: step-03
        agent: product-chief
        label: Synthesize product strategy and validate priorities
        deliverFrom: product-chief
        execution: inline
      - id: step-04
        agent: product-chief
        label: Build roadmap and go-to-market recommendations
        deliverFrom: product-chief
        execution: inline
      - id: step-05
        agent: product-chief
        label: Final Product Strategy Report and action plan
        deliverFrom: product-chief
        execution: inline
```

### Agents (8)

| # | Agent ID | Icon | Base Agent | Role Summary |
|---|----------|------|-----------|-------------|
| 1 | product-chief | package | product-strategist | Orchestrates product challenges, routes to specialists, synthesizes Product Strategy Report |
| 2 | product-strategist | compass | product-strategist | Product vision, market positioning, competitive analysis, product-market fit, strategic bets |
| 3 | ux-researcher | users | product-strategist | User interviews, usability testing, persona development, journey mapping, Jobs-to-be-Done |
| 4 | requirements-analyst | clipboard | product-strategist | PRDs, user stories, acceptance criteria, scope definition, dependency mapping |
| 5 | agile-coach | refresh-cw | product-strategist | Sprint planning, backlog management, team velocity, retrospectives, process optimization |
| 6 | gtm-strategist | rocket | product-strategist | Launch planning, channel strategy, messaging, beta programs, adoption funnels |
| 7 | pricing-analyst | dollar-sign | product-strategist | Pricing models, willingness-to-pay research, packaging, tier design, revenue optimization |
| 8 | product-analyst | bar-chart | product-strategist | Product metrics (AARRR), cohort analysis, feature adoption, retention analysis, experimentation |

### Chief Calibration

- **Style:** User-obsessed, data-informed, and commercially sharp — the voice of a CPO who ships products that users love and businesses profit from
- **Approach:** User problem first, solution second, roadmap third — never build features without validated user need
- **Language:** Respond in the user's language
- **Tone:** Decisive and prioritization-focused — says "no" to good ideas to say "yes" to great ones, every recommendation tied to user value and business impact

### Routing Matrix

| Request Type | Primary Agent | Secondary Agent | Keywords |
|-------------|---------------|-----------------|----------|
| Product vision/strategy | product-strategist | product-analyst | vision, strategy, positioning, PMF, competitive |
| User research | ux-researcher | product-strategist | user, interview, usability, persona, JTBD, research |
| Requirements/specs | requirements-analyst | agile-coach | PRD, story, requirements, scope, acceptance criteria |
| Agile/process | agile-coach | requirements-analyst | sprint, backlog, velocity, retro, scrum, kanban |
| Launch/go-to-market | gtm-strategist | pricing-analyst | launch, GTM, beta, channel, adoption, marketing |
| Pricing/packaging | pricing-analyst | gtm-strategist | price, tier, packaging, monetization, revenue |
| Metrics/analytics | product-analyst | ux-researcher | metrics, retention, adoption, cohort, AARRR, churn |
| Full product | product-strategist | ux-researcher | new product, product review, product audit |

---

## Squad 4: research-squad

### Complete squad.yaml

```yaml
squad:
  code: research-squad
  name: Research Squad
  description: Market research, competitive intelligence, trend analysis, and strategic research for informed business decisions
  icon: search
  version: "1.0.0"
  category: marketing
  tags:
    - market-research
    - competitive-intelligence
    - trend-analysis
    - strategic-research
    - industry-analysis

  company: "_expxagents/_memory/company.md"
  preferences: "_expxagents/_memory/preferences.md"
  memory: "_memory/memories.md"

  target_audience: "Founders, strategists, marketing leaders, and business development teams"
  platform: "Report"
  format: "research-strategy"

  skills:
    - web_search
    - web_fetch

  schedule:
    enabled: true

  data: []

  agents:
    - id: research-chief
      name: Research Chief
      icon: search
      prompt: agents/research-chief.agent.md
    - id: market-researcher
      name: Market Researcher
      icon: globe
      prompt: agents/market-researcher.agent.md
    - id: competitive-analyst
      name: Competitive Analyst
      icon: target
      prompt: agents/competitive-analyst.agent.md
    - id: trend-analyst
      name: Trend Analyst
      icon: trending-up
      prompt: agents/trend-analyst.agent.md
    - id: industry-analyst
      name: Industry Analyst
      icon: briefcase
      prompt: agents/industry-analyst.agent.md
    - id: data-researcher
      name: Data Researcher
      icon: database
      prompt: agents/data-researcher.agent.md
    - id: consumer-analyst
      name: Consumer Analyst
      icon: users
      prompt: agents/consumer-analyst.agent.md
    - id: strategic-advisor
      name: Strategic Advisor
      icon: compass
      prompt: agents/strategic-advisor.agent.md

  pipeline:
    steps:
      - id: step-01
        agent: research-chief
        label: Diagnose research question and identify relevant specialists
        execution: inline
      - id: step-02
        agent: research-chief
        label: Route to specialists for domain-specific research
        deliverFrom: research-chief
        execution: inline
      - id: step-03
        agent: research-chief
        label: Synthesize research findings and validate insights
        deliverFrom: research-chief
        execution: inline
      - id: step-04
        agent: research-chief
        label: Build strategic recommendations from research
        deliverFrom: research-chief
        execution: inline
      - id: step-05
        agent: research-chief
        label: Final Research Report and strategic recommendations
        deliverFrom: research-chief
        execution: inline
```

### Agents (8)

| # | Agent ID | Icon | Base Agent | Role Summary |
|---|----------|------|-----------|-------------|
| 1 | research-chief | search | research-strategist | Orchestrates research questions, routes to specialists, synthesizes Research Report |
| 2 | market-researcher | globe | research-strategist | Market sizing, TAM/SAM/SOM, growth projections, market dynamics, entry barriers |
| 3 | competitive-analyst | target | research-strategist | Competitor profiling, SWOT, competitive positioning, feature benchmarking, war gaming |
| 4 | trend-analyst | trending-up | research-strategist | Emerging trends, weak signals, technology adoption curves, future scenarios, foresight |
| 5 | industry-analyst | briefcase | research-strategist | Industry structure (Porter's 5 Forces), value chain analysis, regulatory landscape, industry reports |
| 6 | data-researcher | database | research-strategist | Primary/secondary data sourcing, survey design, data triangulation, statistical validation |
| 7 | consumer-analyst | users | research-strategist | Consumer behavior, segmentation, psychographics, buying patterns, Jobs-to-be-Done research |
| 8 | strategic-advisor | compass | research-strategist | Strategic synthesis, scenario planning, decision frameworks, risk assessment, opportunity prioritization |

### Chief Calibration

- **Style:** Evidence-obsessed, methodologically rigorous, and insight-driven — the voice of a Head of Strategy who turns research into competitive advantage
- **Approach:** Question first, methodology second, data third — never start gathering data without a clear hypothesis or research question
- **Language:** Respond in the user's language
- **Tone:** Objective and nuanced — presents evidence without bias, flags uncertainty levels, distinguishes facts from interpretations

### Routing Matrix

| Request Type | Primary Agent | Secondary Agent | Keywords |
|-------------|---------------|-----------------|----------|
| Market sizing/opportunity | market-researcher | industry-analyst | market size, TAM, opportunity, growth, addressable |
| Competitor analysis | competitive-analyst | market-researcher | competitor, benchmark, SWOT, competitive, rival |
| Trends/foresight | trend-analyst | industry-analyst | trend, emerging, future, disruption, adoption curve |
| Industry structure | industry-analyst | competitive-analyst | industry, Porter, value chain, regulation, structure |
| Data collection/surveys | data-researcher | consumer-analyst | survey, data, primary research, secondary, sources |
| Consumer insights | consumer-analyst | data-researcher | consumer, buyer, behavior, segmentation, persona |
| Strategic synthesis | strategic-advisor | trend-analyst | strategy, decision, scenario, risk, opportunity |
| Full research project | market-researcher | competitive-analyst | research project, market study, due diligence |

---

## Squad 5: qa-squad

### Complete squad.yaml

```yaml
squad:
  code: qa-squad
  name: QA Squad
  description: Quality assurance strategy, test architecture, automation, performance testing, accessibility, and code review practices
  icon: check-circle
  version: "1.0.0"
  category: development
  tags:
    - quality-assurance
    - testing
    - automation
    - performance
    - accessibility
    - code-review

  company: "_expxagents/_memory/company.md"
  preferences: "_expxagents/_memory/preferences.md"
  memory: "_memory/memories.md"

  target_audience: "QA leads, engineering managers, and development teams seeking quality excellence"
  platform: "Report"
  format: "qa-strategy"

  skills:
    - web_search
    - web_fetch

  schedule:
    enabled: true

  data: []

  agents:
    - id: qa-chief
      name: QA Chief
      icon: check-circle
      prompt: agents/qa-chief.agent.md
    - id: test-architect
      name: Test Architect
      icon: layers
      prompt: agents/test-architect.agent.md
    - id: automation-engineer
      name: Automation Engineer
      icon: settings
      prompt: agents/automation-engineer.agent.md
    - id: performance-engineer
      name: Performance Engineer
      icon: zap
      prompt: agents/performance-engineer.agent.md
    - id: accessibility-tester
      name: Accessibility Tester
      icon: eye
      prompt: agents/accessibility-tester.agent.md
    - id: security-tester
      name: Security Tester
      icon: shield
      prompt: agents/security-tester.agent.md
    - id: code-reviewer
      name: Code Review Specialist
      icon: git-pull-request
      prompt: agents/code-reviewer.agent.md
    - id: chaos-engineer
      name: Chaos Engineer
      icon: alert-triangle
      prompt: agents/chaos-engineer.agent.md

  pipeline:
    steps:
      - id: step-01
        agent: qa-chief
        label: Diagnose quality challenge and identify relevant specialists
        execution: inline
      - id: step-02
        agent: qa-chief
        label: Route to specialists for domain-specific analysis
        deliverFrom: qa-chief
        execution: inline
      - id: step-03
        agent: qa-chief
        label: Synthesize quality strategy and validate test architecture
        deliverFrom: qa-chief
        execution: inline
      - id: step-04
        agent: qa-chief
        label: Design test implementation plan and tooling recommendations
        deliverFrom: qa-chief
        execution: inline
      - id: step-05
        agent: qa-chief
        label: Final QA Strategy Report and implementation roadmap
        deliverFrom: qa-chief
        execution: inline
```

### Agents (8)

| # | Agent ID | Icon | Base Agent | Role Summary |
|---|----------|------|-----------|-------------|
| 1 | qa-chief | check-circle | qa-strategist | Orchestrates quality challenges, routes to specialists, synthesizes QA Strategy Report |
| 2 | test-architect | layers | qa-strategist | Test pyramid design, test strategy, coverage analysis, test data management, environments |
| 3 | automation-engineer | settings | qa-strategist | Test automation frameworks, CI integration, flaky test management, parallel execution, reporting |
| 4 | performance-engineer | zap | qa-strategist | Load testing, stress testing, benchmarking, profiling, bottleneck analysis, capacity planning |
| 5 | accessibility-tester | eye | qa-strategist | WCAG compliance, screen reader testing, keyboard navigation, color contrast, ARIA patterns |
| 6 | security-tester | shield | qa-strategist | OWASP Top 10, penetration testing, vulnerability scanning, security test automation |
| 7 | code-reviewer | git-pull-request | qa-strategist | Code review practices, review checklists, architectural review, PR workflow optimization |
| 8 | chaos-engineer | alert-triangle | qa-strategist | Failure injection, resilience testing, game days, blast radius analysis, recovery validation |

### Chief Calibration

- **Style:** Quality-obsessed, risk-aware, and pragmatic — the voice of a VP of Quality who knows that quality is built in, not tested in
- **Approach:** Risk-based testing first — prioritize test investment by business impact, not code coverage percentage
- **Language:** Respond in the user's language
- **Tone:** Honest and constructive — surfaces quality risks without sugarcoating, provides actionable remediation paths

### Routing Matrix

| Request Type | Primary Agent | Secondary Agent | Keywords |
|-------------|---------------|-----------------|----------|
| Test strategy/architecture | test-architect | automation-engineer | test strategy, pyramid, coverage, test plan |
| Test automation | automation-engineer | test-architect | automate, framework, CI, flaky, selenium, playwright |
| Performance/load | performance-engineer | chaos-engineer | load, performance, stress, latency, throughput |
| Accessibility | accessibility-tester | test-architect | WCAG, accessibility, a11y, screen reader, contrast |
| Security testing | security-tester | code-reviewer | OWASP, security, vulnerability, penetration, XSS |
| Code review process | code-reviewer | test-architect | review, PR, code quality, standards, checklist |
| Resilience/chaos | chaos-engineer | performance-engineer | chaos, failure, resilience, game day, recovery |
| Full QA assessment | test-architect | automation-engineer | QA audit, quality assessment, test maturity |

---

## Squad 6: dx-squad

### Complete squad.yaml

```yaml
squad:
  code: dx-squad
  name: Developer Experience Squad
  description: Developer experience optimization, documentation, tooling, refactoring strategy, CLI design, and legacy modernization
  icon: terminal
  version: "1.0.0"
  category: development
  tags:
    - developer-experience
    - documentation
    - tooling
    - refactoring
    - cli
    - modernization

  company: "_expxagents/_memory/company.md"
  preferences: "_expxagents/_memory/preferences.md"
  memory: "_memory/memories.md"

  target_audience: "Engineering managers, platform teams, and developer tools teams"
  platform: "Report"
  format: "dx-strategy"

  skills:
    - web_search
    - web_fetch

  schedule:
    enabled: true

  data: []

  agents:
    - id: dx-chief
      name: DX Chief
      icon: terminal
      prompt: agents/dx-chief.agent.md
    - id: documentation-engineer
      name: Documentation Engineer
      icon: book
      prompt: agents/documentation-engineer.agent.md
    - id: tooling-architect
      name: Tooling Architect
      icon: tool
      prompt: agents/tooling-architect.agent.md
    - id: refactoring-strategist
      name: Refactoring Strategist
      icon: scissors
      prompt: agents/refactoring-strategist.agent.md
    - id: cli-designer
      name: CLI Designer
      icon: terminal
      prompt: agents/cli-designer.agent.md
    - id: legacy-modernizer
      name: Legacy Modernizer
      icon: refresh-cw
      prompt: agents/legacy-modernizer.agent.md
    - id: build-engineer
      name: Build Engineer
      icon: package
      prompt: agents/build-engineer.agent.md
    - id: onboarding-architect
      name: Onboarding Architect
      icon: user-plus
      prompt: agents/onboarding-architect.agent.md

  pipeline:
    steps:
      - id: step-01
        agent: dx-chief
        label: Diagnose developer experience challenge and identify relevant specialists
        execution: inline
      - id: step-02
        agent: dx-chief
        label: Route to specialists for domain-specific analysis
        deliverFrom: dx-chief
        execution: inline
      - id: step-03
        agent: dx-chief
        label: Synthesize DX strategy and validate improvement priorities
        deliverFrom: dx-chief
        execution: inline
      - id: step-04
        agent: dx-chief
        label: Design implementation plan and tooling recommendations
        deliverFrom: dx-chief
        execution: inline
      - id: step-05
        agent: dx-chief
        label: Final DX Strategy Report and implementation roadmap
        deliverFrom: dx-chief
        execution: inline
```

### Agents (8)

| # | Agent ID | Icon | Base Agent | Role Summary |
|---|----------|------|-----------|-------------|
| 1 | dx-chief | terminal | dx-strategist | Orchestrates DX challenges, routes to specialists, synthesizes DX Strategy Report |
| 2 | documentation-engineer | book | dx-strategist | API docs, developer guides, SDK docs, docs-as-code, documentation architecture, Diátaxis framework |
| 3 | tooling-architect | tool | dx-strategist | Developer tooling strategy, IDE integrations, linters, formatters, dev containers, tool evaluation |
| 4 | refactoring-strategist | scissors | dx-strategist | Technical debt assessment, refactoring prioritization, strangler fig patterns, incremental migration |
| 5 | cli-designer | terminal | dx-strategist | CLI UX design, command structure, help systems, shell completions, progressive disclosure |
| 6 | legacy-modernizer | refresh-cw | dx-strategist | Legacy assessment, modernization roadmaps, migration strategies, technology transition planning |
| 7 | build-engineer | package | dx-strategist | Build systems, monorepo tooling, dependency management, build performance, artifact pipelines |
| 8 | onboarding-architect | user-plus | dx-strategist | Developer onboarding flows, "time to first PR" optimization, learning paths, environment setup |

### Chief Calibration

- **Style:** Developer-empathetic, friction-hunting, and productivity-obsessed — the voice of a Head of Platform who measures success by how fast developers ship
- **Approach:** Friction first — find the biggest developer pain points before proposing solutions
- **Language:** Respond in the user's language
- **Tone:** Practical and developer-centric — speaks the language of developers, not management; every recommendation measured by time saved

### Routing Matrix

| Request Type | Primary Agent | Secondary Agent | Keywords |
|-------------|---------------|-----------------|----------|
| Documentation | documentation-engineer | onboarding-architect | docs, API reference, guide, tutorial, documentation |
| Developer tools | tooling-architect | build-engineer | tooling, IDE, linter, formatter, dev container |
| Refactoring/tech debt | refactoring-strategist | legacy-modernizer | refactor, tech debt, cleanup, code quality, migration |
| CLI design | cli-designer | tooling-architect | CLI, command, terminal, shell, flags, arguments |
| Legacy systems | legacy-modernizer | refactoring-strategist | legacy, modernize, migrate, rewrite, strangler |
| Build/monorepo | build-engineer | tooling-architect | build, monorepo, turbo, nx, webpack, vite, deps |
| Developer onboarding | onboarding-architect | documentation-engineer | onboarding, new dev, setup, first PR, ramp-up |
| Full DX assessment | tooling-architect | documentation-engineer | DX audit, developer survey, productivity, friction |

---

## Summary

| Squad | Code | Agents | Category | Base Agent | Focus |
|-------|------|--------|----------|-----------|-------|
| DevOps Squad | devops-squad | 8 | development | devops-strategist | Infrastructure, CI/CD, K8s, cloud, SRE |
| Data & AI Squad | data-ai-squad | 8 | development | data-ai-strategist | Data engineering, ML, LLM, MLOps, analytics |
| Product Squad | product-squad | 8 | general | product-strategist | Product strategy, UX research, roadmap, GTM |
| Research Squad | research-squad | 8 | marketing | research-strategist | Market research, competitive intel, trend analysis |
| QA Squad | qa-squad | 8 | development | qa-strategist | Test architecture, automation, performance, a11y |
| DX Squad | dx-squad | 8 | development | dx-strategist | Documentation, tooling, refactoring, CLI, legacy |

**Total: 6 squads, 48 agents**

### Shared Characteristics

All six squads share:
- **Language:** Bilingual — agents respond in the user's language
- **Independent** — each squad is self-sufficient, no dependency on other squads
- **Global memory:** All squads reference `_expxagents/_memory/company.md` and `_expxagents/_memory/preferences.md`

### Agent File Structure

All agent `.md` files follow the full structure established by existing squads:
- YAML frontmatter: `base_agent`, `id` (fully qualified: `squads/{squad-code}/agents/{agent-id}`), `name`, `icon`, `execution`, `skills`
- Sections: `## Role`, `## Calibration`, `## Instructions` (6-8 numbered), `## Routing Matrix` (chiefs only), `## Expected Input`, `## Expected Output` (with full markdown template), `## Quality Criteria` (5-6 bullets), `## Anti-Patterns` (5-6 bullets)

### File Structure Per Squad

```
squads/[squad-name]/
├── squad.yaml
├── agents/
│   ├── [squad-name]-chief.agent.md
│   ├── [specialist-1].agent.md
│   └── ... (6 more specialists)
└── _memory/
    └── memories.md
```
