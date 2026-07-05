import type { I18nText, Locale } from '../lib/i18nContent'

export type MediaAsset = {
  id: string
  key: string
  url: string
  media_type: 'image' | 'video'
  alt_text: string | null
}

export type SiteSettings = {
  id: number
  name: string
  tagline: string
  phone: string
  email: string
  address: string
  facebook_url: string
  instagram_url: string
  linkedin_url: string
  whatsapp_url: string
  hero_badge: string
  hero_title: string
  hero_subtitle: string
  about_title: string
  about_paragraphs: string[]
  academy_title: string
  academy_description: string
}

export type NavItemRow = {
  id: string
  label: string
  label_i18n?: I18nText
  href: string
  parent_id: string | null
  sort_order: number
}

export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export type TeamMember = {
  id: string
  name: string
  role: string
  image_url: string
  sort_order: number
}

export type Service = {
  id: string
  slug: string
  title: string
  description: string
  icon: string
  image_url: string
  sort_order: number
}

export type Stat = {
  id: string
  value: number
  suffix: string
  label: string
  sort_order: number
}

export type Partner = {
  id: string
  name: string
  logo_url: string
  sort_order: number
}

export type WhyUsItem = {
  id: string
  title: string
  description: string
  sort_order: number
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  post_type: 'xeberler' | 'qanunvericilik'
  cover_image_url: string
  published_at: string
}

export type AcademyQuizTopic =
  | 'audit'
  | 'tax'
  | 'accounting'
  | 'hr'
  | 'consulting'
  | 'legal'
  | 'procurement'

export type AcademyQuizQuestion = {
  id: string
  topic: AcademyQuizTopic
  question: string
  options: string[]
  correct_index: number
}

export type AcademyQuizQuestionRow = {
  id: string
  topic: AcademyQuizTopic
  question_i18n: I18nText
  options_i18n: Partial<Record<Locale, string[]>>
  correct_index: number
  is_active: boolean
  sort_order: number
}

export type AcademyCourse = {
  id: string
  track: 'maliyye' | 'insan-resurslari' | 'satin-alma'
  name: string
  duration: string
  image_url: string
  sort_order: number
}

export type MediaMap = Record<string, MediaAsset>

export const ACADEMY_TRACK_LABELS: Record<AcademyCourse['track'], { title: string; subtitle: string }> = {
  maliyye: {
    title: 'Maliyyə və Mühasibatlıq',
    subtitle: 'Praktiki mühasibatlıq və maliyyə idarəetməsi təlimləri',
  },
  'insan-resurslari': {
    title: 'İnsan Resursları',
    subtitle: 'Kadr uçotu və HR idarəetməsi üzrə peşəkar təlimlər',
  },
  'satin-alma': {
    title: 'Dövlət satınalmaları',
    subtitle: 'Dövlət satınalmaları haqqında qanunvericilik üzrə təlimlər',
  },
}
