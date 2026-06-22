"use client";

import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AuditAreaPanel } from "@/components/automation-audit/report/AuditAreaPanel";
import { BusinessSnapshotCard } from "@/components/automation-audit/report/BusinessSnapshotCard";
import { ExecutiveSummaryCard } from "@/components/automation-audit/report/ExecutiveSummaryCard";
import { QuickWinsList } from "@/components/automation-audit/report/QuickWinsList";
import { RecommendationsList } from "@/components/automation-audit/report/RecommendationsList";
import { ReportFooter } from "@/components/automation-audit/report/ReportFooter";
import { ReportHero } from "@/components/automation-audit/report/ReportHero";
import { ReportSection } from "@/components/automation-audit/report/ReportSection";
import { ScoreBarsChart } from "@/components/automation-audit/report/ScoreBarsChart";
import { ScoreRadarChart } from "@/components/automation-audit/report/ScoreRadarChart";
import { WebsiteToolsSection } from "@/components/automation-audit/report/WebsiteToolsSection";
import { WorkflowOpportunitiesList } from "@/components/automation-audit/report/WorkflowOpportunitiesList";
import {
  getReportAuditAreas,
  getReportTemplateSections,
} from "@/components/automation-audit/report/report-template-sections";
import type { Locale } from "@/i18n/routing";
import type { AutomationAuditReport } from "@/lib/automation-audit/types";

type AutomationAuditReportTemplateProps = {
  report: AutomationAuditReport;
  animate?: boolean;
};

export function AutomationAuditReportTemplate({
  report,
  animate = false,
}: AutomationAuditReportTemplateProps) {
  const t = useTranslations("automationAudit");
  const locale = useLocale() as Locale;
  const sections = getReportTemplateSections(t);
  const auditAreas = getReportAuditAreas(locale);
  const stagger = animate ? "audit-reveal-item" : "";

  return (
    <div className={`space-y-2 ${animate ? "audit-reveal" : ""}`}>
      <div className={stagger} style={{ "--audit-delay": "0ms" } as CSSProperties}>
        <ReportHero report={report} />
      </div>

      <div className={stagger} style={{ "--audit-delay": "80ms" } as CSSProperties}>
        <ReportSection
          id={sections.executiveSummary.id}
          title={sections.executiveSummary.title}
          description={sections.executiveSummary.description}
          band={sections.executiveSummary.band}
        >
          <ExecutiveSummaryCard summary={report.executive.executiveSummary} />
        </ReportSection>
      </div>

      <div className={stagger} style={{ "--audit-delay": "160ms" } as CSSProperties}>
        <ReportSection
          id={sections.businessSummary.id}
          title={sections.businessSummary.title}
          description={sections.businessSummary.description}
          band={sections.businessSummary.band}
        >
          <BusinessSnapshotCard snapshot={report.audit.businessSnapshot} />
        </ReportSection>
      </div>

      <div className={stagger} style={{ "--audit-delay": "240ms" } as CSSProperties}>
        <ReportSection
          id={sections.scoreOverview.id}
          title={sections.scoreOverview.title}
          description={sections.scoreOverview.description}
          band={sections.scoreOverview.band}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card-elevated rounded-2xl p-4 sm:p-6">
              <ScoreRadarChart scores={report.audit.scores} />
            </div>
            <div className="card-elevated rounded-2xl p-4 sm:p-6">
              <ScoreBarsChart scores={report.audit.scores} />
            </div>
          </div>
        </ReportSection>
      </div>

      <div className={stagger} style={{ "--audit-delay": "320ms" } as CSSProperties}>
        <ReportSection
          id={sections.yourWebsite.id}
          title={sections.yourWebsite.title}
          description={sections.yourWebsite.description}
          band={sections.yourWebsite.band}
        >
          <WebsiteToolsSection
            detectedTools={report.detectedTools}
            improvements={report.audit.toolRecommendations}
          />
        </ReportSection>
      </div>

      <div className={stagger} style={{ "--audit-delay": "400ms" } as CSSProperties}>
        <ReportSection
          id={sections.findings.id}
          title={sections.findings.title}
          description={sections.findings.description}
          band={sections.findings.band}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {auditAreas.map((area) => (
              <AuditAreaPanel
                key={area.id}
                area={area.id}
                label={area.label}
                description={area.description}
                color={area.color}
                score={report.audit.scores[area.id]}
                assessment={report.audit.areaAssessments[area.id]}
              />
            ))}
          </div>
        </ReportSection>
      </div>

      <div className={stagger} style={{ "--audit-delay": "480ms" } as CSSProperties}>
        <ReportSection
          id={sections.recommendations.id}
          title={sections.recommendations.title}
          description={sections.recommendations.description}
          band={sections.recommendations.band}
        >
          <WorkflowOpportunitiesList workflows={report.audit.workflowOpportunities} />
        </ReportSection>
      </div>

      <div className={stagger} style={{ "--audit-delay": "560ms" } as CSSProperties}>
        <ReportSection
          id={sections.quickWins.id}
          title={sections.quickWins.title}
          description={sections.quickWins.description}
          band={sections.quickWins.band}
        >
          <QuickWinsList quickWins={report.audit.quickWins} />
        </ReportSection>
      </div>

      <div className={stagger} style={{ "--audit-delay": "640ms" } as CSSProperties}>
        <ReportSection
          id={sections.actions.id}
          title={sections.actions.title}
          description={sections.actions.description}
          band={sections.actions.band}
        >
          <RecommendationsList
            recommendations={report.executive.prioritizedRecommendations}
          />
        </ReportSection>
      </div>

      <div className={stagger} style={{ "--audit-delay": "720ms" } as CSSProperties}>
        <ReportFooter scopeNote={report.scopeNote} />
      </div>
    </div>
  );
}
