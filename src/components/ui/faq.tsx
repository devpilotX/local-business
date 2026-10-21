"use client";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
export const questions = [
  {
    q: "Can I start with just one service?",
    a: "Yes. We can scope a profile review, a website or one workflow on its own. You do not need every service to make a useful start.",
  },
  {
    q: "Can you guarantee a Google Maps ranking?",
    a: "No. Google controls eligibility, verification and rankings. We help with accurate information and suitable practices, not guaranteed positions.",
  },
  {
    q: "Is Google Business Profile free?",
    a: "Yes. Google Business Profile is free for eligible businesses. Any Techcyme fee is for agreed setup, review or support work, not a listing fee paid to Google.",
  },
  {
    q: "Will I own the website and business accounts?",
    a: "Ownership and access are agreed in the project scope. The business should keep control of its domain and accounts, with a documented handover.",
  },
  {
    q: "How much will the work cost?",
    a: "We quote after reviewing the work, content and integrations you need. The scope should explain deliverables, provider costs and any ongoing support before work starts.",
  },
];
// Section structure adapted from the MIT shadcn landing-page FAQ.
export function FAQ() {
  return (
    <Accordion.Root type="single" collapsible className="faq-list">
      {questions.map((item, index) => (
        <Accordion.Item value={String(index)} key={item.q} className="faq-item">
          <Accordion.Header>
            <Accordion.Trigger className="faq-trigger">
              {item.q}
              <ChevronDown aria-hidden="true" size={20} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="faq-content">
            <p>{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
