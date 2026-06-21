import React, { useEffect, useState, useRef } from "react";
import { metricsData } from "../data/mockData";
import { motion } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";

function CountUpItem({ value, suffix, label }: { value: number; suffix: string; label: string; key?: string }) {
  const [currentValue, setCurrentValue] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds animation

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing out function for natural slowdown
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      setCurrentValue(easedProgress * value);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setCurrentValue(value);
      }
    };

    requestAnimationFrame(animateCount);
  }, [hasStarted, value]);

  // Format the helper value to display commas or decimals nicely
  const formatValue = (val: number) => {
    if (suffix === "M") {
      return val.toFixed(1);
    }
    if (suffix === "%") {
      return val.toFixed(1);
    }
    // Number formatting
    return Math.floor(val).toLocaleString("fr-FR");
  };

  return (
    <div
      ref={elementRef}
      className="flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl border border-black/5 dark:border-white/10 bg-white/20 dark:bg-white/5 backdrop-blur-md relative group hover:border-blue-500/25 dark:hover:border-cyan-500/20 transition-all duration-300 shadow-[0_8px_32px_0_rgba(31,38,135,0.03)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]"
    >
      {/* Visual ring element behind count */}
      <div className="absolute inset-0 bg-blue-500/5 dark:bg-cyan-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <span className="font-sans text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white flex items-baseline">
        <span className="text-blue-600 dark:text-cyan-400">
          {formatValue(currentValue)}
        </span>
        <span className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-cyan-400 ml-0.5">
          {suffix}
        </span>
      </span>
      <span className="mt-2 text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">
        {label}
      </span>
    </div>
  );
}

export function Stats() {
  const { t } = useLanguage();

  const getTranslatedLabel = (id: string, defaultLabel: string) => {
    switch (id) {
      case "1": return t("metric.companies");
      case "2": return t("metric.sales");
      case "3": return t("metric.uptime");
      case "4": return t("metric.countries");
      default: return defaultLabel;
    }
  };

  return (
    <section className="relative py-16 bg-transparent transition-colors duration-300 border-y border-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {metricsData.map((metric) => (
            <CountUpItem
              key={metric.id}
              value={metric.value}
              suffix={metric.suffix}
              label={getTranslatedLabel(metric.id, metric.label)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
