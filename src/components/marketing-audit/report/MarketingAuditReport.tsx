"use client";

import { MarketingAuditReportTemplate } from "@/components/marketing-audit/report/MarketingAuditReportTemplate";
import { ReportToolbar } from "@/components/marketing-audit/report/ReportToolbar";
import type { MarketingAuditReport as MarketingAuditReportType } from "@/lib/marketing-audit/types";

export const AUDIT_REPORT_PDF_ID = "marketing-audit-report-pdf";

type MarketingAuditReportProps = {
  report: MarketingAuditReportType;
  onNewAudit: (url: string) => void;
  animate?: boolean;
};

export function MarketingAuditReport({
  report,
  onNewAudit,
  animate = false,
}: MarketingAuditReportProps) {
  return (
    <div className="audit-report-enter px-4 py-6 sm:px-6 sm:py-8">
      <ReportToolbar
        report={report}
        reportElementId={AUDIT_REPORT_PDF_ID}
        onNewAudit={onNewAudit}
      />
      <div id={AUDIT_REPORT_PDF_ID}>
        <MarketingAuditReportTemplate report={report} animate={animate} />
      </div>
    </div>
  );
}
