import { Link } from "react-router-dom"
import { Clock, Facebook, Instagram, Linkedin, MessageCircle, Mail, Phone, MapPin } from "lucide-react"
import { useTranslation } from "react-i18next"
import { siteConfig } from "../../data/content"
import { useMediaAssets } from "../../hooks/useSiteData"
import { useLocalizedNavItems, useLocalizedSiteSettings } from "../../hooks/useLocalizedData"
import { getMediaUrl } from "../../lib/media"
import { Skeleton } from "../ui/Skeleton"

function findServicesNav(navItems: { href: string; children?: { href: string; label: string }[] }[]) {
  return navItems.find(
    (i) => i.href === "/xidmetler" || i.children?.some((c) => c.href.startsWith("/xidmetler/")),
  )
}

export function Footer() {
  const { t } = useTranslation()
  const { data: settings, isLoading } = useLocalizedSiteSettings()
  const { data: navItems } = useLocalizedNavItems()
  const { data: media } = useMediaAssets()

  const logoUrl = getMediaUrl(media, "logo")
  const services = findServicesNav(navItems ?? [])?.children?.slice(0, 6) ?? []

  const companyLinks = [
    { href: "/haqqimizda", label: t("footer.links.about") },
    { href: "/niye-biz", label: t("footer.links.whyUs") },
    { href: "/partnyorlar", label: t("footer.links.partners") },
    { href: "/bloq/xeberler", label: t("footer.links.news") },
    { href: "/kalkulyator", label: t("footer.links.calculator") },
  ]

  if (isLoading || !settings) {
    return (
      <footer className="bg-navy-950 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <Skeleton className="h-10 w-40 bg-white/10" />
          <Skeleton className="mt-6 h-4 w-full max-w-sm bg-white/10" />
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-navy-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            {logoUrl ? (
              <img src={logoUrl} alt="Abacus Audit" className="h-10 w-auto" />
            ) : (
              <>
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold-500 font-bold text-navy-950">
                  A
                </span>
                <span className="text-lg font-bold text-white">
                  Abacus<span className="text-gold-400">Audit</span>
                </span>
              </>
            )}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {settings.tagline}. {t("footer.taglineExtra")}
          </p>
          <p className="mt-4 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs leading-relaxed text-slate-400">
            {t("trust.licenseFooter", {
              authority: siteConfig.license.authority,
              number: siteConfig.license.number,
              year: siteConfig.foundedYear,
            })}
          </p>
          <div className="mt-5 flex gap-3">
            <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rounded-full bg-white/5 p-2 transition-colors hover:bg-gold-500 hover:text-navy-950">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rounded-full bg-white/5 p-2 transition-colors hover:bg-gold-500 hover:text-navy-950">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-full bg-white/5 p-2 transition-colors hover:bg-gold-500 hover:text-navy-950">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={settings.whatsapp_url} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="rounded-full bg-white/5 p-2 transition-colors hover:bg-gold-500 hover:text-navy-950">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            {t("footer.services")}
          </h3>
          <ul className="space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.href}>
                <Link to={s.href} className="text-slate-400 transition-colors hover:text-gold-400">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            {t("footer.company")}
          </h3>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-slate-400 transition-colors hover:text-gold-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            {t("footer.contact")}
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span className="text-slate-400">{settings.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`tel:${settings.phone}`} className="text-slate-400 transition-colors hover:text-gold-400">{settings.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <a href={`mailto:${settings.email}`} className="text-slate-400 transition-colors hover:text-gold-400">{settings.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span className="text-slate-400">
                {siteConfig.hours.days}
                <br />
                {siteConfig.hours.time}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Abacus Audit. {t("footer.rights")}
      </div>
    </footer>
  )
}
