import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: "https://tilecalcpro.in/sitemap.xml",
    host: "https://tilecalcpro.in",
  };
}
