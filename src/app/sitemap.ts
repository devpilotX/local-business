import type { MetadataRoute } from "next";
import { publishedContent } from "@/lib/site-data";
import { siteUrl, launchApproved } from "@/lib/config";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!launchApproved) return [];
  const pages = await publishedContent();
  return ["", "services", "guides", "contact", ...pages.map((p) => p.slug)].map(
    (path) => ({ url: `${siteUrl}/${path}` }),
  );
}
