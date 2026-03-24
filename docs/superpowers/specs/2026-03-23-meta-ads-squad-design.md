# Meta Ads Squad — Design Spec

**Date:** 2026-03-23
**Status:** Approved
**Category:** marketing
**Squad code:** `meta-ads-squad`
**Version:** 1.0.0

---

## 1. Overview

Squad focada na construção completa de campanhas Meta (Facebook/Instagram). Recebe informações sobre a marca, produto e identidade visual e entrega:

1. **Criativos estáticos** — imagens geradas via google-gemini-3-pro nos formatos 4:5 (feed), 9:16 (stories/reels) e 1.91:1 (horizontal)
2. **Carrosséis** — sequências de imagens com narrativa visual coerente
3. **Reels/Vídeos** — código Remotion (React) renderizado em vídeo final, com imagens Gemini que remetam à marca e ao público-alvo
4. **Copys** — textos persuasivos para cada criativo e placement usando Hook-Story-Offer e AIDA
5. **Configurações de campanha** — estrutura de campanhas, conjuntos de anúncios e configurações Meta
6. **Meta Campaign Report** — documento estruturado com toda a campanha
7. **Página HTML de apresentação** — visualização explicativa de toda a campanha para aprovação do cliente

A squad segue o padrão **Andromeda**: pipeline linear, base agent domain-specific (`campaign-strategist`), frameworks nomeados, quality criteria + anti-patterns, markdown-first outputs.

### Estrutura de campanha fixa

- **3 conjuntos por temperatura de público:** frio (prospecção), morno (engajamento), quente (conversão)
- **Campanhas de oferta direta:** promoções, lançamentos, ofertas limitadas
- **Campanhas de remarketing:** recuperação de visitantes, carrinho abandonado, engajamento anterior

### Dependência: API Key do Gemini

A squad usa `google-gemini-3-pro` para geração de imagens. Se a variável `GEMINI_API_KEY` não estiver configurada no `.env`, o Campaign Chief deve instruir o usuário a cadastrá-la antes de prosseguir.

### Dependência: Remotion

Para renderização dos Reels, a squad gera código React/Remotion completo e executa `npx remotion render` para entregar o vídeo final ao usuário. As imagens dos vídeos são geradas via Gemini com prompts que remetam à marca e ao público-alvo.

---

## 2. Structure

```
squads/meta-ads-squad/
├── squad.yaml
├── _memory/
│   └── memories.md
└── agents/
    ├── campaign-chief.agent.md
    ├── audience-strategist.agent.md
    ├── creative-director.agent.md
    ├── ad-copywriter.agent.md
    ├── reels-producer.agent.md
    ├── media-planner.agent.md
    └── campaign-presenter.agent.md
```

---

## 3. squad.yaml

