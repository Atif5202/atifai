import { 
  FeatureItem, 
  MetricItem, 
  TestimonialItem, 
  PricePlan, 
  FaqItem,
  WhyChooseUsItem
} from "../types";

export const metricsData: MetricItem[] = [
  { id: "1", label: "Entreprises actives", value: 15000, suffix: "+" },
  { id: "2", label: "Ventes traitées (M)", value: 1.2, suffix: "M" },
  { id: "3", label: "Taux de disponibilité", value: 99.9, suffix: "%" },
  { id: "4", label: "Pays d'implantation", value: 50, suffix: "+" }
];

export const featuresData: FeatureItem[] = [
  {
    id: "stock",
    title: "Gestion de Stock",
    description: "Suivez vos inventaires en temps réel. Analyse automatique des taux de rotation et alertes prédictives de réapprovisionnement dirigées par IA.",
    iconName: "Boxes"
  },
  {
    id: "ventes",
    title: "Gestion des Ventes",
    description: "Enregistrez vos transactions instantanément. Suivez vos pipelines commerciaux, analysez le comportement d'achat de vos clients et automatisez les relances.",
    iconName: "TrendingUp"
  },
  {
    id: "comptabilite",
    title: "Comptabilité Automatisée",
    description: "Épargnez des dizaines d'heures de saisie. Génération automatique de bilans, d'indicateurs de trésorerie et intégration directe de vos factures.",
    iconName: "Receipt"
  },
  {
    id: "rapports",
    title: "Rapports Avancés",
    description: "Visualisez votre croissance à travers des tableaux de bord interactifs. Exportez des analyses financières détaillées en un clic aux formats PDF et CSV.",
    iconName: "BarChart3"
  },
  {
    id: "equipe",
    title: "Multi-utilisateurs",
    description: "Collaborez en toute sécurité. Définissez des rôles et des autorisations d'accès granulaires pour vos comptables, managers et commerciaux.",
    iconName: "Users"
  },
  {
    id: "ia",
    title: "Intelligence Artificielle",
    description: "Anticipez l'avenir de votre business. Recommandations de prix dynamiques, détection d'anomalies financières et prévisions de vente mensuelles.",
    iconName: "Sparkles"
  }
];

export const whyChooseUsData: WhyChooseUsItem[] = [
  {
    id: "speed",
    title: "Rapidité Extrême",
    description: "Une interface ultra-rapide bâtie pour la performance. Temps de chargement inférieurs à 100ms grâce à l'edge computing.",
    iconName: "Zap",
    badge: "v2026.1"
  },
  {
    id: "security",
    title: "Sécurité de Grade Bancaire",
    description: "Cryptage AES-256 de bout en bout, hébergement souverain conforme RGPD et double authentification stricte.",
    iconName: "ShieldCheck",
    badge: "Certifié ISO"
  },
  {
    id: "responsive",
    title: "Expérience Omnicanale",
    description: "Gérez votre empire depuis votre mobile, tablette ou moniteur de bureau avec une ergonomie intuitive d'une fluidité irréprochable.",
    iconName: "Smartphone"
  },
  {
    id: "advanced_ai",
    title: "IA Native Propriétaire",
    description: "Modèles d'intelligence artificielle entraînés spécifiquement sur des données comptables et ERP pour éliminer les hallucinations.",
    iconName: "Cpu",
    badge: "Modèles custom"
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "1",
    name: "Alexandre Mercier",
    role: "Fondateur & CEO",
    company: "VeloDrop SAS",
    content: "ATIF AI a radicalement transformé notre gestion logistique. Nos ruptures de stock ont chuté de 85% en moins de trois mois grâce aux algorithmes d'analyse prédictive. L'outil s'est amorti dès la première semaine.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Sophie Laurent",
    role: "Directrice Administrative et Financière",
    company: "Nexa France",
    content: "La corvée de la comptabilité mensuelle s'est transformée en un exercice fluide. Le rapprochement bancaire automatique par l'IA d'ATIF nous fait gagner plus de 4 jours de travail par mois. Une pépite technologique !",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Maxime Dubois",
    role: "Directeur de Croissance (VP Growth)",
    company: "Shopify Partner Studio",
    content: "Avoir à portée de main des prévisions de vente fiables pour les fêtes à venir nous a permis d'ajuster nos investissements marketing au centime près. Les rapports avancés d'ATIF AI sont les plus élégants du commerce.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Léa Martin",
    role: "Responsable Supply Chain",
    company: "EthikCosmetics",
    content: "Gérer plus de 400 références produits sur plusieurs entrepôts était un enfer de tableurs Excel. Le module de stock d'ATIF centralise tout dans une interface hautement intuitive, utilisable directement sur nos téléphones.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Lucas Roche",
    role: "Directeur des Opérations (COO)",
    company: "Alpha Logistic Solutions",
    content: "La mise en place de l'outil a pris moins de 48 heures. Le point fort réside dans la gestion multi-utilisateur avec des autorisations précises qui garantissent la confidentialité des données commerciales de notre réseau.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Camille Vasseur",
    role: "CFO & Trésorière",
    company: "Fintech Horizon",
    content: "Ce que j'apprécie par-dessus tout, c'est l'absence de jargon technique et de fioritures inutiles. L'interface respire la modernité, l'IA détecte immédiatement toute anomalie comptable, rendant nos audits d'une simplicité totale.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
  }
];

