import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  DEFAULT_LOCALE,
  LOCALES,
  OG_IMAGE,
  SITE_URL,
  getSeoForPath,
  jsonLdForPage,
} from '../../lib/seo'
import { siteConfig } from '../../data/content'
import { useLocalizedFaqItems } from '../../hooks/useLocalizedData'

/**
 * Keeps <head> in sync during client-side navigation.
 *
 * The build prerenders the correct head into every static HTML file, so this
 * only has to take over once React is driving navigation. Tags are updated in
 * place rather than appended, so the prerendered ones are reused and never
 * duplicated.
 */

function upsertTag(
  tag: 'meta' | 'link',
  identifier: { key: string; value: string },
  attrs: Record<string, string>,
) {
  const selector = `${tag}[${identifier.key}="${identifier.value}"]`
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = document.createElement(tag)
    el.setAttribute(identifier.key, identifier.value)
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
}

const JSON_LD_ATTR = 'data-seo-jsonld'

function setJsonLd(blocks: Record<string, unknown>[]) {
  document.head.querySelectorAll(`script[${JSON_LD_ATTR}]`).forEach((el) => el.remove())
  for (const block of blocks) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute(JSON_LD_ATTR, '')
    // JSON.stringify escapes nothing dangerous here; content is our own config.
    script.textContent = JSON.stringify(block)
    document.head.appendChild(script)
  }
}

export function Seo() {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()
  const locale = i18n.language
  const { data: faqItems } = useLocalizedFaqItems()

  useEffect(() => {
    const seo = getSeoForPath(pathname)
    const canonical = `${SITE_URL}${seo.path === '/' ? '/' : seo.path}`
    const image = seo.image ?? OG_IMAGE

    document.title = seo.title

    upsertTag('meta', { key: 'name', value: 'description' }, { content: seo.description })
    upsertTag('link', { key: 'rel', value: 'canonical' }, { href: canonical })

    if (seo.noindex) {
      upsertTag('meta', { key: 'name', value: 'robots' }, { content: 'noindex, nofollow' })
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove()
    }

    // Open Graph
    upsertTag('meta', { key: 'property', value: 'og:type' }, { content: 'website' })
    upsertTag('meta', { key: 'property', value: 'og:site_name' }, { content: siteConfig.name })
    upsertTag('meta', { key: 'property', value: 'og:title' }, { content: seo.title })
    upsertTag('meta', { key: 'property', value: 'og:description' }, { content: seo.description })
    upsertTag('meta', { key: 'property', value: 'og:url' }, { content: canonical })
    upsertTag('meta', { key: 'property', value: 'og:image' }, { content: image })
    upsertTag('meta', { key: 'property', value: 'og:locale' }, { content: 'az_AZ' })

    // Twitter
    upsertTag(
      'meta',
      { key: 'name', value: 'twitter:card' },
      { content: 'summary_large_image' },
    )
    upsertTag('meta', { key: 'name', value: 'twitter:title' }, { content: seo.title })
    upsertTag(
      'meta',
      { key: 'name', value: 'twitter:description' },
      { content: seo.description },
    )
    upsertTag('meta', { key: 'name', value: 'twitter:image' }, { content: image })

    // Language alternates. The site serves all three languages from one URL,
    // so alternates are query-parameter variants rather than separate paths.
    upsertTag(
      'link',
      { key: 'hreflang', value: 'x-default' },
      { rel: 'alternate', href: canonical },
    )
    for (const lng of LOCALES) {
      upsertTag(
        'link',
        { key: 'hreflang', value: lng },
        {
          rel: 'alternate',
          href: lng === DEFAULT_LOCALE ? canonical : `${canonical}?lang=${lng}`,
        },
      )
    }

    // Pass the FAQ the page is actually rendering so the markup can't drift
    // from the visible content.
    setJsonLd(jsonLdForPage(seo, { faq: faqItems }))
  }, [pathname, locale, faqItems])

  return null
}
