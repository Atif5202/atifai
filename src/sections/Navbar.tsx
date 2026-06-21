import React, { useState, useEffect } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.features"), href: "#features" },
    { name: t("nav.demo"), href: "#demo" },
    { name: t("nav.pricing"), href: "#pricing" },
    { name: t("nav.faq"), href: "#faq" }
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80; // height of navbar
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const LanguageSelector = () => (
    <div className="flex items-center gap-1.5 p-0.5 rounded-full bg-slate-100/60 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm">
      <button
        onClick={() => setLanguage("FR")}
        className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300 ${
          language === "FR"
            ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-405 shadow-xs"
            : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage("EN")}
        className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all duration-300 ${
          language === "EN"
            ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-405 shadow-xs"
            : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center justify-center px-4 sm:px-6 pointer-events-none transition-all duration-300">
      <div
        className={`w-full max-w-6xl transition-all duration-300 pointer-events-auto border backdrop-blur-xl ${
          isMobileMenuOpen 
            ? "rounded-3xl bg-white/95 dark:bg-[#070707]/95 border-slate-200 dark:border-white/15 p-4 shadow-xl" 
            : isScrolled
              ? "rounded-full bg-white/80 dark:bg-[#070707]/85 border-slate-200/60 dark:border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] py-2.5 px-5"
              : "rounded-full bg-white/50 dark:bg-[#050505]/50 border-slate-200/30 dark:border-white/10 shadow-sm py-3 px-6"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group cursor-pointer pl-1">
            <img
              src="https://res.cloudinary.com/dfjexysdh/image/upload/v1782008581/atif_ia_logo_xs555w.png"
              alt="ATIF AI"
              className="h-9 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-slate-500/5 dark:hover:bg-white/5 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions - Theme switcher + CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSelector />
            <ThemeToggle />
            
            <a
              href="#contact"
              onClick={(e) => handleScrollToSection(e, "#contact")}
              className="text-sm font-medium text-slate-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white px-2 transition-colors"
            >
              {t("nav.login")}
            </a>
            
            <a
              href="#contact"
              onClick={(e) => handleScrollToSection(e, "#contact")}
              className="px-5 py-2 bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 rounded-full text-xs font-semibold hover:bg-blue-700 dark:hover:bg-cyan-400 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-200 border border-white/10"
            >
              {t("nav.trial")}
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-white/90 dark:bg-slate-900/90 cursor-pointer"
              aria-label="Menu principal"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden w-full overflow-hidden"
            >
              <div className="pt-4 pb-2 space-y-1.5 max-h-[80vh] overflow-y-auto">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollToSection(e, link.href)}
                    className="block px-4 py-2.5 rounded-2xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-cyan-400 theme-transition"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-3 mt-2 border-t border-slate-200/30 dark:border-white/5 flex flex-col gap-2">
                  <a
                    href="#contact"
                    onClick={(e) => handleScrollToSection(e, "#contact")}
                    className="flex items-center justify-center py-2 rounded-2xl text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    {t("nav.login")}
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => handleScrollToSection(e, "#contact")}
                    className="flex items-center justify-center py-2 rounded-2xl text-xs font-semibold text-white dark:text-slate-950 bg-blue-600 dark:bg-cyan-500 shadow-md shadow-blue-500/15 hover:bg-blue-700 dark:hover:bg-cyan-400 transition-colors"
                  >
                    {t("nav.trial")}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
