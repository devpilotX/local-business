import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  PanelsTopLeft,
  Workflow,
  Search,
  CalendarCheck,
  MessageCircle,
  MessagesSquare,
  ChartNoAxesCombined,
} from "lucide-react";
import { services } from "@/lib/content";
const icons = [
  MapPin,
  PanelsTopLeft,
  Workflow,
  Search,
  CalendarCheck,
  MessageCircle,
  MessagesSquare,
  ChartNoAxesCombined,
];
export function ServiceCard({ index }: { index: number }) {
  const item = services[index];
  const Icon = icons[index];
  return (
    <article className="service-card">
      <span className="service-icon">
        <Icon size={25} aria-hidden="true" />
      </span>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <Link href={`/services/${item.id}`}>
        See what's included
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
    </article>
  );
}
