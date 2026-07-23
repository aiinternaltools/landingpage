import type { AiNewsBriefingStory, AiNewsSource } from "@/content/ai-news/types";
import type { Locale } from "@/i18n/routing";

const DATE_LOCALE: Record<Locale, string> = {
  en: "en-US",
  ro: "ro-RO",
};

const IMPACT_KEYS: Record<
  string,
  { key: string; tone: "act" | "watch" | "neutral"; fallback: string }
> = {
  act_now: { key: "actNow", tone: "act", fallback: "Act now" },
  watch_closely: { key: "watchClosely", tone: "watch", fallback: "Watch closely" },
  act_now_for_finance_teams_watch_closely_for_others: {
    key: "actNowFinanceWatchOthers",
    tone: "act",
    fallback: "Act now (finance) · Watch (others)",
  },
};

export function formatArticleDate(isoDate: string, locale: Locale = "en"): string {
  const d = new Date(`${isoDate}T12:00:00`);
  return d.toLocaleDateString(DATE_LOCALE[locale], {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatImpactLevel(
  level: string,
  t?: (key: string) => string,
): {
  label: string;
  tone: "act" | "watch" | "neutral";
} {
  const mapped = IMPACT_KEYS[level];
  if (mapped) {
    return {
      label: t ? t(mapped.key) : mapped.fallback,
      tone: mapped.tone,
    };
  }
  return {
    label: level.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    tone: "neutral",
  };
}

const SIGNAL_KEYS: Record<string, string> = {
  high: "signalStrength.high",
  medium: "signalStrength.medium",
  moderate: "signalStrength.moderate",
  low: "signalStrength.low",
};

export function formatSignalStrength(
  strength: string,
  t?: (key: string) => string,
): string {
  const s = strength.toLowerCase();
  if (t && SIGNAL_KEYS[s]) return t(SIGNAL_KEYS[s]);
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

export function collectUniqueSources(
  stories: AiNewsBriefingStory[],
  extra: AiNewsSource[] = [],
): AiNewsSource[] {
  const seen = new Set<string>();
  const out: AiNewsSource[] = [];
  for (const source of [...extra, ...stories.flatMap((s) => s.sources)]) {
    const key = source.url.trim().toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(source);
  }
  return out;
}
