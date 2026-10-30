import express, { Request, Response } from "express";
import cors from "cors";
import { companiesStore } from "./data/companiesStore.js";
import { extractorService } from "./services/extractorService.js";
import { exportService } from "./services/exportService.js";
import { aiService } from "./services/aiService.js";
import { Company, ExportFormat, AdaptDesignRequest } from "./types.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// 1. Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "OpenDesignMD API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// 2. Categories listing helper
app.get("/api/categories", (_req: Request, res: Response) => {
  const categories = companiesStore.getCategories();
  res.json({
    success: true,
    categories,
  });
});

// 3. List companies (with ?category= and ?search=)
app.get("/api/companies", (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;
  const search = req.query.search as string | undefined;

  const companies = companiesStore.getAllCompanies(category, search);

  res.json({
    success: true,
    count: companies.length,
    companies,
  });
});

// 4. Get company details and full tokens by ID
app.get("/api/companies/:id", (req: Request, res: Response) => {
  const rawId = req.params.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const company = companiesStore.getCompanyById(id);

  if (!company) {
    res.status(404).json({
      success: false,
      error: `Company with ID '${id}' not found.`,
    });
    return;
  }

  res.json({
    success: true,
    company,
  });
});

// 5. Extract design tokens and generate DESIGN.MD from target URL
app.post("/api/extract", async (req: Request, res: Response) => {
  try {
    const { url, name } = req.body;

    if (!url || typeof url !== "string" || url.trim() === "") {
      res.status(400).json({
        success: false,
        error: "Param 'url' is required and must be a valid URL string.",
      });
      return;
    }

    const extractionResult = await extractorService.extractFromUrl(url, name);

    res.json(extractionResult);
  } catch (err: any) {
    console.error("Extraction error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to extract design tokens from the provided URL.",
      details: err?.message || String(err),
    });
  }
});

// 6. Save newly extracted company into store
app.post("/api/companies", (req: Request, res: Response) => {
  try {
    const payload = req.body as Company;

    if (!payload.name || !payload.colors || !payload.designMd) {
      res.status(400).json({
        success: false,
        error: "Missing required company fields (name, colors, designMd).",
      });
      return;
    }

    const saved = companiesStore.addCompany(payload);

    res.status(201).json({
      success: true,
      message: "Company successfully saved to store.",
      company: saved,
    });
  } catch (err: any) {
    console.error("Save company error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to save company.",
      details: err?.message || String(err),
    });
  }
});

// 7. Export tokens to Tailwind v4, v3, DTCG, or raw DESIGN.MD
app.get("/api/export/:id/:format", (req: Request, res: Response) => {
  const rawId = req.params.id;
  const rawFormat = req.params.format;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const format = Array.isArray(rawFormat) ? rawFormat[0] : rawFormat;

  const validFormats: ExportFormat[] = ["tailwind-v4", "tailwind-v3", "dtcg", "design-md"];
  if (!validFormats.includes(format as ExportFormat)) {
    res.status(400).json({
      success: false,
      error: `Invalid format '${format}'. Valid options: ${validFormats.join(", ")}`,
    });
    return;
  }

  const company = companiesStore.getCompanyById(id);
  if (!company) {
    res.status(404).json({
      success: false,
      error: `Company with ID '${id}' not found.`,
    });
    return;
  }

  const exportResult = exportService.export(company, format as ExportFormat);

  res.setHeader("Content-Type", exportResult.contentType);
  res.setHeader("Content-Disposition", `attachment; filename="${exportResult.filename}"`);
  res.send(exportResult.content);
});

