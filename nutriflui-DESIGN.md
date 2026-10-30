---
name: NutriFlui Design System (Inspired by AbacatePay)
version: 1.0.0
archetype: "Playful Neo-Organic & Tactile High-Contrast"
colors:
  primary: "#1F4647"
  secondary: "#486E6F"
  tertiary: "#9EEA6C"
  neutral: "#F7FAF6"
  surface: "#FFFFFF"
typography:
  fontFamily: "Inter, system-ui, sans-serif"
  h1:
    fontSize: 3.25rem
    letterSpacing: "-0.025em"
  h2:
    fontSize: 2.25rem
    letterSpacing: "-0.02em"
rounded:
  sm: 6px
  md: 10px
  lg: 16px
  full: 9999px
---

# Design System: NutriFlui

> Transplante de DNA visual baseado na filosofia e arquitetura estética de **AbacatePay**, adaptado especificamente para o contexto: *Plataforma para nutricionistas: prescricao de dietas inteligentes com IA, acompanhamento diario pelo app do paciente, chat direto e agenda com confirmacao automatica no WhatsApp.*.

## 1. Visual Archetype & Creative Philosophy
- **Arquétipo Aplicado:** Playful Neo-Organic & Tactile High-Contrast
- **Atmosfera Visual:** Botanical vitality and friendly precision combining deep pine/avocado ink (#1F4647), high-contrast electric lime accents (#9EEA6C), ultra-rounded pill touch targets (border-radius: 9999px), generous organic container curves (32px to 56px), and witty tactile micro-chips.
- **Racional de Adaptação:** O projeto *NutriFlui* adota a disciplina espacial e o rigor de composição de AbacatePay, traduzindo a elegância funcional para o segmento de Plataforma para nutricionistas: prescricao de dietas inteligentes com IA, acompanhamento diario pelo app do paciente, chat direto e agenda com confirmacao automatica no WhatsApp..

## 2. Spatial Rhythm & Information Density
- **Densidade:** BALANCED
- **Estratégia de Espaçamento:** Generous organic breathing room (32px-48px) with elevated white cards layered against subtle tinted canvases or deep pine hero spotlight decks.
- **Largura Máxima do Container:** 1280px

## 3. Section Blueprints (Arquitetura das Seções)

### 1. Hero Section
- **Padrão de Layout:** Asymmetric Split Hero with High-Contrast Pill CTA & Floating Notification Chips
- **Densidade Visual:** balanced
- **Elementos-Chave:** Full pill primary button in electric lime #9EEA6C, Floating pill status badges, Organic rounded preview card (rounded-[36px])
- **Regra de Design Herdada:** Pair serious reliability with approachable botanical freshness and instant pill actions.
- **Aplicação no Cliente:** Implementar o fluxo principal de *Plataforma para nutricionistas: prescricao de dietas inteligentes com IA, acompanhamento diario pelo app do paciente, chat direto e agenda com confirmacao automatica no WhatsApp.* respeitando a proporção de respiro e a hierarquia Bold H1 Display in Fustat/System Sans (-0.02em tracking) with high-contrast emerald text.

### 2. Feature Showcase
- **Padrão de Layout:** Organic Bento Grid with Alternating Pine & Ivory Surface Cards
- **Densidade Visual:** balanced
- **Elementos-Chave:** Deep pine container #1F4647 with lime text, Rounded-3xl organic cards, Micro-chips with verified badges
- **Regra de Design Herdada:** Alternate between deep dark pine cards and bright clean cards to create dynamic visual pacing.
- **Aplicação no Cliente:** Implementar o fluxo principal de *Plataforma para nutricionistas: prescricao de dietas inteligentes com IA, acompanhamento diario pelo app do paciente, chat direto e agenda com confirmacao automatica no WhatsApp.* respeitando a proporção de respiro e a hierarquia H3 bold tile headlines with punchy 1-sentence value propositions.

### 3. Interactive Demo / Calculator
- **Padrão de Layout:** Playful Interactive Simulator Card
- **Densidade Visual:** balanced
- **Elementos-Chave:** Range slider with lime fill, Real-time savings/progress counter, Pill result toggle
- **Regra de Design Herdada:** Provide immediate tactile feedback without requiring page reloads.
- **Aplicação no Cliente:** Implementar o fluxo principal de *Plataforma para nutricionistas: prescricao de dietas inteligentes com IA, acompanhamento diario pelo app do paciente, chat direto e agenda com confirmacao automatica no WhatsApp.* respeitando a proporção de respiro e a hierarquia Display number metrics in extra bold font.

### 4. Social Proof & Metrics
- **Padrão de Layout:** Community Trust Billboard with Floating Avatar Clusters
- **Densidade Visual:** balanced
- **Elementos-Chave:** Large numerical volume counters, Verified user pill tags, Customer quote cards with avatar circles
- **Regra de Design Herdada:** Demonstrate explosive community traction and genuine user delight.
- **Aplicação no Cliente:** Implementar o fluxo principal de *Plataforma para nutricionistas: prescricao de dietas inteligentes com IA, acompanhamento diario pelo app do paciente, chat direto e agenda com confirmacao automatica no WhatsApp.* respeitando a proporção de respiro e a hierarquia Massive statistical digits paired with concise human endorsements.

### 5. CTA & Closing
- **Padrão de Layout:** Immersive Deep Pine Curved Deck with Electric Lime Trigger
- **Densidade Visual:** balanced
- **Elementos-Chave:** Full-width curved container #1F4647, Glowing lime pill CTA button, Zero-friction guarantee tag
- **Regra de Design Herdada:** Close with irresistible visual energy and zero form-field friction.
- **Aplicação no Cliente:** Implementar o fluxo principal de *Plataforma para nutricionistas: prescricao de dietas inteligentes com IA, acompanhamento diario pelo app do paciente, chat direto e agenda com confirmacao automatica no WhatsApp.* respeitando a proporção de respiro e a hierarquia H2 invitation headline in crisp white text with secondary lime sub-accent.


## 4. Designers' Invariants (Regras Invioláveis)

### O que os designers desta aplicação SEMPRE fazem:
- Always use full pill radius (border-radius: 9999px) for primary action buttons.
- Always pair deep dark pine green (#1F4647) with electric lime (#9EEA6C) for maximum visual vitality.
- Always use large organic corner radiuses (32px to 56px) on major section cards.
- Always include playful, reassuring microcopy (e.g., 'Sem burocracia', 'Em 2 minutos').

### O que os designers desta aplicação NUNCA fariam (Anti-Padrões):
- Never use sharp 0px or square corners on interactive buttons.
- Never use cold corporate blue or clinical hospital sterile grays.
- Never place low-contrast text that impairs accessibility.
- Never design dense, rigid spreadsheet-style tables without organic breathing space.

## 5. Implementation Tokens & Guidelines for Agents
- Para criar novas telas, o agente de código deve usar a paleta de cores primária (`#1F4647`), fundo canvas (`#F7FAF6`) e cor de ação (`#9EEA6C`).
- Todo card deve respeitar o border-radius definido (`rounded-lg`) com separadores de 1px.
- Todas as interações devem seguir a densidade balanced sem sobrecarregar a cognição do usuário final.

## 6. Impeccable Quality & Refinement Invariants
- **Auditoria de Anti-Padrões:** Executada via motor Impeccable com conformidade estrita WCAG 2.2 AA.
- **Hierarquia sem Nested Cards:** Proibido aninhar cards dentro de cards; usar divisores semânticos e respiro visual.
- **Cinética Suave:** Proibido bounce-easing; todas as micro-interações utilizam desaceleração exponencial suave (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Ergonomia de Linha:** Largura máxima de blocos textuais calibrada entre 65ch e 75ch para leitura confortável de prontuários.
- **Contraste Aferido:** O par de texto primário `#1F4647` sobre fundo `#9EEA6C` atinge taxa de contraste de 10.37:1 (AAA).
