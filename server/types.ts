export interface DesignColorTokens {
  primary: string;
  secondary: string;
  tertiary: string;
  neutral: string;
  surface: string;
  accent: string;
  border?: string;
  onPrimary?: string;
  onTertiary?: string;
  surfaceVariant?: string;
  [key: string]: string | undefined;
}

export interface TypographyScaleItem {
  fontSize: string;
  fontWeight: number | string;
  lineHeight?: string | number;
  letterSpacing?: string;
  fontFamily?: string;
}

export interface DesignTypographyTokens {
  fontFamily: string;
  headingFamily?: string;
  monoFamily?: string;
  h1: TypographyScaleItem;
  h2: TypographyScaleItem;
  h3?: TypographyScaleItem;
  bodyMd: TypographyScaleItem;
  bodySm?: TypographyScaleItem;
  labelCaps?: TypographyScaleItem;
  [key: string]: any;
}

export interface DesignTokens {
  colors: DesignColorTokens;
  typography: DesignTypographyTokens;
  spacing: Record<string, string>;
  rounded: Record<string, string>;
  components?: Record<string, any>;
}

export interface WCAGContrastReport {
  primaryOnNeutral: number;
  tertiaryOnNeutral: number;
  onTertiaryOnTertiary: number;
  isCompliantAA: boolean;
  contrastStatus: "AAA" | "AA" | "Fail";
  notes?: string;
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  category: string;
  description: string;
  logoUrl: string;
  colors: DesignColorTokens;
  typography: DesignTypographyTokens;
  spacing: Record<string, string>;
  rounded: Record<string, string>;
  designMd: string;
  screenshotUrl?: string;
  components?: Record<string, any>;
  verified?: boolean;
  extractedAt?: string;
  wcagContrast?: WCAGContrastReport;
}

export interface ExtractionRequest {
  url: string;
  customName?: string;
  category?: string;
}

export interface ExtractionResponse {
  success: boolean;
  company: Company;
  tokens: DesignTokens;
  designMd: string;
  screenshotUrl?: string;
  meta: {
    pageTitle?: string;
    metaDescription?: string;
    detectedColorsCount: number;
    fontFamiliesDetected: string[];
    wcagRatio: number;
    executionTimeMs: number;
  };
}

export type ExportFormat = "tailwind-v4" | "tailwind-v3" | "dtcg" | "design-md";
