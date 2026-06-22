import type { LlmExcerptResult } from "../types";

export const AUDIT_SYSTEM_PROMPT = `Ești un specialist senior în marketing de performanță. Fii bazat pe dovezi. Analizează mai multe pagini de pe același site ca o prezență de marketing coerentă. Dacă extrasele sunt trunchiate, menționează limitările pe scurt în constatări. Răspunde DOAR în limba română — toate câmpurile JSON cu text vizibil utilizatorului trebuie să fie în română. Output valid JSON only matching the structured schema.`;

export function buildAuditUserPrompt(
  normalizedUrl: string,
  fetchedAt: string,
  excerpt: LlmExcerptResult
): string {
  return `Auditezi un site web folosind text vizibil extras din până la 5 pagini cheie (tag-uri/scripturi eliminate; linia de titlu inclusă când există). Extrasul poate fi trunchiat.

Site: ${normalizedUrl} | fetchedAt: ${fetchedAt} | pagesIncluded: ${excerpt.pageCount} | excerptTruncated: ${excerpt.excerptTruncated} | excerptChars: ${excerpt.excerptChars}

Acoperă aceste unghiuri specializate pe site: conținut și mesaje, conversie/CRO, SEO/vizibilitate (dedus doar din titlu/corp), poziționare competitivă, încredere brand și creștere.

Răspunde cu un singur obiect JSON (fără markdown fences) conform schemei: scoruri ca întregi 0-100; constatări ca array-uri de bullet-uri scurte per zonă cu citări din extrase; quickWins ca 5-10 stringuri specifice. Tot conținutul text trebuie să fie în română.

Extrase text pagini:
${excerpt.textExcerpt}`;
}

export const EXECUTIVE_SYSTEM_PROMPT = `Fii concis și acționabil. Sintetizează constatările de pe toate paginile auditate. Nu repeta auditul complet verbatim. Răspunde DOAR în română. Output valid JSON only matching the structured schema.`;

export function buildExecutiveUserPrompt(auditJson: string): string {
  return `Iată JSON-ul structurat al auditului de marketing din pasul anterior:
${auditJson}

Sintetizează pentru un fondator ocupat. Răspunde cu un singur obiect JSON (fără markdown fences): executiveSummary (2-4 propoziții în română) și prioritizedRecommendations (max 12 elemente). Fiecare element: impact exact High, Medium sau Low; nextStep o acțiune concretă în română.`;
}
