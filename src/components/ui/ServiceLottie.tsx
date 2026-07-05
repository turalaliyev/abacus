import { DotLottieReact } from '@lottiefiles/dotlottie-react'

/** Lottie animations keyed by URL slug (e.g. /xidmetler/audit). */
const SERVICE_LOTTIES: Partial<Record<string, string>> = {
  audit: 'https://lottie.host/77dcd3d6-6cbb-45be-ac67-ad8e76da0ec0/wH1GiM0hyk.lottie',
  vergi: 'https://lottie.host/e8eeb1fe-5b2a-479e-82e7-39e3cce46946/lZZHJdwzbK.lottie',
  konsaltinq: 'https://lottie.host/019b9d8a-49e8-4ae1-ab83-9a0bbc93bba1/XB7nxvsX7m.lottie',
  qiymetlendirme: 'https://lottie.host/f9553744-2372-419c-9dad-db6f04d426eb/WRpvGC66u4.lottie',
  huquq: 'https://lottie.host/434e3ff3-d2fe-414a-bcdc-e1496e760376/XBjJJ40iRi.lottie',
  muhasibat: 'https://lottie.host/da085ff2-38d0-4bd2-806e-8a681fac5843/jn3L5u6AKB.lottie',
  qeydiyyat: 'https://lottie.host/67a87743-2dab-466a-a7da-217fabb1a6c0/scu2D8ZGrW.lottie',
  kadr: 'https://lottie.host/e47f5568-4207-4788-a9c8-490f3fc49d94/jEje7UHWGy.lottie',
  miqrasiya: 'https://lottie.host/90582adb-0947-41e8-878d-1591df6f91c7/cmNgVJvrfl.lottie',
}

export function ServiceLottie({
  slug,
  variant = 'detail',
}: {
  slug?: string
  variant?: 'detail' | 'card'
}) {
  const src = slug ? SERVICE_LOTTIES[slug] : undefined
  if (!src) return null

  if (variant === 'card') {
    return (
      <div className="flex h-32 items-center justify-center sm:h-36" aria-hidden>
        <DotLottieReact
          src={src}
          loop
          autoplay
          className="h-full w-full max-h-32 max-w-[200px] transition-transform duration-300 group-hover:scale-105 sm:max-h-36"
        />
      </div>
    )
  }

  return (
    <div
      className="w-full overflow-hidden rounded-2xl bg-slate-50 p-4 sm:p-6"
      aria-hidden
    >
      <DotLottieReact src={src} loop autoplay className="h-64 w-full sm:h-72 lg:h-80" />
    </div>
  )
}

export function hasServiceLottie(slug?: string) {
  return Boolean(slug && SERVICE_LOTTIES[slug])
}
