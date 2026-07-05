import { useTranslation } from "react-i18next"
import { PageHeader } from "../components/ui/PageHeader"
import { PartnersSection } from "../components/sections/PartnersSection"
import { CtaSection } from "../components/sections/CtaSection"

export function Partners() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader
        title={t("pages.partners.title")}
        subtitle={t("pages.partners.subtitle")}
      />
      <PartnersSection />
      <CtaSection />
    </>
  )
}
