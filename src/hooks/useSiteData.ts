import { useQuery } from '@tanstack/react-query'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'
import { queryKeys } from '../lib/queryClient'
import { buildNavTree } from '../lib/nav'
import type { Locale } from '../lib/i18nContent'
import type {
  AcademyCourse,
  AcademyQuizQuestionRow,
  BlogPost,
  FaqItem,
  MediaMap,
  NavItem,
  Partner,
  Service,
  SiteSettings,
  Stat,
  TeamMember,
  WhyUsItem,
} from '../types/database'
import {
  aboutContent,
  faqItems as defaultFaq,
  navItems as defaultNav,
  partners as defaultPartners,
  services as defaultServices,
  siteConfig,
  stats as defaultStats,
  teamMembers as defaultTeam,
  whyUsItems as defaultWhyUs,
} from '../data/content'

function defaultSiteSettings(): SiteSettings {
  return {
    id: 1,
    name: siteConfig.name,
    tagline: siteConfig.tagline,
    phone: siteConfig.phone,
    email: siteConfig.email,
    address: siteConfig.address.full,
    facebook_url: siteConfig.social.facebook,
    instagram_url: siteConfig.social.instagram,
    linkedin_url: siteConfig.social.linkedin,
    whatsapp_url: siteConfig.social.whatsapp,
    hero_badge: 'Azərbaycanın aparıcı auditor-konsaltinq şirkəti',
    hero_title: 'Maliyyənizə güvən və dəqiqlik gətiririk',
    hero_subtitle: `${siteConfig.name} — audit, vergi, mühasibatlıq və konsaltinq sahələrində peşəkarlığa, şəffaflığa və dəqiqliyə əsaslanan xidmətlər təqdim edir.`,
    about_title: aboutContent.title,
    about_paragraphs: [...aboutContent.paragraphs],
    academy_title: 'Abacus Akademiya',
    academy_description:
      '<p>Abacus Akademiya audit, vergi, mühasibatlıq, insan resursları və dövlət satınalmaları sahələrində praktiki biliklər qazandıran peşəkar təlim proqramları təqdim edir.</p>',
  }
}

export function useMediaAssets() {
  return useQuery({
    queryKey: queryKeys.mediaAssets,
    queryFn: async (): Promise<MediaMap> => {
      if (!isSupabaseConfigured) return {}
      const { data, error } = await getSupabase().from('media_assets').select('*')
      if (error) throw error
      return Object.fromEntries((data ?? []).map((m) => [m.key, m]))
    },
  })
}

export function useSiteSettings() {
  return useQuery({
    queryKey: queryKeys.siteSettings,
    queryFn: async (): Promise<SiteSettings> => {
      if (!isSupabaseConfigured) return defaultSiteSettings()
      const { data, error } = await getSupabase()
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single()
      if (error) throw error
      return {
        ...data,
        about_paragraphs: Array.isArray(data.about_paragraphs)
          ? (data.about_paragraphs as string[])
          : [],
        academy_paragraphs: Array.isArray(data.academy_paragraphs)
          ? (data.academy_paragraphs as string[])
          : [],
      }
    },
  })
}

export function useNavItems(locale: Locale = 'az') {
  return useQuery({
    queryKey: [...queryKeys.navItems, locale],
    queryFn: async (): Promise<NavItem[]> => {
      if (!isSupabaseConfigured) {
        return defaultNav.map((item) => ({
          label: item.label,
          href: item.href,
          ...('children' in item && item.children
            ? { children: item.children.map((c) => ({ label: c.label, href: c.href })) }
            : {}),
        }))
      }
      const { data, error } = await getSupabase()
        .from('nav_items')
        .select('*')
        .order('sort_order')
      if (error) throw error
      return buildNavTree(data ?? [], locale)
    },
  })
}

export function useTeamMembers() {
  return useQuery({
    queryKey: queryKeys.teamMembers,
    queryFn: async (): Promise<TeamMember[]> => {
      if (!isSupabaseConfigured) {
        return defaultTeam.map((m, i) => ({
          id: String(i),
          name: m.name,
          role: m.role,
          image_url: m.image,
          sort_order: i + 1,
        }))
      }
      const { data, error } = await getSupabase()
        .from('team_members')
        .select('*')
        .order('sort_order')
      if (error) throw error
      return data ?? []
    },
  })
}

