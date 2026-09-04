import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Lenis from "lenis"
import { prefersReducedMotion } from "../../lib/motion"

let lenisInstance: Lenis | null = null

/** Lets other components (e.g. anchor links) drive the smooth scroller. */
export function scrollToTop(immediate = true) {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate })
  else window.scrollTo({ top: 0, behavior: immediate ? "instant" : "smooth" })
}

/**
 * Momentum scrolling for the whole document.
 *
 * Disabled outright under prefers-reduced-motion — hijacking the scroll wheel
 * is exactly the kind of thing that setting is asking us not to do.
 */
export function SmoothScroll() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })
    lenisInstance = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])

  // Route changes must reset the scroller, not just the window.
  useEffect(() => {
    scrollToTop(true)
  }, [pathname])

  return null
}
