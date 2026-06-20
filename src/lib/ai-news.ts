import "server-only";
import fs from "fs";
import path from "path";
import type {
  AiNewsArticle,
  AiNewsArticleListItem,
  AiNewsBriefing,
  AiNewsBriefingStory,
  AiNewsSource,
  AiNewsToolToTest,
  AiNewsWeeklyAction,
} from "@/content/ai-news/types";

const ARTICLES_DIR = path.join(process.cwd(), "src/content/ai-news/articles");

function isArticleFile(name: string) {
  return name.endsWith(".json") && !name.startsWith("_");
}

function asString(v: unknown): string | null {
  return typeof v === "string" && v.trim() ? v.trim() : null;
}

function asStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string" && x.trim().length > 0);
}

function parseSources(v: unknown): AiNewsSource[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const s = item as Record<string, unknown>;
      const title = asString(s.title);
      const publisher = asString(s.publisher);
      const url = asString(s.url);
      if (!title || !publisher || !url) return null;
      return { title, publisher, url };
    })
    .filter((s): s is AiNewsSource => s !== null);
}

function parseStory(v: unknown): AiNewsBriefingStory | null {
  if (!v || typeof v !== "object") return null;
  const s = v as Record<string, unknown>;
  const id = asString(s.id) ?? asString(s.headline) ?? "story";
  const headline = asString(s.headline);
  const published_date = asString(s.published_date);
  const company = asString(s.company);
  const category = asString(s.category);
  const what_happened = asString(s.what_happened);
  const why_it_matters = asString(s.why_it_matters);
  const business_relevance = asString(s.business_relevance);
  const impact_level = asString(s.impact_level);
  const owner_takeaway = asString(s.owner_takeaway);

  if (
    !headline ||
    !published_date ||
    !company ||
    !category ||
    !what_happened ||
    !why_it_matters ||
    !business_relevance ||
    !impact_level ||
    !owner_takeaway
  ) {
    return null;
  }

  return {
    id,
    headline,
    published_date,
    company,
    category,
    what_happened,
    why_it_matters,
    business_relevance,
    impact_level,
    practical_use_cases: asStringArray(s.practical_use_cases),
    risks: asStringArray(s.risks),
    owner_takeaway,
    sources: parseSources(s.sources),
  };
}

