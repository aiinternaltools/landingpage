import { REPORT_TEMPLATE_NAV } from "@/components/automation-audit/report/report-template-sections";

export function ReportSectionNav() {
  return (
    <nav aria-label="Report sections" className="mb-5">
      <ul className="scroll-fade-x flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {REPORT_TEMPLATE_NAV.map(({ id, label }) => (
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
