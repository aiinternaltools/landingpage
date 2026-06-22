import type { Locale } from "@/i18n/routing";
import en from "../../messages/en.json";
import ro from "../../messages/ro.json";

export type AuditNamespace = "marketingAudit" | "automationAudit";

export type AuditApiErrorKey =
  | "invalidJson"
  | "targetUrlRequired"
  | "invalidUrl"
  | "openAiNotConfigured"
  | "noPageContent"
  | "auditFailed";

const messagesByLocale = { en, ro } as const;

export function getAuditApiError(
  locale: Locale,
  namespace: AuditNamespace,
  key: AuditApiErrorKey
): string {
  const messages = messagesByLocale[locale] ?? messagesByLocale.en;
  const bucket = messages[namespace] as {
    apiErrors: Record<AuditApiErrorKey, string>;
  };
  return bucket.apiErrors[key] ?? messagesByLocale.en[namespace].apiErrors[key];
}

export function parseAuditLocale(body: unknown): Locale {
  if (body && typeof body === "object") {
    const locale = (body as Record<string, unknown>).locale;
    if (locale === "ro" || locale === "en") return locale;
  }
  return "en";
}
