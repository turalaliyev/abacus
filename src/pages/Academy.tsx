import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/ui/PageHeader'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import { AcademyLottie } from '../components/ui/AcademyLottie'
import { AcademyQuiz } from '../components/academy/AcademyQuiz'
import { RichText } from '../components/ui/RichText'
import { Skeleton } from '../components/ui/Skeleton'
import {
  useLocalizedAcademyQuizQuestions,
  useLocalizedSiteSettings,
} from '../hooks/useLocalizedData'

export function Academy() {
  const { t } = useTranslation()
  const { data: settings, isLoading: settingsLoading } = useLocalizedSiteSettings()
  const { data: allQuestions, isLoading: quizLoading } = useLocalizedAcademyQuizQuestions()

  const title = settings?.academy_title ?? t('academy.title')
  const description =
    settings?.academy_description || `<p>${t('academy.fallbackDescription')}</p>`

  return (
    <>
      <PageHeader
        title={title}
        subtitle={t('academy.subtitle')}
        breadcrumb={`${t('footer.company')} · ${title}`}
      />
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {settingsLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
          ) : (
            <div className="grid items-start gap-10 lg:grid-cols-3 lg:gap-12">
              <AnimatedSection className="lg:col-span-2">
                <RichText content={description} className="text-slate-600 leading-relaxed" />
              </AnimatedSection>

              <AnimatedSection delay={0.1} className="lg:col-span-1">
                <div className="lg:sticky lg:top-28">
                  <AcademyLottie />
                </div>
              </AnimatedSection>
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50/50 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          {quizLoading ? (
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-8">
              <Skeleton className="mx-auto h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mx-auto mt-6 h-10 w-36" />
            </div>
          ) : (
            <AcademyQuiz questions={allQuestions ?? []} />
          )}
        </div>
      </section>
    </>
  )
}
