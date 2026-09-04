import { Award, CalendarClock, Clock, MessageSquareText } from "lucide-react"
import { useTranslation } from "react-i18next"
import { StaggerContainer, StaggerItem } from "../ui/AnimatedSection"
import { siteConfig } from "../../data/content"

/**
 * Credibility strip directly under the hero. An audit firm's strongest
 * conversion lever is proof it is licensed and established, so that goes
 * above the fold rather than buried on the about page.
 */
export function TrustBar() {
  const { t } = useTranslation()

  const items = [
    {
      icon: Award,
      title: t("trust.licenseTitle"),
      value: t("trust.licenseValue", { number: siteConfig.license.number }),
    },
    {
      icon: CalendarClock,
      title: t("trust.sinceTitle"),
      value: t("trust.sinceValue", { year: siteConfig.foundedYear }),
    },
    {
      icon: Clock,
      title: t("trust.hoursTitle"),
      value: `${siteConfig.hours.days}, ${siteConfig.hours.time}`,
    },
    {
      icon: MessageSquareText,
      title: t("trust.replyTitle"),
      value: t("trust.replyValue"),
    },
  ]

  return (
    <section className="border-b border-slate-200 bg-white">
      <StaggerContainer className="mx-auto grid max-w-7xl gap-px overflow-hidden px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {items.map(({ icon: Icon, title, value }) => (
          <StaggerItem key={title}>
            <div className="flex items-start gap-4 px-2 py-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-900/5 text-gold-600">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {title}
                </div>
                <div className="mt-1 text-sm font-semibold leading-snug text-navy-900">
                  {value}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
