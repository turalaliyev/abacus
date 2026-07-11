import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const WHY_US_LOTTIE =
  'https://lottie.host/84654794-fb50-4636-92ab-bf91a461f128/YmPlhLtB0f.lottie'

export function WhyUsLottie() {
  return (
    <div className="w-full overflow-hidden rounded-2xl bg-slate-50 p-4 sm:p-6" aria-hidden>
      <DotLottieReact src={WHY_US_LOTTIE} loop autoplay className="h-64 w-full sm:h-72 lg:h-80" />
    </div>
  )
}
