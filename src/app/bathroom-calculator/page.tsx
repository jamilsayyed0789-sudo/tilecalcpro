"use client";

import { useState } from "react";
import { Grid, Box, Columns, Rows, Droplets } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { BASE_URL, webApplicationSchema, breadcrumbSchema } from "@/utils/seo";

type Unit = "Feet" | "Meters" | "Inches" | "MM";

export default function BathroomCalculator() {
  const { t, language } = useLanguage();
  
  // Room Dimensions (Fixed to Feet)
  const [runningFeet, setRunningFeet] = useState<string>("");
  const [wallHeight, setWallHeight] = useState<string>("");
  
  const [floorLength, setFloorLength] = useState<string>("");
  const [floorWidth, setFloorWidth] = useState<string>("");

  // Wall Tile Details
  const [wallTileLength, setWallTileLength] = useState<string>("");
  const [wallTileWidth, setWallTileWidth] = useState<string>("");
  const [wallTileUnit, setWallTileUnit] = useState<Unit>("Inches");
  const [wallTilesPerBox, setWallTilesPerBox] = useState<string>("2");

  // Floor Tile Details
  const [floorTileLength, setFloorTileLength] = useState<string>("");
  const [floorTileWidth, setFloorTileWidth] = useState<string>("");
  const [floorTileUnit, setFloorTileUnit] = useState<Unit>("Inches");
  const [floorTilesPerBox, setFloorTilesPerBox] = useState<string>("2");

  // Global Details
  const [wastage, setWastage] = useState<string>("0");
  const [pricePerBox, setPricePerBox] = useState<string>("");

  const [hasCalculated, setHasCalculated] = useState(false);
  const [results, setResults] = useState({
    wallAreaSqFt: 0,
    floorAreaSqFt: 0,
    wallTileAreaSqFt: 0,
    floorTileAreaSqFt: 0,
    areaSqM: 0,
    wallTiles: 0,
    wallBoxes: 0,
    floorTiles: 0,
    floorBoxes: 0,
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

  const languageText = (enVal: string, hiVal: string, mrVal: string) => {
    if (language === "hi") return hiVal;
    if (language === "mr") return mrVal;
    return enVal;
  };

  const handleReset = () => {
    setRunningFeet("");
    setWallHeight("");
    setFloorLength("");
    setFloorWidth("");
    setWallTileLength("");
    setWallTileWidth("");
    setWallTileUnit("Inches");
    setWallTilesPerBox("2");
    setFloorTileLength("");
    setFloorTileWidth("");
    setFloorTileUnit("Inches");
    setFloorTilesPerBox("2");
    setWastage("0");
    setPricePerBox("");
    setHasCalculated(false);
  };

  const handleCalculate = () => {
    const rft = parseFloat(runningFeet) || 0;
    const wH = parseFloat(wallHeight) || 0;
    
    const fL = parseFloat(floorLength) || 0;
    const fW = parseFloat(floorWidth) || 0;
    
    const wtL = parseFloat(wallTileLength) || 0;
    const wtW = parseFloat(wallTileWidth) || 0;
    const wallBoxSize = parseInt(wallTilesPerBox) || 1;
    
    const ftL = parseFloat(floorTileLength) || 0;
    const ftW = parseFloat(floorTileWidth) || 0;
    const floorBoxSize = parseInt(floorTilesPerBox) || 1;
    
    const waste = parseFloat(wastage) || 0;
    const price = parseFloat(pricePerBox) || 0;

    // Validate inputs
    const hasWallInput = rft > 0 && wH > 0;
    const hasFloorInput = fL > 0 && fW > 0;
    const hasWallTileInput = wtL > 0 && wtW > 0;
    const hasFloorTileInput = ftL > 0 && ftW > 0;

    if (!hasWallInput && !hasFloorInput) {
      alert(languageText("Please enter wall or floor dimensions.", "कृपया दीवार या फर्श की माप दर्ज करें।", "कृपया भिंतीचे किंवा फ्लोअरचे मोजमाप प्रविष्ट करा."));
      return;
    }
    
    if (hasWallInput && !hasWallTileInput) {
      alert(languageText("Please enter Wall Tile dimensions.", "कृपया दीवार के टाइल की माप दर्ज करें।", "कृपया भिंत टाइलचे मोजमाप प्रविष्ट करा."));
      return;
    }

    if (hasFloorInput && !hasFloorTileInput) {
      alert(languageText("Please enter Floor Tile dimensions.", "कृपया फर्श के टाइल की माप दर्ज करें।", "कृपया फ्लोअर टाइलचे मोजमाप प्रविष्ट करा."));
      return;
    }

    // Room calculations (Input is always Feet)
    const wallAreaMM2 = hasWallInput ? convertToMM(rft, "Feet") * convertToMM(wH, "Feet") : 0;
    const floorAreaMM2 = hasFloorInput ? convertToMM(fL, "Feet") * convertToMM(fW, "Feet") : 0;
    const totalAreaMM2 = wallAreaMM2 + floorAreaMM2;

    // Wall Tiles
    let wallTiles = 0;
    let wallBoxes = 0;
    let wallTileAreaSqFt = 0;
    if (hasWallInput && hasWallTileInput) {
      const wallTileAreaMM2 = convertToMM(wtL, wallTileUnit) * convertToMM(wtW, wallTileUnit);
      if (wallTileAreaMM2 > 0) {
        wallTileAreaSqFt = (wallTileAreaMM2 / 1_000_000) * 10.7639;
        const rawWallTiles = wallAreaMM2 / wallTileAreaMM2;
        const roundedWallTiles = Math.round(rawWallTiles * 10000) / 10000;
        const wasteMultiplier = 1 + (waste / 100);
        wallTiles = Math.ceil(roundedWallTiles * wasteMultiplier);
        wallBoxes = Math.ceil(wallTiles / wallBoxSize);
      }
    }

    // Floor Tiles
    let floorTiles = 0;
    let floorBoxes = 0;
    let floorTileAreaSqFt = 0;
    if (hasFloorInput && hasFloorTileInput) {
      const floorTileAreaMM2 = convertToMM(ftL, floorTileUnit) * convertToMM(ftW, floorTileUnit);
      if (floorTileAreaMM2 > 0) {
        floorTileAreaSqFt = (floorTileAreaMM2 / 1_000_000) * 10.7639;
        const rawFloorTiles = floorAreaMM2 / floorTileAreaMM2;
        const roundedFloorTiles = Math.round(rawFloorTiles * 10000) / 10000;
        const wasteMultiplier = 1 + (waste / 100);
        floorTiles = Math.ceil(roundedFloorTiles * wasteMultiplier);
        floorBoxes = Math.ceil(floorTiles / floorBoxSize);
      }
    }

    const totalTiles = wallTiles + floorTiles;
    const totalBoxes = wallBoxes + floorBoxes;
    const totalCost = totalBoxes * price;

    const wallAreaSqM = wallAreaMM2 / 1_000_000;
    const wallAreaSqFt = wallAreaSqM * 10.7639;
    
    const floorAreaSqM = floorAreaMM2 / 1_000_000;
    const floorAreaSqFt = floorAreaSqM * 10.7639;

    const areaSqM = totalAreaMM2 / 1_000_000;

    setResults({
      wallAreaSqFt,
      floorAreaSqFt,
      wallTileAreaSqFt,
      floorTileAreaSqFt,
      areaSqM,
      wallTiles,
      wallBoxes,
      floorTiles,
      floorBoxes,
      totalTiles,
      totalBoxes,
      totalCost,
    });
    setHasCalculated(true);
  };

  const unitLabels: Record<Unit, string> = {
    Feet: t.feet,
    Meters: t.meters,
    Inches: t.inches,
    MM: t.mm,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema({ name: "Bathroom Tile Calculator – TileCalc Pro", description: "Calculate tile requirements for bathroom walls and floors simultaneously. Enter dimensions and get tile count, boxes and cost instantly.", url: `${BASE_URL}/bathroom-calculator` })) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", url: BASE_URL }, { name: "Bathroom Calculator", url: `${BASE_URL}/bathroom-calculator` }])) }} />
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 flex items-center justify-center gap-3">
          <Grid className="w-8 h-8 md:w-12 md:h-12 text-accent" /> {t.bathroomCalc}
        </h1>
        <p className="text-muted-foreground text-lg">{languageText("Calculate required tiles for bathroom walls and floors.", "बाथरूम की दीवारों और फर्श के लिए आवश्यक टाइल्स की गणना करें।", "बाथरूमच्या भिंती आणि फ्लोअरिंगसाठी आवश्यक टाइल्सची गणना करा.")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Form */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Wall Dimensions */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-accent/90 border-b border-white/5 pb-2">
                  <Columns className="w-4 h-4" /> {t.bathInputTitle} ({t.feet.toLowerCase()})
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/80">{t.rft}</label>
                    <input 
                      type="number" 
                      className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white placeholder-muted-foreground/50 text-sm"
                      value={runningFeet}
                      onChange={(e) => setRunningFeet(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/80">{t.height}</label>
                    <input 
                      type="number" 
                      className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white placeholder-muted-foreground/50 text-sm"
                      value={wallHeight}
                      onChange={(e) => setWallHeight(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              {/* Floor Dimensions */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-accent/90 border-b border-white/5 pb-2">
                  <Rows className="w-4 h-4" /> {t.bathFloorInputTitle} ({t.feet.toLowerCase()})
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/80">{t.length} ({languageText("Opt", "वैकल्पिक", "पर्यायी")})</label>
                    <input 
                      type="number" 
                      className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white placeholder-muted-foreground/50 text-sm"
                      value={floorLength}
                      onChange={(e) => setFloorLength(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/80">{t.width} ({languageText("Opt", "वैकल्पिक", "पर्यायी")})</label>
                    <input 
                      type="number" 
                      className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white placeholder-muted-foreground/50 text-sm"
                      value={floorWidth}
                      onChange={(e) => setFloorWidth(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 md:p-6 rounded-2xl border border-white/5">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
              <Droplets className="w-4 h-4 text-accent" /> {t.tileInputTitle}
            </h2>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-4">
              {/* Wall Tiles */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <h3 className="text-xs font-bold tracking-wider text-muted-foreground mb-3 uppercase">{t.wallTiles}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/80">{t.length}</label>
                    <input 
                      type="number" 
                      className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white text-sm"
                      value={wallTileLength}
                      onChange={(e) => setWallTileLength(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/80">{t.width}</label>
                    <input 
                      type="number" 
                      className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white text-sm"
                      value={wallTileWidth}
                      onChange={(e) => setWallTileWidth(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/80">{languageText("Unit", "इकाई", "एकक")}</label>
                    <select 
                      className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white appearance-none text-sm"
                      value={wallTileUnit}
                      onChange={(e) => setWallTileUnit(e.target.value as Unit)}
                    >
                      <option value="MM">{unitLabels.MM}</option>
                      <option value="Inches">{unitLabels.Inches}</option>
                      <option value="Feet">{unitLabels.Feet}</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/80">{languageText("Tiles/Box", "टाइल्स/बॉक्स", "टाइल्स/बॉक्स")}</label>
                    <input 
                      type="number" 
                      className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white text-sm"
                      value={wallTilesPerBox}
                      onChange={(e) => setWallTilesPerBox(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Floor Tiles */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <h3 className="text-xs font-bold tracking-wider text-muted-foreground mb-3 uppercase">{t.floorTiles}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/80">{t.length}</label>
                    <input 
                      type="number" 
                      className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white text-sm"
                      value={floorTileLength}
                      onChange={(e) => setFloorTileLength(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/80">{t.width}</label>
                    <input 
                      type="number" 
                      className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white text-sm"
                      value={floorTileWidth}
                      onChange={(e) => setFloorTileWidth(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/80">{languageText("Unit", "इकाई", "एकक")}</label>
                    <select 
                      className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white appearance-none text-sm"
                      value={floorTileUnit}
                      onChange={(e) => setFloorTileUnit(e.target.value as Unit)}
                    >
                      <option value="MM">{unitLabels.MM}</option>
                      <option value="Inches">{unitLabels.Inches}</option>
                      <option value="Feet">{unitLabels.Feet}</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground/80">{languageText("Tiles/Box", "टाइल्स/बॉक्स", "टाइल्स/बॉक्स")}</label>
                    <input 
                      type="number" 
                      className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white text-sm"
                      value={floorTilesPerBox}
                      onChange={(e) => setFloorTilesPerBox(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Globals */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground/80">{languageText("Global Wastage %", "ग्लोबल वेस्टेज %", "ग्लोबल वेस्टेज %")}</label>
                <input 
                  type="number" 
                  className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white text-sm"
                  value={wastage}
                  onChange={(e) => setWastage(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground/80">{languageText("Avg Price per Box (₹)", "औसत बॉक्स कीमत (₹)", "सरासरी बॉक्स किंमत (₹)")}</label>
                <input 
                  type="number" 
                  className="w-full bg-input/40 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-white placeholder-muted-foreground/40 text-sm"
                  placeholder={languageText("Optional", "वैकल्पिक", "पर्यायी")}
                  value={pricePerBox}
                  onChange={(e) => setPricePerBox(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleCalculate}
            className="w-full py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] shadow-lg shadow-accent/20"
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
                  <Grid className="w-8 h-8 opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{t.readyToCalc}</h3>
                <p className="text-sm max-w-[250px]">{t.enterDimensions}</p>
              </div>
            ) : (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{t.calcResults}</h3>
                  <div className="flex flex-col items-center justify-center gap-1 text-sm text-muted-foreground">
                    <span>{t.wallLabel}: {results.wallAreaSqFt.toFixed(2)} {languageText("Sq.Ft", "वर्ग फीट", "चौ.फूट")}</span>
                    {results.floorAreaSqFt > 0 && (
                      <span>{t.floorLabel}: {results.floorAreaSqFt.toFixed(2)} {languageText("Sq.Ft", "वर्ग फीट", "चौ.फूट")}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Wall Breakdown */}
                  <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl flex flex-col justify-between">
                    <span className="block text-sm text-muted-foreground text-center">{languageText("Wall", "दीवार", "भिंत")}</span>
                    {results.wallTileAreaSqFt > 0 && (
                      <span className="block text-[10px] text-muted-foreground/60 mb-4 text-center">
                        {t.tileSize}: {results.wallTileAreaSqFt.toFixed(2)} {languageText("Sq.Ft", "वर्ग फीट", "चौ.फूट")}
                      </span>
                    )}
                    <div className="flex justify-around items-end mt-auto">
                      <div className="text-center">
                        <span className="block text-2xl md:text-3xl font-bold text-white leading-none mb-1">{results.wallTiles}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{languageText("Tiles", "टाइल्स", "टाइल्स")}</span>
                      </div>
                      <div className="h-8 w-px bg-white/10 mx-2"></div>
                      <div className="text-center">
                        <span className="block text-2xl md:text-3xl font-bold text-white leading-none mb-1">{results.wallBoxes}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{languageText("Boxes", "बॉक्स", "बॉक्स")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Floor Breakdown */}
                  <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl flex flex-col justify-between">
                    <span className="block text-sm text-muted-foreground text-center">{languageText("Floor", "फर्श", "फ्लोअर")}</span>
                    {results.floorTileAreaSqFt > 0 && (
                      <span className="block text-[10px] text-muted-foreground/60 mb-4 text-center">
                        {t.tileSize}: {results.floorTileAreaSqFt.toFixed(2)} {languageText("Sq.Ft", "वर्ग फीट", "चौ.फूट")}
                      </span>
                    )}
                    <div className="flex justify-around items-end mt-auto">
                      <div className="text-center">
                        <span className="block text-2xl md:text-3xl font-bold text-white leading-none mb-1">{results.floorTiles}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{languageText("Tiles", "टाइल्स", "टाइल्स")}</span>
                      </div>
                      <div className="h-8 w-px bg-white/10 mx-2"></div>
                      <div className="text-center">
                        <span className="block text-2xl md:text-3xl font-bold text-white leading-none mb-1">{results.floorBoxes}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{languageText("Boxes", "बॉक्स", "बॉक्स")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl text-center">
                    <span className="block text-sm text-muted-foreground mb-2">{t.totalTiles}</span>
                    <span className="block text-3xl md:text-4xl font-bold text-accent">{results.totalTiles}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-2xl text-center">
                    <span className="block text-sm text-muted-foreground mb-2">{t.totalBoxes}</span>
                    <span className="block text-3xl md:text-4xl font-bold text-white">{results.totalBoxes}</span>
                  </div>
                </div>

                {results.totalCost > 0 && (
                  <div className="bg-accent/20 border border-accent/30 p-8 rounded-2xl text-center mt-6">
                    <span className="block text-sm text-accent/80 font-medium mb-2">{t.estCost}</span>
                    <span className="block text-5xl font-extrabold text-accent">{formatCurrency(results.totalCost)}</span>
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
