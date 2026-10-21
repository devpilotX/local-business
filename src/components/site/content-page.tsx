import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowRight, Mail } from "lucide-react";
import type { ContentPage as Content } from "@/lib/content";
import { legalSlugs, services } from "@/lib/content";
import { launchApproved, business } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { PageHero, type Crumb } from "./page-hero";
import { ServiceCard } from "./service-card";
import { industryNav, type IndustrySlug, type ServiceId } from "./nav-data";
import {
  JsonLd,
  articleSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";

function crumbsFor(page: Content): Crumb[] {
  const [section, rest] = page.slug.split("/");
  const self = { name: page.title, path: `/${page.slug}` };
  if (section === "services" && rest) {
    const s = services.find((x) => x.id === rest);
    return [
      { name: "Services", path: "/services" },
      { ...self, name: s?.title ?? page.title },
    ];
  }
  if (section === "guides" && rest)
    return [{ name: "Guides", path: "/guides" }, self];
  if (section === "industries" && rest)
    return [
      { ...self, name: industryNav[rest as IndustrySlug]?.label ?? page.title },
    ];
  return [self];
}

export function ContentPage({ page, email }: { page: Content; email: string }) {
  const legal = legalSlugs.includes(page.slug);
  const [section, rest] = page.slug.split("/");
  const serviceId = section === "services" ? (rest as ServiceId) : undefined;
  const path = `/${page.slug}`;
  const related = services
    .filter((s) => s.id !== serviceId)
    .slice(0, 3)
    .map((s) => s.id);

  const schema = [
    webPageSchema({ title: page.title, description: page.summary, path }),
    ...(serviceId
      ? [serviceSchema({ name: page.title, description: page.summary, path })]
      : []),
    ...(section === "guides"
      ? [articleSchema({ title: page.title, description: page.summary, path })]
      : []),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <PageHero crumbs={crumbsFor(page)} title={page.title} lede={page.summary}>
        {legal ? null : (
          <>
            <Button asChild>
              <Link
                href={`/contact${serviceId ? `?service=${serviceId}` : ""}`}
              >
                Talk about your project
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/pricing">How pricing works</Link>
            </Button>
          </>
        )}
      </PageHero>
      <div className="container article-layout">
        <article className="prose">
          {legal && !launchApproved && (
            <aside className="policy-status">
              <strong>Draft policy, not yet approved for launch.</strong>
              <p>
                Operator details and the deployed data handling need review
                before this policy is relied on.
              </p>
            </aside>
          )}
          {legal && business.address && (
            <p>
              Operator: {business.legalName}. Business address:{" "}
              {business.address}.
            </p>
          )}
          <ReactMarkdown>{page.body}</ReactMarkdown>
        </article>
        <aside className="article-aside" aria-label="Next steps">
          <div className="aside-card">
            <h2>Have a question?</h2>
            <p>Tell us about your business and the part you want to improve.</p>
            <Button asChild>
              <Link
                href={`/contact${serviceId ? `?service=${serviceId}` : ""}`}
              >
                Start an enquiry
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
            <a href={`mailto:${email}`} className="aside-email">
              <Mail size={16} aria-hidden="true" />
              {email}
            </a>
          </div>
          <div className="aside-links">
            <h2>Keep reading</h2>
            <ul>
              <li>
                <Link href="/services">
                  All services <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/pricing">
                  Pricing approach <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/guides">
                  Practical guides <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      {serviceId ? (
        <section className="container related" aria-labelledby="related-title">
          <h2 id="related-title">Related services</h2>
          <div className="service-grid">
            {related.map((id) => (
              <ServiceCard key={id} serviceId={id} headingLevel="h3" />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
