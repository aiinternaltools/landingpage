/** Fixed layout for every marketing audit report — not driven per site by JSON. */

import type { useTranslations } from "next-intl";
import { getAuditConstants } from "@/lib/marketing-audit/constants";
import type { Locale } from "@/i18n/routing";

export type MarketingAuditT = ReturnType<typeof useTranslations<"marketingAudit">>;

export type ReportTemplateSectionId =
  | "executive-summary"
  | "score-overview"
  | "findings"
  | "quick-wins"
  | "recommendations"
  | "pages-audited";

export function getReportTemplateNav(t: MarketingAuditT) {
  return [
    { id: "executive-summary" as const, label: t("report.nav.summary") },
    { id: "score-overview" as const, label: t("report.nav.scores") },
    { id: "findings" as const, label: t("report.nav.findings") },
    { id: "quick-wins" as const, label: t("report.nav.quickWins") },
    { id: "recommendations" as const, label: t("report.nav.actions") },
    { id: "pages-audited" as const, label: t("report.nav.pages") },
  ];
}

export function getReportTemplateSections(t: MarketingAuditT) {
  return {
    hero: {
      id: "hero" as const,
      eyebrow: t("hero.eyebrow"),
      title: t("hero.title"),
      description: t("hero.description"),
    },
    executiveSummary: {
      id: "executive-summary" as const,
      title: t("report.sections.executiveSummary.title"),
      description: t("report.sections.executiveSummary.description"),
      band: false,
    },
    scoreOverview: {
      id: "score-overview" as const,
      title: t("report.sections.scoreOverview.title"),
      description: t("report.sections.scoreOverview.description"),
      band: true,
    },
    findings: {
      id: "findings" as const,
      title: t("report.sections.findings.title"),
      description: t("report.sections.findings.description"),
      band: false,
    },
    quickWins: {
      id: "quick-wins" as const,
      title: t("report.sections.quickWins.title"),
      description: t("report.sections.quickWins.description"),
      band: true,
    },
    recommendations: {
      id: "recommendations" as const,
      title: t("report.sections.recommendations.title"),
      description: t("report.sections.recommendations.description"),
      band: false,
    },
    pagesAudited: {
      id: "pages-audited" as const,
      title: t("report.sections.pagesAudited.title"),
      description: t("report.sections.pagesAudited.description"),
      band: true,
    },
  };
}

export function getEmptyStateCopy(t: MarketingAuditT) {
  return {
    executiveSummary: t("report.emptyStates.executiveSummary"),
    findings: t("report.emptyStates.findings"),
    quickWins: t("report.emptyStates.quickWins"),
    recommendations: t("report.emptyStates.recommendations"),
  };
}

export function getImpactLabel(
  t: MarketingAuditT,
  impact: "High" | "Medium" | "Low"
) {
  const labels = {
    High: t("report.impact.high"),
    Medium: t("report.impact.medium"),
    Low: t("report.impact.low"),
  } as const;
  return labels[impact];
}

export function getReportAuditAreas(locale: Locale) {
  return getAuditConstants(locale).areas;
}

export const IMPACT_ORDER = ["High", "Medium", "Low"] as const;
