// One animated illustration per service. Each composition borrows a familiar
// interface pattern (a Maps listing, a browser build, Magic UI's animated beam
// and animated list, a shadcn calendar, a Tremor-style bar chart) and shows the
// outcome of the service at a glance. Motion is CSS only, pauses off screen via
// the Anatomy Stage observer, and settles on its final frame under reduced
// motion. All art is decorative; the surrounding text carries the meaning.
import {
  Bookmark,
  FileCheck2,
  ShieldCheck,
  Wrench,
  Utensils,
  GraduationCap,
  Stethoscope,
  CalendarCheck,
  Check,
  ClipboardCheck,
  Clock,
  Globe,
  Heart,
  Image as ImageIcon,
  Inbox,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Search,
  Send,
  UserRound,
} from "lucide-react";
import { Stage } from "@/components/iso/live";
import type { IndustrySlug, ServiceId } from "./nav-data";

function ProfileArt() {
  return (
    <div className="art-card art-profile">
      <div className="art-map" aria-hidden="true">
        <span className="art-road art-road--a" />
        <span className="art-road art-road--b" />
        <span className="art-pin">
          <MapPin size={22} strokeWidth={2.2} />
        </span>
        <span className="art-pulse" />
      </div>
      <div className="art-card-body">
        <strong className="art-title">Your business name</strong>
        <span className="art-line">
          <MapPin size={12} />
          Cafe, 1.2 km away
        </span>
        <span className="art-line art-line--hours">
          <Clock size={12} />
          <b>Open</b> until 9 pm
        </span>
        <div className="art-actions">
          {[
            [Phone, "Call"],
            [Navigation, "Directions"],
            [Globe, "Website"],
            [Bookmark, "Save"],
          ].map(([Icon, text], i) => {
            const I = Icon as typeof Phone;
            return (
              <span
                key={String(text)}
                style={{ "--i": i } as React.CSSProperties}
              >
                <I size={14} />
                {String(text)}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WebsiteArt() {
  return (
    <div className="art-card art-browser">
      <div className="art-chrome">
        <i />
        <i />
        <i />
        <span>yourbusiness.in</span>
      </div>
      <div className="art-page">
        <span className="art-block art-block--nav" />
        <span className="art-block art-block--h1" />
        <span className="art-block art-block--p" />
        <span className="art-block art-block--p2" />
        <span className="art-cta">Book a visit</span>
        <div className="art-tiles">
          <span />
          <span />
          <span />
        </div>
        <span className="art-cursor" />
      </div>
    </div>
  );
}

function AutomationArt() {
  const nodes = [
    [Send, "Form"],
    [Inbox, "Lead"],
    [ClipboardCheck, "Task"],
  ] as const;
  return (
    <div className="art-flow">
      {nodes.map(([Icon, text], i) => (
        <div className="art-flow-step" key={text}>
          <span
            className="art-node"
            style={{ "--i": i } as React.CSSProperties}
          >
            <Icon size={18} />
            {text}
          </span>
          {i < nodes.length - 1 ? (
            <span
              className="art-beam"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span />
            </span>
          ) : null}
        </div>
      ))}
      <span className="art-flow-note">
        <Check size={12} /> Follow-up created automatically
      </span>
    </div>
  );
}

function SearchArt() {
  return (
    <div className="art-card art-search">
      <div className="art-searchbar">
        <Search size={14} />
        <span className="art-typed">cafe near me</span>
      </div>
      <div className="art-results">
        <div className="art-result" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="art-dot art-dot--muted" />
          <span className="art-bar" style={{ width: "46%" }} />
        </div>
        <div
          className="art-result art-result--you"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <span className="art-dot" />
          <span className="art-result-text">
            <strong>Your business</strong>
            <span>
              <Check size={11} /> Hours <Check size={11} /> Photos{" "}
              <Check size={11} /> Website
            </span>
          </span>
        </div>
        <div className="art-result" style={{ "--i": 2 } as React.CSSProperties}>
          <span className="art-dot art-dot--muted" />
          <span className="art-bar" style={{ width: "38%" }} />
        </div>
      </div>
    </div>
  );
}

function BookingArt() {
  const days = Array.from({ length: 14 }, (_, i) => i + 8);
  return (
    <div className="art-card art-booking">
      <div className="art-booking-head">
        <CalendarCheck size={14} />
        <strong>Request an appointment</strong>
      </div>
      <div className="art-days">
        {days.map((d) => (
          <span key={d} data-picked={d === 17 ? "" : undefined}>
            {d}
          </span>
        ))}
      </div>
      <div className="art-slots">
        <span>10:00</span>
        <span data-picked="">11:30</span>
        <span>15:00</span>
      </div>
      <span className="art-status">
        <Clock size={12} /> Requested, awaiting confirmation
      </span>
    </div>
  );
}

function SocialArt() {
  return (
    <div className="art-card art-social">
      <div className="art-social-head">
        <span className="art-avatar">
          <UserRound size={16} />
        </span>
        <span>
          <strong>yourbusiness</strong>
          <em>Hours and link updated</em>
        </span>
      </div>
      <div className="art-posts">
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties}>
            <ImageIcon size={16} />
          </span>
        ))}
      </div>
      <div className="art-social-foot">
        <span className="art-like">
          <Heart size={13} /> Saved
        </span>
        <span className="art-dm">
          <MessageCircle size={13} /> New enquiry
          <Inbox size={13} />
        </span>
      </div>
    </div>
  );
}

function MessagingArt() {
  return (
    <div className="art-card art-chat">
      <div className="art-chat-head">
        <span className="art-avatar art-avatar--sm">
          <MessageCircle size={13} />
        </span>
        <strong>Messages</strong>
      </div>
      <div className="art-bubbles">
        <span
          className="art-bubble art-bubble--in"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          Hi, do you have a table for four tonight?
        </span>
        <span
          className="art-bubble art-bubble--out"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          Thanks for your message. The team replies during opening hours.
        </span>
        <span className="art-chip" style={{ "--i": 2 } as React.CSSProperties}>
          <Check size={11} /> Assigned to front desk
        </span>
      </div>
    </div>
  );
}

function ReportingArt() {
  const bars = [34, 52, 44, 68, 58, 76, 88];
  return (
    <div className="art-card art-report">
      <div className="art-report-head">
        <strong>Enquiries by week</strong>
        <span>Sample data</span>
      </div>
      <div className="art-chart">
        {bars.map((h, i) => (
          <span
            key={i}
            style={{ "--h": `${h}%`, "--i": i } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="art-report-foot">
        <span>
          <i data-tone="accent" /> New
        </span>
        <span>
          <i /> Earlier weeks
        </span>
      </div>
    </div>
  );
}

const arts: Record<ServiceId, () => React.ReactElement> = {
  "google-business-profile": ProfileArt,
  websites: WebsiteArt,
  automation: AutomationArt,
  "local-seo": SearchArt,
  booking: BookingArt,
  "social-media": SocialArt,
  messaging: MessagingArt,
  reporting: ReportingArt,
};

const delay = (i: number) => ({ "--i": i }) as React.CSSProperties;

function ClinicArt() {
  return (
    <div className="art-card art-pad">
      <div className="art-head">
        <Stethoscope size={14} />
        <strong>Request an appointment</strong>
      </div>
      <div className="art-chips">
        <span>General check-up</span>
        <span data-picked="">Dental cleaning</span>
        <span>Follow-up</span>
      </div>
      <span className="art-field">Your name</span>
      <span className="art-field">Phone or email</span>
      <span className="art-cta art-cta--wide">Send request</span>
      <span className="art-note art-anim-fade" style={delay(3)}>
        <ShieldCheck size={12} /> Only what we need to call you back
      </span>
    </div>
  );
}

function HospitalityArt() {
  const rows = ["Breakfast", "Lunch", "Coffee and tea", "Desserts"];
  return (
    <div className="art-card art-pad">
      <div className="art-head art-head--split">
        <span>
          <Utensils size={14} />
          <strong>Menu</strong>
        </span>
        <span className="art-open">
          <b>Open</b> until 10 pm
        </span>
      </div>
      <div className="art-menu">
        {rows.map((r, i) => (
          <span key={r} className="art-anim-rise" style={delay(i)}>
            {r}
            <i />
            <em />
          </span>
        ))}
      </div>
      <div className="art-row-actions">
        <span className="art-cta">
          <Navigation size={12} /> Directions
        </span>
        <span className="art-ghost">
          <Phone size={12} /> Call
        </span>
      </div>
    </div>
  );
}

function CoachingArt() {
  const rows = [
    ["Mathematics", "Class 10", "Mon, Wed"],
    ["Physics", "Class 12", "Tue, Thu"],
    ["Spoken English", "All levels", "Sat"],
  ];
  return (
    <div className="art-card art-pad">
      <div className="art-head">
        <GraduationCap size={14} />
        <strong>Courses and batches</strong>
      </div>
      <div className="art-table">
        {rows.map(([course, level, days], i) => (
          <span
            key={course}
            className="art-anim-rise"
            data-picked={i === 1 ? "" : undefined}
            style={delay(i)}
          >
            <strong>{course}</strong>
            <em>{level}</em>
            <em>{days}</em>
          </span>
        ))}
      </div>
      <span className="art-cta">Enquire about Physics</span>
    </div>
  );
}

function LocalServicesArt() {
  return (
    <div className="art-area">
      <div className="art-radius">
        <span className="art-ring" />
        <span className="art-ring art-ring--2" />
        <span className="art-home">
          <Wrench size={16} />
        </span>
        {[
          [18, 30],
          [72, 22],
          [64, 74],
          [26, 70],
        ].map(([x, y], i) => (
          <span
            key={i}
            className="art-mini-pin art-anim-pop"
            style={{ left: `${x}%`, top: `${y}%`, ...delay(i) }}
          >
            <MapPin size={13} />
          </span>
        ))}
      </div>
      <div
        className="art-card art-pad art-quote art-anim-rise"
        style={delay(4)}
      >
        <strong>Quote request</strong>
        <span>Kitchen tap repair</span>
        <span className="art-chip">
          <Check size={11} /> Assigned
        </span>
      </div>
    </div>
  );
}

function PricingArt() {
  const lines = [
    "Deliverables",
    "Responsibilities",
    "Review rounds",
    "Timetable",
    "Payment schedule",
  ];
  return (
    <div className="art-card art-pad art-doc">
      <div className="art-head">
        <FileCheck2 size={14} />
        <strong>Written scope</strong>
      </div>
      <div className="art-checks">
        {lines.map((l, i) => (
          <span key={l} className="art-anim-rise" style={delay(i)}>
            <Check size={12} />
            {l}
            <i />
          </span>
        ))}
      </div>
      <span className="art-stamp art-anim-pop" style={delay(6)}>
        Approved before work starts
      </span>
    </div>
  );
}

const industryArts: Record<IndustrySlug, () => React.ReactElement> = {
  clinics: ClinicArt,
  hospitality: HospitalityArt,
  coaching: CoachingArt,
  "local-services": LocalServicesArt,
};

function Frame({
  size,
  children,
}: {
  size: "md" | "lg";
  children: React.ReactNode;
}) {
  return (
    <Stage className={`art art--${size}`}>
      <div className="art-stage" aria-hidden="true">
        {children}
      </div>
    </Stage>
  );
}

type Size = { size?: "md" | "lg" };

export function ServiceArt({ id, size = "md" }: { id: ServiceId } & Size) {
  const Art = arts[id];
  return (
    <Frame size={size}>
      <Art />
    </Frame>
  );
}

export function IndustryArt({
  slug,
  size = "md",
}: { slug: IndustrySlug } & Size) {
  const Art = industryArts[slug];
  return (
    <Frame size={size}>
      <Art />
    </Frame>
  );
}

export function ScopeArt({ size = "lg" }: Size) {
  return (
    <Frame size={size}>
      <PricingArt />
    </Frame>
  );
}
