import { MAX_PAGES } from "@/lib/audit-core/constants";
import type { Locale } from "@/i18n/routing";
import en from "../../../messages/en.json";
import ro from "../../../messages/ro.json";
import type { AutomationArea } from "./types";

export { MAX_PAGES };

const messagesByLocale = { en, ro } as const;

/** Internal implementation guidance — never surfaced in the client report UI. */
export const IMPLEMENTATION_GUIDANCE = `Internal implementation (store in connectionHint only — never in user-visible fields):
- Build automations with n8n as the primary orchestration layer.
- Knowledge-base chatbots: n8n + LLM/RAG over site content, with human handoff for complex cases.
- Do not recommend Zapier/Make/Tray as platforms in client-facing copy.`;

/** Rules for all client-visible report text. */
export const CLIENT_AUDIT_GUIDANCE = `Client-facing language (mandatory for ALL user-visible fields):
- Write for a non-technical business owner. No jargon: no n8n, API, CRM, RAG, integration, stack, webhook, Zapier, or similar.
- Describe workflows in plain steps: "When someone fills out your contact form → save their details → send a welcome email → notify you."
- Use familiar words: "customer list" not CRM, "booking page" not Calendly (unless quoting their site), "contact form", "email", "team chat".
- executiveSummary: 2-4 sentences about business opportunities only — no tool names, no technical terms.
- areaAssessments: scoreRationale and evidence in plain language; improvements as practical workflow steps.
- workflowOpportunities: title + description as practical workflows (trigger → steps → outcome). evidence = why we suggest this based on their site, in plain language.
- toolRecommendations (shown as "ways to improve"): purpose = workflow title, rationale = plain workflow description. toolName = same as purpose (workflow title, NOT a software product name). connectionHint = internal n8n notes only.
- quickWins and prioritizedRecommendations: plain workflow actions, no product names.
- Recommend smart FAQ / help assistants when the site has FAQ, help, or blog content — describe as "assistant that answers from your help pages", not chatbot/RAG.`;

export const REPORT_CONSULTING_CTA = {
  title: "Want a deeper analysis?",
  description:
    "This report is a starting point from your public site. Book a free consulting call and we'll map your real stack, workflows, and automation opportunities in detail.",
  buttonLabel: "Book free consulting",
  href: "/contact",
  pdfHref: "https://pixelplot.ai/contact",
} as const;

const AREA_COLORS: Record<AutomationArea, string> = {
  leadCaptureFollowUp: "#0284c7",
  onboardingDelivery: "#34d399",
  supportKnowledge: "#a78bfa",
  contentOperations: "#fbbf24",
  reportingHandoffs: "#f472b6",
};

const AREA_IDS: AutomationArea[] = [
  "leadCaptureFollowUp",
  "onboardingDelivery",
  "supportKnowledge",
  "contentOperations",
  "reportingHandoffs",
];

export type AutomationAreaMeta = {
  id: AutomationArea;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
};

export function getScopeNote(locale: Locale): string {
  return (
    messagesByLocale[locale]?.automationAudit.scopeNote ??
    messagesByLocale.en.automationAudit.scopeNote
  );
}

export function getAuditConstants(locale: Locale) {
  const auditAreas =
    messagesByLocale[locale]?.automationAudit.report.auditAreas ??
    messagesByLocale.en.automationAudit.report.auditAreas;

  const areas: AutomationAreaMeta[] = AREA_IDS.map((id) => ({
    id,
    label: auditAreas[id].label,
    shortLabel: auditAreas[id].shortLabel,
    description: auditAreas[id].description,
    color: AREA_COLORS[id],
  }));

  return { areas, maxPages: MAX_PAGES, scopeNote: getScopeNote(locale) };
}

/** @deprecated Prefer getScopeNote(locale) */
export const SCOPE_NOTE = getScopeNote("en");

