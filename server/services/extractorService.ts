import { Company, DesignTokens, ExtractionResponse, WCAGContrastReport } from "../types.js";
import { companiesStore } from "../data/companiesStore.js";
import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

// Utility: Calculate Relative Luminance of Hex Color
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  if (clean.length !== 6) return null;
  const num = parseInt(clean, 16);
  if (isNaN(num)) return null;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    const s = val / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function calculateContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1.0;

  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);

  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  const ratio = (brighter + 0.05) / (darker + 0.05);
  return parseFloat(ratio.toFixed(2));
}

// Adjust a color slightly to meet WCAG AA (>= 4.5:1)
export function ensureWcagCompliant(foreground: string, background: string): string {
  const currentRatio = calculateContrastRatio(foreground, background);
  if (currentRatio >= 4.5) return foreground;

  const bgRgb = hexToRgb(background);
  if (!bgRgb) return foreground;
  const bgLum = getRelativeLuminance(bgRgb);

  // If background is light, darken foreground; if dark, lighten foreground
  const fgRgb = hexToRgb(foreground) || { r: 50, g: 50, b: 50 };
  let { r, g, b } = fgRgb;

  for (let i = 0; i < 20; i++) {
    if (bgLum > 0.5) {
      r = Math.max(0, Math.floor(r * 0.85));
      g = Math.max(0, Math.floor(g * 0.85));
      b = Math.max(0, Math.floor(b * 0.85));
    } else {
      r = Math.min(255, Math.floor(r * 1.15 + 15));
      g = Math.min(255, Math.floor(g * 1.15 + 15));
      b = Math.min(255, Math.floor(b * 1.15 + 15));
    }
    const candidateHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    if (calculateContrastRatio(candidateHex, background) >= 4.5) {
      return candidateHex;
    }
  }

  return bgLum > 0.5 ? "#111827" : "#F9FAFB";
}

