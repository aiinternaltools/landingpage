import { MAX_PAGES } from "@/lib/marketing-audit/constants";
import type { MarketingAuditReport } from "@/lib/marketing-audit/types";
import { Card } from "@/components/ui/Card";

type PagesAuditedTableProps = {
  report: MarketingAuditReport;
};

export function PagesAuditedTable({ report }: PagesAuditedTableProps) {
  const rows = report.pagesAudited;

  const extraDiscovered =
    report.discovery.totalDiscovered > report.discovery.pagesSelected
      ? report.discovery.totalDiscovered - report.discovery.pagesSelected
      : 0;

  const underfilled = rows.length < MAX_PAGES;

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="pb-3 pr-4 font-semibold">Path</th>
              <th className="pb-3 pr-4 font-semibold">Status</th>
              <th className="pb-3 pr-4 font-semibold">HTML</th>
              <th className="pb-3 font-semibold">Text</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((page, i) => (
              <tr key={`${page.path}-${i}`} className="border-b border-border/60 last:border-0">
                <td className="py-3 pr-4">
                  {page.url ? (
                    <a
                      href={page.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent hover:underline"
                    >
                      {page.path}
                    </a>
                  ) : (
                    <span className="text-muted">{page.path}</span>
                  )}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={
                      page.status === "success"
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }
                  >
                    {page.status === "success" ? "OK" : page.error ?? "Error"}
                  </span>
                </td>
                <td className="py-3 pr-4 tabular-nums text-muted">
                  {page.htmlLength > 0 ? page.htmlLength.toLocaleString() : "—"}
                </td>
                <td className="py-3 tabular-nums text-muted">
                  {page.pageTextLength > 0
                    ? page.pageTextLength.toLocaleString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {underfilled ? (
        <p className="mt-4 text-sm text-muted">
          Only {rows.length} of {MAX_PAGES} page slots could be filled — the site
          may use client-rendered navigation, block crawlers, or expose few public
          HTML routes. Common paths were probed automatically where possible.
        </p>
      ) : null}
      {extraDiscovered > 0 ? (
        <p className="mt-2 text-sm text-muted">
          {extraDiscovered} additional page{extraDiscovered === 1 ? "" : "s"}{" "}
          discovered but not included in this audit (limited to top {MAX_PAGES}).
        </p>
      ) : null}
    </Card>
  );
}
