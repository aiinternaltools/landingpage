import { buildLlmExcerpt } from "@/lib/audit-core/build-llm-excerpt";
import { discoverPages } from "@/lib/audit-core/discover-pages";
import { fetchPages } from "@/lib/audit-core/fetch-page-html";
import { htmlToPlainText } from "@/lib/audit-core/html-to-text";
import { normalizeTargetUrl } from "@/lib/audit-core/validate-url";
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
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let targetUrl: string | null = null;
  if (body && typeof body === "object") {
    const value = (body as Record<string, unknown>).targetUrl;
    if (typeof value === "string") targetUrl = value;
  }

  if (!targetUrl) {
    return Response.json({ error: "targetUrl is required" }, { status: 400 });
  }

  const normalized = normalizeTargetUrl(targetUrl);
  if (!normalized) {
    return Response.json({ error: "Invalid or blocked URL" }, { status: 400 });
  }

  if (!hasOpenAiKey()) {
    return Response.json(
      { error: "OPENAI_API_KEY is not configured" },
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
        { error: "Could not fetch any page content to audit" },
        { status: 502 }
      );
    }

    const auditRaw = await runAutomationAuditLlm(
      normalized,
      fetchedAt,
      excerpt,
      detectedTools
    );
    const executiveRaw = await runExecutiveLlm(auditRaw);

    const report = mergeReport({
      targetUrl: normalized,
      discoveryMethod: discovery.method,
      totalDiscovered: selection.totalDiscovered,
      pagesSelected: selection.pagesSelected,
      pageResults,
      detectedTools,
      auditRaw,
      executiveRaw,
    });

    return Response.json(report);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Audit failed";
    return Response.json({ error: message }, { status: 502 });
  }
}