export const AUTOMATION_PRIORITY_PATH_PATTERNS: Array<{
  pattern: RegExp;
  score: number;
}> = [
  { pattern: /^\/$/, score: 100 },
  { pattern: /^\/(pricing|plans?)(\/|$)/i, score: 90 },
  { pattern: /^\/(demo|book|schedule|get-started|signup|sign-up)(\/|$)/i, score: 88 },
  { pattern: /^\/(contact)(\/|$)/i, score: 85 },
  { pattern: /^\/(docs?|help|support|kb|knowledge-base)(\/|$)/i, score: 85 },
  { pattern: /^\/(integrations?|api|platform)(\/|$)/i, score: 82 },
  { pattern: /^\/(product|products|features?|services?|solutions?)(\/|$)/i, score: 80 },
  { pattern: /^\/(about|company)(\/|$)/i, score: 75 },
  { pattern: /^\/(how-it-works|onboarding)(\/|$)/i, score: 72 },
  { pattern: /^\/(customers?|case-stud(?:y|ies)|testimonials?)(\/|$)/i, score: 65 },
];

/** @deprecated Prefer getAuditConstants(locale).areas */
export const AUTOMATION_AREAS = getAuditConstants("en").areas;

export type ToolFingerprint = {
  id: string;
  name: string;
  category: import("./types").ToolCategory;
  patterns: RegExp[];
};