```yaml
squad:
  code: meta-ads-squad
  name: Meta Ads Squad
  description: "Complete Meta campaign builder — from brand briefing to creatives, copies, Reels, ad set configurations, and a visual HTML campaign presentation."
  icon: zap
  version: "1.0.0"
  category: marketing
  tags:
    - meta-ads
    - facebook-ads
    - instagram-ads
    - campaign
    - creatives
    - reels
    - remotion
    - paid-media
    - remarketing

  company: "_expxagents/_memory/company.md"
  preferences: "_expxagents/_memory/preferences.md"
  memory: "_memory/memories.md"

  target_audience: "Marketers, agencies, media buyers, growth teams, and solopreneurs building Meta advertising campaigns"
  platform: "Report"
  format: "meta-campaign"

  skills:
    - web_search
    - web_fetch
    - frontend-design
    - google-gemini-3-pro
    - remotion

  schedule:
    enabled: true

  data: []

  agents:
    - id: campaign-chief
      name: Campaign Strategist Chief
      icon: zap
      prompt: agents/campaign-chief.agent.md
    - id: audience-strategist
      name: Audience Strategist
      icon: users
      prompt: agents/audience-strategist.agent.md
    - id: creative-director
      name: Creative Director
      icon: image
      prompt: agents/creative-director.agent.md
    - id: ad-copywriter
      name: Ad Copywriter
      icon: edit
      prompt: agents/ad-copywriter.agent.md
    - id: reels-producer
      name: Reels Producer
      icon: film
      prompt: agents/reels-producer.agent.md
    - id: media-planner
      name: Media Planner
      icon: bar-chart
      prompt: agents/media-planner.agent.md
    - id: campaign-presenter
      name: Campaign Presenter
      icon: layout
      prompt: agents/campaign-presenter.agent.md

  pipeline:
    steps:
      - id: step-01
        agent: campaign-chief
        label: Receive briefing, validate API keys, diagnose campaign objective and brand context
        execution: inline
      - id: step-02
        agent: audience-strategist
        label: Segment audiences by temperature (cold/warm/hot), define remarketing and lookalike strategies
        deliverFrom: campaign-chief
        execution: inline
      - id: step-03
        agent: creative-director
        label: Define creative direction and generate images via Gemini for all formats (4:5, 9:16, 1.91:1)
        deliverFrom: campaign-chief
        execution: inline
        skill: google-gemini-3-pro
      - id: step-04
        agent: ad-copywriter
        label: Write copies for each creative, placement, and audience temperature
        deliverFrom: campaign-chief
        execution: inline
      - id: step-05
        agent: reels-producer
        label: Generate Remotion code with Gemini images and render final Reels videos
        deliverFrom: campaign-chief
        execution: inline
        skill: remotion
      - id: step-06
        agent: media-planner
        label: Structure campaigns, ad sets, budgets, placements, and Meta configurations
        deliverFrom: campaign-chief
        execution: inline
      - id: step-07
        agent: campaign-chief
        label: Synthesize Meta Campaign Report from all specialist outputs
        deliverFrom: campaign-chief
        execution: inline
        output: meta-campaign-report.md
      - id: step-08
        agent: campaign-chief
        label: Quality checkpoint — review report completeness before HTML generation
        deliverFrom: campaign-chief
        execution: inline
        checkpoint: true
        on_reject: step-07
      - id: step-09
        agent: campaign-presenter
        label: Generate HTML campaign presentation from the approved Meta Campaign Report
        deliverFrom: campaign-chief
        execution: inline
        skill: frontend-design
        output: meta-campaign.html
```

---

## 4. Agents

### 4.1 Campaign Chief

- **base_agent:** campaign-strategist
- **id:** squads/meta-ads-squad/agents/campaign-chief
- **name:** Campaign Strategist Chief
- **icon:** zap
- **execution:** inline
- **skills:** web_search, web_fetch

**Role:** Inteligência orquestradora. Recebe o briefing da marca/produto/identidade visual, valida que a `GEMINI_API_KEY` está configurada, diagnostica o objetivo de campanha, roteia para especialistas e sintetiza o Meta Campaign Report.

**Expected Input:**
- Nome da marca e produto
- Identidade visual (cores, fontes, logo, tom de voz)
- Público-alvo
- Objetivo da campanha (awareness, tráfego, engajamento, leads, conversão, vendas)
- Oferta principal (se houver)
- Orçamento disponível (se informado)
- Assets existentes (fotos, vídeos, depoimentos)

**Diagnóstico inicial:**
- Objetivo da campanha (mapeado para objetivos Meta: Awareness, Traffic, Engagement, Leads, App Promotion, Sales)
- Tipo de oferta (oferta direta, conteúdo, lead magnet, lançamento)
- Maturidade do público (nunca ouviu falar, já engajou, já comprou)
- Setor e linguagem do público

**Routing Matrix:**

