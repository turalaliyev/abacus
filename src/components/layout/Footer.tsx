import { Link } from "react-router-dom"
import { Facebook, Instagram, Linkedin, MessageCircle, Mail, Phone, MapPin } from "lucide-react"
import { useMediaAssets, useNavItems, useSiteSettings } from "../../hooks/useSiteData"
import { getMediaUrl } from "../../lib/media"
import { Skeleton } from "../ui/Skeleton"

export function Footer() {
  const { data: settings, isLoading } = useSiteSettings()
  const { data: navItems } = useNavItems()
  const { data: media } = useMediaAssets()

  const logoUrl = getMediaUrl(media, "logo")
  const serviceItems = navItems?.find((i) => i.label === "Xidmətlər")
  const services = serviceItems?.children?.slice(0, 6) ?? []

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
            {settings.tagline}. Maliyyə, audit, hüquq, vergi və konsaltinq sahələrində peşəkar
            həllər.
          </p>
          <div className="mt-5 flex gap-3">
            <a href={settings.facebook_url} aria-label="Facebook" className="rounded-full bg-white/5 p-2 transition-colors hover:bg-gold-500 hover:text-navy-950">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={settings.instagram_url} aria-label="Instagram" className="rounded-full bg-white/5 p-2 transition-colors hover:bg-gold-500 hover:text-navy-950">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={settings.linkedin_url} aria-label="LinkedIn" className="rounded-full bg-white/5 p-2 transition-colors hover:bg-gold-500 hover:text-navy-950">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href={settings.whatsapp_url} aria-label="WhatsApp" className="rounded-full bg-white/5 p-2 transition-colors hover:bg-gold-500 hover:text-navy-950">
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Xidmətlər
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
            Şirkət
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/haqqimizda" className="text-slate-400 transition-colors hover:text-gold-400">Haqqımızda</Link></li>
            <li><Link to="/niye-biz" className="text-slate-400 transition-colors hover:text-gold-400">Niyə biz</Link></li>
            <li><Link to="/partnyorlar" className="text-slate-400 transition-colors hover:text-gold-400">Partnyorlarımız</Link></li>
            <li><Link to="/bloq/xeberler" className="text-slate-400 transition-colors hover:text-gold-400">Xəbərlər</Link></li>
            <li><Link to="/kalkulyator" className="text-slate-400 transition-colors hover:text-gold-400">Kalkulyator</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Əlaqə
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
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Abacus Audit. Bütün hüquqlar qorunur.
      </div>
    </footer>
  )
}
