import type { Variants } from 'motion/react'

/**
 * Shared motion language. One easing curve and one set of durations across the
 * site keeps the animation feeling like a single considered system rather than
 * a pile of individual effects.
 */

/** Custom cubic-bezier — fast out, long settle. Used everywhere. */
export const EASE = [0.16, 1, 0.3, 1] as const
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
} as const

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE },
  },
}

export const staggerParent = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})

/** Clip-path wipe used for section imagery. */
export const revealClip: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE },
  },
}

/** Standard in-view trigger so every section reveals at the same scroll point. */
export const inView = { once: true, margin: '-15% 0px -10% 0px' } as const
