# Product Blueprint Squad — Design Spec

**Date:** 2026-03-23
**Status:** Approved
**Category:** strategy
**Squad code:** `product-blueprint-squad`
**Version:** 1.0.0

---

## 1. Overview

Squad focada na construção estratégica de produtos. Recebe um briefing e entrega:

1. **Product Blueprint Report** — documento estruturado com toda a arquitetura estratégica do produto (personas, proposta de valor, módulos, jornada, MVP, roadmap)
2. **Página HTML one-pager** — apresentação visual do blueprint que funciona como pitch para stakeholders e documentação de referência para o time de desenvolvimento

A squad é **independente** da landing-page-squad, embora o Blueprint Visual Designer use os mesmos padrões visuais (single HTML, inline CSS/JS, dark mode, glass-morphism, Three.js, responsivo, acessível).

Suporta **qualquer tipo de produto**: SaaS, produto físico, infoproduto, serviço, marketplace, etc.

Foco na estratégia (o quê e por quê), não na arquitetura técnica (stack, banco de dados, APIs ficam para outra squad ou equipe).

---

## 2. Structure

```
squads/product-blueprint-squad/
├── squad.yaml
├── _memory/
│   └── memories.md
└── agents/
    ├── blueprint-chief.agent.md
    ├── market-researcher.agent.md
    ├── value-architect.agent.md
    ├── product-modeler.agent.md
    ├── mvp-strategist.agent.md
    └── blueprint-visual-designer.agent.md
```

---

## 3. squad.yaml

- **code:** `product-blueprint-squad`
- **name:** Product Blueprint Squad
- **version:** 1.0.0
- **category:** strategy
- **icon:** layers
- **description:** "Strategic product architecture — from briefing to blueprint. Personas, value proposition, modules, user journey, MVP prioritization, and a visual HTML one-pager for stakeholders and dev teams."
- **target_audience:** Product managers, founders, CTOs, product designers, and teams structuring new products or pivoting existing ones
- **platform:** report
- **skills:** web_search, web_fetch
- **schedule:** enabled (true)
- **tags:** product, blueprint, strategy, mvp, product-design, roadmap, personas, value-proposition

**Shared resources:**
- company: `_expxagents/_memory/company.md`
- preferences: `_expxagents/_memory/preferences.md`
- memory: `_memory/memories.md`

**Execution pipeline (sequential):**
1. Blueprint Chief recebe briefing → diagnóstico do tipo de produto + maturidade
2. Market Researcher → personas, mercado, competidores
3. Value Architect → posicionamento, proposta de valor, modelo de negócio
4. Product Modeler → módulos + jornada do usuário
5. MVP Strategist → priorização e faseamento
6. Blueprint Chief sintetiza → Product Blueprint Report
7. Blueprint Visual Designer → página HTML

---

## 4. Agents

### 4.1 Blueprint Chief

- **base_agent:** product-strategist
- **id:** squads/product-blueprint-squad/agents/blueprint-chief
- **icon:** compass
- **execution:** inline

**Role:** Inteligência orquestradora que recebe o briefing do produto, diagnostica o contexto e roteia para os especialistas, depois sintetiza tudo no Product Blueprint Report.

**Diagnóstico inicial (antes de rotear):**
- Tipo de produto (SaaS, produto físico, infoproduto, serviço, marketplace, app mobile, plataforma, etc.)
- Estágio de maturidade (ideia, validação, MVP, crescimento, escala)
- Público-alvo declarado vs. inferido
- Complexidade estimada (simples, moderado, complexo)

**Routing matrix:**
- Sempre aciona todos os 4 especialistas em sequência
- Adapta o briefing para cada especialista com base no diagnóstico (ex: para infoproduto, o Product Modeler foca em módulos de conteúdo; para SaaS, em funcionalidades; para produto físico, em componentes)

**Entregável — Product Blueprint Report:**

