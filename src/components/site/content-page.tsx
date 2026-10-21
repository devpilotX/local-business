import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowUpRight, Mail } from "lucide-react";
import type { ContentPage as Content } from "@/lib/content";
import { legalSlugs } from "@/lib/content";
import { launchApproved, business } from "@/lib/config";
import { Button } from "@/components/ui/button";
export function ContentPage({ page, email }: { page: Content; email: string }) {
  const legal = legalSlugs.includes(page.slug);
  return (
    <>
      <section className="page-intro container">
        <nav aria-label="Breadcrumb" className="breadcrumbs">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>
            {page.slug.startsWith("services/")
              ? "Services"
              : page.slug.startsWith("guides/")
                ? "Guides"
                : "Information"}
          </span>
        </nav>
        <h1>{page.title}</h1>
        <p>{page.summary}</p>
      </section>
      <section className="container article-layout">
        <article className="prose">
          {legal && !launchApproved && (
            <aside className="policy-status">
              <strong>Draft policy. Not approved for launch.</strong>
              <p>
                Operator details and the deployed data handling need review
                before this policy is relied on.
              </p>
            </aside>
          )}
          {legal && business.address && (
            <p>
              Operator: {business.legalName}. Business address:{" "}
              {business.address}.
            </p>
          )}
          <ReactMarkdown>{page.body}</ReactMarkdown>
        </article>
        <aside className="article-aside">
          <div className="aside-card">
            <h2>Have a question?</h2>
            <p>Tell us about your business and the part you want to improve.</p>
            <Button asChild>
              <Link
                href={`/contact${page.slug.startsWith("services/") ? `?service=${page.slug.split("/")[1]}` : ""}`}
              >
                Talk about your project
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </Button>
            <a href={`mailto:${email}`} className="aside-email">
              <Mail size={17} aria-hidden="true" />
              {email}
            </a>
          </div>
          <div className="aside-links">
            <Link href="/services">Explore services</Link>
            <Link href="/pricing">How pricing works</Link>
            <Link href="/guides">Read practical guides</Link>
          </div>
        </aside>
      </section>
    </>
  );
}
