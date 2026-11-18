import { LOCALES } from '../../lib/i18nContent'
import { useTranslation } from 'react-i18next'

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { i18n } = useTranslation()

  return (
    <div className={`flex items-center gap-1 rounded-lg border border-slate-200 bg-cream p-1 ${className}`}>
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => void i18n.changeLanguage(code)}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
            i18n.language.startsWith(code)
              ? 'bg-ink-900 text-accent-400'
              : 'text-slate-600 hover:text-ink-900'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
