import fs from "fs";
import path from "path";
import {
  Company,
  DesignDna,
  SectionBlueprint,
  AIProviderConfig,
  AdaptDesignRequest,
  AdaptDesignResponse,
  DesignTokens,
} from "../types.js";

export class AIService {
  /**
   * Helper to load screenshot as base64 if it exists on disk
   */
  private getScreenshotBase64(screenshotUrl?: string): string | null {
    if (!screenshotUrl) return null;
    try {
      const filename = path.basename(screenshotUrl);
      const filePath = path.resolve(process.cwd(), "public", "previews", filename);
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        return fileBuffer.toString("base64");
      }
    } catch (e) {
      console.warn("[AIService] Could not read screenshot for AI analysis:", e);
    }
    return null;
  }

  /**
   * 1. Analyze Site Screenshot & Computed Tokens to extract rich Design DNA
   */
  public async analyzeDesignDna(options: {
    company: Company;
    screenshotUrl?: string;
    providerConfig?: AIProviderConfig;
  }): Promise<DesignDna> {
    const { company, screenshotUrl, providerConfig } = options;
    const config = providerConfig || { provider: "heuristic" };
    const base64Image = this.getScreenshotBase64(screenshotUrl || company.screenshotUrl);

    // If provider is heuristic or no key provided for cloud models, use heuristic generator
    if (config.provider === "heuristic" || (!config.apiKey && config.provider !== "local")) {
      return this.heuristicAnalyzeDna(company);
    }

    try {
      if (config.provider === "gemini") {
        return await this.analyzeDnaWithGemini(company, base64Image, config);
      } else if (config.provider === "openai" || config.provider === "local") {
        return await this.analyzeDnaWithOpenAICompatible(company, base64Image, config);
      } else if (config.provider === "claude") {
        return await this.analyzeDnaWithClaude(company, base64Image, config);
      }
    } catch (err: any) {
      console.warn(`[AIService] AI vision call failed with ${config.provider}, falling back to heuristic engine:`, err.message || err);
      return this.heuristicAnalyzeDna(company);
    }

    return this.heuristicAnalyzeDna(company);
  }

  /**
   * 2. Adapt Brand X's Design DNA into Client Project Context to synthesize a customized DESIGN.MD
   */
  public async adaptDesignToClient(options: AdaptDesignRequest): Promise<AdaptDesignResponse> {
    const { companyId, brandName, designDna, designTokens, clientProjectContext, clientName, providerConfig } = options;
    const config = providerConfig || { provider: "heuristic" };

    const effectiveBrandName = brandName || companyId || "Reference System";
    const effectiveDna = designDna || this.heuristicAnalyzeDna({
      id: companyId || "ref",
      name: effectiveBrandName,
      domain: `${effectiveBrandName.toLowerCase()}.com`,
      category: "Software",
      description: "Reference design system",
      logoUrl: "",
      colors: designTokens?.colors || {
        primary: "#121317",
        secondary: "#5F6368",
        tertiary: "#1A73E8",
        neutral: "#FAF9F6",
        surface: "#FFFFFF",
        accent: "#1A73E8",
      },
      typography: designTokens?.typography || {
        fontFamily: "Inter, sans-serif",
        h1: { fontSize: "3rem", fontWeight: 600 },
        h2: { fontSize: "2rem", fontWeight: 600 },
        bodyMd: { fontSize: "1rem", fontWeight: 400 },
      },
      spacing: {},
      rounded: {},
      designMd: "",
    } as any);

    if (config.provider === "heuristic" || (!config.apiKey && config.provider !== "local")) {
      return this.heuristicAdaptDesign(effectiveBrandName, effectiveDna, clientProjectContext, clientName);
    }

    try {
      if (config.provider === "gemini") {
        return await this.adaptWithGemini(effectiveBrandName, effectiveDna, clientProjectContext, clientName, config);
      } else if (config.provider === "openai" || config.provider === "local") {
        return await this.adaptWithOpenAICompatible(effectiveBrandName, effectiveDna, clientProjectContext, clientName, config);
      } else if (config.provider === "claude") {
        return await this.adaptWithClaude(effectiveBrandName, effectiveDna, clientProjectContext, clientName, config);
      }
    } catch (err: any) {
      console.warn(`[AIService] AI context adaptation failed with ${config.provider}, falling back to heuristic engine:`, err.message || err);
      return this.heuristicAdaptDesign(effectiveBrandName, effectiveDna, clientProjectContext, clientName);
    }

    return this.heuristicAdaptDesign(effectiveBrandName, effectiveDna, clientProjectContext, clientName);
  }

  // ==========================================
  // PROVIDER IMPLEMENTATIONS
  // ==========================================

  /**
   * Google Gemini Provider (Gemini 2.0 Flash / Pro)
   */
  private async analyzeDnaWithGemini(company: Company, base64Image: string | null, config: AIProviderConfig): Promise<DesignDna> {
    const model = config.model || "gemini-2.0-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`;

    const promptText = `You are a Senior Principal Design Architect. Analyze this brand's visual identity, website screenshot, and design tokens:
Brand: ${company.name} (${company.domain})
Category: ${company.category}
Extracted Colors: ${JSON.stringify(company.colors)}
Typography: ${JSON.stringify(company.typography)}

Extract the deep "Design DNA", artistic archetype, visual rhythm, section blueprints, and invariants.
Return ONLY valid JSON matching this exact schema:
{
  "archetype": "string (e.g. 'Engineered Calm', 'Bento Cyberpunk', 'Warm Editorial Paper', 'Prismatic Precision', etc.)",
  "visualAtmosphere": "string describing visual textures, lighting, borders, shadows, elevation, and emotional mood",
  "spatialRhythm": {
    "density": "compact" | "balanced" | "sprawling",
    "whitespaceStrategy": "string",
    "containerMaxWidth": "string"
  },
  "sectionBlueprints": [
    {
      "name": "Hero Section",
      "layoutType": "string",
      "density": "compact" | "balanced" | "sprawling",
      "keyVisualElements": ["string"],
      "typographyHierarchy": "string",
      "designRule": "string"
    },
    {
      "name": "Feature Showcase",
      "layoutType": "string",
      "density": "compact" | "balanced" | "sprawling",
      "keyVisualElements": ["string"],
      "typographyHierarchy": "string",
      "designRule": "string"
    },
    {
      "name": "Social Proof & Metrics",
      "layoutType": "string",
      "density": "compact" | "balanced" | "sprawling",
      "keyVisualElements": ["string"],
      "typographyHierarchy": "string",
      "designRule": "string"
    },
    {
      "name": "Interactive Demo / Playground",
      "layoutType": "string",
      "density": "compact" | "balanced" | "sprawling",
      "keyVisualElements": ["string"],
      "typographyHierarchy": "string",
      "designRule": "string"
    },
    {
      "name": "CTA & Footer Closing",
      "layoutType": "string",
      "density": "compact" | "balanced" | "sprawling",
      "keyVisualElements": ["string"],
      "typographyHierarchy": "string",
      "designRule": "string"
    }
  ],
  "invariants": {
    "always": ["string (at least 3 rules designers always follow)"],
    "never": ["string (at least 3 anti-patterns designers strictly avoid)"]
  },
  "adaptationGuidance": "string explaining how to transfer this exact aesthetic DNA to other domains"
}`;

    const parts: any[] = [{ text: promptText }];
    if (base64Image) {
      parts.push({
        inlineData: {
          mimeType: "image/png",
          data: base64Image,
        },
      });
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    });

    if (!res.ok) {
      const errTxt = await res.text();
      throw new Error(`Gemini API returned ${res.status}: ${errTxt}`);
    }

    const data: any = await res.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    return JSON.parse(rawContent);
  }

  /**
   * OpenAI & Local OpenAI-compatible Provider (Ollama, LM Studio, vLLM, GPT-4o)
   */
  private async analyzeDnaWithOpenAICompatible(company: Company, base64Image: string | null, config: AIProviderConfig): Promise<DesignDna> {
    const isLocal = config.provider === "local";
    const baseUrl = config.baseUrl || (isLocal ? "http://localhost:11434/v1" : "https://api.openai.com/v1");
    const model = config.model || (isLocal ? "llama3.2-vision" : "gpt-4o");

    const promptText = `You are a Principal Design Systems Architect.
Analyze this brand's visual identity and website screenshot:
Brand: ${company.name} (${company.domain})
Category: ${company.category}
Extracted Colors: ${JSON.stringify(company.colors)}

Extract the deep "Design DNA", artistic archetype, visual rhythm, section blueprints, and invariants.
Respond ONLY with a valid JSON object matching this schema:
{
  "archetype": "string",
  "visualAtmosphere": "string",
  "spatialRhythm": {
    "density": "compact" | "balanced" | "sprawling",
    "whitespaceStrategy": "string",
    "containerMaxWidth": "string"
  },
  "sectionBlueprints": [
    {
      "name": "Hero Section",
      "layoutType": "string",
      "density": "compact" | "balanced" | "sprawling",
      "keyVisualElements": ["string"],
      "typographyHierarchy": "string",
      "designRule": "string"
    },
    {
      "name": "Feature Showcase",
      "layoutType": "string",
      "density": "compact" | "balanced" | "sprawling",
      "keyVisualElements": ["string"],
      "typographyHierarchy": "string",
      "designRule": "string"
    },
    {
      "name": "Social Proof & Metrics",
      "layoutType": "string",
      "density": "compact" | "balanced" | "sprawling",
      "keyVisualElements": ["string"],
      "typographyHierarchy": "string",
      "designRule": "string"
    },
    {
      "name": "CTA & Footer",
      "layoutType": "string",
      "density": "compact" | "balanced" | "sprawling",
      "keyVisualElements": ["string"],
      "typographyHierarchy": "string",
      "designRule": "string"
    }
  ],
  "invariants": {
    "always": ["string"],
    "never": ["string"]
  },
  "adaptationGuidance": "string"
}`;

    const content: any[] = [{ type: "text", text: promptText }];
    if (base64Image) {
      content.push({
        type: "image_url",
        image_url: {
          url: `data:image/png;base64,${base64Image}`,
        },
      });
    }

    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content }],
        temperature: 0.2,
        ...(isLocal ? {} : { response_format: { type: "json_object" } }),
      }),
    });

    if (!res.ok) {
      const errTxt = await res.text();
      throw new Error(`OpenAI-compatible API returned ${res.status}: ${errTxt}`);
    }

    const data: any = await res.json();
    let text = data.choices?.[0]?.message?.content || "{}";
    text = text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
    return JSON.parse(text);
  }

  /**
   * Anthropic Claude Provider (Claude 3.5 Sonnet)
   */
  private async analyzeDnaWithClaude(company: Company, base64Image: string | null, config: AIProviderConfig): Promise<DesignDna> {
    const model = config.model || "claude-3-5-sonnet-20241022";
    const endpoint = "https://api.anthropic.com/v1/messages";

    const content: any[] = [];
    if (base64Image) {
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: "image/png",
          data: base64Image,
        },
      });
    }
    content.push({
      type: "text",
      text: `Analyze the Design DNA and section blueprints for brand ${company.name}. Return ONLY raw valid JSON with keys: archetype, visualAtmosphere, spatialRhythm, sectionBlueprints, invariants, adaptationGuidance.`,
    });

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.apiKey || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 3000,
        messages: [{ role: "user", content }],
      }),
    });

    if (!res.ok) {
      const errTxt = await res.text();
      throw new Error(`Claude API returned ${res.status}: ${errTxt}`);
    }

    const data: any = await res.json();
    let text = data.content?.[0]?.text || "{}";
    text = text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
    return JSON.parse(text);
  }

  // ==========================================
  // CLIENT ADAPTATION WITH AI PROVIDERS
  // ==========================================

  private async adaptWithGemini(
    brandName: string,
    dna: DesignDna,
    clientContext: string,
    clientName: string | undefined,
    config: AIProviderConfig
  ): Promise<AdaptDesignResponse> {
    const model = config.model || "gemini-2.0-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`;

    const promptText = `You are a Principal Design Systems Architect at Google Labs.
Your task is to take the artistic Design DNA of reference company "${brandName}" and synthesize a bespoke DESIGN.MD specification for a new client project:
Client Project / Business Context: "${clientContext}"
Client Name: "${clientName || "Client Project"}"

Source Reference Design DNA:
- Archetype: ${dna.archetype}
- Atmosphere: ${dna.visualAtmosphere}
- Spatial Rhythm: ${dna.spatialRhythm.density} density, ${dna.spatialRhythm.whitespaceStrategy}
- Invariants (Always): ${dna.invariants.always.join("; ")}
- Invariants (Never): ${dna.invariants.never.join("; ")}
- Section Blueprints: ${JSON.stringify(dna.sectionBlueprints)}

Generate a response in JSON format matching this schema:
{
  "success": true,
  "archetypeApplied": "${dna.archetype}",
  "rationale": "Detailed explanation of how ${brandName}'s design philosophy was translated to this client domain",
  "adaptedSections": [
    {
      "name": "Section Name (e.g. Hero, Core Workflow, Social Proof)",
      "description": "How this section is structured for the client",
      "dnaRuleApplied": "The specific rule from ${brandName} that shapes this section"
    }
  ],
  "suggestedTokens": {
    "primary": "#HEX",
    "secondary": "#HEX",
    "tertiary": "#HEX",
    "neutral": "#HEX",
    "surface": "#HEX"
  },
  "adaptedDesignMd": "Full valid Google Labs DESIGN.MD content in Markdown format, with frontmatter, Visual Philosophy, Colors, Typography, Section Blueprints, and Invariants"
}`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: promptText }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error ${res.status}: ${await res.text()}`);
    }

    const data: any = await res.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    return JSON.parse(rawContent);
  }

  private async adaptWithOpenAICompatible(
    brandName: string,
    dna: DesignDna,
    clientContext: string,
    clientName: string | undefined,
    config: AIProviderConfig
  ): Promise<AdaptDesignResponse> {
    const isLocal = config.provider === "local";
    const baseUrl = config.baseUrl || (isLocal ? "http://localhost:11434/v1" : "https://api.openai.com/v1");
    const model = config.model || (isLocal ? "llama3.2-vision" : "gpt-4o");

    const promptText = `Take the Design DNA of "${brandName}" and adapt it to this client project:
