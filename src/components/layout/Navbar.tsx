"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import type { NavbarProps, NavLinkKey } from "@/components/layout/nav-types";
import { SiteLogo } from "@/components/layout/SiteLogo";

const links: { href: string; key: NavLinkKey }[] = [
  { href: "/community", key: "community" },
  { href: "/ai-news", key: "aiNews" },
  { href: "/#use-cases", key: "useCases" },
  { href: "/contact", key: "contact" },
];

export function Navbar({ labels, locale }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-nav-border bg-nav-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5 lg:px-10">
        <Link
          href="/"
          className="flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        >
          <SiteLogo size="nav" priority />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-10">
          {links.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-nav-muted transition-colors hover:text-nav-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              {labels[key]}
            </Link>
          ))}
          <LocaleSwitcher labels={labels.languageSwitcher} locale={locale} />
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-nav-border text-nav-foreground md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? labels.closeMenu : labels.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{labels.menu}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden
          >
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-nav-border bg-nav-background px-5 py-5 md:hidden"
        >
          <ul className="flex flex-col gap-3">
            {links.map(({ href, key }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block py-1 text-sm text-nav-muted hover:text-nav-foreground"
                  onClick={() => setOpen(false)}
                >
                  {labels[key]}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-nav-border pt-4">
            <LocaleSwitcher
              labels={labels.languageSwitcher}
              locale={locale}
              variant="mobile"
              onSelect={() => setOpen(false)}
            />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
