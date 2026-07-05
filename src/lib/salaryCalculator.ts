export type CalcType = 'gross' | 'net'
export type SectorType = 'private' | 'state'
export type JobType = 'main' | 'extra'

export type SalaryResult = {
  gross: number
  net: number
  taxableDisplay: number
  incomeTax: number
  dsmfEmp: number
  unemployment: number
  medical: number
  unionFee: number
  dsmfEmployer: number
  unemploymentEmployer: number
  medicalEmployer: number
  superGross: number
}

export type SalaryInput = {
  calcType: CalcType
  sectorType: SectorType
  jobType: JobType
  amount: number
  unionPercent: number
  guzesht: number
}

export const TAX_BENEFIT_OPTIONS = [
  { value: 800, label: '800 - Şəhid statusu almış şəxslərin valideynlərinin, dul arvadlarının (ərlərinin) və övladı' },
  { value: 400, label: '400 - Azərbaycan Respublikasının Vətən Müharibəsi Qəhrəmanı' },
  { value: 400, label: '400 - Azərbaycanın Milli Qəhrəmanı' },
  { value: 400, label: '400 - Sovet İttifaqı və Sosialist Əməyi Qəhrəmanı' },
  { value: 400, label: '400 - Müharibə ilə əlaqədar əlilliyi olan şəxs' },
  { value: 400, label: '400 - Həlak olmuş, yaxud sonralar vəfat etmiş döyüşçülərin dul arvadı (əri) və övladı' },
  { value: 400, label: '400 - 1941-1945-ci illərdə arxa cəbhədə fədakar əməyinə görə orden və medallar ilə təltif edilmiş şəxs' },
  { value: 400, label: '400 - Qanunvericiliklə müəyyən edilmiş qaydada müharibə veteranı adı almış şəxs' },
  { value: 400, label: '400 - Çernobıl AES-də qəza nəticəsində şüa xəstəliyinə tutulmuş şəxs' },
  { value: 200, label: '200 - Orqanizmin funksiyalarının 61-100 faiz pozulmasına görə əlilliyi müəyyən edilmiş şəxs' },
  { value: 100, label: '100 - Həlak olmuş döyüşçülərin valideynləri, dövlət qulluqçularının valideyni və arvadı (əri)' },
  { value: 100, label: '100 - Əfqanıstana və döyüş əməliyyatları aparılan başqa ölkələrə göndərilmiş hərbi qulluqçu' },
  { value: 100, label: '100 - Məcburi köçkün və onlara bərabər tutulan şəxs' },
  { value: 50, label: '50 - Himayəsində azı üç nəfər olan ər və ya arvad' },
] as const

export function formatMoney(x: number): string {
  const val = Math.round(x * 100) / 100
  if (val === Math.floor(val)) {
    return `${val.toFixed(0)} ₼`
  }
  return `${val.toFixed(2)} ₼`
}

function calcDSMFEmployee(gross: number, sector: SectorType): number {
  if (sector === 'state') return gross * 0.03
  if (gross <= 200) return gross * 0.03
  return 6 + (gross - 200) * 0.1
}

function calcDSMFEmployer(gross: number, sector: SectorType): number {
  if (sector === 'state') return gross * 0.22
  if (gross <= 200) return gross * 0.22
  if (gross <= 8000) return 44 + (gross - 200) * 0.15
  return 1214 + (gross - 8000) * 0.11
}

function calcUnemployment(gross: number): number {
  return gross * 0.005
}

function calcMedical(gross: number): number {
  if (gross <= 2500) return gross * 0.02
  return 50 + (gross - 2500) * 0.005
}

function calcIncomeTax(
  gross: number,
  sector: SectorType,
  job: JobType,
  guzesht: number,
): number {
  if (gross <= 0) return 0

  const nonTaxable = job === 'main' ? 200 + guzesht : 0

  if (sector === 'private') {
    if (gross <= nonTaxable) return 0

    if (gross <= 2500) {
      return (gross - nonTaxable) * 0.03
    }
    if (gross <= 8000) {
      return 75 + (gross - 2500) * 0.1
    }
    return 625 + (gross - 8000) * 0.14
  }

  const taxable = Math.max(0, gross - nonTaxable)

  if (taxable <= 2500) {
    return taxable * 0.14
  }
  return 350 + (taxable - 2500) * 0.25
}

export function calcForward(
  gross: number,
  sector: SectorType,
  job: JobType,
  unionPercent: number,
  guzesht: number,
): SalaryResult {
  const dsmfEmp = calcDSMFEmployee(gross, sector)
  const unemployment = calcUnemployment(gross)
  const medical = calcMedical(gross)
  const unionFee = gross * (unionPercent / 100)
  let incomeTax = calcIncomeTax(gross, sector, job, guzesht)
  incomeTax = Math.max(0, incomeTax)

  const nonTaxable = job === 'main' ? 200 + guzesht : 0
  const taxableDisplay = Math.max(0, gross - nonTaxable)

  const net = gross - incomeTax - dsmfEmp - unemployment - medical - unionFee

  const dsmfEmployer = calcDSMFEmployer(gross, sector)
  const unemploymentEmployer = calcUnemployment(gross)
  const medicalEmployer = calcMedical(gross)
  const superGross = gross + dsmfEmployer + unemploymentEmployer + medicalEmployer

  return {
    gross,
    net,
    taxableDisplay,
    incomeTax,
    dsmfEmp,
    unemployment,
    medical,
    unionFee,
    dsmfEmployer,
    unemploymentEmployer,
    medicalEmployer,
    superGross,
  }
}

function findGross(
  targetNet: number,
  sector: SectorType,
  job: JobType,
  unionPercent: number,
  guzesht: number,
): number {
  let lo = 0
  let hi = targetNet * 3

  for (let i = 0; i < 10; i++) {
    const r = calcForward(hi, sector, job, unionPercent, guzesht)
    if (r.net >= targetNet) break
    hi *= 2
  }

  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2
    const r = calcForward(mid, sector, job, unionPercent, guzesht)
    if (Math.abs(r.net - targetNet) < 0.005) return mid
    if (r.net < targetNet) {
      lo = mid
    } else {
      hi = mid
    }
  }

  return (lo + hi) / 2
}

export function calculateSalary(input: SalaryInput): SalaryResult {
  const { calcType, sectorType, jobType, amount, unionPercent, guzesht } = input

  if (calcType === 'gross') {
    return calcForward(amount, sectorType, jobType, unionPercent, guzesht)
  }

  const gross = Math.round(findGross(amount, sectorType, jobType, unionPercent, guzesht) * 100) / 100
  return calcForward(gross, sectorType, jobType, unionPercent, guzesht)
}
