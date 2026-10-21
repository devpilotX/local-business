import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceTile } from "@/components/site/service-tile";
import { Reveal } from "@/components/site/reveal";
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
          <div className="service-tiles">
            {services.map((service) => (
              <Reveal key={service.id}>
                <ServiceTile serviceId={service.id} />
              </Reveal>
            ))}
            <Reveal>
              <div className="service-tile service-tile--cta">
                <div>
                  <h2>Not sure which one you need?</h2>
                  <p>
                    Describe the problem. We will suggest the smallest useful
                    starting point and explain why.
                  </p>
                </div>
                <Button asChild variant="light">
                  <Link href="/contact">
                    Get a recommendation
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
