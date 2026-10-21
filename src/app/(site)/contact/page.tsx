import type { Metadata } from "next";
import { Clock, Mail, Phone, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { Breadcrumbs } from "@/components/site/page-hero";
import { getSettings } from "@/lib/site-data";
import { JsonLd, webPageSchema } from "@/lib/schema";

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
          <li>
            <Mail size={18} aria-hidden="true" />
            <div>
              <strong>Email</strong>
              <a href={`mailto:${settings.contactEmail}`}>
                {settings.contactEmail}
              </a>
            </div>
          </li>
          {settings.phone ? (
            <li>
              <Phone size={18} aria-hidden="true" />
              <div>
                <strong>Phone</strong>
                <a href={`tel:${settings.phone.replace(/[^+0-9]/g, "")}`}>
                  {settings.phone}
                </a>
              </div>
            </li>
          ) : null}
          {settings.businessHours ? (
            <li>
              <Clock size={18} aria-hidden="true" />
              <div>
                <strong>Hours</strong>
                <span>{settings.businessHours}</span>
              </div>
            </li>
          ) : null}
          <li>
            <ShieldCheck size={18} aria-hidden="true" />
            <div>
              <strong>Your details</strong>
              <span>
                Used only to review and reply to this enquiry. No marketing
                list.
              </span>
            </div>
          </li>
        </ul>
        <div className="contact-next">
          <h2>What happens next</h2>
          <ol>
            <li>We read your enquiry and reply by email.</li>
            <li>
              If it is a fit, we agree a short call to review the details.
            </li>
            <li>You receive a written scope before any paid work begins.</li>
          </ol>
        </div>
      </div>
      <ContactForm initialService={service} email={settings.contactEmail} />
    </div>
  );
}
