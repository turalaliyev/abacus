import { ArrowRight } from "lucide-react"
import { Button } from "../ui/Button"
import { AnimatedSection } from "../ui/AnimatedSection"

export function CtaSection() {
  return (
    <section className="bg-navy-950 py-20 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Layihəniz üçün peşəkar dəstək axtarırsınız?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Komandamız sizinlə əlaqə saxlamağa və ehtiyaclarınıza uyğun həll təklif etməyə
            hazırdır.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/elaqe">
              Pulsuz konsultasiya al <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
