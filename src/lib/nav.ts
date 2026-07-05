import type { NavItem, NavItemRow } from '../types/database'
import type { Locale } from './i18nContent'
import { pickText } from './i18nContent'

export function buildNavTree(rows: NavItemRow[], locale: Locale): NavItem[] {
  const roots = rows
    .filter((r) => !r.parent_id)
    .sort((a, b) => a.sort_order - b.sort_order)

  return roots.map((root) => {
    const children = rows
      .filter((r) => r.parent_id === root.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((c) => ({
        label: pickText(c.label_i18n, c.label, locale),
        href: c.href,
      }))

    return {
      label: pickText(root.label_i18n, root.label, locale),
      href: root.href,
      ...(children.length > 0 ? { children } : {}),
    }
  })
}
