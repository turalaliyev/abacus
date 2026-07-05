import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { SectionTitle } from "../ui/SectionTitle"
import { StaggerContainer, StaggerItem } from "../ui/AnimatedSection"
import { ServiceLottie, hasServiceLottie } from "../ui/ServiceLottie"
import { ServicesGridSkeleton } from "../ui/Skeleton"
import { useLocalizedServices } from "../../hooks/useLocalizedData"
import { stripHtml } from "../../lib/richText"

const slugToPath: Record<string, string> = {
  audit: "audit",
  vergi: "vergi",
  konsaltinq: "konsaltinq",
  qiymetlendirme: "qiymetlendirme",
  huquq: "huquq",
  muhasibat: "muhasibat",
  qeydiyyat: "qeydiyyat",
  "hr-audit": "kadr",
  miqrasiya: "miqrasiya",
}

export function ServicesGrid() {
  const { t } = useTranslation()
  const { data: services, isLoading } = useLocalizedServices()

  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle
          title={t("sections.servicesTitle")}
          subtitle={t("sections.servicesSubtitle")}
        />
        {isLoading || !services ? (
          <ServicesGridSkeleton count={9} />
        ) : (
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const pathSlug = slugToPath[service.slug] ?? service.slug

              return (
                <StaggerItem key={service.id}>
                  <Link
                    to={`/xidmetler/${pathSlug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-xl hover:shadow-navy-900/5"
                  >
                    <div className="relative border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white px-4 pt-4">
                      {hasServiceLottie(pathSlug) ? (
                        <ServiceLottie slug={pathSlug} variant="card" />
                      ) : (
                        <div className="h-32 sm:h-36" aria-hidden />
                      )}
                      <ArrowUpRight className="absolute top-4 right-4 h-5 w-5 text-slate-300 transition-colors group-hover:text-gold-500" />
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="text-lg font-semibold text-navy-900">{service.title}</h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                        {stripHtml(service.description)}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        )}
      </div>
    </section>
  )
}
