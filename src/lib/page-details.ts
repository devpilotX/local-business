// Structured, short-form content shown above the long-form page text.
// The long text stays editable in the CRM; these summaries live in code so the
// page layout and illustrations stay consistent.
import {
  BadgeCheck,
  Bell,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ClipboardCheck,
  Clock,
  Code,
  FileText,
  Gauge,
  HelpCircle,
  Image as ImageIcon,
  Inbox,
  KeyRound,
  MapPin,
  MapPinned,
  MessageCircle,
  PanelsTopLeft,
  Plug,
  RefreshCw,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Stethoscope,
  Table2,
  UserRound,
  Users,
  Utensils,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { IndustrySlug, ServiceId } from "@/components/site/nav-data";

export type Item = { icon: LucideIcon; title: string; body: string };
export type Step = { title: string; body: string };

export interface Cta {
  title: string;
  body: string;
}

export interface ServiceDetail {
  cta: Cta;
  includes: Item[];
  steps: Step[];
  notes: string[];
  related: ServiceId[];
}

export const serviceDetails: Record<ServiceId, ServiceDetail> = {
  "google-business-profile": {
    cta: {
      title: "Is your profile telling the right story?",
      body: "Send us your business name. We review what Google shows today and what to fix first.",
    },
    includes: [
      {
        icon: BadgeCheck,
        title: "Claim or create",
        body: "Set up an eligible profile and prepare for Google's verification.",
      },
      {
        icon: Clock,
        title: "Accurate details",
        body: "Name, category, hours, service area and contact details checked.",
      },
      {
        icon: ImageIcon,
        title: "Photos and services",
        body: "Clear photos and a plain description of what you offer.",
      },
      {
        icon: KeyRound,
        title: "Stays yours",
        body: "The profile remains in your business account, with access documented.",
      },
    ],
    steps: [
      {
        title: "Review",
        body: "We check eligibility, ownership and what is listed today.",
      },
      {
        title: "Update",
        body: "We correct details and prepare content for your approval.",
      },
      {
        title: "Hand over",
        body: "You get a summary of changes and a checklist to keep it current.",
      },
    ],
    notes: [
      "Google Business Profile is free. Our fee covers the agreed work only.",
      "Google controls verification and ranking. No position is guaranteed, and reviews are never bought or invented.",
    ],
    related: ["local-seo", "websites", "social-media"],
  },
  websites: {
    cta: {
      title: "Planning a new website?",
      body: "Tell us what visitors need to find. We reply with suggested pages and a written scope.",
    },
    includes: [
      {
        icon: PanelsTopLeft,
        title: "Pages with a clear job",
        body: "Services, business details and a next step on every page.",
      },
      {
        icon: Smartphone,
        title: "Fast on any phone",
        body: "Responsive layouts, readable type and simple navigation.",
      },
      {
        icon: Send,
        title: "Enquiries that arrive",
        body: "Validated forms that save to a real destination.",
      },
      {
        icon: Search,
        title: "Search basics built in",
        body: "Clear page titles, descriptions and a sitemap search engines can read.",
      },
    ],
    steps: [
      {
        title: "Plan",
        body: "Agree the visitor journeys, the pages and who supplies content.",
      },
      {
        title: "Build",
        body: "Design and build the pages, then test forms and mobile layouts.",
      },
      {
        title: "Launch",
        body: "Go live with a checklist and a handover for routine updates.",
      },
    ],
    notes: [
      "You supply or approve facts, prices and photos. No invented reviews, awards or client logos.",
      "Domain, hosting and maintenance costs are stated in the quote, not added after launch.",
    ],
    related: ["google-business-profile", "booking", "automation"],
  },
  automation: {
    cta: {
      title: "Which task do you repeat every day?",
      body: "Describe it in a few lines. We tell you whether a workflow is worth building.",
    },
    includes: [
      {
        icon: Workflow,
        title: "Enquiry to follow-up",
        body: "A new enquiry creates a lead and a task automatically.",
      },
      {
        icon: Bell,
        title: "Team notifications",
        body: "The right person is told when something needs action.",
      },
      {
        icon: RefreshCw,
        title: "Less retyping",
        body: "Data moves between supported tools without copy and paste.",
      },
      {
        icon: ShieldCheck,
        title: "Failures you can see",
        body: "Duplicates are handled and errors are reported, not lost.",
      },
    ],
    steps: [
      {
        title: "Map",
        body: "Write down one repeated task and where it gets stuck.",
      },
      {
        title: "Connect",
        body: "Build the workflow in n8n, an automation tool, and test it with sample data.",
      },
      {
        title: "Monitor",
        body: "Hand over with ownership, documentation and agreed support.",
      },
    ],
    notes: [
      "Scope depends on your tools, access permissions and provider plans.",
      "A person stays in the loop for decisions. A prototype is not an unattended service.",
    ],
    related: ["messaging", "reporting", "websites"],
  },
  "local-seo": {
    cta: {
      title: "Not sure why customers cannot find you?",
      body: "We check your website, profile and listings and explain the gaps in plain language.",
    },
    includes: [
      {
        icon: MapPin,
        title: "Consistent details",
        body: "Name, address and phone match across your website and profile.",
      },
      {
        icon: FileText,
        title: "Useful local pages",
        body: "Pages that explain what you offer and where you work.",
      },
      {
        icon: Code,
        title: "Readable by search engines",
        body: "Your business type, hours and services marked up so search results can show them.",
      },
      {
        icon: Gauge,
        title: "Technical basics",
        body: "Fast pages, clean URLs, a sitemap and working links.",
      },
    ],
    steps: [
      {
        title: "Audit",
        body: "Check your website, profile and listings for gaps and conflicts.",
      },
      {
        title: "Fix",
        body: "Correct details and improve the pages that matter most.",
      },
      {
        title: "Review",
        body: "Agree what to keep current and how to measure it.",
      },
    ],
    notes: [
      "Search engines decide rankings. We improve information and structure, not positions.",
      "We do not create near-identical pages for every town to chase keywords.",
    ],
    related: ["google-business-profile", "websites", "reporting"],
  },
  booking: {
    cta: {
      title: "Want fewer back-and-forth messages?",
      body: "Tell us how appointments work today. We suggest a request journey that fits it.",
    },
    includes: [
      {
        icon: CalendarCheck,
        title: "Clear request journey",
        body: "Visitors choose a service and time without guessing.",
      },
      {
        icon: Clock,
        title: "Honest status",
        body: "A request shows as pending until someone confirms it.",
      },
      {
        icon: Plug,
        title: "Scheduling integration",
        body: "Connect to a supported scheduling tool where needed.",
      },
      {
        icon: Bell,
        title: "Reminders",
        body: "Agreed confirmation and reminder messages for both sides.",
      },
    ],
    steps: [
      {
        title: "Choose",
        body: "Decide between a request form and a scheduling integration.",
      },
      {
        title: "Build",
        body: "Create the journey and test full calendars, changes and downtime.",
      },
      {
        title: "Go live",
        body: "Launch with clear confirmation and cancellation information.",
      },
    ],
    notes: [
      "We collect only what is needed to arrange the appointment.",
      "Scheduling tools may charge by user, location or volume. Those costs are agreed first.",
    ],
    related: ["websites", "messaging", "automation"],
  },
  "social-media": {
    cta: {
      title: "Are your social profiles up to date?",
      body: "List the channels you use. We review them and agree who replies and how quickly.",
    },
    includes: [
      {
        icon: UserRound,
        title: "Accurate profiles",
        body: "Bio, hours, links and contact options kept current.",
      },
      {
        icon: ImageIcon,
        title: "Content plan",
        body: "A simple routine for posts using material you may publish.",
      },
      {
        icon: MessageCircle,
        title: "Replies handled",
        body: "Messages that need an answer reach the right person.",
      },
      {
        icon: KeyRound,
        title: "Account access",
        body: "Admin access agreed, documented and owned by the business.",
      },
    ],
    steps: [
      {
        title: "Review",
        body: "Check each channel for outdated details and who has access.",
      },
      {
        title: "Organise",
        body: "Update profiles and agree who replies and how quickly.",
      },
      {
        title: "Hand over",
        body: "Document access, posting routines and responsibilities.",
      },
    ],
    notes: [
      "We do not buy followers, likes or reviews.",
      "Reports show what happened on each channel, without inflated claims.",
    ],
    related: ["google-business-profile", "messaging", "local-seo"],
  },
  messaging: {
    cta: {
      title: "Messages getting missed?",
      body: "Tell us which channel customers use. We plan routing that respects their consent.",
    },
    includes: [
      {
        icon: MessageCircle,
        title: "Routed messages",
        body: "Each enquiry reaches the person who can answer it.",
      },
      {
        icon: Send,
        title: "Agreed replies",
        body: "An authorised acknowledgement while the team is busy.",
      },
      {
        icon: ClipboardCheck,
        title: "Follow-up tasks",
        body: "A message can create a task so nothing is forgotten.",
      },
      {
        icon: ShieldCheck,
        title: "Consent respected",
        body: "Only people who contacted you, never scraped lists.",
      },
    ],
    steps: [
      {
        title: "Agree the purpose",
        body: "Choose the channel, provider and the messages it may send.",
      },
      {
        title: "Build",
        body: "Set up routing, replies and limits, then test the failure path.",
      },
      {
        title: "Hand over",
        body: "Document who owns the account and how to pause it.",
      },
    ],
    notes: [
      "A personal account cannot be turned into an unrestricted messaging service.",
      "Business messaging providers set their own rules and charges.",
    ],
    related: ["automation", "booking", "social-media"],
  },
  reporting: {
    cta: {
      title: "What do you need to know each week?",
      body: "Send us the questions. We work out which data can answer them reliably.",
    },
    includes: [
      {
        icon: Inbox,
        title: "Enquiry overview",
        body: "Where enquiries came from and which ones need follow-up.",
      },
      {
        icon: Table2,
        title: "Project status",
        body: "What is due, what is done and what is waiting on a decision.",
      },
      {
        icon: Gauge,
        title: "Defined measures",
        body: "Every number has a source and a written definition.",
      },
      {
        icon: KeyRound,
        title: "Controlled access",
        body: "Only the people who need the report can see it.",
      },
    ],
    steps: [
      {
        title: "Ask",
        body: "List the questions the team needs to answer each week.",
      },
      {
        title: "Connect",
        body: "Bring agreed data from supported tools into one view.",
      },
      {
        title: "Maintain",
        body: "Hand over how the report updates and who keeps it accurate.",
      },
    ],
    notes: [
      "Reports use information your business has permission to process.",
      "We do not infer revenue or causes the data cannot support.",
    ],
    related: ["automation", "local-seo", "websites"],
  },
};

export interface IndustryDetail {
  cta: Cta;
  needs: Item[];
  notes: string[];
  services: ServiceId[];
}

export const industryDetails: Record<IndustrySlug, IndustryDetail> = {
  clinics: {
    cta: {
      title: "Planning a clearer website for your practice?",
      body: "Tell us about your services and how appointments work. We reply with a written scope.",
    },
    needs: [
      {
        icon: Stethoscope,
        title: "Services explained",
        body: "What the practice offers, in plain language.",
      },
      {
        icon: MapPin,
        title: "Location and access",
        body: "Address, opening hours and accessibility information.",
      },
      {
        icon: CalendarCheck,
        title: "Appointment requests",
        body: "A short form that asks only what is needed to call back.",
      },
      {
        icon: ShieldCheck,
        title: "Privacy first",
        body: "No medical histories or urgent symptoms in a general form.",
      },
    ],
    notes: [
      "Clinical claims and practitioner details are approved by the practice before publishing.",
      "We do not provide medical triage, treatment advice or patient record systems.",
    ],
    services: ["websites", "google-business-profile", "booking"],
  },
  hospitality: {
    cta: {
      title: "Want guests to find your menu and hours first time?",
      body: "Tell us where people look today. We plan the pages and profile updates that help.",
    },
    needs: [
      {
        icon: Utensils,
        title: "Menu and prices",
        body: "Current menus that are easy to read on a phone.",
      },
      {
        icon: Clock,
        title: "Hours and directions",
        body: "Opening times, location and how to get there.",
      },
      {
        icon: CalendarCheck,
        title: "Bookings or walk-ins",
        body: "Clear about whether a table is requested or confirmed.",
      },
      {
        icon: HelpCircle,
        title: "Fewer repeat calls",
        body: "Common questions answered before people pick up the phone.",
      },
    ],
    notes: [
      "A booking is shown as confirmed only when a real system confirms it.",
      "Menus, prices and hours need one person who keeps them current.",
    ],
    services: ["google-business-profile", "websites", "messaging"],
  },
  coaching: {
    cta: {
      title: "Want enquiries that name the right course?",
      body: "Share your courses and batches. We plan pages and an enquiry form around them.",
    },
    needs: [
      {
        icon: BookOpen,
        title: "Courses at a glance",
        body: "Subjects, levels, duration and format side by side.",
      },
      {
        icon: CalendarDays,
        title: "Schedules and batches",
        body: "Start dates and timings that are easy to compare.",
      },
      {
        icon: Send,
        title: "Organised enquiries",
        body: "Each enquiry records the course and preferred contact.",
      },
      {
        icon: Users,
        title: "Learners and families",
        body: "Clear next steps for students and for parents.",
      },
    ],
    notes: [
      "No guaranteed results or success rates you cannot verify.",
      "Fees and schedules are approved by your team before they are published.",
    ],
    services: ["websites", "automation", "messaging"],
  },
  "local-services": {
    cta: {
      title: "Want quote requests with the details you need?",
      body: "Tell us your services and area. We plan the pages and the follow-up behind them.",
    },
    needs: [
      {
        icon: Wrench,
        title: "What you do",
        body: "Each service with what is and is not included.",
      },
      {
        icon: MapPinned,
        title: "Where you work",
        body: "A clear service area so customers know you cover them.",
      },
      {
        icon: FileText,
        title: "Quote requests",
        body: "A form that collects the details needed to quote.",
      },
      {
        icon: ClipboardCheck,
        title: "Organised follow-up",
        body: "Each request becomes a task with an owner.",
      },
    ],
    notes: [
      "Prices or ranges are shown only when you approve them.",
      "Service area pages describe real coverage, not repeated keyword pages.",
    ],
    services: ["google-business-profile", "websites", "automation"],
  },
};

export const principles: Item[] = [
  {
    icon: FileText,
    title: "Written scope first",
    body: "Deliverables, dependencies and cost are agreed in writing before work starts.",
  },
  {
    icon: KeyRound,
    title: "Accounts stay yours",
    body: "Your domain, profile and tools remain in the business name, with a documented handover.",
  },
  {
    icon: Scale,
    title: "Honest about limits",
    body: "Google controls rankings. We improve the information and structure, without promising positions.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by default",
    body: "Forms collect only what is needed, and personal data stays out of logs and exports.",
  },
];

export const processSteps: Step[] = [
  {
    title: "Review the starting point",
    body: "Tell us what you do, what you already have and where enquiries or updates get stuck.",
  },
  {
    title: "Agree a useful scope",
    body: "Choose the deliverables, responsibilities and review points. Everything is written down.",
  },
  {
    title: "Build, check and hand over",
    body: "We complete the agreed checks, walk you through the result and hand over access.",
  },
];

export const aboutGaps: Item[] = [
  {
    icon: Clock,
    title: "Wrong details online",
    body: "Old hours or a missing profile send customers somewhere else.",
  },
  {
    icon: HelpCircle,
    title: "Unanswered questions",
    body: "A website that leaves out the service, the location or the next step.",
  },
  {
    icon: Inbox,
    title: "Lost enquiries",
    body: "Messages buried between a form, a phone and a busy inbox.",
  },
];

export const aboutNeeds: string[] = [
  "Accurate business information and photos you are allowed to use.",
  "One person who can review and approve the work.",
  "Access to the accounts involved, agreed in advance and removable later.",
];

export const pricingSteps: Step[] = [
  {
    title: "Tell us what you need",
    body: "Describe the business, what exists today and the problem to solve.",
  },
  {
    title: "Receive a written scope",
    body: "Deliverables, responsibilities, review rounds, timetable and payment schedule.",
  },
  {
    title: "Approve and start",
    body: "Approve the scope and pay the first instalment. Work begins the same week.",
  },
];

export const pricingFactors: {
  icon: LucideIcon;
  title: string;
  factors: string[];
}[] = [
  {
    icon: MapPin,
    title: "Local visibility",
    factors: [
      "New profile or a review of an existing one",
      "Number of locations",
      "Photos and descriptions ready to use",
    ],
  },
  {
    icon: PanelsTopLeft,
    title: "Websites",
    factors: [
      "Number of pages",
      "Whether content is ready",
      "Forms, booking or other integrations",
    ],
  },
  {
    icon: Workflow,
    title: "Workflows",
    factors: [
      "Tools to connect",
      "Provider plans and limits",
      "Error handling and monitoring",
    ],
  },
];

export const pricingNotes: string[] = [
  "Google Business Profile is free. Any fee covers the agreed work.",
  "Domain, hosting and third-party tools are listed in the quote, not added later.",
  "If the scope changes, cost and timing are agreed before work continues.",
  "Prices are in Indian rupees. Applicable taxes, if any, are shown on the quote.",
];

export const paymentPlan: Step[] = [
  {
    title: "50% when you approve the scope",
    body: "The first instalment confirms the project and work begins.",
  },
  {
    title: "50% on delivery",
    body: "The second instalment is due when the agreed work is delivered.",
  },
];

export interface Work {
  name: string;
  url: string;
  image: string;
  alt: string;
  summary: string;
  tags: string[];
}

export const work: Work[] = [
  {
    name: "Paisa Reality",
    url: "https://paisareality.com",
    image: "/images/work-paisareality.jpg",
    alt: "Paisa Reality homepage showing today's gold price for a selected city",
    summary:
      "Daily gold, silver and fuel prices for 50 cities, plus government schemes, scholarships and money calculators.",
    tags: ["Website", "Search visibility", "Admin and email centre"],
  },
  {
    name: "Campus Voice",
    url: "https://campusvoice.me",
    image: "/images/work-campusvoice.jpg",
    alt: "Campus Voice homepage with a college search and attendance tools",
    summary:
      "Free tools, scholarships and hackathon listings for college students in India, refreshed automatically.",
    tags: ["Web platform", "Automated listings", "Email workflows"],
  },
];
