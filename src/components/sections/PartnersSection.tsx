import { useTranslation } from "react-i18next"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import { SectionTitle } from "../ui/SectionTitle"
import { StaggerContainer, StaggerItem } from "../ui/AnimatedSection"
import { Marquee } from "../ui/Marquee"
import { Button } from "../ui/Button"
import { PartnersGridSkeleton } from "../ui/Skeleton"
import { useLocalizedPartners } from "../../hooks/useLocalizedData"
import { EASE, inView } from "../../lib/motion"
import type { Partner } from "../../types/database"

type PartnersSectionProps = {
  /**
   * Homepage variant: shows every partner as a continuously scrolling ticker
   * instead of a truncated grid — more names visible, and it moves.
   */
  marquee?: boolean
}

function PartnerChip({ partner }: { partner: Partner }) {
  return (
    <div className="flex h-20 min-w-56 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 backdrop-blur-sm transition-colors duration-300 hover:border-gold-400/40 hover:bg-white/10">
      {partner.logo_url ? (
        <img
          src={partner.logo_url}
          alt={partner.name}
          loading="lazy"
          className="h-11 w-11 shrink-0 rounded-lg bg-white/90 object-contain p-1"
        />
      ) : (
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gold-500/15 font-serif text-lg font-bold text-gold-400">
          {partner.name.charAt(0)}
        </span>
      )}
      <span className="line-clamp-2 max-w-44 text-sm font-medium leading-snug text-slate-200">
        {partner.name}
      </span>
    </div>
  )
}

export function PartnersSection({ marquee = false }: PartnersSectionProps) {
  const { t } = useTranslation()
  const { data: partners, isLoading } = useLocalizedPartners()

  if (marquee) {
    const half = partners ? Math.ceil(partners.length / 2) : 0
    const rowA = partners?.slice(0, half) ?? []
    const rowB = partners?.slice(half) ?? []

    return (
      <section className="grain relative overflow-hidden bg-navy-950 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_55%)]" />

        <div className="relative">
          <div className="mx-auto mb-12 max-w-7xl px-4 text-center lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-3xl font-bold tracking-tight text-white md:text-4xl"
            >
              {t("sections.partnersTitle")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="mx-auto mt-4 max-w-2xl text-lg text-slate-400"
            >
              {t("sections.partnersSubtitle")}
            </motion.p>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold-500" />
          </div>

          {isLoading || !partners ? (
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <PartnersGridSkeleton count={8} />
            </div>
          ) : (
            <div className="space-y-4">
              <Marquee speed={58}>
                {rowA.map((p) => (
                  <PartnerChip key={p.id} partner={p} />
                ))}
              </Marquee>
              <Marquee speed={66} reverse>
                {rowB.map((p) => (
                  <PartnerChip key={p.id} partner={p} />
                ))}
              </Marquee>
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Button to="/partnyorlar" variant="outline">
              {t("sections.showAllPartners")} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle
          title={t("sections.partnersTitle")}
          subtitle={t("sections.partnersSubtitle")}
        />
        {isLoading || !partners ? (
          <PartnersGridSkeleton count={12} />
        ) : (
          <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner) => (
              <StaggerItem key={partner.id}>
                <div className="flex h-full flex-col items-center rounded-xl bg-[#CAD1D8] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  {partner.logo_url ? (
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="h-28 w-full object-contain sm:h-32"
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid h-28 w-full place-items-center sm:h-32">
                      <span className="font-serif text-3xl font-bold text-navy-900/25">
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
        )}
      </div>
    </section>
  )
}
