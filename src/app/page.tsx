"use client";

import Link from "next/link";
import { ArrowRight, Calculator, Grid, PaintBucket } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  BASE_URL,
  webApplicationSchema,
  breadcrumbSchema,
} from "@/utils/seo";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <>
      {/* Page-specific JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            webApplicationSchema({
              name: "TileCalc Pro – Free Tile Calculator",
              description:
                "Free online tile calculator for floor, bathroom, kitchen and wall. Calculate tile quantity, tile boxes, wastage and project cost instantly.",
              url: BASE_URL,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([{ name: "Home", url: BASE_URL }])
          ),
        }}
      />

      <div className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full relative overflow-hidden py-24 md:py-32 lg:py-40">
          <div className="absolute inset-0 bg-hero-pattern opacity-50"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>{t.freeTools}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-3">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              {language === "hi"
                ? "टाइलकैलक प्रो — हर टाइल की सटीक गणना करें"
                : language === "mr"
                ? "टाइलकॅल्क प्रो — प्रत्येक टाइलची अचूक गणना करा"
                : "TileCalc Pro — Accurate Calculation for Every Tile"}
            </p>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              {t.heroSubtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/floor-calculator" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105">
                {t.startCalc} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/designer" className="w-full sm:w-auto px-8 py-4 rounded-xl glass hover:bg-white/5 font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105">
                {t.exploreDesigner} <PaintBucket className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* TileMasterPro Premium B2B Banner */}
        <div className="w-full max-w-4xl mx-auto my-8 px-4">
          <div className="glass-card p-6 rounded-2xl border border-accent/25 bg-gradient-to-r from-accent/15 to-accent/0 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-110 transition-transform"></div>
            <div className="space-y-2 text-center md:text-left relative z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider">
                ✨ {language === "hi" ? "प्रीमियम शोरूम टूल" : language === "mr" ? "प्रीमियम शोरूम टूल" : "Premium Showroom Tool"}
              </span>
              <h3 className="text-lg font-bold text-white">
                {language === "hi" ? "क्या आपको सिर्फ एक कैलकुलेटर से ज्यादा की जरूरत है?" : language === "mr" ? "तुम्हाला फक्त कॅल्क्युलेटरपेक्षा काहीतरी जास्त हवे आहे का?" : "Need More Than Just a Calculator?"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-lg">
                {language === "hi" 
                  ? "TileMasterPro के साथ AI-संचालित टाइल विज़ुअलाइज़ेशन, 3D बाथरूम/किचन प्रीव्यू और ऑटोमेटेड OCR कैटलॉग मैनेजमेंट का अनुभव करें।" 
                  : language === "mr" 
                  ? "TileMasterPro सह AI-आधारित टाइल व्हिज्युअलायझेशन, 3D बाथरूम/किचन प्रिव्ह्यू आणि स्वयंचलित OCR कॅटलॉग व्यवस्थापनाचा अनुभव घ्या।" 
                  : "Experience AI-powered tile visualization, 3D bathroom/kitchen previews, and automated OCR catalog management with TileMasterPro."}
              </p>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground pt-1 justify-center md:justify-start">
                <span>🎁 <strong>{language === "hi" ? "३ दिनों का फ्री ट्रायल" : language === "mr" ? "३ दिवसांची मोफत चाचणी" : "3-Day FREE Trial"}</strong> ({language === "hi" || language === "mr" ? "कार्डची आवश्यकता नाही" : "No card required"})</span>
                <span>•</span>
                <span>📞 {language === "hi" ? "लाइव डेमो" : language === "mr" ? "लाइव्ह डेमो" : "Live Demo"}: <strong>+91 8329850523</strong></span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 relative z-10 w-full md:w-auto">
              <a 
                href="https://www.tilemasterpro.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full md:w-auto px-5 py-3 bg-accent hover:bg-accent/90 text-white font-bold text-xs rounded-xl shadow-md shadow-accent/15 transition-transform hover:scale-[1.02] text-center"
              >
                🚀 {language === "hi" ? "TileMasterPro आज़माएं" : language === "mr" ? "TileMasterPro वापरून पहा" : "Try TileMasterPro"}
              </a>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <section className="w-full py-20 bg-black/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">{t.suiteTitle}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t.suiteSubtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-2xl flex flex-col items-start transition-all hover:-translate-y-2">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-6">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t.floorCalc}</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  {t.floorCalcDesc}
                </p>
                <Link href="/floor-calculator" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  {t.tryItNow} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="glass-card p-8 rounded-2xl flex flex-col items-start transition-all hover:-translate-y-2">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent mb-6">
                  <Grid className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t.bathroomCalc}</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  {t.bathCalcDesc}
                </p>
                <Link href="/bathroom-calculator" className="text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  {t.tryItNow} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="glass-card p-8 rounded-2xl flex flex-col items-start transition-all hover:-translate-y-2">
                <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400 mb-6">
                  <PaintBucket className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t.designerMode}</h3>
                <p className="text-muted-foreground mb-6 flex-1">
                  {t.designerDesc}
                </p>
                <Link href="/designer" className="text-teal-400 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  {t.tryItNow} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
