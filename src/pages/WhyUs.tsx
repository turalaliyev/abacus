import { ArrowRight, CheckCircle2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { PageHeader } from "../components/ui/PageHeader"
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/ui/AnimatedSection"
import { WhyUsGridSkeleton } from "../components/ui/Skeleton"
import { WhyUsLottie } from "../components/ui/WhyUsLottie"
import { Button } from "../components/ui/Button"
import { useLocalizedWhyUsItems } from "../hooks/useLocalizedData"
import { CtaSection } from "../components/sections/CtaSection"

export function WhyUs() {
  const { t } = useTranslation()
  const { data: items, isLoading } = useLocalizedWhyUsItems()

  return (
    <>
      <PageHeader
        title={t("pages.whyUs.title")}
        subtitle={t("pages.whyUs.subtitle")}
      />
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              {isLoading || !items ? (
                <WhyUsGridSkeleton />
              ) : (
                <StaggerContainer className="grid gap-6 sm:grid-cols-2">
                  {items.map((item) => (
                    <StaggerItem key={item.id}>
                      <div className="flex h-full gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:border-gold-300 hover:bg-white hover:shadow-lg">
                        <CheckCircle2 className="h-7 w-7 shrink-0 text-gold-500" />
                        <div>
                          <h3 className="text-lg font-semibold text-navy-900">{item.title}</h3>
                          <p className="mt-2 leading-relaxed text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}

              <AnimatedSection className="mt-10">
                <Button to="/elaqe">
                  {t("common.contactUs")} <ArrowRight className="h-4 w-4" />
                </Button>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={0.1} className="lg:col-span-1">
              <div className="lg:sticky lg:top-28">
                <WhyUsLottie />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  )
}
