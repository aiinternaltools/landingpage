"use client";

import { useLocale, useTranslations } from "next-intl";
import { MAX_PAGES } from "@/lib/marketing-audit/constants";
import type { MarketingAuditReport } from "@/lib/marketing-audit/types";
import { Card } from "@/components/ui/Card";
import type { Locale } from "@/i18n/routing";

type PagesAuditedTableProps = {
  report: MarketingAuditReport;
};

export function PagesAuditedTable({ report }: PagesAuditedTableProps) {
  const t = useTranslations("marketingAudit");
  const locale = useLocale() as Locale;
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
              <th className="pb-3 pr-4 font-semibold">{t("report.pagesTable.path")}</th>
              <th className="pb-3 pr-4 font-semibold">{t("report.pagesTable.status")}</th>
              <th className="pb-3 pr-4 font-semibold">{t("report.pagesTable.html")}</th>
              <th className="pb-3 font-semibold">{t("report.pagesTable.text")}</th>
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
                    {page.status === "success"
                      ? t("report.pagesTable.ok")
                      : page.error ?? t("report.pagesTable.error")}
                  </span>
                </td>
                <td className="py-3 pr-4 tabular-nums text-muted">
                  {page.htmlLength > 0 ? page.htmlLength.toLocaleString(locale) : "—"}
                </td>
                <td className="py-3 tabular-nums text-muted">
                  {page.pageTextLength > 0
                    ? page.pageTextLength.toLocaleString(locale)
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {underfilled ? (
        <p className="mt-4 text-sm text-muted">
          {t("report.pagesTable.underfilled", {
            filled: rows.length,
            max: MAX_PAGES,
          })}
        </p>
      ) : null}
      {extraDiscovered > 0 ? (
        <p className="mt-2 text-sm text-muted">
          {extraDiscovered === 1
            ? t("report.pagesTable.extraDiscoveredOne", {
                count: extraDiscovered,
                max: MAX_PAGES,
              })
            : t("report.pagesTable.extraDiscoveredMany", {
                count: extraDiscovered,
                max: MAX_PAGES,
              })}
        </p>
      ) : null}
    </Card>
  );
}