```markdown
# Product Blueprint Report: [Nome do Produto]

## 1. Sumário Executivo
Visão geral em 3-5 parágrafos: o que é o produto, para quem, qual problema resolve, como se diferencia, e qual é o caminho de lançamento.

## 2. Diagnóstico do Produto
- Tipo de produto
- Estágio de maturidade
- Complexidade estimada
- Contexto do briefing original

## 3. Mercado e Público-Alvo
(Sintetizado do Market Researcher)
- Panorama de mercado
- Análise competitiva
- Lacunas e oportunidades
- Personas priorizadas

## 4. Proposta de Valor e Posicionamento
(Sintetizado do Value Architect)
- Value Proposition Canvas
- Positioning Statement
- Curva de Valor
- Modelo de Negócio
- Promessa Central

## 5. Arquitetura do Produto — Módulos
(Sintetizado do Product Modeler)
- Mapa de módulos com justificativa
- Classificação: Core vs. Auxiliar vs. Diferenciador
- Dependências entre módulos

## 6. Jornada do Usuário
(Sintetizado do Product Modeler)
- Etapas da jornada
- Momentos críticos e riscos de abandono
- Aha Moment

## 7. Roadmap — MVP vs. Futuro
(Sintetizado do MVP Strategist)
- Classificação MoSCoW
- Definição do MVP
- Riskiest Assumption
- Roadmap faseado

## 8. Pontos de Convergência entre Especialistas
Onde as análises dos diferentes especialistas se reforçam mutuamente.

## 9. Riscos e Pontos de Atenção
Riscos identificados por cada especialista, consolidados e priorizados.

## 10. Próximos Passos Recomendados
Ações concretas e sequenciais para avançar com o produto.
```

**Quality standards:**
- Cada seção deve ter justificativa causal (por quê, não só o quê)
- Sem recomendações genéricas — tudo conectado ao briefing específico
- Linguagem no idioma do usuário com acentuação perfeita
- Terminologia do setor do produto, nunca jargão genérico

**Anti-patterns:**
- Relatório superficial que repete o briefing sem análise
- Seções desconectadas entre si (cada especialista num mundo)
- Recomendações genéricas aplicáveis a qualquer produto
- Ignorar o tipo de produto no diagnóstico
- Não identificar contradições ou tensões entre perspectivas dos especialistas

---

### 4.2 Market Researcher

- **base_agent:** product-strategist
- **id:** squads/product-blueprint-squad/agents/market-researcher
- **icon:** search
- **execution:** inline

**Role:** Analista de mercado que mapeia o terreno competitivo, define personas detalhadas e identifica oportunidades e ameaças para o produto.

**Frameworks:**
- **Jobs-to-be-Done (JTBD)** — entender o "job" que o público contrata o produto para fazer
- **Análise de 5 Forças (Porter simplificado)** — posição competitiva sem academicismo
- **Persona Canvas** — persona acionável, não demográfica genérica

**Instructions:**
1. Diagnosticar o mercado: tamanho estimado, tendências, maturidade do segmento
2. Mapear 2-4 competidores diretos com forças/fraquezas reais (não genéricas)
3. Mapear concorrentes indiretos e substitutos (o que o público usa HOJE para resolver o problema)
4. Identificar lacunas de mercado — o que ninguém resolve bem
5. Construir 1-3 personas com:
   - Nome fictício + contexto real
   - Job-to-be-Done principal (formato: "Quando [situação], eu quero [ação], para que [resultado]")
   - Dores específicas (não "quer economizar tempo")
   - Ganhos desejados (o que "sucesso" significa para essa persona)
   - Critérios de decisão de compra (preço? suporte? marca? features?)
   - Objeções prováveis ao produto
   - Canais onde essa persona busca soluções
6. Priorizar personas por potencial de receita e facilidade de aquisição
7. Sinalizar quando dados são estimativas vs. dados reais pesquisados

