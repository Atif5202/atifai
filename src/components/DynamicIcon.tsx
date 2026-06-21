import { 
  Boxes, 
  TrendingUp, 
  Receipt, 
  BarChart3, 
  Users, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Cpu,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Check,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Send,
  Loader2,
  Lock,
  Eye,
  Info
} from "lucide-react";

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  const map: Record<string, any> = {
    Boxes,
    TrendingUp,
    Receipt,
    BarChart3,
    Users,
    Sparkles,
    Zap,
    ShieldCheck,
    Smartphone,
    Cpu,
    Menu,
    X,
    ChevronDown,
    ChevronUp,
    Check,
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Send,
    Loader2,
    Lock,
    Eye,
    Info
  };

  const IconComponent = map[name] || Sparkles;
  return <IconComponent className={className} />;
}
