export const MAX_PAGES = 5;
export const FETCH_TIMEOUT_MS = 30_000;
export const FETCH_CONCURRENCY = 5;
export const TOTAL_EXCERPT_CHARS = 90_000;
export const PER_PAGE_EXCERPT_CHARS = Math.floor(TOTAL_EXCERPT_CHARS / MAX_PAGES);

export const USER_AGENT = "Mozilla/5.0 (compatible; site-audit/1.0)";

export const NON_HTML_EXTENSIONS = new Set([
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".svg",
  ".ico",
  ".xml",
  ".json",
  ".zip",
  ".mp4",
  ".mp3",
  ".css",
  ".js",
  ".woff",
  ".woff2",
]);

/** Default paths probed when sitemap/crawl find too few pages. */
export const DEFAULT_PROBE_PATHS = [
  "/about",
  "/pricing",
  "/plans",
  "/contact",
  "/services",
  "/products",
  "/features",
  "/solutions",
  "/demo",
  "/blog",
  "/community",
  "/company",
  "/how-it-works",
  "/platform",
  "/customers",
  "/case-studies",
  "/login",
  "/signup",
  "/docs",
  "/help",
  "/support",
  "/integrations",
  "/api",
  "/ai-news",
  "/marketing-audit",
  "/automation-audit",
] as const;
