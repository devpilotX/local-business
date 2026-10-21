// One animated illustration per service. Each composition borrows a familiar
// interface pattern (a Maps listing, a browser build, Magic UI's animated beam
// and animated list, a shadcn calendar, a Tremor-style bar chart) and shows the
// outcome of the service at a glance. Motion is CSS only, pauses off screen via
// the Anatomy Stage observer, and settles on its final frame under reduced
// motion. All art is decorative; the surrounding text carries the meaning.
import {
  Bookmark,
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
import type { ServiceId } from "./nav-data";

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

export function ServiceArt({
  id,
  size = "md",
}: {
  id: ServiceId;
  size?: "md" | "lg";
}) {
  const Art = arts[id];
  return (
    <Stage className={`art art--${size}`}>
      <div className="art-stage" aria-hidden="true">
        <Art />
      </div>
    </Stage>
  );
}
