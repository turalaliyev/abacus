import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  RotateCcw,
} from 'lucide-react'
import { Button } from '../ui/Button'
import { useLocalizedSiteSettings } from '../../hooks/useLocalizedData'
import type { AcademyQuizQuestion } from '../../types/database'
import { gradeFromPercent, pickQuizQuestions, scoreQuiz, type QuizGrade } from '../../lib/academyQuiz'

type AcademyQuizProps = {
  questions: AcademyQuizQuestion[]
}

type Phase = 'intro' | 'quiz' | 'results'

export function AcademyQuiz({ questions }: AcademyQuizProps) {
  const { t } = useTranslation()
  const { data: settings } = useLocalizedSiteSettings()
  const [phase, setPhase] = useState<Phase>('intro')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [sessionQuestions, setSessionQuestions] = useState<AcademyQuizQuestion[]>([])

  const current = sessionQuestions[index]
  const progress = sessionQuestions.length ? ((index + 1) / sessionQuestions.length) * 100 : 0

  const startQuiz = () => {
    setSessionQuestions(pickQuizQuestions(questions))
    setAnswers({})
    setIndex(0)
    setPhase('quiz')
  }

  const selectAnswer = (optionIndex: number) => {
    if (!current) return
    setAnswers((prev) => ({ ...prev, [current.id]: optionIndex }))
  }

  const goNext = () => {
    if (!current || answers[current.id] === undefined) return
    if (index < sessionQuestions.length - 1) setIndex((i) => i + 1)
    else setPhase('results')
  }

  const goPrev = () => {
    if (index > 0) setIndex((i) => i - 1)
  }

  const retake = () => {
    setPhase('intro')
    setSessionQuestions([])
    setAnswers({})
    setIndex(0)
  }

  const result =
    phase === 'results' ? scoreQuiz(sessionQuestions, answers) : null
  const grade: QuizGrade | null = result ? gradeFromPercent(result.percent) : null

  if (!questions.length) {
    return (
      <p className="text-center text-slate-500">{t('academy.quiz.unavailable')}</p>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-navy-900">{t('academy.quiz.title')}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">{t('academy.quiz.description')}</p>
            <p className="mt-2 text-sm text-slate-500">
              {t('academy.quiz.questionCount', { count: Math.min(20, questions.length) })}
            </p>
            <Button className="mt-8" onClick={startQuiz}>
              {t('academy.quiz.start')} <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {phase === 'quiz' && current && (
          <motion.div
            key={`q-${current.id}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
          >
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
                <span>
                  {t('academy.quiz.question')} {index + 1} {t('academy.quiz.of')}{' '}
                  {sessionQuestions.length}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-navy-900">
                  {t(`academy.quiz.topics.${current.topic}`)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-gold-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <h4 className="text-lg font-semibold text-navy-900 sm:text-xl">{current.question}</h4>

            <ul className="mt-6 space-y-3">
              {current.options.map((option: string, optionIndex: number) => {
                const selected = answers[current.id] === optionIndex
                return (
                  <li key={optionIndex}>
                    <button
                      type="button"
                      onClick={() => selectAnswer(optionIndex)}
                      className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition-all sm:text-base ${
                        selected
                          ? 'border-gold-400 bg-white text-navy-900 shadow-sm'
                          : 'border-slate-200 bg-white/70 text-slate-700 hover:border-gold-300 hover:bg-white'
                      }`}
                    >
                      <span className="mr-2 font-semibold text-gold-600">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>
                      {option}
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <Button
                variant="ghost"
                className="border border-navy-900/15"
                onClick={goPrev}
                disabled={index === 0}
              >
                <ArrowLeft className="h-4 w-4" /> {t('academy.quiz.previous')}
              </Button>
              <Button onClick={goNext} disabled={answers[current.id] === undefined}>
                {index < sessionQuestions.length - 1 ? (
                  <>
                    {t('academy.quiz.next')} <ArrowRight className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    {t('academy.quiz.submit')} <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {phase === 'results' && result && grade && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-navy-900 text-gold-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-navy-900">{t('academy.quiz.results.title')}</h3>
            <p className="mt-2 text-4xl font-bold text-gold-600">
              {result.correct}/{result.total}
            </p>
            <p className="mt-1 text-lg text-slate-600">
              {t('academy.quiz.results.score')}: {result.percent}%
            </p>
            <p className="mt-4 text-xl font-semibold text-navy-900">
              {t(`academy.quiz.results.grade.${grade}`)}
            </p>

            <div className="mx-auto mt-8 max-w-lg rounded-xl border border-slate-200 bg-white p-6 text-left">
              <h4 className="font-semibold text-navy-900">{t('academy.quiz.results.contactTitle')}</h4>
              <p className="mt-2 text-sm text-slate-600">{t('academy.quiz.results.contactText')}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {settings?.phone && (
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-gold-500" />
                    <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="hover:text-gold-600">
                      {settings.phone}
                    </a>
                  </li>
                )}
                {settings?.email && (
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-gold-500" />
                    <a href={`mailto:${settings.email}`} className="hover:text-gold-600">
                      {settings.email}
                    </a>
                  </li>
                )}
                {settings?.address && (
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                    <span>{settings.address}</span>
                  </li>
                )}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/elaqe">{t('common.contactUs')}</Button>
                <Button variant="ghost" className="border border-navy-900/15" onClick={retake}>
                  <RotateCcw className="h-4 w-4" /> {t('academy.quiz.results.retake')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
