"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { questions } from "./faq-data";

// Behaviour from Radix Accordion; section structure adapted from the MIT
// shadcn landing-page FAQ.
export function FAQ({ items = questions }: { items?: typeof questions }) {
  return (
    <Accordion.Root type="single" collapsible className="faq-list">
      {items.map((item, index) => (
        <Accordion.Item value={String(index)} key={item.q} className="faq-item">
          <Accordion.Header asChild>
            <h3>
              <Accordion.Trigger className="faq-trigger">
                {item.q}
                <span className="faq-icon" aria-hidden="true" />
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>
          <Accordion.Content className="faq-content">
            <p>{item.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
