import { useState } from "react"
import { motion } from "motion/react"
import { Calculator as CalcIcon } from "lucide-react"
import { PageHeader } from "../components/ui/PageHeader"
import { AnimatedSection } from "../components/ui/AnimatedSection"

function formatAzn(value: number) {
  return new Intl.NumberFormat("az-AZ", { maximumFractionDigits: 2 }).format(value)
}

export function Calculator() {
  const [gross, setGross] = useState(1000)

  const incomeTaxFree = 8000 / 12
  const taxable = Math.max(0, gross - incomeTaxFree)
  const incomeTax = taxable * 0.14
  const socialEmployee = gross * 0.03
  const unemployment = gross * 0.005
  const medical = gross * 0.02
  const totalDeductions = incomeTax + socialEmployee + unemployment + medical
  const net = gross - totalDeductions

  const rows = [
    { label: "Gəlir vergisi (14%)", value: incomeTax },
    { label: "Sosial sığorta (3%)", value: socialEmployee },
    { label: "İşsizlikdən sığorta (0.5%)", value: unemployment },
    { label: "İcbari tibbi sığorta (2%)", value: medical },
  ]

  return (
    <>
      <PageHeader
        title="Əmək haqqı kalkulyatoru"
        subtitle="Gross məbləğdən təxmini net əmək haqqını hesablayın"
        breadcrumb="Kalkulyator"
      />
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 lg:grid-cols-2 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-gold-400">
                  <CalcIcon className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-semibold text-navy-900">Məlumatları daxil edin</h2>
              </div>
              <label className="block text-sm font-medium text-slate-700">
                Gross əmək haqqı (AZN)
              </label>
              <input
                type="number"
                min={0}
                value={gross}
                onChange={(e) => setGross(Number(e.target.value) || 0)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-lg font-semibold text-navy-900 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
              />
              <input
                type="range"
                min={300}
                max={10000}
                step={50}
                value={gross}
                onChange={(e) => setGross(Number(e.target.value))}
                className="mt-4 w-full accent-gold-500"
              />
              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                * Hesablama qeyri-neft özəl sektoru üçün təxmini dərəcələrə əsaslanır və
                yalnız məlumat xarakteri daşıyır.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-navy-900">
                Hesablama nəticəsi
              </h3>
              <div className="space-y-3">
                {rows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm">
                    <span className="text-slate-600">{row.label}</span>
                    <span className="font-medium text-navy-900">-{formatAzn(row.value)} ₼</span>
                  </div>
                ))}
              </div>
              <motion.div
                key={net}
                initial={{ scale: 0.97, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="mt-6 rounded-xl bg-navy-900 p-6 text-center"
              >
                <div className="text-sm text-slate-400">Net əmək haqqı</div>
                <div className="mt-1 text-4xl font-bold text-gold-400">{formatAzn(net)} ₼</div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
