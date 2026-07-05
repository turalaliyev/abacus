import { LOCALES } from '../../lib/i18nContent'
import { useTranslation } from 'react-i18next'

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { i18n } = useTranslation()

  return (
    <div className={`flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 ${className}`}>
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => void i18n.changeLanguage(code)}
          className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
            i18n.language.startsWith(code)
              ? 'bg-navy-900 text-gold-400'
              : 'text-slate-600 hover:text-navy-900'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
