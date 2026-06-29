"use client";

import { useState } from "react";
import { Paintbrush, Boxes, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DesignerMode() {
  const { t, language } = useLanguage();
  
  const [totalBoxes, setTotalBoxes] = useState<string>("");
  const [lightPct, setLightPct] = useState<number>(0);
  const [darkPct, setDarkPct] = useState<number>(0);
  const [highlighterPct, setHighlighterPct] = useState<number>(0);

  const [hasCalculated, setHasCalculated] = useState(false);
  const [results, setResults] = useState({
    lightBoxes: 0,
    darkBoxes: 0,
    highlighterBoxes: 0,
    totalAssigned: 0,
  });

  const totalPct = lightPct + darkPct + highlighterPct;
  const isInvalid = totalPct !== 100;

  const languageText = (enVal: string, hiVal: string, mrVal: string) => {
    if (language === "hi") return hiVal;
    if (language === "mr") return mrVal;
    return enVal;
  };

  const handleCalculate = () => {
    const total = parseInt(totalBoxes) || 0;
    if (total <= 0) {
      alert(languageText("Please enter a valid number of boxes.", "कृपया बॉक्स की सही संख्या दर्ज करें।", "कृपया बॉक्सची योग्य संख्या प्रविष्ट करा."));
      return;
    }

    if (isInvalid) return;

    // Distribute
    let lBoxes = Math.round((total * lightPct) / 100);
    let dBoxes = Math.round((total * darkPct) / 100);
    let hBoxes = Math.round((total * highlighterPct) / 100);

    // Adjust rounding errors by adding/subtracting from the largest share
    const sum = lBoxes + dBoxes + hBoxes;
    const diff = total - sum;

    if (diff !== 0) {
      if (lightPct >= darkPct && lightPct >= highlighterPct) {
        lBoxes += diff;
      } else if (darkPct >= lightPct && darkPct >= highlighterPct) {
        dBoxes += diff;
      } else {
        hBoxes += diff;
      }
    }

    setResults({
      lightBoxes: lBoxes,
      darkBoxes: dBoxes,
      highlighterBoxes: hBoxes,
      totalAssigned: total,
    });
    setHasCalculated(true);
  };

  const handlePctChange = (setter: (val: number) => void, val: string) => {
    let num = parseInt(val) || 0;
    if (num < 0) num = 0;
    if (num > 100) num = 100;
    setter(num);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl flex flex-col min-h-[80vh]">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 flex items-center justify-center gap-3">
          <Paintbrush className="w-8 h-8 md:w-12 md:h-12 text-accent" /> {t.designerMode}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t.designerSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        
        {/* Controls */}
        <div className="lg:col-span-5 glass-card p-6 md:p-8 rounded-2xl border border-white/5 h-fit">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">{t.totalBoxesInput}</label>
              <input 
                type="number" 
                className="w-full bg-input/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white"
                value={totalBoxes}
                onChange={(e) => setTotalBoxes(e.target.value)}
                placeholder="e.g. 25"
              />
            </div>

            <div className="h-px bg-white/10 w-full"></div>

            <div>
              <h3 className="text-lg font-semibold mb-2">{languageText("Distribution (%)", "वितरण (%)", "वितरण (%)")}</h3>
              <p className={`text-sm mb-6 font-medium ${isInvalid ? 'text-red-400' : 'text-green-400'}`}>
                {t.ratioTotal}: {totalPct}% {isInvalid && `(${languageText("Must be 100%", "१००% होना चाहिए", "१००% असावे लागेल")})`}
                {!isInvalid && <CheckCircle2 className="w-4 h-4 inline-block ml-1" />}
              </p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">{languageText("Light Pattern", "लाइट पैटर्न", "लाइट पॅटर्न")}</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      className="w-24 bg-input/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white text-center"
                      value={lightPct || ""}
                      onChange={(e) => handlePctChange(setLightPct, e.target.value)}
                      placeholder="0"
                    />
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={lightPct} 
                      onChange={(e) => setLightPct(Number(e.target.value))}
                      className="flex-1 accent-accent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">{languageText("Dark Pattern", "डार्क पैटर्न", "डार्क पॅटर्न")}</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      className="w-24 bg-input/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white text-center"
                      value={darkPct || ""}
                      onChange={(e) => handlePctChange(setDarkPct, e.target.value)}
                      placeholder="0"
                    />
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={darkPct} 
                      onChange={(e) => setDarkPct(Number(e.target.value))}
                      className="flex-1 accent-accent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">{languageText("Highlighter Pattern", "हाइलाइटर पैटर्न", "हायलाइटर पॅटर्न")}</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number" 
                      className="w-24 bg-input/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white text-center"
                      value={highlighterPct || ""}
                      onChange={(e) => handlePctChange(setHighlighterPct, e.target.value)}
                      placeholder="0"
                    />
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={highlighterPct} 
                      onChange={(e) => setHighlighterPct(Number(e.target.value))}
                      className="flex-1 accent-accent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCalculate}
              disabled={isInvalid || !totalBoxes}
              className="w-full mt-4 py-4 rounded-xl bg-accent hover:bg-accent/90 disabled:bg-accent/30 disabled:cursor-not-allowed text-white font-bold text-lg flex items-center justify-center gap-2 transition-transform shadow-lg shadow-accent/20"
            >
              {t.splitBtn} <span className="text-xl">→</span>
            </button>
          </div>
        </div>
        
        {/* Preview Canvas */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="glass-panel p-8 rounded-2xl border border-white/5 h-full flex flex-col justify-center min-h-[500px]">
            {!hasCalculated ? (
              <div className="text-center text-muted-foreground p-8 space-y-4">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 transform -rotate-12">
                  <Paintbrush className="w-10 h-10 opacity-50" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t.designerReady}</h3>
                <p className="max-w-xs mx-auto">{t.designerReadyDesc}</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold mb-2">{t.distResults}</h3>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span>{results.totalAssigned} {t.boxesDistributed}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Light */}
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Boxes className="w-8 h-8 mb-4 text-white/70" />
                    <span className="block text-sm text-muted-foreground mb-2">{t.lightBoxes}</span>
                    <span className="block text-4xl font-bold text-white mb-1">{results.lightBoxes}</span>
                    <span className="text-xs font-medium bg-white/10 px-2 py-1 rounded-full text-white/80">{lightPct}%</span>
                  </div>
                  
                  {/* Highlighter */}
                  <div className="bg-white/5 border border-accent/30 p-6 rounded-2xl text-center flex flex-col items-center justify-center relative overflow-hidden group shadow-lg shadow-accent/10">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Boxes className="w-8 h-8 mb-4 text-accent" />
                    <span className="block text-sm text-accent/80 mb-2">{t.highlighterBoxes}</span>
                    <span className="block text-4xl font-extrabold text-accent mb-1">{results.highlighterBoxes}</span>
                    <span className="text-xs font-medium bg-accent/20 px-2 py-1 rounded-full text-accent">{highlighterPct}%</span>
                  </div>

                  {/* Dark */}
                  <div className="bg-black/40 border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <Boxes className="w-8 h-8 mb-4 text-white/40" />
                    <span className="block text-sm text-muted-foreground mb-2">{t.darkBoxes}</span>
                    <span className="block text-4xl font-bold text-white mb-1">{results.darkBoxes}</span>
                    <span className="text-xs font-medium bg-white/5 px-2 py-1 rounded-full text-white/60">{darkPct}%</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setHasCalculated(false)}
                  className="w-full max-w-sm mx-auto block mt-8 py-3 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white transition-colors text-sm"
                >
                  {t.reset}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