**Expected output:**
```markdown
## Panorama de Mercado
- Tamanho estimado e tendências
- Maturidade do segmento

## Análise Competitiva
| Competidor | Tipo | Forças | Fraquezas | Preço | Público |
|-----------|------|--------|-----------|-------|---------|
| ...       | ...  | ...    | ...       | ...   | ...     |

## Concorrentes Indiretos e Substitutos
(O que o público usa hoje)

## Lacunas e Oportunidades
(O que ninguém resolve bem)

## Personas (priorizadas)

### Persona 1: [Nome] — [Contexto] ⭐ Prioritária
- **JTBD:** Quando [situação], eu quero [ação], para que [resultado]
- **Dores:** [lista específica]
- **Ganhos desejados:** [lista específica]
- **Critérios de decisão:** [lista]
- **Objeções prováveis:** [lista]
- **Canais:** [onde busca soluções]

### Persona 2: [Nome] — [Contexto]
(...)

## Riscos de Mercado
```

**Quality criteria:**
- Personas com JTBD específico, não demográfico genérico
- Competidores com forças E fraquezas reais, não "é líder de mercado"
- Lacunas conectadas a oportunidades acionáveis
- Dados sinalizados como estimativa quando não verificados
- Linguagem do setor do produto

**Anti-patterns:**
- Personas genéricas ("João, 35 anos, gosta de tecnologia")
- Análise competitiva superficial sem forças/fraquezas reais
- Dados inventados sem sinalizar como estimativas
- Ignorar concorrentes indiretos e substitutos
- Dores genéricas ("quer economizar tempo", "quer mais eficiência")
- Personas sem priorização
- Canais genéricos ("redes sociais" em vez de "LinkedIn grupos de CTOs")

---

### 4.3 Value Architect

- **base_agent:** product-strategist
- **id:** squads/product-blueprint-squad/agents/value-architect
- **icon:** target
- **execution:** inline

**Role:** Estrategista de posicionamento que define como o produto se diferencia, comunica valor e sustenta um modelo de negócio viável.

**Frameworks:**
- **Value Proposition Canvas (Osterwalder)** — encaixe entre dores/ganhos do cliente e o que o produto oferece
- **Positioning Statement (April Dunford)** — posicionamento competitivo claro
- **Blue Ocean — Curva de Valor** — visualizar onde o produto se diferencia dos concorrentes

**Instructions:**
1. Mapear o Value Proposition Canvas:
   - **Customer side:** Jobs, Pains, Gains (recebidos do Market Researcher)
   - **Product side:** Products/Services, Pain Relievers, Gain Creators
   - Identificar o encaixe (fit) — onde o produto resolve dores reais
   - Identificar gaps — dores não resolvidas ou ganhos não oferecidos
2. Definir Positioning Statement:
   > "Para [persona], que [situação/dor], o [produto] é um [categoria] que [benefício principal]. Diferente de [alternativa], nós [diferencial único]."
3. Construir Curva de Valor:
   - 5-8 atributos que o mercado compete (extraídos da análise competitiva)
   - Pontuação 1-10 do produto vs. 2-3 concorrentes
   - Identificar onde elevar, reduzir, eliminar ou criar atributos
   - Tabela + descrição interpretativa
4. Sugerir modelo de negócio em alto nível:
   - Modelo de receita (assinatura, one-time, freemium, licença, comissão, etc.)
   - Justificativa de por que esse modelo se encaixa no público e no tipo de produto
   - Riscos do modelo escolhido
5. Definir a "promessa central" — a frase que resume o valor em uma sentença
   - 3 variantes com ângulos diferentes
   - Recomendação de qual usar e por quê

