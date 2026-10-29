import express, { Request, Response } from "express";
import cors from "cors";
import { companiesStore } from "./data/companiesStore.js";
import { extractorService } from "./services/extractorService.js";
import { exportService } from "./services/exportService.js";
import { Company, ExportFormat } from "./types.js";

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

// Start listening
export const server = app.listen(PORT, () => {
  console.log(`[OpenDesignMD Backend] Server listening on http://localhost:${PORT}`);
  console.log(`[OpenDesignMD Backend] API Health: http://localhost:${PORT}/api/health`);
  console.log(`[OpenDesignMD Backend] Pre-populated companies: ${companiesStore.getAllCompanies().length}`);
});

export default app;
