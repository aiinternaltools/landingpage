import { buildLlmExcerpt } from "@/lib/audit-core/build-llm-excerpt";
import { discoverPages } from "@/lib/audit-core/discover-pages";
import { fetchPages } from "@/lib/audit-core/fetch-page-html";
import { htmlToPlainText } from "@/lib/audit-core/html-to-text";
import { normalizeTargetUrl } from "@/lib/audit-core/validate-url";
import {
  getAuditApiError,
  parseAuditLocale,
} from "@/lib/audit-api-messages";
import { detectIntegrations } from "@/lib/automation-audit/detect-integrations";
import { mergeReport } from "@/lib/automation-audit/merge-report";
import {
  hasOpenAiKey,
  runAutomationAuditLlm,
  runExecutiveLlm,
} from "@/lib/automation-audit/openai-audit";
import { prioritizePages } from "@/lib/automation-audit/prioritize-pages";
import type { PageTextResult } from "@/lib/automation-audit/types";

export const maxDuration = 90;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: getAuditApiError("en", "automationAudit", "invalidJson") },
      { status: 400 }
    );
  }

  const locale = parseAuditLocale(body);

  let targetUrl: string | null = null;
  if (body && typeof body === "object") {
    const value = (body as Record<string, unknown>).targetUrl;
    if (typeof value === "string") targetUrl = value;
  }

  if (!targetUrl) {
    return Response.json(
      { error: getAuditApiError(locale, "automationAudit", "targetUrlRequired") },
      { status: 400 }
    );
  }

  const normalized = normalizeTargetUrl(targetUrl);
  if (!normalized) {
    return Response.json(
      { error: getAuditApiError(locale, "automationAudit", "invalidUrl") },
      { status: 400 }
    );
  }

  if (!hasOpenAiKey()) {
    return Response.json(
      { error: getAuditApiError(locale, "automationAudit", "openAiNotConfigured") },
      { status: 503 }
    );
  }

  try {
    const fetchedAt = new Date().toISOString();

    const discovery = await discoverPages(normalized);
    const selection = prioritizePages(discovery.pages);

    const urlsToFetch =
      selection.selectedUrls.length > 0 ? selection.selectedUrls : [normalized];

    const fetched = await fetchPages(urlsToFetch);
    const detectedTools = detectIntegrations(fetched);

    const pageResults: PageTextResult[] = fetched.map((page) => {
      if (page.status !== "success" || !page.html) {
        return {
          url: page.url,
          path: page.path,
          pageText: "",
          pageTextLength: 0,
          htmlLength: page.htmlLength,
          status: page.status,
          error: page.error,
        };
      }
      const pageText = htmlToPlainText(page.html);
      return {
        url: page.url,
        path: page.path,
        pageText,
        pageTextLength: pageText.length,
        htmlLength: page.htmlLength,
        status: "success" as const,
      };
    });

    const excerpt = buildLlmExcerpt(pageResults);

    if (!excerpt.textExcerpt) {
      return Response.json(
        { error: getAuditApiError(locale, "automationAudit", "noPageContent") },
        { status: 502 }
      );
    }

    const auditRaw = await runAutomationAuditLlm(
      normalized,
      fetchedAt,
      excerpt,
      detectedTools,
      locale
    );
    const executiveRaw = await runExecutiveLlm(auditRaw, locale);

    const report = mergeReport({
      targetUrl: normalized,
      discoveryMethod: discovery.method,
      totalDiscovered: selection.totalDiscovered,
      pagesSelected: selection.pagesSelected,
      pageResults,
      detectedTools,
      auditRaw,
      executiveRaw,
      locale,
    });

    return Response.json(report);
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : getAuditApiError(locale, "automationAudit", "auditFailed");
    return Response.json({ error: message }, { status: 502 });
  }
}
