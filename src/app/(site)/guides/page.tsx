import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { publishedContent } from "@/lib/site-data";
export const metadata: Metadata = {
  title: "Practical guides for local businesses",
  description:
    "Specific checklists for business profiles, website enquiries and a first automation project.",
  alternates: { canonical: "/guides" },
};
export default async function Guides() {
  const guides = (await publishedContent()).filter((p) =>
    p.slug.startsWith("guides/"),
  );
  return (
    <>
      <section className="page-intro container">
        <h1>
          Useful before
          <br />
          you buy anything.
        </h1>
        <p>
          Check the basics, ask better questions and understand the work before
          choosing a provider.
        </p>
      </section>
      <section className="section container guide-list">
        {guides.map((g) => (
          <article key={g.slug}>
            <h2>
              <Link href={`/${g.slug}`}>
                {g.title}
                <ArrowUpRight aria-hidden="true" size={24} />
              </Link>
            </h2>
            <p>{g.summary}</p>
            <Link className="text-link" href={`/${g.slug}`}>
              Read the guide
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
