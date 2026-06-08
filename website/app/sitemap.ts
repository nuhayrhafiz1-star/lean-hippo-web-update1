import type { MetadataRoute } from "next";

const SITE_URL = "https://leanhippo.io";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/business-systems`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];
}
