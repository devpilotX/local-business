import {
  CalendarCheck,
  ChartNoAxesCombined,
  Coffee,
  GraduationCap,
  MapPin,
  MessageCircle,
  MessagesSquare,
  PanelsTopLeft,
  Search,
  Stethoscope,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { industries, services } from "@/lib/content";

export const serviceIcons: Record<
  (typeof services)[number]["icon"],
  LucideIcon
> = {
  MapPin,
  PanelsTopLeft,
  Workflow,
  Search,
  CalendarCheck,
  MessageCircle,
  MessagesSquare,
  ChartNoAxesCombined,
};

export type ServiceId = (typeof services)[number]["id"];
export type IndustrySlug = (typeof industries)[number]["slug"];

export const serviceShort: Record<ServiceId, string> = {
  "google-business-profile": "Accurate details on Google Maps and Search.",
  websites: "Fast pages that explain what you do.",
  automation: "Enquiries that create their own follow-ups.",
  "local-seo": "Structure that helps local search understand you.",
  booking: "Clear appointment requests, no confusion.",
  "social-media": "Organised profiles and enquiry handoffs.",
  messaging: "WhatsApp routing with sensible limits.",
  reporting: "One report the team actually reads.",
};

export const industryNav: Record<
  IndustrySlug,
  { label: string; icon: LucideIcon; short: string }
> = {
  clinics: {
    label: "Clinics and practices",
    icon: Stethoscope,
    short: "Trust, services and appointment requests.",
  },
  hospitality: {
    label: "Cafes and hospitality",
    icon: Coffee,
    short: "Menus, hours, directions and bookings.",
  },
  coaching: {
    label: "Coaching and learning",
    icon: GraduationCap,
    short: "Courses, schedules and enrolment enquiries.",
  },
  "local-services": {
    label: "Local services",
    icon: Wrench,
    short: "Service areas and quote requests.",
  },
};

export const coreServices: ServiceId[] = [
  "google-business-profile",
  "websites",
  "automation",
];
