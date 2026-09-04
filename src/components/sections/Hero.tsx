import { Suspense, lazy, useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowRight, Award, Phone } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "../ui/Button"
import { Magnetic } from "../ui/Magnetic"
import { RevealText } from "../ui/RevealText"
import { HeroSkeleton } from "../ui/Skeleton"
import { useMediaAssets } from "../../hooks/useSiteData"
import { useLocalizedSiteSettings } from "../../hooks/useLocalizedData"
import { getMediaUrl } from "../../lib/media"
import { EASE } from "../../lib/motion"
import { siteConfig } from "../../data/content"

// three.js is ~150 kB gzipped — kept out of the initial bundle so first paint
// is the copy, not the graphics.
const DataSurface = lazy(() => import("../three/DataSurface"))

export function Hero() {
  const { t } = useTranslation()
  const { data: settings, isLoading } = useLocalizedSiteSettings()
  const { data: media } = useMediaAssets()
  const sectionRef = useRef<HTMLElement>(null)

  // Content drifts up and dims as the hero scrolls away, so the section below
  // arrives over the top of it rather than merely after it.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])

  if (isLoading || !settings) return <HeroSkeleton />

  const videoUrl = getMediaUrl(media, "hero_video")
  const posterUrl = getMediaUrl(media, "hero_poster")
  const phone = settings.phone || siteConfig.phone

  return (
    <section
      ref={sectionRef}
      className="grain relative isolate min-h-[92vh] overflow-hidden bg-navy-950"
    >
      <motion.div style={{ scale: bgScale }} className="absolute inset-0">
        {videoUrl ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={posterUrl || undefined}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <Suspense
            fallback={
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.16),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(26,74,115,0.55),transparent_40%)]" />
            }
          >
            <DataSurface />
          </Suspense>
        )}
      </motion.div>

      {/*
        When the CMS supplies a hero video it stays the base layer — but the
        particle field still runs on top, so the 3D depth is present either way.
      */}
      {videoUrl && (
        <div className="absolute inset-0 mix-blend-screen">
          <Suspense fallback={null}>
            <DataSurface variant="overlay" />
          </Suspense>
        </div>
      )}

      {/* Scrim: strong behind the copy, clearing toward the right. */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/35" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950 to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-4 py-24 lg:px-8 lg:py-32"
      >
        <div className="max-w-3xl">
          {settings.hero_badge && (
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-medium text-gold-300 backdrop-blur-sm"
            >
              <Award className="h-3.5 w-3.5" aria-hidden />
              {settings.hero_badge}
            </motion.span>
          )}

          <RevealText
            as="h1"
            text={settings.hero_title}
            delay={0.15}
            className="mt-6 text-4xl font-bold leading-[1.06] text-white md:text-6xl lg:text-7xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-300"
          >
            {settings.hero_subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <Button to="/muraciet" className="group">
                {t("sections.ctaButton")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Magnetic>
            <Button href={`tel:${phone.replace(/\s/g, "")}`} variant="outline">
              <Phone className="h-4 w-4" /> {phone}
            </Button>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.8 } },
            }}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-8"
          >
            {[
              {
                term: t("trust.licenseTitle"),
                desc: t("trust.licenseValue", { number: siteConfig.license.number }),
              },
              {
                term: t("trust.sinceTitle"),
                desc: t("trust.sinceValue", { year: siteConfig.foundedYear }),
              },
              { term: t("trust.clientsTitle"), desc: t("trust.clientsValue") },
            ].map((item) => (
              <motion.div
                key={item.term}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {item.term}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-gold-300">{item.desc}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </motion.div>

      {/* Scroll affordance */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
        aria-hidden
      >
        <motion.span
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-gold-400" />
        </motion.span>
      </motion.div>
    </section>
  )
}
