import type { LlmExcerptResult } from "../types";

export const AUDIT_SYSTEM_PROMPT = `You are a senior performance marketer. Be evidence-based. Analyze multiple pages from the same site as a cohesive marketing presence. If excerpts are truncated, mention limits briefly inside findings. Output valid JSON only matching the structured schema.`;

export function buildAuditUserPrompt(
  normalizedUrl: string,
  fetchedAt: string,
  excerpt: LlmExcerptResult
): string {
  return `You audit a website using extracted visible text from up to 5 key pages (tags/scripts removed; title line included when present). Excerpts may be truncated.

Site: ${normalizedUrl} | fetchedAt: ${fetchedAt} | pagesIncluded: ${excerpt.pageCount} | excerptTruncated: ${excerpt.excerptTruncated} | excerptChars: ${excerpt.excerptChars}

Cover these specialist angles across the site: content & messaging, conversion/CRO, SEO/discoverability (infer from title/body copy only), competitive positioning, brand trust & growth.

Reply with a single JSON object ONLY (no markdown fences) matching the schema: scores as integers 0-100; findings as arrays of short bullet strings per area citing the excerpts; quickWins as 5-10 specific strings.

Page text excerpts:
${excerpt.textExcerpt}`;
}

export const EXECUTIVE_SYSTEM_PROMPT = `Be concise and actionable. Synthesize findings across all audited pages. Do not repeat the full audit verbatim. Output valid JSON only matching the structured schema.`;

export function buildExecutiveUserPrompt(auditJson: string): string {
  return `Here is the structured marketing audit JSON from the previous step:
${auditJson}

Synthesize for a busy founder. Reply with a single JSON object ONLY (no markdown fences): executiveSummary (2-4 sentences) and prioritizedRecommendations (max 12 items). Each item: impact exactly High, Medium, or Low; nextStep one concrete action.`;
}
