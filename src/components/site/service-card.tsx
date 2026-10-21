import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/content";
import { serviceIcons, type ServiceId } from "./nav-data";

export function ServiceCard({
  serviceId,
  headingLevel: H = "h2",
}: {
  serviceId: ServiceId;
  headingLevel?: "h2" | "h3";
}) {
  const item = services.find((service) => service.id === serviceId);
  if (!item) return null;
  const Icon = serviceIcons[item.icon];
  return (
    <Link className="service-card" href={`/services/${item.id}`}>
      <span className="service-icon">
        <Icon size={19} aria-hidden="true" />
      </span>
      <H>{item.title}</H>
      <p>{item.summary}</p>
      <span className="more">
        Learn more <ArrowRight size={15} aria-hidden="true" />
      </span>
    </Link>
  );
}
