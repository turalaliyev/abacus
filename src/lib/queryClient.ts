import { QueryClient } from '@tanstack/react-query'

/** Data is fetched once per session; admin invalidates on publish. */
export const STALE_TIME = 1000 * 60 * 60 * 24

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: STALE_TIME * 2,
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
})

export const queryKeys = {
  mediaAssets: ['media_assets'] as const,
  siteSettings: ['site_settings'] as const,
  navItems: ['nav_items'] as const,
  teamMembers: ['team_members'] as const,
  services: ['services'] as const,
  stats: ['stats'] as const,
  partners: ['partners'] as const,
  whyUsItems: ['why_us_items'] as const,
  faqItems: ['faq_items'] as const,
  blogPosts: (type?: string) => ['blog_posts', type] as const,
  academyCourses: (track?: string) => ['academy_courses', track] as const,
  academyQuizQuestions: ['academy_quiz_questions'] as const,
}
