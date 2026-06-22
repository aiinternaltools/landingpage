"use client";

import { useTranslations } from "next-intl";
import { getReportTemplateNav } from "@/components/automation-audit/report/report-template-sections";

export function ReportSectionNav() {
  const t = useTranslations("automationAudit");
  const nav = getReportTemplateNav(t);

  return (
    <nav aria-label={t("report.toolbar.sectionsNav")} className="mb-5">
      <ul className="scroll-fade-x flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {nav.map(({ id, label }) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              className="inline-flex rounded-full border border-border/80 bg-surface/40 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/35 hover:bg-accent-muted/40 hover:text-foreground"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
