import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { PageHeader } from "../components/ui/PageHeader"
import { AnimatedSection } from "../components/ui/AnimatedSection"
import { ContactInfoSkeleton } from "../components/ui/Skeleton"
import { useLocalizedSiteSettings } from "../hooks/useLocalizedData"

export function Contact() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const { data: settings, isLoading } = useLocalizedSiteSettings()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageHeader title={t("pages.contact.title")} subtitle={t("pages.contact.subtitle")} />
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl font-bold text-navy-900">{t("pages.contact.writeUs")}</h2>
            <p className="mt-2 text-slate-600">{t("pages.contact.formHint")}</p>

            {submitted ? (
              <div className="mt-8 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-6 text-green-700">
                <CheckCircle2 className="h-6 w-6 shrink-0" />
                <p className="text-sm font-medium">{t("pages.contact.success")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    required
                    placeholder={t("pages.contact.name")}
                    className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                  <input
                    required
                    type="tel"
                    placeholder={t("pages.contact.phone")}
                    className="rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  />
                </div>
                <input
                  required
                  type="email"
                  placeholder={t("pages.contact.email")}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                />
                <textarea
                  required
                  rows={5}
                  placeholder={t("pages.contact.message")}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 shadow-lg shadow-gold-500/25 transition-all duration-300 hover:bg-gold-400"
                >
                  {t("common.send")} <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            {isLoading || !settings ? (
              <ContactInfoSkeleton />
            ) : (
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: t("pages.contact.address"), value: settings.address },
                  { icon: Phone, label: t("pages.contact.phone"), value: settings.phone, href: `tel:${settings.phone}` },
                  { icon: Mail, label: t("pages.contact.email"), value: settings.email, href: `mailto:${settings.email}` },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-400">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-500">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-lg font-semibold text-navy-900 hover:text-gold-600">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-lg font-semibold text-navy-900">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <iframe
                    title="Abacus Audit"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=49.82%2C40.37%2C49.88%2C40.41&layer=mapnik"
                    className="h-64 w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