export const pricingPlans: PricePlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "0",
    period: "gratuit pour toujours",
    description: "L'essentiel pour structurer votre nouvelle activité sans frais.",
    features: [
      "1 utilisateur unique",
      "Gestion de stock simplifiée (jusqu'à 100 articles)",
      "Facturation & ventes de base",
      "Rapports mensuels de performance",
      "Support communautaire par e-mail"
    ],
    buttonText: "Commencer gratuitement",
    popular: false,
    isFree: true
  },
  {
    id: "business",
    name: "Business",
    price: "145 000",
    period: "par mois / sans engagement",
    description: "La formule phare plébiscitée par 85% des entreprises en forte croissance.",
    features: [
      "Jusqu'à 5 utilisateurs inclus",
      "Stock illimité sur plusieurs entrepôts",
      "Prévisions de ventes par IA (1 mois à l'avance)",
      "Comptabilité & export fiscal automatisés",
      "Rapprochement bancaire intelligent",
      "Support prioritaire 7j/7 en français"
    ],
    buttonText: "Démarrer l'essai gratuit",
    popular: true,
    isFree: false
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Sur devis",
    period: "tarification adaptée à votre échelle",
    description: "Une puissance inédite pour les grandes organisations et chaînes logistiques.",
    features: [
      "Utilisateurs illimités & rôles sur mesure",
      "Modèles d'IA personnalisés et entraînés sur vos données",
      "API REST complète & webhooks en temps réel",
      "Intégrations ERP tierces exclusives (SAP, Sage, etc.)",
      "Account Manager dédié sous SLA strict",
      "Sécurité renforcée (SSO, SAML v2)"
    ],
    buttonText: "Contacter un expert",
    popular: false,
    isFree: false
  }
];

