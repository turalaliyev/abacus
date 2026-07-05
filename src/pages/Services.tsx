import { useTranslation } from "react-i18next"
import { PageHeader } from "../components/ui/PageHeader"
import { ServicesGrid } from "../components/sections/ServicesGrid"
import { CtaSection } from "../components/sections/CtaSection"

export function Services() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader
        title={t("pages.services.title")}
        subtitle={t("pages.services.subtitle")}
      />
      <ServicesGrid />
      <CtaSection />
    </>
  )
}
