import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const ACADEMY_LOTTIE =
  'https://lottie.host/19e38ea4-4666-40a1-bc86-529e02dbff5a/PGUtkxy5IM.lottie'

export function AcademyLottie() {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-slate-50 p-4 sm:p-6" aria-hidden>
      <DotLottieReact src={ACADEMY_LOTTIE} loop autoplay className="h-64 w-full sm:h-72 lg:h-80" />
    </div>
  )
}
