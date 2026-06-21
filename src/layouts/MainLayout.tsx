import React, { useState, useEffect } from "react";
import { Navbar } from "../sections/Navbar";
import { Footer } from "../sections/Footer";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CursorHighlight } from "../components/CursorHighlight";
import { ColorPaletteSwitcher } from "../components/ColorPaletteSwitcher";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Show/Hide back-to-top button
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Calculate Scroll Progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#050505] text-slate-800 dark:text-[#f9fafb] theme-transition relative overflow-hidden">
      {/* Premium Cursor Highlight Effect */}
      <CursorHighlight />

      {/* Frosted Glass Background Mesh Glows */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[-100px] w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-blue-650/5 dark:bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Scroll indicator bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-blue-600 dark:bg-cyan-500 z-[100] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Header / Navbar */}
      <Navbar />

      {/* Main Page Content Body */}
      <main className="flex-1 relative z-10">
        {children}
      </main>

      {/* Footer block */}
      <Footer />

      {/* Floating Color Theme Switcher */}
      <ColorPaletteSwitcher />

      {/* Scroll to Top floating control */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top-btn"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 bg-white/90 dark:bg-slate-900/90 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-xl backdrop-blur-md z-40 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            aria-label="Retourner en haut"
          >
            <ChevronUp className="h-5 w-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
