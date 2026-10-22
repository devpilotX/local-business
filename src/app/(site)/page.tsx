import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ClipboardCheck,
  Mail,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/ui/faq";
import { questions } from "@/components/ui/faq-data";
import { Reveal } from "@/components/site/reveal";
import { EnquiryFigure } from "@/components/site/enquiry-figure";
import { WorkShowcase } from "@/components/site/work-showcase";
import { PaymentPlan, PriceTable } from "@/components/site/detail-sections";
import { ServiceArt } from "@/components/site/service-art";
import { industryNav, type ServiceId } from "@/components/site/nav-data";
import { getSettings } from "@/lib/site-data";
import { industries, services } from "@/lib/content";
import {
  JsonLd,
  faqSchema,
  organizationSchema,
  websiteSchema,
  webPageSchema,
} from "@/lib/schema";

const bento: {
  id: ServiceId;
  wide?: boolean;
  tags: string[];
}[] = [
  {
    id: "google-business-profile",
    wide: true,
    tags: ["Setup and verification", "Hours and categories", "Photos"],
  },
  {
    id: "websites",
    wide: true,
    tags: ["Clear pages", "Enquiry forms", "Fast on mobile"],
  },
  {
    id: "automation",
    tags: ["n8n", "Lead to task"],
  },
  {
    id: "local-seo",
    tags: ["Structure", "Local pages"],
  },
  {
    id: "reporting",
    tags: ["Enquiries", "Project status"],
  },
];

