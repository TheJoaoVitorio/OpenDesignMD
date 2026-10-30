---
name: Orbit Mobile Design System (Inspired by Google Antigravity)
version: 2.0.0
archetype: "Engineered Calm, Monastic Purity & Gravitational Symmetry"
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
  onPrimary: "#FFFFFF"      # Crisp White Text on Orange Buttons
  onSurface: "#121317"      # High-Contrast Pure Ink Typography
  particlePalette:
    - "#FF6B00"             # Primary Aerospace Orange
    - "#FF9E40"             # Soft Amber
    - "#121317"             # Deep Titanium Ink
    - "#5F6368"             # Slate Grey
    - "#E8EAED"             # Subtle Orbit Dust
typography:
  fontFamily: "Google Sans, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  monoFamily: "'Google Sans Mono', 'SFMono-Regular', Consolas, monospace"
  h1:
    fontFamily: "Google Sans, Inter, sans-serif"
    fontSize: 4rem
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
    textAlign: "center"
  h2:
    fontFamily: "Google Sans, Inter, sans-serif"
    fontSize: 2.5rem
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  h3:
    fontFamily: "Google Sans, Inter, sans-serif"
    fontSize: 1.75rem
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  bodyMd:
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
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
  sectionGap: "120px"
  cardPadding: "32px"
---

# Design System: Orbit Mobile (Inspirado em Google Antigravity)

> **Documento Canônico de Transplante de Identidade Visual - Versão 2.0 (Fidelidade Visual Rigorosa)**
> 
> Diferente de templates genéricos de SaaS de tela dividida (split-screen), este sistema de design reproduz fielmente a arquitetura visual do **Google Antigravity**: **Simetria Monumental Centralizada**, **Vórtice Gravitacional de Partículas**, **Botão Pílula Central Único**, **Respiro Monástico Vasto** e **Feature Explorer em fileiras alternadas de altíssimo espaçamento**.

---

## 1. Visual Archetype: Engineered Calm & Gravitational Symmetry

- **Simetria Monumental Centralizada (Zero Split-Screen no Hero):**
  - O Hero **NÃO** usa layout de duas colunas (texto na esquerda + card de celular na direita).
  - O Hero é **100% centralizado**, com o título monumental ocupando o campo visual principal, cercado por um vórtice matemático de micropartículas em órbita gravitacional.
  - O único elemento de ação sob o título é **um botão pílula central solitário e escultural** (`Explorar Dispositivos ↓`), preservando a serenidade do usuário.
- **Espaço Negativo Monástico:**
  - Pelo menos 120px de respiro vertical antes do próximo bloco.
  - Ausência total de ruído comercial: sem contadores regressivos, sem banners vermelhos de saldão, sem cards poluídos com specs amontoados.

---

## 2. Spatial Rhythm & Layout Blueprints

### 2.1. Top Announcement Bar
- Faixa sutil no topo com pílula de novidade `+ NOVO`, mensagem de lançamento e link `Read post →` com botão de fechar `✕`.

### 2.2. Lightweight Aerodynamic Navbar
- Logo à esquerda com símbolo orbital geométrico.
- Links no centro-esquerda com setas de menu dropdown (`⌵`).
- Ações à direita: Ícone de foguete `🚀`, botão pílula preto/laranja `Comprar ↓` e seletor de idioma/região `BR ⌵`.

### 2.3. The Antigravity Monumental Hero
- **Centro Superior:** Marca minimalista centralizada (ícone de anel orbital + "Orbit Mobile").
- **Título Central (H1):** *Hardware esculpido para a velocidade do pensamento.* (Google Sans, 4rem, -0.035em, text-center).
- **Botão Central Único:** Botão pílula total (`rounded-full`) em preto ou laranja aeroespacial com setinha para baixo (`↓`).
- **Background Art:** Vórtice gravitacional de partículas dinâmicas (Canvas/SVG interativo) espiralando suavemente ao redor do centro.

### 2.4. Feature Explorer Section (Alternating Spacious Rows)
- Em vez de um bento grid tradicional de 3 caixas, as features são apresentadas no padrão `feature-item` do Google Antigravity:
  - Fileiras alternadas com 80px a 100px de padding.
  - Coluna de texto (título H3, descrição clara de 2 frases, link com seta `→`).
  - Coluna de produto (fotografia/render limpo do hardware em fundo transparente, sem caixas artificiais).

### 2.5. Programas e Soluções (Cards de Alto Contraste)
- 2 a 3 blocos refinados: *Para Consumidores (Trade-In)* e *Para Empresas (Frotas)*.

---

## 3. Invariantes dos Designers

### O que NUNCA fazer:
1. **NUNCA usar split-screen no Hero** (nunca colocar texto na esquerda e card de produto na direita no Hero).
2. **NUNCA amontoar mais de 1 CTA primário no Hero.** O Antigravity usa apenas uma pílula central.
3. **NUNCA usar banners promocionais estridentes** ou elementos que causem ansiedade.
4. **NUNCA usar cantos afiados (0px).**

### O que SEMPRE fazer:
1. **SEMPRE manter o alinhamento centralizado no Hero** com o vórtice de partículas no canvas de fundo.
2. **SEMPRE usar o laranja (#FF6B00) com parcimônia cirúrgica** para conduzir o foco visual.
3. **SEMPRE respeitar a tipografia Google Sans com letter-spacing negativo (-0.035em nos títulos).**
