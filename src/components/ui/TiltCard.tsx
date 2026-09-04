import { useRef, type ReactNode } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react"
import { prefersReducedMotion } from "../../lib/motion"

type TiltCardProps = {
  children: ReactNode
  className?: string
  /** Max rotation in degrees. Keep low — this is a corporate site. */
  intensity?: number
  /** Adds a light sheen that tracks the pointer. */
  glare?: boolean
}

/**
 * Pointer-tracked 3D tilt. Deliberately restrained (6° by default): enough to
 * feel responsive and physical, not enough to look like a gaming site.
 */
export function TiltCard({
  children,
  className = "",
  intensity = 6,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = prefersReducedMotion()

  // Normalised pointer position within the card, -0.5 .. 0.5
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  const spring = { stiffness: 220, damping: 24, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [intensity, -intensity]), spring)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-intensity, intensity]), spring)
  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"])
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"])
  // useMotionTemplate keeps the gradient reactive; reading .get() would bake in
  // whatever the value happened to be on the render that produced the string.
  const glareBg = useMotionTemplate`radial-gradient(420px circle at ${glareX} ${glareY}, rgba(212,175,55,0.18), transparent 55%)`

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleLeave() {
    px.set(0)
    py.set(0)
  }

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}
