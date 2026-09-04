import { Plus } from "lucide-react"
import { useTranslation } from "react-i18next"
import { SectionTitle } from "../ui/SectionTitle"
import { AnimatedSection } from "../ui/AnimatedSection"
import { Button } from "../ui/Button"
import { useLocalizedFaqItems } from "../../hooks/useLocalizedData"

/**
 * Built on native <details>/<summary>: keyboard accessible for free, and the
 * answers stay in the DOM whether open or closed, which is what the FAQPage
 * structured data on this page claims.
 */
export function FaqSection() {
  const { t } = useTranslation()
  const { data: faqItems } = useLocalizedFaqItems()

  if (!faqItems?.length) return null

  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <SectionTitle
          eyebrow={t("sections.faqEyebrow")}
          title={t("sections.faqTitle")}
          subtitle={t("sections.faqSubtitle")}
        />

        <AnimatedSection className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.id}
              name="faq"
              className="group rounded-2xl border border-slate-200 bg-white px-6 transition-colors duration-300 open:border-gold-300 hover:border-gold-300"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                {item.question}
                <Plus
                  className="h-5 w-5 shrink-0 text-gold-500 transition-transform duration-300 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="pb-5 leading-relaxed text-slate-600">{item.answer}</p>
            </details>
          ))}
        </AnimatedSection>

        <AnimatedSection className="mt-10 text-center">
          <p className="text-slate-600">{t("sections.faqMoreQuestions")}</p>
          <div className="mt-5 flex justify-center">
            <Button to="/elaqe">{t("common.contactUs")}</Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
