import {
  AUTOMATION_AREAS,
  REPORT_CONSULTING_CTA,
} from "@/lib/automation-audit/constants";

export { REPORT_CONSULTING_CTA };

export const REPORT_TEMPLATE_NAV = [
  { id: "executive-summary", label: "Summary" },
  { id: "business-summary", label: "Business" },
  { id: "score-overview", label: "Readiness" },
  { id: "your-website", label: "Your site" },
  { id: "findings", label: "Findings" },
  { id: "recommendations", label: "Workflows" },
  { id: "quick-wins", label: "Quick wins" },
  { id: "actions", label: "Actions" },
] as const;

export const REPORT_TEMPLATE_SECTIONS = {
  hero: {
    id: "hero" as const,
    eyebrow: "Website automation audit",
    title: "Automation opportunity report",
    description:
      "Practical automation ideas for your business — based on your public website.",
  },
  executiveSummary: {
    id: "executive-summary" as const,
    title: "Executive Summary",
    description: "The headline takeaway in plain language.",
    band: false,
  },
  businessSummary: {
    id: "business-summary" as const,
    title: "Business Summary",
    description: "What you appear to sell, who you serve, and your core offer.",
    band: true,
  },
  scoreOverview: {
    id: "score-overview" as const,
    title: "Automation Readiness",
    description:
      "How much room there is to automate key areas of your business. See Findings below for details.",
    band: false,
  },
  yourWebsite: {
    id: "your-website" as const,
    title: "What We Found on Your Website",
    description:
      "Signals from your public site and practical automations you could run — or add — based on what we saw.",
    band: true,
  },
  findings: {
    id: "findings" as const,
    title: "Workflow Findings",
    description:
      "For each area of your business: what we noticed, why it matters, and how to improve.",
    band: false,
  },
  recommendations: {
    id: "recommendations" as const,
    title: "Workflow Recommendations",
    description:
      "Practical automations you could put in place — described as what happens, not how it is built.",
    band: true,
  },
  quickWins: {
    id: "quick-wins" as const,
    title: "Quick Wins",
    description: "High-impact automations you could explore this week.",
    band: false,
  },
  actions: {
    id: "actions" as const,
    title: "Prioritized Actions",
    description: "Ranked next steps by expected impact.",
    band: true,
  },
} as const;

export const REPORT_AUDIT_AREAS = AUTOMATION_AREAS;

export const EMPTY_STATE_COPY = {
  executiveSummary: "No executive summary was generated for this audit.",
  areaAssessment: {
    scoreRationale:
      "We could not find enough on your public website to explain this score in detail.",
    evidence: "No clear signals on the pages we reviewed.",
    improvements:
      "Book a consulting call to review how this works inside your business — public pages alone were not enough.",
  },
  workflows: "No workflow recommendations identified.",
  improvements: "No additional improvement workflows identified.",
  quickWins: "No quick wins identified.",
  recommendations: "No prioritized recommendations were generated.",
  detectedTools:
    "No specific signals on your public pages — we still recommend automations in the sections below based on your business type.",
} as const;

export const IMPACT_ORDER = ["High", "Medium", "Low"] as const;
