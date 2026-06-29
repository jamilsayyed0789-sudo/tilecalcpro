export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">About TileCalc Pro</h1>
      
      <div className="glass-panel p-8 rounded-2xl space-y-6 text-muted-foreground text-lg leading-relaxed">
        <p>
          TileCalc Pro was created to provide homeowners, contractors, and interior designers with accurate, easy-to-use, and completely free tools for planning tile projects.
        </p>
        <p>
          We believe that calculating materials shouldn&apos;t be a hassle. Whether you are tackling a small bathroom backsplash or tiling an entire house, our tools help you save time, minimize waste, and stick to your budget.
        </p>
        <p>
          Our platform is proudly powered by <strong>TileMasterPro</strong>. While TileCalc Pro focuses on quick, everyday calculations, TileMasterPro provides enterprise-level solutions for tile businesses, including 3D AI visualizers and catalog management systems.
        </p>
        
        <div className="pt-8 border-t border-white/10">
          <a href="https://www.tilemasterpro.in" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors">
            Learn about TileMasterPro
          </a>
        </div>
      </div>
    </div>
  );
}
