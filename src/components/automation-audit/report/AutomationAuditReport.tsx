"use client";

import { AutomationAuditReportTemplate } from "@/components/automation-audit/report/AutomationAuditReportTemplate";
import { ReportSectionNav } from "@/components/automation-audit/report/ReportSectionNav";
import type { AutomationAuditReport as AutomationAuditReportType } from "@/lib/automation-audit/types";

type AutomationAuditReportProps = {
  report: AutomationAuditReportType;
  onNewAudit?: (url: string) => void;
  animate?: boolean;
};

export function AutomationAuditReport({
  report,
  animate = false,
}: AutomationAuditReportProps) {
  return (
    <div className="audit-report-enter px-4 py-6 sm:px-6 sm:py-8">
      <ReportSectionNav />
      <AutomationAuditReportTemplate report={report} animate={animate} />
    </div>
  );
}
