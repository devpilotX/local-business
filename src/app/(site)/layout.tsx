import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ThemeSync } from "@/components/site/theme-sync";
import { WhatsAppFloat } from "@/components/site/whatsapp";
import { getSettings } from "@/lib/site-data";
export const dynamic = "force-dynamic";
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  return (
    <>
      <ThemeSync />
      <Header name={settings.siteName} />
      <main id="main">{children}</main>
      <Footer
        name={settings.siteName}
        email={settings.contactEmail}
        whatsapp={settings.whatsapp}
      />
      <WhatsAppFloat number={settings.whatsapp} />
    </>
  );
}
