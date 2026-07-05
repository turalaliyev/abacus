import { useTranslation } from "react-i18next"
import { PageHeader } from "../components/ui/PageHeader"
import { AnimatedSection, StaggerContainer, StaggerItem } from "../components/ui/AnimatedSection"
import { TeamMemberCard } from "../components/ui/TeamMemberCard"
import { TeamGridSkeleton, TextBlockSkeleton } from "../components/ui/Skeleton"
import { useLocalizedSiteSettings, useLocalizedTeamMembers } from "../hooks/useLocalizedData"
import { CtaSection } from "../components/sections/CtaSection"

export function About() {
  const { t } = useTranslation()
  const { data: settings, isLoading: settingsLoading } = useLocalizedSiteSettings()
  const { data: team, isLoading: teamLoading } = useLocalizedTeamMembers()

  return (
    <>
      <PageHeader
        title={t("pages.about.title")}
        subtitle={t("pages.about.subtitle")}
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          {settingsLoading || !settings ? (
            <TextBlockSkeleton lines={5} />
          ) : (
            <AnimatedSection className="space-y-5 text-lg leading-relaxed text-slate-600">
              {settings.about_paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </AnimatedSection>
          )}
        </div>
      </section>

      <section className="bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
              {t("sections.teamTitle")}
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold-500" />
          </AnimatedSection>
          {teamLoading || !team ? (
            <TeamGridSkeleton />
          ) : (
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {team.map((member) => (
                <StaggerItem key={member.id}>
                  <TeamMemberCard member={member} />
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
