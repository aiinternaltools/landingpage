"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { LocaleFlag } from "@/components/layout/LocaleFlag";
import { routing, type Locale } from "@/i18n/routing";
import type { LocaleSwitcherProps } from "@/components/layout/nav-types";

const localeAria: Record<Locale, string> = {
  en: "English",
  ro: "Romanian",
};

export function LocaleSwitcher({
  labels,
  locale: currentLocale,
  variant = "compact",
  onSelect,
}: LocaleSwitcherProps) {
  const pathname = usePathname();

  const baseLinkClass =
    variant === "compact"
      ? "inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      : "inline-flex items-center gap-1.5 rounded border border-nav-border px-3 py-1 text-xs font-medium text-nav-muted transition-colors hover:text-nav-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <div
      className={
        variant === "compact"
          ? "flex items-center gap-1 rounded-md border border-nav-border p-0.5"
          : "flex items-center gap-1"
      }
      role="group"
      aria-label={labels.label}
    >
      {routing.locales.map((loc) => {
        const isActive = loc === currentLocale;
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc as Locale}
            onClick={onSelect}
            aria-current={isActive ? "true" : undefined}
            aria-label={localeAria[loc as Locale]}
            title={localeAria[loc as Locale]}
            className={`${baseLinkClass} ${
              isActive
                ? variant === "compact"
                  ? "bg-accent text-white"
                  : "border-accent/40 bg-accent/15 text-accent"
                : variant === "compact"
                  ? "text-nav-muted hover:text-nav-foreground"
                  : "text-nav-muted hover:text-nav-foreground"
            }`}
          >
            <LocaleFlag locale={loc as "en" | "ro"} />
            <span>{labels[loc]}</span>
          </Link>
        );
      })}
    </div>
  );
}
