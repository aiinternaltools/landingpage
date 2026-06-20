import {
  AUDIT_SYSTEM_PROMPT,
  buildAuditUserPrompt,
  buildExecutiveUserPrompt,
  EXECUTIVE_SYSTEM_PROMPT,
} from "./audit-prompts";
import type {
  DetectedTool,
  LlmExcerptResult,
  RawAutomationAuditLlmOutput,
  RawExecutiveLlmOutput,
} from "./types";

const DEFAULT_MODEL = "gpt-4o-mini";

const AREA_ASSESSMENT_SCHEMA = {
  type: "object",
  properties: {
    scoreRationale: { type: "string" },
    evidence: { type: "array", items: { type: "string" } },
    improvements: { type: "array", items: { type: "string" } },
  },
  required: ["scoreRationale", "evidence", "improvements"],
  additionalProperties: false,
} as const;

const AUDIT_JSON_SCHEMA = {
  type: "object",
  properties: {
    businessSnapshot: {
      type: "object",
      properties: {
        businessType: { type: "string" },
        audience: { type: "string" },
        offerSummary: { type: "string" },
      },
      required: ["businessType", "audience", "offerSummary"],
      additionalProperties: false,
    },
    scores: {
      type: "object",
      properties: {
        leadCaptureFollowUp: { type: "integer" },
        onboardingDelivery: { type: "integer" },
        supportKnowledge: { type: "integer" },
        contentOperations: { type: "integer" },
        reportingHandoffs: { type: "integer" },
        overall: { type: "integer" },
      },
      required: [
        "leadCaptureFollowUp",
        "onboardingDelivery",
        "supportKnowledge",
        "contentOperations",
        "reportingHandoffs",
        "overall",
      ],
      additionalProperties: false,
    },
    areaAssessments: {
      type: "object",
      properties: {
        leadCaptureFollowUp: AREA_ASSESSMENT_SCHEMA,
        onboardingDelivery: AREA_ASSESSMENT_SCHEMA,
        supportKnowledge: AREA_ASSESSMENT_SCHEMA,
        contentOperations: AREA_ASSESSMENT_SCHEMA,
        reportingHandoffs: AREA_ASSESSMENT_SCHEMA,
      },
      required: [
        "leadCaptureFollowUp",
        "onboardingDelivery",
        "supportKnowledge",
        "contentOperations",
        "reportingHandoffs",
      ],
      additionalProperties: false,
    },
    workflowOpportunities: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          evidence: { type: "string" },
          impact: { type: "string", enum: ["High", "Medium", "Low"] },
        },
        required: ["title", "description", "evidence", "impact"],
        additionalProperties: false,
      },
    },
    toolRecommendations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          toolName: { type: "string" },
          purpose: { type: "string" },
          rationale: { type: "string" },
          connectionHint: { type: "string" },
          impact: { type: "string", enum: ["High", "Medium", "Low"] },
        },
        required: [
          "toolName",
          "purpose",
          "rationale",
          "connectionHint",
          "impact",
        ],
        additionalProperties: false,
      },
    },
    quickWins: { type: "array", items: { type: "string" } },
  },
  required: [
    "businessSnapshot",
    "scores",
    "areaAssessments",
    "workflowOpportunities",
    "toolRecommendations",
    "quickWins",
  ],
  additionalProperties: false,
} as const;

const EXECUTIVE_JSON_SCHEMA = {
  type: "object",
  properties: {
    executiveSummary: { type: "string" },
    prioritizedRecommendations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          impact: { type: "string", enum: ["High", "Medium", "Low"] },
          nextStep: { type: "string" },
        },
        required: ["impact", "nextStep"],
        additionalProperties: false,
      },
    },
  },
  required: ["executiveSummary", "prioritizedRecommendations"],
  additionalProperties: false,
} as const;

function getOpenAiConfig() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  const model = process.env.OPENAI_MODEL?.trim() || DEFAULT_MODEL;
  return { apiKey, model };
}

async function callOpenAiStructured<T>(
  systemPrompt: string,
  userPrompt: string,
  schemaName: string,
  schema: Record<string, unknown>,
  maxTokens: number
): Promise<T> {
  const { apiKey, model } = getOpenAiConfig();
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: maxTokens,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: schemaName,
          strict: true,
          schema,
        },
      },
    }),
    signal: AbortSignal.timeout(180_000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`OpenAI request failed: ${res.status} ${errText}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned empty response");
  }

  return JSON.parse(content) as T;
}

export async function runAutomationAuditLlm(
  normalizedUrl: string,
  fetchedAt: string,
  excerpt: LlmExcerptResult,
  detectedTools: DetectedTool[]
): Promise<RawAutomationAuditLlmOutput> {
  return callOpenAiStructured<RawAutomationAuditLlmOutput>(
    AUDIT_SYSTEM_PROMPT,
    buildAuditUserPrompt(normalizedUrl, fetchedAt, excerpt, detectedTools),
    "automation_audit",
    AUDIT_JSON_SCHEMA as unknown as Record<string, unknown>,
    16_384
  );
}

export async function runExecutiveLlm(
  audit: RawAutomationAuditLlmOutput
): Promise<RawExecutiveLlmOutput> {
  return callOpenAiStructured<RawExecutiveLlmOutput>(
    EXECUTIVE_SYSTEM_PROMPT,
    buildExecutiveUserPrompt(JSON.stringify(audit)),
    "automation_executive_summary",
    EXECUTIVE_JSON_SCHEMA as unknown as Record<string, unknown>,
    4_000
  );
}

export function hasOpenAiKey(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}
