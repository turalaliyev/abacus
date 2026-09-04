import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppLocale } from './useAppLocale'
import {
  useAcademyQuizQuestions,
  useBlogPosts,
  useFaqItems,
  useNavItems as useNavItemsBase,
  usePartners,
  useServices,
  useSiteSettings,
  useStats,
  useTeamMembers,
  useWhyUsItems,
} from './useSiteData'
import {
  localizeAcademyQuizQuestion,
  localizeBlogPost,
  localizeFaq,
  localizePartner,
  localizeService,
  localizeSiteSettings,
  localizeStat,
  localizeTeamMember,
  localizeWhyUs,
} from '../lib/localize'

function useLocaleKey() {
  const { i18n } = useTranslation()
  return i18n.language
}

export function useLocalizedSiteSettings() {
  const locale = useAppLocale()
  useLocaleKey()
  const query = useSiteSettings()
  const data = useMemo(
    () => (query.data ? localizeSiteSettings(query.data as never, locale) : undefined),
    [query.data, locale],
  )
  return { ...query, data }
}

export function useLocalizedNavItems() {
  const locale = useAppLocale()
  useLocaleKey()
  return useNavItemsBase(locale)
}

export function useLocalizedTeamMembers() {
  const locale = useAppLocale()
  useLocaleKey()
  const query = useTeamMembers()
  const data = useMemo(
    () => query.data?.map((row) => localizeTeamMember(row as never, locale)),
    [query.data, locale],
  )
  return { ...query, data }
}

export function useLocalizedServices() {
  const locale = useAppLocale()
  useLocaleKey()
  const query = useServices()
  const data = useMemo(
    () => query.data?.map((row) => localizeService(row as never, locale)),
    [query.data, locale],
  )
  return { ...query, data }
}

export function useLocalizedStats() {
  const locale = useAppLocale()
  useLocaleKey()
  const query = useStats()
  const data = useMemo(
    () => query.data?.map((row) => localizeStat(row as never, locale)),
    [query.data, locale],
  )
  return { ...query, data }
}

export function useLocalizedPartners() {
  const locale = useAppLocale()
  useLocaleKey()
  const query = usePartners()
  const data = useMemo(
    () => query.data?.map((row) => localizePartner(row as never, locale)),
    [query.data, locale],
  )
  return { ...query, data }
}

export function useLocalizedWhyUsItems() {
  const locale = useAppLocale()
  useLocaleKey()
  const query = useWhyUsItems()
  const data = useMemo(
    () => query.data?.map((row) => localizeWhyUs(row as never, locale)),
    [query.data, locale],
  )
  return { ...query, data }
}

export function useLocalizedFaqItems() {
  const locale = useAppLocale()
  useLocaleKey()
  const query = useFaqItems()
  const data = useMemo(
    () => query.data?.map((row) => localizeFaq(row as never, locale)),
    [query.data, locale],
  )
  return { ...query, data }
}

export function useLocalizedBlogPosts(postType?: 'xeberler' | 'qanunvericilik') {
  const locale = useAppLocale()
  useLocaleKey()
  const query = useBlogPosts(postType)
  const data = useMemo(
    () => query.data?.map((row) => localizeBlogPost(row as never, locale)),
    [query.data, locale],
  )
  return { ...query, data }
}

export function useLocalizedAcademyQuizQuestions() {
  const locale = useAppLocale()
  useLocaleKey()
  const query = useAcademyQuizQuestions()
  const data = useMemo(
    () =>
      query.data
        ?.map((row) => localizeAcademyQuizQuestion(row as never, locale))
        .filter((q) => q.options.length === 4 && q.question),
    [query.data, locale],
  )
  return { ...query, data }
}
