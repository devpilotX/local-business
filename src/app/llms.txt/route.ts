import { siteUrl } from "@/lib/config";
import { publishedContent } from "@/lib/site-data";
import { legalSlugs } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const pages = (await publishedContent()).filter(
    (p) => !legalSlugs.includes(p.slug),
  );
  const group = (prefix: string) =>
    pages
      .filter((p) => p.slug.startsWith(prefix))
      .map((p) => `- [${p.title}](${siteUrl}/${p.slug}): ${p.summary}`)
      .join("\n");
  return new Response(
    `# Techcyme

> Google Business Profile support, business websites and n8n workflow automation for local businesses.

## Services
${group("services/")}

## Industries
${group("industries/")}

## Guides
${group("guides/")}

## Company
- [About](${siteUrl}/about): How projects are approached.
- [Pricing](${siteUrl}/pricing): How projects are scoped and quoted.
- [Contact](${siteUrl}/contact): Project enquiries.

No search rankings, traffic volume or advertising approvals are guaranteed. Private CRM and API data are not public sources.
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
