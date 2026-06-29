"use client";

import Link from "next/link";
import { Calculator, Grid, Paintbrush, Phone, Mail, Shield, FileText, Info } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();

  const lbl = (en: string, hi: string, mr: string) => {
    if (language === "hi") return hi;
    if (language === "mr") return mr;
    return en;
  };

  return (
    <footer className="border-t border-white/5 bg-[#070c14] mt-auto">
      <div className="container mx-auto px-4 py-12">
        
        {/* Top Section - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-extrabold text-base">TileCalc Pro</span>
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed max-w-[220px]">
              {lbl(
                "Free professional tile calculators for shop owners, designers, laborers, and tile fitting workers.",
                "दुकान मालकों, डिजाइनरों, मजदूरों और टाइल फिटिंग कर्मचारियों के लिए मुफ्त प्रोफेशनल टाइल कैलकुलेटर।",
                "दुकानदार, डिझायनर, मजूर आणि टाइल फिटिंग कामगारांसाठी मोफत व्यावसायिक टाइल कॅल्क्युलेटर."
              )}
            </p>
            <div className="text-[11px] text-[#475569]">
              {lbl("Powered by", "संचालित", "समर्थित")}{" "}
              <a href="https://www.tilemasterpro.in" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">TileMasterPro</a>
            </div>
          </div>

          {/* Calculators Column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm">{lbl("Calculators", "कैलकुलेटर", "कॅल्क्युलेटर")}</h3>
            <nav className="flex flex-col space-y-2.5 text-xs text-[#64748b]">
              <Link href="/floor-calculator" className="flex items-center gap-2 hover:text-white transition-colors">
                <Calculator className="w-3.5 h-3.5 text-primary/70" /> {t.floorCalc}
              </Link>
              <Link href="/bathroom-calculator" className="flex items-center gap-2 hover:text-white transition-colors">
                <Grid className="w-3.5 h-3.5 text-accent/70" /> {t.bathroomCalc}
              </Link>
              <Link href="/designer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Paintbrush className="w-3.5 h-3.5 text-teal-400/70" /> {t.designerMode}
              </Link>
            </nav>
          </div>

          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm">{lbl("Legal", "कानूनी", "कायदेशीर")}</h3>
            <nav className="flex flex-col space-y-2.5 text-xs text-[#64748b]">
              <Link href="/privacy" className="flex items-center gap-2 hover:text-white transition-colors">
                <Shield className="w-3.5 h-3.5" /> {lbl("Privacy Policy", "गोपनीयता नीति", "गोपनीयता धोरण")}
              </Link>
              <Link href="/terms" className="flex items-center gap-2 hover:text-white transition-colors">
                <FileText className="w-3.5 h-3.5" /> {lbl("Terms of Service", "सेवा की शर्तें", "सेवा अटी")}
              </Link>
              <Link href="/about" className="flex items-center gap-2 hover:text-white transition-colors">
                <Info className="w-3.5 h-3.5" /> {lbl("About Us", "हमारे बारे में", "आमच्याबद्दल")}
              </Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm">{lbl("Contact", "संपर्क", "संपर्क")}</h3>
            <div className="flex flex-col space-y-2.5 text-xs text-[#64748b]">
              <Link href="/contact" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" /> {lbl("Contact Us", "संपर्क करें", "संपर्क करा")}
              </Link>
              <a href="tel:+918329850523" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" /> +91 83298 50523
              </a>
              <a href="https://www.tilemasterpro.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium">
                🚀 {lbl("Try TileMasterPro", "TileMasterPro आज़माएं", "TileMasterPro वापरून पहा")}
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#475569]">
          <span>&copy; {new Date().getFullYear()} TileCalc Pro. {lbl("All rights reserved.", "सर्वाधिकार सुरक्षित.", "सर्व हक्क राखीव.")}</span>
          <span className="text-center">
            {lbl(
              "This site uses cookies and analytics to improve your experience.",
              "यह साइट बेहतर अनुभव के लिए कुकीज़ और एनालिटिक्स का उपयोग करती है।",
              "ही साइट चांगल्या अनुभवासाठी कुकीज आणि अॅनालिटिक्स वापरते."
            )}
          </span>
        </div>

      </div>
    </footer>
  );
}
