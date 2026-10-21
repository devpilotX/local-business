import { siteUrl } from "@/lib/config";
export async function GET() {
  return new Response(
    `# Techcyme

> Local visibility, business websites and workflow support for local businesses.

## Services
- [Services](${siteUrl}/services): Scope and dependencies for each service.
- [Pricing](${siteUrl}/pricing): How projects are scoped and quoted.
- [Guides](${siteUrl}/guides): Practical checklists.
- [Contact](${siteUrl}/contact): Project enquiries.

No search rankings, traffic volume or advertising approvals are guaranteed. Private CRM and API data are not public sources.
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
