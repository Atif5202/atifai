import React from "react";
import { pricingPlans } from "../data/mockData";
import { Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";

export function Pricing() {
  const { t } = useLanguage();
  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      const offset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-transparent transition-colors duration-300">
      {/* Glow shapes */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 dark:bg-blue-500/2 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/2 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-900/40 border border-blue-200/30 mb-4">
            <span>{t("pricing.title")}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans leading-tight tracking-tight text-slate-900 dark:text-white">
            {t("pricing.subtitle")}
          </h2>
          
          <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-400">
            {t("pricing.desc")}
          </p>
        </div>

        {/* Pricing Cards Row Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative rounded-3xl p-8 flex flex-col justify-between border transition-all duration-300 backdrop-blur-md ${
                plan.popular
                  ? "bg-white/30 dark:bg-white/10 border-blue-650/80 dark:border-cyan-400 shadow-[0_8px_32px_rgba(6,182,212,0.15)] scale-105 z-10"
                  : "bg-white/10 dark:bg-white/5 border-black/5 dark:border-white/10 shadow-[0_8px_32px_rgba(31,38,135,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:border-blue-500/25 dark:hover:border-cyan-500/20"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 text-[10px] font-black uppercase tracking-wider py-1.5 px-4 rounded-full shadow-md flex items-center gap-1 animate-pulse">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t("pricing.recommended")}</span>
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold font-sans text-slate-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 font-normal">
                    {t(`pricing.${plan.id}.desc`)}
                  </p>
                </div>

                {/* Pricing info */}
                <div className="flex items-baseline mb-8">
                  {plan.price !== "Sur devis" ? (
                    <>
                      <span className="text-4xl font-black font-sans tracking-tight text-slate-900 dark:text-white">
                        {plan.price}
                      </span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white ml-1">
                        Ar
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-black font-sans tracking-tight text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                  )}
                  <span className="text-xs text-slate-400 dark:text-slate-500 ml-2 font-sans font-medium uppercase tracking-wider">
                    / {t(`pricing.${plan.id}.period`)}
                  </span>
                </div>

                {/* Features Checklist */}
                <div className="space-y-4 mb-8">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                    {t("pricing.includes")}
                  </div>
                  <ul className="space-y-3.5">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        <div className="p-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5 stroke-[3.5]" />
                        </div>
                        <span className="font-normal leading-normal">{t(`pricing.${plan.id}.f${fIdx + 1}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleScrollToContact}
                className={`w-full py-4 px-4 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer text-center outline-none ${
                  plan.popular
                    ? "bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-lg shadow-blue-500/15 hover:bg-blue-700 dark:hover:bg-cyan-400 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5"
                    : "bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 hover:-translate-y-0.5"
                }`}
              >
                {t(`pricing.${plan.id}.btn`)}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Free trial footer notice info */}
        <div className="text-center mt-12 text-xs text-slate-400 dark:text-slate-500">
          {t("pricing.footer")}
        </div>

      </div>
    </section>
  );
}
