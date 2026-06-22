import {
  CLIENT_AUDIT_GUIDANCE,
  IMPLEMENTATION_GUIDANCE,
} from "../constants";
import type { DetectedTool, LlmExcerptResult } from "../types";

export const AUDIT_SYSTEM_PROMPT = `You are a senior operations consultant auditing a business website for automation opportunities. Your report is read by non-technical business owners.

${CLIENT_AUDIT_GUIDANCE}

${IMPLEMENTATION_GUIDANCE}

Rules:
- NEVER claim to know internal systems or backend processes not visible on the public site.
- NEVER invent page content or workflows not present in the excerpts or detectedTools list.
- Tie every assessment to specific page evidence when available.
- Max 5 toolRecommendations (practical workflow improvements). Be specific and actionable.
- Output valid JSON only matching the structured schema.`;

export function buildAuditUserPrompt(
  normalizedUrl: string,
  fetchedAt: string,
  excerpt: LlmExcerptResult,
  detectedTools: DetectedTool[]
): string {
  const toolsJson =
    detectedTools.length > 0
      ? JSON.stringify(detectedTools, null, 2)
      : "[] (none detected on public pages)";

  return `Audit this website for automation opportunities using public page text and detected integrations.

Site: ${normalizedUrl} | fetchedAt: ${fetchedAt} | pagesIncluded: ${excerpt.pageCount} | excerptTruncated: ${excerpt.excerptTruncated} | excerptChars: ${excerpt.excerptChars}

Detected on public site (deterministic scan — do not treat as complete stack):
${toolsJson}

Score five dimensions 0-100 (use conservative scores when public-site evidence is thin):
- leadCaptureFollowUp: getting new customers and following up
- onboardingDelivery: signup, onboarding, delivery, client handoffs
- supportKnowledge: FAQ, help content, customer questions
- contentOperations: content production, publishing, repurposing
- reportingHandoffs: reporting, alerts, team coordination

For EACH scored dimension, provide areaAssessments with:
- scoreRationale: 2-4 plain-language sentences explaining the score. If not enough public-site information, say so explicitly.
- evidence: 0-4 short bullets in plain language (empty array if none — do not fabricate).
- improvements: 1-3 practical workflow recommendations as plain steps (no product names).

Also provide: businessSnapshot (businessType, audience, offerSummary in plain language), workflowOpportunities (3-8 practical workflow items: title, description as trigger→steps→outcome, evidence as why we suggest this, impact High/Medium/Low), toolRecommendations (max 5 additional workflow improvements the business could add — purpose=title, rationale=plain workflow, toolName=same as purpose, connectionHint=internal n8n notes only), quickWins (5-10 plain-language workflow strings).

Page text excerpts:
${excerpt.textExcerpt}`;
}

export const EXECUTIVE_SYSTEM_PROMPT = `Synthesize an automation website audit for a non-technical business owner. Plain language only — no tool names, no technical jargon. Never claim visibility into internal systems. Output valid JSON only.`;

export function buildExecutiveUserPrompt(auditJson: string): string {
  return `Here is the structured automation audit JSON:
${auditJson}

Synthesize for a busy founder with no technical background. Reply with JSON:
- executiveSummary: 2-4 sentences about the biggest automation opportunities for their business. Plain language. No software product names. Mention that this is based on their public website.
- prioritizedRecommendations: max 12 items, impact High/Medium/Low, nextStep one concrete plain-language workflow action (no product names).`;
}
