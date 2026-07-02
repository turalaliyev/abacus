import { SectionTitle } from "../ui/SectionTitle"
import { StaggerContainer, StaggerItem } from "../ui/AnimatedSection"
import { PartnersGridSkeleton } from "../ui/Skeleton"
import { usePartners } from "../../hooks/useSiteData"

export function PartnersSection() {
  const { data: partners, isLoading } = usePartners()

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle
          title="Partnyorlarımız"
          subtitle="Bizə etibar edən dövlət qurumları və özəl şirkətlər"
        />
        {isLoading || !partners ? (
          <PartnersGridSkeleton />
        ) : (
          <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner) => (
              <StaggerItem key={partner.id}>
                <div className="flex h-full min-h-24 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-5 text-center transition-all duration-300 hover:border-gold-300 hover:bg-white hover:shadow-md">
                  {partner.logo_url ? (
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="max-h-12 max-w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-sm font-medium text-slate-600">{partner.name}</span>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  )
}
