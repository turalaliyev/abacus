import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { SectionTitle } from "../ui/SectionTitle"
import { AnimatedSection, StaggerContainer, StaggerItem } from "../ui/AnimatedSection"
import { Button } from "../ui/Button"
import { WhyUsGridSkeleton } from "../ui/Skeleton"
import { useLocalizedWhyUsItems } from "../../hooks/useLocalizedData"

/**
 * The five reasons from the live site, surfaced on the homepage instead of
 * only on /niye-biz where most visitors never reach them.
 */
export function WhyUsSection() {
  const { t } = useTranslation()
  const { data: items, isLoading } = useLocalizedWhyUsItems()

  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle
          eyebrow={t("sections.whyUsEyebrow")}
          title={t("sections.whyUsTitle")}
          subtitle={t("sections.whyUsSubtitle")}
        />

        {isLoading || !items ? (
          <WhyUsGridSkeleton />
        ) : (
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <StaggerItem key={item.id}>
                <div className="flex h-full gap-4 rounded-2xl border border-slate-200 bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-[var(--shadow-card-hover)]">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-gold-500" aria-hidden />
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        <AnimatedSection className="mt-10 flex justify-center">
          <Button to="/niye-biz" variant="ghost" className="border border-navy-900/15">
            {t("common.learnMore")} <ArrowRight className="h-4 w-4" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}
