import Link from "next/link";
import { SiteLogo } from "@/components/layout/SiteLogo";

const footerLinks = [
  { href: "/community", label: "Community" },
  { href: "/marketing-audit", label: "Marketing Audit" },
  { href: "/automation-audit", label: "Automation Audit" },
  { href: "/ai-news", label: "AI News" },
  { href: "/#use-cases", label: "Use Cases" },
  { href: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-16 lg:px-10">
        <div>
          <SiteLogo size="footer" />
          <p className="mt-3 max-w-sm text-sm text-muted">
            AI automation for operational businesses—demos, internal tools, and
            tailored workflows.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2">
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-7 sm:px-8 lg:px-10">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} AI Internal Tools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
