import { Outlet, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { StickyContactBar } from "../ui/StickyContactBar"
import { EASE } from "../../lib/motion"

export function Layout() {
  const location = useLocation()

  // Scroll reset lives in <SmoothScroll> — calling window.scrollTo here as well
  // would fight the Lenis instance for control of the scroll position.

  return (
    /* pb-14 on mobile keeps the sticky contact bar from covering the footer. */
    <div className="flex min-h-screen flex-col pb-14 lg:pb-0">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <StickyContactBar />
    </div>
  )
}
