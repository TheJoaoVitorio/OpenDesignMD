export type Category = 
  | 'All'
  | 'DevTools & AI'
  | 'Fintech'
  | 'Design'
  | 'SaaS'
  | 'Cloud';

export interface ColorToken {
  name: string;
  hex: string;
  role: 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'surface' | 'surface-variant' | 'accent' | 'border';
  description?: string;
  contrastOnWhite?: string;
  contrastOnBlack?: string;
  isDark?: boolean;
}

export interface TypographyToken {
  fontFamily: string;
  monoFamily?: string;
  h1: { fontSize: string; fontWeight: number | string; lineHeight: number | string; letterSpacing?: string };
  h2: { fontSize: string; fontWeight: number | string; lineHeight: number | string; letterSpacing?: string };
  h3?: { fontSize: string; fontWeight: number | string; lineHeight: number | string; letterSpacing?: string };
  bodyLg?: { fontSize: string; fontWeight: number | string; lineHeight: number | string };
  bodyMd: { fontSize: string; fontWeight: number | string; lineHeight: number | string };
  bodySm?: { fontSize: string; fontWeight: number | string; lineHeight: number | string };
  labelCaps?: { fontSize: string; fontWeight: number | string; letterSpacing?: string };
}

export interface ComponentToken {
  name: string;
  backgroundColor?: string;
  textColor?: string;
  border?: string;
  rounded?: string;
  padding?: string;
  fontSize?: string;
  fontWeight?: string | number;
}

export interface DesignSystem {
  name: string;
  version: string;
  url: string;
  colors: Record<string, string>;
  typography: {
    fontFamily: string;
    monoFamily?: string;
    [key: string]: any;
  };
  rounded: Record<string, string>;
  spacing: Record<string, string>;
  components: Record<string, ComponentToken>;
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  url: string;
  tagline: string;
  category: 'DevTools & AI' | 'Fintech' | 'Design' | 'SaaS' | 'Cloud';
  tags: string[];
  logoSvg?: string;
  accentColor: string;
  heroGradient: string;
  previewBg: string;
  screenshotUrl?: string;
  colorTokens: ColorToken[];
  typography: TypographyToken;
  designMdContent: string;
  rawYaml: string;
  lastUpdated: string;
  verifiedStandard: boolean;
  metrics: {
    contrastScore: string;
    tokenCount: number;
    agentReadyScore: number;
  };
}

export interface ExtractionStep {
  id: number;
  label: string;
  detail: string;
  status: 'pending' | 'running' | 'completed' | 'error';
}

export interface ExtractionResult {
  url: string;
  name: string;
  timestamp: string;
  designMd: string;
  yamlTokens: string;
  tailwindV4Theme: string;
  colors: ColorToken[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'free' | 'pro' | 'enterprise';
}
