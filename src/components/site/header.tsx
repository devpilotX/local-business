"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Menu, MoonStar, X, MapPinned } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
export function Brand({ name = "Techcyme" }: { name?: string }) {
  return (
    <Link href="/" className="brand" aria-label={`${name} home`}>
      <span className="brand-symbol">
        <MapPinned aria-hidden="true" size={24} strokeWidth={1.8} />
      </span>
      {name}
    </Link>
  );
}
export function Header({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const links = [
    ["Services", "/services"],
    ["How we work", "/about"],
    ["Pricing", "/pricing"],
    ["Guides", "/guides"],
  ];
  function toggleTheme() {
    const current =
      document.documentElement.dataset.theme ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("techcyme-theme", next);
  }
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand name={name} />
        <nav aria-label="Primary" className="desktop-nav">
          {links.map(([label, href]) => (
            <Link
              href={href}
              key={href}
              aria-current={path === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button theme-button"
            aria-label="Toggle colour theme"
            onClick={toggleTheme}
          >
            <MoonStar aria-hidden="true" size={20} />
          </button>
          <Button asChild className="desktop-contact">
            <Link href="/contact">
              Let's talk <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
          </Button>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                className="icon-button mobile-menu-button"
                aria-label="Open menu"
              >
                <Menu aria-hidden="true" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="mobile-menu">
                <div className="mobile-menu-top">
                  <Dialog.Title>Explore Techcyme</Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="icon-button" aria-label="Close menu">
                      <X aria-hidden="true" />
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">
                  Choose a page or start an enquiry.
                </Dialog.Description>
                <nav aria-label="Mobile navigation">
                  {links.map(([label, href]) => (
                    <Link href={href} key={href} onClick={() => setOpen(false)}>
                      {label}
                      <ArrowUpRight aria-hidden="true" size={18} />
                    </Link>
                  ))}
                  <Link href="/contact" onClick={() => setOpen(false)}>
                    Contact us
                    <ArrowUpRight aria-hidden="true" size={18} />
                  </Link>
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
