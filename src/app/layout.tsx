import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TileCalc Pro | Free Tile Calculators & Design Tools",
  description: "Calculate tile quantities, estimate project costs, design your rooms, and plan your tile layouts—all in one place, completely free.",
  openGraph: {
    title: "TileCalc Pro | Free Tile Calculators & Design Tools",
    description: "Calculate tile quantities, estimate project costs, design your rooms, and plan your tile layouts—all in one place, completely free.",
    type: "website",
    url: "https://www.tilecalcpro.com",
    siteName: "TileCalc Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "TileCalc Pro | Free Tile Calculators & Design Tools",
    description: "Calculate tile quantities, estimate project costs, design your rooms, and plan your tile layouts—all in one place, completely free.",
  },
  alternates: {
    canonical: "https://www.tilecalcpro.com",
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <Header />
          <main className="flex-1 flex flex-col pt-20">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
