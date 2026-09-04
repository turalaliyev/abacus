import { useEffect, useRef, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import { StatsSkeleton } from "../ui/Skeleton"
import { useLocalizedStats } from "../../hooks/useLocalizedData"
import { EASE, prefersReducedMotion } from "../../lib/motion"

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10%" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (prefersReducedMotion()) {
      setDisplay(value)
      return
    }

    const duration = 1800
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // expo-out: fast start, long tail — reads as "settling on a figure"
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function StatsBar() {
  const { data: stats, isLoading } = useLocalizedStats()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  // Slow counter-drift on the glow gives the band depth as it passes.
  const glowY = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"])

  if (isLoading || !stats) return <StatsSkeleton />

  return (
    <section
      ref={sectionRef}
      className="grain relative overflow-hidden bg-navy-900"
    >
      <motion.div
        style={{ y: glowY }}
        className="absolute inset-x-0 -inset-y-1/4 bg-[radial-gradient(ellipse_at_50%_50%,rgba(212,175,55,0.14),transparent_60%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-4 py-16 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
            className={`px-4 text-center ${
              i > 0 ? "lg:border-l lg:border-white/10" : ""
            } ${i % 2 === 1 ? "border-l border-white/10 lg:border-l" : ""}`}
          >
            <div className="text-foil font-serif text-5xl font-bold tabular-nums md:text-6xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