export default async function Home() {
  const settings = await getSettings();
  const title = settings.heroTitle;
  const split = title.match(/^(.*?)(easier to find\.?)$/i);

  return (
    <>
      <JsonLd
        data={[
          organizationSchema({
            name: settings.siteName,
            email: settings.contactEmail,
            description: settings.heroDescription,
            phone: settings.phone || undefined,
          }),
          websiteSchema(settings.siteName),
          webPageSchema({
            title: `${settings.siteName} | Google Business Profile, websites and workflows`,
            description: settings.heroDescription,
            path: "/",
          }),
          faqSchema(questions),
        ]}
      />

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1 className="hero-title">
              {split ? (
                <>
                  {split[1]}
                  <span>{split[2]}</span>
                </>
              ) : (
                title
              )}
            </h1>
            <p className="lede hero-lede">{settings.heroDescription}</p>
            <div className="hero-actions">
              <Button asChild size="lg">
                <Link href="/contact">
                  Plan your project <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Explore services</Link>
              </Button>
            </div>
            <ul className="hero-points">
              <li>
                <Check size={16} aria-hidden="true" /> Fixed written scope
              </li>
              <li>
                <Check size={16} aria-hidden="true" /> Business-owned accounts
              </li>
              <li>
                <Check size={16} aria-hidden="true" /> No ranking promises
              </li>
            </ul>
          </div>
          <div className="hero-figure">
            <EnquiryFigure />
          </div>
        </div>
      </section>

      <section className="industry-bar" aria-label="Industries we plan for">
        <div className="container industry-bar-inner">
          <p>Planned for the businesses that make a neighbourhood.</p>
          {industries.map((industry) => {
            const meta = industryNav[industry.slug];
            const Icon = meta.icon;
            return (
              <Link key={industry.slug} href={`/industries/${industry.slug}`}>
                <Icon size={18} aria-hidden="true" />
                {meta.label}
                <ArrowUpRight className="arrow" size={15} aria-hidden="true" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--split">
            <h2>
              Everything a local business needs to be found and followed up.
            </h2>
            <p>
              Start with the gap that costs you the most. Be easier to find,
              give visitors a clear next step, or organise the work behind the
              scenes.
            </p>
          </div>
          <div className="bento">
            {bento.map((card) => {
              const service = services.find((s) => s.id === card.id)!;
              return (
                <Reveal
                  key={card.id}
                  className={
                    card.wide ? "bento-cell bento-cell--wide" : "bento-cell"
                  }
                >
                  <Link className="bento-card" href={`/services/${card.id}`}>
                    <div className="bento-visual">
                      <ServiceArt id={card.id} />
                    </div>
                    <div className="bento-body">
                      <h3>
                        {service.title}
                        <ArrowUpRight size={18} aria-hidden="true" />
                      </h3>
                      <p>{service.summary}</p>
                      <ul className="bento-tags" aria-label="Includes">
                        {card.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <p style={{ marginTop: 28 }}>
            <Link className="text-link" href="/services">
              See all {services.length} services
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container split">
          <div>
            <h2>Less copying between inboxes. More following through.</h2>
            <p className="lede">
              A saved enquiry can create a lead, a follow-up task and a team
              notification. Your team sees the next action instead of searching
              several inboxes.
            </p>
            <ul className="check-list">
              <li>
                <BadgeCheck size={18} aria-hidden="true" />
                Every enquiry is saved before the visitor sees a success
                message.
              </li>
              <li>
                <BadgeCheck size={18} aria-hidden="true" />
                Follow-ups appear as tasks with an owner and a due date.
              </li>
              <li>
                <BadgeCheck size={18} aria-hidden="true" />
                Email status shows the difference between queued and accepted.
              </li>
            </ul>
            <Button asChild variant="outline">
              <Link href="/services/automation">
                How workflow support works
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <Reveal>
            <div className="pipeline" aria-label="Example enquiry handoff">
              <div className="pipeline-head">
                <strong>Enquiry handoff</strong>
                <span>example</span>
              </div>
              <ol className="pipeline-steps">
                {[
                  [
                    Send,
                    "Enquiry saved",
                    "Recorded before a success message is shown.",
                    "Done",
                    "",
                  ],
                  [
                    ClipboardCheck,
                    "Follow-up task created",
                    "Assigned to the team with a due date.",
                    "Done",
                    "",
                  ],
                  [
                    Mail,
                    "Team notified",
                    "Queued email, then accepted by the provider.",
                    "Queued",
                    "pending",
                  ],
                ].map(([Icon, heading, body, state, tone]) => {
                  const I = Icon as typeof Send;
                  return (
                    <li key={String(heading)}>
                      <span className="pipeline-icon">
                        <I size={17} aria-hidden="true" />
                      </span>
                      <div>
                        <h3>{String(heading)}</h3>
                        <p>{String(body)}</p>
                      </div>
                      <span
                        className="status"
                        data-tone={String(tone) || undefined}
                      >
                        {String(state)}
                      </span>
                    </li>
                  );
                })}
              </ol>
              <p className="pipeline-foot">
                Workflow scope depends on your tools, permissions and provider
                plans.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 id="work-title">Work that is live today.</h2>
            <p>
              Two platforms we built and run ourselves, each used by real
              visitors every day.
            </p>
          </div>
          <WorkShowcase />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--split">
            <h2>Planned around the way your business works.</h2>
            <p>
              A clinic needs trust, a cafe needs visit information and a
              coaching centre needs clear course enquiries.
            </p>
          </div>
          <div className="industry-grid">
            {industries.slice(0, 3).map((industry, i) => (
              <Reveal key={industry.slug}>
                <Link
                  className="industry-card"
                  href={`/industries/${industry.slug}`}
                >
                  <div className="industry-media">
                    <Image
                      src={`/images/${industry.image}`}
                      alt={
                        [
                          "A bright dental treatment room",
                          "A cafe interior with a wooden counter",
                          "A group learning in a lecture room",
                        ][i]
                      }
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                  </div>
                  <div className="industry-body">
                    <h3>
                      {industryNav[industry.slug].label}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </h3>
                    <p>{industry.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="media-note">
            Photography is illustrative and does not show client work.
          </p>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="price-title">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 id="price-title">Clear prices. Pay half to start.</h2>
            <p>
              Every service has a published starting price, below typical market
              rates. The rest is fixed in your written scope.
            </p>
          </div>
          <PriceTable
            ids={["google-business-profile", "websites", "automation"]}
          />
          <div className="price-teaser-foot">
            <PaymentPlan />
            <Link className="text-link" href="/pricing">
              See all prices <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container faq-layout">
          <div className="section-head">
            <h2>Questions worth asking first.</h2>
            <p>
              A straightforward answer is more useful than a promise nobody can
              verify. <Link href="/contact">Ask us anything else.</Link>
            </p>
          </div>
          <FAQ />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <div className="cta-band-inner">
              <div>
                <h2>Let's find your next useful step.</h2>
                <p>
                  Tell us about your business. We start with the problem, not a
                  package, and reply with a clear recommendation.
                </p>
              </div>
              <div className="cta-actions">
                <Button asChild variant="light" size="lg">
                  <Link href="/contact">
                    Talk about your project
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="inverseOutline" size="lg">
                  <Link href="/pricing">How pricing works</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
