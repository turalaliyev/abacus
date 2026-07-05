import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown, Menu, X } from "lucide-react"
import { useLocalizedNavItems, useLocalizedSiteSettings } from "../../hooks/useLocalizedData"
import { useMediaAssets } from "../../hooks/useSiteData"
import { getMediaUrl } from "../../lib/media"
import { Button } from "../ui/Button"
import { NavbarSkeleton } from "../ui/Skeleton"
import { LanguageSwitcher } from "../ui/LanguageSwitcher"
import { useTranslation } from "react-i18next"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const location = useLocation()

  const { t } = useTranslation()
  const { data: settings, isLoading: settingsLoading } = useLocalizedSiteSettings()
  const { data: navItems, isLoading: navLoading } = useLocalizedNavItems()
  const { data: media } = useMediaAssets()

  const logoUrl = getMediaUrl(media, "logo")

  if (settingsLoading || navLoading || !settings || !navItems) {
    return <NavbarSkeleton />
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-4 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          {logoUrl ? (
            <img src={logoUrl} alt="Abacus Audit" className="h-9 w-auto lg:h-10" />
          ) : (
            <>
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-navy-900 font-bold text-gold-400">
                A
              </span>
              <span className="text-lg font-bold tracking-tight text-navy-900">
                Abacus<span className="text-gold-500">Audit</span>
              </span>
            </>
          )}
        </Link>

        <ul className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
          {navItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0
            const active = location.pathname === item.href
            return (
              <li
                key={item.label}
                className="relative shrink-0"
                onMouseEnter={() => hasChildren && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-0.5 whitespace-nowrap rounded-md px-2 py-2 text-xs font-medium transition-colors xl:gap-1 xl:px-2.5 xl:text-sm ${
                    active ? "text-gold-600" : "text-navy-900 hover:text-gold-600"
                  }`}
                >
                  {item.label}
                  {hasChildren && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>
                <AnimatePresence>
                  {hasChildren && openDropdown === item.label && (
                    <motion.ul
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full w-64 rounded-xl border border-slate-100 bg-white p-2 shadow-xl"
                    >
                      {item.children!.map((child) => (
                        <li key={child.href}>
                          <Link
                            to={child.href}
                            className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-50 hover:text-gold-600"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>

        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          <LanguageSwitcher />
          <Button to="/elaqe" className="whitespace-nowrap px-4 py-2.5 text-xs xl:px-5 xl:text-sm">
            {t("common.getOffer")}
          </Button>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-md p-2 text-navy-900 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menyu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {navItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0
                return (
                  <li key={item.label}>
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.href}
                        className="block flex-1 py-2 text-sm font-medium text-navy-900"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdown((v) => (v === item.label ? null : item.label))
                          }
                          className="p-2"
                          aria-label="Alt menyu"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              openDropdown === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>
                    {hasChildren && openDropdown === item.label && (
                      <ul className="ml-4 space-y-1 border-l border-slate-200 pl-3">
                        {item.children!.map((child) => (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              className="block py-1.5 text-sm text-slate-600"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
              <li className="pt-2 flex flex-col gap-3">
                <LanguageSwitcher className="w-full justify-center" />
                <Button to="/elaqe" className="w-full">
                  {t("common.getOffer")}
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-navy-900 px-4 py-1.5 text-center text-xs text-slate-300">
        {settings.phone} · {settings.email}
      </div>
    </header>
  )
}