export const faqData: FaqItem[] = [
  {
    id: "faq-1",
    question: "Comment fonctionne l'IA intégrée pour mon entreprise ?",
    answer: "L'IA d'ATIF se connecte de manière transparente à votre historique de vente et d'achat. Elle analyse les cycles saisonniers, les tendances du marché mondial et vos pics d'affluence passés pour estimer précisément les besoins de stock futurs, préconiser des prix optimaux de revente, et automatiser la saisie comptable de manière intelligente et sans effort manuel."
  },
  {
    id: "faq-2",
    question: "Puis-je exporter mes données et factures à tout moment ?",
    answer: "Absolument. Vos données vous appartiennent pleinement. Vous pouvez exporter l'intégralité de vos bases clients, historique d'inventaire, métriques de vente, ainsi que vos journaux comptables aux formats standards standardisés (Excel, CSV, PDF, FEC comptable agréé par le fisc) d'un seul clic depuis votre console de gestion."
  },
  {
    id: "faq-3",
    question: "Quelle est la sécurité réservée aux transactions de l'application ?",
    answer: "La sécurité est au cœur d'ATIF AI. Notre infrastructure utilise le même chiffrement AES 256 bits et TLS 1.3 que les institutions bancaires mondiales réputées. De plus, nos serveurs situés en Europe respectent rigoureusement les réglementations RGPD locales. Nous réalisons également des audits de vulnérabilité complets à intervalle régulier."
  },
  {
    id: "faq-4",
    question: "Est-ce qu'ATIF AI fonctionne hors ligne ?",
    answer: "Oui. En cas de coupure réseau inopinée sur votre smartphone ou tablette, le système sauvegarde localement toutes les transactions courantes de vente et mises à jour de stock dans une base sécurisée locale. Dès que votre connexion Internet est rétablie, vos données se synchronisent de façon transparente avec le cloud sans créer le moindre doublon."
  },
  {
    id: "faq-5",
    question: "Puis-je ajouter plusieurs utilisateurs et diviser les tâches ?",
    answer: "Tout à fait. Les plans Business et Enterprise vous permettent d'inviter vos collaborateurs et de leur assigner des rôles distincts. Par exemple, donnez un accès restreint au module de stock pour vos préparateurs de commandes, donnez les accès financiers uniquement à votre expert-comptable, et conservez le pilotage global pour l'équipe de direction."
  }
];