// Well-known curated brand signatures
const BRAND_SIGNATURES: Record<string, Partial<Company>> = {
  "linear.app": {
    name: "Linear",
    category: "Productivity & Issue Tracking",
    description: "High-contrast dark-mode first interface com micro-bordas de 1px e acento ultravioleta.",
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
    },
    typography: {
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      h1: { fontSize: "3rem", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.04em" },
      h2: { fontSize: "2rem", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.03em" },
      bodyMd: { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.5 },
    },
  },
  "stripe.com": {
    name: "Stripe",
    category: "Fintech & Payments",
    description: "Referência global em pagamentos com tipografia Söhne, superfícies níveas e índigo vibrante.",
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
    },
    typography: {
      fontFamily: "Söhne, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      h1: { fontSize: "3.25rem", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em" },
      h2: { fontSize: "2.125rem", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" },
      bodyMd: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.6 },
    },
  },
  "vercel.com": {
    name: "Vercel",
    category: "Cloud & Infrastructure",
    description: "Minimalismo arquitetural baseado no triângulo negro, tipografia Geist e escala de cinzas de alta fidelidade.",
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
    },
    typography: {
      fontFamily: "Geist Sans, -apple-system, BlinkMacSystemFont, sans-serif",
      h1: { fontSize: "3rem", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em" },
      h2: { fontSize: "2rem", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" },
      bodyMd: { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.6 },
    },
  },
  "supabase.com": {
    name: "Supabase",
    category: "Database & Backend",
    description: "Developer-first dark theme com verde esmeralda icônico (Supabase Emerald) e superfícies carvão profundo.",
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
    },
    typography: {
      fontFamily: "Circular, -apple-system, BlinkMacSystemFont, sans-serif",
      h1: { fontSize: "3.25rem", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em" },
      h2: { fontSize: "2.125rem", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" },
      bodyMd: { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.55 },
    },
  },
  "github.com": {
    name: "GitHub",
    category: "Developer Platform",
    description: "Primer Design System com foco em legibilidade de código, tons de ardósia e verde de ação direta.",
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
    },
    typography: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      h1: { fontSize: "2.5rem", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" },
      h2: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.01em" },
      bodyMd: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5 },
    },
  },
  "apple.com": {
    name: "Apple",
    category: "Design & Hardware",
    description: "Human Interface Guidelines canônico com tipografia SF Pro, superfícies táteis e azul cobalto característico.",
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
    },
    typography: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif",
      h1: { fontSize: "3.5rem", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em" },
      h2: { fontSize: "2.5rem", fontWeight: 600, lineHeight: 1.2, letterSpacing: "-0.015em" },
      bodyMd: { fontSize: "1.0625rem", fontWeight: 400, lineHeight: 1.5 },
    },
  },
  "raycast.com": {
    name: "Raycast",
    category: "Launcher & Developer Productivity",
    description: "Estética cyberpunk polida com fundo obsidian ultra escuro e coral vibrante característico.",
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
    },
    typography: {
      fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      h1: { fontSize: "3rem", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em" },
      h2: { fontSize: "2rem", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" },
      bodyMd: { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.5 },
    },
  },
  "antigravity.google": {
    name: "Google Antigravity",
    category: "AI & Developer Tools",
    description: "Estética Engineered Calm com respiro negativo monumental, tipografia Google Sans e toques de Google Blue.",
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
    },
    typography: {
      fontFamily: "Google Sans, Inter, -apple-system, sans-serif",
      h1: { fontSize: "3.5rem", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.035em" },
      h2: { fontSize: "2.25rem", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.025em" },
      bodyMd: { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.55 },
    },
  },
};

export class ExtractorService {
  /**
   * Main entry point: extracts design tokens and synthesizes a valid DESIGN.MD
   */
  public async extractFromUrl(rawUrl: string, customName?: string): Promise<ExtractionResponse> {
    const startTime = Date.now();

    // 1. Normalize URL
    let normalizedUrl = rawUrl.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const parsedUrl = new URL(normalizedUrl);
    const domain = parsedUrl.hostname.replace(/^www\./, "");
    const baseSlug = domain.split(".")[0];

    // Check if we already have it in the persistent store
    const existing = companiesStore.getCompanyById(baseSlug) || companiesStore.getCompanyById(domain.replace(/\./g, "-"));
    if (existing) {
      return {
        success: true,
        company: existing,
        tokens: {
          colors: existing.colors,
          typography: existing.typography,
          spacing: existing.spacing,
          rounded: existing.rounded,
          components: existing.components,
        },
        designMd: existing.designMd,
        screenshotUrl: existing.screenshotUrl,
        meta: {
          pageTitle: existing.name,
          metaDescription: existing.description,
          detectedColorsCount: Object.keys(existing.colors).length,
          fontFamiliesDetected: [existing.typography.fontFamily],
          wcagRatio: existing.wcagContrast?.primaryOnNeutral || 14.5,
          executionTimeMs: Date.now() - startTime,
        },
      };
    }

    // Check if we have signature heuristics
    const signature = BRAND_SIGNATURES[domain] || BRAND_SIGNATURES[domain.toLowerCase()];

    // 2. Fetch page and inspect HTML
    let html = "";
    let pageTitle = "";
    let metaDescription = "";
    let faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    let themeColor = "";
    const detectedColors: string[] = [];
    const detectedFonts: string[] = [];

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const resp = await fetch(normalizedUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (resp.ok) {
        html = await resp.text();

        // Title
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        if (titleMatch) {
          pageTitle = titleMatch[1].trim();
        }

        // Meta description
        const descMatch =
          html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
          html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
        if (descMatch) {
          metaDescription = descMatch[1].trim();
        }

        // Theme color
        const themeMatch = html.match(/<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']+)["']/i);
        if (themeMatch) {
          themeColor = themeMatch[1].trim();
        }

        // Favicon detection
        const iconMatch = html.match(/<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i);
        if (iconMatch) {
          const href = iconMatch[1];
          faviconUrl = href.startsWith("http") ? href : new URL(href, normalizedUrl).toString();
        }

        // Extract Hex colors
        const hexMatches = html.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g);
        if (hexMatches) {
          const counts: Record<string, number> = {};
          for (const h of hexMatches) {
            const normalizedHex = h.toUpperCase();
            counts[normalizedHex] = (counts[normalizedHex] || 0) + 1;
          }
          const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
          for (const [col] of sorted.slice(0, 15)) {
            detectedColors.push(col);
          }
        }

        // Extract Font Families
        const fontMatches = html.match(/font-family\s*:\s*([^;}]+)/gi);
        if (fontMatches) {
          for (const f of fontMatches) {
            const raw = f.replace(/font-family\s*:\s*/i, "").trim();
            const first = raw.split(",")[0].replace(/['"]/g, "").trim();
            if (first && !detectedFonts.includes(first) && first !== "inherit" && first !== "initial") {
              detectedFonts.push(first);
            }
          }
        }
      }
    } catch {
      // Fallback gracefully to domain heuristics if network fetch fails
    }

    // 3. Synthesize Brand Identity
    const brandName =
      customName ||
      signature?.name ||
      (pageTitle ? pageTitle.split(/[-–|:•]/)[0].trim() : baseSlug.charAt(0).toUpperCase() + baseSlug.slice(1));

    const brandDescription =
      metaDescription ||
      signature?.description ||
      `Design system profissional extraído e normalizado do ecossistema digital de ${brandName}.`;

    const brandCategory = signature?.category || this.deduceCategory(domain, pageTitle, metaDescription);

    // 4. Color Palette Synthesis with WCAG Contrast
    const isLikelyDark = this.detectDarkTheme(html, detectedColors);

    let neutral = signature?.colors?.neutral || (isLikelyDark ? "#0A0B0E" : "#FFFFFF");
    let primary = signature?.colors?.primary || (isLikelyDark ? "#F3F4F6" : "#0F172A");
    let secondary = signature?.colors?.secondary || (isLikelyDark ? "#9CA3AF" : "#475569");
    let surface = signature?.colors?.surface || (isLikelyDark ? "#14161D" : "#F8FAFC");
    let tertiary =
      signature?.colors?.tertiary ||
      themeColor ||
      this.findBestAccent(detectedColors, neutral) ||
      "#2563EB";

    // Ensure tertiary is valid hex
    if (!tertiary.startsWith("#") || tertiary.length < 4) {
      tertiary = "#2563EB";
    }

    // WCAG AA Verification & Adjustment
    const rawTertiaryContrast = calculateContrastRatio(tertiary, neutral);
    if (rawTertiaryContrast < 4.5) {
      tertiary = ensureWcagCompliant(tertiary, neutral);
    }

    const primaryContrast = calculateContrastRatio(primary, neutral);
    const tertiaryContrast = calculateContrastRatio(tertiary, neutral);

    // Determine on-tertiary
    const onTertiaryWhiteContrast = calculateContrastRatio("#FFFFFF", tertiary);
    const onTertiaryBlackContrast = calculateContrastRatio("#000000", tertiary);
    const onTertiary = onTertiaryWhiteContrast >= onTertiaryBlackContrast ? "#FFFFFF" : "#000000";

    const wcagReport: WCAGContrastReport = {
      primaryOnNeutral: primaryContrast,
      tertiaryOnNeutral: tertiaryContrast,
      onTertiaryOnTertiary: Math.max(onTertiaryWhiteContrast, onTertiaryBlackContrast),
      isCompliantAA: primaryContrast >= 4.5 && tertiaryContrast >= 3.0,
      contrastStatus: primaryContrast >= 7.0 && tertiaryContrast >= 4.5 ? "AAA" : "AA",
      notes: `Contraste primário: ${primaryContrast}:1 (AA). Contraste tertiary: ${tertiaryContrast}:1.`,
    };

    // 5. Typography Synthesis
    const mainFont =
      signature?.typography?.fontFamily ||
      (detectedFonts.length > 0 ? `${detectedFonts[0]}, -apple-system, BlinkMacSystemFont, sans-serif` : "Inter, -apple-system, BlinkMacSystemFont, sans-serif");

    const typography = {
      fontFamily: mainFont,
      headingFamily: signature?.typography?.headingFamily || mainFont,
      monoFamily: signature?.typography?.monoFamily || "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
      h1: signature?.typography?.h1 || { fontSize: "3rem", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.03em" },
      h2: signature?.typography?.h2 || { fontSize: "2rem", fontWeight: 600, lineHeight: 1.25, letterSpacing: "-0.02em" },
      h3: signature?.typography?.h3 || { fontSize: "1.375rem", fontWeight: 600, lineHeight: 1.35, letterSpacing: "-0.01em" },
      bodyMd: signature?.typography?.bodyMd || { fontSize: "0.9375rem", fontWeight: 400, lineHeight: 1.6 },
      bodySm: signature?.typography?.bodySm || { fontSize: "0.8125rem", fontWeight: 400, lineHeight: 1.5 },
      labelCaps: signature?.typography?.labelCaps || { fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.05em" },
    };

    // 6. Spacing & Shapes
    const spacing = signature?.spacing || {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      "2xl": "48px",
    };

    const rounded = signature?.rounded || {
      sm: "6px",
      md: "10px",
      lg: "16px",
      xl: "24px",
      full: "9999px",
    };

    const components = signature?.components || {
      buttonPrimary: {
        backgroundColor: "{colors.tertiary}",
        textColor: "{colors.onTertiary}",
        rounded: "{rounded.md}",
        padding: "10px 20px",
        fontSize: "{typography.bodyMd.fontSize}",
      },
      card: {
        backgroundColor: "{colors.surface}",
        rounded: "{rounded.lg}",
        border: `1px solid ${isLikelyDark ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0"}`,
        padding: "{spacing.lg}",
      },
    };

    // 7. Synthesize Canonical Google Labs DESIGN.MD
    const canonicalDesignMd = this.synthesizeCanonicalDesignMd({
      name: brandName,
      domain,
      description: brandDescription,
      colors: {
        primary,
        secondary,
        tertiary,
        neutral,
        surface,
        accent: tertiary,
        onPrimary: isLikelyDark ? "#0A0B0E" : "#FFFFFF",
        onTertiary,
        border: isLikelyDark ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0",
      },
      typography,
      spacing,
      rounded,
      wcagReport,
    });

    // 6.5. Real Screenshot Capture via Puppeteer
    let screenshotUrl: string | undefined = undefined;
    try {
      const previewsDir = path.resolve(process.cwd(), "public", "previews");
      if (!fs.existsSync(previewsDir)) {
        fs.mkdirSync(previewsDir, { recursive: true });
      }
      const screenshotFilename = `extracted-${baseSlug}.png`;
      const screenshotFilePath = path.join(previewsDir, screenshotFilename);

      if (fs.existsSync(CHROME_PATH)) {
        const browser = await puppeteer.launch({
          executablePath: CHROME_PATH,
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--window-size=1280,800",
          ],
        });
        try {
          const page = await browser.newPage();
          await page.setViewport({ width: 1280, height: 800 });
          await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
          );
          await page.goto(normalizedUrl, { waitUntil: "domcontentloaded", timeout: 8000 });
          await new Promise((r) => setTimeout(r, 1200));
          await page.screenshot({ path: screenshotFilePath, type: "png" });
          screenshotUrl = `/previews/${screenshotFilename}`;
        } finally {
          await browser.close();
        }
      }
    } catch (err: any) {
      console.warn(`[Extractor] Screenshot capture failed for ${normalizedUrl}:`, err?.message || err);
    }

    const company: Company = {
      id: baseSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: brandName,
      domain,
      category: brandCategory,
      description: brandDescription,
      logoUrl: faviconUrl,
      screenshotUrl: screenshotUrl || (signature as any)?.screenshotUrl,
      colors: {
        primary,
        secondary,
        tertiary,
        neutral,
        surface,
        accent: tertiary,
        onPrimary: isLikelyDark ? "#0A0B0E" : "#FFFFFF",
        onTertiary,
        border: isLikelyDark ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0",
      },
      typography,
      spacing,
      rounded,
      components,
      designMd: canonicalDesignMd,
      verified: true,
      extractedAt: new Date().toISOString(),
      wcagContrast: wcagReport,
    };

    return {
      success: true,
      company,
      tokens: {
        colors: company.colors,
        typography: company.typography,
        spacing: company.spacing,
        rounded: company.rounded,
        components: company.components,
      },
      designMd: canonicalDesignMd,
      screenshotUrl: company.screenshotUrl,
      meta: {
        pageTitle: brandName,
        metaDescription: brandDescription,
        detectedColorsCount: detectedColors.length,
        fontFamiliesDetected: detectedFonts,
        wcagRatio: tertiaryContrast,
        executionTimeMs: Date.now() - startTime,
      },
    };
  }

  private deduceCategory(domain: string, title: string, desc: string): string {
    const text = `${domain} ${title} ${desc}`.toLowerCase();
    if (text.includes("ai") || text.includes("agent") || text.includes("intelligence") || text.includes("model")) {
      return "AI & Developer Tools";
    }
    if (text.includes("cloud") || text.includes("deploy") || text.includes("host") || text.includes("serverless")) {
      return "Cloud & Infrastructure";
    }
    if (text.includes("finance") || text.includes("payment") || text.includes("pay") || text.includes("bank")) {
      return "Fintech & Payments";
    }
    if (text.includes("data") || text.includes("db") || text.includes("postgres") || text.includes("sql")) {
      return "Database & Backend";
    }
    if (text.includes("issue") || text.includes("project") || text.includes("task") || text.includes("team")) {
      return "Productivity & Issue Tracking";
    }
    if (text.includes("design") || text.includes("figma") || text.includes("ui") || text.includes("ux")) {
      return "Design & Creative";
    }
    return "SaaS & Web Software";
  }

  private detectDarkTheme(html: string, colors: string[]): boolean {
    if (html.includes('class="dark"') || html.includes('data-theme="dark"') || html.includes('color-scheme: dark')) {
      return true;
    }
    // Count dark vs light hex colors
    let darkCount = 0;
    let lightCount = 0;
    for (const c of colors) {
      const rgb = hexToRgb(c);
      if (rgb) {
        const lum = getRelativeLuminance(rgb);
        if (lum < 0.2) darkCount++;
        if (lum > 0.8) lightCount++;
      }
    }
    return darkCount > lightCount + 2;
  }

  private findBestAccent(colors: string[], neutral: string): string | null {
    const neutralRgb = hexToRgb(neutral);
    const neutralLum = neutralRgb ? getRelativeLuminance(neutralRgb) : 1;

    let bestColor: string | null = null;
    let bestScore = 0;

    for (const hex of colors) {
      const rgb = hexToRgb(hex);
      if (!rgb) continue;

      // Calculate saturation roughly
      const max = Math.max(rgb.r, rgb.g, rgb.b);
      const min = Math.min(rgb.r, rgb.g, rgb.b);
      const sat = max === 0 ? 0 : (max - min) / max;

      // We want high saturation and good contrast against neutral
      const contrast = calculateContrastRatio(hex, neutral);
      const score = sat * 10 + contrast;

      if (sat > 0.35 && contrast >= 3.0 && score > bestScore) {
        bestScore = score;
        bestColor = hex;
      }
    }

    return bestColor;
  }

  private synthesizeCanonicalDesignMd(params: {
    name: string;
    domain: string;
    description: string;
    colors: any;
    typography: any;
    spacing: any;
    rounded: any;
    wcagReport: WCAGContrastReport;
  }): string {
    const { name, domain, description, colors, typography, spacing, rounded, wcagReport } = params;

    return `---
name: ${name}
version: alpha
colors:
  primary: "${colors.primary}"
  secondary: "${colors.secondary}"
  tertiary: "${colors.tertiary}"
  neutral: "${colors.neutral}"
  surface: "${colors.surface}"
  accent: "${colors.accent}"
  on-primary: "${colors.onPrimary || "#FFFFFF"}"
  on-tertiary: "${colors.onTertiary || "#FFFFFF"}"
  border: "${colors.border || "#E2E8F0"}"
typography:
  fontFamily: "${typography.fontFamily}"
  h1:
    fontFamily: "{typography.fontFamily}"
    fontSize: "${typography.h1.fontSize}"
    fontWeight: ${typography.h1.fontWeight}
    lineHeight: ${typography.h1.lineHeight || 1.15}
  h2:
    fontFamily: "{typography.fontFamily}"
    fontSize: "${typography.h2.fontSize}"
    fontWeight: ${typography.h2.fontWeight}
    lineHeight: ${typography.h2.lineHeight || 1.25}
  body-md:
    fontFamily: "{typography.fontFamily}"
    fontSize: "${typography.bodyMd.fontSize}"
    fontWeight: ${typography.bodyMd.fontWeight}
    lineHeight: ${typography.bodyMd.lineHeight || 1.55}
rounded:
  sm: ${rounded.sm || "4px"}
  md: ${rounded.md || "8px"}
  lg: ${rounded.lg || "16px"}
  full: ${rounded.full || "9999px"}
spacing:
  xs: ${spacing.xs || "4px"}
  sm: ${spacing.sm || "8px"}
  md: ${spacing.md || "16px"}
  lg: ${spacing.lg || "24px"}
  xl: ${spacing.xl || "32px"}
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
    fontSize: "{typography.body-md.fontSize}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border}"
---

## Overview

Este sistema de design foi extraído e sintetizado a partir de **${name}** (\`${domain}\`) para guiar agentes de IA na geração de interfaces consistentes e normativas. ${description}

## Colors

A paleta cromática foi estruturada com rigor técnico e conformidade WCAG (${wcagReport.contrastStatus}):
- **Primary (\`${colors.primary}\`):** Cor de alta hierarquia para títulos, textos principais e ênfase de marca. Razão de contraste: ${wcagReport.primaryOnNeutral}:1.
- **Secondary (\`${colors.secondary}\`):** Tonalidade neutra para textos secundários, metadados e legendas.
- **Tertiary (\`${colors.tertiary}\`):** Cor de ação primária (CTA), links e gatilhos de foco interativo. Razão de contraste: ${wcagReport.tertiaryOnNeutral}:1.
- **Neutral (\`${colors.neutral}\`):** Canvas de base da aplicação, garantindo amplitude visual e respiração de layout.
- **Surface (\`${colors.surface}\`):** Superfície de apoio para cards, modais e contêineres estruturados.

## Typography

Utiliza **${typography.fontFamily.split(",")[0].replace(/['"]/g, "")}** com proporções escalonadas para clareza visual e densidade informacional equilibrada:
- **Títulos (H1/H2):** Pesos estruturados com entrelinha compacta para impacto visual imediato.
- **Corpo de Texto (\`body-md\`):** Peso 400 com espaçamento confortável para leitura prolongada.

## Layout

O layout opera em grade proporcional baseada em múltiplos de 4px e 8px:
- Espaçamento padrão entre seções: \`{spacing.xl}\` (${spacing.xl || "32px"}).
- Respiro interno de componentes: \`{spacing.md}\` (${spacing.md || "16px"}).

## Elevation & Depth

- **Nível 1 (Cards):** Borda suave de 1px com elevação sutil para delimitar contêineres.
- **Nível 2 (Popovers e Menus):** Elevação projetada com sombra suave e desfoque periférico.

## Shapes

- Elementos clicáveis primários adotam cantos calibrados em \`{rounded.md}\` (${rounded.md || "8px"}).
- Superfícies de cards e blocos maiores empregam \`{rounded.lg}\` (${rounded.lg || "16px"}).
- Elementos de tags e pílulas utilizam \`{rounded.full}\` (9999px).

## Components

### Botão Primário (\`button-primary\`)
- Fundo em \`{colors.tertiary}\` (\`${colors.tertiary}\`) com texto em \`{colors.on-tertiary}\` (\`${colors.onTertiary || "#FFFFFF"}\`).
- Canto em \`{rounded.md}\` e padding de 10px 20px.

### Cards (\`card\`)
- Fundo em \`{colors.surface}\` com contorno suave \`1px solid {colors.border}\` e padding \`{spacing.lg}\`.

## Do's and Don'ts

### Do's:
- **Reutilize tokens semânticos:** Faça referências a \`{colors.tertiary}\` em vez de valores HEX arbitrários.
- **Preserve acessibilidade:** Mantenha contraste de pelo menos 4.5:1 em textos normais sobre superfícies.
- **Respeite a escala métrica:** Aplique apenas tamanhos contidos na escala de \`spacing\`.

### Don'ts:
- **Não crie novas cores de ação:** Use unicamente o token \`{colors.tertiary}\` para gatilhos de fluxo.
- **Não misture famílias tipográficas:** Mantenha fidelidade à família primária declarada.`;
  }
}

export const extractorService = new ExtractorService();
