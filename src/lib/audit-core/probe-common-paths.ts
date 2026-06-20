import { DEFAULT_PROBE_PATHS, FETCH_TIMEOUT_MS, USER_AGENT } from "./constants";
import type { DiscoveredPage } from "./types";

async function pathExists(origin: string, path: string): Promise<boolean> {
  const url = `${origin}${path}`;
  try {
    const res = await fetch(url, {
      method: "HEAD",
      headers: { "User-Agent": USER_AGENT },
      signal: AbortSignal.timeout(8_000),
      redirect: "follow",
    });
    if (res.ok) return true;
    if (res.status === 405 || res.status === 501) {
      const getRes = await fetch(url, {
        method: "GET",
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "text/html",
        },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        redirect: "follow",
      });
      return getRes.ok;
    }
    return false;
  } catch {
    return false;
  }
}

export async function probeCommonPaths(
  origin: string,
  existingPaths: Set<string>,
  maxToFind: number,
  paths: readonly string[] = DEFAULT_PROBE_PATHS
): Promise<DiscoveredPage[]> {
  const found: DiscoveredPage[] = [];

  for (const path of paths) {
    if (found.length >= maxToFind) break;
    const key = path.replace(/\/$/, "") || "/";
    if (existingPaths.has(key)) continue;

    const exists = await pathExists(origin, path);
    if (exists) {
      existingPaths.add(key);
      found.push({
        url: `${origin}${path}`,
        path,
      });
    }
  }

  return found;
}
