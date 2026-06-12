import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { posts } from "@/lib/blog";
import { ralColors } from "@/lib/ral";
import { PRODUCTS } from "@/lib/catalog";

const BASE_URL = "https://cozy-check-hub.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/muurverf", changefreq: "weekly", priority: "0.9" },
          { path: "/kleuradvies", changefreq: "weekly", priority: "0.8" },
          { path: "/verfmengservice", changefreq: "monthly", priority: "0.8" },
          { path: "/verfcalculator", changefreq: "monthly", priority: "0.8" },
          { path: "/hulp-en-advies", changefreq: "monthly", priority: "0.7" },
          { path: "/over-ons", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.6" },
          { path: "/faq", changefreq: "monthly", priority: "0.6" },
          { path: "/verzending-en-retour", changefreq: "monthly", priority: "0.5" },
          { path: "/algemene-voorwaarden", changefreq: "yearly", priority: "0.3" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/blog", changefreq: "weekly", priority: "0.7" },
          { path: "/ral", changefreq: "monthly", priority: "0.7" },
          ...["muurverf", "lakverf", "beits", "grondverf", "buitenverf", "benodigdheden"].map((s) => ({
            path: `/categorie/${s}`,
            changefreq: "weekly" as const,
            priority: "0.8",
          })),
          ...["sikkens", "sigma", "wijzonol", "flexa", "histor"].map((s) => ({
            path: `/merk/${s}`,
            changefreq: "weekly" as const,
            priority: "0.7",
          })),
          ...PRODUCTS.map((p) => ({
            path: `/product/${p.slug}`,
            changefreq: "weekly" as const,
            priority: "0.8",
          })),
          ...posts.map((p) => ({
            path: `/blog/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
          })),
          ...ralColors.map((r) => ({
            path: `/ral/${r.code}`,
            changefreq: "monthly" as const,
            priority: "0.5",
          })),
        ];

        const urls = entries
          .map((e) =>
            [
              "  <url>",
              `    <loc>${BASE_URL}${e.path}</loc>`,
              e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
              e.priority ? `    <priority>${e.priority}</priority>` : null,
              "  </url>",
            ]
              .filter(Boolean)
              .join("\n"),
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
