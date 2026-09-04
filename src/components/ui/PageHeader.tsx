import { useRef } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion, useScroll, useTransform } from "motion/react"
import { ChevronRight } from "lucide-react"
import { RevealText } from "./RevealText"
import { EASE } from "../../lib/motion"

type PageHeaderProps = {
  title: string
  subtitle?: string
  breadcrumb?: string
  /** Optional background photo, e.g. the service image on a detail page. */
  image?: string
}

export function PageHeader({ title, subtitle, breadcrumb, image }: PageHeaderProps) {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 55])
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.2])

  return (
    <section
      ref={ref}
      className="grain relative isolate overflow-hidden bg-navy-950 py-20 lg:py-28"
    >
      {image ? (
        <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10 scale-110">
          <img src={image} alt="" aria-hidden className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-navy-950/80" />
        </motion.div>
      ) : (
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.14),transparent_45%),radial-gradient(circle_at_10%_90%,rgba(26,74,115,0.5),transparent_45%)]"
        />
      )}

      {/* Faint ledger grid — ties the inner pages to the hero's data motif. */}
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px]"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-navy-950 to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative mx-auto max-w-7xl px-4 lg:px-8"
      >
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-5 flex items-center gap-1.5 text-sm text-slate-400"
        >
          <Link to="/" className="transition-colors hover:text-gold-400">
            {t("common.home")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          <span className="text-gold-400">{breadcrumb ?? title}</span>
        </motion.nav>

        <RevealText
          as="h1"
          text={title}
          className="text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
        />

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
            className="mt-5 max-w-2xl text-lg text-slate-300"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          className="mt-7 h-1 w-20 origin-left rounded-full bg-gradient-to-r from-gold-600 to-gold-300"
        />
      </motion.div>
    </section>
  )
}
