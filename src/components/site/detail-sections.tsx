import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import type { Item, Step } from "@/lib/page-details";

export function Glance({
  items,
  columns = 4,
}: {
  items: Item[];
  columns?: 3 | 4;
}) {
  return (
    <div className={columns === 3 ? "glance glance--3" : "glance"}>
      {items.map(({ icon: Icon, title, body }) => (
        <Reveal key={title} className="glance-card" as="article">
          <span className="glance-icon">
            <Icon size={19} aria-hidden="true" />
          </span>
          <h3>{title}</h3>
          <p>{body}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function Flow({ steps }: { steps: Step[] }) {
  return (
    <ol className="flow">
      {steps.map((step, i) => (
        <Reveal key={step.title} as="li">
          <span className="flow-num" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3>
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p>{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function Notes({ notes }: { notes: string[] }) {
  return (
    <ul className="notes">
      {notes.map((note) => (
        <li key={note}>
          <Info size={18} aria-hidden="true" />
          {note}
        </li>
      ))}
    </ul>
  );
}

export function Details({
  body,
  title = "Read the full scope",
  hint = "Responsibilities, limits and what we need from you.",
}: {
  body: string;
  title?: string;
  hint?: string;
}) {
  return (
    <details className="details-block">
      <summary>
        <span>
          {title}
          <small>{hint}</small>
        </span>
        <span className="faq-icon" aria-hidden="true" />
      </summary>
      <div className="prose">
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </details>
  );
}

export function Block({
  title,
  lede,
  children,
  alt = false,
  id,
}: {
  title: string;
  lede?: string;
  children: React.ReactNode;
  alt?: boolean;
  id?: string;
}) {
  return (
    <section
      className={alt ? "section-sm section-alt" : "section-sm"}
      aria-labelledby={id}
    >
      <div className="container">
        <div className="section-head section-head--compact">
          <h2 id={id}>{title}</h2>
          {lede ? <p>{lede}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Let's find your next useful step.",
  body = "Tell us about your business. We reply with a clear recommendation and a written scope.",
  href = "/contact",
  secondary = { href: "/pricing", label: "How pricing works" },
}: {
  title?: string;
  body?: string;
  href?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="section-sm">
      <div className="container">
        <div className="cta-band reveal">
          <div className="cta-band-inner">
            <div>
              <h2>{title}</h2>
              <p>{body}</p>
            </div>
            <div className="cta-actions">
              <Button asChild variant="light" size="lg">
                <Link href={href}>
                  Talk about your project
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="inverseOutline" size="lg">
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
