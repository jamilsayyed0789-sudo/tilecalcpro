import type { MetadataRoute } from "next";

const BASE_URL = "https://tilecalcpro.in";

// All public pages with their SEO priority config
const pages: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/",                    changeFrequency: "weekly",  priority: 1.0 },
  { path: "/floor-calculator",    changeFrequency: "monthly", priority: 0.9 },
  { path: "/bathroom-calculator", changeFrequency: "monthly", priority: 0.9 },
  { path: "/designer",            changeFrequency: "monthly", priority: 0.9 },
  { path: "/about",               changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact",             changeFrequency: "monthly", priority: 0.8 },
  { path: "/privacy",             changeFrequency: "yearly",  priority: 0.5 },
  { path: "/terms",               changeFrequency: "yearly",  priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
