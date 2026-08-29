import { chromium } from "playwright";
import path from "path";

const targetDir = "C:\\Users\\rajni\\.gemini\\antigravity-ide\\brain\\e96851d6-489e-4b77-a03a-7e37c20f2ac2";

async function capture() {
  console.log("Launching browser for visual hard run...");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const routes = [
    { url: "http://localhost:3000/", name: "audit-home-desktop.png" },
    { url: "http://localhost:3000/app", name: "audit-app-desktop.png" },
    { url: "http://localhost:3000/app/risk", name: "audit-risk-desktop.png" },
    { url: "http://localhost:3000/app/markets", name: "audit-markets-desktop.png" },
    { url: "http://localhost:3000/app/markets/sol-220", name: "audit-market-detail.png" },
    { url: "http://localhost:3000/app/agents", name: "audit-agents-desktop.png" },
    { url: "http://localhost:3000/app/positions", name: "audit-positions-desktop.png" },
    { url: "http://localhost:3000/app/replay", name: "audit-replay-desktop.png" },
  ];

  for (const route of routes) {
    try {
      console.log(`Navigating to ${route.url}...`);
      await page.goto(route.url, { waitUntil: "networkidle" });
      await page.waitForTimeout(1000);
      const outPath = path.join(targetDir, route.name);
      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`Captured screenshot: ${outPath}`);
    } catch (e) {
      console.error(`Error on ${route.url}:`, e.message);
    }
  }

  await browser.close();
  console.log("Visual hard run completed!");
}

capture();
