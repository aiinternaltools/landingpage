import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SiteLogo } from "@/components/layout/SiteLogo";

const footerLinks = [
  { href: "/community", key: "community" },
  { href: "/marketing-audit", key: "marketingAudit" },
  { href: "/automation-audit", key: "automationAudit" },
  { href: "/ai-news", key: "aiNews" },
  { href: "/#use-cases", key: "useCases" },
  { href: "/contact", key: "contact" },
] as const;

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-16 lg:px-10">
        <div>
          <SiteLogo size="footer" />
          <p className="mt-3 max-w-sm text-sm text-muted">{t("tagline")}</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          {footerLinks.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              {t(`links.${key}`)}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 lg:px-10">
          <p className="text-xs text-muted">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