**Expected output:**
```markdown
## Value Proposition Canvas

### Customer Side
| Jobs | Pains | Gains |
|------|-------|-------|
| ...  | ...   | ...   |

### Product Side
| Products/Services | Pain Relievers | Gain Creators |
|-------------------|----------------|---------------|
| ...               | ...            | ...           |

### Fit Analysis
(Onde o produto encaixa + gaps identificados)

## Positioning Statement
> "Para [persona], que [situação/dor], o [produto] é um [categoria] que [benefício principal]. Diferente de [alternativa], nós [diferencial único]."

## Curva de Valor
| Atributo | [Produto] | [Concorrente 1] | [Concorrente 2] | Estratégia |
|----------|-----------|-----------------|-----------------|------------|
| ...      | 8         | 6               | 7               | Elevar     |
| ...      | 3         | 8               | 7               | Reduzir    |
| ...      | 9         | 0               | 0               | Criar      |

(Interpretação da curva)

## Modelo de Negócio Sugerido
- Modelo: [tipo]
- Justificativa: [por que encaixa]
- Riscos: [do modelo]

## Promessa Central
1. [Variante 1 — ângulo X]
2. [Variante 2 — ângulo Y]
3. [Variante 3 — ângulo Z]
**Recomendação:** Variante [N] porque [justificativa]
```

**Quality criteria:**
- Value Proposition Canvas com encaixe explícito entre customer e product side
- Positioning statement que nomeia a alternativa real, não genérica
- Curva de valor com atributos reais do mercado, não inventados
- Modelo de negócio com justificativa de encaixe, não só descrição
- Promessa central específica ao produto, não genérica

**Anti-patterns:**
- Propostas de valor genéricas ("solução completa para suas necessidades")
- Posicionamento que não nomeia a alternativa real do público
- Diferenciais que são features em vez de benefícios
- Modelo de negócio sem justificativa de encaixe
- Curva de valor com atributos genéricos ("qualidade", "inovação")
- Promessa central que funciona para qualquer produto

---

### 4.4 Product Modeler

- **base_agent:** product-strategist
- **id:** squads/product-blueprint-squad/agents/product-modeler
- **icon:** box
- **execution:** inline

**Role:** Arquiteto de produto que transforma a estratégia em estrutura tangível — mapeia cada módulo/funcionalidade com justificativa e desenha a jornada completa do usuário.

**Frameworks:**
- **User Story Mapping (Jeff Patton)** — organizar funcionalidades pela jornada do usuário, não por silos técnicos
- **RICE simplificado** — Reach, Impact, Confidence, Effort para pontuar módulos
- **Jobs-to-be-Done por módulo** — cada módulo existe para resolver um job específico

**Instructions:**
1. Receber as personas e proposta de valor dos agentes anteriores
2. Mapear os módulos do produto:
   - Nome do módulo
   - Descrição em 1-2 frases
   - **Por que existe** — qual dor/job da persona esse módulo resolve
   - Funcionalidades-chave dentro do módulo (3-7 por módulo)
   - Dependências entre módulos (qual precisa existir antes de qual)
   - Pontuação RICE simplificada (1-10 cada dimensão)
3. Classificar cada módulo:
   - **Core** — essencial para a promessa central funcionar
   - **Auxiliar** — suporta os módulos core, melhora experiência
   - **Diferenciador** — o que separa este produto dos concorrentes
4. Desenhar a jornada do usuário etapa por etapa:
   - Primeiro contato → onboarding → uso recorrente → expansão
   - Para cada etapa: o que o usuário faz, o que sente, qual módulo atende
   - Momentos críticos (onde o usuário pode desistir e por quê)
   - "Aha moment" — em que ponto o usuário percebe o valor real
5. Mapear dependências entre módulos (qual precisa existir antes de qual)
6. Adaptar a linguagem de módulos ao tipo de produto:
   - **SaaS/App:** módulos = funcionalidades e telas
   - **Infoproduto:** módulos = módulos de conteúdo, aulas, materiais
   - **Produto físico:** módulos = componentes, variações, acessórios, embalagem
   - **Serviço:** módulos = etapas de entrega, touchpoints, suporte

