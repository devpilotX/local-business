import Link from "next/link";
import { Mail } from "lucide-react";
import { Brand } from "./header";
import { industries, services } from "@/lib/content";
import { industryNav } from "./nav-data";

export function Footer({ name, email }: { name: string; email: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Brand name={name} />
            <p>
              Google Business Profile support, business websites and practical
              workflows for local businesses. Written scope, business-owned
              accounts.
            </p>
            <a className="footer-contact" href={`mailto:${email}`}>
              <Mail size={16} aria-hidden="true" />
              {email}
            </a>
          </div>
          <FooterCol
            title="Services"
            links={[
              ...services.slice(0, 5).map((s) => ({
                href: `/services/${s.id}`,
                label: s.title,
              })),
              { href: "/services", label: "All services" },
            ]}
          />
          <FooterCol
            title="Industries"
            links={industries.map((i) => ({
              href: `/industries/${i.slug}`,
              label: industryNav[i.slug].label,
            }))}
          />
          <FooterCol
            title="Company"
            links={[
              { href: "/about", label: "How we work" },
              { href: "/pricing", label: "Pricing" },
              { href: "/guides", label: "Guides" },
              { href: "/contact", label: "Contact" },
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              { href: "/privacy", label: "Privacy notice" },
              { href: "/terms", label: "Website terms" },
              { href: "/cookies", label: "Cookie notice" },
              { href: "/refund-policy", label: "Cancellations and refunds" },
              { href: "/accessibility", label: "Accessibility" },
              { href: "/privacy-security", label: "Security reporting" },
            ]}
          />
        </div>
        <div className="footer-bottom">
          <p>
            © {year} {name}. Google and n8n are independent third-party
            platforms.
          </p>
          <nav aria-label="Footer">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/admin/login">Team sign in</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="footer-col">
      <h2>{title}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
