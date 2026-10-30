import { Company, DesignTokens, ExtractionResponse, WCAGContrastReport } from "../types.js";
import { companiesStore } from "../data/companiesStore.js";
import { aiService } from "./aiService.js";
import { impeccableService } from "./impeccableService.js";
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

interface LiveDomExtractionData {
  title: string;
  metaDescription?: string;
  pageBg: string;
  pageColor: string;
  fontFamily: string;
  h1Data?: {
    tag: string;
    fontSize: string;
    fontWeight: string | number;
    lineHeight?: string;
    letterSpacing?: string;
    fontFamily: string;
    color: string;
  } | null;
  h2Data?: {
    tag: string;
    fontSize: string;
    fontWeight: string | number;
    lineHeight?: string;
    letterSpacing?: string;
    fontFamily: string;
    color: string;
  } | null;
  primaryButton?: {
    bg: string;
    textCol: string;
    radius: string;
    pad: string;
    font: string;
    text: string;
  } | null;
  cardSample?: {
    bg: string;
    radius: string;
    borderColor: string;
    pad: string;
  } | null;
  topColors: string[];
  topAccents: string[];
}

export class ExtractorService {
  /**
   * Main entry point: extracts real design tokens and synthesizes a valid DESIGN.MD
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

    // 2. Perform Real Live Browser DOM Extraction with Puppeteer
    let liveData: LiveDomExtractionData | null = null;
    let screenshotUrl: string | undefined = undefined;

    const previewsDir = path.resolve(process.cwd(), "public", "previews");
    if (!fs.existsSync(previewsDir)) {
      fs.mkdirSync(previewsDir, { recursive: true });
    }
    const screenshotFilename = `extracted-${baseSlug}.png`;
    const screenshotFilePath = path.join(previewsDir, screenshotFilename);

    if (fs.existsSync(CHROME_PATH)) {
      try {
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

          await page.goto(normalizedUrl, { waitUntil: "domcontentloaded", timeout: 15000 });
          await new Promise((r) => setTimeout(r, 1800));

          // Run DOM extraction directly in browser context
          liveData = await page.evaluate(`
            (() => {
              const rgbToHex = (rgbStr) => {
                if (!rgbStr || rgbStr === 'transparent' || rgbStr.startsWith('rgba(0, 0, 0, 0)')) return null;
                const match = rgbStr.match(/\\d+/g);
                if (!match || match.length < 3) return null;
                const r = parseInt(match[0], 10);
                const g = parseInt(match[1], 10);
                const b = parseInt(match[2], 10);
                return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
              };

              const isChromatic = (hex) => {
                if (!hex) return false;
                const match = hex.match(/[0-9a-f]{2}/gi);
                if (!match || match.length < 3) return false;
                const [r, g, b] = match.map(x => parseInt(x, 16));
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                return (max - min) > 28;
              };

              const bodyStyle = window.getComputedStyle(document.body);
              const htmlStyle = window.getComputedStyle(document.documentElement);
              const pageBg = rgbToHex(bodyStyle.backgroundColor) || rgbToHex(htmlStyle.backgroundColor) || '#FFFFFF';
              const pageColor = rgbToHex(bodyStyle.color) || '#111827';
              const fontFamily = bodyStyle.fontFamily || '-apple-system, BlinkMacSystemFont, sans-serif';

              // Meta description
              const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') ||
                               document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';

              // Headings
              const h1 = document.querySelector('h1') || document.querySelector('h2');
              let h1Data = null;
              if (h1) {
                const s = window.getComputedStyle(h1);
                h1Data = {
                  tag: h1.tagName.toLowerCase(),
                  fontSize: s.fontSize,
                  fontWeight: s.fontWeight,
                  lineHeight: s.lineHeight,
                  letterSpacing: s.letterSpacing,
                  fontFamily: s.fontFamily,
                  color: rgbToHex(s.color) || pageColor
                };
              }

              const h2 = document.querySelector('h2') || document.querySelector('h3');
              let h2Data = null;
              if (h2) {
                const s = window.getComputedStyle(h2);
                h2Data = {
                  tag: h2.tagName.toLowerCase(),
                  fontSize: s.fontSize,
                  fontWeight: s.fontWeight,
                  lineHeight: s.lineHeight,
                  letterSpacing: s.letterSpacing,
                  fontFamily: s.fontFamily,
                  color: rgbToHex(s.color) || pageColor
                };
              }

              // Buttons
              const buttons = Array.from(document.querySelectorAll('button, a[role="button"], input[type="submit"], [class*="btn"], [class*="button"]'))
                .filter(el => {
                  const rect = el.getBoundingClientRect();
                  return rect.width > 20 && rect.height > 20 && window.getComputedStyle(el).display !== 'none';
                });

              let primaryButton = null;
              const chromaticButtons = [];
              const allButtons = [];

              for (const btn of buttons.slice(0, 30)) {
                const s = window.getComputedStyle(btn);
                const bg = rgbToHex(s.backgroundColor);
                const textCol = rgbToHex(s.color) || '#FFFFFF';
                const radius = s.borderRadius;
                const pad = s.padding;
                const font = s.fontSize;
                if (bg) {
                  const item = { bg, textCol, radius, pad, font, text: btn.innerText ? btn.innerText.trim().slice(0, 30) : '' };
                  allButtons.push(item);
                  if (isChromatic(bg)) {
                    chromaticButtons.push(item);
                  }
                }
              }

              if (chromaticButtons.length > 0) {
                primaryButton = chromaticButtons[0];
              } else if (allButtons.length > 0) {
                primaryButton = allButtons[0];
              }

              // Cards
              const cardEls = Array.from(document.querySelectorAll('article, [class*="card"], [class*="box"], section > div'))
                .filter(el => {
                  const rect = el.getBoundingClientRect();
                  return rect.width > 120 && rect.height > 80 && window.getComputedStyle(el).display !== 'none';
                });

              let cardSample = null;
              for (const c of cardEls.slice(0, 15)) {
                const s = window.getComputedStyle(c);
                const bg = rgbToHex(s.backgroundColor);
                const radius = s.borderRadius;
                const borderColor = rgbToHex(s.borderColor) || 'rgba(0, 0, 0, 0.08)';
                const pad = s.padding;
                if (bg && bg !== pageBg) {
                  cardSample = { bg, radius, borderColor, pad };
                  break;
                }
              }

              // Palette sampling
              const colorCounts = {};
              const chromaticCounts = {};
              const elements = Array.from(document.querySelectorAll('*')).slice(0, 350);

              for (const el of elements) {
                const s = window.getComputedStyle(el);
                const bg = rgbToHex(s.backgroundColor);
                const c = rgbToHex(s.color);
                if (bg) {
                  colorCounts[bg] = (colorCounts[bg] || 0) + 1;
                  if (isChromatic(bg)) chromaticCounts[bg] = (chromaticCounts[bg] || 0) + 2;
                }
                if (c) {
                  colorCounts[c] = (colorCounts[c] || 0) + 1;
                  if (isChromatic(c)) chromaticCounts[c] = (chromaticCounts[c] || 0) + 1;
                }
              }

              return {
                title: document.title,
                metaDescription: metaDesc,
                pageBg,
                pageColor,
                fontFamily,
                h1Data,
                h2Data,
                primaryButton,
                cardSample,
                topColors: Object.entries(colorCounts).sort((a, b) => b[1] - a[1]).slice(0, 12).map(x => x[0]),
                topAccents: Object.entries(chromaticCounts).sort((a, b) => b[1] - a[1]).slice(0, 6).map(x => x[0])
              };
            })()
          `);

          // Capture screenshot
          await page.screenshot({ path: screenshotFilePath, type: "png" });
          screenshotUrl = `/previews/${screenshotFilename}`;
        } finally {
          await browser.close();
        }
      } catch (err: any) {
        console.warn(`[ExtractorService] Browser inspection notice for ${normalizedUrl}:`, err?.message || err);
      }
    }

    // 3. Fallback to HTTP fetch if live browser extraction did not complete
    let pageTitle = liveData?.title || "";
    let metaDescription = liveData?.metaDescription || "";
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

    if (!liveData) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);
        const resp = await fetch(normalizedUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          },
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (resp.ok) {
          const html = await resp.text();
          const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
          if (titleMatch) pageTitle = titleMatch[1].trim();
          const descMatch =
            html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
            html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
          if (descMatch) metaDescription = descMatch[1].trim();
        }
      } catch {}
    }

    // 4. Derive Exact Brand Identity
    const brandName =
      customName ||
      (pageTitle ? pageTitle.split(/[-–|:•]/)[0].trim() : baseSlug.charAt(0).toUpperCase() + baseSlug.slice(1));

    const brandDescription =
      metaDescription ||
      `Design system profissional extraído e normalizado do ecossistema digital de ${brandName}.`;

    const brandCategory = this.deduceCategory(domain, pageTitle, metaDescription);

    // 5. Derive Real Colors
    const neutralBg = liveData?.pageBg || "#FFFFFF";
    const neutralRgb = hexToRgb(neutralBg) || { r: 255, g: 255, b: 255 };
    const isDark = getRelativeLuminance(neutralRgb) < 0.28;

    const primaryText = liveData?.pageColor || (isDark ? "#FFFFFF" : "#111827");
    const secondaryText = isDark ? "#A1A1AA" : "#64748B";

    // Surface color
    let surfaceColor = liveData?.cardSample?.bg;
    if (!surfaceColor || surfaceColor === neutralBg) {
      surfaceColor = isDark ? "#18181B" : "#F8FAFC";
    }

    // Tertiary / Accent Color (from measured live button or dominant chromatic color)
    let tertiary = liveData?.primaryButton?.bg || (liveData?.topAccents && liveData.topAccents.length > 0 ? liveData.topAccents[0] : null);
    if (!tertiary || tertiary === neutralBg || tertiary === primaryText) {
      tertiary = isDark ? "#38BDF8" : "#2563EB";
    }

    // On-Tertiary text
    let onTertiary = liveData?.primaryButton?.textCol;
    if (!onTertiary || onTertiary === tertiary) {
      const whiteContrast = calculateContrastRatio("#FFFFFF", tertiary);
      const blackContrast = calculateContrastRatio("#000000", tertiary);
      onTertiary = whiteContrast >= blackContrast ? "#FFFFFF" : "#000000";
    }

    // Border color
    const border = liveData?.cardSample?.borderColor || (isDark ? "rgba(255, 255, 255, 0.08)" : "#E2E8F0");

    // WCAG contrast report
    const primaryContrast = calculateContrastRatio(primaryText, neutralBg);
    const tertiaryContrast = calculateContrastRatio(tertiary, neutralBg);
    const onTertiaryContrast = calculateContrastRatio(onTertiary, tertiary);

    const wcagReport: WCAGContrastReport = {
      primaryOnNeutral: primaryContrast,
      tertiaryOnNeutral: tertiaryContrast,
      onTertiaryOnTertiary: onTertiaryContrast,
      isCompliantAA: primaryContrast >= 4.5 && tertiaryContrast >= 3.0,
      contrastStatus: primaryContrast >= 7.0 && tertiaryContrast >= 4.5 ? "AAA" : "AA",
      notes: `Medição em tempo real: Primário ${primaryContrast}:1, Ação ${tertiaryContrast}:1, Botão ${onTertiaryContrast}:1.`,
    };

    // 6. Derive Real Typography Tokens
    const mainFont = liveData?.fontFamily || "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    const h1Font = liveData?.h1Data?.fontFamily || mainFont;

    const typography = {
      fontFamily: mainFont,
      headingFamily: h1Font,
      monoFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
      h1: {
        fontSize: liveData?.h1Data?.fontSize || (isDark ? "3.25rem" : "3rem"),
        fontWeight: liveData?.h1Data?.fontWeight || 700,
        lineHeight: liveData?.h1Data?.lineHeight || 1.15,
        letterSpacing: liveData?.h1Data?.letterSpacing || "-0.02em",
      },
      h2: {
        fontSize: liveData?.h2Data?.fontSize || "2rem",
        fontWeight: liveData?.h2Data?.fontWeight || 600,
        lineHeight: liveData?.h2Data?.lineHeight || 1.25,
        letterSpacing: liveData?.h2Data?.letterSpacing || "-0.015em",
      },
      h3: {
        fontSize: "1.375rem",
        fontWeight: 600,
        lineHeight: 1.35,
      },
      bodyMd: {
        fontSize: liveData?.primaryButton?.font || "1rem",
        fontWeight: 400,
        lineHeight: 1.55,
      },
      bodySm: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      labelCaps: {
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
      },
    };

    // 7. Derive Real Spacing & Shapes Tokens
    const btnRadius = liveData?.primaryButton?.radius || "8px";
    const cardRadius = liveData?.cardSample?.radius || "14px";
    const btnPadding = liveData?.primaryButton?.pad || "10px 20px";
    const cardPadding = liveData?.cardSample?.pad || "24px";

    const rounded = {
      sm: "4px",
      md: btnRadius,
      lg: cardRadius,
      xl: "24px",
      full: "9999px",
    };

    const spacing = {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: cardPadding.includes("px") ? cardPadding : "24px",
      xl: "32px",
      "2xl": "48px",
    };

    const components = {
      buttonPrimary: {
        backgroundColor: "{colors.tertiary}",
        textColor: "{colors.onTertiary}",
        rounded: "{rounded.md}",
        padding: btnPadding,
        fontSize: "{typography.bodyMd.fontSize}",
      },
      card: {
        backgroundColor: "{colors.surface}",
        rounded: "{rounded.lg}",
        border: `1px solid {colors.border}`,
        padding: "{spacing.lg}",
      },
    };

    // 7.5 Impeccable Quality & Anti-Pattern Refinement Gate
    let impeccableAudit: any = null;
    try {
      impeccableAudit = await impeccableService.auditTarget(normalizedUrl);
    } catch (e) {
      console.warn("[ExtractorService] Impeccable audit fallback:", e);
    }

    // 8. Synthesize Canonical Google Labs DESIGN.MD
    const canonicalDesignMd = this.synthesizeCanonicalDesignMd({
      name: brandName,
      domain,
      description: brandDescription,
      colors: {
        primary: primaryText,
        secondary: secondaryText,
        tertiary,
        neutral: neutralBg,
        surface: surfaceColor,
        accent: tertiary,
        onPrimary: isDark ? neutralBg : "#FFFFFF",
        onTertiary,
        border,
      },
      typography,
      spacing,
      rounded,
      wcagReport,
      impeccableAudit,
    });

    const company: Company = {
      id: baseSlug.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: brandName,
      domain,
      category: brandCategory,
      description: brandDescription,
      logoUrl: faviconUrl,
      screenshotUrl,
      colors: {
        primary: primaryText,
        secondary: secondaryText,
        tertiary,
        neutral: neutralBg,
        surface: surfaceColor,
        accent: tertiary,
        onPrimary: isDark ? neutralBg : "#FFFFFF",
        onTertiary,
        border,
      },
      typography,
      spacing,
      rounded,
      components,
      designMd: canonicalDesignMd,
      verified: true,
      extractedAt: new Date().toISOString(),
      wcagContrast: wcagReport,
      impeccableAudit,
    };

    // Analyze and enrich with Design DNA (Archetype, Blueprints, Invariants)
    try {
      company.dna = await aiService.analyzeDesignDna({
        company,
        screenshotUrl,
      });
    } catch (dnaErr) {
      console.warn("[ExtractorService] DNA analysis notice:", dnaErr);
      company.dna = aiService.heuristicAnalyzeDna(company);
    }

    // Guarantee that canonical DESIGN.MD ALWAYS includes the exact Section Blueprints and Layout Invariants
    if (company.dna) {
      canonicalDesignMd = this.appendDnaToDesignMd(canonicalDesignMd, company.dna);
      company.designMd = canonicalDesignMd;
    }

    // Automatically register in companiesStore (which saves to data.json)
    companiesStore.addCompany(company);

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
        detectedColorsCount: liveData?.topColors?.length || 6,
        fontFamiliesDetected: [typography.fontFamily],
        wcagRatio: tertiaryContrast,
        executionTimeMs: Date.now() - startTime,
      },
    };
  }

  private deduceCategory(domain: string, title: string, desc: string): string {
    const text = `${domain} ${title} ${desc}`.toLowerCase();
    if (text.includes("ai") || text.includes("agent") || text.includes("intelligence") || text.includes("search")) {
      return "AI & Developer Tools";
    }
    if (text.includes("cloud") || text.includes("deploy") || text.includes("host") || text.includes("infra")) {
      return "Cloud & Infrastructure";
    }
    if (text.includes("finance") || text.includes("payment") || text.includes("pay") || text.includes("bank") || text.includes("fintech")) {
      return "Fintech & Payments";
    }
    if (text.includes("music") || text.includes("streaming") || text.includes("video") || text.includes("audio")) {
      return "Media & Streaming";
    }
    if (text.includes("travel") || text.includes("rent") || text.includes("hotel") || text.includes("vacation")) {
      return "Travel & Hospitality";
    }
    if (text.includes("design") || text.includes("creative") || text.includes("ui") || text.includes("ux")) {
      return "Design & Creative";
    }
    return "SaaS & Web Software";
  }

  private appendDnaToDesignMd(baseMd: string, dna: any): string {
    const blueprints = Array.isArray(dna.sectionBlueprints)
      ? dna.sectionBlueprints
          .map(
            (sec: any, idx: number) => `### ${idx + 1}. ${sec.name}
- **Layout Type:** ${sec.layoutType}
- **Density:** ${sec.density}
- **Key Visual Elements:** ${Array.isArray(sec.keyVisualElements) ? sec.keyVisualElements.join(", ") : sec.keyVisualElements}
- **Typography Hierarchy:** ${sec.typographyHierarchy}
- **Design Rule:** ${sec.designRule}`
          )
          .join("\n\n")
      : "";

    const alwaysRules = Array.isArray(dna.invariants?.always)
      ? dna.invariants.always.map((r: string) => `- **SEMPRE:** ${r}`).join("\n")
      : "";

    const neverRules = Array.isArray(dna.invariants?.never)
      ? dna.invariants.never.map((r: string) => `- **NUNCA:** ${r}`).join("\n")
      : "";

    return `${baseMd}

## Visual Archetype & Creative Philosophy
- **Archetype:** ${dna.archetype}
- **Visual Atmosphere:** ${dna.visualAtmosphere}
- **Spatial Rhythm:** Density: ${dna.spatialRhythm?.density?.toUpperCase() || "BALANCED"} • ${dna.spatialRhythm?.whitespaceStrategy || ""}
- **Container Max Width:** ${dna.spatialRhythm?.containerMaxWidth || "1280px"}

## Section Blueprints (Layout Topology)
${blueprints}

## Design Invariants (Strict Normative Invariants)
${alwaysRules}
${neverRules}
`;
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
    impeccableAudit?: any;
  }): string {
    const { name, domain, description, colors, typography, spacing, rounded, wcagReport, impeccableAudit } = params;

    const impeccableSection = impeccableAudit && impeccableAudit.refinementsApplied?.length > 0
      ? `\n\n## Impeccable Quality & Refinement Invariants
- **Auditoria de Anti-Padrões:** Executada via motor Impeccable (${impeccableAudit.warningsCount} alertas, ${impeccableAudit.advisoriesCount} orientações).
${impeccableAudit.refinementsApplied.map((r: string) => `- ${r}`).join('\n')}`
      : "";

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
  headingFamily: "${typography.headingFamily || typography.fontFamily}"
  monoFamily: "${typography.monoFamily || "monospace"}"
  h1:
    fontFamily: "{typography.headingFamily}"
    fontSize: "${typography.h1.fontSize}"
    fontWeight: ${typography.h1.fontWeight}
    lineHeight: ${typography.h1.lineHeight || 1.15}
    letterSpacing: "${typography.h1.letterSpacing || "-0.02em"}"
  h2:
    fontFamily: "{typography.headingFamily}"
    fontSize: "${typography.h2.fontSize}"
    fontWeight: ${typography.h2.fontWeight}
    lineHeight: ${typography.h2.lineHeight || 1.25}
    letterSpacing: "${typography.h2.letterSpacing || "-0.015em"}"
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
    padding: "${params.spacing?.md || "10px 20px"}"
    fontSize: "{typography.body-md.fontSize}"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: "1px solid {colors.border}"
---

# ${name} Design System Specification

## Overview
Este sistema de design foi extraído e sintetizado a partir de **${name}** (\`${domain}\`) para guiar agentes de IA na geração de interfaces consistentes e normativas. ${description}

## Normative Color Tokens (WCAG ${wcagReport.contrastStatus})
- **Canvas Base / Neutral (\`${colors.neutral}\`):** Canvas de base real medido no DOM.
- **Primary Ink (\`${colors.primary}\`):** Cor de alta hierarquia para títulos e textos principais (${wcagReport.primaryOnNeutral}:1).
- **Secondary Slate (\`${colors.secondary}\`):** Tonalidade neutra para textos secundários e metadados.
- **Brand Accent / Action (\`${colors.tertiary}\`):** Cor de ação primária (CTA) extraída dos botões e gatilhos de foco (${wcagReport.tertiaryOnNeutral}:1).
- **Surface Layer (\`${colors.surface}\`):** Superfície de apoio para cards, modais e contêineres estruturados.

## Real Typography Scale
- **Base UI Font:** \`${typography.fontFamily}\`
- **Heading Font:** \`${typography.headingFamily}\`
- **Display Scale (H1):** Tamanho medido de \`${typography.h1.fontSize}\` com peso \`${typography.h1.fontWeight}\` e entrelinha \`${typography.h1.lineHeight}\`.
- **Subheading (H2):** Tamanho medido de \`${typography.h2.fontSize}\` com peso \`${typography.h2.fontWeight}\`.

## Layout & Components
- **Geometria de Botões:** Cantos arredondados calibrados em \`{rounded.md}\` (${rounded.md}) com fundo em \`{colors.tertiary}\`.
- **Geometria de Cards:** Superfície em \`{colors.surface}\` com contorno \`1px solid {colors.border}\` e cantos \`{rounded.lg}\` (${rounded.lg}).

## Do's and Don'ts:
### Do's:
- Reutilize tokens semânticos declarados em \`{colors.tertiary}\` para todas as ações primárias.
- Preserve a escala métrica de \`spacing\` e \`rounded\` documentada.
- Garanta contraste mínimo de 4.5:1 em elementos de texto.

### Don'ts:
- Nunca misture famílias tipográficas externas sem declaração no token.
- Nunca aplique estilos ad-hoc fora da especificação do DESIGN.MD.${impeccableSection}`;
  }
}

export const extractorService = new ExtractorService();
