import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import { useTranslation } from "react-i18next"
import { SectionTitle } from "../ui/SectionTitle"
import { TiltCard } from "../ui/TiltCard"
import { ServiceIcon } from "../ui/ServiceIcon"
import { ServicesGridSkeleton } from "../ui/Skeleton"
import { useLocalizedServices } from "../../hooks/useLocalizedData"
import { serviceHref, serviceImageUrl } from "../../lib/serviceSlug"
import { stripHtml } from "../../lib/richText"
import { EASE, inView } from "../../lib/motion"

export function ServicesGrid() {
  const { t } = useTranslation()
  const { data: services, isLoading } = useLocalizedServices()

  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle
          eyebrow={t("sections.servicesEyebrow")}
          title={t("sections.servicesTitle")}
          subtitle={t("sections.servicesSubtitle")}
        />

        {isLoading || !services ? (
          <ServicesGridSkeleton count={9} />
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            className="perspective-1000 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 44 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                }}
              >
                <TiltCard className="group h-full">
                  <Link
                    to={serviceHref(service.slug)}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-500 hover:border-gold-300 hover:shadow-[var(--shadow-card-hover)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
                      <img
                        src={service.image_url || serviceImageUrl(service.slug)}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                        onError={(e) => {
                          // Fall back to the icon treatment if neither source resolves.
                          e.currentTarget.style.visibility = "hidden"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent" />

                      <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-navy-950/50 text-gold-400 backdrop-blur-md">
                        <ServiceIcon name={service.icon} className="h-5 w-5" />
                      </span>

                      <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 backdrop-blur-md transition-all duration-500 group-hover:bg-gold-500 group-hover:text-navy-950">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>

                      <h3 className="absolute inset-x-4 bottom-4 text-lg font-semibold leading-snug text-white">
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                        {service.summary || stripHtml(service.description)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
                        {t("common.learnMore")}
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
