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

export type AutomationArea =
  | "leadCaptureFollowUp"
  | "onboardingDelivery"
  | "supportKnowledge"
  | "contentOperations"
  | "reportingHandoffs";

export type AutomationScores = {
  leadCaptureFollowUp: number;
  onboardingDelivery: number;
  supportKnowledge: number;
  contentOperations: number;
  reportingHandoffs: number;
  overall: number;
};

export type AutomationAreaAssessment = {
  /** Evidence-based explanation for the score; admit when public-site data is thin */
  scoreRationale: string;
  /** Visible signals from audited pages (empty when none found) */
  evidence: string[];
  /** Actionable recommendations to improve automation readiness in this area */
  improvements: string[];
};

export type AutomationAreaAssessments = Record<
  AutomationArea,
  AutomationAreaAssessment
>;

export type ToolCategory =
  | "crm"
  | "scheduling"
  | "payments"
  | "chat"
  | "analytics"
  | "email"
  | "automation"
  | "cms"
  | "forms"
  | "other";

export type DetectionConfidence = "high" | "medium" | "low";

export type DetectedTool = {
  id: string;
  name: string;
  category: ToolCategory;
  confidence: DetectionConfidence;
  evidence: string;
  /** Actionable automation idea for this specific tool */
  automationSuggestion: string;
  /** Time/money savings angle in plain language */
  savingsNote: string;
};

export type BusinessSnapshot = {
  businessType: string;
  audience: string;
  offerSummary: string;
};

export type WorkflowOpportunity = {
  title: string;
  description: string;
  evidence: string;
  impact: RecommendationImpact;
};

export type ToolRecommendation = {
  toolName: string;
  purpose: string;
  rationale: string;
  connectionHint?: string;
  impact: RecommendationImpact;
};

export type RecommendationImpact = "High" | "Medium" | "Low";

export type PrioritizedRecommendation = {
  impact: RecommendationImpact;
  nextStep: string;
};

export type AutomationAuditReport = {
  reportVersion: "1.0";
  generatedAt: string;
  targetUrl: string;
  scopeNote: string;
  discovery: {
    method: DiscoveryMethod;
    totalDiscovered: number;
    pagesSelected: number;
    maxPages: 5;
  };
  pagesAudited: PageAudited[];
  detectedTools: DetectedTool[];
  audit: {
    businessSnapshot: BusinessSnapshot;
    scores: AutomationScores;
    areaAssessments: AutomationAreaAssessments;
    workflowOpportunities: WorkflowOpportunity[];
    toolRecommendations: ToolRecommendation[];
    quickWins: string[];
  };
  executive: {
    executiveSummary: string;
    prioritizedRecommendations: PrioritizedRecommendation[];
  };
};

export type RawAutomationAuditLlmOutput = {
  businessSnapshot?: Partial<BusinessSnapshot>;
  scores?: Partial<AutomationScores>;
  areaAssessments?: Partial<AutomationAreaAssessments>;
  workflowOpportunities?: Array<{
    title?: string;
    description?: string;
    evidence?: string;
    impact?: string;
  }>;
  toolRecommendations?: Array<{
    toolName?: string;
    purpose?: string;
    rationale?: string;
    connectionHint?: string;
    impact?: string;
  }>;
  quickWins?: string[];
};

export type RawExecutiveLlmOutput = {
  executiveSummary?: string;
  prioritizedRecommendations?: Array<{
    impact?: string;
    nextStep?: string;
  }>;
};
