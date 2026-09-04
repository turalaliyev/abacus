import { ArrowRight, Phone } from "lucide-react"
import { motion } from "motion/react"
import { useTranslation } from "react-i18next"
import { Button } from "../ui/Button"
import { Magnetic } from "../ui/Magnetic"
import { RevealText } from "../ui/RevealText"
import { useLocalizedSiteSettings } from "../../hooks/useLocalizedData"
import { EASE, inView } from "../../lib/motion"
import { siteConfig } from "../../data/content"

export function CtaSection() {
  const { t } = useTranslation()
  const { data: settings } = useLocalizedSiteSettings()
  const phone = settings?.phone ?? siteConfig.phone

  return (
    <section className="grain relative isolate overflow-hidden bg-navy-950 py-24 lg:py-32">
      {/* Two slow, offset drifts read as a single living light source. */}
      <motion.div
        aria-hidden
        className="absolute -left-1/4 top-0 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_65%)]"
        animate={{ x: [0, 90, 0], y: [0, 50, 0] }}
        transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-1/4 bottom-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(26,74,115,0.6),transparent_65%)]"
        animate={{ x: [0, -70, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
        <RevealText
          as="h2"
          text={t("sections.ctaTitle")}
          className="text-3xl font-bold tracking-tight text-white md:text-5xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          className="mx-auto mt-5 max-w-2xl text-lg text-slate-300"
        >
          {t("sections.ctaSubtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <Button to="/muraciet" className="group px-8 py-4 text-base">
              {t("sections.ctaButton")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Magnetic>
          <Button href={`tel:${phone.replace(/\s/g, "")}`} variant="outline">
            <Phone className="h-4 w-4" /> {phone}
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-6 text-sm text-slate-500"
        >
          {t("trust.replyValue")} · {siteConfig.hours.days} {siteConfig.hours.time}
        </motion.p>
      </div>
    </section>
  )
}
