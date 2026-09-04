import type {
  AcademyCourse,
  AcademyQuizQuestion,
  BlogPost,
  FaqItem,
  NavItem,
  Partner,
  Service,
  SiteSettings,
  Stat,
  TeamMember,
  WhyUsItem,
} from '../types/database'
import { pickParagraphs, pickText, type I18nParagraphs, type I18nText, type Locale } from '../lib/i18nContent'

type Row = Record<string, unknown>

export function localizeSiteSettings(row: Row, locale: Locale): SiteSettings {
  return {
    id: row.id as number,
    name: pickText(row.name_i18n as I18nText, row.name as string, locale),
    tagline: pickText(row.tagline_i18n as I18nText, row.tagline as string, locale),
    phone: row.phone as string,
    email: row.email as string,
    address: row.address as string,
    facebook_url: row.facebook_url as string,
    instagram_url: row.instagram_url as string,
    linkedin_url: row.linkedin_url as string,
    whatsapp_url: row.whatsapp_url as string,
    hero_badge: pickText(row.hero_badge_i18n as I18nText, row.hero_badge as string, locale),
    hero_title: pickText(row.hero_title_i18n as I18nText, row.hero_title as string, locale),
    hero_subtitle: pickText(row.hero_subtitle_i18n as I18nText, row.hero_subtitle as string, locale),
    about_title: pickText(row.about_title_i18n as I18nText, row.about_title as string, locale),
    about_paragraphs: pickParagraphs(
      row.about_paragraphs_i18n as I18nParagraphs,
      (row.about_paragraphs as string[]) ?? [],
      locale,
    ),
    academy_title: pickText(row.academy_title_i18n as I18nText, row.academy_title as string, locale),
    academy_description: pickText(
      row.academy_description_i18n as I18nText,
      (row.academy_description as string) ||
        pickParagraphs(
          row.academy_paragraphs_i18n as I18nParagraphs,
          (row.academy_paragraphs as string[]) ?? [],
          locale,
        )
          .map((p) => `<p>${p}</p>`)
          .join(''),
      locale,
    ),
  }
}

export function localizeTeamMember(row: Row, locale: Locale): TeamMember {
  return {
    id: row.id as string,
    name: pickText(row.name_i18n as I18nText, row.name as string, locale),
    role: pickText(row.role_i18n as I18nText, row.role as string, locale),
    image_url: row.image_url as string,
    sort_order: row.sort_order as number,
  }
}

export function localizeService(row: Row, locale: Locale): Service {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: pickText(row.title_i18n as I18nText, row.title as string, locale),
    summary: pickText(row.summary_i18n as I18nText, (row.summary as string) ?? '', locale),
    description: pickText(row.description_i18n as I18nText, row.description as string, locale),
    icon: row.icon as string,
    image_url: row.image_url as string,
    sort_order: row.sort_order as number,
  }
}

export function localizeStat(row: Row, locale: Locale): Stat {
  return {
    id: row.id as string,
    value: row.value as number,
    suffix: row.suffix as string,
    label: pickText(row.label_i18n as I18nText, row.label as string, locale),
    sort_order: row.sort_order as number,
  }
}

export function localizePartner(row: Row, locale: Locale): Partner {
  return {
    id: row.id as string,
    name: pickText(row.name_i18n as I18nText, row.name as string, locale),
    logo_url: row.logo_url as string,
    sort_order: row.sort_order as number,
  }
}

export function localizeWhyUs(row: Row, locale: Locale): WhyUsItem {
  return {
    id: row.id as string,
    title: pickText(row.title_i18n as I18nText, row.title as string, locale),
    description: pickText(row.description_i18n as I18nText, row.description as string, locale),
    sort_order: row.sort_order as number,
  }
}

export function localizeFaq(row: Row, locale: Locale): FaqItem {
  return {
    id: row.id as string,
    question: pickText(row.question_i18n as I18nText, row.question as string, locale),
    answer: pickText(row.answer_i18n as I18nText, row.answer as string, locale),
    sort_order: row.sort_order as number,
  }
}

export function localizeBlogPost(row: Row, locale: Locale): BlogPost {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: pickText(row.title_i18n as I18nText, row.title as string, locale),
    excerpt: pickText(row.excerpt_i18n as I18nText, row.excerpt as string, locale),
    content: pickText(row.content_i18n as I18nText, row.content as string, locale),
    category: pickText(row.category_i18n as I18nText, row.category as string, locale),
    post_type: row.post_type as BlogPost['post_type'],
    cover_image_url: row.cover_image_url as string,
    published_at: row.published_at as string,
  }
}

export function localizeAcademyQuizQuestion(row: Row, locale: Locale): AcademyQuizQuestion {
  const optionsI18n = row.options_i18n as Partial<Record<Locale, string[]>>
  const options =
    optionsI18n[locale]?.length === 4
      ? optionsI18n[locale]!
      : optionsI18n.az?.length === 4
        ? optionsI18n.az!
        : []
  return {
    id: row.id as string,
    topic: row.topic as AcademyQuizQuestion['topic'],
    question: pickText(row.question_i18n as I18nText, '', locale),
    options,
    correct_index: row.correct_index as number,
  }
}

export function localizeAcademyCourse(row: Row, locale: Locale): AcademyCourse {
  return {
    id: row.id as string,
    track: row.track as AcademyCourse['track'],
    name: pickText(row.name_i18n as I18nText, row.name as string, locale),
    duration: pickText(row.duration_i18n as I18nText, row.duration as string, locale),
    image_url: row.image_url as string,
    sort_order: row.sort_order as number,
  }
}

export type { NavItem }
