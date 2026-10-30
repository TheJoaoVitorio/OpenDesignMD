import { Company } from "../types.js";
import fs from "fs";
import path from "path";

export class CompaniesStore {
  private companies: Map<string, Company> = new Map();
  private filePath: string;

  constructor() {
    this.filePath = path.resolve(process.cwd(), "server", "data", "data.json");
    if (!fs.existsSync(this.filePath)) {
      this.filePath = path.resolve(process.cwd(), "data.json");
    }
    this.loadFromFile();
  }

  public loadFromFile(): void {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, "utf-8");
        const parsed: Company[] = JSON.parse(raw);
        this.companies.clear();
        for (const comp of parsed) {
          if (comp.id) {
            this.companies.set(comp.id, comp);
          }
        }
        console.log(`[CompaniesStore] Loaded ${this.companies.size} design systems from ${this.filePath}`);
      } else {
        console.warn(`[CompaniesStore] Warning: ${this.filePath} not found.`);
      }
    } catch (err: any) {
      console.error(`[CompaniesStore] Failed to load from ${this.filePath}:`, err.message);
    }
  }

  public saveToFile(): void {
    try {
      const list = Array.from(this.companies.values());
      const json = JSON.stringify(list, null, 2);

      // Save to server data
      const targetPath = path.resolve(process.cwd(), "server", "data", "data.json");
      fs.writeFileSync(targetPath, json, "utf-8");

      // Also sync to root and src for frontend convenience
      const rootPath = path.resolve(process.cwd(), "data.json");
      fs.writeFileSync(rootPath, json, "utf-8");

      const srcPath = path.resolve(process.cwd(), "src", "data", "data.json");
      if (fs.existsSync(path.dirname(srcPath))) {
        fs.writeFileSync(srcPath, json, "utf-8");
      }

      console.log(`[CompaniesStore] Successfully persisted ${list.length} companies to data.json`);
    } catch (err: any) {
      console.error(`[CompaniesStore] Failed to save data.json:`, err.message);
    }
  }

  public getAllCompanies(category?: string, search?: string): Company[] {
    let list = Array.from(this.companies.values());

    if (category && category.trim() !== "" && category.toLowerCase() !== "all") {
      const catLower = category.toLowerCase();
      list = list.filter((c) => c.category && c.category.toLowerCase().includes(catLower));
    }

    if (search && search.trim() !== "") {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.domain.toLowerCase().includes(q) ||
          (c.description && c.description.toLowerCase().includes(q)) ||
          (c.category && c.category.toLowerCase().includes(q))
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
    this.saveToFile();
    return company;
  }

  public hasCompany(id: string): boolean {
    return this.companies.has(id);
  }

  public getCategories(): string[] {
    const set = new Set<string>();
    for (const c of this.companies.values()) {
      if (c.category) {
        set.add(c.category);
      }
    }
    return Array.from(set);
  }
}

export const companiesStore = new CompaniesStore();
