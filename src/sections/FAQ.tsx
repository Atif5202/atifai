import React, { useState } from "react";
import { faqData } from "../data/mockData";
import { ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";

function FaqItemRow({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void; key?: string }) {
  return (
    <div className="border-b border-slate-200/60 dark:border-slate-800 last:border-none py-5">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left gap-4 font-semibold text-slate-800 dark:text-slate-100 hover:text-blue-650 dark:hover:text-cyan-405 transition-colors cursor-pointer group outline-none"
      >
        <span className="text-base sm:text-lg font-bold font-sans tracking-tight">{question}</span>
        <div className={`p-1.5 rounded-lg border border-slate-200/50 dark:border-slate-800 text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 group-hover:text-blue-600 dark:group-hover:text-cyan-405 group-hover:border-blue-500/20 transition-all duration-300 ${isOpen ? "rotate-180 text-blue-600 border-blue-500/20" : ""}`}>
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm md:text-base text-slate-500 dark:text-slate-400 font-normal leading-relaxed pr-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const handleToggle = (id: string) => {
    setOpenId((prevId) => (prevId === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-24 md:py-32 bg-transparent transition-colors duration-300">
      {/* Glow shapes */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/5 dark:bg-blue-500/2 blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-700 dark:text-cyan-305 bg-blue-50 dark:bg-blue-900/40 border border-blue-200/30 mb-4">
            <span>{t("faq.title")}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans leading-tight tracking-tight text-slate-900 dark:text-white">
            {t("faq.subtitle")}
          </h2>
          
          <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-400">
            {t("faq.desc")}
          </p>
        </div>

        {/* Faq Rows Block */}
        <div className="rounded-3xl border border-black/5 dark:border-white/10 bg-white/20 dark:bg-white/5 p-6 sm:p-8 shadow-[0_8px_32px_rgba(31,38,135,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl">
          {faqData.map((faq, idx) => (
            <FaqItemRow
              key={faq.id}
              question={t(`faq.q${idx + 1}`)}
              answer={t(`faq.a${idx + 1}`)}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>

        {/* Proactive CTA support help box */}
        <div className="text-center mt-12 p-6 rounded-2xl border border-dashed border-black/10 dark:border-white/10 bg-white/20 dark:bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto backdrop-blur-md">
          <div className="text-left flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-650 dark:text-cyan-405 hidden sm:block">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold dark:text-white text-slate-900">{t("faq.cta_title")}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{t("faq.cta_desc")}</p>
            </div>
          </div>
          <a
            href="#contact"
            className="text-xs font-bold px-4 py-2.5 rounded-xl text-white bg-blue-600 dark:bg-cyan-600 shadow-md hover:shadow-lg transition-all"
          >
            {t("faq.cta_btn")}
          </a>
        </div>

      </div>
    </section>
  );
}
