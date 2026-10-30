---
name: Orbit Mobile Design System (Inspired by Google Antigravity)
version: 1.0.0
archetype: "Engineered Calm and Aerospace Precision"
sourceDesignSystem: "Google Antigravity (antigravity.google)"
clientContext:
  business: "Loja de Smartphones e Flagships Premium (Orbit Mobile)"
  primaryColorRequirement: "#FF6B00 (Aerospace Vibrant Orange)"
colors:
  primary: "#FF6B00"        # Vibrant Aerospace Orange (Client Primary Action)
  primaryHover: "#E05E00"   # Deepened Optical Orange for Hover States
  secondary: "#5F6368"      # Google Slate Grey / Metadata Ink
  tertiary: "#FF6B00"       # High-Contrast Accent & Focus Ring
  neutral: "#FAF9F6"        # Google Antigravity Warm Off-White Canvas
  surface: "#FFFFFF"        # Crisp Elevated White Cards
  surfaceDark: "#121317"    # Antigravity Monolithic Void Slate
  surfaceVariant: "#F3F4F6" # Muted Pill Capsule Gray
  border: "#E8EAED"         # 1px Technical Hairline Border
  borderDark: "#23262F"     # Hairline Border for Dark Cards
  onPrimary: "#FFFFFF"      # Crisp White Text on Orange Buttons
  onSurface: "#121317"      # High-Contrast Pure Ink Typography
typography:
  fontFamily: "Google Sans, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  monoFamily: "'Google Sans Mono', 'SFMono-Regular', Consolas, monospace"
  h1:
    fontFamily: "Google Sans, Inter, sans-serif"
    fontSize: 3.75rem
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  h2:
    fontFamily: "Google Sans, Inter, sans-serif"
    fontSize: 2.25rem
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  h3:
    fontFamily: "Google Sans, Inter, sans-serif"
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  bodyMd:
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.6
  bodySm:
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.45
  labelCaps:
    fontSize: 0.75rem
    fontWeight: 600
    letterSpacing: "0.06em"
    textTransform: "uppercase"
rounded:
  sm: 8px
  md: 14px
  lg: 20px
  xl: 28px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 80px
---

# Design System: Orbit Mobile (Inspirado em Google Antigravity)

> **Documento Canônico de Transplante de Identidade Visual**
> 
> Este sistema de design materializa o transplante da estética **Engineered Calm** do **Google Antigravity** para uma loja de celulares topo de linha (**Orbit Mobile**), adaptando com rigor técnico a cor primária **Laranja (#FF6B00)** solicitada pelo cliente sem violar a harmonia de respiro, sofisticação e geometria pura do design original.

---

## 1. Visual Archetype & Creative Philosophy

- **Arquétipo Visual:** *Engineered Calm & Aerospace Precision*
- **Atmosfera Estética:** Calmaria arquitetônica, amplos respiros em branco quente (`#FAF9F6`), tipografia Google Sans com tracking estritamente negativo (`-0.035em`), geometrias de pílula total (`rounded-full`) e toques cirúrgicos de Laranja Vibrante (`#FF6B00`).
- **Diferenciação contra o Varejo Tradicional:**
  - Lojas de celulares tradicionais utilizam poluição cromática (vermelhos estridentes, cronômetros falsos de contagem regressiva, banners de saldão que gritam com o cliente).
  - A Orbit Mobile trata o smartphone como uma **peça de alta engenharia de silício e titânio**. O hardware respira no espaço negativo com luz limpa, preços transparentes e avaliação matemática de Trade-in.

---

## 2. Spatial Rhythm & Information Density

- **Densidade:** `BALANCED` a `SPRAWLING` (80px de padding vertical entre seções).
- **Largura Máxima do Grid:** `1440px` (com `max-w-7xl` e `max-w-6xl` nos núcleos de leitura).
- **Tratamento de Superfícies:** Cards em branco puro (`#FFFFFF`) repousando sobre canvas levemente quente (`#FAF9F6`), delimitados por bordas milimétricas de `1px solid #E8EAED` e sombras táteis de baixíssima opacidade (`rgba(0, 0, 0, 0.04)`).

---

## 3. Section Blueprints (Estrutura de Seções)

### 3.1. Floating Zero-Gravity Hero
- **Estrutura:** Split assimétrico com headline monumental à esquerda e render 3D do flagship em levitação gravitacional à direita.
- **Micro-indicadores:** Badge de homologação com fonte mono e ponto de pulso laranja.
- **Ações:** Botão pílula laranja com sombra suave (`shadow-lg shadow-orange-500/20`) pareado com pílula de contorno para o simulador de Trade-In.

### 3.2. Flagship Bento Grid (Catálogo de Vanguarda)
- **Estrutura:** Modular bento grid 3-colunas com hierarquia óptica (card principal em destaque duplo).
- **Elementos:** Fundo branco puro, chips de especificações em pílula suave (`Chip 3nm`, `Câmera Fusion`, `Titanium Frame`), preço em números limpos sem descontos falsos.

### 3.3. Simulador Instantâneo de Trade-In (Troca Inteligente)
- **Estrutura:** Calculadora interativa em card elevado. O cliente seleciona marca atual, modelo e estado de conservação.
- **Feedback:** O valor em reais do crédito é recalculado instantaneamente em um badge laranja de alto contraste, deduzindo do valor do novo aparelho.

### 3.4. Hardware Benchmark Matrix
- **Estrutura:** Tabela comparativa milimétrica com métricas reais de processador (Geekbench), inteligência artificial local (TOPS) e autonomia de bateria.

### 3.5. Orbit Care (Garantia e Confiança Engenheirada)
- **Estrutura:** 3 blocos horizontais de respiro absoluto destacando 2 anos de garantia contratual, logística blindada em 24h e transferência concierge de dados.

### 3.6. Monolithic Dark Closing Deck
- **Estrutura:** Card monolítico de fechamento em fundo escuro profundo (`#121317`) com raio de curvatura `32px` e brilho de flare laranja suave.

---

## 4. Invariantes dos Designers (Regras Rígidas)

### O que NUNCA fazer:
1. **NUNCA usar banners vermelhos de liquidação ou badges estilo 'QUEIMA DE ESTOQUE'.**
2. **NUNCA usar cantos vivos ou pontudos (0px de raio de curvatura).** Todos os botões devem ter `rounded-full` (9999px) e cards devem ter entre `16px` e `28px`.
3. **NUNCA usar sombras escuras e difusas maiores que 24px.** As sombras devem ser imperceptíveis e táteis.
4. **NUNCA violar o contraste WCAG AA.** O texto sobre o laranja primário (`#FF6B00`) deve ser estritamente branco puro (`#FFFFFF`), garantindo legibilidade perfeita.

### O que SEMPRE fazer:
1. **SEMPRE aplicar letter-spacing negativo (-0.035em) nos títulos H1.**
2. **SEMPRE apresentar o hardware com perspectiva limpa e reflexos realistas de luz natural.**
3. **SEMPRE usar o laranja como acelerador focal cirúrgico** (botões de ação primária, seleções ativas e badges de destaque).
