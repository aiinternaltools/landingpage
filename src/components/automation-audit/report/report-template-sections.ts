import type { useTranslations } from "next-intl";
import { getAuditConstants } from "@/lib/automation-audit/constants";
import type { Locale } from "@/i18n/routing";

export type AutomationAuditT = ReturnType<typeof useTranslations<"automationAudit">>;

export function getReportTemplateNav(t: AutomationAuditT) {
  return [
    { id: "executive-summary" as const, label: t("report.nav.summary") },
    { id: "business-summary" as const, label: t("report.nav.business") },
    { id: "score-overview" as const, label: t("report.nav.readiness") },
    { id: "your-website" as const, label: t("report.nav.yourSite") },
    { id: "findings" as const, label: t("report.nav.findings") },
    { id: "recommendations" as const, label: t("report.nav.workflows") },
    { id: "quick-wins" as const, label: t("report.nav.quickWins") },
    { id: "actions" as const, label: t("report.nav.actions") },
  ];
}

export function getReportTemplateSections(t: AutomationAuditT) {
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
    businessSummary: {
      id: "business-summary" as const,
      title: t("report.sections.businessSummary.title"),
      description: t("report.sections.businessSummary.description"),
      band: true,
    },
    scoreOverview: {
      id: "score-overview" as const,
      title: t("report.sections.scoreOverview.title"),
      description: t("report.sections.scoreOverview.description"),
      band: false,
    },
    yourWebsite: {
      id: "your-website" as const,
      title: t("report.sections.yourWebsite.title"),
      description: t("report.sections.yourWebsite.description"),
      band: true,
    },
    findings: {
      id: "findings" as const,
      title: t("report.sections.findings.title"),
      description: t("report.sections.findings.description"),
      band: false,
    },
    recommendations: {
      id: "recommendations" as const,
      title: t("report.sections.recommendations.title"),
      description: t("report.sections.recommendations.description"),
      band: true,
    },
    quickWins: {
      id: "quick-wins" as const,
      title: t("report.sections.quickWins.title"),
      description: t("report.sections.quickWins.description"),
      band: false,
    },
    actions: {
      id: "actions" as const,
      title: t("report.sections.actions.title"),
      description: t("report.sections.actions.description"),
      band: true,
    },
  };
}

export function getEmptyStateCopy(t: AutomationAuditT) {
  return {
    executiveSummary: t("report.emptyStates.executiveSummary"),
    areaAssessment: {
      scoreRationale: t("report.emptyStates.scoreRationale"),
      evidence: t("report.emptyStates.evidence"),
      improvements: t("report.emptyStates.improvements"),
    },
    workflows: t("report.emptyStates.workflows"),
    improvements: t("report.emptyStates.improvementsWorkflows"),
    quickWins: t("report.emptyStates.quickWins"),
    recommendations: t("report.emptyStates.recommendations"),
    detectedTools: t("report.emptyStates.detectedTools"),
  };
}

export function getImpactLabel(
  t: AutomationAuditT,
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
