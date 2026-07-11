import { useTranslation } from "react-i18next"
import { Hero } from "../components/sections/Hero"
import { StatsBar } from "../components/sections/StatsBar"
import { ServicesGrid } from "../components/sections/ServicesGrid"
import { PartnersSection } from "../components/sections/PartnersSection"
import { CtaSection } from "../components/sections/CtaSection"
import { AnimatedSection } from "../components/ui/AnimatedSection"
import { Button } from "../components/ui/Button"
import { Skeleton, TextBlockSkeleton } from "../components/ui/Skeleton"
import { useMediaAssets } from "../hooks/useSiteData"
import { useLocalizedSiteSettings } from "../hooks/useLocalizedData"
import { getMediaUrl } from "../lib/media"

export function Home() {
  const { t } = useTranslation()
  const { data: settings, isLoading } = useLocalizedSiteSettings()
  const { data: media } = useMediaAssets()
  const aboutImage = getMediaUrl(media, "about_image")

  return (
    <>
      <Hero />
      <StatsBar />
      <CtaSection />
      <ServicesGrid />

      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:px-8">
          {isLoading || !settings ? (
            <>
              <TextBlockSkeleton lines={5} />
              <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
            </>
          ) : (
            <>
              <AnimatedSection>
                <span className="text-sm font-semibold uppercase tracking-wider text-gold-600">
                  {t("sections.aboutLabel")}
                </span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
                  {settings.about_title}
                </h2>
                <div className="mt-6 space-y-4 text-slate-600">
                  {settings.about_paragraphs.slice(0, 2).map((p, i) => (
                    <p key={i} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-8">
                  <Button to="/haqqimizda" variant="ghost" className="border border-navy-900/15">
                    {t("common.learnMore")}
                  </Button>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.15}>
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 p-1 shadow-2xl">
                    {aboutImage ? (
                      <img
                        src={aboutImage}
                        alt={settings.about_title}
                        className="h-full w-full rounded-xl object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="grid h-full place-items-center rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.2),transparent_50%)]">
                        <span className="text-8xl font-bold text-gold-400/90">A</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-6 -left-6 rounded-xl bg-gold-500 px-6 py-4 shadow-xl">
                    <div className="text-3xl font-bold text-navy-950">15+</div>
                    <div className="text-sm font-medium text-navy-900">{t("common.yearsExperience")}</div>
                  </div>
                </div>
              </AnimatedSection>
            </>
          )}
        </div>
      </section>

      <PartnersSection limit={4} />
    </>
  )
}
