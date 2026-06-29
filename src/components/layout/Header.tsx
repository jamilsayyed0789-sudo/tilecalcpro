"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Calculator, 
  Grid, 
  Paintbrush, 
  Menu, 
  X, 
  Home as HomeIcon,
  Box as BoxIcon,
  Globe
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const navItems = [
    { name: t.home, href: "/", icon: HomeIcon },
    { name: t.floorCalc, href: "/floor-calculator", icon: Calculator },
    { name: t.bathroomCalc, href: "/bathroom-calculator", icon: Grid },
    { name: t.designerMode, href: "/designer", icon: Paintbrush },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070c14] border-b border-white/5 h-16 flex items-center">
      <div className="container mx-auto px-4 flex items-center justify-between w-full relative">
        
        {/* Logo Section */}
        <Link href="/" onClick={closeMobileMenu} className="flex items-center space-x-2 relative z-50">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/20">
            <BoxIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-base font-extrabold tracking-tight text-white">TileMasterPro</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <div key={item.href} className="relative flex items-center">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-all border
                    ${active 
                      ? "bg-[#111a2e] border-blue-500/20 text-[#3b82f6]" 
                      : "border-transparent text-[#94a3b8] hover:text-white"
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.name}</span>
                </Link>
              </div>
            );
          })}
        </nav>
        
        {/* Right Section / Language Selector & Toggle */}
        <div className="flex items-center space-x-3 relative z-50">
          <div className="flex items-center gap-1.5 bg-[#111a2e] border border-white/10 px-2 py-1 rounded-lg text-[#94a3b8] hover:text-white transition-colors">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer border-none py-0.5 pr-1"
            >
              <option value="en" className="bg-[#070c14] text-white">EN</option>
              <option value="hi" className="bg-[#070c14] text-white">हिन्दी</option>
              <option value="mr" className="bg-[#070c14] text-white">मराठी</option>
            </select>
          </div>

          <button 
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-[#94a3b8] hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#070c14]/98 backdrop-blur-lg z-40 flex flex-col pt-20 px-6 animate-in fade-in slide-in-from-top duration-300 lg:hidden">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-left">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <div key={item.href} className="flex items-center justify-between border-b border-white/5 py-3">
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-2 transition-colors w-full ${active ? "text-[#3b82f6]" : "text-[#94a3b8] hover:text-white"}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                </div>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
