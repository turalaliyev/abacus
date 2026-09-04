import { useParams, Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { PageHeader } from "../components/ui/PageHeader"
import { AnimatedSection } from "../components/ui/AnimatedSection"
import { Button } from "../components/ui/Button"
import { Skeleton } from "../components/ui/Skeleton"
import { ServiceLottie, hasServiceLottie } from "../components/ui/ServiceLottie"
import { RichText } from "../components/ui/RichText"
import { useLocalizedNavItems, useLocalizedServices } from "../hooks/useLocalizedData"
import { findService, serviceImageUrl } from "../lib/serviceSlug"
import { NotFound } from "./NotFound"

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

  // findService tolerates the kadr/hr-audit slug split between the CMS and the
  // public URL. An unknown slug is a real 404, not a reason to quietly render a
  // different service.
  const service = findService(services, slug)
  const title = service?.title ?? ""
  const heroImage = service ? service.image_url || serviceImageUrl(service.slug) : undefined

  const serviceNav = findServicesNav(navItems ?? [])
  const otherServices = serviceNav?.children?.filter((c) => !c.href.endsWith(`/${slug}`)) ?? []
  const showLottie = hasServiceLottie(slug)

  if (!isLoading && services && !service) return <NotFound />

  return (
    <>
      <PageHeader title={title} breadcrumb={title} image={heroImage} />
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
