import { useTranslation } from 'react-i18next'
import type { Locale } from '../lib/i18nContent'

export function useAppLocale(): Locale {
  const { i18n } = useTranslation()
  const lang = i18n.language.split('-')[0]
  if (lang === 'en' || lang === 'ru') return lang
  return 'az'
}
