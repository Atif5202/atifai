export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface MetricItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description?: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl: string;
  rating?: number;
}

export interface PricePlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  popular: boolean;
  isFree: boolean;
  colorTheme?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  company: string;
  message: string;
}

export type DashboardTab = "stock" | "venta" | "comptabilite" | "ia";
