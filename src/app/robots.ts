import type { MetadataRoute } from "next";
import { launchApproved, siteUrl } from "@/lib/config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(launchApproved
        ? { allow: "/", disallow: ["/admin", "/api/"] }
        : { disallow: "/" }),
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