// 8. List supported AI providers & defaults
app.get("/api/ai/providers", (_req: Request, res: Response) => {
  res.json({
    success: true,
    providers: [
      {
        id: "heuristic",
        name: "Motor Heurístico Embutido",
        description: "Zero configuração, roda 100% offline e sem necessidade de chaves de API.",
        requiresApiKey: false,
        requiresBaseUrl: false,
        defaultModel: "heuristic-v1",
      },
      {
        id: "local",
        name: "IA Local (Ollama / LM Studio / vLLM)",
        description: "Execute modelos multimodais locais como llama3.2-vision, qwen2.5-vl ou minicpm-v no seu computador.",
        requiresApiKey: false,
        requiresBaseUrl: true,
        defaultBaseUrl: "http://localhost:11434/v1",
        defaultModel: "llama3.2-vision",
      },
      {
        id: "gemini",
        name: "Google Gemini",
        description: "Gemini 2.0 Flash / Pro Vision da Google com entendimento multimodal avançado de design.",
        requiresApiKey: true,
        requiresBaseUrl: false,
        defaultModel: "gemini-2.0-flash",
      },
      {
        id: "openai",
        name: "OpenAI / OpenRouter / Groq",
        description: "Compatível com GPT-4o, GPT-4o-mini ou qualquer API compatível com o formato OpenAI.",
        requiresApiKey: true,
        requiresBaseUrl: true,
        defaultBaseUrl: "https://api.openai.com/v1",
        defaultModel: "gpt-4o",
      },
      {
        id: "claude",
        name: "Anthropic Claude",
        description: "Claude 3.5 Sonnet com precisão refinada em arquitetura de software e sistemas de design.",
        requiresApiKey: true,
        requiresBaseUrl: false,
        defaultModel: "claude-3-5-sonnet-20241022",
      },
    ],
  });
});

// 9. Analyze Design DNA (Archetype, Atmosphere, Section Blueprints, Invariants)
app.post("/api/ai/analyze-dna", async (req: Request, res: Response) => {
  try {
    const { companyId, providerConfig } = req.body;

    if (!companyId) {
      res.status(400).json({ success: false, error: "companyId is required." });
      return;
    }

    const company = companiesStore.getCompanyById(companyId);
    if (!company) {
      res.status(404).json({ success: false, error: `Company '${companyId}' not found.` });
      return;
    }

    const dna = await aiService.analyzeDesignDna({
      company,
      screenshotUrl: company.screenshotUrl,
      providerConfig,
    });

    // Save DNA to company in store
    company.dna = dna;
    companiesStore.addCompany(company);

    res.json({
      success: true,
      companyId,
      dna,
    });
  } catch (err: any) {
    console.error("Analyze DNA error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to analyze design DNA.",
      details: err?.message || String(err),
    });
  }
});

// 10. Adapt Design System to Client Project Context
app.post("/api/ai/adapt-context", async (req: Request, res: Response) => {
  try {
    const payload = req.body as AdaptDesignRequest;

    if (!payload.clientProjectContext || payload.clientProjectContext.trim() === "") {
      res.status(400).json({
        success: false,
        error: "Param 'clientProjectContext' is required (describe the client's business/project).",
      });
      return;
    }

    // If companyId was given, load company
    let brandName = payload.brandName;
    let designDna = payload.designDna;
    let designTokens = payload.designTokens;

    if (payload.companyId) {
      const company = companiesStore.getCompanyById(payload.companyId);
      if (company) {
        brandName = brandName || company.name;
        designDna = designDna || company.dna || aiService.heuristicAnalyzeDna(company);
        designTokens = designTokens || {
          colors: company.colors,
          typography: company.typography,
          spacing: company.spacing,
          rounded: company.rounded,
        };
      }
    }

    const adaptationResult = await aiService.adaptDesignToClient({
      companyId: payload.companyId,
      brandName: brandName || "Reference Brand",
      designDna,
      designTokens,
      clientProjectContext: payload.clientProjectContext,
      clientName: payload.clientName,
      providerConfig: payload.providerConfig,
    });

    res.json(adaptationResult);
  } catch (err: any) {
    console.error("Adapt context error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to adapt design system to client context.",
      details: err?.message || String(err),
    });
  }
});

// Start listening
export const server = app.listen(PORT, () => {
  console.log(`[OpenDesignMD Backend] Server listening on http://localhost:${PORT}`);
  console.log(`[OpenDesignMD Backend] API Health: http://localhost:${PORT}/api/health`);
  console.log(`[OpenDesignMD Backend] Pre-populated companies: ${companiesStore.getAllCompanies().length}`);
});

export default app;