Client: "${clientName || "Client Project"}"
Context: "${clientContext}"

Source DNA Archetype: ${dna.archetype}
Source Atmosphere: ${dna.visualAtmosphere}
Source Invariants: Always: ${dna.invariants.always.join("; ")} | Never: ${dna.invariants.never.join("; ")}

Return ONLY valid JSON matching:
{
  "success": true,
  "archetypeApplied": "${dna.archetype}",
  "rationale": "string",
  "adaptedSections": [
    { "name": "string", "description": "string", "dnaRuleApplied": "string" }
  ],
  "suggestedTokens": {
    "primary": "#HEX",
    "secondary": "#HEX",
    "tertiary": "#HEX",
    "neutral": "#HEX",
    "surface": "#HEX"
  },
  "adaptedDesignMd": "Markdown content string conforming to @google/design.md"
}`;

    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: promptText }],
        temperature: 0.3,
        ...(isLocal ? {} : { response_format: { type: "json_object" } }),
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI API error ${res.status}: ${await res.text()}`);
    }

    const data: any = await res.json();
    let text = data.choices?.[0]?.message?.content || "{}";
    text = text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
    return JSON.parse(text);
  }

  private async adaptWithClaude(
    brandName: string,
    dna: DesignDna,
    clientContext: string,
    clientName: string | undefined,
    config: AIProviderConfig
  ): Promise<AdaptDesignResponse> {
    const model = config.model || "claude-3-5-sonnet-20241022";
    const endpoint = "https://api.anthropic.com/v1/messages";

    const promptText = `Adapt the Design DNA of ${brandName} (${dna.archetype}) into a custom DESIGN.MD for client project: "${clientContext}". Return ONLY JSON with keys: success, archetypeApplied, rationale, adaptedSections, suggestedTokens, adaptedDesignMd.`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.apiKey || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 4000,
        messages: [{ role: "user", content: promptText }],
      }),
    });

    if (!res.ok) {
      throw new Error(`Claude API error ${res.status}: ${await res.text()}`);
    }

    const data: any = await res.json();
    let text = data.content?.[0]?.text || "{}";
    text = text.replace(/^```json\s*/i, "").replace(/```\s*$/, "").trim();
    return JSON.parse(text);
  }

  // ==========================================
  // HEURISTIC DETERMINISTIC ENGINE (FALLBACK / ZERO-CONFIG)
  // ==========================================

  public heuristicAnalyzeDna(company: Company): DesignDna {
    const neutral = (company.colors?.neutral || "#FAF9F6").toLowerCase();
    const isDark = neutral.startsWith("#0") || neutral.startsWith("#1") || neutral.startsWith("#2");
    const name = company.name.toLowerCase();

    // Archetype detection based on aesthetic signatures
    if (name.includes("linear") || name.includes("raycast") || name.includes("supabase")) {
      return {
        archetype: "Engineered Calm (Tactile Darkroom)",
        visualAtmosphere:
          "High-precision dark workspace characterized by 1px borders with 8-12% opacity, micro-radiuses, subtle radial glow lights behind key focal points, keyboard shortcut indicators (KBD tags), and monochromatic depth planes.",
        spatialRhythm: {
          density: "compact",
          whitespaceStrategy: "Disciplined mathematical rhythm (8px baseline grid) prioritizing information density and zero visual clutter.",
          containerMaxWidth: "1200px",
        },
        sectionBlueprints: [
          {
            name: "Hero Section",
            layoutType: "Centered High-Impact Typography with Floating App Viewport",
            density: "compact",
            keyVisualElements: ["1px subtle border app mockup", "Micro-badge status indicator", "Dual CTA with keyboard shortcut"],
            typographyHierarchy: "Display H1 with negative tracking (-0.03em) leading directly to muted secondary subtitle",
            designRule: "Never use stock illustration; showcase the actual user interface running inside a dark glass enclosure.",
          },
          {
            name: "Feature Showcase",
            layoutType: "Asymmetric Bento Grid (3-to-4 Columns)",
            density: "compact",
            keyVisualElements: ["Glassmorphic dark cards", "Subtle white/10 border on hover", "Interactive state previews"],
            typographyHierarchy: "Card titles in H3 semibold with muted body text and monospace keyboard tag",
            designRule: "Each bento tile must highlight an engineering capability rather than marketing superlatives.",
          },
          {
            name: "Social Proof",
            layoutType: "Monochromatic Logo Ribbon",
            density: "compact",
            keyVisualElements: ["SVG logos rendered in 40% opacity grayscale", "No heavy badge backgrounds"],
            typographyHierarchy: "Single muted labelCaps lead text",
            designRule: "All logos must normalize to equal optical height and disappear into the dark background.",
          },
          {
            name: "Interactive Demo",
            layoutType: "Keyboard-Driven Interactive Sandbox",
            density: "compact",
            keyVisualElements: ["Command menu mockup (⌘K)", "Interactive list view with keyboard navigation"],
            typographyHierarchy: "Monospaced code labels and compact row items",
            designRule: "Allow the user to experience software responsiveness before signing up.",
          },
          {
            name: "CTA & Closing",
            layoutType: "Minimalist Radial Spotlight Deck",
            density: "compact",
            keyVisualElements: ["Single primary button with inner highlight border", "Subtle gradient mesh beneath card"],
            typographyHierarchy: "H2 display headline followed by instant signup button",
            designRule: "Zero distractions; a single high-contrast primary action button.",
          },
        ],
        invariants: {
          always: [
            "Always use 1px border with rgba(255, 255, 255, 0.08) to separate dark containers.",
            "Always include keyboard shortcuts (⌘K, Enter) near interactive actions.",
            "Always maintain strict 8px/16px spatial padding for tactical ergonomics.",
            "Always provide instant visual feedback on hover using border luminance shifts rather than scale bounce.",
          ],
          never: [
            "Never use bubbly, high-saturation cartoon illustrations or hand-drawn doodles.",
            "Never use colored drop shadows or diffuse blur > 20px.",
            "Never use rounded pill buttons (border-radius: 9999px); strictly use 6px-10px squircle radius.",
            "Never use low-contrast gray text on dark gray without meeting WCAG AA 4.5:1 ratio.",
          ],
        },
        adaptationGuidance:
          "When adapting this system to client products, frame the client's problem as an engineering workflow. Use dark themes with 1px translucent borders, tight spacing, monospaced metadata, and high-efficiency keyboard-navigable components.",
      };
    }

    if (name.includes("airbnb") || name.includes("notion")) {
      return {
        archetype: "Warm Editorial & Tactile Paper",
        visualAtmosphere:
          "Humanist, welcoming, and hospitable aesthetic defined by warm neutral paper tones (#FAF9F6 / #FFFFFF), generous breathing room, refined editorial serif/sans typography, and rounded organic containers.",
        spatialRhythm: {
          density: "sprawling",
          whitespaceStrategy: "Abundant negative space allowing content and photography to command full emotional attention.",
          containerMaxWidth: "1440px",
        },
        sectionBlueprints: [
          {
            name: "Hero Section",
            layoutType: "Floating Search & Filter Capsule with Emotional Full-Bleed Imagery",
            density: "sprawling",
            keyVisualElements: ["Elevated capsule container with soft ambient shadow", "High-res contextual photography"],
            typographyHierarchy: "Warm H1 headline with organic tracking",
            designRule: "The user should feel invited and relaxed; avoid aggressive urgency timers.",
          },
          {
            name: "Feature Showcase",
            layoutType: "Fluid Grid of Visual Story Cards",
            density: "sprawling",
            keyVisualElements: ["Aspect-ratio 4:3 cards with rounded-2xl corners", "Favorite heart icon micro-interaction"],
            typographyHierarchy: "Bold location/title line with secondary pricing and rating metadata",
            designRule: "Prioritize photography and real human stories over technical specs.",
          },
          {
            name: "Social Proof",
            layoutType: "Curated Host/Guest Stories with Avatar Avatars",
            density: "balanced",
            keyVisualElements: ["Star ratings with gold accent", "Authentic quote cards"],
            typographyHierarchy: "Editorial quote with author attribution",
            designRule: "Emphasize community trust, hospitality, and real person reviews.",
          },
          {
            name: "CTA & Closing",
            layoutType: "Warm Surface Card with Friendly Invite",
            density: "balanced",
            keyVisualElements: ["High-contrast primary coral/tertiary button", "Reassurance guarantees"],
            typographyHierarchy: "H2 inviting participation with warm secondary copy",
            designRule: "Provide total reassurance on cancellations, guarantees, and pricing clarity.",
          },
        ],
        invariants: {
          always: [
            "Always prioritize high-quality real-world photography with natural lighting.",
            "Always use warm neutral off-white backgrounds (#FAF9F6) rather than cold sterile #FFFFFF.",
            "Always use generous padding (32px-48px) inside containers to let typography breathe.",
            "Always keep shadows soft and diffuse (blur 24px-32px, opacity 4-8%).",
          ],
          never: [
            "Never use cold harsh blue gradients or neon cyber accents.",
            "Never cram content into high-density tables without breathing space.",
            "Never use aggressive marketing popups or artificial countdown badges.",
            "Never use sharp 0px square corners on cards.",
          ],
        },
        adaptationGuidance:
          "When adapting this system to client domains, focus on warmth, hospitality, and user comfort. Use warm neutral canvases, rounded organic containers (16px-24px), soft ambient shadows, and human-centric microcopy.",
      };
    }

    if (name.includes("stripe") || name.includes("vercel")) {
      return {
        archetype: "Prismatic High-Precision Tech",
        visualAtmosphere:
          "Sleek developer-centric elegance featuring prismatic gradient mesh backdrops, crisp 1px borders, monospace accent chips, interactive code tabs, and impeccable typographic scale.",
        spatialRhythm: {
          density: "balanced",
          whitespaceStrategy: "Structured mathematical rhythm balancing technical documentation density with commercial landing page elegance.",
          containerMaxWidth: "1280px",
        },
        sectionBlueprints: [
          {
            name: "Hero Section",
            layoutType: "Split-Screen 55/45: Value Proposition & Live Interactive Terminal",
            density: "balanced",
            keyVisualElements: ["Multi-angle gradient mesh canvas", "Interactive live code snippet with syntax highlighting", "Copy to clipboard button"],
            typographyHierarchy: "Crisp H1 with gradient highlight words",
            designRule: "Prove the product's value with copy-pasteable real code in the hero viewport.",
          },
          {
            name: "Feature Showcase",
            layoutType: "Modular Architecture Diagram Cards",
            density: "balanced",
            keyVisualElements: ["SVG animated flow lines", "1px border surface containers", "Monospace tech badges"],
            typographyHierarchy: "Clear H3 title with monospaced API route label",
            designRule: "Treat every feature as an infrastructure component with predictable inputs and outputs.",
          },
          {
            name: "Social Proof",
            layoutType: "Enterprise Metrics Billboard",
            density: "balanced",
            keyVisualElements: ["Stat counter (99.999% uptime, $100B+ volume)", "Enterprise logo cluster"],
            typographyHierarchy: "Massive statistical digits in bold display font",
            designRule: "Lead with undeniable scale, volume, and uptime reliability.",
          },
          {
            name: "CTA & Closing",
            layoutType: "Dual Path: Developer Terminal vs Sales Contact",
            density: "balanced",
            keyVisualElements: ["One-click CLI install snippet", "Direct enterprise sales consultation button"],
            typographyHierarchy: "Action-oriented H2 with clear bifurcation for dev vs executive",
            designRule: "Never force developers into a sales call; always offer instant CLI or API signup.",
          },
        ],
        invariants: {
          always: [
            "Always incorporate live code snippets or interactive sandboxes.",
            "Always align text and elements strictly to a 4px/8px grid.",
            "Always include monospaced font for tokens, technical parameters, and API endpoints.",
            "Always use prismatic gradient accents to guide visual attention to focal points.",
          ],
          never: [
            "Never use low-resolution screenshots or non-interactive mockups.",
            "Never use vague buzzwords without demonstrating concrete technical implementation.",
            "Never use clunky modal popups that block reading.",
          ],
        },
        adaptationGuidance:
          "Adapt this system by framing the client's offering as high-reliability infrastructure. Use gradient mesh accents, live interactive calculators or code blocks, and crisp geometric cards.",
      };
    }

    // Default Universal Archetype
    return {
      archetype: isDark ? "Modern Cybernetic Minimalist" : "Contemporary Clean Functionalism",
      visualAtmosphere: isDark
        ? "Immersive dark environment focused on glowing accent points, high contrast typography, and structured modular panels."
        : "Bright, trustworthy corporate aesthetic with crisp borders, clear visual hierarchy, and accessible interactive states.",
      spatialRhythm: {
        density: "balanced",
        whitespaceStrategy: "Balanced 24px-32px padding providing visual structure without sparse void.",
        containerMaxWidth: "1280px",
      },
      sectionBlueprints: [
        {
          name: "Hero Section",
          layoutType: "Centrally Aligned Headline with Dual CTA and Product Mockup",
          density: "balanced",
          keyVisualElements: ["Elevated product screenshot", "Primary action button with icon", "Customer review snippet"],
          typographyHierarchy: "H1 Display leading to clear 2-sentence subtitle",
          designRule: "State the core customer outcome within the first 3 seconds of viewing.",
        },
        {
          name: "Feature Showcase",
          layoutType: "3-Column Grid with Icon Headers",
          density: "balanced",
          keyVisualElements: ["Rounded icon badges", "Surface cards with 1px border", "Feature bullet points"],
          typographyHierarchy: "H3 feature title with descriptive body text",
          designRule: "Focus each card on a single concrete problem and its direct resolution.",
        },
        {
          name: "Social Proof",
          layoutType: "Customer Logo Ticker and Testimonial Cards",
          density: "balanced",
          keyVisualElements: ["Customer avatar", "Company logo", "Star rating"],
          typographyHierarchy: "Direct quote with customer name and verified title",
          designRule: "Highlight quantifiable results achieved by recognizable brands.",
        },
        {
          name: "CTA Section",
          layoutType: "High-Contrast Closing Banner",
          density: "balanced",
          keyVisualElements: ["Full-width surface card", "Instant access form or single primary button"],
          typographyHierarchy: "H2 closing pitch with risk-reversal subtext (No credit card required)",
          designRule: "Remove friction and provide immediate access to the core value.",
        },
      ],
      invariants: {
        always: [
          "Always maintain WCAG AA compliance (contrast ratio >= 4.5:1) for all text.",
          "Always use consistent border radius across all buttons and input fields.",
          "Always provide explicit hover and focus states for keyboard accessibility.",
        ],
        never: [
          "Never place low-contrast text over photographic backgrounds without an overlay scrim.",
          "Never mix discordant border radii on the same visual plane.",
          "Never hide primary navigation on desktop viewports.",
        ],
      },
      adaptationGuidance:
        "Apply this foundational system to any client industry by replacing brand accent colors and tailoring section headlines while preserving the structural spacing and component hierarchy.",
    };
  }

  public heuristicAdaptDesign(
    brandName: string,
    dna: DesignDna,
    clientContext: string,
    clientName: string | undefined
  ): AdaptDesignResponse {
    const effectiveClient = clientName || "Projeto do Cliente";
    const contextLower = clientContext.toLowerCase();

    // Determine tailored color palette based on client domain
    let primary = "#111827";
    let secondary = "#4B5563";
    let tertiary = "#2563EB"; // Blue default
    let neutral = "#F9FAFB";
    let surface = "#FFFFFF";

    if (contextLower.includes("saude") || contextLower.includes("médic") || contextLower.includes("clínica") || contextLower.includes("hospital")) {
      tertiary = "#0D9488"; // Medical Teal
      neutral = "#F0FDFA";
      primary = "#0F172A";
    } else if (contextLower.includes("finan") || contextLower.includes("invest") || contextLower.includes("banc") || contextLower.includes("cripto")) {
      tertiary = "#059669"; // Emerald Green
      neutral = "#F8FAFC";
      primary = "#022C22";
    } else if (contextLower.includes("estétic") || contextLower.includes("beleza") || contextLower.includes("moda") || contextLower.includes("luxury")) {
      tertiary = "#BE185D"; // Rose Luxury
      neutral = "#FFF1F2";
      primary = "#1F2937";
    } else if (contextLower.includes("logíst") || contextLower.includes("transporte") || contextLower.includes("frota")) {
      tertiary = "#EA580C"; // Fleet Orange
      neutral = "#FFF7ED";
      primary = "#18181B";
    } else if (contextLower.includes("dark") || dna.spatialRhythm.density === "compact") {
      primary = "#F9FAFB";
      secondary = "#9CA3AF";
      tertiary = "#6366F1";
      neutral = "#0B0C10";
      surface = "#16181D";
    }

    const adaptedSections = dna.sectionBlueprints.map((sec) => ({
      name: `${sec.name} (${effectiveClient})`,
      description: `Estrutura ${sec.layoutType} adaptada para o fluxo de ${clientContext}. Aplica densidade ${sec.density} e foco em conversão e usabilidade.`,
      dnaRuleApplied: sec.designRule,
    }));

    const adaptedDesignMd = `---
name: ${effectiveClient} Design System (Inspired by ${brandName})
version: 1.0.0
archetype: "${dna.archetype}"
colors:
  primary: "${primary}"
  secondary: "${secondary}"
  tertiary: "${tertiary}"
  neutral: "${neutral}"
  surface: "${surface}"
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

# Design System: ${effectiveClient}

> Transplante de DNA visual baseado na filosofia e arquitetura estética de **${brandName}**, adaptado especificamente para o contexto: *${clientContext}*.

## 1. Visual Archetype & Creative Philosophy
- **Arquétipo Aplicado:** ${dna.archetype}
- **Atmosfera Visual:** ${dna.visualAtmosphere}
- **Racional de Adaptação:** O projeto *${effectiveClient}* adota a disciplina espacial e o rigor de composição de ${brandName}, traduzindo a elegância funcional para o segmento de ${clientContext}.

## 2. Spatial Rhythm & Information Density
- **Densidade:** ${dna.spatialRhythm.density.toUpperCase()}
- **Estratégia de Espaçamento:** ${dna.spatialRhythm.whitespaceStrategy}
- **Largura Máxima do Container:** ${dna.spatialRhythm.containerMaxWidth}

## 3. Section Blueprints (Arquitetura das Seções)

${dna.sectionBlueprints
  .map(
    (s, idx) => `### ${idx + 1}. ${s.name}
- **Padrão de Layout:** ${s.layoutType}
- **Densidade Visual:** ${s.density}
- **Elementos-Chave:** ${s.keyVisualElements.join(", ")}
- **Regra de Design Herdada:** ${s.designRule}
- **Aplicação no Cliente:** Implementar o fluxo principal de *${clientContext}* respeitando a proporção de respiro e a hierarquia ${s.typographyHierarchy}.
`
  )
  .join("\n")}

## 4. Designers' Invariants (Regras Invioláveis)

### O que os designers desta aplicação SEMPRE fazem:
${dna.invariants.always.map((a) => `- ${a}`).join("\n")}

### O que os designers desta aplicação NUNCA fariam (Anti-Padrões):
${dna.invariants.never.map((n) => `- ${n}`).join("\n")}

## 5. Implementation Tokens & Guidelines for Agents
- Para criar novas telas, o agente de código deve usar a paleta de cores primária (\`${primary}\`), fundo canvas (\`${neutral}\`) e cor de ação (\`${tertiary}\`).
- Todo card deve respeitar o border-radius definido (\`rounded-lg\`) com separadores de 1px.
- Todas as interações devem seguir a densidade ${dna.spatialRhythm.density} sem sobrecarregar a cognição do usuário final.
`;

    return {
      success: true,
      archetypeApplied: dna.archetype,
      rationale: `O DNA visual de ${brandName} (${dna.archetype}) foi sintetizado com sucesso para o domínio "${clientContext}". As regras de layout, paleta de contraste e densidade espacial foram recalculadas para garantir usabilidade exemplar e identidade marcante.`,
      adaptedSections,
      suggestedTokens: {
        primary,
        secondary,
        tertiary,
        neutral,
        surface,
      },
      adaptedDesignMd,
    };
  }
}

export const aiService = new AIService();
