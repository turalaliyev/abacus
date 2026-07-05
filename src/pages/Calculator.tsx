import { useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '../components/ui/PageHeader'
import { AnimatedSection } from '../components/ui/AnimatedSection'
import {
  calculateSalary,
  formatMoney,
  TAX_BENEFIT_OPTIONS,
  type CalcType,
  type JobType,
  type SalaryResult,
  type SectorType,
} from '../lib/salaryCalculator'

function OptionBox({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center gap-2.5 rounded-xl border-2 px-4 py-4 text-left text-base transition-all select-none ${
        active
          ? 'border-gold-500 bg-gold-50/50'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <span
        className={`grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border-2 ${
          active ? 'border-gold-500' : 'border-slate-300'
        }`}
      >
        {active && <span className="h-2.5 w-2.5 rounded-full bg-gold-500" />}
      </span>
      <span className="text-navy-900">{children}</span>
    </button>
  )
}

function ResultTable({ result }: { result: SalaryResult }) {
  const { t } = useTranslation()

  const employeeRows = [
    { key: 'gross', value: result.gross },
    { key: 'taxable', value: result.taxableDisplay },
    { key: 'incomeTax', value: result.incomeTax },
    { key: 'dsmf', value: result.dsmfEmp },
    { key: 'unemployment', value: result.unemployment },
    { key: 'medical', value: result.medical },
    { key: 'union', value: result.unionFee },
    { key: 'net', value: result.net, highlight: true },
  ]

  const employerRows = [
    { key: 'dsmf', value: result.dsmfEmployer },
    { key: 'unemployment', value: result.unemploymentEmployer },
    { key: 'medical', value: result.medicalEmployer },
    { key: 'superGross', value: result.superGross, highlight: true },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-8 overflow-hidden rounded-xl border border-slate-200"
    >
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th
              colSpan={2}
              className="border-b-2 border-slate-200 bg-slate-100 px-4 py-3.5 text-center text-lg font-semibold text-navy-900"
            >
              {t('calculator.employee')}
            </th>
          </tr>
        </thead>
        <tbody>
          {employeeRows.map((row) => (
            <tr
              key={row.key}
              className={row.highlight ? 'border-t-2 border-slate-300 bg-slate-50' : ''}
            >
              <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                {t(`calculator.rows.${row.key}`)}
              </td>
              <td
                className={`border-b border-slate-100 px-4 py-3 text-right text-sm ${
                  row.highlight ? 'text-base font-bold text-navy-900' : 'font-semibold text-navy-900'
                }`}
              >
                {formatMoney(row.value)}
              </td>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <th
              colSpan={2}
              className="border-b-2 border-slate-200 bg-slate-100 px-4 py-3.5 text-center text-lg font-semibold text-navy-900"
            >
              {t('calculator.employer')}
            </th>
          </tr>
        </thead>
        <tbody>
          {employerRows.map((row) => (
            <tr
              key={row.key}
              className={row.highlight ? 'border-t-2 border-slate-300 bg-slate-50' : ''}
            >
              <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                {t(`calculator.rows.${row.key}`)}
              </td>
              <td
                className={`border-b border-slate-100 px-4 py-3 text-right text-sm ${
                  row.highlight ? 'text-base font-bold text-navy-900' : 'font-semibold text-navy-900'
                }`}
              >
                {formatMoney(row.value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

export function Calculator() {
  const { t } = useTranslation()
  const [calcType, setCalcType] = useState<CalcType>('gross')
  const [sectorType, setSectorType] = useState<SectorType>('private')
  const [jobType, setJobType] = useState<JobType>('main')
  const [salary, setSalary] = useState('0')
  const [unionFee, setUnionFee] = useState('0')
  const [taxBenefit, setTaxBenefit] = useState(false)
  const [guzesht, setGuzesht] = useState(800)
  const [result, setResult] = useState<SalaryResult | null>(null)

  const handleCalculate = () => {
    const amount = parseFloat(salary) || 0
    const unionPercent = parseFloat(unionFee) || 0

    setResult(
      calculateSalary({
        calcType,
        sectorType,
        jobType,
        amount,
        unionPercent,
        guzesht: taxBenefit ? guzesht : 0,
      }),
    )
  }

  return (
    <>
      <PageHeader
        title={t('pages.calculator.title')}
        subtitle={t('pages.calculator.subtitle')}
        breadcrumb={t('footer.links.calculator')}
      />

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <AnimatedSection>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <OptionBox active={calcType === 'gross'} onClick={() => setCalcType('gross')}>
                  {t('calculator.grossToNet')}
                </OptionBox>
                <OptionBox active={calcType === 'net'} onClick={() => setCalcType('net')}>
                  {t('calculator.netToGross')}
                </OptionBox>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <OptionBox
                  active={sectorType === 'private'}
                  onClick={() => setSectorType('private')}
                >
                  {t('calculator.sectorPrivate')}
                </OptionBox>
                <OptionBox active={sectorType === 'state'} onClick={() => setSectorType('state')}>
                  {t('calculator.sectorState')}
                </OptionBox>
                <OptionBox active={jobType === 'main'} onClick={() => setJobType('main')}>
                  {t('calculator.jobMain')}
                </OptionBox>
                <OptionBox active={jobType === 'extra'} onClick={() => setJobType('extra')}>
                  {t('calculator.jobExtra')}
                </OptionBox>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 px-5 py-4">
                  <label className="mb-2.5 block text-sm text-slate-600">
                    {calcType === 'gross' ? t('calculator.grossLabel') : t('calculator.netLabel')}
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min={0}
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="min-w-0 flex-1 border-none text-2xl text-navy-900 outline-none"
                    />
                    <span className="ml-2 shrink-0 text-xl text-slate-400">₼</span>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 px-5 py-4">
                  <label className="mb-2.5 block text-sm text-slate-600">
                    {t('calculator.unionFee')}
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={unionFee}
                      onChange={(e) => setUnionFee(e.target.value)}
                      className="min-w-0 flex-1 border-none text-2xl text-navy-900 outline-none"
                    />
                    <span className="ml-2 shrink-0 text-xl text-slate-400">%</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-navy-900">
                  <input
                    type="checkbox"
                    checked={taxBenefit}
                    onChange={(e) => setTaxBenefit(e.target.checked)}
                    className="h-4 w-4 rounded accent-gold-500"
                  />
                  {t('calculator.taxBenefit')}
                </label>
                {taxBenefit && (
                  <select
                    value={guzesht}
                    onChange={(e) => setGuzesht(Number(e.target.value))}
                    className="mt-2.5 w-full max-w-3xl rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20"
                  >
                    {TAX_BENEFIT_OPTIONS.map((opt, i) => (
                      <option key={i} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <button
                type="button"
                onClick={handleCalculate}
                className="mt-6 w-full rounded-lg bg-[#2d64ea] py-4 text-lg font-bold text-white transition-colors hover:bg-[#1f53d2]"
              >
                {t('calculator.calculate')}
              </button>

              {result && <ResultTable result={result} />}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