**Expected output:**
```markdown
## Mapa de Módulos

| Módulo | Descrição | Job Resolvido | Funcionalidades | Tipo | RICE (R/I/C/E) | Score |
|--------|-----------|---------------|-----------------|------|-----------------|-------|
| ...    | ...       | ...           | ...             | Core | 8/9/7/6         | 7.5   |

## Dependências entre Módulos
[Módulo A] → [Módulo B] → [Módulo C]
[Módulo A] → [Módulo D]
(Descrição das dependências e razões)

## Jornada do Usuário

| Etapa | Ação do Usuário | Emoção | Módulo | Risco de Abandono | Mitigação |
|-------|-----------------|--------|--------|-------------------|-----------|
| ...   | ...             | ...    | ...    | ...               | ...       |

## Aha Moment
- **Momento:** [descrição]
- **Etapa da jornada:** [qual]
- **Módulo responsável:** [qual]
- **Por que funciona:** [mecanismo]

## Classificação: Core vs. Auxiliar vs. Diferenciador
- **Core:** [lista com justificativa]
- **Auxiliar:** [lista com justificativa]
- **Diferenciador:** [lista com justificativa]
```

**Quality criteria:**
- Todo módulo tem justificativa causal ("existe porque...")
- Jornada conectada aos módulos, não genérica
- Aha moment identificado com mecanismo explicado
- Dependências mapeadas (não existem módulos "soltos")
- Adaptado ao tipo de produto (não trata tudo como SaaS)
- RICE com pontuações justificadas, não arbitrárias

**Anti-patterns:**
- Listar features sem justificativa ("módulo de relatórios" — por quê?)
- Jornada do usuário linear sem pontos de fricção identificados
- Módulos desconectados das personas
- Ignorar dependências entre módulos
- Tratar todos os tipos de produto como SaaS
- Aha moment genérico ou ausente
- RICE sem justificativa das notas

---

### 4.5 MVP Strategist

- **base_agent:** product-strategist
- **id:** squads/product-blueprint-squad/agents/mvp-strategist
- **icon:** filter
- **execution:** inline

**Role:** Estrategista de priorização que define o que entra no MVP, o que fica para fases futuras e como fasear o lançamento para validar hipóteses com menor risco.