| Request Type | Primary Agent | Secondary Agent | Keywords |
|-------------|---------------|-----------------|----------|
| Público e segmentação | audience-strategist | media-planner | público, audiência, segmentação, lookalike, remarketing |
| Criativos visuais | creative-director | ad-copywriter | imagem, criativo, banner, carrossel, visual |
| Copy e texto | ad-copywriter | creative-director | texto, copy, headline, CTA, descrição |
| Vídeos e Reels | reels-producer | creative-director | vídeo, reels, stories, animação, remotion |
| Estrutura de campanha | media-planner | audience-strategist | campanha, conjunto, orçamento, lance, placement |
| Campanha completa | campaign-chief | todos | campanha completa, full campaign, tudo |

**Entregável — Meta Campaign Report:**

```markdown
# Meta Campaign Report: [Marca/Produto]

## 1. Sumário Executivo
Visão geral da campanha: objetivo, público, criativos produzidos, estrutura de campanha e investimento recomendado.

## 2. Diagnóstico da Marca
- Marca e produto
- Identidade visual (cores, fontes, tom)
- Setor e posicionamento
- Objetivo da campanha

## 3. Estratégia de Público
(Sintetizado do Audience Strategist)
- Públicos frios (prospecção)
- Públicos mornos (engajamento)
- Públicos quentes (conversão)
- Estratégia de remarketing
- Lookalike audiences

## 4. Criativos Visuais
(Sintetizado do Creative Director)
- Direção criativa
- Imagens estáticas (4:5, 9:16, 1.91:1)
- Carrosséis
- Prompts Gemini utilizados

## 5. Copy Framework
(Sintetizado do Ad Copywriter)
- Headlines por temperatura de público
- Textos primários
- Descrições
- CTAs por placement

## 6. Reels e Vídeos
(Sintetizado do Reels Producer)
- Roteiros
- Composições Remotion
- Vídeos renderizados

## 7. Estrutura de Campanha Meta
(Sintetizado do Media Planner)
- Campanhas e objetivos
- Conjuntos de anúncios
- Configurações de placement
- Orçamento e lances
- Cronograma

## 8. Pontos de Convergência entre Especialistas
Onde as análises se reforçam mutuamente.

## 9. Métricas e KPIs
- KPIs primários por objetivo
- Benchmarks do setor
- Sinais de alerta

## 10. Checklist de Qualidade da Campanha
Validação completa antes de subir para o Meta Ads Manager.
```

### 4.2 Audience Strategist

- **base_agent:** campaign-strategist
- **id:** squads/meta-ads-squad/agents/audience-strategist
- **name:** Audience Strategist
- **icon:** users
- **execution:** inline
- **skills:** web_search, web_fetch

**Role:** Especialista em segmentação de público para Meta Ads. Mapeia públicos por temperatura (frio/morno/quente), define estratégias de remarketing, lookalike audiences e exclusões. Toda recomendação usa o framework Customer Temperature.

**Frameworks:** Customer Temperature (frio/morno/quente), Meta Advantage+ Audience, Lookalike Audience Strategy

**Output sections:**
- Públicos frios: interesses, comportamentos, dados demográficos
- Públicos mornos: engajamento com página, vídeo views, interação com anúncios
- Públicos quentes: visitantes do site, lista de e-mails, compradores anteriores
- Remarketing: janelas de tempo (1d, 3d, 7d, 14d, 30d, 60d, 90d, 180d)
- Lookalike: source audiences, percentuais (1%, 2%, 5%, 10%), país/região
- Exclusões: evitar sobreposição entre conjuntos

### 4.3 Creative Director

- **base_agent:** campaign-strategist
- **id:** squads/meta-ads-squad/agents/creative-director
- **name:** Creative Director
- **icon:** image
- **execution:** inline
- **skills:** web_search, web_fetch, google-gemini-3-pro

