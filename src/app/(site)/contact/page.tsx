import type { Metadata } from "next";
import { Clock, LifeBuoy, Mail, PackageCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/whatsapp";
import { mailboxes } from "@/lib/config";
import { ContactForm } from "@/components/site/contact-form";
import { Breadcrumbs } from "@/components/site/page-hero";
import { getSettings } from "@/lib/site-data";
import { JsonLd, webPageSchema } from "@/lib/schema";
import { replyTime, whatsappHref } from "@/lib/contact";

const description =
  "Send a project enquiry about Google Business Profile, a business website or an everyday workflow. Submitting the form does not start paid work.";

export const metadata: Metadata = {
  title: "Contact Techcyme",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Techcyme", description, url: "/contact" },
};

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const settings = await getSettings();
  const { service } = await searchParams;
  const whatsapp = whatsappHref(
    settings.whatsapp,
    "Hello Techcyme, I would like to discuss a project.",
  );
  return (
    <div className="container contact-layout">
      <JsonLd
        data={{
          ...webPageSchema({
            title: "Contact Techcyme",
            description,
            path: "/contact",
          }),
          "@type": "ContactPage",
        }}
      />
      <div className="contact-aside">
        <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
        <h1>Tell us what is getting in the way.</h1>
        <p className="lede">
          A missing business profile, an unclear website or enquiries that need
          a better home. Start with the part you want to improve.
        </p>
        <ul className="contact-details">
          {whatsapp ? (
            <li>
              <WhatsAppIcon size={18} />
              <div>
                <strong>WhatsApp</strong>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  {settings.whatsapp}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <span className="contact-sub">
                  Messages only, no calls. Usually the fastest way to reach us.
                </span>
              </div>
            </li>
          ) : null}
          {[
            [Mail, "New projects", settings.contactEmail, replyTime],
            [
              LifeBuoy,
              "Existing clients",
              mailboxes.support,
              "Questions about live work and support.",
            ],
            [
              PackageCheck,
              "Delivery and handover",
              mailboxes.delivery,
              "Files, access and cancellations.",
            ],
            [
              Mail,
              "General and privacy",
              mailboxes.contact,
              "Anything else, including data requests.",
            ],
          ].map(([Icon, label, address, note]) => {
            const I = Icon as typeof Mail;
            return (
              <li key={String(label)}>
                <I size={18} aria-hidden="true" />
                <div>
                  <strong>{String(label)}</strong>
                  <a href={`mailto:${String(address)}`}>{String(address)}</a>
                  <span className="contact-sub">{String(note)}</span>
                </div>
              </li>
            );
          })}
          {settings.businessHours ? (
            <li>
              <Clock size={18} aria-hidden="true" />
              <div>
                <strong>Hours</strong>
                <span>{settings.businessHours}</span>
              </div>
            </li>
          ) : null}
        </ul>
        <div className="contact-next">
          <h2>What happens next</h2>
          <ol>
            <li>We read your enquiry and reply within 1 business day.</li>
            <li>
              If it is a fit, we agree a short call to review the details.
            </li>
            <li>You receive a written scope and a fixed price.</li>
            <li>You pay 50% to start and 50% on delivery.</li>
          </ol>
        </div>
      </div>
      <ContactForm initialService={service} email={settings.contactEmail} />
    </div>
  );
}
