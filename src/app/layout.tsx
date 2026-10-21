import type { Metadata } from "next";
import { headers } from "next/headers";
import { siteUrl, launchApproved } from "@/lib/config";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Techcyme | Local visibility, websites and workflows",
    template: "%s | Techcyme",
  },
  description:
    "Google Business Profile support, business websites and n8n workflows for local businesses. Clear scope, useful information and business-owned accounts.",
  robots: { index: launchApproved, follow: launchApproved },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Techcyme",
    locale: "en_IN",
    title: "Techcyme | Make your business easier to find",
    description: "Local visibility, business websites and connected workflows.",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce") || undefined;
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('techcyme-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}",
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
