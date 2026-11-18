import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import az from './locales/az.json'
import en from './locales/en.json'
import ru from './locales/ru.json'
import type { Locale } from './lib/i18nContent'

/**
 * The admin panel gets its own i18next instance. The public site initialises
 * the global default instance, so sharing it would let either app change the
 * other's language or resources. AdminApp wraps the admin tree in an
 * <I18nextProvider> with this instance.
 */
const adminI18n = createInstance()

function readSavedLocale(): Locale | null {
  try {
    return localStorage.getItem('abacus-admin-locale') as Locale | null
  } catch {
    return null
  }
}

const saved = readSavedLocale()

void adminI18n.use(initReactI18next).init({
  resources: {
    az: { translation: az },
    en: { translation: en },
    ru: { translation: ru },
  },
  lng: saved && ['az', 'en', 'ru'].includes(saved) ? saved : 'az',
  fallbackLng: 'az',
  interpolation: { escapeValue: false },
})

adminI18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem('abacus-admin-locale', lng)
  } catch {
    /* storage unavailable (private mode) — the language still switches */
  }
})

export default adminI18n
