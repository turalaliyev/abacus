import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../ui/Button"
import { AnimatedSection } from "../ui/AnimatedSection"

export function CtaSection() {
  const { t } = useTranslation()

  return (
    <section className="bg-navy-950 py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            {t("sections.ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            {t("sections.ctaSubtitle")}
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/muraciet">
              {t("sections.ctaButton")} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
