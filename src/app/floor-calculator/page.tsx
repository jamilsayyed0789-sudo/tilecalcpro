"use client";

import { useState } from "react";
import { Calculator, Maximize, Box } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { BASE_URL, webApplicationSchema, breadcrumbSchema } from "@/utils/seo";

type Unit = "Feet" | "Meters" | "Inches" | "MM";

export default function FloorCalculator() {
  const { t } = useLanguage();
  
  const [roomLength, setRoomLength] = useState<string>("");
  const [roomWidth, setRoomWidth] = useState<string>("");
  const [roomUnit, setRoomUnit] = useState<Unit>("Feet");

  const [tileLength, setTileLength] = useState<string>("");
  const [tileWidth, setTileWidth] = useState<string>("");
  const [tileUnit, setTileUnit] = useState<Unit>("Inches");

  const [wastage, setWastage] = useState<string>("0");
  const [tilesPerBox, setTilesPerBox] = useState<string>("2");
  const [pricePerBox, setPricePerBox] = useState<string>("");

  const [hasCalculated, setHasCalculated] = useState(false);
  const [results, setResults] = useState({
    areaSqFt: 0,
    areaSqM: 0,
    totalTiles: 0,
    totalBoxes: 0,
    totalCost: 0,
  });

  const convertToMM = (value: number, unit: Unit) => {
    switch (unit) {
      case "Feet": return value * 304.8;
      case "Inches": return value * 25.4;
      case "Meters": return value * 1000;
      case "MM": return value;
    }
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleReset = () => {
    setRoomLength("");
    setRoomWidth("");
    setRoomUnit("Feet");
    setTileLength("");
    setTileWidth("");
    setTileUnit("Inches");
    setWastage("0");
    setTilesPerBox("2");
    setPricePerBox("");
    setHasCalculated(false);
  };

  const handleCalculate = () => {
    const rL = parseFloat(roomLength) || 0;
    const rW = parseFloat(roomWidth) || 0;
    const tL = parseFloat(tileLength) || 0;
    const tW = parseFloat(tileWidth) || 0;
    const waste = parseFloat(wastage) || 0;
    const boxSize = parseInt(tilesPerBox) || 1;
    const price = parseFloat(pricePerBox) || 0;

    if (rL === 0 || rW === 0 || tL === 0 || tW === 0) {
      alert(languageText("Please enter valid dimensions for both room and tiles.", "कृपया कमरे और टाइल्स दोनों के लिए सही आयाम दर्ज करें।", "कृपया खोली आणि फरशा दोघांचेही योग्य माप प्रविष्ट करा."));
      return;
    }

    const roomLengthMM = convertToMM(rL, roomUnit);
    const roomWidthMM = convertToMM(rW, roomUnit);
    const roomAreaMM2 = roomLengthMM * roomWidthMM;

    const tileLengthMM = convertToMM(tL, tileUnit);
    const tileWidthMM = convertToMM(tW, tileUnit);
    const tileAreaMM2 = tileLengthMM * tileWidthMM;

    const rawTiles = roomAreaMM2 / tileAreaMM2;
    const roundedRawTiles = Math.round(rawTiles * 10000) / 10000;
    
    const wasteMultiplier = 1 + (waste / 100);
    const totalTiles = Math.ceil(roundedRawTiles * wasteMultiplier);
    
    const totalBoxes = Math.ceil(totalTiles / boxSize);
    const totalCost = totalBoxes * price;

    const areaSqM = roomAreaMM2 / 1_000_000;
    const areaSqFt = areaSqM * 10.7639;

    setResults({
      areaSqFt,
      areaSqM,
      totalTiles,
      totalBoxes,
      totalCost,
    });
    setHasCalculated(true);
  };

  const { language } = useLanguage();
  const languageText = (enVal: string, hiVal: string, mrVal: string) => {
    if (language === "hi") return hiVal;
    if (language === "mr") return mrVal;
    return enVal;
  };

  const unitLabels: Record<Unit, string> = {
    Feet: t.feet,
    Meters: t.meters,
    Inches: t.inches,
    MM: t.mm,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema({ name: "Floor Tile Calculator – TileCalc Pro", description: "Calculate total tiles, boxes needed, and estimated cost for any floor area with wastage support.", url: `${BASE_URL}/floor-calculator` })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Floor Calculator", url: `${BASE_URL}/floor-calculator` }])) }} />
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 flex items-center justify-center gap-3">
          <Calculator className="w-8 h-8 md:w-12 md:h-12" /> {t.floorCalc}
        </h1>
        <p className="text-muted-foreground text-lg">{languageText("Calculate required tiles, boxes, and exact costs instantly.", "आवश्यक टाइलें, बॉक्स और सटीक लागत की तुरंत गणना करें।", "आवश्यक टाइल्स, बॉक्स आणि अचूक खर्चाची त्वरित गणना करा.")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Form */}
        <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-2xl border border-white/5">
          
          {/* Room Dimensions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Maximize className="w-5 h-5 text-primary" /> {t.floorInputTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-white/5 pb-8">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">{t.length}</label>
                <input 
                  type="number" 
                  className="w-full bg-input/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white placeholder-muted-foreground/50"
                  value={roomLength}
                  onChange={(e) => setRoomLength(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">{t.width}</label>
                <input 
                  type="number" 
                  className="w-full bg-input/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white placeholder-muted-foreground/50"
                  value={roomWidth}
                  onChange={(e) => setRoomWidth(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">{languageText("Unit", "इकाई", "एकक")}</label>
                <select 
                  className="w-full bg-input/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white appearance-none"
                  value={roomUnit}
                  onChange={(e) => setRoomUnit(e.target.value as Unit)}
                >
                  <option value="Feet">{unitLabels.Feet}</option>
                  <option value="Meters">{unitLabels.Meters}</option>
                  <option value="Inches">{unitLabels.Inches}</option>
                  <option value="MM">{unitLabels.MM}</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Tile Details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Box className="w-5 h-5 text-primary" /> {t.tileInputTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">{languageText("Tile Length", "टाइल की लंबाई", "टाइलची लांबी")}</label>
                <input 
                  type="number" 
                  className="w-full bg-input/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white"
                  value={tileLength}
                  onChange={(e) => setTileLength(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">{languageText("Tile Width", "टाइल की चौड़ाई", "टाइलची रुंदी")}</label>
                <input 
                  type="number" 
                  className="w-full bg-input/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white"
                  value={tileWidth}
                  onChange={(e) => setTileWidth(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">{languageText("Tile Unit", "टाइल की इकाई", "टाइलचे एकक")}</label>
                <select 
                  className="w-full bg-input/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white appearance-none"
                  value={tileUnit}
                  onChange={(e) => setTileUnit(e.target.value as Unit)}
                >
                  <option value="MM">{unitLabels.MM}</option>
                  <option value="Inches">{unitLabels.Inches}</option>
                  <option value="Feet">{unitLabels.Feet}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80 whitespace-nowrap">{t.wasteLabel}</label>
                <input 
                  type="number" 
                  className="w-full bg-input/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white"
                  value={wastage}
                  onChange={(e) => setWastage(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">{languageText("Tiles Per Box", "प्रति बॉक्स टाइल्स", "प्रति बॉक्स टाइल्स")}</label>
                <input 
                  type="number" 
                  className="w-full bg-input/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white"
                  value={tilesPerBox}
                  onChange={(e) => setTilesPerBox(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">{languageText("Price per Box (₹)", "प्रति बॉक्स कीमत (₹)", "प्रति बॉक्स किंमत (₹)")}</label>
                <input 
                  type="number" 
                  className="w-full bg-input/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary transition-all text-white placeholder-muted-foreground/40"
                  placeholder={languageText("Optional", "वैकल्पिक", "पर्यायी")}
                  value={pricePerBox}
                  onChange={(e) => setPricePerBox(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleCalculate}
            className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg shadow-primary/20"
          >
            {t.calculate} <span className="text-xl">→</span>
          </button>
        </div>
        
        {/* Results Box */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="glass-panel p-8 rounded-2xl border border-white/5 h-full flex flex-col justify-center min-h-[400px]">
            {!hasCalculated ? (
              <div className="text-center text-muted-foreground flex flex-col items-center justify-center h-full space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Calculator className="w-8 h-8 opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t.readyToCalc}</h3>
                <p className="text-sm max-w-[250px]">{t.enterDimensions}</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{t.calcResults}</h3>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span>{results.areaSqFt.toFixed(2)} {languageText("Sq.Ft", "वर्ग फीट", "चौ.फूट")}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>{results.areaSqM.toFixed(2)} {languageText("Sq.M", "वर्ग मीटर", "चौ.मीटर")}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                    <span className="block text-sm text-muted-foreground mb-2">{t.totalTiles}</span>
                    <span className="block text-4xl font-bold text-white">{results.totalTiles}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
                    <span className="block text-sm text-muted-foreground mb-2">{t.totalBoxes}</span>
                    <span className="block text-4xl font-bold text-white">{results.totalBoxes}</span>
                  </div>
                </div>

                {results.totalCost > 0 && (
                  <div className="bg-primary/20 border border-primary/30 p-8 rounded-2xl text-center mt-6">
                    <span className="block text-sm text-primary/80 font-medium mb-2">{t.estCost}</span>
                    <span className="block text-5xl font-extrabold text-primary">{formatCurrency(results.totalCost)}</span>
                  </div>
                )}
                
                <button 
                  onClick={handleReset}
                  className="w-full mt-6 py-3 rounded-lg border border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white transition-colors text-sm"
                >
                  {t.reset}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
