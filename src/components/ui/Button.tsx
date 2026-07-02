import { Link } from "react-router-dom"
import type { ReactNode } from "react"

type ButtonProps = {
  children: ReactNode
  href?: string
  to?: string
  variant?: "primary" | "outline" | "ghost"
  className?: string
  onClick?: () => void
}

const variants = {
  primary:
    "bg-gold-500 text-navy-950 hover:bg-gold-400 shadow-lg shadow-gold-500/25",
  outline:
    "border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm",
  ghost: "text-navy-900 hover:bg-navy-900/5",
}

export function Button({
  children,
  href,
  to,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300"

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
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
