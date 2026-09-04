import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { motion, useScroll, useTransform } from "motion/react"
import { Hero } from "../components/sections/Hero"
import { TrustBar } from "../components/sections/TrustBar"
import { StatsBar } from "../components/sections/StatsBar"
import { ServicesGrid } from "../components/sections/ServicesGrid"
import { WhyUsSection } from "../components/sections/WhyUsSection"
import { ProcessSection } from "../components/sections/ProcessSection"
import { PartnersSection } from "../components/sections/PartnersSection"
import { FaqSection } from "../components/sections/FaqSection"
import { CtaSection } from "../components/sections/CtaSection"
import { RevealText } from "../components/ui/RevealText"
import { Button } from "../components/ui/Button"
import { Skeleton, TextBlockSkeleton } from "../components/ui/Skeleton"
import { useMediaAssets } from "../hooks/useSiteData"
import { useLocalizedSiteSettings } from "../hooks/useLocalizedData"
import { getMediaUrl } from "../lib/media"
import { EASE, inView, revealClip } from "../lib/motion"
import { siteConfig } from "../data/content"

/**
 * Section order is deliberate: prove credibility (trust, stats), then show
 * what's on offer, then answer "why you" and "what happens next", and only
 * ask for the contact at the end once objections are handled.
 */
export function Home() {
  const { t } = useTranslation()
  const { data: settings, isLoading } = useLocalizedSiteSettings()
  const { data: media } = useMediaAssets()
  const aboutImage = getMediaUrl(media, "about_image")
  const yearsActive = new Date().getFullYear() - siteConfig.foundedYear

  const aboutRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  })
  // Image drifts against the scroll direction — the section gains depth
  // without anything actually moving on the page.
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])
  const badgeY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"])

  return (
    <>
      <Hero />
      <TrustBar />
      <StatsBar />
      <ServicesGrid />
      <WhyUsSection />

      <section ref={aboutRef} className="overflow-hidden bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
          {isLoading || !settings ? (
            <>
              <TextBlockSkeleton lines={5} />
              <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
            </>
          ) : (
            <>
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600"
                >
                  {t("sections.aboutLabel")}
                </motion.span>

                <RevealText
                  as="h2"
                  text={settings.about_title}
                  className="mt-3 text-3xl font-bold tracking-tight text-navy-900 md:text-4xl"
                />

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={inView}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
                  }}
                  className="mt-6 space-y-4 text-slate-600"
                >
                  {settings.about_paragraphs.slice(0, 2).map((p, i) => (
                    <motion.p
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 18 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                      }}
                      className="leading-relaxed"
                    >
                      {p}
                    </motion.p>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={inView}
                  transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
                  className="mt-8"
                >
                  <Button to="/haqqimizda" variant="ghost" className="border border-navy-900/15">
                    {t("common.learnMore")}
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={inView}
                variants={revealClip}
                className="relative"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 p-1 shadow-2xl">
                  {aboutImage ? (
                    <motion.img
                      style={{ y: imageY, scale: 1.16 }}
                      src={aboutImage}
                      alt={settings.about_title}
                      className="h-full w-full rounded-xl object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="grid h-full place-items-center rounded-xl bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.2),transparent_50%)]">
                      <span className="font-serif text-8xl font-bold text-gold-400/90">A</span>
                    </div>
                  )}
                </div>

                <motion.div
                  style={{ y: badgeY }}
                  className="absolute -bottom-6 -left-6 rounded-xl bg-gold-500 px-6 py-4 shadow-xl shadow-gold-500/20"
                >
                  <div className="font-serif text-3xl font-bold text-navy-950">{yearsActive}+</div>
                  <div className="text-sm font-medium text-navy-900">
                    {t("common.yearsExperience")}
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </div>
      </section>

      <ProcessSection />
      <PartnersSection marquee />
      <FaqSection />
      <CtaSection />
    </>
  )
}
