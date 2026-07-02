import { useParams, Link } from "react-router-dom"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { PageHeader } from "../components/ui/PageHeader"
import { AnimatedSection } from "../components/ui/AnimatedSection"
import { ServiceIcon } from "../components/ui/ServiceIcon"
import { Button } from "../components/ui/Button"
import { Skeleton } from "../components/ui/Skeleton"
import { useNavItems, useServices } from "../hooks/useSiteData"

const slugMap: Record<string, string> = {
  audit: "audit",
  vergi: "vergi",
  konsaltinq: "konsaltinq",
  qiymetlendirme: "audit",
  huquq: "konsaltinq",
  muhasibat: "muhasibat",
  qeydiyyat: "konsaltinq",
  kadr: "hr-audit",
  miqrasiya: "miqrasiya",
}

const serviceTitles: Record<string, string> = {
  audit: "Audit",
  vergi: "Vergi uçotu və vergitutma",
  konsaltinq: "Konsaltinq",
  qiymetlendirme: "Qiymətləndirmə",
  huquq: "Hüquqi xidmətlər",
  muhasibat: "Mühasibat uçotu",
  qeydiyyat: "Kommersiya hüquqi şəxslərin qeydiyyatı",
  kadr: "Kadr kargüzarlığı",
  miqrasiya: "Miqrasiya xidmətləri",
}

const benefits = [
  "Peşəkar və sertifikatlı mütəxəssislər",
  "Qanunvericiliyə tam uyğunluq",
  "Operativ və şəffaf iş prosesi",
  "Fərdi yanaşma və davamlı dəstək",
]

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { data: services, isLoading } = useServices()
  const { data: navItems } = useNavItems()

  const dataSlug = slug ? slugMap[slug] ?? "audit" : "audit"
  const service = services?.find((s) => s.slug === dataSlug) ?? services?.[0]
  const title = slug ? serviceTitles[slug] ?? service?.title ?? "" : service?.title ?? ""

  const serviceNav = navItems?.find((i) => i.label === "Xidmətlər")
  const otherServices = serviceNav?.children?.filter((c) => !c.href.endsWith(slug ?? "")) ?? []

  return (
    <>
      <PageHeader title={title} breadcrumb={title} />
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            {isLoading || !service ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-16 rounded-2xl" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
              </div>
            ) : (
              <AnimatedSection>
                <div className="mb-8 grid h-16 w-16 place-items-center rounded-2xl bg-navy-900 text-gold-400">
                  <ServiceIcon name={service.icon} className="h-8 w-8" />
                </div>
                {service.image_url && (
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="mb-8 w-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                )}
                <p className="text-lg leading-relaxed text-slate-600">{service.description}</p>

                <h3 className="mt-12 text-2xl font-bold text-navy-900">Niyə bu xidməti seçməlisiniz?</h3>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                      <span className="text-slate-600">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Button to="/elaqe">
                    Bu xidmət üçün müraciət et <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </AnimatedSection>
            )}
          </div>

          <aside className="lg:col-span-1">
            <AnimatedSection delay={0.1}>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-navy-900">
                  Digər xidmətlər
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
            </AnimatedSection>
          </aside>
        </div>
      </section>
    </>
  )
}
