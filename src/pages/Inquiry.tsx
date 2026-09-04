import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "motion/react"
import { CheckCircle2, ArrowRight, ArrowLeft, Send, Home } from "lucide-react"
import { PageHeader } from "../components/ui/PageHeader"
import { Button } from "../components/ui/Button"
import { getSupabase, isSupabaseConfigured } from "../lib/supabase"

const INPUT_CLS =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition-all focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 placeholder:text-slate-400"

type Step1 = { fullName: string; companyName: string; phone: string; email: string }
type Step2 = { services: string[]; goal: string; timeline: string }
type Step3 = { budget: string; notes: string }

const SERVICE_KEYS = [
  "audit", "vergi", "muhasibat", "konsaltinq",
  "qiymetlendirme", "huquq", "qeydiyyat", "kadr", "miqrasiya",
]

const TIMELINE_KEYS = ["asap", "month1", "months3", "flexible"]
const BUDGET_KEYS = ["lt1000", "1000to5000", "5000to10000", "gt10000", "unsure"]

const TOTAL_STEPS = 3

function StepDots({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < current
              ? "h-2 w-2 bg-gold-500"
              : i === current
              ? "h-2 w-6 bg-gold-500"
              : "h-2 w-2 bg-slate-200"
          }`}
        />
      ))}
    </div>
  )
}

function FieldLabel({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-2">
      <label className="block text-sm font-semibold text-navy-900">{children}</label>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}

function ServiceChip({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
        selected
          ? "border-gold-400 bg-gold-50 text-gold-700 shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:border-gold-300 hover:bg-slate-50"
      }`}
    >
      {selected && <span className="mr-1.5">✓</span>}
      {label}
    </button>
  )
}

