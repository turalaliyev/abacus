import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { SectionTitle } from "../ui/SectionTitle"
import { StaggerContainer, StaggerItem } from "../ui/AnimatedSection"
import { ServiceIcon } from "../ui/ServiceIcon"
import { ServicesGridSkeleton } from "../ui/Skeleton"
import { useServices } from "../../hooks/useSiteData"

const slugToPath: Record<string, string> = {
  audit: "audit",
  vergi: "vergi",
  konsaltinq: "konsaltinq",
  muhasibat: "muhasibat",
  miqrasiya: "miqrasiya",
  "hr-audit": "kadr",
}

export function ServicesGrid() {
  const { data: services, isLoading } = useServices()

  return (
    <section className="bg-slate-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle
          title="Göstərdiyimiz xidmətlər"
          subtitle="Müəssisənizin bütün maliyyə və hüquqi ehtiyacları üçün tam həllər"
        />
        {isLoading || !services ? (
          <ServicesGridSkeleton />
        ) : (
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <Link
                  to={`/xidmetler/${slugToPath[service.slug] ?? service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:shadow-xl hover:shadow-navy-900/5"
                >
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-xl bg-navy-900 text-gold-400 transition-colors group-hover:bg-gold-500 group-hover:text-navy-950">
                    <ServiceIcon name={service.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 flex items-center justify-between text-lg font-semibold text-navy-900">
                    {service.title}
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-gold-500" />
                  </h3>
                  <p className="line-clamp-4 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  )
}
