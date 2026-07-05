export type Locale = 'az' | 'en' | 'ru'

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'az', label: 'AZ' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
]

export type I18nText = Partial<Record<Locale, string>>
export type I18nParagraphs = Partial<Record<Locale, string[]>>

export function emptyI18n(): I18nText {
  return { az: '', en: '', ru: '' }
}

export function pickText(
  i18n: I18nText | null | undefined,
  fallback: string,
  locale: Locale,
): string {
  const value = i18n?.[locale]?.trim()
  if (value) return value
  const az = i18n?.az?.trim()
  if (az) return az
  return fallback
}

export function pickParagraphs(
  i18n: I18nParagraphs | null | undefined,
  fallback: string[],
  locale: Locale,
): string[] {
  const localized = i18n?.[locale]
  if (localized?.length) return localized
  if (i18n?.az?.length) return i18n.az
  return fallback
}

export function paragraphsToText(paragraphs: string[] | undefined): string {
  return (paragraphs ?? []).join('\n\n')
}

export function textToParagraphs(text: string): string[] {
  return text
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean)
}

export function syncAzField(i18n: I18nText | undefined, field: 'az' | 'en' | 'ru' = 'az'): string {
  return i18n?.[field]?.trim() ?? i18n?.az?.trim() ?? ''
}
