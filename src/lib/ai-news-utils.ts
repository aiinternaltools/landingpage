import type { AiNewsBriefingStory, AiNewsSource } from "@/content/ai-news/types";

export function formatArticleDate(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00`);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatImpactLevel(level: string): {
  label: string;
  tone: "act" | "watch" | "neutral";
} {
  const map: Record<string, { label: string; tone: "act" | "watch" | "neutral" }> = {
    act_now: { label: "Act now", tone: "act" },
    watch_closely: { label: "Watch closely", tone: "watch" },
    act_now_for_finance_teams_watch_closely_for_others: {
      label: "Act now (finance) · Watch (others)",
      tone: "act",
    },
  };
  if (map[level]) return map[level];
  return {
    label: level.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    tone: "neutral",
  };
}

export function formatSignalStrength(strength: string): string {
  return strength.charAt(0).toUpperCase() + strength.slice(1);
}

/** 1–3 scale for timeline chart bars */
export function signalStrengthLevel(strength: string | undefined): number {
  if (!strength) return 1;
  const s = strength.toLowerCase();
  if (s === "high") return 3;
  if (s === "medium" || s === "moderate") return 2;
  if (s === "low") return 1;
  return 2;
}

export function collectUniqueSources(stories: AiNewsBriefingStory[]): AiNewsSource[] {
  const seen = new Set<string>();
  const out: AiNewsSource[] = [];
  for (const story of stories) {
    for (const source of story.sources) {
      const key = source.url.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(source);
    }
  }
  return out;
}
