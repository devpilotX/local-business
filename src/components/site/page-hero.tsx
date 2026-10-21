import Link from "next/link";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol>
          {all.map((item, index) =>
            index === all.length - 1 ? (
              <li key={item.path}>
                <span aria-current="page">{item.name}</span>
              </li>
            ) : (
              <li key={item.path}>
                <Link href={item.path}>{item.name}</Link>
              </li>
            ),
          )}
        </ol>
      </nav>
    </>
  );
}

export function PageHero({
  crumbs,
  title,
  lede,
  children,
  aside,
}: {
  crumbs: Crumb[];
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  const copy = (
    <>
      <Breadcrumbs items={crumbs} />
      <h1>{title}</h1>
      {lede ? <p className="lede">{lede}</p> : null}
      {children ? <div className="page-hero-actions">{children}</div> : null}
    </>
  );
  return (
    <section className={aside ? "page-hero page-hero--split" : "page-hero"}>
      <div className="container">
        {aside ? <div>{copy}</div> : copy}
        {aside}
      </div>
    </section>
  );
}
