import type { MetadataRoute } from "next";

const SITE_URL = "https://leanhippo.io";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Allow everyone, including AI answer-engine crawlers (GPTBot,
      // ClaudeBot, PerplexityBot, Google-Extended, etc.).
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
