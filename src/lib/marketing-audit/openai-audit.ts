import type { Locale } from "@/i18n/routing";
import { getAuditPrompts } from "./prompts";
import type {
  LlmExcerptResult,
  RawAuditLlmOutput,
  RawExecutiveLlmOutput,
} from "./types";

const DEFAULT_MODEL = "gpt-4o-mini";

const AUDIT_JSON_SCHEMA = {
  type: "object",
  properties: {
    scores: {
      type: "object",
      properties: {
        contentMessaging: { type: "integer" },
        conversionCro: { type: "integer" },
        seoDiscoverability: { type: "integer" },
        competitivePositioning: { type: "integer" },
        brandTrustGrowth: { type: "integer" },
        overall: { type: "integer" },
      },
      required: [
        "contentMessaging",
        "conversionCro",
        "seoDiscoverability",
        "competitivePositioning",
        "brandTrustGrowth",
        "overall",
      ],
      additionalProperties: false,
    },
    findings: {
      type: "object",
      properties: {
        contentMessaging: { type: "array", items: { type: "string" } },
        conversionCro: { type: "array", items: { type: "string" } },
        seoDiscoverability: { type: "array", items: { type: "string" } },
        competitivePositioning: { type: "array", items: { type: "string" } },
        brandTrustGrowth: { type: "array", items: { type: "string" } },
      },
      required: [
        "contentMessaging",
        "conversionCro",
        "seoDiscoverability",
        "competitivePositioning",
        "brandTrustGrowth",
      ],
      additionalProperties: false,
    },
    quickWins: { type: "array", items: { type: "string" } },
  },
  required: ["scores", "findings", "quickWins"],
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

export async function runAuditLlm(
  normalizedUrl: string,
  fetchedAt: string,
  excerpt: LlmExcerptResult,
  locale: Locale = "en"
): Promise<RawAuditLlmOutput> {
  const prompts = getAuditPrompts(locale);
  return callOpenAiStructured<RawAuditLlmOutput>(
    prompts.AUDIT_SYSTEM_PROMPT,
    prompts.buildAuditUserPrompt(normalizedUrl, fetchedAt, excerpt),
    "marketing_audit",
    AUDIT_JSON_SCHEMA as unknown as Record<string, unknown>,
    12_000
  );
}

export async function runExecutiveLlm(
  audit: RawAuditLlmOutput,
  locale: Locale = "en"
): Promise<RawExecutiveLlmOutput> {
  const prompts = getAuditPrompts(locale);
  return callOpenAiStructured<RawExecutiveLlmOutput>(
    prompts.EXECUTIVE_SYSTEM_PROMPT,
    prompts.buildExecutiveUserPrompt(JSON.stringify(audit)),
    "marketing_executive_summary",
    EXECUTIVE_JSON_SCHEMA as unknown as Record<string, unknown>,
    4_000
  );
}

export function hasOpenAiKey(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}
