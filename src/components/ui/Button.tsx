import { Link } from "react-router-dom"
import type { ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
  href?: string
  to?: string
  variant?: "primary" | "outline" | "ghost"
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const variants = {
  primary:
    "bg-accent-500 text-ink-950 hover:bg-accent-400 shadow-lg shadow-accent-500/25",
  outline:
    "border-2 border-white/80 text-white hover:bg-cream/10 backdrop-blur-sm",
  ghost: "text-ink-900 hover:bg-ink-900/5",
}

export function Button({
  children,
  href,
  to,
  variant = "primary",
  className = "",
  onClick,
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-300"

  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