export function useServices() {
  return useQuery({
    queryKey: queryKeys.services,
    queryFn: async (): Promise<Service[]> => {
      if (!isSupabaseConfigured) {
        return defaultServices.map((s, i) => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          summary: s.summary,
          description: s.description,
          icon: s.icon,
          image_url: '',
          sort_order: i + 1,
        }))
      }
      const { data, error } = await getSupabase()
        .from('services')
        .select('*')
        .order('sort_order')
      if (error) throw error
      return data ?? []
    },
  })
}

export function useStats() {
  return useQuery({
    queryKey: queryKeys.stats,
    queryFn: async (): Promise<Stat[]> => {
      if (!isSupabaseConfigured) {
        return defaultStats.map((s, i) => ({
          id: String(i),
          value: s.value,
          suffix: s.suffix,
          label: s.label,
          sort_order: i + 1,
        }))
      }
      const { data, error } = await getSupabase().from('stats').select('*').order('sort_order')
      if (error) throw error
      return data ?? []
    },
  })
}

export function usePartners() {
  return useQuery({
    queryKey: queryKeys.partners,
    queryFn: async (): Promise<Partner[]> => {
      if (!isSupabaseConfigured) {
        return defaultPartners.map((name, i) => ({
          id: String(i),
          name,
          logo_url: '',
          sort_order: i + 1,
        }))
      }
      const { data, error } = await getSupabase()
        .from('partners')
        .select('*')
        .order('sort_order')
      if (error) throw error
      return data ?? []
    },
  })
}

export function useWhyUsItems() {
  return useQuery({
    queryKey: queryKeys.whyUsItems,
    queryFn: async (): Promise<WhyUsItem[]> => {
      if (!isSupabaseConfigured) {
        return defaultWhyUs.map((item, i) => ({
          id: String(i),
          title: item.title,
          description: item.description,
          sort_order: i + 1,
        }))
      }
      const { data, error } = await getSupabase()
        .from('why_us_items')
        .select('*')
        .order('sort_order')
      if (error) throw error
      return data ?? []
    },
  })
}

/**
 * FAQ entries. Falls back to the static list when Supabase is unconfigured or
 * when the faq_items table does not exist yet — supabase/004_content_refresh.sql
 * creates it, and the site must keep working before that has been run.
 */
export function useFaqItems() {
  return useQuery({
    queryKey: queryKeys.faqItems,
    queryFn: async (): Promise<FaqItem[]> => {
      const fallback = defaultFaq.map((f, i) => ({
        id: String(i),
        question: f.question,
        answer: f.answer,
        sort_order: i + 1,
      }))
      if (!isSupabaseConfigured) return fallback

      const { data, error } = await getSupabase()
        .from('faq_items')
        .select('*')
        .eq('is_published', true)
        .order('sort_order')

      if (error) return fallback
      return data?.length ? data : fallback
    },
  })
}

export function useBlogPosts(postType?: 'xeberler' | 'qanunvericilik') {
  return useQuery({
    queryKey: queryKeys.blogPosts(postType),
    queryFn: async (): Promise<BlogPost[]> => {
      if (!isSupabaseConfigured) return []
      let query = getSupabase()
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false })
      if (postType) query = query.eq('post_type', postType)
      const { data, error } = await query
      if (error) throw error
      return data ?? []
    },
  })
}

export function useAcademyQuizQuestions() {
  return useQuery({
    queryKey: queryKeys.academyQuizQuestions,
    queryFn: async (): Promise<AcademyQuizQuestionRow[]> => {
      if (!isSupabaseConfigured) return []
      const { data, error } = await getSupabase()
        .from('academy_quiz_questions')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
      if (error) throw error
      return (data ?? []) as AcademyQuizQuestionRow[]
    },
  })
}

export function useAcademyCourses(track: AcademyCourse['track']) {
  return useQuery({
    queryKey: queryKeys.academyCourses(track),
    queryFn: async (): Promise<AcademyCourse[]> => {
      if (!isSupabaseConfigured) return []
      const { data, error } = await getSupabase()
        .from('academy_courses')
        .select('*')
        .eq('track', track)
        .order('sort_order')
      if (error) throw error
      return data ?? []
    },
  })
}
