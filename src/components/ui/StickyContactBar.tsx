import { MessageCircle, Phone } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useLocalizedSiteSettings } from "../../hooks/useLocalizedData"
import { siteConfig } from "../../data/content"

/**
 * Mobile-only call/WhatsApp bar. Most traffic to a local professional-services
 * site is mobile, and the intent is almost always "talk to someone" — so the
 * two contact actions stay permanently reachable instead of living only in the
 * footer.
 */
export function StickyContactBar() {
  const { t } = useTranslation()
  const { data: settings } = useLocalizedSiteSettings()

  const phone = settings?.phone ?? siteConfig.phone
  const whatsapp = settings?.whatsapp_url ?? siteConfig.social.whatsapp

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-900/10 bg-white/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-2 divide-x divide-slate-200">
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-navy-900"
        >
          <Phone className="h-4 w-4 text-gold-600" />
          {t("common.callNow")}
        </a>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-navy-900"
        >
          <MessageCircle className="h-4 w-4 text-gold-600" />
          WhatsApp
        </a>
      </div>
    </div>
  )
}
