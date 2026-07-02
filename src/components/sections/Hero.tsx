import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Button } from "../ui/Button"
import { HeroSkeleton } from "../ui/Skeleton"
import { useMediaAssets, useSiteSettings } from "../../hooks/useSiteData"
import { getMediaUrl } from "../../lib/media"

export function Hero() {
  const { data: settings, isLoading } = useSiteSettings()
  const { data: media } = useMediaAssets()

  if (isLoading || !settings) return <HeroSkeleton />

  const videoUrl = getMediaUrl(media, "hero_video")
  const posterUrl = getMediaUrl(media, "hero_poster")

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-navy-950">
      {videoUrl ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={posterUrl || undefined}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.15),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(26,74,115,0.5),transparent_40%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </>
      )}

      <div className="absolute inset-0 bg-navy-950/70" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl items-center px-4 py-24 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {settings.hero_badge && (
            <span className="inline-flex items-center rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-medium text-gold-400">
              {settings.hero_badge}
            </span>
          )}
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            {settings.hero_title.includes("güvən") ? (
              <>
                Maliyyənizə <span className="text-gold-400">güvən</span> və dəqiqlik gətiririk
              </>
            ) : (
              settings.hero_title
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            {settings.hero_subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button to="/elaqe">
              Bizimlə əlaqə <ArrowRight className="h-4 w-4" />
            </Button>
            <Button to="/xidmetler/audit" variant="outline">
              Xidmətlərimiz
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