// Interactive Demo Data streams:
export const demoDashboardData = {
  stock: {
    title: "Tableau d'inventaire instantané",
    subtitle: "Aperçu en temps réel de votre stock logistique",
    stats: [
      { id: "s1", label: "Valeur totale", value: "1 229 000 000 Ar", trend: "+12.4% ce mois" },
      { id: "s2", label: "Références actives", value: "1 240 Articles", trend: "38 nouveautés" },
      { id: "s3", label: "Alertes de rupture", value: "2 Produits", trend: "Réapprovisionnement auto en cours", alert: true }
    ],
    items: [
      { name: "Pro-Sport Wireless Earbuds", sku: "SKU-9908", qty: 45, status: "Normal", color: "text-emerald-500 bg-emerald-500/10" },
      { name: "ActiveFit Smartwatch v4", sku: "SKU-1024", qty: 2, status: "Rupture Imminente", color: "text-rose-500 bg-rose-500/10", alert: true },
      { name: "Elite Leather Laptop Sleeve", sku: "SKU-3323", qty: 110, status: "Surstock", color: "text-amber-500 bg-amber-500/10" },
      { name: "UltraCharge MagSafe Hub", sku: "SKU-4820", qty: 18, status: "Normal", color: "text-emerald-500 bg-emerald-500/10" }
    ],
    chartData: [
      { month: "Jan", stockLevel: 80 },
      { month: "Feb", stockLevel: 75 },
      { month: "Mar", stockLevel: 90 },
      { month: "Apr", stockLevel: 95 },
      { month: "May", stockLevel: 60 },
      { month: "Jun", stockLevel: 85 }
    ]
  },
  venta: {
    title: "Suivi des ventes et transactions",
    subtitle: "Rapport commercial interactif et volume d'affaires",
    stats: [
      { id: "v1", label: "Chiffre d'Affaires", value: "244 750 000 Ar", trend: "+24.5% vs mois dernier" },
      { id: "v2", label: "Panier moyen", value: "392 000 Ar", trend: "+4% d'augmentation" },
      { id: "v3", label: "Conversion lead", value: "3.84 %", trend: "Meilleure performance" }
    ],
    items: [
      { time: "Il y a 2 min", customer: "Jean-Marc Durand", product: "Pack Business annuel", amount: "1 740 000 Ar", status: "Payé ✓" },
      { time: "Il y a 10 min", customer: "Alice Leroy", product: "Smartwatch v4", amount: "995 000 Ar", status: "Payé ✓" },
      { time: "Il y a 32 min", customer: "E-Studio SAS", product: "5x MagSafe Hubs & Accessoires", amount: "2 127 500 Ar", status: "Payé ✓" },
      { time: "Il y a 1h", customer: "Patricia Morel", product: "Laptop Sleeve Grey", amount: "245 000 Ar", status: "Payé ✓" }
    ],
    chartData: [
      { month: "Jan", sales: 60000000 },
      { month: "Feb", sales: 90000000 },
      { month: "Mar", sales: 125000000 },
      { month: "Apr", sales: 145000000 },
      { month: "May", sales: 170000000 },
      { month: "Jun", sales: 244750000 }
    ]
  },
  comptabilite: {
    title: "Compte de résultat & Trésorerie",
    subtitle: "Optimisez vos flux financiers de manière transparente",
    stats: [
      { id: "c1", label: "Trésorerie disponible", value: "562 000 000 Ar", trend: "Banquise connectée" },
      { id: "c2", label: "TVA à reverser estimée", value: "42 050 000 Ar", trend: "Échéance le 25" },
      { id: "c3", label: "Marge brute moyenne", value: "68 %", trend: "Optimal pour le secteur" }
    ],
    items: [
      { label: "Ventes de marchandises", type: "Revenu", value: "+244 750 000 Ar", color: "text-emerald-500" },
      { label: "Factures fournisseurs (Logistique)", type: "Dépense", value: "-71 000 000 Ar", color: "text-rose-500" },
      { label: "Salaires & Charges", type: "Dépense", value: "-42 500 000 Ar", color: "text-rose-500" },
      { label: "Abonnement ATIF AI SaaS", type: "Dépense", value: "-145 000 Ar", color: "text-rose-500" }
    ],
    chartData: [
      { month: "Jan", revenue: 75000000, expenses: 50000000 },
      { month: "Feb", revenue: 110000000, expenses: 55000000 },
      { month: "Mar", revenue: 155000000, expenses: 80000000 },
      { month: "Apr", revenue: 160000000, expenses: 77500000 },
      { month: "May", revenue: 190000000, expenses: 85000000 },
      { month: "Jun", revenue: 244750000, expenses: 113645000 }
    ]
  },
  ia: {
    title: "Console de prédiction d'intelligence artificielle",
    subtitle: "Optimiseur d'indicateurs de performance et prévisions logistiques",
    stats: [
      { id: "i1", label: "Précision prédictive", value: "98.2 %", trend: "Entraînement quotidien" },
      { id: "i2", label: "Recommandations d'achats", value: "4 suggestions", trend: "2 urgentes" },
      { id: "i3", label: "Économie estimée", value: "7 250 000 Ar", trend: "Optimisation de prix" }
    ],
    aiLogs: [
      { type: "PREDICTION_STOCKS", text: "Alerte : La smartwatch active v4 subira une forte hausse de demande (environ +42%) d'ici le 15 Juillet à cause de la saisonnalité sportive. Réassort recommandé de 60 unités immédiat." },
      { type: "PRICING_OPTIMIZATION", text: "Suggestion : Augmenter le prix de l'accessoire Wireless Earbuds de 7% de 14h à 18h le weekend. Impact projeté sur les marges : +1 700 000 Ar sans baisse notable de volume." },
      { type: "ANOMALIE_DETECTEE", text: "Fidélité OK : Détection d'une transaction d'achat inhabituelle à 3h du matin corrigée automatiquement. Risque de fraude écarté." },
      { type: "CASH_FLOW_FORECAST", text: "Analyse : Solde net estimé fin Juillet à 662 500 000 Ar (+17.8%). Capacité d'embauche valide d'ici le prochain trimestre." }
    ],
    chartData: [
      { month: "Jun", historique: 244750000, projection: 244750000 },
      { month: "Jul", historique: null, projection: 280000000 },
      { month: "Aug", historique: null, projection: 305000000 },
      { month: "Sep", historique: null, projection: 342500000 },
      { month: "Oct", historique: null, projection: 370000000 }
    ]
  }
};
