/** True when the string looks like HTML markup. */
export function isHtmlContent(value: string | undefined | null): boolean {
  return Boolean(value && /<[a-z][\s\S]*>/i.test(value))
}

/** Strip tags for previews / cards. */
export function stripHtml(value: string | undefined | null): string {
  if (!value) return ''
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}
