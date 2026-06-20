import { FETCH_CONCURRENCY, FETCH_TIMEOUT_MS, USER_AGENT } from "./constants";
import type { FetchedPage } from "./types";

async function fetchOnePage(url: string): Promise<FetchedPage> {
  const parsed = new URL(url);
  const path = parsed.pathname || "/";

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      redirect: "follow",
    });

    if (!res.ok) {
      return {
        url,
        path,
        html: "",
        htmlLength: 0,
        status: "error",
        error: `HTTP ${res.status}`,
      };
    }

    const html = await res.text();
    return {
      url,
      path,
      html,
      htmlLength: html.length,
      status: "success",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Fetch failed";
    return {
      url,
      path,
      html: "",
      htmlLength: 0,
      status: "error",
      error: message,
    };
  }
}

export async function fetchPages(urls: string[]): Promise<FetchedPage[]> {
  const results: FetchedPage[] = [];

  for (let i = 0; i < urls.length; i += FETCH_CONCURRENCY) {
    const batch = urls.slice(i, i + FETCH_CONCURRENCY);
    const batchResults = await Promise.all(batch.map(fetchOnePage));
    results.push(...batchResults);
  }

  return results;
}