**Frameworks:**
- **MoSCoW (Must, Should, Could, Won't)** — classificação de módulos/funcionalidades
- **Riskiest Assumption Test (RAT)** — identificar a hipótese mais arriscada e validar primeiro
- **Build-Measure-Learn (Lean Startup)** — cada fase desenhada para gerar aprendizado, não só entregar features

**Instructions:**
1. Receber o mapa de módulos e pontuação RICE do Product Modeler
2. Classificar cada módulo/funcionalidade em MoSCoW:
   - **Must:** sem isso o produto não entrega a promessa central
   - **Should:** fortalece muito a proposta de valor, mas funciona sem
   - **Could:** nice-to-have, entra se houver capacidade
   - **Won't (por agora):** explicitamente fora do MVP com justificativa
3. Definir o MVP mínimo:
   - Quais módulos Must compõem o MVP
   - Qual é a hipótese principal que o MVP valida
   - Critério de sucesso mensurável (ex: "50 usuários completam o onboarding em 7 dias")
4. Desenhar o roadmap faseado:
   - **Fase 1 — MVP:** módulos Must, hipótese a validar, métrica de sucesso
   - **Fase 2 — Validação:** módulos Should, baseado nos aprendizados da Fase 1, critério de transição
   - **Fase 3 — Escala:** módulos Could + diferenciadores, critério de transição
5. Identificar a **Riskiest Assumption** do produto:
   - Qual é a suposição mais perigosa (que se estiver errada, invalida o produto)
   - Como o MVP testa essa suposição especificamente
   - Formato: "Acreditamos que [suposição]. Se estiver errado, [consequência]. Vamos testar [como]."
6. Listar o que **não fazer** — funcionalidades que parecem importantes mas são armadilhas de escopo
7. Cada fase deve ter critério de transição claro (não temporal, mas baseado em validação)

**Expected output:**
```markdown
## Classificação MoSCoW

| Módulo | Classificação | Justificativa |
|--------|---------------|---------------|
| ...    | Must          | ...           |
| ...    | Should        | ...           |
| ...    | Could         | ...           |
| ...    | Won't         | ...           |

## Definição do MVP
- **Módulos incluídos:** [lista]
- **Hipótese principal:** [o que o MVP valida]
- **Critério de sucesso:** [métrica mensurável]
- **O que o MVP NÃO é:** [escopo explícito do que fica de fora]

## Riskiest Assumption Test
- **Suposição:** Acreditamos que [suposição]
- **Se estiver errado:** [consequência]
- **Teste:** [como o MVP valida isso]
- **Evidência necessária:** [o que precisamos ver]

## Roadmap Faseado

### Fase 1 — MVP
- **Módulos:** [lista]
- **Hipótese:** [o que valida]
- **Métrica de sucesso:** [critério]
- **Critério para avançar:** [validação necessária]

### Fase 2 — Validação
- **Módulos:** [lista]
- **Baseado em:** [aprendizado esperado da Fase 1]
- **Critério para avançar:** [validação necessária]

### Fase 3 — Escala
- **Módulos:** [lista]
- **Condição:** [o que precisa ser verdade]

## Armadilhas de Escopo
| Funcionalidade | Por que parece importante | Por que é armadilha |
|---------------|--------------------------|---------------------|
| ...           | ...                      | ...                 |
```

**Quality criteria:**
- MoSCoW com justificativa real (não "é importante")
- MVP com hipótese testável e métrica mensurável
- Roadmap com critérios de transição baseados em validação, não datas
- RAT com consequência e método de teste explícitos
- Armadilhas de escopo identificadas com razão convincente
- Cada fase é um ciclo Build-Measure-Learn completo

**Anti-patterns:**
- MVP que é o produto inteiro ("tudo é Must")
- Faseamento sem critérios de transição entre fases
- Faseamento baseado só em complexidade técnica, ignorando hipóteses
- Roadmap com datas fixas em vez de critérios de validação
- Não definir critério de sucesso mensurável para o MVP
- RAT genérica ("acreditamos que as pessoas vão gostar")
- Não listar armadilhas de escopo

---

### 4.6 Blueprint Visual Designer

- **base_agent:** product-strategist
- **id:** squads/product-blueprint-squad/agents/blueprint-visual-designer
- **icon:** layout
- **execution:** inline

**Role:** Designer que gera a página HTML final — um one-pager visual que funciona como pitch para stakeholders e documentação de referência para o time, usando os mesmos padrões visuais da landing-page-squad.

**Technical standards (inherited from landing-page-squad, independent):**
- Single HTML file com inline CSS + JS
- Deps externas: Fonts CDN + Three.js CDN apenas
- Above-the-fold renderiza sem JavaScript
- Images: JPEG/WebP, lazy loading (outside hero), explicit dimensions
- Target: Lighthouse 90+
- Mobile-first responsive

**Breakpoints:**
- sm: 640px
- md: 768px (Three.js activation)
- lg: 900px
- xl: 1024px (custom cursor activation)
- xxl: 1280px

**Aesthetic & visual:**
- Tema nomeado derivado do setor do produto (ex: "Neural Grid" para AI, "Harvest Blueprint" para agro, "Forge" para manufatura)
- Dark mode por padrão (off-black, nunca #000000)
- Body text on dark: `rgba(255,255,255, 0.55-0.70)` (nunca branco puro)
- CSS custom properties em `:root` (zero hardcoded values)
- Color tokens: primary + primary-light + primary-dark + accent (max 15%) + neutral scale (5-8 tons) + semantic colors
- Multi-layer shadows (mínimo 2 layers) + accent glow
- Glass-morphism cards:
  ```css
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  backdrop-filter: blur(12px);
  border-radius: 16-20px;
  ```

**Typography system (exactly 2-3 fonts):**
- Display/Headlines: Personality font (NOT Inter, Roboto, Arial — ex: Space Grotesk, Plus Jakarta Sans)
- Body: Legible modern font
- Mono/Data: JetBrains Mono, Fira Code, etc.
- ALL sizes use `clamp()` for fluid typography (NO fixed px)
- H1 minimum: `clamp(2.5rem, 6vw+1rem, 5.5rem)`
- Font loading: `preconnect` + `font-display: swap`

**Page structure (9 sections, mapped to Blueprint Report):**

1. **Hero** — Nome do produto + promessa central + badge com tipo/categoria + indicadores-chave animados (tamanho de mercado, personas, módulos, fases)
   - Background: setor-themed photo + overlay gradient + Three.js (disabled <768px)
   - Scroll indicator (bouncing chevron)
   - Sem CTA de conversão — substituído por indicadores estratégicos

2. **Problema & Oportunidade** — Dores do público + lacunas de mercado
   - Cards de dores (glass-morphism) com ícones por tipo (externa, interna, filosófica)
   - Lacunas de mercado em destaque
   - Dados do Market Researcher

3. **Proposta de Valor** — Positioning statement + curva de valor visual
   - Positioning statement em destaque tipográfico
   - Curva de valor como gráfico visual (barras horizontais comparativas ou radar simplificado em CSS/SVG)
   - Promessa central em callout
   - Dados do Value Architect

4. **Arquitetura do Produto** — Grid de cards dos módulos
   - Card por módulo com nome, descrição, job resolvido
   - Cor/badge por classificação (Core = accent, Auxiliar = neutral, Diferenciador = secondary)
   - Ícone por módulo
   - RICE score visual (barra ou badge)
   - Dados do Product Modeler

5. **Jornada do Usuário** — Timeline visual etapa por etapa
   - Timeline horizontal (desktop) / vertical (mobile)
   - Cada etapa: ação + emoção + módulo relacionado
   - Aha moment destacado visualmente (accent glow)
   - Momentos críticos sinalizados
   - Dados do Product Modeler

6. **Personas** — Cards das personas
   - Card por persona com nome, contexto, JTBD
   - Dores e ganhos em lista
   - Badge de prioridade
   - Dados do Market Researcher

7. **Roadmap MVP** — Timeline faseada
   - 3 fases visualizadas como timeline/stepper
   - Badges MoSCoW por módulo
   - Critérios de transição entre fases
   - RAT em destaque
   - Dados do MVP Strategist

8. **Riscos & Próximos Passos** — Cards com riscos + ações
   - Cards de risco com severidade visual (cor do border)
   - Próximos passos como checklist visual
   - Dados do Blueprint Chief

9. **Footer** — Metadados do blueprint
   - Data de geração, versão, squad
   - Navegação interna (links para seções)
   - Sem CTA, sem formulário, sem social proof de clientes

**Key differences from landing-page-squad:**
- Sem CTA de conversão/captura — não é uma página de vendas
- Sem lead magnet, formulário ou social proof de clientes
- Foco em comunicar a arquitetura do produto, não em converter visitantes
- Seções informativas/documentais em vez de persuasivas
- Dados estruturados (tabelas, timelines, cards de módulos) em vez de copy de vendas
- Hero com indicadores estratégicos em vez de trust bar + CTAs

**Effects & interactivity (same standards):**
- Scroll reveal: IntersectionObserver fade-up com 80-100ms stagger
- Nav sticky: transparente → glass-morphism on scroll (via IntersectionObserver)
- Stats counter animado (indicadores do hero + RICE scores)
- Three.js com formas temáticas do setor (disable <768px, gradient fallback)
- Custom cursor dot com lerp (disable <1024px)
- Scroll progress bar (3px accent)
- H1 text reveal (clip-path ou overflow reveal)
- Card hover: `translateY(-6px)` + shadow expansion + border glow
- Only animate `opacity` and `transform`
- `prefers-reduced-motion`: disable ALL animations
- Three.js: 30fps cap, `document.hidden` pause

**Responsive behavior:**

| Element | Mobile (<768px) | Tablet (768-1024px) | Desktop (>1024px) |
|---------|-----------------|--------------------|--------------------|
| Layout | Single column | 2-column grids | Full asymmetric (55/45, 60/40) |
| Nav | Hamburger | Links visible | Full nav + glass-morphism |
| Three.js | Disabled → gradient | Gradient fallback | Full effects |
| Cards | Full-width stacked | 2-column grid | Full layout |
| Timeline | Vertical | Vertical | Horizontal |
| Custom cursor | Hidden | Hidden | Active |

**Accessibility (same standards):**
- Semantic HTML: header, nav, main, section, article, footer
- Heading hierarchy: Single H1, sequential H2-H6
- Color contrast: 4.5:1 text, 3:1 UI elements (WCAG AA)
- `focus-visible` on all interactive elements
- Skip-to-content link
- `aria-label` on icon buttons
- `aria-hidden="true"` on decoratives (Three.js, HUD, cursor)
- `lang` attribute on `<html>`
- Alt text on all real images

**Input:** Product Blueprint Report completo do Chief com todos os dados sintetizados.

**Quality criteria:**
- Todas as 9 seções presentes com dados reais do report
- Tema visual nomeado e coerente com o setor
- Responsivo funcional em todos os breakpoints
- Lighthouse 90+ (todos os 4 pilares)
- Acessibilidade WCAG AA
- Above-the-fold renderiza sem JS
- Terminologia visual do setor, não genérica

**Anti-patterns:**
- Página genérica que poderia ser de qualquer produto
- Dados placeholder em vez de dados reais do report
- CTAs de conversão ou formulários (não é landing page de vendas)
- Estética padrão sem tema nomeado
- Ignorar responsividade ou acessibilidade
- Efeitos visuais sem `prefers-reduced-motion`
- Three.js ativo em mobile
- Pure #000000 como background

---

## 5. Base Agent

Todos os agentes herdam de `product-strategist` (novo, independente de `conversion-strategist`).

O `product-strategist` define:
- Calibration: voz estratégica e colaborativa, não prescritiva
- Approach: diagnóstico antes de recomendação, frameworks sobre opiniões
- Language: responde no idioma do usuário com acentuação perfeita
- Tone: direto, confiante, sem jargão genérico — terminologia do setor do produto
- Adaptação por tipo de produto: nunca tratar todos como SaaS

---

## 6. Execution Flow Detail

```
[Briefing do Produto]
        │
        ▼
┌─────────────────┐
│ Blueprint Chief  │ ← Diagnóstico: tipo, maturidade, complexidade
│ (Step 1)         │
└────────┬────────┘
         │ briefing adaptado
         ▼
┌─────────────────┐
│Market Researcher │ ← Mercado, competidores, personas
│ (Step 2)         │
└────────┬────────┘
         │ personas + mercado
         ▼
┌─────────────────┐
│ Value Architect  │ ← Proposta de valor, posicionamento, modelo
│ (Step 3)         │
└────────┬────────┘
         │ posicionamento + promessa
         ▼
┌─────────────────┐
│Product Modeler   │ ← Módulos + jornada do usuário
│ (Step 4)         │
└────────┬────────┘
         │ módulos + jornada
         ▼
┌─────────────────┐
│ MVP Strategist   │ ← Priorização, faseamento, MVP
│ (Step 5)         │
└────────┬────────┘
         │ roadmap + MVP
         ▼
┌─────────────────┐
│ Blueprint Chief  │ ← Sintetiza Product Blueprint Report
│ (Step 6)         │
└────────┬────────┘
         │ report completo
         ▼
┌──────────────────────┐
│Blueprint Visual      │ ← Gera página HTML
│Designer (Step 7)     │
└──────────────────────┘
         │
         ▼
[Product Blueprint Report + HTML Page]
```

Cada agente recebe como input o output acumulado dos agentes anteriores, não apenas o do agente imediatamente anterior. O Chief garante que o contexto completo é passado.
