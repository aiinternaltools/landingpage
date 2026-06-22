import type { Locale } from "@/i18n/routing";
import type { DetectedTool, LlmExcerptResult } from "../types";
import * as en from "./en";
import * as ro from "./ro";

export type AuditPrompts = {
  AUDIT_SYSTEM_PROMPT: string;
  EXECUTIVE_SYSTEM_PROMPT: string;
  buildAuditUserPrompt: (
    normalizedUrl: string,
    fetchedAt: string,
    excerpt: LlmExcerptResult,
    detectedTools: DetectedTool[]
  ) => string;
  buildExecutiveUserPrompt: (auditJson: string) => string;
};

export function getAuditPrompts(locale: Locale): AuditPrompts {
  return (locale === "ro" ? ro : en) as AuditPrompts;
}
