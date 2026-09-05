import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { EASE, prefersReducedMotion } from "../../lib/motion"
import { useMediaAssets } from "../../hooks/useSiteData"
import { getMediaUrl } from "../../lib/media"

const HOLD_MS = 2200

/**
 * First-paint intro: the same logo shown in the navbar, alone on a clean
 * field, while the real page mounts and fetches its data behind it — then a
 * single fade reveals the site. Runs once per full page load (this component
 * itself only mounts once, on boot) — client-side route changes never see it
 * again.
 */
export function Splash() {
  const [visible, setVisible] = useState(() => !prefersReducedMotion())
  const { data: media } = useMediaAssets()
  const logoUrl = getMediaUrl(media, "logo")

  useEffect(() => {
    if (!visible) return
    document.documentElement.style.overflow = "hidden"
    const timer = setTimeout(() => setVisible(false), HOLD_MS)
    return () => clearTimeout(timer)
  }, [visible])

  useEffect(() => {
    if (!visible) document.documentElement.style.overflow = ""
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-[100] grid place-items-center bg-white"
          aria-hidden
        >
          {logoUrl && (
            <motion.img
              src={logoUrl}
              alt="Abacus Audit"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="h-20 w-auto"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
