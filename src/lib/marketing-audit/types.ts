import type {
  DiscoveryMethod,
  LlmExcerptResult,
  PageAudited,
  PageTextResult,
} from "@/lib/audit-core/types";

export type {
  DiscoveryMethod,
  LlmExcerptResult,
  PageAudited,
  PageTextResult,
} from "@/lib/audit-core/types";

export type AuditArea =
  | "contentMessaging"
  | "conversionCro"
  | "seoDiscoverability"
  | "competitivePositioning"
  | "brandTrustGrowth";

export type AuditScores = {
  contentMessaging: number;
  conversionCro: number;
  seoDiscoverability: number;
  competitivePositioning: number;
  brandTrustGrowth: number;
  overall: number;
};

export type AuditFindings = Record<AuditArea, string[]>;

export type RecommendationImpact = "High" | "Medium" | "Low";

export type PrioritizedRecommendation = {
  impact: RecommendationImpact;
  nextStep: string;
};

export type MarketingAuditReport = {
  reportVersion: "1.0";
  generatedAt: string;
  targetUrl: string;
  discovery: {
    method: DiscoveryMethod;
    totalDiscovered: number;
    pagesSelected: number;
    maxPages: 5;
  };
  pagesAudited: PageAudited[];
  audit: {
    scores: AuditScores;
    findings: AuditFindings;
    quickWins: string[];
  };
  executive: {
    executiveSummary: string;
    prioritizedRecommendations: PrioritizedRecommendation[];
  };
};

export type RawAuditLlmOutput = {
  scores?: Partial<AuditScores>;
  findings?: Partial<AuditFindings>;
  quickWins?: string[];
};

export type RawExecutiveLlmOutput = {
  executiveSummary?: string;
  prioritizedRecommendations?: Array<{
    impact?: string;
    nextStep?: string;
  }>;
};
