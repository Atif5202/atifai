import { useState, useEffect, useRef } from "react";
import { testimonialsData } from "../data/mockData";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../hooks/useLanguage";

export function Testimonials() {
  const { t } = useLanguage();

  const testiKeyMap: Record<string, string> = {
    "1": "alexandre",
    "2": "sophie",
    "3": "maxime",
    "4": "lea",
    "5": "lucas",
    "6": "camille"
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const startAutoplay = () => {
    stopAutoplay();
    timerRef.current = setInterval(() => {
      slideNext();
    }, 5000); // changes every 5 seconds
  };

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 150 : -150,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 150 : -150,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-transparent transition-colors duration-300">
      {/* Decorative vectors */}
      <div className="absolute top-1/2 left-5 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-blue-500/5 dark:bg-blue-500/2 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-900/40 border border-blue-200/30 mb-4">
            <span>{t("testi.title")}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans leading-tight tracking-tight text-slate-900 dark:text-white">
            {t("testi.subtitle")}
          </h2>
          
          <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-400">
            {t("testi.desc")}
          </p>
        </div>

        {/* Carousel Slide Area Wrapper */}
        <div className="max-w-4xl mx-auto relative px-4 md:px-12 group">
          
          {/* Main Card */}
          <div 
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
            className="rounded-3xl border border-black/5 dark:border-white/10 bg-white/20 dark:bg-white/5 p-8 md:p-12 shadow-[0_8px_32px_rgba(31,38,135,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] relative min-h-[340px] flex flex-col justify-between overflow-hidden backdrop-blur-xl"
          >
            {/* Background design big quote indicator */}
            <div className="absolute top-6 right-8 text-blue-600/5 dark:text-cyan-400/5 pointer-events-none">
              <Quote className="h-28 w-28 stroke-[4]" />
            </div>

            <div className="relative">
              {/* Stars indicators */}
              <div className="flex gap-1 mb-6 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-current" />
                ))}
              </div>

              {/* Slider Component */}
              <div className="overflow-hidden relative min-h-[140px]">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-slate-600 dark:text-slate-200 italic"
                  >
                    "{testiKeyMap[testimonialsData[currentIndex].id] ? t(`testi.${testiKeyMap[testimonialsData[currentIndex].id]}.content`) : testimonialsData[currentIndex].content}"
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Author meta row info wrapper */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              
              <AnimatePresence initial={false} mode="wait">
                <motion.div 
                  key={currentIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={testimonialsData[currentIndex].avatarUrl}
                    alt={testimonialsData[currentIndex].name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-blue-500/20 shadow-md grayscale-0 dark:grayscale"
                  />
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-sans">
                      {testimonialsData[currentIndex].name}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      {testiKeyMap[testimonialsData[currentIndex].id] ? t(`testi.${testiKeyMap[testimonialsData[currentIndex].id]}.role`) : testimonialsData[currentIndex].role} — <span className="text-blue-600 dark:text-cyan-400 font-bold">{testimonialsData[currentIndex].company}</span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Indicators dots & controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={slidePrev}
                  className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-950 cursor-pointer"
                  aria-label={t("testi.prev")}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={slideNext}
                  className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors bg-white dark:bg-slate-950 cursor-pointer"
                  aria-label={t("testi.next")}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

            </div>

          </div>

          {/* Stepper progress dots indicators below card */}
          <div className="flex justify-center gap-1.5 mt-8">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-blue-600 dark:bg-cyan-500" 
                    : "w-2 bg-slate-200 dark:bg-slate-800"
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
