import type { CSSProperties } from "react";
import { ReportHero } from "@/components/marketing-audit/report/ReportHero";
import { ReportSection } from "@/components/marketing-audit/report/ReportSection";
import { ScoreBarsChart } from "@/components/marketing-audit/report/ScoreBarsChart";
import { ScoreRadarChart } from "@/components/marketing-audit/report/ScoreRadarChart";
import { ExecutiveSummaryCard } from "@/components/marketing-audit/report/ExecutiveSummaryCard";
import { AuditAreaPanel } from "@/components/marketing-audit/report/AuditAreaPanel";
import { QuickWinsList } from "@/components/marketing-audit/report/QuickWinsList";
import { RecommendationsList } from "@/components/marketing-audit/report/RecommendationsList";
import { PagesAuditedTable } from "@/components/marketing-audit/report/PagesAuditedTable";
import {
  REPORT_AUDIT_AREAS,
  REPORT_TEMPLATE_SECTIONS,
} from "@/components/marketing-audit/report/report-template-sections";
import type { MarketingAuditReport } from "@/lib/marketing-audit/types";

type MarketingAuditReportTemplateProps = {
  report: MarketingAuditReport;
  animate?: boolean;
};

/** Fixed report shell — same layout for every audited site. */
export function MarketingAuditReportTemplate({
  report,
  animate = false,
}: MarketingAuditReportTemplateProps) {
  const sections = REPORT_TEMPLATE_SECTIONS;
  const stagger = animate ? "audit-reveal-item" : "";

  return (
    <div className={`space-y-2 ${animate ? "audit-reveal" : ""}`}>
      <div
        data-pdf-section
        className={stagger}
        style={{ "--audit-delay": "0ms" } as CSSProperties}
      >
        <ReportHero report={report} />
      </div>

      <div
        data-pdf-section
        className={stagger}
        style={{ "--audit-delay": "80ms" } as CSSProperties}
      >
        <ReportSection
          id={sections.executiveSummary.id}
          title={sections.executiveSummary.title}
          description={sections.executiveSummary.description}
          band={sections.executiveSummary.band}
        >
          <ExecutiveSummaryCard summary={report.executive.executiveSummary} />
        </ReportSection>
      </div>

      <div
        data-pdf-section
        className={stagger}
        style={{ "--audit-delay": "160ms" } as CSSProperties}
      >
        <ReportSection
          id={sections.scoreOverview.id}
          title={sections.scoreOverview.title}
          description={sections.scoreOverview.description}
          band={sections.scoreOverview.band}
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="card-elevated rounded-2xl p-4 sm:p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                Radar view
              </h3>
              <ScoreRadarChart scores={report.audit.scores} />
            </div>
            <div className="card-elevated rounded-2xl p-4 sm:p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">
                Score breakdown
              </h3>
              <ScoreBarsChart scores={report.audit.scores} />
            </div>
          </div>
        </ReportSection>
      </div>

      <div
        data-pdf-section
        className={stagger}
        style={{ "--audit-delay": "240ms" } as CSSProperties}
      >
        <ReportSection
          id={sections.findings.id}
          title={sections.findings.title}
          description={sections.findings.description}
          band={sections.findings.band}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {REPORT_AUDIT_AREAS.map((area) => (
              <AuditAreaPanel
                key={area.id}
                area={area.id}
                label={area.label}
                description={area.description}
                color={area.color}
                score={report.audit.scores[area.id]}
                findings={report.audit.findings[area.id]}
              />
            ))}
          </div>
        </ReportSection>
      </div>

      <div
        data-pdf-section
        className={stagger}
        style={{ "--audit-delay": "320ms" } as CSSProperties}
      >
        <ReportSection
          id={sections.quickWins.id}
          title={sections.quickWins.title}
          description={sections.quickWins.description}
          band={sections.quickWins.band}
        >
          <QuickWinsList quickWins={report.audit.quickWins} />
        </ReportSection>
      </div>

      <div
        data-pdf-section
        className={stagger}
        style={{ "--audit-delay": "400ms" } as CSSProperties}
      >
        <ReportSection
          id={sections.recommendations.id}
          title={sections.recommendations.title}
          description={sections.recommendations.description}
          band={sections.recommendations.band}
        >
          <RecommendationsList
            recommendations={report.executive.prioritizedRecommendations}
          />
        </ReportSection>
      </div>

      <div
        data-pdf-section
        className={stagger}
        style={{ "--audit-delay": "480ms" } as CSSProperties}
      >
        <ReportSection
          id={sections.pagesAudited.id}
          title={sections.pagesAudited.title}
          description={sections.pagesAudited.description}
          band={sections.pagesAudited.band}
        >
          <PagesAuditedTable report={report} />
        </ReportSection>
      </div>
    </div>
  );
}
