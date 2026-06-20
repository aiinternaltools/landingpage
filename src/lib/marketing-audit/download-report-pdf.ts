import { saveReportPdf } from "@/lib/marketing-audit/generate-report-pdf";
import type { MarketingAuditReport } from "@/lib/marketing-audit/types";

export function downloadReportPdf(report: MarketingAuditReport): void {
  saveReportPdf(report);
}

export function printReport(elementId: string): void {
  const el = document.getElementById(elementId);
  if (!el) return;

  document.body.classList.add("audit-print-mode");
  el.setAttribute("data-audit-print-target", "true");

  const cleanup = () => {
    document.body.classList.remove("audit-print-mode");
    el.removeAttribute("data-audit-print-target");
    window.removeEventListener("afterprint", cleanup);
  };

  window.addEventListener("afterprint", cleanup);
  window.print();
}

export function downloadReportJson(report: unknown, hostname: string): void {
  const date = new Date().toISOString().slice(0, 10);
  const safeHost = hostname.replace(/[^a-z0-9.-]/gi, "-").toLowerCase();
  const blob = new Blob([JSON.stringify(report, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `marketing-audit-${safeHost}-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
