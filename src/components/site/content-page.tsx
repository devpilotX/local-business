import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowRight, Check, Mail } from "lucide-react";
import type { ContentPage as Content } from "@/lib/content";
import { legalSlugs, services } from "@/lib/content";
import { launchApproved, business } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/ui/faq";
import { questions } from "@/components/ui/faq-data";
import { PageHero, type Crumb } from "./page-hero";
import { ServiceTile } from "./service-tile";
import {
  HandoverFigure,
  IndustryArt,
  ScopeArt,
  ServiceArt,
} from "./service-art";
import { industryNav, type IndustrySlug, type ServiceId } from "./nav-data";
import {
  Block,
  CtaBand,
  Details,
  Flow,
  Glance,
  Notes,
  PaymentPlan,
  PriceCard,
  PriceTable,
} from "./detail-sections";
import {
  aboutGaps,
  aboutNeeds,
  industryDetails,
  pricingNotes,
  pricingSteps,
  principles,
  processSteps,
  serviceDetails,
  servicePrices,
} from "@/lib/page-details";
import {
  JsonLd,
  articleSchema,
  faqSchema,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";

const pricingQuestions = questions.filter((q) =>
  /cost|free|pay|own|long/i.test(q.q),
);

const needsLede: Record<IndustrySlug, string> = {
  clinics: "What patients check before they book a visit.",
  hospitality: "What guests look up before they walk in or book a table.",
  coaching: "What learners and parents compare before they enquire.",
  "local-services": "What customers need to know before they ask for a quote.",
};

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

function HeroActions({ service }: { service?: ServiceId }) {
  return (
    <>
      <Button asChild>
        <Link href={`/contact${service ? `?service=${service}` : ""}`}>
          Talk about your project
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/pricing">How pricing works</Link>
      </Button>
    </>
  );
}

function Tiles({ ids, place }: { ids: ServiceId[]; place?: IndustrySlug }) {
  return (
    <div className="service-tiles">
      {ids.map((id) => (
        <ServiceTile key={id} serviceId={id} headingLevel="h3" place={place} />
      ))}
    </div>
  );
}

function ServiceLayout({ page, id }: { page: Content; id: ServiceId }) {
  const detail = serviceDetails[id];
  return (
    <>
      <PageHero
        crumbs={crumbsFor(page)}
        title={page.title}
        lede={page.summary}
        aside={<ServiceArt id={id} size="lg" />}
      >
        <HeroActions service={id} />
      </PageHero>
      <Block title="What's included" id="included">
        <Glance items={detail.includes} />
      </Block>
      <Block title="How it works" id="how" alt>
        <Flow steps={detail.steps} />
      </Block>
      <Block title="Price" id="price">
        <PriceCard id={id} />
      </Block>
      <Block title="Good to know" id="notes" alt>
        <Notes notes={detail.notes} />
        <div style={{ marginTop: 16 }}>
          <Details body={page.body} />
        </div>
      </Block>
      <Block title="Related services" id="related">
        <Tiles ids={detail.related} />
      </Block>
      <CtaBand {...detail.cta} href={`/contact?service=${id}`} />
    </>
  );
}

function IndustryLayout({ page, slug }: { page: Content; slug: IndustrySlug }) {
  const detail = industryDetails[slug];
  return (
    <>
      <PageHero
        crumbs={crumbsFor(page)}
        title={page.title}
        lede={page.summary}
        aside={<IndustryArt slug={slug} size="lg" />}
      >
        <HeroActions />
      </PageHero>
      <Block title="What your visitors need" lede={needsLede[slug]} id="needs">
        <Glance items={detail.needs} />
      </Block>
      <Block title="Services that help" id="services" alt>
        <Tiles ids={detail.services} place={slug} />
      </Block>
      <Block title="Good to know" id="notes">
        <Notes notes={detail.notes} />
        <div style={{ marginTop: 16 }}>
          <Details
            body={page.body}
            title="Read how we plan it"
            hint="Content, privacy and the team handoff in detail."
          />
        </div>
      </Block>
      <CtaBand {...detail.cta} />
    </>
  );
}

function PricingLayout({ page }: { page: Content }) {
  return (
    <>
      <JsonLd data={faqSchema(pricingQuestions)} />
      <PageHero
        crumbs={crumbsFor(page)}
        title={page.title}
        lede={page.summary}
        aside={<ScopeArt />}
      >
        <Button asChild>
          <Link href="/contact">
            Request a quote <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/services">Explore services</Link>
        </Button>
      </PageHero>
      <Block
        title="Starting prices"
        lede="Lower than typical market rates, with the full price fixed in your written scope."
        id="prices"
      >
        <PriceTable ids={services.map((s) => s.id)} />
      </Block>
      <Block
        title="Pay in two parts"
        lede="No full payment up front. Half when you approve, half on delivery."
        id="payment"
        alt
      >
        <PaymentPlan />
      </Block>
      <Block title="How a quote works" id="quote">
        <Flow steps={pricingSteps} />
      </Block>
      <Block title="No surprises" id="no-surprises" alt>
        <Notes notes={pricingNotes} />
        <div style={{ marginTop: 16 }}>
          <Details
            body={page.body}
            title="Read the pricing details"
            hint="Scope changes, ongoing support and provider costs."
          />
        </div>
      </Block>
      <section className="section-sm section-alt">
        <div className="container faq-layout">
          <div className="section-head">
            <h2>Pricing questions</h2>
            <p>
              Anything else? <Link href="/contact">Ask us directly.</Link>
            </p>
          </div>
          <FAQ items={pricingQuestions} />
        </div>
      </section>
      <CtaBand
        title="Get a written quote."
        body="Describe the project and the tools you use. We reply with a scope you can compare."
        secondary={{ href: "/services", label: "Explore services" }}
      />
    </>
  );
}

function AboutLayout({ page }: { page: Content }) {
  return (
    <>
      <PageHero
        crumbs={crumbsFor(page)}
        title={page.title}
        lede={page.summary}
        aside={<HandoverFigure />}
      >
        <HeroActions />
      </PageHero>
      <Block
        title="The gaps we fix"
        lede="Good businesses lose customers to small, fixable problems."
        id="gaps"
      >
        <Glance items={aboutGaps} columns={3} />
      </Block>
      <Block title="How we work" id="principles" alt>
        <Glance items={principles} />
      </Block>
      <Block title="From first message to handover" id="process">
        <Flow steps={processSteps} />
      </Block>
      <Block title="What we need from you" id="needs" alt>
        <ul className="notes">
          {aboutNeeds.map((n) => (
            <li key={n}>
              <Check size={18} aria-hidden="true" />
              {n}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 16 }}>
          <Details
            body={page.body}
            title="Read our approach in full"
            hint="Ownership, honesty about results and the handover."
          />
        </div>
      </Block>
      <CtaBand
        title="Work with a team that hands over the keys."
        body="Tell us what you do and where the process gets stuck. We reply with a plain recommendation."
      />
    </>
  );
}

function ArticleLayout({ page, email }: { page: Content; email: string }) {
  const legal = legalSlugs.includes(page.slug);
  return (
    <>
      <PageHero crumbs={crumbsFor(page)} title={page.title} lede={page.summary}>
        {legal ? null : <HeroActions />}
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
              <Link href="/contact">
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
              {[
                ["/services", "All services"],
                ["/pricing", "Pricing approach"],
                ["/guides", "Practical guides"],
              ].map(([href, text]) => (
                <li key={href}>
                  <Link href={href}>
                    {text} <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}

export function ContentPage({ page, email }: { page: Content; email: string }) {
  const [section, rest] = page.slug.split("/");
  const path = `/${page.slug}`;
  const serviceId =
    section === "services" && rest in serviceDetails
      ? (rest as ServiceId)
      : undefined;
  const industry =
    section === "industries" && rest in industryDetails
      ? (rest as IndustrySlug)
      : undefined;

  const schema = [
    webPageSchema({ title: page.title, description: page.summary, path }),
    ...(serviceId
      ? [
          serviceSchema({
            name: page.title,
            description: page.summary,
            path,
            price: servicePrices[serviceId].from,
          }),
        ]
      : []),
    ...(section === "guides"
      ? [articleSchema({ title: page.title, description: page.summary, path })]
      : []),
  ];

  return (
    <>
      <JsonLd data={schema} />
      {serviceId ? (
        <ServiceLayout page={page} id={serviceId} />
      ) : industry ? (
        <IndustryLayout page={page} slug={industry} />
      ) : page.slug === "pricing" ? (
        <PricingLayout page={page} />
      ) : page.slug === "about" ? (
        <AboutLayout page={page} />
      ) : (
        <ArticleLayout page={page} email={email} />
      )}
    </>
  );
}
