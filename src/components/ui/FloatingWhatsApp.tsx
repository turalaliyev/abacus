import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { EASE } from "../../lib/motion"

const WHATSAPP_URL = "https://wa.me/994552134737"

/**
 * Fixed WhatsApp bubble, bottom-right, on every page. Hidden below lg — on
 * mobile, WhatsApp already lives in <StickyContactBar>, and this bubble would
 * sit on top of that bar's own actions.
 *
 * Positioned with `right` only (no `left`), so the label's width animation
 * grows/shrinks the box from that pinned right edge — the icon stays put and
 * the label reveals to its left. The label animates its own width (not just
 * opacity) so the box resizes in lockstep with the fade in both directions;
 * animating only opacity/position left the container's real width unchanged
 * until React unmounted the label, which read as an instant snap on hover-out.
 * A plain CSS-transform `scale` (no `layout` prop) drives the box itself, so
 * nothing here uses Framer's layout/FLIP scale-correction — that trick
 * visually squishes non-layout children like the icon while it resizes.
 *
 * The gap to the icon is the label's own animated marginRight, not a static
 * flex `gap` — a static gap stays reserved for as long as the label element
 * exists, so on hover-out the box would stop a few pixels short of a true
 * circle until React actually unmounts it a beat later. Animating the margin
 * down to 0 alongside width closes that gap in the same motion.
 */
export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false)

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.3 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40 hidden h-14 items-center rounded-full bg-[#25D366] pl-4 pr-4 shadow-lg shadow-[#25D366]/30 lg:flex"
    >
      <AnimatePresence initial={false}>
        {open && (
          <motion.span
            key="label"
            initial={{ width: 0, marginRight: 0, opacity: 0 }}
            animate={{ width: "auto", marginRight: 12, opacity: 1 }}
            exit={{ width: 0, marginRight: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden whitespace-nowrap text-sm font-semibold text-white"
          >
            WhatsApp
          </motion.span>
        )}
      </AnimatePresence>
      <MessageCircle className="h-6 w-6 shrink-0 text-white" />
    </motion.a>
  )
}