export function Inquiry() {
  const { t } = useTranslation()
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [s1, setS1] = useState<Step1>({ fullName: "", companyName: "", phone: "", email: "" })
  const [s2, setS2] = useState<Step2>({ services: [], goal: "", timeline: "" })
  const [s3, setS3] = useState<Step3>({ budget: "", notes: "" })

  const toggleService = (key: string) => {
    setS2((prev) => ({
      ...prev,
      services: prev.services.includes(key)
        ? prev.services.filter((s) => s !== key)
        : [...prev.services, key],
    }))
  }

  const canProceedStep0 = s1.fullName.trim() && s1.phone.trim() && s1.email.trim()
  const canProceedStep1 = s2.services.length > 0 && s2.goal.trim() && s2.timeline
  const canSubmit = s3.budget

  const handleSubmit = async () => {
    if (!canSubmit) return
    setLoading(true)
    setError("")
    try {
      if (isSupabaseConfigured) {
        const { error: dbError } = await getSupabase()
          .from("inquiry_submissions")
          .insert({
            full_name: s1.fullName.trim(),
            company_name: s1.companyName.trim(),
            phone: s1.phone.trim(),
            email: s1.email.trim(),
            services: s2.services,
            goal: s2.goal.trim(),
            timeline: s2.timeline,
            budget: s3.budget,
            notes: s3.notes.trim(),
          })
        if (dbError) throw dbError
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xəta baş verdi")
    } finally {
      setLoading(false)
    }
  }

  const stepTitles = [
    t("inquiry.step1Title"),
    t("inquiry.step2Title"),
    t("inquiry.step3Title"),
  ]

  return (
    <>
      <PageHeader
        title={t("inquiry.pageTitle")}
        subtitle={t("inquiry.pageSubtitle")}
      />
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-4 lg:px-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white p-10 text-center shadow-sm border border-slate-100"
            >
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-50">
                <CheckCircle2 className="h-10 w-10 text-green-500" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-navy-900">
                {t("inquiry.successTitle")}
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-slate-600 leading-relaxed">
                {t("inquiry.successText")}
              </p>
              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <Button to="/">
                  <Home className="h-4 w-4" /> {t("common.backHome")}
                </Button>
                <Button to="/elaqe" variant="ghost" className="border border-navy-900/15">
                  {t("common.contactUs")} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
              {/* Header */}
              <div className="bg-navy-900 px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gold-400 uppercase tracking-wider">
                    {t("inquiry.step")} {step + 1} {t("inquiry.of")} {TOTAL_STEPS}
                  </span>
                  <span className="text-sm font-semibold text-white/90">{stepTitles[step]}</span>
                </div>
                <div className="mt-3 h-1 rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-gold-500 transition-all duration-500"
                    style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                  />
                </div>
              </div>

              {/* Body */}
              <div className="px-8 py-8">
                <StepDots current={step} />

                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <FieldLabel>{t("inquiry.fullName")} *</FieldLabel>
                          <input
                            className={INPUT_CLS}
                            placeholder="Əli Hüseyinov"
                            value={s1.fullName}
                            onChange={(e) => setS1((p) => ({ ...p, fullName: e.target.value }))}
                          />
                        </div>
                        <div>
                          <FieldLabel>{t("inquiry.companyName")}</FieldLabel>
                          <input
                            className={INPUT_CLS}
                            placeholder="Şirkət MMC"
                            value={s1.companyName}
                            onChange={(e) => setS1((p) => ({ ...p, companyName: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <FieldLabel>{t("inquiry.phone")} *</FieldLabel>
                        <input
                          className={INPUT_CLS}
                          type="tel"
                          placeholder="+994 50 000 00 00"
                          value={s1.phone}
                          onChange={(e) => setS1((p) => ({ ...p, phone: e.target.value }))}
                        />
                      </div>
                      <div>
                        <FieldLabel>{t("inquiry.email")} *</FieldLabel>
                        <input
                          className={INPUT_CLS}
                          type="email"
                          placeholder="ali@company.az"
                          value={s1.email}
                          onChange={(e) => setS1((p) => ({ ...p, email: e.target.value }))}
                        />
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <FieldLabel hint={t("inquiry.servicesHint")}>
                          {t("inquiry.servicesLabel")} *
                        </FieldLabel>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {SERVICE_KEYS.map((key) => (
                            <ServiceChip
                              key={key}
                              label={t(`inquiry.services.${key}`)}
                              selected={s2.services.includes(key)}
                              onClick={() => toggleService(key)}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <FieldLabel>{t("inquiry.goalLabel")} *</FieldLabel>
                        <textarea
                          rows={4}
                          className={INPUT_CLS}
                          placeholder={t("inquiry.goalPlaceholder")}
                          value={s2.goal}
                          onChange={(e) => setS2((p) => ({ ...p, goal: e.target.value }))}
                        />
                      </div>
                      <div>
                        <FieldLabel>{t("inquiry.timelineLabel")} *</FieldLabel>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {TIMELINE_KEYS.map((key) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setS2((p) => ({ ...p, timeline: key }))}
                              className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                                s2.timeline === key
                                  ? "border-gold-400 bg-gold-50 text-gold-700"
                                  : "border-slate-200 bg-white text-slate-600 hover:border-gold-300"
                              }`}
                            >
                              {s2.timeline === key && <span className="mr-1.5">✓</span>}
                              {t(`inquiry.timelineOptions.${key}`)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <FieldLabel>{t("inquiry.budgetLabel")} *</FieldLabel>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {BUDGET_KEYS.map((key) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setS3((p) => ({ ...p, budget: key }))}
                              className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                                s3.budget === key
                                  ? "border-gold-400 bg-gold-50 text-gold-700"
                                  : "border-slate-200 bg-white text-slate-600 hover:border-gold-300"
                              }`}
                            >
                              {s3.budget === key && <span className="mr-1.5">✓</span>}
                              {t(`inquiry.budgetOptions.${key}`)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <FieldLabel>{t("inquiry.notesLabel")}</FieldLabel>
                        <textarea
                          rows={4}
                          className={INPUT_CLS}
                          placeholder={t("inquiry.notesPlaceholder")}
                          value={s3.notes}
                          onChange={(e) => setS3((p) => ({ ...p, notes: e.target.value }))}
                        />
                      </div>

                      {/* Summary strip */}
                      <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 text-xs text-slate-500 space-y-1">
                        <p><span className="font-semibold text-navy-900">{s1.fullName}</span>{s1.companyName ? ` · ${s1.companyName}` : ""}</p>
                        <p>{s1.phone} · {s1.email}</p>
                        <p>{s2.services.map((k) => t(`inquiry.services.${k}`)).join(", ")}</p>
                      </div>

                      {error && (
                        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                          {error}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="mt-8 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-100 ${step === 0 ? "invisible" : ""}`}
                  >
                    <ArrowLeft className="h-4 w-4" /> {t("inquiry.back")}
                  </button>

                  {step < TOTAL_STEPS - 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s + 1)}
                      disabled={step === 0 ? !canProceedStep0 : !canProceedStep1}
                      className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-2.5 text-sm font-semibold text-navy-950 shadow-md shadow-gold-500/25 transition-all hover:bg-gold-400 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {t("inquiry.next")} <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canSubmit || loading}
                      className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-2.5 text-sm font-semibold text-navy-950 shadow-md shadow-gold-500/25 transition-all hover:bg-gold-400 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {loading ? t("inquiry.submitting") : t("inquiry.submit")}
                      <Send className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
