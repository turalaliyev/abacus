import { PageHeader } from "../components/ui/PageHeader"
import { PartnersSection } from "../components/sections/PartnersSection"
import { CtaSection } from "../components/sections/CtaSection"

export function Partners() {
  return (
    <>
      <PageHeader
        title="Partnyorlarımız"
        subtitle="Bizə etibar edən dövlət qurumları və özəl şirkətlər"
      />
      <PartnersSection />
      <CtaSection />
    </>
  )
}
