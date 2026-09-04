import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { useTranslation } from "react-i18next"
import { SectionTitle } from "../ui/SectionTitle"
import { EASE, inView } from "../../lib/motion"
import { processSteps } from "../../data/content"

/**
 * Removes the "what actually happens if I call?" friction that stops people
 * contacting professional-services firms.
 *
 * The connector line draws itself as the section scrolls, so the four steps
 * read as one sequence rather than four separate cards.
 */
export function ProcessSection() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="relative bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle
          eyebrow={t("sections.processEyebrow")}
          title={t("sections.processTitle")}
          subtitle={t("sections.processSubtitle")}
        />

        <div ref={ref} className="relative">
          {/* Rail sits behind the cards, aligned with the step numbers. */}
          <div
            className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-slate-200 lg:block"
            aria-hidden
          />
          <motion.div
            style={{ scaleX: lineScale }}
            className="absolute left-0 right-0 top-[3.25rem] hidden h-px origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300 lg:block"
            aria-hidden
          />

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {processSteps.map((step, i) => (
              <motion.li
                key={step.title}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
                className="group relative"
              >
                <div className="relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-[var(--shadow-card-hover)]">
                  <span className="mb-5 grid h-14 w-14 place-items-center rounded-full border border-gold-300/60 bg-white font-serif text-xl font-bold text-gold-600 shadow-sm transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-navy-950">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-navy-900">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
