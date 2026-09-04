import { useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { prefersReducedMotion } from "../../lib/motion"

/**
 * Pulls its child gently toward the cursor. Used on primary CTAs so the most
 * important target on the page feels magnetic to reach.
 */
export function Magnetic({
  children,
  strength = 0.32,
  className = "",
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = prefersReducedMotion()

  const spring = { stiffness: 260, damping: 18, mass: 0.5 }
  const x = useSpring(useMotionValue(0), spring)
  const y = useSpring(useMotionValue(0), spring)

  function handleMove(e: React.PointerEvent<HTMLSpanElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  if (reduced) return <span className={className}>{children}</span>

  return (
    <motion.span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.span>
  )
}
