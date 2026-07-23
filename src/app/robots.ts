import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/login"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "Google-Extended", "ClaudeBot", "PerplexityBot", "Applebot-Extended"],
        allow: "/",
        disallow: ["/api/", "/login"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
