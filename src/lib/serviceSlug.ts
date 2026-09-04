/**
 * The CMS stores the personnel service under the slug `hr-audit`, while the
 * navigation and public URL use `kadr`. Rather than mapping in each component
 * (and silently falling back to the wrong service when a lookup misses), all
 * resolution goes through here and tolerates either spelling from either
 * source — Supabase or the static fallback.
 */

const ALIASES: Record<string, string> = {
  kadr: 'hr-audit',
  'hr-audit': 'kadr',
}

/** Canonical public URL segment for a service slug. */
export function publicSlug(slug: string): string {
  return slug === 'hr-audit' ? 'kadr' : slug
}

export function serviceHref(slug: string): string {
  return `/xidmetler/${publicSlug(slug)}`
}

export function findService<T extends { slug: string }>(
  services: T[] | undefined,
  slug: string | undefined,
): T | undefined {
  if (!services || !slug) return undefined
  return services.find((s) => s.slug === slug) ?? services.find((s) => s.slug === ALIASES[slug])
}

/** Local photo imported from the live site, keyed by public slug. */
export function serviceImageUrl(slug: string): string {
  return `/services/${publicSlug(slug)}.webp`
}
