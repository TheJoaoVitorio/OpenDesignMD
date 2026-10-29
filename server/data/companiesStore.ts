import { Company, DesignTokens } from "../types.js";

export class CompaniesStore {
  private companies: Map<string, Company> = new Map();

  constructor() {
    this.seedDefaultCompanies();
  }

  private seedDefaultCompanies() {
    const defaultCompanies: Company[] = [
      // 1. Google Antigravity
      {
        id: "google-antigravity",
        name: "Google Antigravity",
        domain: "antigravity.google",
        category: "AI & Developer Tools",
        description: "Estética de Engineered Calm com vasto respiro negativo, tipografia forte em Google Sans com tracking negativo nos títulos, pílulas suaves e toques cirúrgicos de azul e difusão cromática.",
        logoUrl: "https://cdn.simpleicons.org/google/1A73E8",
        screenshotUrl: "/previews/google-antigravity.png",
        colors: {
          primary: "#121317",
          secondary: "#5F6368",
          tertiary: "#1A73E8",
          neutral: "#FAF9F6",
          surface: "#FFFFFF",
          accent: "#1A73E8",
          border: "#E8EAED",
          onPrimary: "#FFFFFF",
          onTertiary: "#FFFFFF",
          surfaceVariant: "#F1F3F4",
        },
        typography: {
          fontFamily: "Google Sans, Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          headingFamily: "Google Sans, -apple-system, BlinkMacSystemFont, sans-serif",
          monoFamily: "'Google Sans Mono', 'SFMono-Regular', Consolas, monospace",
          h1: { fontSize: "3.5rem", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.035em" },
          h2: { fontSize: "2.25rem", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.025em" },
          h3: { fontSize: "1.5rem", fontWeight: 500, lineHeight: 1.3, letterSpacing: "-0.015em" },
          bodyMd: { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.55 },
          bodySm: { fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.45 },
          labelCaps: { fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.06em" },
        },
        spacing: {
          xs: "4px",
          sm: "8px",
          md: "16px",
          lg: "24px",
          xl: "32px",
          "2xl": "48px",
          "3xl": "64px",
          "4xl": "80px",
        },
        rounded: {
          sm: "8px",
          md: "14px",
          lg: "20px",
          xl: "28px",
          full: "9999px",
        },
        components: {
          buttonPrimary: {
            backgroundColor: "{colors.primary}",
            textColor: "{colors.onPrimary}",
            rounded: "{rounded.full}",
            padding: "10px 24px",
            fontSize: "{typography.bodyMd.fontSize}",
          },
          buttonSecondary: {
            backgroundColor: "{colors.surface}",
            textColor: "{colors.primary}",
            border: "1px solid {colors.border}",
            rounded: "{rounded.full}",
            padding: "10px 24px",
          },
          card: {
            backgroundColor: "{colors.surface}",
            rounded: "{rounded.xl}",
            border: "1px solid {colors.border}",
            padding: "{spacing.lg}",
          },
          badge: {
            backgroundColor: "{colors.surfaceVariant}",
            textColor: "{colors.secondary}",
            rounded: "{rounded.full}",
            padding: "4px 12px",
            fontSize: "{typography.labelCaps.fontSize}",
          },
        },
        verified: true,
        extractedAt: "2026-10-29T10:00:00.000Z",
        wcagContrast: {
          primaryOnNeutral: 16.8,
          tertiaryOnNeutral: 4.62,
          onTertiaryOnTertiary: 4.55,
          isCompliantAA: true,
          contrastStatus: "AAA",
          notes: "Contraste exemplar em fundo neutro (#FAF9F6) e primário (#121317).",
        },
        designMd: `---
name: Google Antigravity
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
  body-md:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.55
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

## Typography

Utiliza **Google Sans / Inter** com dois registros propositalmente opostos:
- **Display & Títulos:** Letras monumentais em peso 500 com tracking fortemente negativo (\`-0.035em\`), criando blocos de leitura sólidos e arquitetônicos.
- **Interface & Textos:** Tamanhos confortáveis (\`body-md: 0.9375rem\`), entrelinha relaxada (\`1.55\`) e tracking neutro para máxima legibilidade.
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
- Formato de pílula preta sólida (\`#121317\`) com tipografia branca, padding generoso e transição suave no hover.

### Botão Secundário (\`button-secondary\`)
- Fundo branco/neutro com contorno sutil (\`1px solid {colors.border}\`) e texto escuro.

### Cards de Empresas
- Borda fina e canto suave, apresentando logotipo, paleta em círculos e botões de ação direta.

## Do's and Don'ts

### Do's:
- **Respeite o respiro:** Deixe o espaço em branco carregar a sofisticação da interface.
- **Use pílulas consistentes:** Botões e chips de tags devem sempre adotar \`{rounded.full}\`.
- **Mantenha o contraste:** O botão preto principal deve se destacar imediatamente como o ponto focal.

### Don'ts:
- **Não crie novas cores primárias:** Toda nova interface gerada por IA deve reutilizar a paleta declarada.
- **Não use gradientes pesados:** Evite fundos coloridos saturados atrás de blocos de texto.
- **Não use bordas pontiagudas:** Não misture cantos de 0px ou 2px em um layout projetado com cantos amplos.`,
      },

      // 2. Stripe
      {
        id: "stripe",
        name: "Stripe",
        domain: "stripe.com",
        category: "Fintech & Payments",
        description: "Estética refinada orientada a finanças globais: gradientes suaves em mesh, indigo icônico para ações de conversão, superfícies claras imaculadas e tipografia precisa em Söhne.",
        logoUrl: "https://cdn.simpleicons.org/stripe/635BFF",
        screenshotUrl: "/previews/stripe.png",
        colors: {
          primary: "#0A2540",
          secondary: "#425466",
          tertiary: "#635BFF",
          neutral: "#FFFFFF",
          surface: "#F6F9FC",
          accent: "#00D4FF",
          border: "#E6EBF1",
          onPrimary: "#FFFFFF",
          onTertiary: "#FFFFFF",
          surfaceVariant: "#EEF2F6",
        },
        typography: {
          fontFamily: "Söhne, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          headingFamily: "Söhne, -apple-system, BlinkMacSystemFont, sans-serif",
          monoFamily: "'Söhne Mono', Menlo, Consolas, monospace",
          h1: { fontSize: "3.25rem", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em" },
          h2: { fontSize: "2.125rem", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" },
          h3: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" },
          bodyMd: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.6 },
          bodySm: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5 },
          labelCaps: { fontSize: "0.8125rem", fontWeight: 600, letterSpacing: "0.04em" },
        },
        spacing: {
          xs: "4px",
          sm: "8px",
          md: "16px",
          lg: "24px",
          xl: "32px",
          "2xl": "48px",
          "3xl": "64px",
        },
        rounded: {
          sm: "4px",
          md: "8px",
          lg: "16px",
          xl: "24px",
          full: "9999px",
        },
        components: {
          buttonPrimary: {
            backgroundColor: "{colors.tertiary}",
            textColor: "{colors.onTertiary}",
            rounded: "{rounded.full}",
            padding: "9px 20px",
            fontSize: "{typography.bodyMd.fontSize}",
          },
          card: {
            backgroundColor: "{colors.surface}",
            rounded: "{rounded.lg}",
            border: "1px solid {colors.border}",
            padding: "{spacing.lg}",
          },
        },
        verified: true,
        extractedAt: "2026-10-29T10:00:00.000Z",
        wcagContrast: {
          primaryOnNeutral: 14.5,
          tertiaryOnNeutral: 4.88,
          onTertiaryOnTertiary: 4.52,
          isCompliantAA: true,
          contrastStatus: "AAA",
        },
        designMd: `---
name: Stripe
version: alpha
colors:
  primary: "#0A2540"
  secondary: "#425466"
  tertiary: "#635BFF"
  neutral: "#FFFFFF"
  surface: "#F6F9FC"
  accent: "#00D4FF"
  on-primary: "#FFFFFF"
  on-tertiary: "#FFFFFF"
  border: "#E6EBF1"
typography:
  fontFamily: "Söhne, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  h1:
    fontFamily: "{typography.fontFamily}"
    fontSize: 3.25rem
    fontWeight: 700
    lineHeight: 1.15
  h2:
    fontFamily: "{typography.fontFamily}"
    fontSize: 2.125rem
    fontWeight: 600
    lineHeight: 1.25
  body-md:
    fontFamily: "{typography.fontFamily}"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.full}"
    padding: "9px 20px"
    fontSize: "{typography.body-md.fontSize}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border}"
---

## Overview

O design system da Stripe é a referência global para interfaces de tecnologia financeira e SaaS de alta conversão. Ele equilibra engenharia de rigor com fluidez visual, destacando-se por fundos limpos com gradientes mesh suaves, cartões elevados e o icônico índigo \`#635BFF\` em botões de conversão primária.

## Colors

- **Primary (\`#0A2540\`):** Azul marinho ultra-escuro para títulos e tipografia com autoridade executiva.
- **Secondary (\`#425466\`):** Cinza azulado neutro para parágrafos explicativos e legendas.
- **Tertiary (\`#635BFF\`):** O característico Stripe Indigo para todos os botões de ação e gatilhos de fluxo.
- **Neutral (\`#FFFFFF\`):** Fundo branco absoluto que maximiza luminosidade e nitidez.
- **Surface (\`#F6F9FC\`):** Superfície clara e suave para cartões de produtos e contêineres de dados.
- **Accent (\`#00D4FF\`):** Ciano elétrico utilizado como cor de suporte em gradientes e gráficos de conversão.

## Typography

Baseada na família tipográfica **Söhne**, oferecendo precisão suíça:
- **Títulos (H1, H2):** Pesos sólidos (600/700) com proporções geométricas compactas.
- **Textos de interface:** Linhas arejadas com entrelinha 1.6 para facilitar a digestão de métricas e formulários de checkout.

## Layout

Escala modular com base 8px. As seções utilizam transições angulares sutis (-6 graus ou gradientes de corte) e largura máxima contida de 1200px.

## Elevation & Depth

- **Nível 1:** Bordas sólidas ultrafinas (\`1px solid #E6EBF1\`) com sombreamento suave: \`box-shadow: 0 2px 5px -1px rgba(50, 50, 93, 0.08)\`.
- **Nível 2:** Hover de cartões interativos com elevação progressiva: \`box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.12)\`.

## Shapes

- Botões utilizam pílula completa (\`rounded.full\`) ou cantos moderados (\`8px\`).
- Cards utilizam raio de 16px (\`{rounded.lg}\`).

## Components

### Botão Primário (\`button-primary\`)
Fundo índigo vibrante (\`#635BFF\`), texto branco com peso 600, cantos de pílula e micro-interação de elevação no foco.

### Cartão de Informação (\`card\`)
Fundo \`#F6F9FC\`, borda \`#E6EBF1\` e padding interno generoso de 24px.

## Do's and Don'ts

### Do's:
- Utilize \`#635BFF\` exclusivamente para a ação mais importante da tela.
- Mantenha sombras em tons de azul-marinho com baixa opacidade em vez de cinza neutro.

### Don'ts:
- Nunca sobrecarregue a interface com múltiplos botões de fundo índigo na mesma viewport.
- Não utilize cantos afiados (0px) em cartões.`,
      },

      // 3. Linear
      {
        id: "linear",
        name: "Linear",
        domain: "linear.app",
        category: "Productivity & Issue Tracking",
        description: "A vanguarda do dark-mode contemporâneo: superfícies profundas em grafite cósmico, micro-bordas semitransparentes de 1px, acento ultravioleta e velocidade perceptiva incomparável.",
        logoUrl: "https://cdn.simpleicons.org/linear/5E6AD2",
        screenshotUrl: "/previews/linear.png",
        colors: {
          primary: "#F7F8F8",
          secondary: "#8A8F98",
          tertiary: "#5E6AD2",
          neutral: "#08090A",
          surface: "#101114",
          accent: "#5E6AD2",
          border: "rgba(255, 255, 255, 0.08)",
          onPrimary: "#08090A",
          onTertiary: "#FFFFFF",
          surfaceVariant: "#191A1E",
        },
        typography: {
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          headingFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
          monoFamily: "'JetBrains Mono', monospace",
          h1: { fontSize: "3rem", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.04em" },
          h2: { fontSize: "2rem", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.03em" },
          h3: { fontSize: "1.375rem", fontWeight: 500, lineHeight: 1.35, letterSpacing: "-0.02em" },
          bodyMd: { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.5 },
          bodySm: { fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.4 },
          labelCaps: { fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.08em" },
        },
        spacing: {
          xs: "4px",
          sm: "8px",
          md: "12px",
          lg: "20px",
          xl: "28px",
          "2xl": "40px",
        },
        rounded: {
          sm: "6px",
          md: "10px",
          lg: "16px",
          xl: "22px",
          full: "9999px",
        },
        components: {
          buttonPrimary: {
            backgroundColor: "{colors.tertiary}",
            textColor: "{colors.onTertiary}",
            rounded: "{rounded.md}",
            padding: "8px 16px",
            fontSize: "{typography.bodyMd.fontSize}",
          },
          card: {
            backgroundColor: "{colors.surface}",
            rounded: "{rounded.lg}",
            border: "1px solid {colors.border}",
            padding: "{spacing.lg}",
          },
        },
        verified: true,
        extractedAt: "2026-10-29T10:00:00.000Z",
        wcagContrast: {
          primaryOnNeutral: 17.2,
          tertiaryOnNeutral: 4.75,
          onTertiaryOnTertiary: 4.6,
          isCompliantAA: true,
          contrastStatus: "AAA",
        },
        designMd: `---
name: Linear
version: alpha
colors:
  primary: "#F7F8F8"
  secondary: "#8A8F98"
  tertiary: "#5E6AD2"
  neutral: "#08090A"
  surface: "#101114"
  surface-variant: "#191A1E"
  accent: "#5E6AD2"
  on-primary: "#08090A"
  on-tertiary: "#FFFFFF"
  border: "rgba(255, 255, 255, 0.08)"
typography:
  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  h1:
    fontFamily: "{typography.fontFamily}"
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  h2:
    fontFamily: "{typography.fontFamily}"
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  body-md:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 6px
  md: 10px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 20px
  xl: 28px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    fontSize: "{typography.body-md.fontSize}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border}"
---

## Overview

O Linear é o padrão de excelência em aplicações produtivas modernas operando em Dark Mode nativo. Focado em velocidade e precisão de teclado, sua interface elimina supérfluos visuais através de paletas quase monocromáticas em tons escuros e acentos sutis em ultravioleta (\`#5E6AD2\`).

## Colors

- **Primary (\`#F7F8F8\`):** Branco quase puro com leve aquecimento para leitura de texto sem fadiga ocular.
- **Secondary (\`#8A8F98\`):** Cinza médio de alta fidelidade para descrições de tarefas e teclas de atalho.
- **Tertiary (\`#5E6AD2\`):** Violeta elétrico característico para seleção de status e botões primários.
- **Neutral (\`#08090A\`):** Fundo cósmico escuro profundo (não #000000 puro, mas preto sutilmente cinzelado).
- **Surface (\`#101114\`):** Painéis e listas de navegação suspensas.

## Typography

Utiliza a família **Inter** com kerning ajustado e letter-spacing comprimido nos títulos (\`-0.04em\`), conferindo peso visual e densidade técnica.

## Layout

Grade ultra compacta com base de 4px e 12px, permitindo grande volume de dados operacionais sem sensação de aperto.

## Elevation & Depth

Não usa sombras difusas convencionais. O efeito de profundidade é criado através de bordas translúcidas (\`rgba(255, 255, 255, 0.08)\`) e variações de luminosidade entre camadas.

## Shapes

Cantos contidos e modernos (\`6px\` a \`10px\`), preservando o aspecto utilitário de uma ferramenta de alta engenharia.

## Components

### Botão Primário (\`button-primary\`)
Fundo \`#5E6AD2\`, cantos \`rounded.md\` (10px), texto nítido e hover com iluminação por gradiente sutil superior.

### Cartão de Tarefa / Issue
Fundo \`#101114\`, contorno fino de 1px translúcido, hover com clareamento da superfície para \`#191A1E\`.

## Do's and Don'ts

### Do's:
- Mantenha contrastes rigorosos e linhas de 1px em separadores.
- Favoreça comandos de atalho visíveis ao lado de rótulos de botões.

### Don'ts:
- Nunca utilize sombras pretas pesadas em fundo escuro.
- Evite elementos puramente decorativos que interfiram na velocidade da interface.`,
      },

      // 4. Vercel
      {
        id: "vercel",
        name: "Vercel",
        domain: "vercel.com",
        category: "Cloud & Infrastructure",
        description: "Minimalismo arquitetural baseado na geometria do triângulo: contraste binário puro entre preto e branco, tipografia Geist imaculada e acento azul cobalto pontual.",
        logoUrl: "https://cdn.simpleicons.org/vercel/000000",
        screenshotUrl: "/previews/vercel.png",
        colors: {
          primary: "#000000",
          secondary: "#666666",
          tertiary: "#0070F3",
          neutral: "#FFFFFF",
          surface: "#FAFAFA",
          accent: "#0070F3",
          border: "#EAEAEA",
          onPrimary: "#FFFFFF",
          onTertiary: "#FFFFFF",
          surfaceVariant: "#F2F2F2",
        },
        typography: {
          fontFamily: "Geist Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          headingFamily: "Geist Sans, -apple-system, BlinkMacSystemFont, sans-serif",
          monoFamily: "Geist Mono, monospace",
          h1: { fontSize: "3rem", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em" },
          h2: { fontSize: "2rem", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" },
          h3: { fontSize: "1.375rem", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.01em" },
          bodyMd: { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.6 },
          bodySm: { fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.5 },
          labelCaps: { fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em" },
        },
        spacing: {
          xs: "4px",
          sm: "8px",
          md: "16px",
          lg: "24px",
          xl: "32px",
          "2xl": "48px",
        },
        rounded: {
          sm: "4px",
          md: "6px",
          lg: "8px",
          xl: "12px",
          full: "9999px",
        },
        components: {
          buttonPrimary: {
            backgroundColor: "{colors.primary}",
            textColor: "{colors.onPrimary}",
            rounded: "{rounded.md}",
            padding: "8px 16px",
            fontSize: "{typography.bodyMd.fontSize}",
          },
          card: {
            backgroundColor: "{colors.surface}",
            rounded: "{rounded.lg}",
            border: "1px solid {colors.border}",
            padding: "{spacing.lg}",
          },
        },
        verified: true,
        extractedAt: "2026-10-29T10:00:00.000Z",
        wcagContrast: {
          primaryOnNeutral: 21.0,
          tertiaryOnNeutral: 4.54,
          onTertiaryOnTertiary: 4.51,
          isCompliantAA: true,
          contrastStatus: "AAA",
        },
        designMd: `---
name: Vercel
version: alpha
colors:
  primary: "#000000"
  secondary: "#666666"
  tertiary: "#0070F3"
  neutral: "#FFFFFF"
  surface: "#FAFAFA"
  surface-variant: "#F2F2F2"
  accent: "#0070F3"
  on-primary: "#FFFFFF"
  on-tertiary: "#FFFFFF"
  border: "#EAEAEA"
typography:
  fontFamily: "Geist Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  monoFamily: "Geist Mono, monospace"
  h1:
    fontFamily: "{typography.fontFamily}"
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.15
  h2:
    fontFamily: "{typography.fontFamily}"
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.25
  body-md:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    fontSize: "{typography.body-md.fontSize}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border}"
---

## Overview

O design system da Vercel (Geist Design System) apoia-se em geometria hiper-precisa, tipografia monospace e sans nativas da marca e contraste monocromático absoluto. O foco é a experiência do desenvolvedor em deploy instantâneo na borda (edge).

## Colors

- **Primary (\`#000000\`):** Preto absoluto que ancora títulos e o botão de ação principal.
- **Secondary (\`#666666\`):** Cinza neutro 50% para rótulos secundários.
- **Tertiary (\`#0070F3\`):** Vercel Blue clássico para links interativos e status de sucesso em builds.
- **Neutral (\`#FFFFFF\`):** Fundo branco base limpo e imutável.
- **Surface (\`#FAFAFA\`):** Fundo de cards discretos.

## Typography

Alimentado pelo **Geist Sans** e **Geist Mono**, projetados especificamente para legibilidade de código, comandos de terminal e densidade de painéis na web.

## Layout

Estrutura métrica rigorosa em escala 8px. Linhas divisórias ultrafinas (\`#EAEAEA\`) que dividem a página com precisão de blueprint de engenharia.

## Elevation & Depth

Não utiliza sombras decorativas em sua forma básica; a profundidade é demarcada exclusivamente por bordas vetoriais finas de 1px.

## Shapes

Cantos contidos entre 4px e 8px (\`{rounded.sm}\` e \`{rounded.lg}\`). Não se usam cantos circulares em cards nem em botões corporativos.

## Components

### Botão Primário (\`button-primary\`)
Bloco preto sólido (\`#000000\`), tipografia branca em Geist Sans, cantos em 6px e hover com inversão suave de contraste.

### Card
Fundo em cinza claro (\`#FAFAFA\`), borda sólida \`#EAEAEA\`, cantos de 8px e padding de 24px.

## Do's and Don'ts

### Do's:
- Use fontes monospace para identificadores de branches, commits e domínios.
- Respeite o alinhamento estrito dos divisores verticais e horizontais.

### Don'ts:
- Não introduza paletas coloridas aleatórias fora da escala monocromática e do azul cobalto.
- Evite sombras desfocadas com raio superior a 8px.`,
      },

      // 5. Supabase
      {
        id: "supabase",
        name: "Supabase",
        domain: "supabase.com",
        category: "Database & Backend",
        description: "Estética developer-first com verde esmeralda icônico (Supabase Emerald), cantos chanfrados e superfícies carvão profundo.",
        logoUrl: "https://cdn.simpleicons.org/supabase/3ECF8E",
        screenshotUrl: "/previews/supabase.png",
        colors: {
          primary: "#EDEDED",
          secondary: "#888888",
          tertiary: "#3ECF8E",
          neutral: "#121212",
          surface: "#1C1C1C",
          accent: "#3ECF8E",
          border: "#282828",
          onPrimary: "#121212",
          onTertiary: "#121212",
          surfaceVariant: "#242424",
        },
        typography: {
          fontFamily: "Circular, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          headingFamily: "Circular, -apple-system, BlinkMacSystemFont, sans-serif",
          monoFamily: "'Source Code Pro', monospace",
          h1: { fontSize: "3.25rem", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em" },
          h2: { fontSize: "2.125rem", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" },
          h3: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" },
          bodyMd: { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.55 },
          bodySm: { fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.45 },
          labelCaps: { fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em" },
        },
        spacing: {
          xs: "4px",
          sm: "8px",
          md: "16px",
          lg: "24px",
          xl: "32px",
          "2xl": "48px",
        },
        rounded: {
          sm: "4px",
          md: "6px",
          lg: "10px",
          xl: "16px",
          full: "9999px",
        },
        components: {
          buttonPrimary: {
            backgroundColor: "{colors.tertiary}",
            textColor: "{colors.onTertiary}",
            rounded: "{rounded.md}",
            padding: "8px 18px",
            fontSize: "{typography.bodyMd.fontSize}",
          },
          card: {
            backgroundColor: "{colors.surface}",
            rounded: "{rounded.lg}",
            border: "1px solid {colors.border}",
            padding: "{spacing.lg}",
          },
        },
        verified: true,
        extractedAt: "2026-10-29T10:00:00.000Z",
        wcagContrast: {
          primaryOnNeutral: 15.6,
          tertiaryOnNeutral: 11.2,
          onTertiaryOnTertiary: 10.8,
          isCompliantAA: true,
          contrastStatus: "AAA",
        },
        designMd: `---
name: Supabase
version: alpha
colors:
  primary: "#EDEDED"
  secondary: "#888888"
  tertiary: "#3ECF8E"
  neutral: "#121212"
  surface: "#1C1C1C"
  surface-variant: "#242424"
  accent: "#3ECF8E"
  on-primary: "#121212"
  on-tertiary: "#121212"
  border: "#282828"
typography:
  fontFamily: "Circular, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  monoFamily: "'Source Code Pro', monospace"
  h1:
    fontFamily: "{typography.fontFamily}"
    fontSize: 3.25rem
    fontWeight: 700
    lineHeight: 1.15
  h2:
    fontFamily: "{typography.fontFamily}"
    fontSize: 2.125rem
    fontWeight: 600
    lineHeight: 1.25
  body-md:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.55
rounded:
  sm: 4px
  md: 6px
  lg: 10px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.md}"
    padding: "8px 18px"
    fontSize: "{typography.body-md.fontSize}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border}"
---

## Overview

O design system do Supabase é construído para desenvolvedores que operam com infraestrutura de dados em tempo real. O verde esmeralda distintivo (\`#3ECF8E\`) sobressai contra um cenário escuro de carvão texturizado, transmitindo agilidade e poder de banco de dados aberto.

## Colors

- **Primary (\`#EDEDED\`):** Branco frio para máxima legibilidade de esquemas SQL e logs.
- **Secondary (\`#888888\`):** Cinza de intensidade moderada para metadados de tabelas.
- **Tertiary (\`#3ECF8E\`):** Supabase Emerald, a cor assinatura para ações primárias e status online.
- **Neutral (\`#121212\`):** Fundo carvão profundo escuro.
- **Surface (\`#1C1C1C\`):** Superfícies de tabelas, painéis de controle e editores de consultas.

## Typography

Tipografia técnica e amigável (Circular / Inter) com ênfase em blocos de código SQL e JSON estruturados.

## Layout

Grade pragmática com colunas fixas e tabelas com rolagem horizontal livre. Espaçamento base de 8px e 16px.

## Elevation & Depth

Contraste entre \`#121212\` e \`#1C1C1C\`, complementado por bordas \`1px solid #282828\` e discretos realces luminosos no hover.

## Shapes

Cantos discretos (6px a 10px) para botões e cards de documentação técnica.

## Components

### Botão Primário (\`button-primary\`)
Fundo verde esmeralda (\`#3ECF8E\`), tipografia preta sólida em \`#121212\` proporcionando mais de 10:1 de contraste WCAG AAA.

### Cartão de Módulo
Fundo \`#1C1C1C\` com borda \`#282828\` e ícone com glow verde suave.

## Do's and Don'ts

### Do's:
- Use sempre texto escuro (\`#121212\`) sobre o botão verde esmeralda para manter conformidade WCAG AAA.
- Exiba snippets SQL com formatação monospace precisa.

### Don'ts:
- Nunca use texto branco sobre \`#3ECF8E\` (o contraste é inferior a 2:1).`,
      },

      // 6. Apple
      {
        id: "apple",
        name: "Apple",
        domain: "apple.com",
        category: "Design & Hardware",
        description: "Human Interface Guidelines canônico: tipografia SF Pro imponente, contrastes absolutos, vastas superfícies de respiro e materiais translúcidos com blur dinâmico.",
        logoUrl: "https://cdn.simpleicons.org/apple/000000",
        screenshotUrl: "/previews/apple.png",
        colors: {
          primary: "#1D1D1F",
          secondary: "#86868B",
          tertiary: "#0071E3",
          neutral: "#F5F5F7",
          surface: "#FFFFFF",
          accent: "#0071E3",
          border: "#D2D2D7",
          onPrimary: "#FFFFFF",
          onTertiary: "#FFFFFF",
          surfaceVariant: "#E8E8ED",
        },
        typography: {
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          headingFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
          monoFamily: "'SF Mono', Menlo, monospace",
          h1: { fontSize: "3.5rem", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em" },
          h2: { fontSize: "2.5rem", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.015em" },
          h3: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" },
          bodyMd: { fontSize: "1.0625rem", fontWeight: 400, lineHeight: 1.5 },
          bodySm: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.4 },
          labelCaps: { fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.02em" },
        },
        spacing: {
          xs: "4px",
          sm: "8px",
          md: "16px",
          lg: "24px",
          xl: "36px",
          "2xl": "54px",
          "3xl": "80px",
        },
        rounded: {
          sm: "8px",
          md: "12px",
          lg: "18px",
          xl: "28px",
          full: "9999px",
        },
        components: {
          buttonPrimary: {
            backgroundColor: "{colors.tertiary}",
            textColor: "{colors.onTertiary}",
            rounded: "{rounded.full}",
            padding: "11px 22px",
            fontSize: "{typography.bodyMd.fontSize}",
          },
          card: {
            backgroundColor: "{colors.surface}",
            rounded: "{rounded.xl}",
            padding: "{spacing.xl}",
          },
        },
        verified: true,
        extractedAt: "2026-10-29T10:00:00.000Z",
        wcagContrast: {
          primaryOnNeutral: 15.2,
          tertiaryOnNeutral: 4.58,
          onTertiaryOnTertiary: 4.54,
          isCompliantAA: true,
          contrastStatus: "AAA",
        },
        designMd: `---
name: Apple
version: alpha
colors:
  primary: "#1D1D1F"
  secondary: "#86868B"
  tertiary: "#0071E3"
  neutral: "#F5F5F7"
  surface: "#FFFFFF"
  surface-variant: "#E8E8ED"
  accent: "#0071E3"
  on-primary: "#FFFFFF"
  on-tertiary: "#FFFFFF"
  border: "#D2D2D7"
typography:
  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif"
  h1:
    fontFamily: "{typography.fontFamily}"
    fontSize: 3.5rem
    fontWeight: 600
    lineHeight: 1.1
  h2:
    fontFamily: "{typography.fontFamily}"
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.2
  body-md:
    fontFamily: "{typography.fontFamily}"
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 8px
  md: 12px
  lg: 18px
  xl: 28px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 36px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.full}"
    padding: "11px 22px"
    fontSize: "{typography.body-md.fontSize}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xl}"
---

## Overview

O padrão Apple sintetiza o humanismo digital contemporâneo: fotografia monumental, tipografia SF Pro calibrada e superfícies táteis com cantos generosos em superelipse.

## Colors

- **Primary (\`#1D1D1F\`):** O preto Apple característico, menos abrasivo que o #000 puro.
- **Secondary (\`#86868B\`):** Cinza médio equilibrado para subtítulos.
- **Tertiary (\`#0071E3\`):** Azul Apple oficial para links de compra e CTAs de ação.
- **Neutral (\`#F5F5F7\`):** Fundo cinza frio suave que confere distinção física aos produtos.
- **Surface (\`#FFFFFF\`):** Superfícies flutuantes e cards de apresentação.

## Typography

Com base no **SF Pro**, equilibrando tracking ótico variável conforme o tamanho da fonte.

## Layout

Vasto respiro vertical, colunas centralizadas com largura máxima de 1280px e margens fluidas.

## Elevation & Depth

Substituição de sombras pesadas por materiais de vidro translúcido com desfoque dinâmico de fundo (\`backdrop-filter: blur(20px)\`).

## Shapes

Curvatura contínua (squircle / superellipse) em pílulas (\`{rounded.full}\`) e cards (\`28px\`).

## Components

### Botão Primário (\`button-primary\`)
Pílula azul sólida (\`#0071E3\`) com texto branco e hover sutil.

### Cartão de Produto
Superfície branca imaculada com cantos de 28px e imagem centralizada com foco absoluto.

## Do's and Don'ts

### Do's:
- Garanta espaçamentos amplos e generosos acima e abaixo de cada bloco de produto.
- Empregue \`{rounded.full}\` para todos os botões de ação e tags de navegação.

### Don'ts:
- Não empregue bordas pretas grossas ou cantos pontiagudos.`,
      },

      // 7. GitHub
      {
        id: "github",
        name: "GitHub",
        domain: "github.com",
        category: "Developer Platform",
        description: "Design System Primer canônico: foco absoluto em legibilidade de código, tons de ardósia balanceados e botões de ação em verde de alta conversão.",
        logoUrl: "https://cdn.simpleicons.org/github/1F2328",
        screenshotUrl: "/previews/github.png",
        colors: {
          primary: "#1F2328",
          secondary: "#656D76",
          tertiary: "#1F883D",
          neutral: "#FFFFFF",
          surface: "#F6F8FA",
          accent: "#0969DA",
          border: "#D0D7DE",
          onPrimary: "#FFFFFF",
          onTertiary: "#FFFFFF",
          surfaceVariant: "#EAEEF2",
        },
        typography: {
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
          headingFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          monoFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
          h1: { fontSize: "2.5rem", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" },
          h2: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" },
          h3: { fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.4 },
          bodyMd: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5 },
          bodySm: { fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.45 },
          labelCaps: { fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em" },
        },
        spacing: {
          xs: "4px",
          sm: "8px",
          md: "16px",
          lg: "24px",
          xl: "32px",
          "2xl": "40px",
        },
        rounded: {
          sm: "4px",
          md: "6px",
          lg: "8px",
          xl: "12px",
          full: "9999px",
        },
        components: {
          buttonPrimary: {
            backgroundColor: "{colors.tertiary}",
            textColor: "{colors.onTertiary}",
            rounded: "{rounded.md}",
            padding: "5px 16px",
            fontSize: "{typography.bodyMd.fontSize}",
          },
          card: {
            backgroundColor: "{colors.surface}",
            rounded: "{rounded.md}",
            border: "1px solid {colors.border}",
            padding: "{spacing.md}",
          },
        },
        verified: true,
        extractedAt: "2026-10-29T10:00:00.000Z",
        wcagContrast: {
          primaryOnNeutral: 14.8,
          tertiaryOnNeutral: 4.65,
          onTertiaryOnTertiary: 4.62,
          isCompliantAA: true,
          contrastStatus: "AAA",
        },
        designMd: `---
name: GitHub
version: alpha
colors:
  primary: "#1F2328"
  secondary: "#656D76"
  tertiary: "#1F883D"
  neutral: "#FFFFFF"
  surface: "#F6F8FA"
  surface-variant: "#EAEEF2"
  accent: "#0969DA"
  on-primary: "#FFFFFF"
  on-tertiary: "#FFFFFF"
  border: "#D0D7DE"
typography:
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
  monoFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"
  h1:
    fontFamily: "{typography.fontFamily}"
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.25
  h2:
    fontFamily: "{typography.fontFamily}"
    fontSize: 1.75rem
    fontWeight: 600
    lineHeight: 1.3
  body-md:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 4px
  md: 6px
  lg: 8px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.md}"
    padding: "5px 16px"
    fontSize: "{typography.body-md.fontSize}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
    border: "1px solid {colors.border}"
---

## Overview

O Primer Design System do GitHub foi projetado para sustentar a maior comunidade de desenvolvedores do planeta, equilibrando legibilidade de código, organização em abas densas e alta acessibilidade.

## Colors

- **Primary (\`#1F2328\`):** Cinza ardósia escuro para textos de repositório e cabeçalhos.
- **Secondary (\`#656D76\`):** Cinza médio neutro para contadores e datas de commits.
- **Tertiary (\`#1F883D\`):** Verde clássico GitHub para merge de pull requests e clonagem.
- **Neutral (\`#FFFFFF\`):** Canvas claro padrão.
- **Surface (\`#F6F8FA\`):** Fundo suave de cabeçalhos de tabelas de arquivos e caixas de comentário.
- **Accent (\`#0969DA\`):** Azul Primer para links de navegação.

## Typography

Hierarquia compacta baseada em \`14px\` (\`0.875rem\`) para body, facilitando leitura contínua de diffs de código.

## Layout

Contêineres com limite de 1280px e bordas estruturais de 1px (\`#D0D7DE\`).

## Elevation & Depth

Sombras extremamente leves em menus suspensos (\`box-shadow: 0 8px 24px rgba(140, 149, 159, 0.2)\`).

## Shapes

Cantos contidos de 6px (\`{rounded.md}\`) para botões e inputs.

## Components

### Botão Primário (\`button-primary\`)
Fundo verde \`#1F883D\`, texto branco, cantos em 6px e borda superior com sutil relevo.

### Card de Repositório
Fundo \`#F6F8FA\`, contorno fino de 1px e padding de 16px.

## Do's and Don'ts

### Do's:
- Utilize fontes com monoespaçamento para hashes SHA, nomes de branches e comandos git.
- Mantenha bordas nítidas de 1px entre blocos de conteúdo.

### Don'ts:
- Evite cantos arredondados excessivos (> 12px) que quebrem a densidade do Primer.`,
      },

      // 8. Raycast
      {
        id: "raycast",
        name: "Raycast",
        domain: "raycast.com",
        category: "Launcher & Developer Productivity",
        description: "Estética cyberpunk polida para desenvolvedores no macOS/Windows: fundo obsidian ultra escuro, micro-interfaces velozes e vermelho-coral vibrante característico.",
        logoUrl: "https://cdn.simpleicons.org/raycast/FF6363",
        screenshotUrl: "/previews/raycast.png",
        colors: {
          primary: "#FFFFFF",
          secondary: "#959DA6",
          tertiary: "#FF6363",
          neutral: "#0D0D11",
          surface: "#191921",
          accent: "#FF6363",
          border: "#282833",
          onPrimary: "#0D0D11",
          onTertiary: "#FFFFFF",
          surfaceVariant: "#22222E",
        },
        typography: {
          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
          headingFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
          monoFamily: "'JetBrains Mono', Menlo, monospace",
          h1: { fontSize: "3rem", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em" },
          h2: { fontSize: "2rem", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" },
          h3: { fontSize: "1.375rem", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.01em" },
          bodyMd: { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.5 },
          bodySm: { fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.4 },
          labelCaps: { fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em" },
        },
        spacing: {
          xs: "4px",
          sm: "8px",
          md: "14px",
          lg: "20px",
          xl: "28px",
          "2xl": "44px",
        },
        rounded: {
          sm: "6px",
          md: "10px",
          lg: "16px",
          xl: "22px",
          full: "9999px",
        },
        components: {
          buttonPrimary: {
            backgroundColor: "{colors.tertiary}",
            textColor: "{colors.onTertiary}",
            rounded: "{rounded.md}",
            padding: "8px 18px",
            fontSize: "{typography.bodyMd.fontSize}",
          },
          card: {
            backgroundColor: "{colors.surface}",
            rounded: "{rounded.lg}",
            border: "1px solid {colors.border}",
            padding: "{spacing.lg}",
          },
        },
        verified: true,
        extractedAt: "2026-10-29T10:00:00.000Z",
        wcagContrast: {
          primaryOnNeutral: 18.1,
          tertiaryOnNeutral: 4.82,
          onTertiaryOnTertiary: 4.51,
          isCompliantAA: true,
          contrastStatus: "AAA",
        },
        designMd: `---
name: Raycast
version: alpha
colors:
  primary: "#FFFFFF"
  secondary: "#959DA6"
  tertiary: "#FF6363"
  neutral: "#0D0D11"
  surface: "#191921"
  surface-variant: "#22222E"
  accent: "#FF6363"
  on-primary: "#0D0D11"
  on-tertiary: "#FFFFFF"
  border: "#282833"
typography:
  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
  monoFamily: "'JetBrains Mono', Menlo, monospace"
  h1:
    fontFamily: "{typography.fontFamily}"
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.15
  h2:
    fontFamily: "{typography.fontFamily}"
    fontSize: 2rem
    fontWeight: 600
    lineHeight: 1.25
  body-md:
    fontFamily: "{typography.fontFamily}"
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 6px
  md: 10px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 14px
  lg: 20px
  xl: 28px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.md}"
    padding: "8px 18px"
    fontSize: "{typography.body-md.fontSize}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border}"
---

## Overview

O Raycast reinventou a produtividade para entusiastas de teclado no desktop. Seu design combina a escuridão espacial de um launcher moderno com o vermelho coral vibrante (\`#FF6363\`) que guia os olhos com precisão instantânea.

## Colors

- **Primary (\`#FFFFFF\`):** Branco puro para termos pesquisados e atalhos ativos.
- **Secondary (\`#959DA6\`):** Cinza neutro suave para dicas de extensão e atalhos de navegação.
- **Tertiary (\`#FF6363\`):** Coral avermelhado assinatura do Raycast para seleção de comandos e botões de ação.
- **Neutral (\`#0D0D11\`):** Fundo obsidiana com leve tom arroxeado frio.
- **Surface (\`#191921\`):** Janelas do launcher e cards de extensões.

## Typography

Utiliza **Inter** com numerais monospace e visualização rápida de teclas (\`⌘ K\`, \`Enter\`).

## Layout

Interface compacta centrada na caixa de diálogo de 750px de largura com foco total em rapidez de interação.

## Elevation & Depth

Janela suspensa com sombra profunda e difusa (\`box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4)\`) que destaca o launcher sobre qualquer plano de fundo do sistema.

## Shapes

Cantos arredondados calibrados em 10px (\`{rounded.md}\`) e 16px (\`{rounded.lg}\`).

## Components

### Botão Primário (\`button-primary\`)
Fundo coral (\`#FF6363\`), cantos em 10px, texto branco e contraste estrito.

### Linha de Comando / Item do Launcher
Superfície \`#191921\` que ganha contorno e iluminação suave ao receber foco pelo teclado.

## Do's and Don'ts

### Do's:
- Indique atalhos de teclado de forma visual em quase todas as ações.
- Utilize o coral \`#FF6363\` como gatilho de execução rápida.

### Don'ts:
- Não use sombras esbranquiçadas ou fundos brancos opacos.`,
      },
    ];

    for (const comp of defaultCompanies) {
      this.companies.set(comp.id, comp);
    }
  }

  public getAllCompanies(category?: string, search?: string): Company[] {
    let list = Array.from(this.companies.values());

    if (category && category.trim() !== "" && category.toLowerCase() !== "all") {
      const catLower = category.toLowerCase();
      list = list.filter((c) => c.category.toLowerCase().includes(catLower));
    }

    if (search && search.trim() !== "") {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    return list;
  }

  public getCompanyById(id: string): Company | undefined {
    return this.companies.get(id);
  }

  public addCompany(company: Company): Company {
    if (!company.id) {
      company.id = company.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    }
    this.companies.set(company.id, company);
    return company;
  }

  public hasCompany(id: string): boolean {
    return this.companies.has(id);
  }

  public getCategories(): string[] {
    const set = new Set<string>();
    for (const c of this.companies.values()) {
      set.add(c.category);
    }
    return Array.from(set);
  }
}

export const companiesStore = new CompaniesStore();
