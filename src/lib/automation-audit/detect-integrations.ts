import { TOOL_FINGERPRINTS } from "./constants";
import { enrichDetectedTools } from "./enrich-detected-tools";
import type { DetectedTool, DetectionConfidence, ToolCategory } from "./types";
import type { FetchedPage } from "@/lib/audit-core/types";

const CONFIDENCE_ORDER: Record<DetectionConfidence, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

function inferConfidence(matchCount: number, patternIndex: number): DetectionConfidence {
  if (matchCount >= 2 || patternIndex === 0) return "high";
  if (matchCount >= 1) return "medium";
  return "low";
}

function scanHtml(html: string, path: string): DetectedTool[] {
  const found: DetectedTool[] = [];

  for (const tool of TOOL_FINGERPRINTS) {
    for (let i = 0; i < tool.patterns.length; i++) {
      const pattern = tool.patterns[i];
      if (pattern.test(html)) {
        const snippet = html.match(pattern)?.[0] ?? tool.name;
        found.push({
          id: tool.id,
          name: tool.name,
          category: tool.category as ToolCategory,
          confidence: inferConfidence(1, i),
          evidence: `Found on ${path}: ${snippet.slice(0, 80)}`,
          automationSuggestion: "",
          savingsNote: "",
        });
        break;
      }
    }
  }

  return found;
}

export function detectIntegrations(pages: FetchedPage[]): DetectedTool[] {
  const byId = new Map<string, DetectedTool>();

  for (const page of pages) {
    if (page.status !== "success" || !page.html) continue;
    const matches = scanHtml(page.html, page.path);
    for (const match of matches) {
      const existing = byId.get(match.id);
      if (!existing) {
        byId.set(match.id, match);
        continue;
      }
      if (
        CONFIDENCE_ORDER[match.confidence] >
        CONFIDENCE_ORDER[existing.confidence]
      ) {
        byId.set(match.id, match);
      }
    }
  }

  const sorted = Array.from(byId.values()).sort(
    (a, b) => CONFIDENCE_ORDER[b.confidence] - CONFIDENCE_ORDER[a.confidence]
  );

  return enrichDetectedTools(sorted);
}
