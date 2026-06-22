import { MAX_PAGES } from "@/lib/audit-core/constants";
import type { Locale } from "@/i18n/routing";
import en from "../../../messages/en.json";
import ro from "../../../messages/ro.json";
import type { AuditArea } from "./types";

export { MAX_PAGES };

const messagesByLocale = { en, ro } as const;

const AREA_COLORS: Record<AuditArea, string> = {
  contentMessaging: "#0284c7",
  conversionCro: "#34d399",
  seoDiscoverability: "#a78bfa",
  competitivePositioning: "#fbbf24",
  brandTrustGrowth: "#f472b6",
};

const AREA_IDS: AuditArea[] = [
  "contentMessaging",
  "conversionCro",
  "seoDiscoverability",
  "competitivePositioning",
  "brandTrustGrowth",
];

export type AuditAreaMeta = {
  id: AuditArea;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
};

export function getAuditConstants(locale: Locale) {
  const auditAreas =
    messagesByLocale[locale]?.marketingAudit.report.auditAreas ??
    messagesByLocale.en.marketingAudit.report.auditAreas;

  const areas: AuditAreaMeta[] = AREA_IDS.map((id) => ({
    id,
    label: auditAreas[id].label,
    shortLabel: auditAreas[id].shortLabel,
    description: auditAreas[id].description,
    color: AREA_COLORS[id],
  }));

  return { areas, maxPages: MAX_PAGES };
}

export const PRIORITY_PATH_PATTERNS: Array<{ pattern: RegExp; score: number }> = [
  { pattern: /^\/$/, score: 100 },
  { pattern: /^\/(pricing|plans?)(\/|$)/i, score: 90 },
  { pattern: /^\/(about|company)(\/|$)/i, score: 85 },
  { pattern: /^\/(product|products|features?)(\/|$)/i, score: 85 },
  { pattern: /^\/(services?|solutions?)(\/|$)/i, score: 80 },
  { pattern: /^\/(contact)(\/|$)/i, score: 75 },
  { pattern: /^\/(demo|book|schedule|get-started|signup|sign-up)(\/|$)/i, score: 75 },
  { pattern: /^\/(how-it-works|platform)(\/|$)/i, score: 70 },
  { pattern: /^\/(customers?|case-stud(?:y|ies)|testimonials?)(\/|$)/i, score: 65 },
];

/** @deprecated Prefer getAuditConstants(locale).areas */
export const AUDIT_AREAS = getAuditConstants("en").areas;
