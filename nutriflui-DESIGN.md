---
name: NutriFlui Design System (Inspired by AbacatePay)
version: 2.0.0
archetype: "Playful Neo-Organic & Tactile High-Contrast"
colors:
  primary: "#1F4647"      # Deep Pine / Avocado Botanical Ink
  secondary: "#486E6F"    # Muted botanical slate
  tertiary: "#9EEA6C"     # Electric Lime / High-Contrast Action
  neutral: "#F7FAF6"      # Fresh organic canvas
  surface: "#FFFFFF"      # Crisp white elevated cards
  border: "#E3EBE1"       # Subtle botanical border
typography:
  fontFamily: "Inter, system-ui, sans-serif"
  headingFamily: "Inter, system-ui, sans-serif"
  h1:
    fontSize: 3.5rem
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  h2:
    fontSize: 2.5rem
    letterSpacing: "-0.02em"
rounded:
  sm: 6px
  md: 12px
  lg: 32px
  full: 9999px            # Iconic AbacatePay full pill geometry
---

# Design System: NutriFlui

> Transplante integral da estrutura de seções, atitude e arquitetura estética do **AbacatePay** para o segmento de consultório digital e nutrição de alta performance.

## 1. Visual Archetype & Tone of Voice
- **Arquétipo:** Playful Neo-Organic & Tactile High-Contrast
- **Atmosfera & Voz:** Tom coloquial, seguro, sem jargões corporativos ("sem letrinha pequena, sem migué"). Contraste enérgico entre verde pinho profundo (#1F4647) e verde lima elétrico (#9EEA6C).

## 2. Spatial Rhythm & Information Density
- **Densidade:** BALANCED
- **Estratégia de Respiro:** Espaçamento orgânico generoso (32px-48px) entre seções e cartões.
- **Largura Máxima:** 1280px

## 3. Section Blueprints (Anatomia Exata das 10 Seções do AbacatePay)

### 1. Hero Section
- **Padrão de Layout:** "Consultório de nutrição online da forma que deveria ser" com badge flutuante, CTA em pílula e chips de notificações reais.
- **Elementos-Chave:** Botão pílula verde lima (`#9EEA6C`), input de email em pílula, chips táteis de notificações.
- **Regra de Design:** Alinhar autoridade médica com extrema simplicidade e acolhimento.

### 2. Logos Ribbon ("Quem já atende com a NutriFlui")
- **Padrão de Layout:** Faixa horizontal com marcas e clínicas parceiras em escala de cinza e opacidade balanceada.

### 3. Âncora de Valor Fixo ("R$ 0 por paciente extra. Fixo.")
- **Padrão de Layout:** Headline massivo em display com declaração de preço fixo e 3 cards de confirmação ("Sem letrinha pequena, sem migué").

### 4. Integração & Prompt Sandbox ("Prescreva do jeito que você atende")
- **Padrão de Layout:** Bloco de terminal escuro (`#121317`) com prompt de IA copiado em 1 clique para ChatGPT, Claude ou Cursor.

### 5. Dashboard Showcase ("Um painel que fala a tua língua")
- **Padrão de Layout:** Mockup de painel com filtros em pílula (*Hoje*, *Esse Mês*, *Últimos 30 dias*) e métricas de aderência e retenção.

### 6. Simulador Comparativo Real ("Simule e veja quanto você economiza de verdade")
- **Padrão de Layout:** Slider interativo comparando o custo fixo da NutriFlui contra softwares tradicionais que cobram por paciente.

### 7. Vozes Reais ("Ouça algumas das mais de 1.800 pessoas...")
- **Padrão de Layout:** Cards com player de áudio simulado, foto do profissional, registro no CRN e citação direta informal.

### 8. Suporte Humano ("Suporte que não te deixa na mão")
- **Padrão de Layout:** Cards de chat ao vivo com métrica de resposta rápida em menos de 2 minutos antes do café esfriar.

### 9. FAQ Descontraído ("Tem dúvidas? Relaxa, nós temos as respostas.")
- **Padrão de Layout:** Accordion minimalista com respostas honestas e sem jargões jurídicos.

### 10. Closing CTA ("Você leu até aqui. Tá interessado né?")
- **Padrão de Layout:** Deck imersivo em verde escuro (`#1F4647`) com cantos de 48px, texto de provocação bem-humorado e botão de início imediato.

## 4. Invariantes dos Designers (Regras Invioláveis)
- **SEMPRE:** Botões de ação em pílula total (`rounded-full`); contraste WCAG AAA entre `#1F4647` e `#9EEA6C`; cantos de cards em 32px-48px.
- **NUNCA:** Cantos quadrados (0px); cinzas hospitalares frios; popups agressivos; tabelas rígidas de Excel; botões com bounce artificial.

## 5. Impeccable Quality & Refinement Invariants
- **Auditoria de Anti-Padrões:** Executada via motor Impeccable com conformidade estrita WCAG 2.2 AA.
- **Hierarquia sem Nested Cards:** Proibido aninhar cards dentro de cards; usar divisores semânticos e respiro visual.
- **Cinética Suave:** Proibido bounce-easing; todas as micro-interações utilizam desaceleração exponencial suave (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Ergonomia de Linha:** Largura máxima de blocos textuais calibrada entre 65ch e 75ch para leitura confortável de prontuários.
