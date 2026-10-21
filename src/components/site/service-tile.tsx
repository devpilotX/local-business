import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/content";
import { ServiceArt } from "./service-art";
import type { IndustrySlug, ServiceId } from "./nav-data";

export function ServiceTile({
  serviceId,
  headingLevel: H = "h2",
  place,
}: {
  serviceId: ServiceId;
  headingLevel?: "h2" | "h3";
  place?: IndustrySlug;
}) {
  const item = services.find((service) => service.id === serviceId);
  if (!item) return null;
  return (
    <Link className="service-tile" href={`/services/${item.id}`}>
      <div className="service-tile-visual">
        <ServiceArt id={item.id} place={place} />
      </div>
      <div className="service-tile-body">
        <H>
          {item.title}
          <ArrowUpRight size={18} aria-hidden="true" />
        </H>
        <p>{item.summary}</p>
      </div>
    </Link>
  );
}
