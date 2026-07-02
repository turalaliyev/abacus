import { PageHeader } from "../components/ui/PageHeader"
import { ServicesGrid } from "../components/sections/ServicesGrid"
import { CtaSection } from "../components/sections/CtaSection"

export function Services() {
  return (
    <>
      <PageHeader
        title="Xidmətlər"
        subtitle="Müəssisənizin bütün maliyyə və hüquqi ehtiyacları üçün tam həllər"
      />
      <ServicesGrid />
      <CtaSection />
    </>
  )
}
