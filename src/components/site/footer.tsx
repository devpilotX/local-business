import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./header";
import { services } from "@/lib/content";
export function Footer({ name, email }: { name: string; email: string }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Brand name={name} />
            <p className="footer-statement">
              Local ambition.
              <br />
              Practical digital work.
            </p>
            <a className="footer-email" href={`mailto:${email}`}>
              {email}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div>
            <h2>Services</h2>
            {services.slice(0, 4).map((s) => (
              <Link key={s.id} href={`/services/${s.id}`}>
                {s.title}
              </Link>
            ))}
            <Link href="/services">All services</Link>
          </div>
          <div>
            <h2>Company</h2>
            <Link href="/about">How we work</Link>
            <Link href="/pricing">Pricing approach</Link>
            <Link href="/guides">Practical guides</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/accessibility">Accessibility</Link>
          </div>
          <div>
            <h2>Information</h2>
            <Link href="/privacy">Privacy notice</Link>
            <Link href="/terms">Website terms</Link>
            <Link href="/cookies">Cookie notice</Link>
            <Link href="/refund-policy">Cancellations and refunds</Link>
            <Link href="/privacy-security">Security reporting</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {name}. Google and n8n are independent
            third-party platforms.
          </p>
          <Link href="/admin">
            Team sign-in <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