function parseBriefing(raw: unknown, filename: string): AiNewsBriefing | null {
  if (!raw || typeof raw !== "object") return null;
  const a = raw as Record<string, unknown>;

  const seoRaw = a.seo;
  if (!seoRaw || typeof seoRaw !== "object") {
    console.warn(`[ai-news] Missing seo in ${filename}`);
    return null;
  }
  const seo = seoRaw as Record<string, unknown>;
  const slug = asString(seo.slug);
  const meta_title = asString(seo.meta_title);
  const meta_description = asString(seo.meta_description);
  if (!slug || !meta_title || !meta_description) return null;

  const angleRaw = a.recommended_article_angle;
  if (!angleRaw || typeof angleRaw !== "object") return null;
  const angle = angleRaw as Record<string, unknown>;
  const angleTitle = asString(angle.title);
  const angleSubtitle = asString(angle.subtitle);
  if (!angleTitle || !angleSubtitle) return null;

  const week_range = asString(a.week_range);
  const date_start = asString(a.date_start);
  const date_end = asString(a.date_end);
  const hook = asString(a.hook);
  const executive_summary = asString(a.executive_summary);
  const signal_strength = asString(a.signal_strength);
  const theme_of_the_week = asString(a.theme_of_the_week);

  const pulseRaw = a.market_pulse;
  if (!pulseRaw || typeof pulseRaw !== "object") return null;
  const pulse = pulseRaw as Record<string, unknown>;
  const pulseSummary = asString(pulse.summary);
  const pulseChanges = asStringArray(pulse.what_changed_this_week);
  if (!pulseSummary || pulseChanges.length === 0) return null;

  if (!week_range || !date_start || !date_end || !hook || !executive_summary) return null;
  if (!signal_strength || !theme_of_the_week) return null;

  const stories = (Array.isArray(a.stories) ? a.stories : [])
    .map(parseStory)
    .filter((s): s is AiNewsBriefingStory => s !== null);
  if (stories.length === 0) return null;

  const toolsRaw = Array.isArray(a.tools_to_test) ? a.tools_to_test : [];
  const tools_to_test = toolsRaw
    .map((t): AiNewsToolToTest | null => {
      if (!t || typeof t !== "object") return null;
      const o = t as Record<string, unknown>;
      const name = asString(o.name);
      const category = asString(o.category);
      const best_for = asString(o.best_for);
      const time_to_test = asString(o.time_to_test);
      const suggested_test = asString(o.suggested_test);
      const business_value = asString(o.business_value);
      if (!name || !category || !best_for || !time_to_test || !suggested_test || !business_value)
        return null;
      return { name, category, best_for, time_to_test, suggested_test, business_value };
    })
    .filter((t): t is AiNewsToolToTest => t !== null);

  const insightRaw = a.strategic_insight;
  if (!insightRaw || typeof insightRaw !== "object") return null;
  const insight = insightRaw as Record<string, unknown>;
  const insightTitle = asString(insight.title);
  const insightContent = asString(insight.content);
  const operator_take = asString(insight.operator_take);
  if (!insightTitle || !insightContent || !operator_take) return null;

  const planRaw = Array.isArray(a.weekly_action_plan) ? a.weekly_action_plan : [];
  const weekly_action_plan = planRaw
    .map((p): AiNewsWeeklyAction | null => {
      if (!p || typeof p !== "object") return null;
      const o = p as Record<string, unknown>;
      const action = asString(o.action);
      const example = asString(o.example);
      if (!action || !example) return null;
      return { action, example };
    })
    .filter((p): p is AiNewsWeeklyAction => p !== null);
  if (weekly_action_plan.length === 0) return null;

  const termRaw = a.beginner_term;
  if (!termRaw || typeof termRaw !== "object") return null;
  const term = termRaw as Record<string, unknown>;
  const termName = asString(term.term);
  const simple_explanation = asString(term.simple_explanation);
  const business_example = asString(term.business_example);
  if (!termName || !simple_explanation || !business_example) return null;

  const status = a.status === "draft" ? "draft" : "published";

  let audio: AiNewsBriefing["audio"];
  if (a.audio && typeof a.audio === "object") {
    const au = a.audio as Record<string, unknown>;
    const src = asString(au.src);
    if (src) {
      audio = {
        src,
        duration: asString(au.duration) ?? undefined,
        title: asString(au.title) ?? undefined,
      };
    }
  }

  return {
    format: "briefing",
    slug,
    status,
    week_range,
    date_start,
    date_end,
    hook,
    executive_summary,
    signal_strength,
    theme_of_the_week,
    market_pulse: {
      summary: pulseSummary,
      what_changed_this_week: pulseChanges,
    },
    stories,
    tools_to_test,
    strategic_insight: {
      title: insightTitle,
      content: insightContent,
      operator_take,
    },
    weekly_action_plan,
    beginner_term: {
      term: termName,
      simple_explanation,
      business_example,
    },
    recommended_article_angle: {
      title: angleTitle,
      subtitle: angleSubtitle,
    },
    seo: {
      meta_title,
      meta_description,
      slug,
      keywords: asStringArray(seo.keywords),
    },
    audio,
  };
}

function readArticleFile(filename: string): AiNewsBriefing | null {
  const filePath = path.join(ARTICLES_DIR, filename);
  try {
    const raw = JSON.parse(fs.readFileSync(filePath, "utf8")) as unknown;
    return parseBriefing(raw, filename);
  } catch (err) {
    console.warn(`[ai-news] Failed to read ${filename}:`, err);
    return null;
  }
}

export function getAllArticles(includeDrafts = false): AiNewsArticle[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  return fs
    .readdirSync(ARTICLES_DIR)
    .filter(isArticleFile)
    .map(readArticleFile)
    .filter((a): a is AiNewsBriefing => a !== null)
    .filter((a) => includeDrafts || a.status !== "draft")
    .sort(
      (a, b) => new Date(b.date_end).getTime() - new Date(a.date_end).getTime(),
    );
}

export function getArticleBySlug(slug: string): AiNewsArticle | null {
  return getAllArticles(true).find((a) => a.slug === slug) ?? null;
}

export function getPublishedArticleSlugs(): string[] {
  return getAllArticles(false).map((a) => a.slug);
}

export function toListItem(article: AiNewsArticle): AiNewsArticleListItem {
  return {
    slug: article.slug,
    title: article.recommended_article_angle.title,
    subtitle: article.recommended_article_angle.subtitle,
    weekLabel: article.week_range,
    publishedAt: article.date_end,
    excerpt: article.seo.meta_description,
    status: article.status,
    signalStrength: article.signal_strength,
    themeOfTheWeek: article.theme_of_the_week,
    hasAudio: Boolean(article.audio?.src),
  };
}

export function getAllArticleListItems(includeDrafts = false): AiNewsArticleListItem[] {
  return getAllArticles(includeDrafts).map(toListItem);
}
