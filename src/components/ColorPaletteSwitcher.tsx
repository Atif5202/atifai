import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Palette, Check, Sparkles, X, RotateCcw } from "lucide-react";

interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  accent: string;
  variables: Record<string, string>;
}

const PALETTES: ColorScheme[] = [
  {
    id: "default-blue",
    name: "Bleu Cosmique (Par défaut)",
    primary: "#2563eb",
    accent: "#06b6d4",
    variables: {
      "--primary-50": "#eff6ff",
      "--primary-100": "#dbeafe",
      "--primary-200": "#bfdbfe",
      "--primary-500": "#3b82f6",
      "--primary-600": "#2563eb",
      "--primary-620": "#1d4ed8",
      "--primary-650": "#1d4ed8",
      "--primary-700": "#1d4ed8",
      "--primary-800": "#1e40af",
      "--primary-950": "#172554",
      "--accent-50": "#ecfeff",
      "--accent-100": "#cffafe",
      "--accent-200": "#a5f3fc",
      "--accent-300": "#67e8f9",
      "--accent-305": "#22d3ee",
      "--accent-400": "#22d3ee",
      "--accent-405": "#06b6d4",
      "--accent-500": "#06b6d4",
      "--accent-550": "#06b6d4",
      "--accent-600": "#0891b2",
    },
  },
  {
    id: "neon-sunset",
    name: "Aurore de Néon (Rose & Ambre)",
    primary: "#db2777", // pink-600
    accent: "#f59e0b", // amber-500
    variables: {
      "--primary-50": "#fdf2f8",
      "--primary-100": "#fce7f3",
      "--primary-200": "#fbcfe8",
      "--primary-500": "#ec4899",
      "--primary-600": "#db2777",
      "--primary-620": "#be185d",
      "--primary-650": "#be185d",
      "--primary-700": "#be185d",
      "--primary-800": "#9d174d",
      "--primary-950": "#500724",
      "--accent-50": "#fffbeb",
      "--accent-100": "#fef3c7",
      "--accent-200": "#fde68a",
      "--accent-300": "#fcd34d",
      "--accent-305": "#fbbf24",
      "--accent-400": "#fbbf24",
      "--accent-405": "#f59e0b",
      "--accent-500": "#f59e0b",
      "--accent-550": "#f59e0b",
      "--accent-600": "#d97706",
    },
  },
  {
    id: "emerald-cyan",
    name: "Amazonie High-Tech (Smaragdine)",
    primary: "#059669", // emerald-600
    accent: "#06b6d4", // cyan-500
    variables: {
      "--primary-50": "#ecfdf5",
      "--primary-100": "#d1fae5",
      "--primary-200": "#a7f3d0",
      "--primary-500": "#10b981",
      "--primary-600": "#059669",
      "--primary-620": "#047857",
      "--primary-650": "#047857",
      "--primary-700": "#047857",
      "--primary-800": "#065f46",
      "--primary-950": "#022c22",
      "--accent-50": "#ecfeff",
      "--accent-100": "#cffafe",
      "--accent-200": "#a5f3fc",
      "--accent-300": "#67e8f9",
      "--accent-305": "#22d3ee",
      "--accent-400": "#22d3ee",
      "--accent-405": "#06b6d4",
      "--accent-500": "#06b6d4",
      "--accent-550": "#06b6d4",
      "--accent-600": "#0891b2",
    },
  },
  {
    id: "royal-amethyst",
    name: "Améthyste Impériale (Ultra Violet)",
    primary: "#7c3aed", // violet-600
    accent: "#ec4899", // pink-500
    variables: {
      "--primary-50": "#f5f3ff",
      "--primary-100": "#ede9fe",
      "--primary-200": "#ddd6fe",
      "--primary-500": "#8b5cf6",
      "--primary-600": "#7c3aed",
      "--primary-620": "#6d28d9",
      "--primary-650": "#6d28d9",
      "--primary-700": "#6d28d9",
      "--primary-800": "#5b21b6",
      "--primary-950": "#2e1065",
      "--accent-50": "#fdf2f8",
      "--accent-100": "#fce7f3",
      "--accent-200": "#fbcfe8",
      "--accent-300": "#f472b6",
      "--accent-305": "#ec4899",
      "--accent-400": "#ec4899",
      "--accent-405": "#db2777",
      "--accent-500": "#db2777",
      "--accent-550": "#db2777",
      "--accent-600": "#be185d",
    },
  },
  {
    id: "vulcan-magma",
    name: "Coulée de Lave (Mandarine & Épice)",
    primary: "#ea580c", // orange-600
    accent: "#f43f5e", // rose-500
    variables: {
      "--primary-50": "#fff7ed",
      "--primary-100": "#ffedd5",
      "--primary-200": "#fed7aa",
      "--primary-500": "#f97316",
      "--primary-600": "#ea580c",
      "--primary-620": "#c2410c",
      "--primary-650": "#c2410c",
      "--primary-700": "#c2410c",
      "--primary-800": "#9a3412",
      "--primary-950": "#431407",
      "--accent-50": "#fff1f2",
      "--accent-100": "#ffe4e6",
      "--accent-200": "#fecdd3",
      "--accent-300": "#fda4af",
      "--accent-305": "#fb7185",
      "--accent-400": "#fb7185",
      "--accent-405": "#f43f5e",
      "--accent-500": "#f43f5e",
      "--accent-550": "#f43f5e",
      "--accent-600": "#e11d48",
    },
  },
];

