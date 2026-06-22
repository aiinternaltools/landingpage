import { AUTOMATION_AREAS, getScopeNote, MAX_PAGES } from "./constants";
import type { Locale } from "@/i18n/routing";
import type {
  AutomationArea,
  AutomationAreaAssessment,
  AutomationAreaAssessments,
  AutomationAuditReport,
  AutomationScores,
  BusinessSnapshot,
  DetectedTool,
  DiscoveryMethod,
  PageTextResult,
  PrioritizedRecommendation,
  RawAutomationAuditLlmOutput,
  RawExecutiveLlmOutput,
  RecommendationImpact,
  ToolRecommendation,
  WorkflowOpportunity,
} from "./types";

function clampScore(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, Math.round(n)));
}

const EMPTY_AREA_ASSESSMENT: AutomationAreaAssessment = {
  scoreRationale:
    "Not enough public-site information was available to explain this score from the audited pages alone.",
  evidence: [],
  improvements: [
    "Book a consulting call to review internal workflows — this dimension could not be assessed confidently from public pages only.",
  ],
};

function normalizeStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((s) => typeof s === "string" && s.trim()).map((s) => s.trim());
}

function normalizeAreaAssessment(
  raw: Partial<AutomationAreaAssessment> | undefined
): AutomationAreaAssessment {
  const scoreRationale =
    typeof raw?.scoreRationale === "string" && raw.scoreRationale.trim()
      ? raw.scoreRationale.trim()
      : EMPTY_AREA_ASSESSMENT.scoreRationale;
  const evidence = normalizeStringList(raw?.evidence);
  const improvements = normalizeStringList(raw?.improvements);

  return {
    scoreRationale,
    evidence,
    improvements:
      improvements.length > 0 ? improvements : EMPTY_AREA_ASSESSMENT.improvements,
  };
}

function normalizeAreaAssessments(
  raw?: Partial<AutomationAreaAssessments>
): AutomationAreaAssessments {
  const assessments = {} as AutomationAreaAssessments;
  for (const area of AUTOMATION_AREAS) {
    assessments[area.id as AutomationArea] = normalizeAreaAssessment(
      raw?.[area.id as AutomationArea]
    );
  }
  return assessments;
}

function normalizeScores(raw?: Partial<AutomationScores>): AutomationScores {
  return {
    leadCaptureFollowUp: clampScore(raw?.leadCaptureFollowUp),
    onboardingDelivery: clampScore(raw?.onboardingDelivery),
    supportKnowledge: clampScore(raw?.supportKnowledge),
    contentOperations: clampScore(raw?.contentOperations),
    reportingHandoffs: clampScore(raw?.reportingHandoffs),
    overall: clampScore(raw?.overall),
  };
}

function normalizeImpact(value: unknown): RecommendationImpact {
  if (value === "High" || value === "Medium" || value === "Low") return value;
  return "Medium";
}

function normalizeBusinessSnapshot(
  raw?: Partial<BusinessSnapshot>
): BusinessSnapshot {
  return {
    businessType:
      typeof raw?.businessType === "string" ? raw.businessType.trim() : "—",
    audience: typeof raw?.audience === "string" ? raw.audience.trim() : "—",
    offerSummary:
      typeof raw?.offerSummary === "string" ? raw.offerSummary.trim() : "—",
  };
}

function normalizeWorkflows(
  raw?: RawAutomationAuditLlmOutput["workflowOpportunities"]
): WorkflowOpportunity[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((w) => w && typeof w.title === "string" && w.title.trim())
    .map((w) => ({
      title: w.title!.trim(),
      description:
        typeof w.description === "string" ? w.description.trim() : "",
      evidence: typeof w.evidence === "string" ? w.evidence.trim() : "",
      impact: normalizeImpact(w.impact),
    }));
}

function normalizeToolRecs(
  raw?: RawAutomationAuditLlmOutput["toolRecommendations"]
): ToolRecommendation[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((t) => t && typeof t.toolName === "string" && t.toolName.trim())
    .slice(0, 5)
    .map((t) => ({
      toolName: t.toolName!.trim(),
      purpose: typeof t.purpose === "string" ? t.purpose.trim() : "",
      rationale: typeof t.rationale === "string" ? t.rationale.trim() : "",
      connectionHint:
        typeof t.connectionHint === "string" && t.connectionHint.trim()
          ? t.connectionHint.trim()
          : undefined,
      impact: normalizeImpact(t.impact),
    }));
}

function normalizeRecommendations(
  raw?: RawExecutiveLlmOutput["prioritizedRecommendations"]
): PrioritizedRecommendation[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((r) => r && typeof r.nextStep === "string" && r.nextStep.trim())
    .map((r) => ({
      impact: normalizeImpact(r.impact),
      nextStep: r.nextStep!.trim(),
    }));
}

export function mergeReport(params: {
  targetUrl: string;
  discoveryMethod: DiscoveryMethod;
  totalDiscovered: number;
  pagesSelected: number;
  pageResults: PageTextResult[];
  detectedTools: DetectedTool[];
  auditRaw: RawAutomationAuditLlmOutput;
  executiveRaw: RawExecutiveLlmOutput;
  locale?: Locale;
}): AutomationAuditReport {
  const {
    targetUrl,
    discoveryMethod,
    totalDiscovered,
    pagesSelected,
    pageResults,
    detectedTools,
    auditRaw,
    executiveRaw,
    locale = "en",
  } = params;

  return {
    reportVersion: "1.0",
    generatedAt: new Date().toISOString(),
    targetUrl,
    scopeNote: getScopeNote(locale),
    discovery: {
      method: discoveryMethod,
      totalDiscovered,
      pagesSelected,
      maxPages: MAX_PAGES,
    },
    pagesAudited: pageResults.map((p) => ({
      url: p.url,
      path: p.path,
      htmlLength: p.htmlLength,
      pageTextLength: p.pageTextLength,
      status: p.status,
      error: p.error,
    })),
    detectedTools,
    audit: {
      businessSnapshot: normalizeBusinessSnapshot(auditRaw.businessSnapshot),
      scores: normalizeScores(auditRaw.scores),
      areaAssessments: normalizeAreaAssessments(auditRaw.areaAssessments),
      workflowOpportunities: normalizeWorkflows(auditRaw.workflowOpportunities),
      toolRecommendations: normalizeToolRecs(auditRaw.toolRecommendations),
      quickWins: Array.isArray(auditRaw.quickWins)
        ? auditRaw.quickWins.filter((s) => typeof s === "string" && s.trim())
        : [],
    },
    executive: {
      executiveSummary:
        typeof executiveRaw.executiveSummary === "string"
          ? executiveRaw.executiveSummary.trim()
          : "",
      prioritizedRecommendations: normalizeRecommendations(
        executiveRaw.prioritizedRecommendations
      ),
    },
  };
}
