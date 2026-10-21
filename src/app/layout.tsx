import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { siteUrl, launchApproved } from "@/lib/config";
import "@/components/iso/iso.css";
import "./globals.css";

const description =
  "Techcyme helps local businesses get found on Google, turn visits into enquiries with a clear website, and follow up with simple n8n workflows. Written scope and business-owned accounts.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Techcyme | Google Business Profile, websites and workflows",
    template: "%s | Techcyme",
  },
  description,
  applicationName: "Techcyme",
  category: "Business services",
  creator: "Techcyme",
  publisher: "Techcyme",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: launchApproved,
    follow: launchApproved,
    googleBot: {
      index: launchApproved,
      follow: launchApproved,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Techcyme",
    locale: "en_IN",
    url: "/",
    title: "Techcyme | Make your business easier to find",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Techcyme | Make your business easier to find",
    description,
  },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbf9" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f0d" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce") || undefined;
  return (
    <html
      lang="en-IN"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
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
