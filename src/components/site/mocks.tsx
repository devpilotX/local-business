// Small interface compositions used as service visuals. They are decorative
// and hidden from assistive technology; the card text carries the meaning.
import {
  Bookmark,
  CalendarCheck,
  ClipboardCheck,
  Clock,
  Globe,
  Inbox,
  MapPin,
  MessagesSquare,
  Navigation,
  Phone,
  Search,
  Send,
} from "lucide-react";

export function ListingMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-body">
        <div className="mock-row">
          <MapPin size={16} style={{ color: "var(--accent)" }} />
          <span className="mock-title">Your business name</span>
        </div>
        <div className="mock-row mock-sub">
          <Clock size={13} />
          <span>
            <span className="mock-open">Open</span> until 9 pm
          </span>
        </div>
        <div className="mock-bar" style={{ width: "86%" }} />
        <div className="mock-bar" style={{ width: "62%" }} />
        <div className="mock-actions">
          <span>
            <Phone />
            Call
          </span>
          <span>
            <Navigation />
            Directions
          </span>
          <span>
            <Globe />
            Website
          </span>
          <span>
            <Bookmark />
            Save
          </span>
        </div>
      </div>
    </div>
  );
}

export function BrowserMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-head">
        <i />
        <i />
        <i />
        <span className="mock-url">yourbusiness.in</span>
      </div>
      <div className="mock-body">
        <div
          className="mock-bar"
          style={{ width: "70%", height: 11, background: "var(--ink)" }}
        />
        <div className="mock-bar" style={{ width: "90%" }} />
        <div className="mock-bar" style={{ width: "58%" }} />
        <div className="mock-row" style={{ marginTop: 4 }}>
          <span className="mock-cta">Book a visit</span>
          <span className="mock-sub">Opening hours</span>
        </div>
      </div>
    </div>
  );
}

export function FlowMock() {
  return (
    <div className="mock-flow" aria-hidden="true">
      <span className="mock-node">
        <Send size={16} />
        Form
      </span>
      <span className="mock-wire" />
      <span className="mock-node">
        <Inbox size={16} />
        Lead
      </span>
      <span className="mock-wire" />
      <span className="mock-node">
        <ClipboardCheck size={16} />
        Task
      </span>
    </div>
  );
}

export function SearchMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-head">
        <Search size={13} />
        <span>cafe near me</span>
      </div>
      <div className="mock-list">
        <div style={{ background: "var(--accent-soft)" }}>
          <span className="mock-dot" />
          <span className="mock-title" style={{ fontSize: 12.5 }}>
            Your business
          </span>
          <span className="mock-pill">Open now</span>
        </div>
        <div>
          <span className="mock-dot" data-tone="muted" />
          <div className="mock-bar" style={{ width: "50%" }} />
        </div>
        <div>
          <span className="mock-dot" data-tone="muted" />
          <div className="mock-bar" style={{ width: "40%" }} />
        </div>
      </div>
    </div>
  );
}

export function ReportMock() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="mock-head">
        <span>Enquiries by week</span>
        <span className="mock-pill">Sample data</span>
      </div>
      <div className="mock-chart" style={{ paddingTop: 14 }}>
        {[38, 52, 44, 66, 58, 74, 88].map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export function ChannelsMock() {
  return (
    <div className="mock-icon-row" aria-hidden="true">
      <span>
        <CalendarCheck size={20} />
      </span>
      <span>
        <MessagesSquare size={20} />
      </span>
      <span>
        <Inbox size={20} />
      </span>
    </div>
  );
}
