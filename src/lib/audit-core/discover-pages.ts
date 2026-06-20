import { MAX_PAGES, FETCH_TIMEOUT_MS, NON_HTML_EXTENSIONS, USER_AGENT } from "./constants";
import { probeCommonPaths } from "./probe-common-paths";
import type { DiscoveredPage, DiscoveryMethod, DiscoveryResult } from "./types";
import { getOrigin, normalizeTargetUrl } from "./validate-url";

function isHtmlLikeUrl(url: URL): boolean {
  const path = url.pathname.toLowerCase();
  const ext = path.includes(".") ? path.slice(path.lastIndexOf(".")) : "";
  if (ext && NON_HTML_EXTENSIONS.has(ext)) return false;
  if (url.protocol !== "http:" && url.protocol !== "https:") return false;
  return true;
}

function toDiscoveredPage(url: URL, priority?: number): DiscoveredPage {
  return {
    url: url.toString(),
    path: url.pathname || "/",
    priority,
  };
}

function pathKey(path: string): string {
  return path.replace(/\/$/, "") || "/";
}

function parseSitemapLocs(xml: string): Array<{ loc: string; priority?: number }> {
  const entries: Array<{ loc: string; priority?: number }> = [];
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/gi) ?? [];

  for (const block of urlBlocks) {
    const locMatch = block.match(/<loc>\s*([^<]+)\s*<\/loc>/i);
    if (!locMatch) continue;
    const loc = locMatch[1].trim();
    const priorityMatch = block.match(/<priority>\s*([^<]+)\s*<\/priority>/i);
    const priority = priorityMatch
      ? Number.parseFloat(priorityMatch[1].trim())
      : undefined;
    entries.push({
      loc,
      priority: Number.isFinite(priority) ? priority : undefined,
    });
  }

  if (entries.length === 0) {
    const locs = xml.match(/<loc>\s*([^<]+)\s*<\/loc>/gi) ?? [];
    for (const locTag of locs) {
      const m = locTag.match(/<loc>\s*([^<]+)\s*<\/loc>/i);
      if (m) entries.push({ loc: m[1].trim() });
    }
  }

  return entries;
}

function parseSitemapIndex(xml: string): string[] {
  const locs = xml.match(/<loc>\s*([^<]+)\s*<\/loc>/gi) ?? [];
  return locs
    .map((tag) => {
      const m = tag.match(/<loc>\s*([^<]+)\s*<\/loc>/i);
      return m ? m[1].trim() : "";
    })
    .filter(Boolean);
}

async function fetchText(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      redirect: "follow",
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function filterSameOrigin(
  entries: Array<{ loc: string; priority?: number }>,
  origin: string
): DiscoveredPage[] {
  const seen = new Set<string>();
  const pages: DiscoveredPage[] = [];

  for (const entry of entries) {
    try {
      const url = new URL(entry.loc);
      if (url.origin !== origin) continue;
      if (!isHtmlLikeUrl(url)) continue;
      const key = pathKey(url.pathname);
      if (seen.has(key)) continue;
      seen.add(key);
      pages.push(toDiscoveredPage(url, entry.priority));
    } catch {
      // skip invalid URLs
    }
  }

  return pages;
}

function addPage(pages: Map<string, DiscoveredPage>, page: DiscoveredPage) {
  const key = pathKey(page.path);
  const existing = pages.get(key);
  if (!existing) {
    pages.set(key, page);
  } else if (page.priority !== undefined && existing.priority === undefined) {
    pages.set(key, { ...existing, priority: page.priority });
  }
}

function extractLinksFromHtml(html: string, origin: string): DiscoveredPage[] {
  const seen = new Set<string>();
  const pages: DiscoveredPage[] = [];

  const patterns = [
    /<a\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi,
    /\bhref\s*=\s*["'](\/[^"'#?][^"']*)["']/gi,
    /"href"\s*:\s*"(\/[^"#?\\]+)"/gi,
    /'href'\s*:\s*'(\/[^'#?\\]+)'/gi,
  ];

  for (const pattern of patterns) {
    let match: RegExpExecArray | null;
    const re = new RegExp(pattern.source, pattern.flags);
    while ((match = re.exec(html)) !== null) {
      const href = match[1].trim();
      if (!href || href.startsWith("#") || href.startsWith("mailto:")) continue;
      if (href.startsWith("javascript:")) continue;

      try {
        const url = new URL(href, origin);
        if (url.origin !== origin) continue;
        if (!isHtmlLikeUrl(url)) continue;
        const key = pathKey(url.pathname);
        if (seen.has(key)) continue;
        seen.add(key);
        pages.push(toDiscoveredPage(url));
      } catch {
        // skip invalid URLs
      }
    }
  }

  return pages;
}

async function discoverSitemapUrls(origin: string): Promise<string[]> {
  const candidates = new Set<string>([`${origin}/sitemap.xml`]);

  const robots = await fetchText(`${origin}/robots.txt`);
  if (robots) {
    const lines = robots.match(/^Sitemap:\s*(.+)$/gim) ?? [];
    for (const line of lines) {
      const m = line.match(/^Sitemap:\s*(.+)$/i);
      if (m) candidates.add(m[1].trim());
    }
  }

  return Array.from(candidates);
}

async function discoverFromSitemaps(origin: string): Promise<DiscoveredPage[]> {
  const sitemapUrls = await discoverSitemapUrls(origin);
  const all: DiscoveredPage[] = [];

  for (const sitemapUrl of sitemapUrls) {
    const xml = await fetchText(sitemapUrl);
    if (!xml) continue;

    const isIndex = /<sitemapindex/i.test(xml);
    if (isIndex) {
      const childSitemaps = parseSitemapIndex(xml);
      for (const childUrl of childSitemaps.slice(0, 8)) {
        const childXml = await fetchText(childUrl);
        if (childXml) {
          all.push(...filterSameOrigin(parseSitemapLocs(childXml), origin));
        }
      }
    } else {
      all.push(...filterSameOrigin(parseSitemapLocs(xml), origin));
    }
  }

  return all;
}

export async function discoverPages(targetUrl: string): Promise<DiscoveryResult> {
  const normalized = normalizeTargetUrl(targetUrl);
  if (!normalized) {
    return { pages: [], method: "crawl" };
  }

  const origin = getOrigin(normalized);
  const homepage = new URL(normalized);
  const homepagePage = toDiscoveredPage(homepage);

  const merged = new Map<string, DiscoveredPage>();
  addPage(merged, homepagePage);

  const sitemapPages = await discoverFromSitemaps(origin);
  let hadSitemap = sitemapPages.length > 0;
  for (const page of sitemapPages) addPage(merged, page);

  const homepageHtml = await fetchText(homepage.toString());
  let hadCrawl = false;
  if (homepageHtml) {
    const crawlPages = extractLinksFromHtml(homepageHtml, origin);
    hadCrawl = crawlPages.length > 0;
    for (const page of crawlPages) addPage(merged, page);
  }

  if (merged.size < MAX_PAGES) {
    const existingPaths = new Set(merged.keys());
    const probed = await probeCommonPaths(
      origin,
      existingPaths,
      MAX_PAGES * 4
    );
    if (probed.length > 0) hadCrawl = true;
    for (const page of probed) addPage(merged, page);
  }

  let method: DiscoveryMethod = "crawl";
  if (hadSitemap && hadCrawl) method = "sitemap+crawl";
  else if (hadSitemap) method = "sitemap";

  return {
    pages: Array.from(merged.values()),
    method,
  };
}
