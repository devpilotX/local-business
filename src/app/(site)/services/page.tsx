import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/site/service-card";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/content";
import { JsonLd, webPageSchema } from "@/lib/schema";
import { siteUrl } from "@/lib/config";

const description =
  "Google Business Profile support, business websites, n8n workflows and supporting services for local businesses. Read the scope before requesting a quote.";

export const metadata: Metadata = {
  title: "Services for local businesses",
  description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services for local businesses",
    description,
    url: "/services",
  },
};

export default function Services() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            title: "Services for local businesses",
            description,
            path: "/services",
          }),
          {
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: `${siteUrl}/services/${s.id}`,
            })),
          },
        ]}
      />
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        title="Digital work with a practical purpose."
        lede="Find the service that fits your next step. Each page explains what we help with and what depends on you or a third-party provider."
      />
      <section className="section-sm">
        <div className="container">
          <div className="service-grid">
            {services.map((service) => (
              <ServiceCard key={service.id} serviceId={service.id} />
            ))}
          </div>
        </div>
      </section>
      <section className="section-sm">
        <div className="container">
          <div className="cta-band">
            <div className="cta-band-inner">
              <div>
                <h2>Not sure which one you need?</h2>
                <p>
                  Describe the problem. We will suggest the smallest useful
                  starting point and explain why.
                </p>
              </div>
              <div className="cta-actions">
                <Button asChild variant="light" size="lg">
                  <Link href="/contact">
                    Get a recommendation
                    <ArrowRight size={17} aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
