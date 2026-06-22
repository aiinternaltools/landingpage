import { buildLlmExcerpt } from "@/lib/marketing-audit/build-llm-excerpt";
import { discoverPages } from "@/lib/marketing-audit/discover-pages";
import { fetchPages } from "@/lib/marketing-audit/fetch-page-html";
import { htmlToPlainText } from "@/lib/marketing-audit/html-to-text";
import { mergeReport } from "@/lib/marketing-audit/merge-report";
import {
  hasOpenAiKey,
  runAuditLlm,
  runExecutiveLlm,
} from "@/lib/marketing-audit/openai-audit";
import { prioritizePages } from "@/lib/marketing-audit/prioritize-pages";
import type { PageTextResult } from "@/lib/marketing-audit/types";
import { normalizeTargetUrl } from "@/lib/marketing-audit/validate-url";
import {
  getAuditApiError,
  parseAuditLocale,
} from "@/lib/audit-api-messages";

export const maxDuration = 90;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: getAuditApiError("en", "marketingAudit", "invalidJson") },
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
      { error: getAuditApiError(locale, "marketingAudit", "targetUrlRequired") },
      { status: 400 }
    );
  }

  const normalized = normalizeTargetUrl(targetUrl);
  if (!normalized) {
    return Response.json(
      { error: getAuditApiError(locale, "marketingAudit", "invalidUrl") },
      { status: 400 }
    );
  }

  if (!hasOpenAiKey()) {
    return Response.json(
      { error: getAuditApiError(locale, "marketingAudit", "openAiNotConfigured") },
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
        { error: getAuditApiError(locale, "marketingAudit", "noPageContent") },
        { status: 502 }
      );
    }

    const auditRaw = await runAuditLlm(normalized, fetchedAt, excerpt, locale);
    const executiveRaw = await runExecutiveLlm(auditRaw, locale);

    const report = mergeReport({
      targetUrl: normalized,
      discoveryMethod: discovery.method,
      totalDiscovered: selection.totalDiscovered,
      pagesSelected: selection.pagesSelected,
      pageResults,
      auditRaw,
      executiveRaw,
    });

    return Response.json(report);
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : getAuditApiError(locale, "marketingAudit", "auditFailed");
    return Response.json({ error: message }, { status: 502 });
  }
}
