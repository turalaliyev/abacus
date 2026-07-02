import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { ChevronRight } from "lucide-react"

type PageHeaderProps = {
  title: string
  subtitle?: string
  breadcrumb?: string
}

export function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.12),transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-slate-400">
            <Link to="/" className="transition-colors hover:text-gold-400">
              Əsas
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gold-400">{breadcrumb ?? title}</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-lg text-slate-300">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  )
}
