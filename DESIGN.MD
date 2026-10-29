---
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

O OpenDesignMD adota com rigor a estética de **"Engineered Calm"** e hiper-precisão tipográfica do **Google Antigravity** (`antigravity.google`). O design se apoia em uma paleta monocromática disciplinada com vasto respiro negativo, tipografia forte em Google Sans com tracking negativo nos títulos, pílulas suaves (`rounded.full`) e toques cirúrgicos de azul e difusão cromática.

## Colors

A paleta prioriza a sobriedade sobre o ruído visual, reservando saturação apenas para interações e momentos de ênfase:
- **Primary (`#121317`):** Tinta preta pura para textos principais, títulos e o botão de ação primordial (Hero CTA).
- **Secondary (`#5F6368`):** Cinza ardósia neutro para legendas, metadados e ícones informativos.
- **Tertiary (`#1A73E8`):** O clássico Google Blue utilizado de forma estritamente cirúrgica para links ativos e pílulas de destaque.
- **Neutral (`#FAF9F6`):** Canvas de base suave, oferecendo um fundo quente e menos ofuscante que o branco puro.
- **Surface (`#FFFFFF`):** Superfície limpa de cards flutuantes e modais.
- **Accent Glow (`rgba(26, 115, 232, 0.12)`): Brilho etéreo e difuso que evoca a atmosfera do motor de gravidade do Antigravity.

## Typography

Utiliza **Google Sans / Inter** com dois registros propositalmente opostos:
- **Display & Títulos (The Shout):** Letras monumentais em peso 500 com tracking fortemente negativo (`-0.035em`), criando blocos de leitura sólidos e arquitetônicos.
- **Interface & Textos (The Whisper):** Tamanhos confortáveis (`body-md: 0.9375rem`), entrelinha relaxada (`1.55`) e tracking ligeiramente aberto para máxima legibilidade.
- **Metadados & Badges (`label-caps`):** Caixa alta sutil com tracking espaçado (`0.06em`).

## Layout

- **Grid:** Estrutura baseada em múltiplos rigorosos de 4px e 8px, com largura máxima contida em 1440px e margem lateral fluida de 32px a 72px.
- **Vasto Espaço Negativo:** As seções da Landing Page respiram com paddings de 80px (`{spacing.4xl}`) entre blocos de conteúdo.

## Elevation & Depth

- **Elevação 1 (Cards):** Borda suave (`1px solid {colors.border}`) sem sombra pesada, usando superfícies sólidas e transições sutis.
- **Elevação 2 (Hover & Destaques):** Leve projeção (`box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.05)`).
- **Elevação 3 (Modais e Detalhes):** Fundo translúcido com `backdrop-filter: blur(16px)` e borda refinada de alta luminosidade.

## Shapes

- Botões, campos de busca e tags adotam formato de **pílula completa** (`{rounded.full}`).
- Cards e contêineres principais utilizam cantos generosamente arredondados (`{rounded.xl}` = 28px).
- Modais e janelas flutuantes utilizam cantos suaves de 20px (`{rounded.lg}`).

## Components

### Botão Primário (`button-primary`)
- Formato de pílula preta sólida (`#121317`) com tipografia branca, padding generoso e transição suave no hover (opacidade 90% ou leve escala 0.98).

### Botão Secundário (`button-secondary`)
- Fundo branco/neutro com contorno sutil (`1px solid {colors.border}`) e texto escuro.

### Cards de Empresas (Estilo Mobbin / DesignMD)
- Proporção 16:10 ou 4:3 para exibição do preview visual.
- Cabeçalho com logo da marca, nome, tag de categoria e paleta de cores em círculos ou pílulas.
- Botões de ação rápida para "Copiar DESIGN.MD" e "Inspecionar Tokens".

## Do's and Don'ts

### Do's:
- **Respeite o respiro:** Deixe o espaço em branco carregar a sofisticação da interface.
- **Use pílulas consistentes:** Botões e chips de tags devem sempre adotar `{rounded.full}`.
- **Mantenha o contraste:** O botão preto principal deve se destacar imediatamente como o ponto focal.

### Don'ts:
- **Não use gradientes pesados:** Evite fundos coloridos saturados atrás de blocos de texto.
- **Não use bordas pontiagudas:** Não misture cantos de 0px ou 2px em um layout projetado com cantos amplos.
- **Não abuse de sombras pretas duras:** Privilegie bordas sutis com opacidade controlada.
