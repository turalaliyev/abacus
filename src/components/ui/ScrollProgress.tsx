import { motion, useScroll, useSpring } from "motion/react"

/** Reading-progress hairline under the navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gradient-to-r from-accent-600 via-accent-400 to-accent-300"
      aria-hidden
    />
  )
}
