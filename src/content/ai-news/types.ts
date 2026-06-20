/** Weekly AI News executive briefing — one JSON file per week in `articles/` */

export type AiNewsSource = {
  title: string;
  publisher: string;
  url: string;
};

export type AiNewsBriefingStory = {
  id: string;
  headline: string;
  published_date: string;
  company: string;
  category: string;
  what_happened: string;
  why_it_matters: string;
  business_relevance: string;
  impact_level: string;
  practical_use_cases: string[];
  risks: string[];
  owner_takeaway: string;
  sources: AiNewsSource[];
};

export type AiNewsToolToTest = {
  name: string;
  category: string;
  best_for: string;
  time_to_test: string;
  suggested_test: string;
  business_value: string;
};

export type AiNewsWeeklyAction = {
  action: string;
  example: string;
};

export type AiNewsBriefing = {
  format: "briefing";
  slug: string;
  status: "draft" | "published";
  week_range: string;
  date_start: string;
  date_end: string;
  hook: string;
  executive_summary: string;
  signal_strength: string;
  theme_of_the_week: string;
  market_pulse: {
    summary: string;
    what_changed_this_week: string[];
  };
  stories: AiNewsBriefingStory[];
  tools_to_test: AiNewsToolToTest[];
  strategic_insight: {
    title: string;
    content: string;
    operator_take: string;
  };
  weekly_action_plan: AiNewsWeeklyAction[];
  beginner_term: {
    term: string;
    simple_explanation: string;
    business_example: string;
  };
  recommended_article_angle: {
    title: string;
    subtitle: string;
  };
  seo: {
    meta_title: string;
    meta_description: string;
    slug: string;
    keywords: string[];
  };
  audio?: {
    src: string;
    duration?: string;
    title?: string;
  };
};

/** Card/list fields derived from briefing JSON */
export type AiNewsArticleListItem = {
  slug: string;
  title: string;
  subtitle: string;
  weekLabel: string;
  publishedAt: string;
  excerpt: string;
  status: "draft" | "published";
  signalStrength?: string;
  themeOfTheWeek?: string;
  hasAudio: boolean;
};

export type AiNewsArticle = AiNewsBriefing;