export const TOOL_FINGERPRINTS: ToolFingerprint[] = [
  {
    id: "hubspot",
    name: "HubSpot",
    category: "crm",
    patterns: [/js\.hs-scripts\.com/i, /js\.hsforms\.net/i, /hubspot/i, /hs-form/i],
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "crm",
    patterns: [/salesforce\.com/i, /force\.com/i, /pardot/i],
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    category: "crm",
    patterns: [/pipedrive/i],
  },
  {
    id: "calendly",
    name: "Calendly",
    category: "scheduling",
    patterns: [/calendly\.com/i, /assets\.calendly\.com/i],
  },
  {
    id: "typeform",
    name: "Typeform",
    category: "forms",
    patterns: [/typeform\.com/i, /embed\.typeform/i],
  },
  {
    id: "tally",
    name: "Tally",
    category: "forms",
    patterns: [/tally\.so/i],
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "payments",
    patterns: [/js\.stripe\.com/i, /checkout\.stripe\.com/i],
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "payments",
    patterns: [/cdn\.shopify\.com/i, /shopify/i],
  },
  {
    id: "intercom",
    name: "Intercom",
    category: "chat",
    patterns: [/intercom/i, /widget\.intercom\.io/i],
  },
  {
    id: "crisp",
    name: "Crisp",
    category: "chat",
    patterns: [/crisp\.chat/i, /client\.crisp\.chat/i],
  },
  {
    id: "drift",
    name: "Drift",
    category: "chat",
    patterns: [/drift\.com/i, /js\.driftt\.com/i],
  },
  {
    id: "mailchimp",
    name: "Mailchimp",
    category: "email",
    patterns: [/mailchimp/i, /chimpstatic\.com/i, /list-manage\.com/i],
  },
  {
    id: "convertkit",
    name: "ConvertKit",
    category: "email",
    patterns: [/convertkit/i, /ck\.page/i],
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "automation",
    patterns: [/zapier/i, /zapier\.com/i],
  },
  {
    id: "n8n",
    name: "n8n",
    category: "automation",
    patterns: [/n8n/i],
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    category: "analytics",
    patterns: [/google-analytics\.com/i, /googletagmanager\.com/i, /gtag\(/i, /G-[A-Z0-9]+/i],
  },
  {
    id: "gtm",
    name: "Google Tag Manager",
    category: "analytics",
    patterns: [/googletagmanager\.com\/gtm\.js/i, /GTM-[A-Z0-9]+/i],
  },
  {
    id: "webflow",
    name: "Webflow",
    category: "cms",
    patterns: [/webflow\.io/i, /webflow\.com/i],
  },
  {
    id: "wordpress",
    name: "WordPress",
    category: "cms",
    patterns: [/wp-content/i, /wp-includes/i, /wordpress/i],
  },
];

/** Plain-language workflow ideas when a tool signal is detected on the public site. */
export const TOOL_AUTOMATION_PLAYBOOK: Record<
  string,
  { automationSuggestion: string; savingsNote: string }
> = {
  wordpress: {
    automationSuggestion:
      "Queue blog drafts, publish on a schedule, and turn each article into social posts or newsletter snippets automatically.",
    savingsNote:
      "Cuts hours of manual publishing each week — one pipeline instead of copy-paste across channels.",
  },
  webflow: {
    automationSuggestion:
      "Notify your team when a page goes live, keep SEO details consistent, and send form submissions straight to your customer list.",
    savingsNote:
      "Fewer launch checklists and less back-and-forth before pages go live.",
  },
  hubspot: {
    automationSuggestion:
      "When a lead fills out a form → save their details → label by interest → start a follow-up email sequence → alert sales for hot leads.",
    savingsNote:
      "Faster follow-up without someone watching the inbox all day — fewer leads go cold.",
  },
  salesforce: {
    automationSuggestion:
      "Assign new leads automatically, log meetings from your booking page, and move deals forward when key actions happen.",
    savingsNote:
      "Sales spends time closing, not updating records.",
  },
  pipedrive: {
    automationSuggestion:
      "Create deals from website forms, update stages when emails are opened, and alert owners when deals stall.",
    savingsNote:
      "Pipeline stays current without daily manual updates.",
  },
  calendly: {
    automationSuggestion:
      "When someone books → add to your customer list → send reminders → deliver a pre-call brief to your team.",
    savingsNote:
      "Less double entry and fewer no-shows — booking admin mostly runs itself.",
  },
  typeform: {
    automationSuggestion:
      "When a form is submitted → save answers → label the lead → send the right follow-up email → notify your team.",
    savingsNote:
      "No more exporting spreadsheets or retyping form data.",
  },
  tally: {
    automationSuggestion:
      "Route form submissions to the right person, save answers automatically, and trigger follow-up based on what they selected.",
    savingsNote:
      "Form handling becomes automatic instead of a daily inbox chore.",
  },
  stripe: {
    automationSuggestion:
      "Alert your team on failed payments, keep subscription status in sync, and send renewal reminders automatically.",
    savingsNote:
      "Recover revenue faster and spend less time on billing admin.",
  },
  shopify: {
    automationSuggestion:
      "Send abandoned-cart reminders, low-stock alerts, and order notifications without manual checks.",
    savingsNote:
      "Recovers sales and reduces last-minute inventory fire drills.",
  },
  intercom: {
    automationSuggestion:
      "Add a smart assistant that answers common questions from your help pages, then hands off to a person when needed.",
    savingsNote:
      "Support handles fewer repeat questions — team focuses on conversations that need a human.",
  },
  crisp: {
    automationSuggestion:
      "Answer FAQs from your site content automatically, escalate hot leads to sales, and log important conversations.",
    savingsNote:
      "Lower support load per visitor without hiring for every timezone.",
  },
  drift: {
    automationSuggestion:
      "Qualify visitors with a short conversation flow and book meetings into your calendar when they are a good fit.",
    savingsNote:
      "Captures interest while the team is busy — less manual chat qualification.",
  },
  mailchimp: {
    automationSuggestion:
      "Send the right email when someone signs up, when their interests change, or when you publish new content.",
    savingsNote:
      "Email runs on rules, not someone remembering to send each blast.",
  },
  convertkit: {
    automationSuggestion:
      "Welcome new subscribers automatically and send the right nurture emails based on what they signed up for.",
    savingsNote:
      "Onboarding scales without drafting the same emails repeatedly.",
  },
  zapier: {
    automationSuggestion:
      "Replace repetitive copy-paste between apps with a single automated flow tied to your customer journey.",
    savingsNote:
      "Small handoffs add up — often hours back each month for ops-heavy teams.",
  },
  n8n: {
    automationSuggestion:
      "Connect your website, customer list, email, and team notifications so data moves automatically when things happen.",
    savingsNote:
      "Fewer manual steps between the tools you already use.",
  },
  "google-analytics": {
    automationSuggestion:
      "Send a weekly summary of key numbers to your team and alert when traffic or conversions drop unexpectedly.",
    savingsNote:
      "Catch problems early — no one needs to log in and export data manually.",
  },
  gtm: {
    automationSuggestion:
      "Keep conversion tracking consistent and feed results into regular reporting once set up.",
    savingsNote:
      "Cleaner picture of what is working without one-off setup requests.",
  },
};

export const DEFAULT_TOOL_PLAYBOOK = {
  automationSuggestion:
    "When something happens here → save the details → notify the right person → trigger the next step automatically.",
  savingsNote:
    "Eliminates manual handoffs — time back for work that actually grows the business.",
};
