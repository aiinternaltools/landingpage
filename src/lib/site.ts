/** Canonical site identity for SEO, GEO, sitemap, and structured data. */

export const SITE_URL = "https://aiinternaltools.com";
export const SITE_NAME = "AI Internal Tools";
export const SITE_AUTHOR = "Andrei Alexandru Gabriel";
export const DEFAULT_OG_IMAGE = "/logoAIT.png";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
