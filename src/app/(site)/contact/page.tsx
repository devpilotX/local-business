import type { Metadata } from "next";
import { Mail, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/site/contact-form";
import { getSettings } from "@/lib/site-data";
export const metadata: Metadata = {
  title: "Talk about your project",
  description:
    "Send a project enquiry about local visibility, a business website or an everyday workflow. No paid work begins from submitting this form.",
  alternates: { canonical: "/contact" },
};
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const settings = await getSettings();
  const { service } = await searchParams;
  return (
    <section className="section container contact-layout">
      <div>
        <h1>
          Tell us what's
          <br />
          getting in the way.
        </h1>
        <p className="section-description">
          A missing business profile, an unclear website or enquiries that need
          a better home. Start with the part you want to improve.
        </p>
        <a className="contact-email" href={`mailto:${settings.contactEmail}`}>
          <Mail aria-hidden="true" size={21} />
          {settings.contactEmail}
        </a>
        {settings.phone && (
          <p>
            <a href={`tel:${settings.phone.replace(/[^+0-9]/g, "")}`}>
              {settings.phone}
            </a>
          </p>
        )}
        {settings.businessHours && <p>{settings.businessHours}</p>}
        <div className="contact-note">
          <ShieldCheck size={21} aria-hidden="true" />
          <p>
            We use these details to review your enquiry and contact you about
            it. No marketing subscription is added.
          </p>
        </div>
      </div>
      <ContactForm initialService={service} email={settings.contactEmail} />
    </section>
  );
}
