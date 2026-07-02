import { AnimatedSection } from "./AnimatedSection"

type SectionTitleProps = {
  title: string
  subtitle?: string
  centered?: boolean
}

export function SectionTitle({ title, subtitle, centered = true }: SectionTitleProps) {
  return (
    <AnimatedSection className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{subtitle}</p>
      )}
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-gold-500 ${centered ? "mx-auto" : ""}`}
      />
    </AnimatedSection>
  )
}
