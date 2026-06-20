import { MAX_PAGES } from "@/lib/audit-core/constants";
import type { AuditArea } from "./types";

export { MAX_PAGES };

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

export const AUDIT_AREAS: Array<{
  id: AuditArea;
  label: string;
  shortLabel: string;
  description: string;
  color: string;
}> = [
  {
    id: "contentMessaging",
    label: "Content & Messaging",
    shortLabel: "Content",
    description: "Headlines, value props, and clarity of message.",
    color: "#0284c7",
  },
  {
    id: "conversionCro",
    label: "Conversion & CRO",
    shortLabel: "CRO",
    description: "CTAs, forms, friction, and conversion paths.",
    color: "#34d399",
  },
  {
    id: "seoDiscoverability",
    label: "SEO & Discoverability",
    shortLabel: "SEO",
    description: "Keywords, structure, and organic visibility signals.",
    color: "#a78bfa",
  },
  {
    id: "competitivePositioning",
    label: "Competitive Positioning",
    shortLabel: "Positioning",
    description: "Differentiation and competitive framing.",
    color: "#fbbf24",
  },
  {
    id: "brandTrustGrowth",
    label: "Brand Trust & Growth",
    shortLabel: "Trust",
    description: "Credibility, social proof, and trust signals.",
    color: "#f472b6",
  },
];
