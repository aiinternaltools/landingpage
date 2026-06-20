/** Fixed layout for every AI News briefing — not driven per article by JSON. */

export const ARTICLE_TEMPLATE_NAV = [
  { id: "market-pulse", label: "Pulse" },
  { id: "stories", label: "Stories" },
  { id: "tools", label: "Tools" },
  { id: "operators-take", label: "Operator's take" },
  { id: "action-plan", label: "Action plan" },
  { id: "beginner", label: "Term" },
  { id: "sources", label: "Sources" },
] as const;

export type ArticleTemplateSectionId =
  (typeof ARTICLE_TEMPLATE_NAV)[number]["id"];

export const ARTICLE_TEMPLATE_SECTIONS = {
  marketPulse: {
    id: "market-pulse" as const,
    title: "AI Market Pulse",
    description: "What shifted this week—and why it matters for operators.",
    band: false,
  },
  stories: {
    id: "stories" as const,
    title: "The Most Important AI Stories This Week",
    description: "Each story is filtered for business impact—not hype.",
    band: true,
  },
  tools: {
    id: "tools" as const,
    title: "AI Tools Worth Testing This Week",
    description:
      "A short testing menu—pick one that matches a workflow you already run.",
    band: false,
  },
  actionPlan: {
    id: "action-plan" as const,
    title: "What You Should Do This Week",
    description: "Concrete steps you can run without a technical team.",
    band: true,
  },
  beginner: {
    id: "beginner" as const,
    title: "AI Term of the Week",
    band: false,
  },
  sources: {
    id: "sources" as const,
    title: "Sources",
    band: false,
  },
} as const;

export const ARTICLE_TEMPLATE_CTA = {
  title: "Want this applied to your business?",
  description:
    "I help owners turn AI news into automations and workflows that ship.",
  buttonLabel: "Book a call",
  href: "/contact",
} as const;