**Role:** Diretor criativo que define a direção visual de toda a campanha e gera as imagens via API google-gemini-3-pro. Produz criativos estáticos e carrosséis nos formatos 4:5 (feed), 9:16 (stories/reels) e 1.91:1 (horizontal). Cada imagem deve refletir a identidade visual da marca e ressoar com o público-alvo do setor.

**Frameworks:** AIDA visual (cada criativo guia o olho: Attention → Interest → Desire → Action), Creative Fatigue Cycle (variações para evitar fadiga)

**Geração de imagens:**
- Usa a skill `google-gemini-3-pro` para gerar imagens
- Se `GEMINI_API_KEY` não estiver configurada, instrui o usuário a adicioná-la ao `.env`
- Prompts de imagem devem incluir: identidade visual da marca (cores, estilo), contexto do setor, público-alvo, formato exato (4:5, 9:16, 1.91:1)
- Mínimo: 3 criativos estáticos por temperatura de público × 3 formatos = 27 imagens
- Carrosséis: 3-5 cards por carrossel, narrativa sequencial

**Output sections:**
- Direção criativa (mood board descritivo, paleta, estilo fotográfico)
- Criativos estáticos por formato e temperatura
- Carrosséis com narrativa sequencial
- Prompts Gemini utilizados (para reprodutibilidade)
- Guia de adaptação por placement

### 4.4 Ad Copywriter

- **base_agent:** campaign-strategist
- **id:** squads/meta-ads-squad/agents/ad-copywriter
- **name:** Ad Copywriter
- **icon:** edit
- **execution:** inline
- **skills:** web_search, web_fetch

**Role:** Copywriter especializado em Meta Ads. Produz headlines, textos primários, descrições e CTAs para cada criativo e placement. Adapta a mensagem por temperatura de público usando Hook-Story-Offer e AIDA.

**Frameworks:** Hook-Story-Offer (Russell Brunson), AIDA (Attention, Interest, Desire, Action), PAS (Problem, Agitation, Solution)

**Regras de copy por temperatura:**
- **Frio:** Hook forte (interrupção), história de identificação, oferta de baixo comprometimento
- **Morno:** Hook de reconhecimento, história de transformação, oferta de engajamento
- **Quente:** Hook direto, prova social/resultado, oferta direta com urgência

**Regras de formato Meta:**
- Headline: máx 40 caracteres (recomendado)
- Texto primário: 125 caracteres visíveis antes do "Ver mais" — o hook deve estar aqui
- Descrição: máx 30 caracteres
- CTA: usar os CTAs nativos do Meta (Shop Now, Learn More, Sign Up, etc.) + texto customizado

**Output sections:**
- Copy matrix: texto primário × headline × descrição × CTA por (temperatura × criativo)
- Variações A/B para os top criativos
- Copy para carrosséis (texto por card)
- Copy para Reels (roteiro de narração/texto on-screen)

### 4.5 Reels Producer

- **base_agent:** campaign-strategist
- **id:** squads/meta-ads-squad/agents/reels-producer
- **name:** Reels Producer
- **icon:** film
- **execution:** inline
- **skills:** web_search, web_fetch, google-gemini-3-pro, remotion

**Role:** Produtor de Reels que gera código React/Remotion completo, usa a API Gemini para gerar imagens que remetam à marca e ao público-alvo, e renderiza o vídeo final entregue ao usuário. O vídeo deve seguir a identidade visual da marca e usar o framework Hook-Story-Offer adaptado para vídeo curto (15-30s).

**Geração de imagens para vídeo:**
- Usa `google-gemini-3-pro` para gerar imagens de fundo, elementos visuais e cenas
- Cada imagem deve remeter à marca (cores, estilo) e ao público-alvo (contexto do setor, personas)
- Prompts devem ser específicos: cenário do setor, cores da marca, estilo fotográfico alinhado com a identidade visual

