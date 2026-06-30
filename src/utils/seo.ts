import type { Metadata } from "next";

export const BASE_URL = "https://tilecalcpro.in";
export const SITE_NAME = "TileCalc Pro";

export const GLOBAL_KEYWORDS = [
  "Tile Calculator",
  "Bathroom Tile Calculator",
  "Floor Tile Calculator",
  "Tile Quantity Calculator",
  "Tile Cost Calculator",
  "Tile Box Calculator",
  "Wall Tile Calculator",
  "Tile Layout Calculator",
  "India Tile Calculator",
  "TileCalc Pro",
  "Free Tile Calculator",
  "Online Tile Calculator",
];

/**
 * Generates complete page-level Metadata for Next.js App Router.
 * Pass page-specific overrides; everything else falls back to global defaults.
 */
export function generatePageMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const canonicalUrl = `${BASE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const allKeywords = [...GLOBAL_KEYWORDS, ...keywords];

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: SITE_NAME, url: BASE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: `${BASE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} – ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${BASE_URL}/og-image.png`],
      creator: "@tilecalcpro",
      site: "@tilecalcpro",
    },
  };
}

/** JSON-LD structured data helpers */

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description:
      "Free online tile calculator for floor, bathroom, kitchen and wall. Calculate tile quantity, tile boxes, wastage and project cost instantly.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/floor-calculator`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/icons/icon-512.png`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${BASE_URL}/contact`,
    },
    sameAs: ["https://www.tilemasterpro.in"],
  };
}

export function webApplicationSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