// Helper Convert Hex to HSL
interface HSL {
  h: number;
  s: number;
  l: number;
}

function hexToHsl(hex: string): HSL {
  let r = 0, g = 0, b = 0;
  const cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else {
    r = parseInt(cleanHex.substring(0, 2), 16) || 0;
    g = parseInt(cleanHex.substring(2, 4), 16) || 0;
    b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  }
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Convert HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  const toHexVal = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHexVal(r)}${toHexVal(g)}${toHexVal(b)}`;
}

// Helper: generate 21 palette shades
function generateDynamicSkins(pBase: string, aBase: string): Record<string, string> {
  const pHsl = hexToHsl(pBase);
  const aHsl = hexToHsl(aBase);

  return {
    // Primary Tailwind CSS range using dynamic scale offsets relative to HSL
    "--primary-50": hslToHex(pHsl.h, pHsl.s, Math.min(98, Math.max(94, 100 - (100 - pHsl.l) * 0.08))),
    "--primary-100": hslToHex(pHsl.h, pHsl.s, Math.min(95, Math.max(88, 100 - (100 - pHsl.l) * 0.20))),
    "--primary-200": hslToHex(pHsl.h, pHsl.s, Math.min(90, Math.max(76, 100 - (100 - pHsl.l) * 0.44))),
    "--primary-500": pBase,
    "--primary-600": hslToHex(pHsl.h, pHsl.s, Math.max(10, pHsl.l * 0.88)),
    "--primary-620": hslToHex(pHsl.h, pHsl.s, Math.max(8, pHsl.l * 0.81)),
    "--primary-650": hslToHex(pHsl.h, pHsl.s, Math.max(8, pHsl.l * 0.77)),
    "--primary-700": hslToHex(pHsl.h, pHsl.s, Math.max(6, pHsl.l * 0.73)),
    "--primary-800": hslToHex(pHsl.h, pHsl.s, Math.max(4, pHsl.l * 0.58)),
    "--primary-950": hslToHex(pHsl.h, pHsl.s, Math.max(3, Math.min(15, pHsl.l * 0.22))),

    // Accent Tailwind CSS range
    "--accent-50": hslToHex(aHsl.h, aHsl.s, Math.min(98, Math.max(94, 100 - (100 - aHsl.l) * 0.08))),
    "--accent-100": hslToHex(aHsl.h, aHsl.s, Math.min(95, Math.max(88, 100 - (100 - aHsl.l) * 0.20))),
    "--accent-200": hslToHex(aHsl.h, aHsl.s, Math.min(90, Math.max(76, 100 - (100 - aHsl.l) * 0.44))),
    "--accent-300": hslToHex(aHsl.h, aHsl.s, Math.min(84, Math.max(66, 100 - (100 - aHsl.l) * 0.65))),
    "--accent-305": hslToHex(aHsl.h, aHsl.s, Math.min(78, Math.max(58, 100 - (100 - aHsl.l) * 0.82))),
    "--accent-400": hslToHex(aHsl.h, aHsl.s, Math.min(74, Math.max(54, 100 - (100 - aHsl.l) * 0.90))),
    "--accent-405": aBase,
    "--accent-500": aBase,
    "--accent-550": hslToHex(aHsl.h, aHsl.s, Math.max(10, aHsl.l * 0.88)),
    "--accent-600": hslToHex(aHsl.h, aHsl.s, Math.max(8, aHsl.l * 0.75)),
  };
}

export const ColorPaletteSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePalette, setActivePalette] = useState("default-blue");
  const [activeTab, setActiveTab] = useState<"presets" | "custom">("presets");

  // Custom Photoshop Color customizers
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [accentColor, setAccentColor] = useState("#06b6d4");

  const [primaryHsl, setPrimaryHsl] = useState<HSL>({ h: 221, s: 83, l: 53 });
  const [accentHsl, setAccentHsl] = useState<HSL>({ h: 188, s: 94, l: 43 });

  // Load state on mount
  useEffect(() => {
    const savedPalette = localStorage.getItem("atif-color-palette");
    const savedCustomPrimary = localStorage.getItem("atif-custom-primary");
    const savedCustomAccent = localStorage.getItem("atif-custom-accent");

    if (savedCustomPrimary) setPrimaryColor(savedCustomPrimary);
    if (savedCustomAccent) setAccentColor(savedCustomAccent);

    if (savedPalette === "custom" && savedCustomPrimary && savedCustomAccent) {
      setActivePalette("custom");
      setActiveTab("custom");
      setPrimaryHsl(hexToHsl(savedCustomPrimary));
      setAccentHsl(hexToHsl(savedCustomAccent));
      
      const variableSet = generateDynamicSkins(savedCustomPrimary, savedCustomAccent);
      applyPalette(variableSet);
    } else if (savedPalette && savedPalette !== "custom") {
      const palette = PALETTES.find((p) => p.id === savedPalette);
      if (palette) {
        setActivePalette(palette.id);
        applyPalette(palette.variables);
        setPrimaryColor(palette.primary);
        setAccentColor(palette.accent);
        setPrimaryHsl(hexToHsl(palette.primary));
        setAccentHsl(hexToHsl(palette.accent));
      }
    }
  }, []);

  const applyPalette = (variables: Record<string, string>) => {
    const root = document.documentElement;
    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  const handleSelectPalette = (palette: ColorScheme) => {
    setActivePalette(palette.id);
    applyPalette(palette.variables);
    setPrimaryColor(palette.primary);
    setAccentColor(palette.accent);
    setPrimaryHsl(hexToHsl(palette.primary));
    setAccentHsl(hexToHsl(palette.accent));
    localStorage.setItem("atif-color-palette", palette.id);
  };

  // When sliders modify primary
  const handlePrimaryHslChange = (changes: Partial<HSL>) => {
    const updated = { ...primaryHsl, ...changes };
    setPrimaryHsl(updated);
    const hex = hslToHex(updated.h, updated.s, updated.l);
    setPrimaryColor(hex);
    triggerLiveCustomTheme(hex, accentColor);
  };

  // When sliders modify accent
  const handleAccentHslChange = (changes: Partial<HSL>) => {
    const updated = { ...accentHsl, ...changes };
    setAccentHsl(updated);
    const hex = hslToHex(updated.h, updated.s, updated.l);
    setAccentColor(hex);
    triggerLiveCustomTheme(primaryColor, hex);
  };

  // Directly change hex primary via color selector
  const handlePrimaryColorWheel = (value: string) => {
    setPrimaryColor(value);
    const hsl = hexToHsl(value);
    setPrimaryHsl(hsl);
    triggerLiveCustomTheme(value, accentColor);
  };

  // Directly change hex accent via color selector
  const handleAccentColorWheel = (value: string) => {
    setAccentColor(value);
    const hsl = hexToHsl(value);
    setAccentHsl(hsl);
    triggerLiveCustomTheme(primaryColor, value);
  };

  // Apply custom theme live & save
  const triggerLiveCustomTheme = (pBase: string, aBase: string) => {
    setActivePalette("custom");
    const variables = generateDynamicSkins(pBase, aBase);
    applyPalette(variables);
    
    localStorage.setItem("atif-color-palette", "custom");
    localStorage.setItem("atif-custom-primary", pBase);
    localStorage.setItem("atif-custom-accent", aBase);
  };

  const resetCustomPalette = () => {
    const defaultBlue = PALETTES[0];
    handleSelectPalette(defaultBlue);
    setActiveTab("presets");
  };

  return (
    <div className="fixed bottom-6 left-6 z-[999]">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay to focus or tap outside to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950 pointer-events-auto"
            />

            {/* Main theme options floating panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 20, stiffness: 140 }}
              className="absolute bottom-16 left-0 w-80 p-4 rounded-2xl bg-white/95 dark:bg-[#09090c]/95 border border-slate-200/80 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl pointer-events-auto max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Skins & Customisateur
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Tabs Switcher */}
              <div className="flex bg-slate-100 dark:bg-slate-900 rounded-lg p-0.5 mb-4 text-[11px] font-bold">
                <button
                  onClick={() => setActiveTab("presets")}
                  className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                    activeTab === "presets"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  Modèles Prédéfinis
                </button>
                <button
                  onClick={() => setActiveTab("custom")}
                  className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                    activeTab === "custom"
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  }`}
                >
                  Sélecteur
                </button>
              </div>

              {activeTab === "presets" ? (
                <div className="space-y-1.5">
                  {PALETTES.map((palette) => {
                    const isActive = activePalette === palette.id;
                    return (
                      <button
                        key={palette.id}
                        onClick={() => handleSelectPalette(palette)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                          isActive
                            ? "bg-blue-50/50 dark:bg-white/5 border-blue-600/30 dark:border-cyan-400/30 text-blue-600 dark:text-cyan-400"
                            : "border-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Two circles showcasing primary + accent color preview */}
                          <div className="flex -space-x-1.5">
                            <span
                              className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                              style={{ backgroundColor: palette.primary }}
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                              style={{ backgroundColor: palette.accent }}
                            />
                          </div>
                          <span className="font-medium text-[13px]">{palette.name}</span>
                        </div>
                        
                        {isActive && (
                          <motion.div
                            layoutId="active-palette-check"
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          >
                            <Check className="h-4.5 w-4.5 text-blue-600 dark:text-cyan-400 stroke-[2.5]" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4 pt-1">
                  
                  {/* Primary Color selection */}
                  <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 relative overflow-hidden">
                    {/* Tiny rainbow highlight edge similar to photoshop UI */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-green-500 via-blue-500 via-orange-500 to-pink-500" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        1. Couleur Principale
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 select-all font-semibold bg-white dark:bg-black px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-800">
                          {primaryColor.toUpperCase()}
                        </span>
                        {/* Interactive HTML5 Color Picker resembling Photoshop color block */}
                        <div className="relative w-6 h-6 rounded-md overflow-hidden border border-slate-400 shadow-inner group cursor-pointer shrink-0">
                          <input
                            type="color"
                            value={primaryColor}
                            onChange={(e) => handlePrimaryColorWheel(e.target.value)}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer scale-150"
                          />
                          <div 
                            className="w-full h-full transition-transform group-hover:scale-110"
                            style={{ backgroundColor: primaryColor }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Photoshop HSL Sliders */}
                    <div className="space-y-2.5 pt-1.5">
                      {/* Hue slider with beautiful continuous colors background */}
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                          <span>Teinte (H)</span>
                          <span className="font-semibold text-slate-600 dark:text-slate-300">{primaryHsl.h}°</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={primaryHsl.h}
                          onChange={(e) => handlePrimaryHslChange({ h: parseInt(e.target.value) })}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)"
                          }}
                        />
                      </div>

                      {/* Saturation slider with variable scale background */}
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                          <span>Saturation (S)</span>
                          <span className="font-semibold text-slate-600 dark:text-slate-300">{primaryHsl.s}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={primaryHsl.s}
                          onChange={(e) => handlePrimaryHslChange({ s: parseInt(e.target.value) })}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, ${hslToHex(primaryHsl.h, 0, primaryHsl.l)} 0%, ${hslToHex(primaryHsl.h, 100, primaryHsl.l)} 100%)`
                          }}
                        />
                      </div>

                      {/* Lightness Slider */}
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                          <span>Luminosité (L)</span>
                          <span className="font-semibold text-slate-600 dark:text-slate-300">{primaryHsl.l}%</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="85"
                          value={primaryHsl.l}
                          onChange={(e) => handlePrimaryHslChange({ l: parseInt(e.target.value) })}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #000 0%, ${hslToHex(primaryHsl.h, primaryHsl.s, 50)} 50%, #fff 100%)`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Accent Color selection */}
                  <div className="space-y-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 relative overflow-hidden">
                    {/* Accent glowing indicator bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400" />
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        2. Couleur d'Accent
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 select-all font-semibold bg-white dark:bg-black px-1.5 py-0.5 rounded border border-slate-100 dark:border-slate-800">
                          {accentColor.toUpperCase()}
                        </span>
                        {/* Accent Interactive Color Box */}
                        <div className="relative w-6 h-6 rounded-md overflow-hidden border border-slate-400 shadow-inner group cursor-pointer shrink-0">
                          <input
                            type="color"
                            value={accentColor}
                            onChange={(e) => handleAccentColorWheel(e.target.value)}
                            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer scale-150"
                          />
                          <div 
                            className="w-full h-full transition-transform group-hover:scale-110"
                            style={{ backgroundColor: accentColor }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Photoshop HSL sliders for Accent */}
                    <div className="space-y-2.5 pt-1.5">
                      {/* Hue slider */}
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                          <span>Teinte (H)</span>
                          <span className="font-semibold text-slate-600 dark:text-slate-300">{accentHsl.h}°</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={accentHsl.h}
                          onChange={(e) => handleAccentHslChange({ h: parseInt(e.target.value) })}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)"
                          }}
                        />
                      </div>

                      {/* Saturation slider */}
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                          <span>Saturation (S)</span>
                          <span className="font-semibold text-slate-600 dark:text-slate-300">{accentHsl.s}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={accentHsl.s}
                          onChange={(e) => handleAccentHslChange({ s: parseInt(e.target.value) })}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, ${hslToHex(accentHsl.h, 0, accentHsl.l)} 0%, ${hslToHex(accentHsl.h, 100, accentHsl.l)} 100%)`
                          }}
                        />
                      </div>

                      {/* Lightness slider */}
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-0.5">
                          <span>Luminosité (L)</span>
                          <span className="font-semibold text-slate-600 dark:text-slate-300">{accentHsl.l}%</span>
                        </div>
                        <input
                          type="range"
                          min="15"
                          max="85"
                          value={accentHsl.l}
                          onChange={(e) => handleAccentHslChange({ l: parseInt(e.target.value) })}
                          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #000 0%, ${hslToHex(accentHsl.h, accentHsl.s, 50)} 50%, #fff 100%)`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Reset customize action button */}
                  <button
                    onClick={resetCustomPalette}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-center text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-transparent"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Réinitialiser aux couleurs d'origine
                  </button>
                </div>
              )}

              <div className="mt-3.5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500">
                <Sparkles className="h-3 w-3 text-yellow-500 shrink-0" />
                <span>Réglez et regardez le site changer en temps réel !</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-3.5 rounded-full border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 bg-white/95 dark:bg-slate-900/95 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-xl backdrop-blur-md cursor-pointer flex items-center justify-center pointer-events-auto relative focus:outline-none"
        aria-label="Changer le jeu de couleurs"
      >
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-500 animate-ping" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-500" />
        <Palette className="h-5 w-5 stroke-[2]" />
      </motion.button>
    </div>
  );
};
