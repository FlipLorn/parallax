import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const routes = [
  "",
  "/app",
  "/app/markets",
  "/app/markets/sol-220",
  "/app/risk",
  "/app/agents",
  "/app/positions",
  "/app/replay",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date("2026-08-29"),
  }));
}
