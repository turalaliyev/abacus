import { CheckCircle2 } from "lucide-react"
import { PageHeader } from "../components/ui/PageHeader"
import { StaggerContainer, StaggerItem } from "../components/ui/AnimatedSection"
import { WhyUsGridSkeleton } from "../components/ui/Skeleton"
import { useWhyUsItems } from "../hooks/useSiteData"
import { CtaSection } from "../components/sections/CtaSection"

export function WhyUs() {
  const { data: items, isLoading } = useWhyUsItems()

  return (
    <>
      <PageHeader
        title="Niyə biz"
        subtitle="Bizi fərqləndirən dəyərlər və yanaşma"
      />
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          {isLoading || !items ? (
            <WhyUsGridSkeleton />
          ) : (
            <StaggerContainer className="grid gap-6 sm:grid-cols-2">
              {items.map((item) => (
                <StaggerItem key={item.id}>
                  <div className="flex h-full gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-7 transition-all duration-300 hover:border-gold-300 hover:bg-white hover:shadow-lg">
                    <CheckCircle2 className="h-7 w-7 shrink-0 text-gold-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-navy-900">{item.title}</h3>
                      <p className="mt-2 leading-relaxed text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
      <CtaSection />
    </>
  )
}
