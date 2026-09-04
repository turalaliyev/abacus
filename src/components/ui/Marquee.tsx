import type { ReactNode } from "react"

/**
 * Infinite horizontal ticker. The track is duplicated and translated by exactly
 * -50%, so the seam lands where the copy begins and the loop is invisible.
 * Pauses on hover so partner names stay readable, and freezes entirely under
 * prefers-reduced-motion (see the animation rule in index.css).
 */
export function Marquee({
  children,
  speed = 42,
  reverse = false,
  className = "",
}: {
  children: ReactNode
  /** Seconds for one full pass. Higher is slower. */
  speed?: number
  reverse?: boolean
  className?: string
}) {
  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 items-center gap-4 pr-4 [animation:marquee_var(--marquee-duration)_linear_infinite] group-hover:[animation-play-state:paused]"
          style={
            {
              "--marquee-duration": `${speed}s`,
              animationDirection: reverse ? "reverse" : "normal",
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      ))}
    </div>
  )
}
