import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { work } from "@/lib/page-details";
import { Reveal } from "./reveal";

// Live projects built and run by the Techcyme team.
export function WorkShowcase({
  headingLevel: H = "h3",
}: {
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div className="work-grid">
      {work.map((item) => (
        <Reveal key={item.url} as="article" className="work-card">
          <a
            className="work-link"
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="work-frame">
              <div className="work-chrome" aria-hidden="true">
                <i />
                <i />
                <i />
                <span>{item.url.replace("https://", "")}</span>
              </div>
              <div className="work-media">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="work-body">
              <H>
                {item.name}
                <span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </H>
              <p>{item.summary}</p>
              <ul className="bento-tags" aria-label="Work included">
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  );
}
