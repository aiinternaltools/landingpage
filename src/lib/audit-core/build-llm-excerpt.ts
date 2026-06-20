import { PER_PAGE_EXCERPT_CHARS, TOTAL_EXCERPT_CHARS } from "./constants";
import type { LlmExcerptResult, PageTextResult } from "./types";

function truncateText(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n\n[... truncated ...]`;
}

export function buildLlmExcerpt(pages: PageTextResult[]): LlmExcerptResult {
  const successful = pages.filter((p) => p.status === "success" && p.pageText);

  if (successful.length === 0) {
    return {
      textExcerpt: "",
      excerptTruncated: false,
      excerptChars: 0,
      pageCount: 0,
    };
  }

  const perPageBudget = Math.min(
    PER_PAGE_EXCERPT_CHARS,
    Math.floor(TOTAL_EXCERPT_CHARS / successful.length)
  );

  const sections: string[] = [];
  let totalChars = 0;
  let anyTruncated = false;

  for (const page of successful) {
    const header = `--- PAGE: ${page.path} (${page.url}) ---`;
    let body = page.pageText;
    if (body.length > perPageBudget) {
      body = truncateText(body, perPageBudget);
      anyTruncated = true;
    }
    const section = `${header}\n${body}`;
    if (totalChars + section.length > TOTAL_EXCERPT_CHARS) {
      const remaining = TOTAL_EXCERPT_CHARS - totalChars;
      if (remaining > 100) {
        sections.push(truncateText(section, remaining));
        anyTruncated = true;
      }
      break;
    }
    sections.push(section);
    totalChars += section.length;
  }

  const textExcerpt = sections.join("\n\n");
  return {
    textExcerpt,
    excerptTruncated: anyTruncated,
    excerptChars: textExcerpt.length,
    pageCount: successful.length,
  };
}
