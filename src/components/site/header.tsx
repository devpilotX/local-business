"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ArrowRight, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { industries, services } from "@/lib/content";
import { industryNav, serviceIcons, serviceShort } from "./nav-data";

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
const getThemeSnapshot = (): "light" | "dark" =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";
const getThemeServerSnapshot = (): "light" | "dark" => "light";

export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 28 28" aria-hidden="true">
      <rect className="mark-bg" width="28" height="28" rx="7" />
      <path className="mark-fg" d="M7 8.5h14v3h-5.5V21h-3v-9.5H7z" />
      <circle className="mark-dot" cx="20.5" cy="19.5" r="2.25" />
    </svg>
  );
}

export function Brand({ name = "Techcyme" }: { name?: string }) {
  return (
    <Link href="/" className="brand" aria-label={`${name} home`}>
      <BrandMark />
      <span>{name}</span>
    </Link>
  );
}

const primaryLinks = [
  ["Pricing", "/pricing"],
  ["Guides", "/guides"],
  ["About", "/about"],
] as const;

export function Header({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleTheme() {
    const next = getThemeSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      window.localStorage.setItem("techcyme-theme", next);
    } catch {
      // Keep the current-page theme working if storage is unavailable.
    }
  }

  const isActive = (href: string) =>
    path === href || (href !== "/" && path.startsWith(`${href}/`));

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container header-inner">
        <Brand name={name} />

        {/* Navigation structure adapted from the MIT shadcn/ui navigation-menu block. */}
        <NavigationMenu.Root className="nav-root" aria-label="Primary">
          <NavigationMenu.List className="nav-list">
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="nav-trigger">
                Services <ChevronDown size={14} aria-hidden="true" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="nav-content">
                <div className="mega">
                  <ul className="mega-list">
                    {services.slice(0, 4).map((s) => (
                      <MegaItem
                        key={s.id}
                        href={`/services/${s.id}`}
                        title={s.title}
                        text={serviceShort[s.id]}
                        Icon={serviceIcons[s.icon]}
                      />
                    ))}
                  </ul>
                  <ul className="mega-list">
                    {services.slice(4).map((s) => (
                      <MegaItem
                        key={s.id}
                        href={`/services/${s.id}`}
                        title={s.title}
                        text={serviceShort[s.id]}
                        Icon={serviceIcons[s.icon]}
                      />
                    ))}
                  </ul>
                  <div className="mega-feature">
                    <div>
                      <h3>Not sure where to start?</h3>
                      <p>
                        Most businesses begin with one service. We review what
                        you already have and suggest the smallest useful step.
                      </p>
                    </div>
                    <NavigationMenu.Link asChild>
                      <Link className="text-link" href="/services">
                        Compare all services
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </NavigationMenu.Link>
                  </div>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="nav-trigger">
                Industries <ChevronDown size={14} aria-hidden="true" />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="nav-content">
                <div className="mega mega--narrow">
                  <ul className="mega-list">
                    {industries.map((i) => {
                      const meta = industryNav[i.slug];
                      return (
                        <MegaItem
                          key={i.slug}
                          href={`/industries/${i.slug}`}
                          title={meta.label}
                          text={meta.short}
                          Icon={meta.icon}
                        />
                      );
                    })}
                  </ul>
                  <div className="mega-feature">
                    <div>
                      <h3>Planned around your customers</h3>
                      <p>
                        A clinic, a cafe and a coaching centre each need a
                        different first page. Pick yours to see how we plan it.
                      </p>
                    </div>
                    <NavigationMenu.Link asChild>
                      <Link className="text-link" href="/contact">
                        Talk to us
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </NavigationMenu.Link>
                  </div>
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>

            {primaryLinks.map(([label, href]) => (
              <NavigationMenu.Item key={href}>
                <NavigationMenu.Link
                  asChild
                  active={isActive(href)}
                  className="nav-link"
                >
                  <Link
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
          <div className="nav-viewport-wrap">
            <NavigationMenu.Viewport className="nav-viewport" />
          </div>
        </NavigationMenu.Root>

        <div className="header-actions">
          <button
            type="button"
            className="icon-button"
            aria-label="Toggle colour theme"
            aria-pressed={theme === "dark"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun aria-hidden="true" size={17} />
            ) : (
              <Moon aria-hidden="true" size={17} />
            )}
          </button>
          <Link className="header-signin" href="/admin/login">
            Sign in
          </Link>
          <Button asChild size="sm" className="header-cta">
            <Link href="/contact">Get in touch</Link>
          </Button>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="icon-button mobile-menu-button"
                aria-label="Open menu"
              >
                <Menu aria-hidden="true" size={18} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="mobile-menu">
                <div className="mobile-menu-top">
                  <Dialog.Title>Menu</Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="icon-button"
                      aria-label="Close menu"
                    >
                      <X aria-hidden="true" size={18} />
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">
                  Choose a page or start an enquiry.
                </Dialog.Description>
                <nav aria-label="Mobile navigation" className="mobile-nav">
                  <div className="mobile-group">
                    <Link href="/services" onClick={() => setOpen(false)}>
                      Services
                      <ArrowRight aria-hidden="true" size={16} />
                    </Link>
                    <ul className="mobile-sub">
                      {services.map((s) => (
                        <li key={s.id}>
                          <Link
                            href={`/services/${s.id}`}
                            onClick={() => setOpen(false)}
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mobile-group">
                    <p className="mobile-label">Industries</p>
                    <ul className="mobile-sub">
                      {industries.map((i) => (
                        <li key={i.slug}>
                          <Link
                            href={`/industries/${i.slug}`}
                            onClick={() => setOpen(false)}
                          >
                            {industryNav[i.slug].label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {[...primaryLinks, ["Contact", "/contact"] as const].map(
                    ([label, href]) => (
                      <Link
                        href={href}
                        key={href}
                        aria-current={isActive(href) ? "page" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        {label}
                        <ArrowRight aria-hidden="true" size={16} />
                      </Link>
                    ),
                  )}
                </nav>
                <div className="mobile-menu-foot">
                  <Button asChild>
                    <Link href="/contact" onClick={() => setOpen(false)}>
                      Get in touch
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/admin/login" onClick={() => setOpen(false)}>
                      Team sign in
                    </Link>
                  </Button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}

function MegaItem({
  href,
  title,
  text,
  Icon,
}: {
  href: string;
  title: string;
  text: string;
  Icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
}) {
  return (
    <li>
      <NavigationMenu.Link asChild>
        <Link className="mega-item" href={href}>
          <span className="mega-icon">
            <Icon size={17} aria-hidden />
          </span>
          <span>
            <strong>{title}</strong>
            <span>{text}</span>
          </span>
        </Link>
      </NavigationMenu.Link>
    </li>
  );
}
