import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { publishedContent } from "@/lib/site-data";
import { PageHero } from "@/components/site/page-hero";
import { JsonLd, webPageSchema } from "@/lib/schema";

const description =
  "Practical checklists for Google Business Profiles, website enquiries and a first automation project. Free to read, no sign-up.";

export const metadata: Metadata = {
  title: "Practical guides for local businesses",
  description,
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Practical guides for local businesses",
    description,
    url: "/guides",
  },
};

export default async function Guides() {
  const guides = (await publishedContent()).filter((p) =>
    p.slug.startsWith("guides/"),
  );
  return (
    <>
      <JsonLd
        data={webPageSchema({
          title: "Practical guides for local businesses",
          description,
          path: "/guides",
        })}
      />
      <PageHero
        crumbs={[{ name: "Guides", path: "/guides" }]}
        title="Useful before you buy anything."
        lede="Check the basics, ask better questions and understand the work before choosing a provider."
      />
      <section className="section-sm">
        <div className="container guide-grid">
          {guides.map((g) => (
            <Link
              key={g.slug}
              className="guide-card reveal"
              href={`/${g.slug}`}
            >
              <span className="guide-meta">
                <BookOpen size={15} aria-hidden="true" />
                Checklist
              </span>
              <h2>{g.title}</h2>
              <p>{g.summary}</p>
              <span className="more">
                Read the guide <ArrowRight size={15} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
