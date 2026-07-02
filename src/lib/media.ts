import type { MediaMap } from '../types/database'

export function getMediaUrl(media: MediaMap | undefined, key: string): string {
  return media?.[key]?.url ?? ''
}

export function formatBlogDate(iso: string): string {
  return new Intl.DateTimeFormat('az-AZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}
