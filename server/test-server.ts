import { companiesStore } from "./data/companiesStore.js";
import { extractorService } from "./services/extractorService.js";
import { exportService } from "./services/exportService.js";
import app, { server } from "./index.js";

async function runTests() {
  console.log("=== Running OpenDesignMD Backend Integration Tests ===");

  const baseUrl = "http://localhost:3001";

  // 1. Health check
  console.log("\n[Test 1] Testing GET /api/health...");
  const healthRes = await fetch(`${baseUrl}/api/health`);
  const healthJson = await healthRes.json();
  console.log("Health response:", healthJson);
  if (healthJson.status !== "ok") throw new Error("Health check failed");

  // 2. List all companies
  console.log("\n[Test 2] Testing GET /api/companies...");
  const compRes = await fetch(`${baseUrl}/api/companies`);
  const compJson = await compRes.json();
  console.log(`Companies count: ${compJson.count}`);
  if (!compJson.success || compJson.count < 8) throw new Error(`Expected at least 8 companies, got ${compJson.count}`);
  const initialCount = compJson.count;

  // 3. Search and category filter
  console.log("\n[Test 3] Testing search filter (?search=stripe)...");
  const searchRes = await fetch(`${baseUrl}/api/companies?search=stripe`);
  const searchJson = await searchRes.json();
  console.log("Found companies for 'stripe':", searchJson.companies.map((c: any) => c.name));
  if (searchJson.count !== 1 || searchJson.companies[0].id !== "stripe") {
    throw new Error("Search filter failed for Stripe");
  }

  // 4. Get by ID
  console.log("\n[Test 4] Testing GET /api/companies/linear...");
  const linearRes = await fetch(`${baseUrl}/api/companies/linear`);
  const linearJson = await linearRes.json();
  console.log("Linear company found:", linearJson.company.name, "Domain:", linearJson.company.domain);
  if (!linearJson.company || linearJson.company.id !== "linear") throw new Error("Get linear failed");

  // 5. Test export endpoints
  console.log("\n[Test 5] Testing GET /api/export/google-antigravity/tailwind-v4...");
  const tw4Res = await fetch(`${baseUrl}/api/export/google-antigravity/tailwind-v4`);
  const tw4Text = await tw4Res.text();
  console.log("Tailwind v4 preview:\n" + tw4Text.split("\n").slice(0, 10).join("\n") + "\n...");
  if (!tw4Text.includes("@theme") || !tw4Text.includes("--color-primary")) {
    throw new Error("Tailwind v4 export invalid");
  }

  console.log("\n[Test 6] Testing GET /api/export/stripe/tailwind-v3...");
  const tw3Res = await fetch(`${baseUrl}/api/export/stripe/tailwind-v3`);
  const tw3Json = await tw3Res.json();
  console.log("Tailwind v3 keys:", Object.keys(tw3Json.theme.extend));
  if (!tw3Json.theme.extend.colors.primary) throw new Error("Tailwind v3 export invalid");

  console.log("\n[Test 7] Testing GET /api/export/apple/dtcg...");
  const dtcgRes = await fetch(`${baseUrl}/api/export/apple/dtcg`);
  const dtcgJson = await dtcgRes.json();
  console.log("DTCG format schema:", dtcgJson.$schema);
  if (!dtcgJson.color?.primary?.$value) throw new Error("DTCG export invalid");

  // 6. Test extractor service
  console.log("\n[Test 8] Testing POST /api/extract with 'https://figma.com'...");
  const extractRes = await fetch(`${baseUrl}/api/extract`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: "https://figma.com" }),
  });
  const extractJson = await extractRes.json();
  console.log("Extracted company:", extractJson.company.name);
  console.log("WCAG status:", extractJson.company.wcagContrast.contrastStatus);
  console.log("DESIGN.MD generated snippet:\n" + extractJson.designMd.split("\n").slice(0, 15).join("\n"));
  if (!extractJson.success || !extractJson.designMd.includes("name: Figma")) {
    throw new Error("Extraction failed for Figma");
  }

  // 7. Test POST /api/companies (saving extracted company)
  console.log("\n[Test 9] Testing POST /api/companies...");
  const saveRes = await fetch(`${baseUrl}/api/companies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(extractJson.company),
  });
  const saveJson = await saveRes.json();
  console.log("Saved response:", saveJson.message);
  if (!saveJson.success) throw new Error("Save company failed");

  // Verify total count is now at least initialCount
  const updatedCountRes = await fetch(`${baseUrl}/api/companies`);
  const updatedCountJson = await updatedCountRes.json();
  console.log(`Updated total companies count: ${updatedCountJson.count}`);
  if (updatedCountJson.count < initialCount) throw new Error("Expected companies count to not decrease after saving");

  console.log("\n>>> ALL 9 INTEGRATION TESTS PASSED SUCCESSFULLY! <<<");

  server.close(() => {
    process.exit(0);
  });
}

runTests().catch((err) => {
  console.error("Test failed with error:", err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});
