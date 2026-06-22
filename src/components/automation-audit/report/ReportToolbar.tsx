"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { getReportTemplateNav } from "@/components/automation-audit/report/report-template-sections";
import {
  downloadReportJson,
  downloadReportPdf,
  printReport,
} from "@/lib/automation-audit/download-report-pdf";
import type { AutomationAuditReport } from "@/lib/automation-audit/types";

type ReportToolbarProps = {
  report: AutomationAuditReport;
  reportElementId: string;
  onNewAudit: (url: string) => void;
};

function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "site";
  }
}

export function ReportToolbar({
  report,
  reportElementId,
  onNewAudit,
}: ReportToolbarProps) {
  const t = useTranslations("automationAudit");
  const nav = getReportTemplateNav(t);
  const [downloading, setDownloading] = useState<"pdf" | "json" | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [showNewAudit, setShowNewAudit] = useState(false);
  const [newUrl, setNewUrl] = useState(report.targetUrl);
  const hostname = getHostname(report.targetUrl);

  useEffect(() => {
    setNewUrl(report.targetUrl);
  }, [report.targetUrl]);

  const handlePdfDownload = () => {
    setDownloading("pdf");
    setDownloadError(null);
    try {
      downloadReportPdf(report);
    } catch {
      setDownloadError(t("report.toolbar.pdfExportFailed"));
    } finally {
      setDownloading(null);
    }
  };

  const handlePrint = () => {
    setDownloadError(null);
    printReport(reportElementId);
  };

  const handleJsonDownload = () => {
    setDownloading("json");
    setDownloadError(null);
    try {
      downloadReportJson(report, hostname);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div data-pdf-hide className="mb-5 space-y-4">
      <div className="flex flex-col gap-4 rounded-xl border border-border/80 bg-muted-bg/25 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-sm text-muted">{t("report.toolbar.exportHint")}</p>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="primary"
            className="px-4 py-2 text-xs sm:text-sm"
            disabled={downloading !== null}
            onClick={handlePdfDownload}
          >
            {downloading === "pdf"
              ? t("report.toolbar.generatingPdf")
              : t("report.toolbar.downloadPdf")}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="px-4 py-2 text-xs sm:text-sm"
            disabled={downloading !== null}
            onClick={handlePrint}
          >
            {t("report.toolbar.print")}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="px-4 py-2 text-xs sm:text-sm"
            disabled={downloading !== null}
            onClick={handleJsonDownload}
          >
            {downloading === "json"
              ? t("report.toolbar.exportingJson")
              : t("report.toolbar.json")}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="px-4 py-2 text-xs sm:text-sm"
            onClick={() => setShowNewAudit((v) => !v)}
          >
            {showNewAudit ? t("report.toolbar.cancel") : t("report.toolbar.newAudit")}
          </Button>
        </div>
      </div>

      <nav aria-label={t("report.toolbar.sectionsNav")}>
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

      {showNewAudit ? (
        <form
          className="flex flex-col gap-2 rounded-xl border border-border/80 bg-muted-bg/25 px-4 py-3 sm:flex-row sm:items-center"
          onSubmit={(e) => {
            e.preventDefault();
            onNewAudit(newUrl.trim());
            setShowNewAudit(false);
          }}
        >
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="min-w-0 flex-1 rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground focus:border-accent/50 focus:outline-none focus:ring-2 focus:ring-accent/30"
            placeholder={t("report.toolbar.urlPlaceholder")}
            required
          />
          <Button type="submit" variant="primary" className="shrink-0 px-4 py-2 text-xs">
            {t("form.runAudit")}
          </Button>
        </form>
      ) : null}

      {downloadError ? (
        <p
          className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200"
          role="alert"
        >
          {downloadError}
        </p>
      ) : null}
    </div>
  );
}
