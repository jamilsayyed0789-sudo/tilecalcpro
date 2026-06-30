import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { GoogleAnalytics } from '@next/third-parties/google';
import {
  BASE_URL,
  SITE_NAME,
  GLOBAL_KEYWORDS,
  websiteSchema,
  organizationSchema,
} from "@/utils/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} – Free Tile Calculator for Floor, Bathroom & Wall`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free online tile calculator for floor, bathroom, kitchen and wall. Calculate tile quantity, tile boxes, wastage and project cost instantly.",
  keywords: GLOBAL_KEYWORDS,
  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} – Free Tile Calculator for Floor, Bathroom & Wall`,
    description:
      "Free online tile calculator for floor, bathroom, kitchen and wall. Calculate tile quantity, tile boxes, wastage and project cost instantly.",
    url: BASE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} – Free Tile Calculator`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – Free Tile Calculator for Floor, Bathroom & Wall`,
    description:
      "Free online tile calculator for floor, bathroom, kitchen and wall. Calculate tile quantity, tile boxes, wastage and project cost instantly.",
    images: ["/og-image.png"],
    creator: "@tilecalcpro",
    site: "@tilecalcpro",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  category: "utility",
  applicationName: SITE_NAME,
  verification: {
    // Add your Google Search Console verification token here when ready:
    // google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Global JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#2563EB" />
        <meta name="color-scheme" content="dark" />
        {/* Google Analytics 4 – replace GA_MEASUREMENT_ID when ready */}
        {/* 
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}} />
        */}
        {/* Microsoft Clarity – replace CLARITY_ID when ready */}
        {/*
        <script dangerouslySetInnerHTML={{ __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "CLARITY_ID");
        `}} />
        */}
        {/* Google AdSense – replace ca-pub-XXXXXXXXXXXXXXXX when approved */}
        {/*
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
        */}
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <Header />
          <main className="flex-1 flex flex-col pt-20">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
        <GoogleAnalytics gaId="G-87XZEF1EH5" />
      </body>
    </html>
  );
}
