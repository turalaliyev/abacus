import { useTranslation } from "react-i18next"
import { ArrowRight } from "lucide-react"
import { SectionTitle } from "../ui/SectionTitle"
import { StaggerContainer, StaggerItem } from "../ui/AnimatedSection"
import { Button } from "../ui/Button"
import { PartnersGridSkeleton } from "../ui/Skeleton"
import { useLocalizedPartners } from "../../hooks/useLocalizedData"

type PartnersSectionProps = {
  /** When set, only this many partners are shown with a link to the full page. */
  limit?: number
}

export function PartnersSection({ limit }: PartnersSectionProps) {
  const { t } = useTranslation()
  const { data: partners, isLoading } = useLocalizedPartners()

  const visible = limit && partners ? partners.slice(0, limit) : partners
  const showAllButton = Boolean(limit && partners && partners.length > limit)

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle
          title={t("sections.partnersTitle")}
          subtitle={t("sections.partnersSubtitle")}
        />
        {isLoading || !visible ? (
          <PartnersGridSkeleton count={limit ?? 12} />
        ) : (
          <>
            <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {visible.map((partner) => (
                <StaggerItem key={partner.id}>
                  <div className="flex h-full flex-col items-center rounded-xl bg-[#CAD1D8] p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    {partner.logo_url ? (
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="h-28 w-full object-contain sm:h-32"
                        loading="lazy"
                      />
                    ) : (
                      <div className="grid h-28 w-full place-items-center sm:h-32">
                        <span className="text-2xl font-bold text-navy-900/20">
                          {partner.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <p className="mt-3 line-clamp-2 min-h-10 text-sm font-medium leading-snug text-navy-900">
                      {partner.name}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {showAllButton && (
              <div className="mt-10 flex justify-center">
                <Button to="/partnyorlar" variant="ghost" className="border border-navy-900/15">
                  {t("sections.showAllPartners")} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
