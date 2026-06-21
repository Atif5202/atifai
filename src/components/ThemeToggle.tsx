import { useDarkMode } from "../hooks/useDarkMode";
import { Sun, Moon } from "lucide-react";
import { motion } from "motion/react";

interface ThemeToggleProps {
  id?: string;
}

export function ThemeToggle({ id = "theme-toggle" }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useDarkMode();

  return (
    <button
      id={id}
      onClick={toggleTheme}
      className="relative flex items-center justify-center p-2 rounded-xl transition-all duration-300 border border-slate-200/60 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/40"
      aria-label="Changer de thème"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={isDark ? "absolute opacity-0" : "relative opacity-100"}
      >
        <Sun className="h-[18px] w-[18px] text-amber-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : -180, scale: isDark ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className={isDark ? "relative opacity-100" : "absolute opacity-0"}
      >
        <Moon className="h-[18px] w-[18px] text-indigo-400" />
      </motion.div>
    </button>
  );
}
