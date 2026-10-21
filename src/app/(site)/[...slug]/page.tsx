import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, getSettings } from "@/lib/site-data";
import { ContentPage } from "@/components/site/content-page";
import { legalSlugs } from "@/lib/content";
import { launchApproved } from "@/lib/config";
type Props = { params: Promise<{ slug: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getContent(slug.join("/"));
  if (!page)
    return { title: "Page not found", robots: { index: false, follow: false } };
  return {
    title: page.title,
    description: page.summary,
    alternates: { canonical: `/${page.slug}` },
    ...(legalSlugs.includes(page.slug) && !launchApproved
      ? { robots: { index: false, follow: false } }
      : {}),
    openGraph: {
      title: page.title,
      description: page.summary,
      url: `/${page.slug}`,
      type: page.slug.startsWith("guides/") ? "article" : "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.summary,
    },
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = await getContent(slug.join("/"));
  if (!page) notFound();
  const settings = await getSettings();
  return <ContentPage page={page} email={settings.contactEmail} />;
}
