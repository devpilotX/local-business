import { siteUrl, business } from "@/lib/config";

type Json = Record<string, unknown>;

export const orgId = `${siteUrl}/#organization`;
export const websiteId = `${siteUrl}/#website`;

const abs = (path: string) =>
  path.startsWith("http") ? path : `${siteUrl}${path === "/" ? "" : path}`;

export function organizationSchema({
  name,
  email,
  description,
  phone,
}: {
  name: string;
  email: string;
  description: string;
  phone?: string;
}): Json {
  return {
    "@type": "ProfessionalService",
    "@id": orgId,
    name,
    legalName: business.legalName,
    url: siteUrl,
    email,
    ...(phone ? { telephone: phone } : {}),
    description,
    logo: abs("/icon.svg"),
    image: abs("/opengraph-image"),
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: [
      "Google Business Profile",
      "Local search",
      "Business websites",
      "n8n workflow automation",
    ],
    ...(business.address ? { address: business.address } : {}),
  };
}

export function websiteSchema(name: string): Json {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: siteUrl,
    name,
    inLanguage: "en-IN",
    publisher: { "@id": orgId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  price,
}: {
  name: string;
  description: string;
  path: string;
  price?: number;
}): Json {
  return {
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price,
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: price,
              priceCurrency: "INR",
            },
            url: abs(path),
          },
        }
      : {}),
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name,
    description,
    url: abs(path),
    serviceType: name,
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "India" },
  };
}

export function articleSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Json {
  return {
    "@type": "Article",
    headline: title,
    description,
    url: abs(path),
    mainEntityOfPage: abs(path),
    inLanguage: "en-IN",
    author: { "@id": orgId },
    publisher: { "@id": orgId },
  };
}

export function webPageSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Json {
  return {
    "@type": "WebPage",
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name: title,
    description,
    isPartOf: { "@id": websiteId },
    inLanguage: "en-IN",
  };
}

export function JsonLd({ data }: { data: Json | Json[] }) {
  const graph = {
    "@context": "https://schema.org",
    "@graph": Array.isArray(data) ? data : [data],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replaceAll("<", "\\u003c"),
      }}
    />
  );
}
