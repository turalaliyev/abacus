import { useParams, Link } from "react-router-dom"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { PageHeader } from "../components/ui/PageHeader"
import { AnimatedSection } from "../components/ui/AnimatedSection"
import { Button } from "../components/ui/Button"
import { Skeleton } from "../components/ui/Skeleton"
import { ServiceLottie, hasServiceLottie } from "../components/ui/ServiceLottie"
import { RichText } from "../components/ui/RichText"
import { useLocalizedNavItems, useLocalizedServices } from "../hooks/useLocalizedData"

const slugMap: Record<string, string> = {
  audit: "audit",
  vergi: "vergi",
  konsaltinq: "konsaltinq",
  qiymetlendirme: "qiymetlendirme",
  huquq: "huquq",
  muhasibat: "muhasibat",
  qeydiyyat: "qeydiyyat",
  kadr: "hr-audit",
  miqrasiya: "miqrasiya",
}

const BENEFIT_KEYS = [
  "benefits.professional",
  "benefits.compliance",
  "benefits.transparent",
  "benefits.personal",
] as const

function findServicesNav(navItems: { href: string; children?: { href: string; label: string }[] }[]) {
  return navItems.find(
    (i) => i.href === "/xidmetler" || i.children?.some((c) => c.href.startsWith("/xidmetler/")),
  )
}

export function ServiceDetail() {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const { data: services, isLoading } = useLocalizedServices()
  const { data: navItems } = useLocalizedNavItems()

  const dataSlug = slug ? slugMap[slug] ?? "audit" : "audit"
  const service = services?.find((s) => s.slug === dataSlug) ?? services?.[0]
  const title = service?.title ?? ""

  const serviceNav = findServicesNav(navItems ?? [])
  const otherServices = serviceNav?.children?.filter((c) => !c.href.endsWith(slug ?? "")) ?? []
  const showLottie = hasServiceLottie(slug)

  return (
    <>
      <PageHeader title={title} breadcrumb={title} />
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {isLoading || !service ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-16 rounded-2xl" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          ) : (
            <div className="grid items-start gap-10 lg:grid-cols-3 lg:gap-12">
              <AnimatedSection className="lg:col-span-2">
                <RichText content={service.description} />

                {service.image_url && (
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="mt-8 w-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                )}

                <h3 className="mt-12 text-2xl font-bold text-navy-900">
                  {t("pages.serviceDetail.whyChoose")}
                </h3>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {BENEFIT_KEYS.map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                      <span className="text-slate-600">{t(key)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Button to="/elaqe">
                    {t("pages.serviceDetail.apply")} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1} className="lg:col-span-1">
                <div className="space-y-6 lg:sticky lg:top-28">
                  {showLottie && <ServiceLottie slug={slug} />}

                  {otherServices.length > 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                      <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy-900">
                        {t("pages.serviceDetail.otherServices")}
                      </h4>
                      <ul className="space-y-1">
                        {otherServices.map((s) => (
                          <li key={s.href}>
                            <Link
                              to={s.href}
                              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-600 transition-colors hover:bg-white hover:text-gold-600"
                            >
                              {s.label}
                              <ArrowRight className="h-4 w-4 shrink-0" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
