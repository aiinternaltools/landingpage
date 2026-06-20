/** Fixed layout for every marketing audit report — not driven per site by JSON. */

import { AUDIT_AREAS } from "@/lib/marketing-audit/constants";

export const REPORT_TEMPLATE_NAV = [
  { id: "executive-summary", label: "Summary" },
  { id: "score-overview", label: "Scores" },
  { id: "findings", label: "Findings" },
  { id: "quick-wins", label: "Quick wins" },
  { id: "recommendations", label: "Actions" },
  { id: "pages-audited", label: "Pages" },
] as const;

export type ReportTemplateSectionId =
  (typeof REPORT_TEMPLATE_NAV)[number]["id"];

export const REPORT_TEMPLATE_SECTIONS = {
  hero: {
    id: "hero" as const,
    eyebrow: "Marketing Audit",
    title: "Site audit report",
    description: "AI-powered analysis of your top marketing pages.",
  },
  executiveSummary: {
    id: "executive-summary" as const,
    title: "Executive Summary",
    description: "The headline takeaway for busy founders and operators.",
    band: false,
  },
  scoreOverview: {
    id: "score-overview" as const,
    title: "Score Overview",
    description: "Performance across five marketing dimensions plus overall score.",
    band: true,
  },
  findings: {
    id: "findings" as const,
    title: "Detailed Findings",
    description: "Evidence-based observations across every audit area.",
    band: false,
  },
  quickWins: {
    id: "quick-wins" as const,
    title: "Quick Wins",
    description: "High-impact improvements you can act on this week.",
    band: true,
  },
  recommendations: {
    id: "recommendations" as const,
    title: "Prioritized Recommendations",
    description: "Ranked next steps by expected impact.",
    band: false,
  },
  pagesAudited: {
    id: "pages-audited" as const,
    title: "Pages Audited",
    description: "The five highest-priority pages included in this audit.",
    band: true,
  },
} as const;

export const REPORT_AUDIT_AREAS = AUDIT_AREAS;

export const EMPTY_STATE_COPY = {
  executiveSummary: "No executive summary was generated for this audit.",
  findings: "No findings identified for this area.",
  quickWins: "No quick wins identified.",
  recommendations: "No prioritized recommendations were generated.",
} as const;

export const IMPACT_ORDER = ["High", "Medium", "Low"] as const;
