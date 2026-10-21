import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  PanelsTopLeft,
  Workflow,
  ClipboardCheck,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQ } from "@/components/ui/faq";
import { ServiceCard } from "@/components/site/service-card";
import { Reveal } from "@/components/site/reveal";
import { getSettings } from "@/lib/site-data";
import { industries } from "@/lib/content";
import { siteUrl } from "@/lib/config";
export default async function Home() {
  const settings = await getSettings();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    url: siteUrl,
    email: settings.contactEmail,
    description: settings.heroDescription,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replaceAll("<", "\\u003c"),
        }}
      />
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <h1>
              {settings.heroTitle === "Make your business easier to find." ? (
                <>
                  Make your business
                  <br />
                  <span>easier to find.</span>
                </>
              ) : (
                settings.heroTitle
              )}
            </h1>
            <p>{settings.heroDescription}</p>
            <div className="hero-buttons">
              <Button asChild>
                <Link href="/contact">
                  Plan your project
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/services">
                  Explore services
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <p className="hero-note">
              <Check size={17} aria-hidden="true" />
              Know the scope before work starts.
            </p>
          </div>
          <Reveal className="hero-visual">
            <div className="hero-image">
              <Image
                src="/images/local-cafe.jpg"
                alt="A welcoming independent cafe with a warm wood interior"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
              <div className="hero-image-caption">
                Real places.
                <br />A better online presence.
              </div>
            </div>
            <div className="journey-card">
              <div>
                <MapPin size={21} aria-hidden="true" />
                <span>Get discovered</span>
              </div>
              <ArrowRight size={17} aria-hidden="true" />
              <div>
                <PanelsTopLeft size={21} aria-hidden="true" />
                <span>Build trust</span>
              </div>
              <ArrowRight size={17} aria-hidden="true" />
              <div>
                <Workflow size={21} aria-hidden="true" />
                <span>Stay connected</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="audience-strip">
        <div className="container">
          <p>For the businesses that make a neighbourhood.</p>
          <div>
            <Link href="/industries/clinics">Clinics</Link>
            <Link href="/industries/hospitality">Hospitality</Link>
            <Link href="/industries/coaching">Coaching centres</Link>
            <Link href="/industries/local-services">Local services</Link>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <h2>
            A useful next step,
            <br />
            not a bigger to-do list.
          </h2>
          <p>
            Start where the gap is. Make your business easier to discover, give
            visitors a clear next step, or organise the work behind the scenes.
          </p>
        </div>
        <div className="three-grid">
          {[0, 1, 2].map((i) => (
            <Reveal key={i}>
              <ServiceCard index={i} />
            </Reveal>
          ))}
        </div>
        <Link className="text-link section-link" href="/services">
          See all services
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </section>
      <section className="section soft-section">
        <div className="container split-section">
          <div>
            <h2>
              Good work deserves
              <br />a clear first impression.
            </h2>
            <p className="section-description">
              A clinic needs trust. A cafe needs useful visit information. A
              coaching centre needs clear course enquiries. The website should
              match the way your business works.
            </p>
            <Link className="text-link" href="/about">
              How we approach the work
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="approach-list">
            {[
              [
                "Start with the customer",
                "Answer the questions people have before they contact you.",
              ],
              [
                "Keep ownership clear",
                "Know who controls your profile, domain and connected tools.",
              ],
              [
                "Make the handover useful",
                "Understand what changed and how routine updates are handled.",
              ],
            ].map(([title, body]) => (
              <div key={title}>
                <ShieldCheck size={21} aria-hidden="true" />
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <h2>
            Your business has
            <br />
            its own way of working.
          </h2>
          <p>
            These are the business journeys we plan for. Photography is
            illustrative, not a client endorsement.
          </p>
        </div>
        <div className="three-grid">
          {industries.slice(0, 3).map((industry, i) => (
            <Reveal key={industry.slug}>
              <Link
                className="industry-card"
                href={`/industries/${industry.slug}`}
              >
                <div className="industry-image">
                  <Image
                    src={`/images/${industry.image}`}
                    alt={
                      i === 0
                        ? "A bright dental treatment room"
                        : i === 1
                          ? "A cafe interior"
                          : "A group learning in a lecture room"
                    }
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </div>
                <div>
                  <h3>
                    {
                      [
                        "Clinics and practices",
                        "Cafes, stays and hospitality",
                        "Coaching and learning centres",
                      ][i]
                    }
                    <ArrowUpRight size={20} aria-hidden="true" />
                  </h3>
                  <p>{industry.summary}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section workflow-section">
        <div className="container split-section">
          <div>
            <h2>
              Less copying.
              <br />
              More following through.
            </h2>
            <p className="section-description">
              A saved enquiry can create a lead, a follow-up task and a team
              notification. Your team sees the next action instead of searching
              several inboxes.
            </p>
            <Button asChild variant="outline">
              <Link href="/services/automation">
                Explore workflow support
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </Button>
          </div>
          <div className="workflow-card">
            <h3>A clearer enquiry handoff</h3>
            {[
              [
                Send,
                "Enquiry saved",
                "Keep a record before showing a success message.",
              ],
              [
                ClipboardCheck,
                "Follow-up task created",
                "Make the next action visible to the team.",
              ],
              [
                Workflow,
                "Notification tracked",
                "Distinguish a queued email from one accepted by a provider.",
              ],
            ].map(([Icon, title, body]) => {
              const I = Icon as typeof Send;
              return (
                <div className="workflow-step" key={String(title)}>
                  <span>
                    <I size={21} aria-hidden="true" />
                  </span>
                  <div>
                    <h4>{String(title)}</h4>
                    <p>{String(body)}</p>
                  </div>
                </div>
              );
            })}
            <p className="workflow-note">
              Workflow scope depends on your tools, permissions and provider
              plans.
            </p>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <h2>
            Clear from
            <br />
            the first conversation.
          </h2>
          <p>
            You should understand the work, the dependencies and the cost before
            committing to a project.
          </p>
        </div>
        <div className="three-grid process-grid">
          {[
            [
              "01",
              "Review the starting point",
              "Tell us what you do, what you already have and where the process gets in the way.",
            ],
            [
              "02",
              "Agree a useful scope",
              "Choose the deliverables, responsibilities and review points in writing.",
            ],
            [
              "03",
              "Build, check and hand over",
              "Review the work, complete the agreed checks and take ownership of the next steps.",
            ],
          ].map(([number, title, body]) => (
            <div key={number}>
              <span className="step-number">{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section container faq-section">
        <div>
          <h2>
            Questions worth
            <br />
            asking first.
          </h2>
          <p className="section-description">
            A straightforward answer is more useful than a promise we cannot
            verify.
          </p>
        </div>
        <FAQ />
      </section>
      <section className="cta-section">
        <div className="container">
          <div>
            <h2>
              Let's find your
              <br />
              next useful step.
            </h2>
            <p>
              Tell us about your business. We'll start with the problem, not a
              package.
            </p>
          </div>
          <Button asChild variant="light">
            <Link href="/contact">
              Talk about your project
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
