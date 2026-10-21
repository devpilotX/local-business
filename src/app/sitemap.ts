import type { MetadataRoute } from "next";
import { publishedContent } from "@/lib/site-data";
import { legalSlugs } from "@/lib/content";
import { siteUrl, launchApproved } from "@/lib/config";

export const dynamic = "force-dynamic";

function priorityOf(path: string) {
  if (path === "") return 1;
  if (["services", "contact"].includes(path)) return 0.9;
  if (path.startsWith("services/") || path.startsWith("industries/"))
    return 0.8;
  if (path.startsWith("guides") || ["about", "pricing"].includes(path))
    return 0.7;
  return 0.3;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!launchApproved) return [];
  const pages = await publishedContent();
  const now = new Date();
  return ["", "services", "guides", "contact", ...pages.map((p) => p.slug)].map(
    (path) => ({
      url: path ? `${siteUrl}/${path}` : siteUrl,
      lastModified: now,
      changeFrequency: legalSlugs.includes(path) ? "yearly" : "monthly",
      priority: priorityOf(path),
    }),
  );
}
