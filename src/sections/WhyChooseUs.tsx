import { whyChooseUsData } from "../data/mockData";
import { DynamicIcon } from "../components/DynamicIcon";
import { motion } from "motion/react";

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative py-24 md:py-32 bg-transparent transition-colors duration-300">
      {/* Glow overlays */}
      <div className="absolute top-1/4 right-1/10 w-[300px] h-[300px] rounded-full bg-blue-500/5 dark:bg-blue-500/2 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/10 w-[300px] h-[300px] rounded-full bg-purple-500/5 dark:bg-purple-500/2 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-900/40 border border-blue-200/30 mb-4">
            <span>Pourquoi nous choisir</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans leading-tight tracking-tight text-slate-900 dark:text-white">
            Conçu pour l'exigence des leaders d'aujourd'hui
          </h2>
          
          <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-400">
            Une fiabilité technologique éprouvée alliée à une expérience utilisateur sans compromis, de niveau mondial.
          </p>
        </div>

        {/* 2x2 Grid or 4 column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/20 dark:bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(31,38,135,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:border-blue-500/25 dark:hover:border-cyan-500/25 hover:shadow-2xl transition-all duration-300"
            >
              {/* Card top banner or badge */}
              {item.badge && (
                  <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-cyan-400 px-2 py-0.5 rounded-md border border-blue-100/20 dark:border-cyan-500/10">
                  {item.badge}
                </span>
              )}

              {/* Icon widget */}
              <div className="flex items-center justify-center h-11 w-11 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-cyan-400 mb-6">
                <DynamicIcon name={item.iconName} className="h-5.5 w-5.5" />
              </div>

              {/* Title */}
              <h3 className="text-base font-bold font-sans text-slate-900 dark:text-white tracking-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
