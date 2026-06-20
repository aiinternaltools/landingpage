import { AUDIT_AREAS, MAX_PAGES } from "./constants";
import type {
  AuditArea,
  AuditFindings,
  AuditScores,
  DiscoveryMethod,
  MarketingAuditReport,
  PageTextResult,
  PrioritizedRecommendation,
  RawAuditLlmOutput,
  RawExecutiveLlmOutput,
  RecommendationImpact,
} from "./types";

function clampScore(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, Math.round(n)));
}

function normalizeFindings(raw?: Partial<AuditFindings>): AuditFindings {
  const findings = {} as AuditFindings;
  for (const area of AUDIT_AREAS) {
    const items = raw?.[area.id as AuditArea];
    findings[area.id as AuditArea] = Array.isArray(items)
      ? items.filter((s) => typeof s === "string" && s.trim())
      : [];
  }
  return findings;
}

function normalizeScores(raw?: Partial<AuditScores>): AuditScores {
  return {
    contentMessaging: clampScore(raw?.contentMessaging),
    conversionCro: clampScore(raw?.conversionCro),
    seoDiscoverability: clampScore(raw?.seoDiscoverability),
    competitivePositioning: clampScore(raw?.competitivePositioning),
    brandTrustGrowth: clampScore(raw?.brandTrustGrowth),
    overall: clampScore(raw?.overall),
  };
}

function normalizeImpact(value: unknown): RecommendationImpact {
  if (value === "High" || value === "Medium" || value === "Low") return value;
  return "Medium";
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
  auditRaw: RawAuditLlmOutput;
  executiveRaw: RawExecutiveLlmOutput;
}): MarketingAuditReport {
  const {
    targetUrl,
    discoveryMethod,
    totalDiscovered,
    pagesSelected,
    pageResults,
    auditRaw,
    executiveRaw,
  } = params;

  return {
    reportVersion: "1.0",
    generatedAt: new Date().toISOString(),
    targetUrl,
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
    audit: {
      scores: normalizeScores(auditRaw.scores),
      findings: normalizeFindings(auditRaw.findings),
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
