import {
  ShieldCheck,
  Receipt,
  Calculator,
  Lightbulb,
  Globe,
  Users,
  Scale,
  Building2,
  FileText,
  type LucideIcon,
} from "lucide-react"

const map: Record<string, LucideIcon> = {
  "shield-check": ShieldCheck,
  receipt: Receipt,
  calculator: Calculator,
  lightbulb: Lightbulb,
  globe: Globe,
  users: Users,
  scale: Scale,
  building: Building2,
  file: FileText,
}

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? FileText
  return <Icon className={className} />
}
