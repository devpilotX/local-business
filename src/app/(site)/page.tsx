import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ClipboardCheck,
  FileText,
  KeyRound,
  Mail,
  Scale,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/ui/faq";
import { questions } from "@/components/ui/faq-data";
import { Reveal } from "@/components/site/reveal";
import { EnquiryFigure } from "@/components/site/enquiry-figure";
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

const principles = [
  {
    icon: FileText,
    title: "Written scope first",
    body: "Deliverables, dependencies and cost are agreed in writing before work starts.",
  },
  {
    icon: KeyRound,
    title: "Accounts stay yours",
    body: "Your domain, profile and tools remain in the business name, with a documented handover.",
  },
  {
    icon: Scale,
    title: "Honest about limits",
    body: "Google controls rankings. We improve the information and structure, without promising positions.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by default",
    body: "Forms collect only what is needed, and personal data stays out of logs and exports.",
  },
];

const steps = [
  {
    title: "Review the starting point",
    body: "Tell us what you do, what you already have and where enquiries or updates get stuck.",
  },
  {
    title: "Agree a useful scope",
    body: "Choose the deliverables, responsibilities and review points. Everything is written down.",
  },
  {
    title: "Build, check and hand over",
    body: "We complete the agreed checks, walk you through the result and hand over access.",
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
                        <h4>{String(heading)}</h4>
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

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>How we work with every client.</h2>
            <p>
              A few commitments that apply to every project, whatever its size.
            </p>
          </div>
          <div className="principles">
            {principles.map(({ icon: Icon, title: heading, body }) => (
              <div className="principle reveal" key={heading}>
                <Icon size={22} aria-hidden="true" />
                <h3>{heading}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
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

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Clear from the first conversation.</h2>
            <p>
              You should understand the work, the dependencies and the cost
              before committing to anything.
            </p>
          </div>
          <ol className="steps">
            {steps.map((step, index) => (
              <li className="step reveal" key={step.title}>
                <div className="step-marker">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-alt">
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
