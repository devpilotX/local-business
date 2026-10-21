import type { Metadata } from "next";
import { ServiceCard } from "@/components/site/service-card";
import { services } from "@/lib/content";
export const metadata: Metadata = {
  title: "Services for local businesses",
  description:
    "Explore profile support, business websites, workflows and supporting digital services. Read the scope before requesting a quote.",
  alternates: { canonical: "/services" },
};
export default function Services() {
  return (
    <>
      <section className="page-intro container">
        <h1>
          Digital work with
          <br />a practical purpose.
        </h1>
        <p>
          Find the service that fits your next step. Each scope explains what we
          can help with and what depends on you or a third-party provider.
        </p>
      </section>
      <section className="container section services-grid">
        {services.map((service) => (
          <ServiceCard key={service.id} serviceId={service.id} />
        ))}
      </section>
    </>
  );
}
