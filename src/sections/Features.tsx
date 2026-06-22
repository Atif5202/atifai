import { featuresData } from "../data/mockData";
import { DynamicIcon } from "../components/DynamicIcon";
import { motion } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";

export function Features() {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="features" className="relative py-24 md:py-32 bg-transparent transition-colors duration-300">
      {/* Background decorations */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 dark:bg-indigo-500/2 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-900/40 border border-blue-200/30 mb-4"
          >
            <span>{t("features.title")}</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-sans leading-tight tracking-tight text-slate-900 dark:text-white"
          >
            {t("features.subtitle")}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-400 font-normal"
          >
            {t("features.desc")}
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuresData.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                transition: { duration: 0.2, ease: "easeOut" } 
              }}
              className="group relative p-8 rounded-2xl border border-black/5 dark:border-white/10 bg-white/20 dark:bg-white/5 backdrop-blur-md hover:border-blue-500/35 dark:hover:border-cyan-500/20 shadow-[0_8px_32px_rgba(31,38,135,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 pointer-events-auto"
            >
              {/* Colored Glow Edge effect with hover */}
              <div className="absolute inset-0 rounded-2xl bg-blue-500/5 dark:bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Icon Container with Solid Background */}
              <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100/50 dark:bg-slate-950 text-blue-600 dark:text-cyan-400 border border-black/5 dark:border-slate-800 group-hover:scale-110 group-hover:bg-blue-600 dark:group-hover:bg-cyan-500 group-hover:text-white dark:group-hover:text-slate-950 group-hover:border-transparent transition-all duration-300 shadow-sm shadow-blue-500/5">
                <DynamicIcon name={feature.iconName} className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold font-sans text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors duration-200">
                {t(`feature.${feature.id}.title`)}
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {t(`feature.${feature.id}.desc`)}
              </p>
              
              {/* Hover bottom chevron hint */}
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0 font-sans">
                {t("features.explore")} <span>&rarr;</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