**Estrutura do vídeo (Hook-Story-Offer para Reels):**
- **0-3s — Hook visual:** Imagem/animação impactante que interrompe o scroll
- **3-15s — Story:** Apresentação do problema/transformação com imagens do setor
- **15-25s — Offer:** Apresentação da solução/oferta com CTA visual
- **25-30s — CTA:** Call-to-action final com urgência visual

**Código Remotion:**
- Composição React completa com todas as dependências
- Imagens geradas via Gemini integradas como assets
- Tipografia e cores da identidade visual da marca
- Animações de entrada/saída para cada cena
- Formato: 9:16 (1080×1920) para Reels
- Duração: 15-30 segundos
- FPS: 30
- Renderização via `npx remotion render`

**Output:**
- Roteiro visual cena a cena
- Código Remotion completo
- Imagens geradas (via Gemini)
- Vídeo final renderizado
- Versões: mínimo 2 variações por temperatura de público

### 4.6 Media Planner

- **base_agent:** campaign-strategist
- **id:** squads/meta-ads-squad/agents/media-planner
- **name:** Media Planner
- **icon:** bar-chart
- **execution:** inline
- **skills:** web_search, web_fetch

**Role:** Planejador de mídia que estrutura campanhas, conjuntos de anúncios, configurações de placement, orçamento e cronograma no Meta Ads Manager. Toda configuração segue as melhores práticas do algoritmo Andromeda da Meta.

**Frameworks:** Meta Andromeda Algorithm Best Practices, Campaign Budget Optimization (CBO), Advantage+ Shopping Campaigns

**Estrutura fixa de campanha:**

1. **Campanha de Prospecção (Frio)**
   - Objetivo: Awareness/Traffic/Leads (conforme diagnóstico)
   - Conjuntos: por interesse/comportamento/lookalike
   - Placements: Feed (4:5), Stories (9:16), Reels (9:16), Audience Network (1.91:1)

2. **Campanha de Engajamento (Morno)**
   - Objetivo: Engagement/Traffic/Leads
   - Conjuntos: engajadores de página, video viewers, visitantes do site
   - Placements: Feed, Stories, Reels

3. **Campanha de Conversão (Quente)**
   - Objetivo: Sales/Leads/Conversions
   - Conjuntos: compradores anteriores, lista de e-mails, carrinho abandonado
   - Placements: Feed, Stories, Reels

4. **Campanha de Oferta Direta**
   - Objetivo: Sales/Conversions
   - Promoções, lançamentos, ofertas limitadas
   - Todos os públicos com mensagem adaptada

5. **Campanha de Remarketing**
   - Objetivo: Sales/Conversions
   - Janelas de remarketing escalonadas (3d, 7d, 14d, 30d)
   - Mensagem progressiva por tempo de abandono

**Output sections:**
- Tabela de campanhas com objetivo, orçamento, período
- Tabela de conjuntos por campanha com público, placement, lance
- Configurações de otimização (CBO, Advantage+)
- Cronograma de ativação
- Regras automatizadas sugeridas
- Nomenclatura padronizada (naming convention)

### 4.7 Campaign Presenter

- **base_agent:** campaign-strategist
- **id:** squads/meta-ads-squad/agents/campaign-presenter
- **name:** Campaign Presenter
- **icon:** layout
- **execution:** inline
- **skills:** frontend-design

**Role:** Designer visual que traduz o Meta Campaign Report em uma página HTML interativa e explicativa. A página serve como apresentação da campanha para aprovação do cliente — tom explicativo, não de venda. Usa os mesmos padrões visuais do produto-blueprint-squad (single HTML, inline CSS/JS, dark mode, glass-morphism, Three.js, responsivo, acessível).

