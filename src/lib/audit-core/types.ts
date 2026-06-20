export type DiscoveryMethod = "sitemap" | "crawl" | "sitemap+crawl";

export type PageAuditStatus = "success" | "error";

export type DiscoveredPage = {
  url: string;
  path: string;
  priority?: number;
};

export type DiscoveryResult = {
  pages: DiscoveredPage[];
  method: DiscoveryMethod;
};

export type PrioritizedSelection = {
  selectedUrls: string[];
  totalDiscovered: number;
  pagesSelected: number;
};

export type FetchedPage = {
  url: string;
  path: string;
  html: string;
  htmlLength: number;
  status: PageAuditStatus;
  error?: string;
};

export type PageTextResult = {
  url: string;
  path: string;
  pageText: string;
  pageTextLength: number;
  htmlLength: number;
  status: PageAuditStatus;
  error?: string;
};

export type PageAudited = {
  url: string;
  path: string;
  htmlLength: number;
  pageTextLength: number;
  status: PageAuditStatus;
  error?: string;
};

export type LlmExcerptResult = {
  textExcerpt: string;
  excerptTruncated: boolean;
  excerptChars: number;
  pageCount: number;
};
