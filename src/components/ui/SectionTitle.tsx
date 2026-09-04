import { motion } from "motion/react"
import { RevealText } from "./RevealText"
import { EASE, inView } from "../../lib/motion"

type SectionTitleProps = {
  title: string
  subtitle?: string
  centered?: boolean
  /** Small overline label above the heading. */
  eyebrow?: string
  light?: boolean
}

export function SectionTitle({
  title,
  subtitle,
  centered = true,
  eyebrow,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-14 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-gold-600"
        >
          {eyebrow}
        </motion.span>
      )}

      <RevealText
        as="h2"
        text={title}
        className={`text-3xl font-bold tracking-tight md:text-4xl ${
          light ? "text-white" : "text-navy-900"
        }`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          className={`mt-4 max-w-2xl text-lg ${centered ? "mx-auto" : ""} ${
            light ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={inView}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        className={`mt-5 h-1 w-16 origin-left rounded-full bg-gradient-to-r from-gold-600 to-gold-300 ${
          centered ? "mx-auto" : ""
        }`}
      />
    </div>
  )
}
