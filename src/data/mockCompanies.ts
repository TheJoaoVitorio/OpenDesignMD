import { Company } from '../types';

export const mockCompanies: Company[] = [
  {
    id: 'google-antigravity',
    name: 'Google Antigravity',
    domain: 'antigravity.google',
    url: 'https://antigravity.google',
    tagline: 'Engineered calm, hyper-focused typography and quantum-sharp surfaces for agentic AI.',
    category: 'DevTools & AI',
    tags: ['Google Labs', 'Agentic AI', 'Engineered Calm', 'Monochrome', 'Zero-Glow'],
    accentColor: '#1A73E8',
    heroGradient: 'linear-gradient(135deg, #121317 0%, #1A73E8 60%, #4285F4 100%)',
    previewBg: '#121317',
    screenshotUrl: '/previews/google-antigravity.png',
    lastUpdated: 'October 2026',
    verifiedStandard: true,
    metrics: {
      contrastScore: 'AAA (16.2:1)',
      tokenCount: 42,
      agentReadyScore: 99
    },
    colorTokens: [
      { name: 'Primary Pitch', hex: '#121317', role: 'primary', description: 'Deep obsidian tone for monolithic headings and primary buttons', contrastOnWhite: '16.5:1', isDark: true },
      { name: 'Secondary Slate', hex: '#5F6368', role: 'secondary', description: 'Google Slate for calm subtitles and secondary indicators', contrastOnWhite: '5.2:1' },
      { name: 'Google Blue Quantum', hex: '#1A73E8', role: 'tertiary', description: 'Surgical accent for active focus and link states', contrastOnWhite: '4.7:1' },
      { name: 'Paper Neutral', hex: '#FAF9F6', role: 'neutral', description: 'Soft warm alabaster canvas preventing glare', contrastOnWhite: '1.05:1' },
      { name: 'Pure Surface', hex: '#FFFFFF', role: 'surface', description: 'Elevated floating cards and modal panels', contrastOnWhite: '1.0:1' },
      { name: 'Variant Surface', hex: '#F1F3F4', role: 'surface-variant', description: 'Subtle pill container background', contrastOnWhite: '1.1:1' },
      { name: 'Border Wire', hex: '#E8EAED', role: 'border', description: 'Precision hairline container strokes', contrastOnWhite: '1.2:1' }
    ],
    typography: {
      fontFamily: "Google Sans, Inter, -apple-system, sans-serif",
      monoFamily: "Google Sans Mono, SFMono-Regular, monospace",
      h1: { fontSize: '3.5rem', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.035em' },
      h2: { fontSize: '2.25rem', fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.025em' },
      h3: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.3, letterSpacing: '-0.015em' },
      bodyLg: { fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.6 },
      bodyMd: { fontSize: '0.9375rem', fontWeight: 400, lineHeight: 1.55 },
      bodySm: { fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.45 },
      labelCaps: { fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em' }
    },
    rawYaml: `---
name: OpenDesignMD (Google Antigravity Theme)
version: alpha
colors:
  primary: "#121317"
  secondary: "#5F6368"
  tertiary: "#1A73E8"
  neutral: "#FAF9F6"
  surface: "#FFFFFF"
  surface-variant: "#F1F3F4"
  on-primary: "#FFFFFF"
  on-tertiary: "#FFFFFF"
  border: "#E8EAED"
  border-subtle: "rgba(0, 0, 0, 0.06)"
  accent-glow: "rgba(26, 115, 232, 0.12)"
  canvas-dark: "#0D0E12"
  surface-dark: "#16181D"
  surface-dark-card: "#1E2128"
  text-dark-primary: "#F3F4F6"
  text-dark-secondary: "#9AA0A6"
typography:
  fontFamily: "Google Sans, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  monoFamily: "'Google Sans Mono', 'SFMono-Regular', Consolas, monospace"
  h1:
    fontFamily: "{typography.fontFamily}"
    fontSize: 3.5rem
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  h2:
    fontFamily: "{typography.fontFamily}"
    fontSize: 2.25rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  h3:
    fontFamily: "{typography.fontFamily}"
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body-lg:
    fontFamily: "{typography.fontFamily}"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.45
  label-caps:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.75rem
    fontWeight: 500
    letterSpacing: "0.06em"
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
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
    fontSize: "{typography.body-md.fontSize}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    border: "1px solid {colors.border}"
    padding: "{spacing.lg}"
  badge:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
    fontSize: "{typography.label-caps.fontSize}"
---`,
    designMdContent: `---
name: OpenDesignMD (Google Antigravity Theme)
version: alpha
colors:
  primary: "#121317"
  secondary: "#5F6368"
  tertiary: "#1A73E8"
  neutral: "#FAF9F6"
  surface: "#FFFFFF"
  surface-variant: "#F1F3F4"
  on-primary: "#FFFFFF"
  on-tertiary: "#FFFFFF"
  border: "#E8EAED"
  border-subtle: "rgba(0, 0, 0, 0.06)"
  accent-glow: "rgba(26, 115, 232, 0.12)"
  canvas-dark: "#0D0E12"
  surface-dark: "#16181D"
  surface-dark-card: "#1E2128"
  text-dark-primary: "#F3F4F6"
  text-dark-secondary: "#9AA0A6"
typography:
  fontFamily: "Google Sans, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  monoFamily: "'Google Sans Mono', 'SFMono-Regular', Consolas, monospace"
  h1:
    fontFamily: "{typography.fontFamily}"
    fontSize: 3.5rem
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  h2:
    fontFamily: "{typography.fontFamily}"
    fontSize: 2.25rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  h3:
    fontFamily: "{typography.fontFamily}"
    fontSize: 1.5rem
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body-lg:
    fontFamily: "{typography.fontFamily}"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.45
  label-caps:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.75rem
    fontWeight: 500
    letterSpacing: "0.06em"
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
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
    fontSize: "{typography.body-md.fontSize}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.full}"
    padding: "10px 24px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    border: "1px solid {colors.border}"
    padding: "{spacing.lg}"
  badge:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
    fontSize: "{typography.label-caps.fontSize}"
---

## Overview

O OpenDesignMD adota com rigor a estética de **"Engineered Calm"** e hiper-precisão tipográfica do **Google Antigravity** (\`antigravity.google\`). O design se apoia em uma paleta monocromática disciplinada com vasto respiro negativo, tipografia forte em Google Sans com tracking negativo nos títulos, pílulas suaves (\`rounded.full\`) e toques cirúrgicos de azul e difusão cromática.

## Colors

A paleta prioriza a sobriedade sobre o ruído visual, reservando saturação apenas para interações e momentos de ênfase:
- **Primary (\`#121317\`):** Tinta preta pura para textos principais, títulos e o botão de ação primordial (Hero CTA).
- **Secondary (\`#5F6368\`):** Cinza ardósia neutro para legendas, metadados e ícones informativos.
- **Tertiary (\`#1A73E8\`):** O clássico Google Blue utilizado de forma estritamente cirúrgica para links ativos e pílulas de destaque.
- **Neutral (\`#FAF9F6\`):** Canvas de base suave, oferecendo um fundo quente e menos ofuscante que o branco puro.
- **Surface (\`#FFFFFF\`):** Superfície limpa de cards flutuantes e modais.
- **Accent Glow (\`rgba(26, 115, 232, 0.12)\`):** Brilho etéreo e difuso que evoca a atmosfera do motor de gravidade do Antigravity.

## Typography

Utiliza **Google Sans / Inter** com dois registros propositalmente opostos:
- **Display & Títulos (The Shout):** Letras monumentais em peso 500 com tracking fortemente negativo (\`-0.035em\`), criando blocos de leitura sólidos e arquitetônicos.
- **Interface & Textos (The Whisper):** Tamanhos confortáveis (\`body-md: 0.9375rem\`), entrelinha relaxada (\`1.55\`) e tracking ligeiramente aberto para máxima legibilidade.
- **Metadados & Badges (\`label-caps\`):** Caixa alta sutil com tracking espaçado (\`0.06em\`).

## Layout

- **Grid:** Estrutura baseada em múltiplos rigorosos de 4px e 8px, com largura máxima contida em 1440px e margem lateral fluida de 32px a 72px.
- **Vasto Espaço Negativo:** As seções da Landing Page respiram com paddings de 80px (\`{spacing.4xl}\`) entre blocos de conteúdo.

## Elevation & Depth

- **Elevação 1 (Cards):** Borda suave (\`1px solid {colors.border}\`) sem sombra pesada, usando superfícies sólidas e transições sutis.
- **Elevação 2 (Hover & Destaques):** Leve projeção (\`box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.05)\`).
- **Elevação 3 (Modais e Detalhes):** Fundo translúcido com \`backdrop-filter: blur(16px)\` e borda refinada de alta luminosidade.

## Shapes

- Botões, campos de busca e tags adotam formato de **pílula completa** (\`{rounded.full}\`).
- Cards e contêineres principais utilizam cantos generosamente arredondados (\`{rounded.xl}\` = 28px).
- Modais e janelas flutuantes utilizam cantos suaves de 20px (\`{rounded.lg}\`).

## Components

### Botão Primário (\`button-primary\`)
- Formato de pílula preta sólida (\`#121317\`) com tipografia branca, padding generoso e transição suave no hover (opacidade 90% ou leve escala 0.98).

### Botão Secundário (\`button-secondary\`)
- Fundo branco/neutro com contorno sutil (\`1px solid {colors.border}\`) e texto escuro.

### Cards de Empresas (Estilo Mobbin / DesignMD)
- Proporção 16:10 ou 4:3 para exibição do preview visual.
- Cabeçalho com logo da marca, nome, tag de categoria e paleta de cores em círculos ou pílulas.
- Botões de ação rápida para "Copiar DESIGN.MD" e "Inspecionar Tokens".

## Do's and Don'ts

### Do's:
- **Respeite o respiro:** Deixe o espaço em branco carregar a sofisticação da interface.
- **Use pílulas consistentes:** Botões e chips de tags devem sempre adotar \`{rounded.full}\`.
- **Mantenha o contraste:** O botão preto principal deve se destacar imediatamente como o ponto focal.

### Don'ts:
- **Não use gradientes pesados:** Evite fundos coloridos saturados atrás de blocos de texto.
- **Não use bordas pontiagudas:** Não misture cantos de 0px ou 2px em um layout projetado com cantos amplos.
- **Não abuse de sombras pretas duras:** Privilegie bordas sutis com opacidade controlada.`
  },
  {
    id: 'stripe',
    name: 'Stripe',
    domain: 'stripe.com',
    url: 'https://stripe.com',
    tagline: 'Financial infrastructure for the internet with dynamic isometric gradients and high precision typography.',
    category: 'Fintech',
    tags: ['Fintech', 'Payments', 'Complex Gradients', 'Söhne Typography', 'Enterprise Grade'],
    accentColor: '#635BFF',
    heroGradient: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 50%, #7928CA 100%)',
    previewBg: '#0A2540',
    screenshotUrl: '/previews/stripe.png',
    lastUpdated: 'September 2026',
    verifiedStandard: true,
    metrics: {
      contrastScore: 'AAA (14.8:1)',
      tokenCount: 48,
      agentReadyScore: 98
    },
    colorTokens: [
      { name: 'Stripe Indigo', hex: '#635BFF', role: 'tertiary', description: 'Iconic digital currency purple for primary call-to-actions', contrastOnWhite: '5.1:1' },
      { name: 'Deep Midnight Navy', hex: '#0A2540', role: 'primary', description: 'Institutional trust navy for titles and hero banners', contrastOnWhite: '15.1:1', isDark: true },
      { name: 'Slate Steel', hex: '#425466', role: 'secondary', description: 'Subdued graphite body text', contrastOnWhite: '7.8:1' },
      { name: 'Pure White', hex: '#FFFFFF', role: 'neutral', description: 'Base canvas', contrastOnWhite: '1.0:1' },
      { name: 'Surface Frosted', hex: '#F6F9FC', role: 'surface', description: 'Subtle cool grey backdrop for cards and section dividers', contrastOnWhite: '1.06:1' },
      { name: 'Cyan Flux', hex: '#00D4FF', role: 'accent', description: 'Electric turquoise for mesh mesh gradient nodes', contrastOnWhite: '1.8:1' }
    ],
    typography: {
      fontFamily: "Söhne, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      monoFamily: "Söhne Mono, monospace",
      h1: { fontSize: '3.75rem', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.025em' },
      h2: { fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.02em' },
      bodyMd: { fontSize: '1.0625rem', fontWeight: 400, lineHeight: 1.6 },
      labelCaps: { fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.04em' }
    },
    rawYaml: `---
name: Stripe Visual Design Language
version: 2026.4
colors:
  primary: "#0A2540"
  secondary: "#425466"
  tertiary: "#635BFF"
  accent-cyan: "#00D4FF"
  neutral: "#FFFFFF"
  surface: "#F6F9FC"
  border: "#E6EBF1"
  on-tertiary: "#FFFFFF"
typography:
  fontFamily: "Söhne, -apple-system, sans-serif"
  h1:
    fontSize: 3.75rem
    fontWeight: 600
    lineHeight: 1.15
  body-md:
    fontSize: 1.0625rem
    lineHeight: 1.6
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  pill: 9999px
---`,
    designMdContent: `---
name: Stripe Visual Design Language
version: 2026.4
colors:
  primary: "#0A2540"
  secondary: "#425466"
  tertiary: "#635BFF"
  accent-cyan: "#00D4FF"
  neutral: "#FFFFFF"
  surface: "#F6F9FC"
  border: "#E6EBF1"
  on-tertiary: "#FFFFFF"
typography:
  fontFamily: "Söhne, -apple-system, sans-serif"
  h1:
    fontSize: 3.75rem
    fontWeight: 600
    lineHeight: 1.15
  body-md:
    fontSize: 1.0625rem
    lineHeight: 1.6
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  pill: 9999px
---

## Overview
Stripe define a vanguarda do design em fintech: seriedade bancária combinada à vibração digital de ponta. A interface equilibra fundos ultra-limpos com gradientes matemáticos em malha (mesh gradients) em 35 graus.

## Colors
- **Tertiary (#635BFF):** O roxo Stripe utilizado como assinatura visual nos botões de conversão primários.
- **Primary (#0A2540):** O azul escuro quase preto que transmite autoridade inabalável.
- **Secondary (#425466):** Cinza com matiz azulado para corpos de texto longos.
- **Surface (#F6F9FC):** O clássico tom cinza-gelo de cards de produtos e código interativo.

## Typography
Uso exclusivo da família **Söhne** (Klim Type Foundry), trazendo caracteres robustos, numerais em mono-espaçamento alinhado para tabelas contábeis e proporções condensadas.

## Components
- **Pill Buttons:** Botões de ação rápida com cantos 9999px e sombra difusa \`0 4px 12px rgba(99, 91, 255, 0.25)\`.
- **Feature Cards:** Superfícies brancas com bordas translúcidas de 1px e cantos suaves de 8px.`
  },
  {
    id: 'linear',
    name: 'Linear',
    domain: 'linear.app',
    url: 'https://linear.app',
    tagline: 'The gold standard in dark-mode engineering software, obsessive keyboard shortcuts, and glowing borders.',
    category: 'DevTools & AI',
    tags: ['Issue Tracker', 'Dark Mode Master', 'High Contrast', 'Keyboards First', 'Glow Accents'],
    accentColor: '#5E6AD2',
    heroGradient: 'linear-gradient(135deg, #0B0C0E 0%, #15161C 50%, #5E6AD2 100%)',
    previewBg: '#08090A',
    screenshotUrl: '/previews/linear.png',
    lastUpdated: 'October 2026',
    verifiedStandard: true,
    metrics: {
      contrastScore: 'AAA (18.1:1)',
      tokenCount: 52,
      agentReadyScore: 100
    },
    colorTokens: [
      { name: 'Linear Dark Abyss', hex: '#08090A', role: 'neutral', description: 'Deepest matte dark canvas', contrastOnBlack: '1.0:1', isDark: true },
      { name: 'Linear Slate Surface', hex: '#121417', role: 'surface', description: 'Card and drawer surface with subtle warm tone', contrastOnWhite: '15.9:1', isDark: true },
      { name: 'Linear Electric Purple', hex: '#5E6AD2', role: 'tertiary', description: 'Primary action color and keyboard focus state', contrastOnBlack: '5.4:1' },
      { name: 'High Text White', hex: '#EEEEEE', role: 'primary', description: 'Crisp text on dark surface', contrastOnBlack: '16.8:1' },
      { name: 'Muted Text Gray', hex: '#8A8F98', role: 'secondary', description: 'Subtext and issue metadata', contrastOnBlack: '7.1:1' },
      { name: 'Subtle Glass Border', hex: '#26282E', role: 'border', description: 'Ultra-thin container outline', contrastOnBlack: '2.1:1' }
    ],
    typography: {
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      monoFamily: "'JetBrains Mono', 'SFMono-Regular', monospace",
      h1: { fontSize: '3.25rem', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.04em' },
      h2: { fontSize: '2rem', fontWeight: 500, lineHeight: 1.25, letterSpacing: '-0.025em' },
      bodyMd: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
      labelCaps: { fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em' }
    },
    rawYaml: `---
name: Linear System
version: 2026.1
colors:
  canvas: "#08090A"
  surface: "#121417"
  surface-hover: "#181A1F"
  border: "#26282E"
  primary: "#EEEEEE"
  secondary: "#8A8F98"
  tertiary: "#5E6AD2"
  accent-glow: "rgba(94, 106, 210, 0.25)"
typography:
  fontFamily: "Inter, sans-serif"
  h1:
    fontSize: 3.25rem
    letterSpacing: "-0.04em"
rounded:
  sm: 6px
  md: 8px
  lg: 12px
---`,
    designMdContent: `---
name: Linear System
version: 2026.1
colors:
  canvas: "#08090A"
  surface: "#121417"
  surface-hover: "#181A1F"
  border: "#26282E"
  primary: "#EEEEEE"
  secondary: "#8A8F98"
  tertiary: "#5E6AD2"
  accent-glow: "rgba(94, 106, 210, 0.25)"
typography:
  fontFamily: "Inter, sans-serif"
  h1:
    fontSize: 3.25rem
    letterSpacing: "-0.04em"
rounded:
  sm: 6px
  md: 8px
  lg: 12px
---

## Overview
Linear representa o ápice da interface voltada a desenvolvedores e designers de produto. Adota uma paleta noturna quase absoluta com superfícies de grafite escuro, tipografia milimétrica e detalhes como bordas com gradientes sutis e atalhos de teclado como cidadãos de primeira classe.

## Colors
- **Canvas (#08090A):** O preto absoluto que economiza energia e cria contraste infinito.
- **Surface (#121417):** Elevação refinada para listas de issues e cards do kanban.
- **Tertiary (#5E6AD2):** Tom elétrico púrpura-índigo, com alto impacto visual sem cansar os olhos em maratonas de uso.

## Elevation & Depth
Linear dispensa sombras difusas tradicionais. A profundidade vem de **linhas perimetrais** (\`border: 1px solid #26282E\`) e sutis gradientes com transparência angular.`
  },
  {
    id: 'vercel',
    name: 'Vercel',
    domain: 'vercel.com',
    url: 'https://vercel.com',
    tagline: 'Extreme monochrome minimalism, triangular geometries, and the razor-sharp Geist typeface.',
    category: 'Cloud',
    tags: ['Frontend Cloud', 'Next.js', 'Geist Font', 'Pure Monochrome', 'Triangles'],
    accentColor: '#000000',
    heroGradient: 'linear-gradient(180deg, #FFFFFF 0%, #EAEAEA 50%, #000000 100%)',
    previewBg: '#000000',
    screenshotUrl: '/previews/vercel.png',
    lastUpdated: 'October 2026',
    verifiedStandard: true,
    metrics: {
      contrastScore: 'AAA (21:1)',
      tokenCount: 38,
      agentReadyScore: 99
    },
    colorTokens: [
      { name: 'Vercel Pure Pitch', hex: '#000000', role: 'primary', description: 'Zero luminance pure black', contrastOnWhite: '21:1', isDark: true },
      { name: 'Vercel Pure Snow', hex: '#FFFFFF', role: 'neutral', description: 'Pure white canvas', contrastOnWhite: '1:1' },
      { name: 'Geist Gray 700', hex: '#666666', role: 'secondary', description: 'Neutral body slate text', contrastOnWhite: '5.7:1' },
      { name: 'Geist Gray 100', hex: '#EAEAEA', role: 'border', description: 'Hairline grid line separator', contrastOnWhite: '1.2:1' },
      { name: 'Geist Cyan Accent', hex: '#0070F3', role: 'tertiary', description: 'Deployment success and link highlight blue', contrastOnWhite: '4.5:1' }
    ],
    typography: {
      fontFamily: "'Geist', -apple-system, BlinkMacSystemFont, sans-serif",
      monoFamily: "'Geist Mono', monospace",
      h1: { fontSize: '4rem', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.045em' },
      h2: { fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.03em' },
      bodyMd: { fontSize: '0.9375rem', fontWeight: 400, lineHeight: 1.5 },
      labelCaps: { fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.05em' }
    },
    rawYaml: `---
name: Vercel Design Language
version: 2026.2
colors:
  primary: "#000000"
  neutral: "#FFFFFF"
  secondary: "#666666"
  tertiary: "#0070F3"
  border: "#EAEAEA"
typography:
  fontFamily: "Geist, sans-serif"
  monoFamily: "Geist Mono, monospace"
  h1:
    fontSize: 4rem
    letterSpacing: "-0.045em"
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  full: 9999px
---`,
    designMdContent: `---
name: Vercel Design Language
version: 2026.2
colors:
  primary: "#000000"
  neutral: "#FFFFFF"
  secondary: "#666666"
  tertiary: "#0070F3"
  border: "#EAEAEA"
typography:
  fontFamily: "Geist, sans-serif"
  monoFamily: "Geist Mono, monospace"
  h1:
    fontSize: 4rem
    letterSpacing: "-0.045em"
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  full: 9999px
---

## Overview
A Vercel prioriza o minimalismo rigoroso e monocromático. O contraste máximo entre #000000 e #FFFFFF é enriquecido pela família tipográfica proprietária **Geist**, com formas geométricas puras e proporções inspiradas no design suíço.

## Colors
- **Primary (#000000) & Neutral (#FFFFFF):** A dicotomia binária preto/branco guia 95% de todos os componentes da interface.
- **Tertiary (#0070F3):** Azul elétrico pontual apenas para estados ativos, checkouts e sucesso de deploy.

## Shapes & Geometry
Cantos vivos e discretos (\`rounded: 6px\`), evitando raios exagerados para manter uma sensação técnica, de terminal e infraestrutura moderna.`
  },
  {
    id: 'supabase',
    name: 'Supabase',
    domain: 'supabase.com',
    url: 'https://supabase.com',
    tagline: 'Open source Firebase alternative with emerald emerald neon accents and hacker-friendly database UI.',
    category: 'Cloud',
    tags: ['PostgreSQL', 'Open Source', 'Emerald Green', 'Dark Aesthetic', 'Developer Tools'],
    accentColor: '#3ECF8E',
    heroGradient: 'linear-gradient(135deg, #1C1C1C 0%, #24B47E 60%, #3ECF8E 100%)',
    previewBg: '#171717',
    screenshotUrl: '/previews/supabase.png',
    lastUpdated: 'September 2026',
    verifiedStandard: true,
    metrics: {
      contrastScore: 'AAA (15.5:1)',
      tokenCount: 44,
      agentReadyScore: 97
    },
    colorTokens: [
      { name: 'Supabase Emerald Green', hex: '#3ECF8E', role: 'tertiary', description: 'Electric green branding and database health status', contrastOnBlack: '11.8:1' },
      { name: 'Deep Carbon Black', hex: '#171717', role: 'neutral', description: 'Base dark theme background', contrastOnWhite: '15.6:1', isDark: true },
      { name: 'Carbon Surface', hex: '#1F1F1F', role: 'surface', description: 'Table rows and SQL editor panes', contrastOnWhite: '14.2:1', isDark: true },
      { name: 'Ghost Gray Text', hex: '#A1A1A1', role: 'secondary', description: 'Schema descriptors and query helpers', contrastOnBlack: '7.5:1' },
      { name: 'High Polish White', hex: '#EDEDED', role: 'primary', description: 'Main text and SQL keyword highlighting', contrastOnBlack: '16.5:1' }
    ],
    typography: {
      fontFamily: "Custom Sans, -apple-system, BlinkMacSystemFont, sans-serif",
      monoFamily: "'Source Code Pro', monospace",
      h1: { fontSize: '3.5rem', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.03em' },
      h2: { fontSize: '2.25rem', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.02em' },
      bodyMd: { fontSize: '0.9375rem', fontWeight: 400, lineHeight: 1.55 },
      labelCaps: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }
    },
    rawYaml: `---
name: Supabase System
version: 2026.3
colors:
  canvas: "#171717"
  surface: "#1F1F1F"
  tertiary: "#3ECF8E"
  primary: "#EDEDED"
  secondary: "#A1A1A1"
  border: "#2E2E2E"
typography:
  fontFamily: "sans-serif"
  monoFamily: "Source Code Pro, monospace"
rounded:
  sm: 4px
  md: 6px
  lg: 10px
---`,
    designMdContent: `---
name: Supabase System
version: 2026.3
colors:
  canvas: "#171717"
  surface: "#1F1F1F"
  tertiary: "#3ECF8E"
  primary: "#EDEDED"
  secondary: "#A1A1A1"
  border: "#2E2E2E"
typography:
  fontFamily: "sans-serif"
  monoFamily: "Source Code Pro, monospace"
rounded:
  sm: 4px
  md: 6px
  lg: 10px
---

## Overview
O Supabase abraça a cultura hacker com um tom amigável. A cor esmeralda neon (#3ECF8E) corta a escuridão do carvão mineral criando contraste dinâmico em dashboards SQL e tabelas de banco de dados relacionais.

## Colors
- **Tertiary (#3ECF8E):** A cor assinatura de status de conexão, botões primários e o raio do logo.
- **Canvas (#171717):** Carvão puro com suavização para diminuir a fadiga visual em turnos longos de codificação.`
  },
  {
    id: 'apple',
    name: 'Apple',
    domain: 'apple.com',
    url: 'https://apple.com',
    tagline: 'Mastery in glassmorphism, continuous squircle geometry, and titanium-level product showcases.',
    category: 'Design',
    tags: ['Hardware & OS', 'Human Interface Guidelines', 'SF Pro', 'Squircles', 'Glassmorphism'],
    accentColor: '#0071E3',
    heroGradient: 'linear-gradient(135deg, #000000 0%, #1D1D1F 50%, #434344 100%)',
    previewBg: '#F5F5F7',
    screenshotUrl: '/previews/apple.png',
    lastUpdated: 'October 2026',
    verifiedStandard: true,
    metrics: {
      contrastScore: 'AAA (17.5:1)',
      tokenCount: 46,
      agentReadyScore: 99
    },
    colorTokens: [
      { name: 'Apple Midnight Black', hex: '#1D1D1F', role: 'primary', description: 'Human interface black for text and framing', contrastOnWhite: '15.2:1', isDark: true },
      { name: 'San Francisco Blue', hex: '#0071E3', role: 'tertiary', description: 'System interactive blue for buttons and text links', contrastOnWhite: '4.8:1' },
      { name: 'Off-White Titanium Ground', hex: '#F5F5F7', role: 'neutral', description: 'Neutral backdrop for hardware showcases', contrastOnWhite: '1.08:1' },
      { name: 'Subdued Gray Slate', hex: '#86868B', role: 'secondary', description: 'Secondary descriptive product copy', contrastOnWhite: '3.6:1' },
      { name: 'Pure Specular White', hex: '#FFFFFF', role: 'surface', description: 'Elevated glass cards with Gaussian blur', contrastOnWhite: '1.0:1' }
    ],
    typography: {
      fontFamily: "-apple-system, 'SF Pro Display', 'SF Pro Text', BlinkMacSystemFont, sans-serif",
      monoFamily: "'SF Mono', Menlo, monospace",
      h1: { fontSize: '4rem', fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.025em' },
      h2: { fontSize: '2.75rem', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.02em' },
      bodyMd: { fontSize: '1.0625rem', fontWeight: 400, lineHeight: 1.5 },
      labelCaps: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em' }
    },
    rawYaml: `---
name: Apple Human Interface System
version: 2026.1
colors:
  primary: "#1D1D1F"
  secondary: "#86868B"
  tertiary: "#0071E3"
  neutral: "#F5F5F7"
  surface: "#FFFFFF"
typography:
  fontFamily: "-apple-system, SF Pro, sans-serif"
  h1:
    fontSize: 4rem
    fontWeight: 600
rounded:
  sm: 8px
  md: 16px
  lg: 24px
  pill: 9999px
---`,
    designMdContent: `---
name: Apple Human Interface System
version: 2026.1
colors:
  primary: "#1D1D1F"
  secondary: "#86868B"
  tertiary: "#0071E3"
  neutral: "#F5F5F7"
  surface: "#FFFFFF"
typography:
  fontFamily: "-apple-system, SF Pro, sans-serif"
  h1:
    fontSize: 4rem
    fontWeight: 600
rounded:
  sm: 8px
  md: 16px
  lg: 24px
  pill: 9999px
---

## Overview
A linguagem visual da Apple define o padrão da indústria em elegância industrial e calor táctil. O design se fundamenta na tipografia **San Francisco (SF Pro)**, em cantos suaves contínuos (*superellipses / squircles*) e em camadas de desfoque translúcido (*frosted glass*).

## Colors
- **Primary (#1D1D1F):** Tinta de titânio escuro que substitui o preto puro para evitar rigidez no texto.
- **Tertiary (#0071E3):** O clássico azul iOS/macOS para botões em formato de pílula e chamadas "Comprar".
- **Neutral (#F5F5F7):** Fundo cinza suave e quente que realça fotos hiper-realistas de produtos.

## Elevation & Depth
O efeito translúcido \`backdrop-filter: blur(20px)\` com opacidade de 80% sobre superfícies garante legibilidade e sensação de profundidade flutuante.`
  },
  {
    id: 'github',
    name: 'GitHub',
    domain: 'github.com',
    url: 'https://github.com',
    tagline: 'Primer design system powering the world code repository with exceptional contrast and dense ergonomics.',
    category: 'DevTools & AI',
    tags: ['Version Control', 'Primer Design System', 'Mona Sans', 'Data Dense', 'Octocat'],
    accentColor: '#2DA44E',
    heroGradient: 'linear-gradient(135deg, #0D1117 0%, #161B22 60%, #238636 100%)',
    previewBg: '#0D1117',
    screenshotUrl: '/previews/github.png',
    lastUpdated: 'September 2026',
    verifiedStandard: true,
    metrics: {
      contrastScore: 'AAA (16.9:1)',
      tokenCount: 64,
      agentReadyScore: 98
    },
    colorTokens: [
      { name: 'Primer Dark Canvas', hex: '#0D1117', role: 'neutral', description: 'Base dark theme background for repository explorer', contrastOnWhite: '17.3:1', isDark: true },
      { name: 'Primer Green Accent', hex: '#238636', role: 'tertiary', description: 'Success actions, commit badges and Merge Pull Request button', contrastOnBlack: '6.2:1' },
      { name: 'Primer Dark Header', hex: '#161B22', role: 'surface', description: 'Elevated repository navigation and card borders', contrastOnWhite: '15.8:1', isDark: true },
      { name: 'Text High Contrast', hex: '#F0F6FC', role: 'primary', description: 'File names and pull request titles', contrastOnBlack: '17.1:1' },
      { name: 'Text Muted Slate', hex: '#8B949E', role: 'secondary', description: 'Branch names, timestamps and commit hashes', contrastOnBlack: '7.8:1' }
    ],
    typography: {
      fontFamily: "'Mona Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      monoFamily: "'Mona Sans Mono', monospace",
      h1: { fontSize: '3rem', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.02em' },
      h2: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.015em' },
      bodyMd: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
      labelCaps: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.04em' }
    },
    rawYaml: `---
name: GitHub Primer System
version: 2026.5
colors:
  canvas: "#0D1117"
  surface: "#161B22"
  border: "#30363D"
  primary: "#F0F6FC"
  secondary: "#8B949E"
  tertiary: "#238636"
typography:
  fontFamily: "Mona Sans, sans-serif"
rounded:
  sm: 6px
  md: 8px
  full: 9999px
---`,
    designMdContent: `---
name: GitHub Primer System
version: 2026.5
colors:
  canvas: "#0D1117"
  surface: "#161B22"
  border: "#30363D"
  primary: "#F0F6FC"
  secondary: "#8B949E"
  tertiary: "#238636"
typography:
  fontFamily: "Mona Sans, sans-serif"
rounded:
  sm: 6px
  md: 8px
  full: 9999px
---

## Overview
O Primer Design System do GitHub foi projetado para alta densidade de informação e ergonomia diária de dezenas de milhões de engenheiros. Ele prioriza clareza visual, contrastes em código e estados de pull request compreensíveis em fração de segundo.

## Colors
- **Tertiary (#238636):** O verde mundialmente conhecido do botão de Merge Pull Request e contribuições no gráfico.
- **Canvas (#0D1117):** O clássico tema escuro padrão GitHub Dark.

## Typography
Uso da família proprietária **Mona Sans** com larguras ajustáveis e excelente legibilidade em tamanhos condensados (12px - 14px).`
  },
  {
    id: 'raycast',
    name: 'Raycast',
    domain: 'raycast.com',
    url: 'https://raycast.com',
    tagline: 'Hyper-fast productivity launcher with incandescent red-coral accents and precision keyboard palettes.',
    category: 'Design',
    tags: ['Launcher', 'macOS & Windows', 'Red Coral', 'Extreme Speed', 'Productivity'],
    accentColor: '#FF6363',
    heroGradient: 'linear-gradient(135deg, #0F0F11 0%, #1A1A1E 50%, #FF6363 100%)',
    previewBg: '#0F0F11',
    screenshotUrl: '/previews/raycast.png',
    lastUpdated: 'October 2026',
    verifiedStandard: true,
    metrics: {
      contrastScore: 'AAA (16.0:1)',
      tokenCount: 40,
      agentReadyScore: 98
    },
    colorTokens: [
      { name: 'Raycast Coral Glow', hex: '#FF6363', role: 'tertiary', description: 'Incandescent laser red-coral identity and selection pill', contrastOnBlack: '7.9:1' },
      { name: 'Onyx Dark Shell', hex: '#0F0F11', role: 'neutral', description: 'Launcher spotlight container background', contrastOnWhite: '16.8:1', isDark: true },
      { name: 'Translucent Plate', hex: '#1C1C21', role: 'surface', description: 'Command list item background', contrastOnWhite: '14.9:1', isDark: true },
      { name: 'Pure White Text', hex: '#FFFFFF', role: 'primary', description: 'Command titles and active shortcut icons', contrastOnBlack: '21:1' },
      { name: 'Slate Whisper', hex: '#9E9EA7', role: 'secondary', description: 'Keyboard modifier keys and auxiliary descriptors', contrastOnBlack: '8.4:1' }
    ],
    typography: {
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      monoFamily: "'JetBrains Mono', SFMono-Regular, monospace",
      h1: { fontSize: '3.5rem', fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.035em' },
      h2: { fontSize: '2.25rem', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.025em' },
      bodyMd: { fontSize: '0.9375rem', fontWeight: 400, lineHeight: 1.5 },
      labelCaps: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em' }
    },
    rawYaml: `---
name: Raycast Launcher System
version: 2026.2
colors:
  canvas: "#0F0F11"
  surface: "#1C1C21"
  tertiary: "#FF6363"
  primary: "#FFFFFF"
  secondary: "#9E9EA7"
  border: "#2E2E36"
typography:
  fontFamily: "Inter, sans-serif"
rounded:
  sm: 6px
  md: 10px
  lg: 14px
---`,
    designMdContent: `---
name: Raycast Launcher System
version: 2026.2
colors:
  canvas: "#0F0F11"
  surface: "#1C1C21"
  tertiary: "#FF6363"
  primary: "#FFFFFF"
  secondary: "#9E9EA7"
  border: "#2E2E36"
typography:
  fontFamily: "Inter, sans-serif"
rounded:
  sm: 6px
  md: 10px
  lg: 14px
---

## Overview
O Raycast projeta sensação de velocidade inacreditável na ponta dos dedos. A paleta é dominada por tons grafite escuro com toques incadescentes de coral-vermelho neon (#FF6363), criando um ambiente focado em produtividade máxima sem fricção.

## Colors
- **Tertiary (#FF6363):** O coral eletrizante que acende a busca rápida e destaca a linha selecionada no launcher.
- **Canvas (#0F0F11):** Superfície que mimetiza o acrílico escuro com transparência e desfoque profundo.

## Components
- **Command Pill:** Teclas \`⌘K\` representadas em pequenas caixas com borda luminosa e cantos arredondados de 6px.`
  }
];
