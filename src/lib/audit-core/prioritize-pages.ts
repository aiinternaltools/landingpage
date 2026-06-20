import { MAX_PAGES } from "./constants";
import type { DiscoveredPage, PrioritizedSelection } from "./types";

export type PriorityPathPattern = { pattern: RegExp; score: number };

function normalizePath(path: string): string {
  const p = path || "/";
  if (p !== "/" && p.endsWith("/")) return p.slice(0, -1);
  return p;
}

function scorePath(
  path: string,
  priorityPatterns: PriorityPathPattern[],
  priority?: number
): number {
  const normalized = normalizePath(path);
  let score = 0;

  for (const { pattern, score: boost } of priorityPatterns) {
    if (pattern.test(normalized)) {
      score = Math.max(score, boost);
    }
  }

  if (priority !== undefined && Number.isFinite(priority)) {
    score += priority * 50;
  }

  const depth = normalized.split("/").filter(Boolean).length;
  score += Math.max(0, 10 - depth * 2);

  if (normalized === "/") {
    score += 1000;
  }

  return score;
}

export function prioritizePages(
  pages: DiscoveredPage[],
  priorityPatterns: PriorityPathPattern[]
): PrioritizedSelection {
  const totalDiscovered = pages.length;

  if (totalDiscovered === 0) {
    return { selectedUrls: [], totalDiscovered: 0, pagesSelected: 0 };
  }

  const ranked = [...pages].sort((a, b) => {
    const scoreDiff =
      scorePath(b.path, priorityPatterns, b.priority) -
      scorePath(a.path, priorityPatterns, a.priority);
    if (scoreDiff !== 0) return scoreDiff;
    return a.path.localeCompare(b.path);
  });

  const selectedUrls = ranked.slice(0, MAX_PAGES).map((p) => p.url);

  return {
    selectedUrls,
    totalDiscovered,
    pagesSelected: selectedUrls.length,
  };
}