**Seções da página HTML:**
1. **Hero** — nome da marca + objetivo da campanha + indicadores-chave (nº criativos, nº campanhas, nº públicos)
2. **Estratégia de Público** — cards por temperatura com detalhamento de segmentação
3. **Galeria de Criativos** — grid de imagens com preview por formato, filtro por temperatura
4. **Copy Framework** — cards com headline + texto primário + CTA por criativo
5. **Reels Showcase** — embed ou thumbnail dos vídeos com roteiro
6. **Estrutura de Campanha** — diagrama visual das campanhas, conjuntos e anúncios
7. **Cronograma** — timeline visual de ativação
8. **Métricas e KPIs** — dashboard com benchmarks e metas
9. **Footer** — meta-informações da campanha

---

## 5. Frameworks

| Framework | Usado por | Aplicação |
|-----------|-----------|-----------|
| AIDA | Creative Director, Ad Copywriter | Estrutura visual e textual dos criativos |
| Hook-Story-Offer | Ad Copywriter, Reels Producer | Copy e roteiro de Reels |
| Customer Temperature | Audience Strategist, Ad Copywriter, Creative Director | Segmentação e adaptação de mensagem |
| Creative Fatigue Cycle | Creative Director | Variações para evitar saturação |
| Meta Andromeda Algorithm | Media Planner | Configurações otimizadas para o algoritmo |
| PAS | Ad Copywriter | Estrutura de copy para público frio |
| CBO (Campaign Budget Optimization) | Media Planner | Distribuição de orçamento |

---

## 6. Skills Requeridas

| Skill | Usado por | Propósito |
|-------|-----------|-----------|
| web_search | Todos (exceto Campaign Presenter) | Pesquisa de mercado, benchmarks, referências |
| web_fetch | Todos (exceto Campaign Presenter) | Acesso a URLs de referência |
| google-gemini-3-pro | Creative Director, Reels Producer | Geração de imagens via API |
| remotion | Reels Producer | Geração e renderização de vídeos |
| frontend-design | Campaign Presenter | Geração da página HTML de apresentação |

---

## 7. Formatos de Criativo

| Formato | Ratio | Resolução | Uso |
|---------|-------|-----------|-----|
| Feed | 4:5 | 1080×1350 | Feed do Facebook e Instagram |
| Stories/Reels | 9:16 | 1080×1920 | Stories e Reels |
| Horizontal | 1.91:1 | 1200×628 | Audience Network, links |

---

## 8. Validação de API Key

No step-01, o Campaign Chief deve:
1. Verificar se `GEMINI_API_KEY` está configurada no `.env`
2. Se não estiver, instruir o usuário: "Para gerar criativos e imagens, adicione sua API Key do Google Gemini ao arquivo `.env`: `GEMINI_API_KEY=sua-chave-aqui`"
3. Não prosseguir com steps que dependem de geração de imagem sem a key configurada

---

## 9. Quality Criteria (squad-level)

- Todos os criativos devem refletir a identidade visual da marca (cores, fontes, estilo)
- Cada temperatura de público deve ter criativos e copys específicos — nunca a mesma mensagem para frio e quente
- Copys devem usar linguagem do setor do público-alvo — proibido jargão genérico
- Imagens geradas via Gemini devem remeter ao contexto da marca e do público-alvo — nunca imagens genéricas
- Reels devem usar Hook-Story-Offer com hook nos primeiros 3 segundos
- Estrutura de campanha deve seguir naming convention padronizada
- A página HTML de apresentação deve ser explicativa, não comercial
- Todos os textos no idioma do usuário com acentuação perfeita

## 10. Anti-Patterns (squad-level)

- Não usar a mesma copy para todas as temperaturas de público
- Não gerar imagens genéricas sem contexto de marca e setor
- Não criar Reels sem hook visual nos primeiros 3 segundos
- Não configurar campanhas sem exclusão de públicos entre conjuntos
- Não usar CTAs genéricos ("Saiba mais" para público quente que precisa de "Comprar agora")
- Não ignorar o Creative Fatigue Cycle — cada criativo precisa de variações
- Não subir campanha sem naming convention padronizada
- Não gerar a página HTML com tom de vendas — é uma apresentação explicativa
