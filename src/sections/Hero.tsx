import { ArrowRight, Play, Sparkles, TrendingUp, DollarSign, ArrowUpRight, Activity, Percent } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";

export function Hero() {
  const { t } = useLanguage();

  const handleScrollToSection = (selector: string) => {
    const targetElement = document.querySelector(selector);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
      },
    },
  };

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-transparent transition-colors duration-300">
      {/* Decorative background glow elements */}
      <div className="absolute top-1/4 left-1/10 w-[300px] h-[300px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/10 w-[400px] h-[400px] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-[250px] h-[250px] rounded-full bg-cyan-400/10 dark:bg-cyan-400/5 blur-[70px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 text-center lg:text-left z-10 flex flex-col items-center lg:items-start"
          >
            {/* AI Pill Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-950/40 border border-blue-200/40 dark:border-cyan-500/20 mb-6 shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-cyan-400 animate-pulse" />
              <span>{t("hero.pill")}</span>
            </motion.div>

            {/* Display Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-black font-sans leading-[1.1] tracking-tight text-slate-900 dark:text-white"
            >
              {t("hero.title1")}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-blue-600 dark:text-cyan-400">
                  {t("hero.title2")}
                </span>
                <span className="absolute left-0 bottom-1 w-full h-[6px] bg-blue-500/15 dark:bg-cyan-500/15 rounded-full" />
              </span>{" "}
              {t("hero.title3")}
            </motion.h1>

            {/* Subheading Description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-xl"
            >
              {t("hero.desc")}
            </motion.p>

            {/* Direct Calls to Action */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => handleScrollToSection("#contact")}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white dark:text-slate-950 bg-blue-600 dark:bg-cyan-500 shadow-lg shadow-blue-500/25 dark:shadow-cyan-550/10 hover:bg-blue-700 dark:hover:bg-cyan-400 hover:shadow-xl hover:shadow-blue-500/35 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                {t("hero.cta_start")}
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => handleScrollToSection("#demo")}
                className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-850 transition-all duration-300 cursor-pointer"
              >
                <Play className="h-4 w-4 fill-current text-blue-600 dark:text-cyan-400" />
                {t("hero.cta_demo")}
              </button>
            </motion.div>

            {/* Micro proof line */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{t("hero.claim_no_card")}</span>
            </motion.div>
          </motion.div>

          {/* Right Mockup Column */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.45, type: "spring", damping: 25, stiffness: 85 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 dark:bg-white/5 p-3 sm:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
              {/* Window Controls top border */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5 dark:border-white/5 mb-3 px-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                {/* Simulated URL bar */}
                <div className="text-[11px] text-slate-500 dark:text-gray-400 font-mono bg-white/20 dark:bg-black/30 px-4 py-1 rounded-md border border-white/5 dark:border-white/10 backdrop-blur-sm">
                  console.atif.ai/dashboard
                </div>
                <div className="w-[40px]" />
              </div>

              {/* Main Simulated Console */}
              <div className="relative rounded-xl overflow-hidden bg-white/30 dark:bg-[#111111]/70 border border-white/10 dark:border-white/10 p-4 font-sans text-slate-800 dark:text-slate-200 shadow-inner backdrop-blur-md">
                
                {/* Header widget */}
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-sm dark:text-white">{t("hero.mockup.perf")}</h3>
                    <p className="text-[10px] text-slate-500 dark:text-gray-400">{t("hero.mockup.recomputed")}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium">
                    <Activity className="h-3 w-3" />
                  </span>
                </div>

                 {/* KPI Cards Row */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                  {/* KPI 1 */}
                  <div className="p-3 rounded-xl border border-white/15 dark:border-white/5 bg-white/25 dark:bg-white/5 shadow-sm relative backdrop-blur-sm">
                    <div className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">{t("hero.mockup.net_sales")}</div>
                    <div className="text-lg font-bold mt-1 dark:text-white">244,7M Ar</div>
                    <div className="text-[9px] text-emerald-500 mt-1 flex items-center gap-0.5 font-medium">
                      <TrendingUp className="h-3 w-3" />
                      <span>+24.5%</span>
                    </div>
                  </div>

                  {/* KPI 2 */}
                  <div className="p-3 rounded-xl border border-white/15 dark:border-white/5 bg-white/25 dark:bg-white/5 shadow-sm relative backdrop-blur-sm">
                    <div className="text-[10px] text-slate-500 dark:text-gray-400 font-medium font-sans">{t("hero.mockup.basket")}</div>
                    <div className="text-lg font-bold mt-1 dark:text-white font-sans">392 000 Ar</div>
                    <div className="text-[9px] text-emerald-500 mt-1 flex items-center gap-0.5 font-medium">
                      <TrendingUp className="h-3 w-3" />
                      <span>+4.2%</span>
                    </div>
                  </div>

                  {/* KPI 3 - hidden on older mobile for layout density, shown on sm+ */}
                  <div className="col-span-2 lg:col-span-1 p-3 rounded-xl border border-white/15 dark:border-white/5 bg-white/25 dark:bg-white/5 shadow-sm relative backdrop-blur-sm">
                    <div className="text-[10px] text-slate-500 dark:text-gray-400 font-medium font-sans">{t("hero.mockup.restock")}</div>
                    <div className="text-lg font-bold mt-1 text-blue-600 dark:text-cyan-400">{t("hero.mockup.auto")}</div>
                    <div className="text-[9px] text-slate-500 mt-1 flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>{t("hero.mockup.queries")}</span>
                    </div>
                  </div>
                </div>

                {/* Middle Grid containing SVG Chart + AI assistant alert banner */}
                <div className="space-y-3">
                  {/* Custom Minimalist Vector Chart */}
                  <div className="p-3 rounded-xl border border-white/15 dark:border-white/5 bg-white/25 dark:bg-white/5 relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-slate-500 dark:text-gray-400 font-semibold">{t("hero.mockup.trends")}</span>
                      <span className="text-[9px] text-slate-500">{t("hero.mockup.months")}</span>
                    </div>
                    {/* SVG graphics wrapper */}
                    <div className="h-28 w-full mt-2">
                      <svg viewBox="0 0 400 110" className="w-full h-full overflow-visible">
                        {/* Grid lines */}
                        <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                        <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                        <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                        
                        {/* Solid smooth curved trend path */}
                        <path
                          d="M  0 90 Q  80 85, 120 60 T 240 40 T 360 15 T 400 10"
                          fill="none"
                          className="stroke-blue-600 dark:stroke-cyan-400"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                        />

                        {/* Fill area below curve */}
                        <path
                          d="M  0 90 Q  80 85, 120 60 T 240 40 T 360 15 T 400 10 L 400 100 L 0 100 Z"
                          className="fill-blue-500/5 dark:fill-cyan-500/5"
                        />

                        {/* Interactive glow points */}
                        <circle cx="120" cy="60" r="4.5" className="fill-blue-600 dark:fill-cyan-400" />
                        <circle cx="360" cy="15" r="4.5" className="fill-blue-600 dark:fill-cyan-400" />
                      </svg>
                    </div>
                  </div>

                  {/* AI Prediction Floating Alert Box */}
                  <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-slate-900/60 border border-blue-500/15 dark:border-cyan-500/15 flex items-start gap-2.5 relative backdrop-blur-sm">
                    <div className="p-1.5 rounded-lg bg-blue-600 dark:bg-cyan-500/10 text-white dark:text-cyan-400 mt-0.5">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">{t("hero.mockup.engine")}</h4>
                        <span className="text-[9px] font-medium text-blue-700 dark:text-cyan-400">{t("hero.mockup.recom_live")}</span>
                      </div>
                      <p className="text-[11.5px] text-slate-600 dark:text-slate-300 mt-1 font-normal leading-relaxed">
                        {t("hero.mockup.recom_text")}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Outside floating badges or charts of the mockup to increase high-end UX */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 hidden sm:flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xl"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-medium">{t("hero.mockup.growth_ann")}</div>
                  <div className="text-xs font-bold dark:text-white">+312% YoY</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, delay: 1, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-xl"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <Percent className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 font-medium">{t("hero.mockup.margins")}</div>
                  <div className="text-xs font-bold dark:text-white">{t("hero.mockup.margin_val")}</div>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
