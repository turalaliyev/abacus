import type { NavItem, NavItemRow } from '../types/database'

export function buildNavTree(rows: NavItemRow[]): NavItem[] {
  const roots = rows
    .filter((r) => !r.parent_id)
    .sort((a, b) => a.sort_order - b.sort_order)

  return roots.map((root) => {
    const children = rows
      .filter((r) => r.parent_id === root.id)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((c) => ({ label: c.label, href: c.href }))

    return {
      label: root.label,
      href: root.href,
      ...(children.length > 0 ? { children } : {}),
    }
  })
}
