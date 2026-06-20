import { prioritizePages as prioritizePagesCore } from "@/lib/audit-core/prioritize-pages";
import type { DiscoveredPage, PrioritizedSelection } from "@/lib/audit-core/types";
import { PRIORITY_PATH_PATTERNS } from "./constants";

export function prioritizePages(pages: DiscoveredPage[]): PrioritizedSelection {
  return prioritizePagesCore(pages, PRIORITY_PATH_PATTERNS);
}
