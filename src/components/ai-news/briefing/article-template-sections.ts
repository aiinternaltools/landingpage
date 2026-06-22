/** Fixed layout for every AI News briefing — not driven per article by JSON. */

export const ARTICLE_SECTION_IDS = {
  marketPulse: "market-pulse",
  stories: "stories",
  tools: "tools",
  operatorsTake: "operators-take",
  actionPlan: "action-plan",
  beginner: "beginner",
  sources: "sources",
} as const;

export type ArticleTemplateSectionId =
  | typeof ARTICLE_SECTION_IDS.marketPulse
  | typeof ARTICLE_SECTION_IDS.stories
  | typeof ARTICLE_SECTION_IDS.tools
  | typeof ARTICLE_SECTION_IDS.operatorsTake
  | typeof ARTICLE_SECTION_IDS.actionPlan
  | typeof ARTICLE_SECTION_IDS.beginner
  | typeof ARTICLE_SECTION_IDS.sources;

type AiNewsTranslateFn = (
  key: string,
  values?: Record<string, string | number | Date>,
) => string;

export function getArticleNav(t: AiNewsTranslateFn) {
  return [
    { id: ARTICLE_SECTION_IDS.marketPulse, label: t("sections.nav.pulse") },
    { id: ARTICLE_SECTION_IDS.stories, label: t("sections.nav.stories") },
    { id: ARTICLE_SECTION_IDS.tools, label: t("sections.nav.tools") },
    {
      id: ARTICLE_SECTION_IDS.operatorsTake,
      label: t("sections.nav.operatorsTake"),
    },
    { id: ARTICLE_SECTION_IDS.actionPlan, label: t("sections.nav.actionPlan") },
    { id: ARTICLE_SECTION_IDS.beginner, label: t("sections.nav.beginner") },
    { id: ARTICLE_SECTION_IDS.sources, label: t("sections.nav.sources") },
  ] as const;
}

export function getArticleSections(t: AiNewsTranslateFn) {
  return {
    marketPulse: {
      id: ARTICLE_SECTION_IDS.marketPulse,
      title: t("sections.marketPulse.title"),
      description: t("sections.marketPulse.description"),
      band: false,
    },
    stories: {
      id: ARTICLE_SECTION_IDS.stories,
      title: t("sections.stories.title"),
      description: t("sections.stories.description"),
      band: true,
    },
    tools: {
      id: ARTICLE_SECTION_IDS.tools,
      title: t("sections.tools.title"),
      description: t("sections.tools.description"),
      band: false,
    },
    actionPlan: {
      id: ARTICLE_SECTION_IDS.actionPlan,
      title: t("sections.actionPlan.title"),
      description: t("sections.actionPlan.description"),
      band: true,
    },
    beginner: {
      id: ARTICLE_SECTION_IDS.beginner,
      title: t("sections.beginner.title"),
      band: false,
    },
    sources: {
      id: ARTICLE_SECTION_IDS.sources,
      title: t("sections.sources.title"),
      band: false,
    },
  };
}

export function getArticleCta(t: AiNewsTranslateFn) {
  return {
    title: t("sections.cta.title"),
    description: t("sections.cta.description"),
    buttonLabel: t("sections.cta.buttonLabel"),
    href: "/contact",
  };
}
