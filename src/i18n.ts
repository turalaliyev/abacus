import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import az from './locales/az.json'
import en from './locales/en.json'
import ru from './locales/ru.json'
import type { Locale } from './lib/i18nContent'

const LOCALES = ['az', 'en', 'ru']

function isLocale(value: string | null): value is Locale {
  return !!value && LOCALES.includes(value)
}

/**
 * A `?lang=` query parameter wins over the saved preference, so a link shared
 * in a given language opens in that language. This is also what the hreflang
 * alternates point at.
 */
const fromQuery = new URLSearchParams(window.location.search).get('lang')
const saved = localStorage.getItem('abacus-locale')
const initialLocale: Locale = isLocale(fromQuery) ? fromQuery : isLocale(saved) ? saved : 'az'

void i18n.use(initReactI18next).init({
  resources: {
    az: { translation: az },
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: initialLocale,
  fallbackLng: 'az',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('abacus-locale', lng)
  document.documentElement.lang = lng
})

document.documentElement.lang = i18n.language

export default i18n
