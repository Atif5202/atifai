import { useState, useEffect } from "react";
import { demoDashboardData } from "../data/mockData";
import { DashboardTab } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { 
  Boxes, 
  TrendingUp, 
  Receipt, 
  Sparkles, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight,
  RefreshCw,
  Terminal,
  Cpu
} from "lucide-react";

// Customized Tooltip for Recharts designed to blend perfectly with our minimalist aesthetic
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div id="recharts-custom-tooltip" className="p-3 bg-slate-900/95 dark:bg-slate-950/95 border border-slate-200/20 dark:border-slate-800/80 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl">
        <p className="text-xs font-bold text-slate-400 mb-1.5 font-mono uppercase tracking-wider">{label}</p>
        <div className="space-y-1">
          {payload.map((pld: any, index: number) => (
            <p key={index} className="text-xs font-semibold flex items-center gap-2" style={{ color: pld.color || pld.stroke }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pld.color || pld.stroke }} />
              <span className="text-slate-200">{pld.name} :</span>
              <span className="font-extrabold text-white">
                {pld.value.toLocaleString()} {pld.key === "stockLevel" ? "%" : "Ar"}
              </span>
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function Demo() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("stock");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState(() => {
    const copy = JSON.parse(JSON.stringify(demoDashboardData));
    
    // Reset stock stats, items and charts
    copy.stock.stats[0].value = "0 Ar";
    copy.stock.stats[0].trend = "Aucune valeur insérée";
    copy.stock.stats[1].value = "0 Articles";
    copy.stock.stats[1].trend = "Prêt pour la saisie";
    copy.stock.stats[2].value = "0 Produits";
    copy.stock.stats[2].trend = "Aucune rupture";
    copy.stock.items = [];
    copy.stock.chartData = copy.stock.chartData.map((point: any) => ({ ...point, stockLevel: 0 }));

    // Reset venta stats, items and charts
    copy.venta.stats[0].value = "0 Ar";
    copy.venta.stats[0].trend = "Aucune vente enregistrée";
    copy.venta.stats[1].value = "0 Ar";
    copy.venta.stats[1].trend = "Pas de panier moyen";
    copy.venta.stats[2].value = "0 %";
    copy.venta.stats[2].trend = "Taux de conversion initial";
    copy.venta.items = [];
    copy.venta.chartData = copy.venta.chartData.map((point: any) => ({ ...point, sales: 0 }));

    // Reset comptabilite stats, items and charts
    copy.comptabilite.stats[0].value = "0 Ar";
    copy.comptabilite.stats[0].trend = "Trésorerie initiale";
    copy.comptabilite.stats[1].value = "0 Ar";
    copy.comptabilite.stats[1].trend = "Aucune charge fiscale";
    copy.comptabilite.stats[2].value = "0 %";
    copy.comptabilite.stats[2].trend = "Prêt à calculer la marge";
    copy.comptabilite.items = [];
    copy.comptabilite.chartData = copy.comptabilite.chartData.map((point: any) => ({ ...point, revenue: 0, expenses: 0 }));

    // Reset IA stats, logs and charts
    copy.ia.stats[0].value = "0 %";
    copy.ia.stats[0].trend = "Pas d'analyse exécutée";
    copy.ia.stats[1].value = "0 suggestions";
    copy.ia.stats[1].trend = "Aucune alerte prédictive";
    copy.ia.stats[2].value = "0 Ar";
    copy.ia.stats[2].trend = "Pas d'économie modélisée";
    copy.ia.aiLogs = [];
    copy.ia.chartData = copy.ia.chartData.map((point: any) => ({ ...point, historique: 0, projection: 0 }));

    return copy;
  });
  
  // Tab selector on right side: "saisie" (Saisie de Données Live) vs "feed" (Activité Récente)
  const [sidebarMode, setSidebarMode] = useState<"feed" | "saisie">("saisie");
  const [toast, setToast] = useState<string | null>(null);

  // Live client-side submission states for 'stock'
  const [stockName, setStockName] = useState("");
  const [stockQty, setStockQty] = useState<number>(20);
  const [stockPrice, setStockPrice] = useState<number>(150000);
  const [stockStatus, setStockStatus] = useState("Normal");

  // Live client-side submission states for 'venta'
  const [saleCustomer, setSaleCustomer] = useState("");
  const [saleProduct, setSaleProduct] = useState("");
  const [saleAmount, setSaleAmount] = useState<number>(350000);

  // Live client-side submission states for 'comptabilite'
  const [compLabel, setCompLabel] = useState("");
  const [compType, setCompType] = useState<"Revenu" | "Dépense">("Revenu");
  const [compAmount, setCompAmount] = useState<number>(150000);

  // Live client-side submission states for 'ia'
  const [iaPrompt, setIaPrompt] = useState("");

  const tabsList = [
    { id: "stock" as DashboardTab, name: "Gestion de Stock", icon: Boxes, color: "text-blue-500", activeBg: "bg-blue-500/10" },
    { id: "venta" as DashboardTab, name: "Suivi des Ventes", icon: TrendingUp, color: "text-indigo-500", activeBg: "bg-indigo-500/10" },
    { id: "comptabilite" as DashboardTab, name: "Comptabilité", icon: Receipt, color: "text-emerald-500", activeBg: "bg-emerald-500/10" },
    { id: "ia" as DashboardTab, name: "Intelligence Artificielle", icon: Sparkles, color: "text-cyan-500", activeBg: "bg-cyan-500/10" }
  ];

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const parseFormattedNumber = (valStr: string) => {
    const clean = valStr.replace(/\s/g, "").replace(/Ar/g, "").replace(/Articles/g, "").replace(/Produits/g, "").replace(/%/g, "").replace(/€/g, "");
    return parseInt(clean) || 0;
  };

  const formatAriary = (num: number) => {
    return `${num.toLocaleString("fr-FR")} Ar`;
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      setIsRefreshing(false);
      
      setDashboardData((prevData: any) => {
        const copy = JSON.parse(JSON.stringify(prevData));
        
        // 1. SIMULATE LIVE VARIATIONS IN STOCK TAB
        {
          const sec = copy.stock;
          
          if (sec.items.length > 0) {
            // Slightly fluctuate existing item quantities to simulate real sales & replenishments!
            sec.items = sec.items.map((item: any) => {
              const changeChance = Math.random();
              let qtyChange = 0;
              if (changeChance > 0.7) {
                qtyChange = Math.random() > 0.5 ? 1 : -1;
              }
              const newQty = Math.max(1, item.qty + qtyChange);
              let status = "En Stock";
              if (newQty <= 3) status = "Attention";
              if (newQty <= 1) status = "Rupture Imminente";
              return {
                ...item,
                qty: newQty,
                status
              };
            });
          } else {
            // Empty list? Seed a starting live item to show the simulation in action
            sec.items.push({
              name: "Échantillon Vanille Bourbon (Simulé)",
              sku: "SKU-SIM-99",
              qty: 5,
              price: "85 000 Ar",
              status: "En Stock"
            });
          }

          // Recalculate stats based on actual + fluctuated quantities
          let totalVal = 0;
          let totalQty = 0;
          let totalRuptures = 0;
          sec.items.forEach((item: any) => {
            const uPrice = parseFormattedNumber(item.price);
            totalVal += item.qty * uPrice;
            totalQty += item.qty;
            if (item.status === "Rupture Imminente") {
              totalRuptures += 1;
            }
          });
          
          sec.stats[0].value = formatAriary(totalVal);
          sec.stats[0].trend = `${Math.random() > 0.5 ? "+" : "-"}${formatAriary(Math.round(totalVal * 0.03))} (fluctuation live)`;
          sec.stats[1].value = `${sec.items.length} Articles`;
          sec.stats[1].trend = `${totalQty} pièces en inventaire`;
          sec.stats[2].value = `${totalRuptures} Produits`;
          sec.stats[2].trend = totalRuptures > 0 ? "Alerte réapprovisionnement" : "Aucun retard logistique";
          
          // Re-map chart data with a small fluctuation around target stock level
          sec.chartData = sec.chartData.map((d: any, idx: number) => {
            const ratio = (idx + 1) / sec.chartData.length;
            const targetStockLevel = totalQty > 0 ? Math.min(100, Math.round(totalQty * ratio * 1.5 + (Math.random() - 0.5) * 6)) : 0;
            return {
              ...d,
              stockLevel: Math.max(0, targetStockLevel)
            };
          });
        }

        // 2. SIMULATE LIVE VARIATIONS IN VENTA (Sales)
        {
          const sec = copy.venta;
          
          // Simulate an incoming checkout sale!
          const names = ["Andry R.", "Mialy T.", "Nary L.", "Sitraka J.", "Fanja M.", "Tsiry H."];
          const premiumMadaProducts = ["Vanille de Sambava", "Café Arabica d'Antsirabe", "Chocolat de Madagascar 70%", "Miel Sauvage", "Épices d'Ambanja"];
          
          let chosenPrd = premiumMadaProducts[Math.floor(Math.random() * premiumMadaProducts.length)];
          if (copy.stock.items.length > 0) {
            chosenPrd = copy.stock.items[Math.floor(Math.random() * copy.stock.items.length)].name;
          }
          const chosenName = names[Math.floor(Math.random() * names.length)];
          const randomAmount = Math.round(35000 + Math.random() * 125000);

          const brandNewSale = {
            time: "À l'instant (Simulé)",
            customer: chosenName,
            product: chosenPrd,
            amount: formatAriary(randomAmount),
            status: "Payé ✓"
          };
          
          sec.items.unshift(brandNewSale);
          if (sec.items.length > 6) sec.items.pop();

          // Recalculate CA, average basket & conversion rate based on items
          let totalCA = 0;
          sec.items.forEach((item: any) => {
            totalCA += parseFormattedNumber(item.amount);
          });
          const itemsCount = sec.items.length;
          const avgBasket = itemsCount > 0 ? Math.round(totalCA / itemsCount) : 0;
          // Dynamically wiggle the conversion rate beautifully
          const baseConv = itemsCount > 0 ? 3.5 + itemsCount * 2.25 : 0;
          const convRate = Math.max(0, Math.min(100, baseConv + (Math.random() - 0.5) * 1.5));
          
          sec.stats[0].value = formatAriary(totalCA);
          sec.stats[0].trend = `Dernière vente live: +${formatAriary(randomAmount)}`;
          sec.stats[1].value = formatAriary(avgBasket);
          sec.stats[1].trend = `Calculé sur ${itemsCount} transactions`;
          sec.stats[2].value = `${convRate.toFixed(2)} %`;
          sec.stats[2].trend = "Taux d'engagement live";

          sec.chartData = sec.chartData.map((d: any, idx: number) => {
            const ratio = (idx + 1) / sec.chartData.length;
            const variance = (Math.random() - 0.5) * (totalCA * 0.04);
            return {
              ...d,
              sales: Math.max(0, Math.round(totalCA * ratio + variance))
            };
          });
        }

        // 3. SIMULATE LIVE VARIATIONS IN COMPTABILITE (Accounting)
        {
          const sec = copy.comptabilite;
          
          // Randomly append a simulated fee or revenue movement
          const isRevenu = Math.random() > 0.4;
          const label = isRevenu 
            ? "Paiement Client Rapproché (Simulé)" 
            : "Frais & Commission Live (Simulé)";
          const amount = Math.round(25000 + Math.random() * 95000);
          
          const brandNewRow = {
            label,
            type: isRevenu ? "Revenu" : "Charge",
            value: formatAriary(amount),
            date: "Aujourd'hui"
          };
          
          sec.items.unshift(brandNewRow);
          if (sec.items.length > 6) sec.items.pop();

          // Recalculate accounting totals
          let totalRev = 0;
          let totalExp = 0;
          sec.items.forEach((item: any) => {
            const val = parseFormattedNumber(item.value);
            if (item.type === "Revenu") {
              totalRev += val;
            } else {
              totalExp += val;
            }
          });
          const cash = totalRev - totalExp;
          const estimatedTVA = Math.round(totalRev * 0.20);
          const margin = totalRev > 0 ? Math.round(((totalRev - totalExp) / totalRev) * 100) : 0;
          
          sec.stats[0].value = formatAriary(cash);
          sec.stats[0].trend = `Trésorerie active: ${isRevenu ? "+" : "-"}${formatAriary(amount)}`;
          sec.stats[1].value = formatAriary(estimatedTVA);
          sec.stats[1].trend = "TVA collectée réestimée";
          sec.stats[2].value = `${Math.max(0, Math.min(100, margin))} %`;
          sec.stats[2].trend = "Rendement d'exploitation";

          sec.chartData = sec.chartData.map((d: any, idx: number) => {
            const ratio = (idx + 1) / sec.chartData.length;
            const revVar = (Math.random() - 0.5) * (totalRev * 0.05);
            const expVar = (Math.random() - 0.5) * (totalExp * 0.05);
            return {
              ...d,
              revenue: Math.max(0, Math.round(totalRev * ratio + revVar)),
              expenses: Math.max(0, Math.round(totalExp * ratio + expVar))
            };
          });
        }

        // 4. SIMULATE LIVE VARIATIONS IN IA PREDICTIONS
        {
          const sec = copy.ia;
          
          const aiLogsPool = [
            "OPTIMISATION : Ajustement automatique des stocks de sécurité de Vanille face au fret.",
            "PREDICTION : Augmentation de 5.8% de la demande estimée sur Sambava le mois prochain.",
            "ANALYSE : Rapprochements bancaires automatiques terminés pour la journée.",
            "ALERTE : Optimisation de trésorerie disponible de +12.4% identifiée sur vos frais récurrents."
          ];
          const chosenLog = aiLogsPool[Math.floor(Math.random() * aiLogsPool.length)];
          sec.aiLogs.unshift({
            type: "IA_PROACTIVE",
            text: chosenLog
          });
          if (sec.aiLogs.length > 5) sec.aiLogs.pop();

          const itemsCount = sec.aiLogs.length;
          const nextPrecision = 85.0 + itemsCount * 2.5 + (Math.random() - 0.5) * 1.2;
          const savings = itemsCount * 1350000;

          sec.stats[0].value = `${Math.min(99.9, nextPrecision).toFixed(1)} %`;
          sec.stats[0].trend = "Indice de confiance modélisé";
          sec.stats[1].value = `${itemsCount} suggestions`;
          sec.stats[1].trend = "Recommandations prédictives actives";
          sec.stats[2].value = formatAriary(savings);
          sec.stats[2].trend = "Cumul prévisionnel d'économie";

          sec.chartData = sec.chartData.map((d: any, idx: number) => {
            const ratio = (idx + 1) / sec.chartData.length;
            return {
              ...d,
              historique: idx === 0 ? (itemsCount > 0 ? 1000000 : 0) : null,
              projection: Math.round(savings * ratio)
            };
          });
        }

        return copy;
      });
      showToast("⚡ Simulation de flux dynamique exécutée sur vos saisies !");
    }, 600);
  };

  const handleAddStock = () => {
    if (stockPrice <= 0) return;
    setDashboardData((prevData: any) => {
      const copy = JSON.parse(JSON.stringify(prevData));
      const section = copy.stock;
      
      const additionalValue = stockQty * stockPrice;
      const currentVal = parseFormattedNumber(section.stats[0].value);
      section.stats[0].value = formatAriary(currentVal + additionalValue);
      section.stats[0].trend = `Ajout: +${formatAriary(additionalValue)}`;

      const currentRefs = parseFormattedNumber(section.stats[1].value);
      const nextRefs = currentRefs + 1;
      section.stats[1].value = `${nextRefs} Articles`;
      section.stats[1].trend = "+1 article enregistré";

      const brandNewItem = {
        name: stockName.trim() || "Artisanat d'Art de Madagascar",
        sku: "SKU-" + Math.floor(1000 + Math.random() * 9000),
        qty: stockQty,
        price: formatAriary(stockPrice),
        status: stockStatus,
        color: stockStatus === "Rupture Imminente" ? "text-rose-500 bg-rose-500/10" : stockStatus === "Surstock" ? "text-amber-500 bg-amber-500/10" : "text-emerald-500 bg-emerald-500/10",
        alert: stockStatus === "Rupture Imminente"
      };

      section.items.unshift(brandNewItem);
      if (section.items.length > 6) section.items.pop();
      
      if (stockStatus === "Rupture Imminente") {
        const currentAlerts = parseFormattedNumber(section.stats[2].value);
        section.stats[2].value = `${currentAlerts + 1} Produits`;
        section.stats[2].trend = "Nouvel article en rupture";
      }

      if (section.chartData.length > 0) {
        const lastIndex = section.chartData.length - 1;
        section.chartData[lastIndex].stockLevel = Math.min(100, section.chartData[lastIndex].stockLevel + 15);
      }

      return copy;
    });

    setStockName("");
    setStockQty(20);
    setStockPrice(150000);
    showToast("📦 Nouvel article inséré avec valeur comptabilisée !");
  };

  const handleAddSale = () => {
    if (saleAmount <= 0) return;
    setDashboardData((prevData: any) => {
      const copy = JSON.parse(JSON.stringify(prevData));
      const section = copy.venta;

      const currentCA = parseFormattedNumber(section.stats[0].value);
      const nextCA = currentCA + saleAmount;
      section.stats[0].value = formatAriary(nextCA);
      section.stats[0].trend = `CA Dernier apport: +${formatAriary(saleAmount)}`;

      const brandNewSale = {
        time: "À l'instant",
        customer: saleCustomer.trim() || "Client Toamasina Export",
        product: saleProduct.trim() || "Poivre Sauvage de Madagascar",
        amount: formatAriary(saleAmount),
        status: "Payé ✓"
      };

      section.items.unshift(brandNewSale);
      if (section.items.length > 6) section.items.pop();

      // Panier moyen is exactly CA divided by item entries count
      const itemsCount = section.items.length;
      const nextBasket = itemsCount > 0 ? Math.round(nextCA / itemsCount) : saleAmount;
      section.stats[1].value = formatAriary(nextBasket);
      section.stats[1].trend = `Sur ${itemsCount} ventes réelles`;

      // Conversion rate update
      const currentConv = parseFloat(section.stats[2].value.replace(/\s/g, "").replace(/%/g, "")) || 0;
      const nextConv = Math.min(100, currentConv + 1.25);
      section.stats[2].value = `${nextConv.toFixed(2)} %`;
      section.stats[2].trend = "Optimisation live";

      if (section.chartData.length > 0) {
        const lastIndex = section.chartData.length - 1;
        section.chartData[lastIndex].sales += saleAmount;
      }

      return copy;
    });

    setSaleCustomer("");
    setSaleProduct("");
    showToast("📈 Vente en Ariary enregistrée ! Chiffre d'Affaires mis à jour.");
  };

  const handleAddAcct = () => {
    if (compAmount <= 0) return;
    setDashboardData((prevData: any) => {
      const copy = JSON.parse(JSON.stringify(prevData));
      const section = copy.comptabilite;

      const currentCash = parseFormattedNumber(section.stats[0].value);
      const finalCash = compType === "Revenu" ? currentCash + compAmount : currentCash - compAmount;
      section.stats[0].value = formatAriary(finalCash);
      section.stats[0].trend = `${compType === "Revenu" ? "+" : "-"}${formatAriary(compAmount)}`;

      const brandNewRow = {
        label: compLabel.trim() || "Opération Générale",
        type: compType,
        value: `${compType === "Revenu" ? "+" : "-"}${compAmount.toLocaleString("fr-FR")} Ar`,
        color: compType === "Revenu" ? "text-emerald-500" : "text-rose-500"
      };

      section.items.unshift(brandNewRow);
      if (section.items.length > 6) section.items.pop();

      // Calculated values from items
      let totalRev = 0;
      let totalEx = 0;
      section.items.forEach((item: any) => {
        const valueNum = parseFormattedNumber(item.value);
        if (item.type === "Revenu") {
          totalRev += valueNum;
        } else {
          totalEx += valueNum;
        }
      });

      // Calculate VAT: 20% on all revenues
      const estimatedTVA = Math.round(totalRev * 0.20);
      section.stats[1].value = formatAriary(estimatedTVA);
      section.stats[1].trend = "20% sur CA collecté";

      // Marge brute moyenne: (Total Revenue - Total Expenses) / Total Revenue
      const margin = totalRev > 0 ? Math.round(((totalRev - totalEx) / totalRev) * 100) : 0;
      const displayMargin = Math.max(0, Math.min(100, margin));
      section.stats[2].value = `${displayMargin} %`;
      section.stats[2].trend = `Marge réelle calculée`;

      if (section.chartData.length > 0) {
        const lastIndex = section.chartData.length - 1;
        if (compType === "Revenu") {
          section.chartData[lastIndex].revenue += compAmount;
        } else {
          section.chartData[lastIndex].expenses += compAmount;
        }
      }

      return copy;
    });

    setCompLabel("");
    showToast("💼 Écriture comptable intégrée au grand livre en Ariary !");
  };

  const handleAddAI = () => {
    setDashboardData((prevData: any) => {
      const copy = JSON.parse(JSON.stringify(prevData));
      const section = copy.ia;

      // Precision model incrementation
      const currentPrecision = parseFloat(section.stats[0].value.replace("%", "").trim()) || 0;
      const nextPrecision = currentPrecision === 0 ? 88.5 : Math.min(99.9, currentPrecision + 0.85);
      section.stats[0].value = `${nextPrecision.toFixed(1)} %`;
      section.stats[0].trend = "Niveau d'analyse précis";

      const currentSuggestCount = parseInt(section.stats[1].value.replace("suggestions", "").trim()) || 0;
      section.stats[1].value = `${currentSuggestCount + 1} suggestions`;
      section.stats[1].trend = "Proposition d'achats active";

      const currentSavings = parseFormattedNumber(section.stats[2].value);
      const savingIncr = 1350000;
      section.stats[2].value = formatAriary(currentSavings + savingIncr);
      section.stats[2].trend = `Cumul: +${formatAriary(savingIncr)} d'optimisation`;

      const brandNewLog = {
        type: "PROACTIVE_LIVE",
        text: `PREVIEW IA [${iaPrompt.trim() || "Analyse de flux Madagascar Q3"}]: Modélisation logistique optimisée en Ariary. Sûreté de stock garantie à 99.8%.`
      };

      section.aiLogs.unshift(brandNewLog);
      if (section.aiLogs.length > 6) section.aiLogs.pop();

      if (section.chartData.length > 0) {
        const lastIndex = section.chartData.length - 1;
        if (section.chartData[lastIndex].projection) {
          section.chartData[lastIndex].projection += savingIncr;
        } else {
          section.chartData[lastIndex].projection = savingIncr;
        }
      }

      return copy;
    });

    setIaPrompt("");
    showToast("🧠 Simulation IA finalisée et ajoutée au registre !");
  };

  const currentData = dashboardData[activeTab];

  return (
    <section id="demo" className="relative py-24 md:py-32 bg-transparent transition-colors duration-300">
      {/* Custom Notification Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-sans font-semibold text-xs px-5 py-3.5 rounded-2xl flex items-center gap-2.5 shadow-2xl border border-white/10 dark:border-black/5"
          >
            <span className="text-sm">⚡</span>
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow overlays */}
      <div className="absolute top-1/10 left-10 w-[350px] h-[350px] rounded-full bg-blue-500/5 dark:bg-blue-500/2 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/10 right-10 w-[350px] h-[350px] rounded-full bg-cyan-500/5 dark:bg-cyan-500/2 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-700 dark:text-cyan-300 bg-indigo-50 dark:bg-indigo-900/40 border border-indigo-200/30 mb-4">
            <span>Démonstration Live</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans leading-tight tracking-tight text-slate-900 dark:text-white">
            Prenez les commandes de votre futur outil
          </h2>
          
          <p className="mt-4 text-base md:text-lg text-slate-600 dark:text-slate-400">
            Cliquez sur les différents modules ci-dessous pour explorer la puissance de notre interface et voir comment l'intelligence artificielle structure vos données business.
          </p>
        </div>

        {/* Outer Dashboard Shell wrapper */}
        <div className="rounded-3xl border border-black/5 dark:border-white/10 bg-white/20 dark:bg-white/5 p-4 lg:p-6 shadow-[0_8px_32px_rgba(31,38,135,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-xl relative">
          
          {/* Interactive Navigation Filter tabs bar */}
          <div className="flex flex-wrap lg:flex-nowrap gap-2 pb-4 border-b border-slate-200/60 dark:border-slate-800/80 mb-6">
            {tabsList.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[150px] flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 outline-none cursor-pointer border ${
                    isActive
                      ? "bg-white/50 dark:bg-black/40 border border-black/10 dark:border-white/10 shadow-md text-slate-900 dark:text-white backdrop-blur-md"
                      : "text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/5 border-transparent"
                  }`}
                >
                  <TabIcon className={`h-4.5 w-4.5 ${tab.color} ${isActive ? "animate-pulse" : ""}`} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Simulated App Toolbar with Refresh & status */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 px-1">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 block mb-1">
                Module ACTIF
              </span>
              <h3 className="text-xl font-bold dark:text-white flex items-center gap-2">
                {currentData.title}
                {isRefreshing && <RefreshCw className="h-4.5 w-4.5 text-blue-500 animate-spin" />}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {currentData.subtitle}
              </p>
            </div>
            
            {/* Simulation Status indicators */}
            <div className="flex items-center gap-4">
              <button 
                onClick={handleRefresh}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 cursor-pointer transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Rafraîchir les flux</span>
              </button>
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Console active</span>
              </div>
            </div>
          </div>

          {/* Dynamic Content Grid inside active state */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left side column: Main widget workspace (Charts) */}
            <div className="lg:col-span-8 flex flex-col justify-between rounded-2xl border border-black/5 dark:border-white/10 bg-white/30 dark:bg-[#111111]/75 p-5 shadow-sm min-h-[350px] backdrop-blur-lg">
              
              {/* Graphic metrics summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {currentData.stats.map((stat: any) => (
                  <div 
                    key={stat.id} 
                    className="p-4 rounded-xl border border-black/5 dark:border-white/5 bg-white/20 dark:bg-white/5 relative overflow-hidden backdrop-blur-sm"
                  >
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    <div className="text-2xl font-black mt-1 dark:text-white transition-all duration-300">
                      {stat.value}
                    </div>
                    <div className={`text-[10px] mt-1 font-medium flex items-center gap-0.5 ${
                      stat.alert 
                        ? "text-rose-500" 
                        : "text-emerald-600 dark:text-cyan-400"
                    }`}>
                      {stat.alert ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                      <span>{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Responsive Custom Vector Chart area */}
              <div className="flex-1 flex flex-col justify-end min-h-[220px] relative mt-2 pt-2">
                <div className="absolute top-0 right-0 flex items-center gap-4 text-[10px] font-semibold text-slate-400 z-10 bg-white/40 dark:bg-[#111111]/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    Valeur Réelle
                  </span>
                  {activeTab === "ia" && (
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-cyan-400" />
                      Prediction IA
                    </span>
                  )}
                  {activeTab === "comptabilite" && (
                      <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-rose-500" />
                      Dépenses fiscales
                    </span>
                  )}
                </div>

                {/* Highly customizable, pixel-perfect recharts charts based on Selected Tab */}
                <div className="w-full h-[220px] mt-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-full"
                    >
                      {activeTab === "stock" && (
                        <ResponsiveContainer width="100%" height={220}>
                          <AreaChart
                            data={currentData.chartData}
                            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary-600, #3b82f6)" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="var(--primary-600, #3b82f6)" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
                            <XAxis 
                              dataKey="month" 
                              tickLine={false} 
                              axisLine={false} 
                              tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
                            />
                            <YAxis 
                              tickLine={false} 
                              axisLine={false} 
                              tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(148, 163, 184, 0.1)', strokeWidth: 1 }} />
                            <Area 
                              name="Niveau de Stock" 
                              type="monotone" 
                              dataKey="stockLevel" 
                              stroke="var(--primary-600, #2563eb)" 
                              strokeWidth={3} 
                              fillOpacity={1} 
                              fill="url(#colorStock)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}

                      {activeTab === "venta" && (
                        <ResponsiveContainer width="100%" height={220}>
                          <BarChart
                            data={currentData.chartData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorVentes" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary-600, #2563eb)" stopOpacity={1}/>
                                <stop offset="95%" stopColor="var(--accent-500, #06b6d4)" stopOpacity={0.6}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
                            <XAxis 
                              dataKey="month" 
                              tickLine={false} 
                              axisLine={false} 
                              tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
                            />
                            <YAxis 
                              tickLine={false} 
                              axisLine={false} 
                              tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(148, 163, 184, 0.04)' }} />
                            <Bar 
                              name="Ventes Mensuelles" 
                              dataKey="sales" 
                              fill="url(#colorVentes)" 
                              radius={[6, 6, 0, 0]} 
                              maxBarSize={30}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      )}

                      {activeTab === "comptabilite" && (
                        <ResponsiveContainer width="100%" height={220}>
                          <AreaChart
                            data={currentData.chartData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.08}/>
                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
                            <XAxis 
                              dataKey="month" 
                              tickLine={false} 
                              axisLine={false} 
                              tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
                            />
                            <YAxis 
                              tickLine={false} 
                              axisLine={false} 
                              tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(148, 163, 184, 0.1)', strokeWidth: 1 }} />
                            <Area 
                              name="Revenus" 
                              type="monotone" 
                              dataKey="revenue" 
                              stroke="#10b981" 
                              strokeWidth={3} 
                              fillOpacity={1} 
                              fill="url(#colorRevenue)" 
                            />
                            <Area 
                              name="Dépenses" 
                              type="monotone" 
                              dataKey="expenses" 
                              stroke="#f43f5e" 
                              strokeWidth={2} 
                              fillOpacity={1} 
                              fill="url(#colorExpenses)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}

                      {activeTab === "ia" && (
                        <ResponsiveContainer width="100%" height={220}>
                          <LineChart
                            data={currentData.chartData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
                            <XAxis 
                              dataKey="month" 
                              tickLine={false} 
                              axisLine={false} 
                              tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
                            />
                            <YAxis 
                              tickLine={false} 
                              axisLine={false} 
                              tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} 
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(148, 163, 184, 0.1)', strokeWidth: 1 }} />
                            <Line 
                              name="Historique Réel" 
                              type="monotone" 
                              dataKey="historique" 
                              stroke="var(--primary-600, #2563eb)" 
                              strokeWidth={3} 
                              dot={{ r: 4, strokeWidth: 2, fill: '#ffffff' }}
                              activeDot={{ r: 6 }}
                              connectNulls
                            />
                            <Line 
                              name="Projection IA" 
                              type="monotone" 
                              dataKey="projection" 
                              stroke="var(--accent-500, #06b6d4)" 
                              strokeWidth={3} 
                              strokeDasharray="5 5"
                              dot={{ r: 5, strokeWidth: 2, fill: '#06b6d4' }}
                              activeDot={{ r: 7 }}
                              connectNulls
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>
            <div className="lg:col-span-4 rounded-2xl border border-black/5 dark:border-white/10 bg-white/30 dark:bg-[#111111]/75 p-5 shadow-sm flex flex-col justify-between backdrop-blur-lg relative min-h-[480px]">
              
              <div className="w-full">
                {/* Mode Selector Tab Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-black/5 dark:border-white/10 mb-4">
                  <div className="flex items-center gap-1.5 p-0.5 bg-black/[0.04] dark:bg-white/5 rounded-xl w-full">
                    <button
                      onClick={() => setSidebarMode("saisie")}
                      className={`flex-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-2 rounded-lg transition-all ${
                        sidebarMode === "saisie"
                          ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                      }`}
                    >
                      Saisie Live
                    </button>
                    <button
                      onClick={() => setSidebarMode("feed")}
                      className={`flex-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-2 rounded-lg transition-all ${
                        sidebarMode === "feed"
                          ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-sm"
                          : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
                      }`}
                    >
                      {activeTab === "ia" ? "Prévisions IA" : "Activité"}
                    </button>
                  </div>
                </div>

                {sidebarMode === "saisie" ? (
                  /* INTERACTIVE COMPONENT FORMS */
                  <div className="space-y-4">
                    {activeTab === "stock" && (
                      <div className="space-y-3.5">
                        <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                          Insérez vos propres données d'inventaire à Madagascar. La valeur comptable de votre stock s'ajustera instantanément.
                        </p>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nom de l'article</label>
                          <input 
                            type="text"
                            placeholder="Ex: Vanille Noire de Sambava, Chocolat de Nosy Be..."
                            value={stockName}
                            onChange={(e) => setStockName(e.target.value)}
                            className="w-full text-xs px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white font-sans"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Prix de l'article (Ar)</label>
                          <input 
                            type="number"
                            min="1000"
                            step="5000"
                            value={stockPrice}
                            onChange={(e) => setStockPrice(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full text-xs px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Quantité (pcs)</label>
                            <input 
                              type="number"
                              min="1"
                              value={stockQty}
                              onChange={(e) => setStockQty(Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-full text-xs px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white font-sans"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Statut de stock</label>
                            <select
                              value={stockStatus}
                              onChange={(e) => setStockStatus(e.target.value)}
                              className="w-full text-xs px-2.5 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white font-sans cursor-pointer"
                            >
                              <option value="Normal">Normal</option>
                              <option value="Rupture Imminente">Rupture</option>
                              <option value="Surstock">Surstock</option>
                            </select>
                          </div>
                        </div>
                        <button
                          onClick={handleAddStock}
                          className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold font-sans cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                        >
                          Ajouter au Stock
                        </button>
                      </div>
                    )}

                    {activeTab === "venta" && (
                      <div className="space-y-3.5">
                        <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                          Enregistrez une vraie transaction en direct. Les indicateurs de Chiffre d'Affaires et panier moyen recalculeront l'intégralité du graphique en Ariary !
                        </p>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nom du client</label>
                          <input 
                            type="text"
                            placeholder="Ex: Ranaivo de Tamatave, SARL Madacoop..."
                            value={saleCustomer}
                            onChange={(e) => setSaleCustomer(e.target.value)}
                            className="w-full text-xs px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white font-sans"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Produit / Service vendu</label>
                          <input 
                            type="text"
                            placeholder="Ex: Café Robusta 25kg, Épices d'exportation..."
                            value={saleProduct}
                            onChange={(e) => setSaleProduct(e.target.value)}
                            className="w-full text-xs px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white font-sans"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Montant de la vente (Ar)</label>
                          <input 
                            type="number"
                            min="1000"
                            step="5000"
                            value={saleAmount}
                            onChange={(e) => setSaleAmount(Math.max(0, parseInt(e.target.value) || 0))}
                            className="w-full text-xs px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-white font-mono"
                          />
                        </div>
                        <button
                          onClick={handleAddSale}
                          className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold font-sans cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                        >
                          Enregistrer la Vente
                        </button>
                      </div>
                    )}

                    {activeTab === "comptabilite" && (
                      <div className="space-y-3.5">
                        <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                          Ajustez les écritures comptables réelles du grand livre pour voir la Trésorerie s'adapter dynamiquement sur l'aire des graphiques de recettes.
                        </p>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Libellé du flux financier</label>
                          <input 
                            type="text"
                            placeholder="Ex: Fret maritime Mahajanga, Salaires Antsirabe..."
                            value={compLabel}
                            onChange={(e) => setCompLabel(e.target.value)}
                            className="w-full text-xs px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white font-sans"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Type de flux</label>
                            <div className="flex gap-1">
                              <button
                                onClick={() => setCompType("Revenu")}
                                className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-colors ${
                                  compType === "Revenu"
                                    ? "bg-emerald-500/10 border-emerald-500 text-emerald-500"
                                    : "border-black/5 dark:border-white/5 text-slate-400"
                                }`}
                              >
                                Revenu
                              </button>
                              <button
                                onClick={() => setCompType("Dépense")}
                                className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-colors ${
                                  compType === "Dépense"
                                    ? "bg-rose-500/10 border-rose-500 text-rose-500"
                                    : "border-black/5 dark:border-white/5 text-slate-400"
                                }`}
                              >
                                Dépense
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Montant (Ar)</label>
                            <input 
                              type="number"
                              min="500"
                              step="1000"
                              value={compAmount}
                              onChange={(e) => setCompAmount(Math.max(0, parseInt(e.target.value) || 0))}
                              className="w-full text-xs px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white font-mono"
                            />
                          </div>
                        </div>
                        <button
                          onClick={handleAddAcct}
                          className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-sans cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                        >
                          Enregistrer l'Opération
                        </button>
                      </div>
                    )}

                    {activeTab === "ia" && (
                      <div className="space-y-3.5">
                        <p className="text-[11.5px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                          Saisissez une invite de situation commerciale ou de logistique. L'algorithme prédictif ATIF simulera l'évolution en temps réel sur les mois projetés.
                        </p>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Sujet d'analyse des flux</label>
                          <textarea 
                            rows={3}
                            placeholder="Ex: Analyse d'impact climatique sur la récolte de girofle ou prévision d'achat d'emballages carton..."
                            value={iaPrompt}
                            onChange={(e) => setIaPrompt(e.target.value)}
                            className="w-full text-[11px] px-3 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 focus:outline-none focus:border-cyan-500 text-slate-900 dark:text-white font-sans resize-none"
                          />
                        </div>
                        <button
                          onClick={handleAddAI}
                          className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-500 text-slate-950 text-xs font-bold font-sans cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          Lancer la Simulation IA
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* ORIGINAL RECENT ACTIVITY LIST / LOG FEED SCREEN */
                  <div className="space-y-3.5 max-h-[310px] overflow-y-auto pr-1">
                    {activeTab !== "ia" ? (
                      // Regular list representation
                      (currentData.items || []).map((item: any, idx: number) => (
                        <div 
                          key={idx} 
                          className="flex items-center justify-between p-3 rounded-lg bg-white/20 dark:bg-white/5 border border-black/5 dark:border-white/5 shadow-2xs group hover:bg-white/30 dark:hover:bg-white/10 transition-colors backdrop-blur-sm"
                        >
                          <div className="flex-1 min-w-0 pr-2">
                            <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate font-sans">
                              {item.name || item.customer || item.label}
                            </div>
                            <div className="text-[10.5px] text-slate-400 mt-0.5 flex items-center gap-2">
                              <span>{item.sku || item.time || item.type}</span>
                              {item.alert && (
                                <span className="inline-flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-bold dark:text-white">
                              {item.qty !== undefined ? (
                                item.price ? `${item.qty} pcs @ ${item.price}` : `${item.qty} pcs`
                              ) : (
                                item.amount || item.value
                              )}
                            </div>
                            <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-bold mt-1 ${
                              item.alert || item.type === "Dépense"
                                ? "text-rose-500 bg-rose-500/10" 
                                : "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10"
                            }`}>
                              {item.status || (item.type === "Dépense" ? "Débit " : "Ok ✓")}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      // Interactive terminal log representation for AI predictive console
                      (currentData.aiLogs || []).map((log: any, idx: number) => (
                        <div 
                          key={idx} 
                          className="p-3 rounded-lg bg-black/40 text-slate-300 font-mono text-[11px] border border-white/5 flex gap-2 backdrop-blur-md"
                        >
                          <Terminal className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="text-pink-400 font-bold">[{log.type}]</span>{" "}
                            <span className="text-slate-200 leading-normal text-[11px]">{log.text}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Simulation button at bottom */}
              <button 
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-900 hover:-translate-y-0.5 cursor-pointer transition-all duration-200 shadow-xs"
              >
                <Cpu className={`h-4 w-4 text-blue-600 dark:text-cyan-400 ${isRefreshing ? "animate-spin" : ""}`} />
                <span>{isRefreshing ? "Simulation en cours..." : "Simuler variations de flux"}</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
