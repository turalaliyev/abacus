/**
 * Single source of truth for page metadata and structured data.
 *
 * Imported by the React app at runtime (the <Seo> component) *and* by the
 * build scripts in /scripts, which run it through Node's native TypeScript
 * type-stripping. Keep this file to erasable syntax only — no enums, no
 * parameter properties, no namespaces.
 */

// Explicit .ts extension: Node's ESM loader needs it when scripts/postbuild.mjs
// imports this module. Vite and tsc (allowImportingTsExtensions) both accept it.
import { faqItems, services, siteConfig } from '../data/content.ts'
import { serviceImageUrl } from './serviceSlug.ts'

export const SITE_URL = siteConfig.url
export const DEFAULT_LOCALE = 'az'
export const LOCALES = ['az', 'en', 'ru'] as const

/**
 * Social share image. `public/og-image.svg` is the design source; run
 * `node scripts/gen-og-image.mjs` after editing it to refresh the rasterized
 * JPG actually served here — X, LinkedIn and WhatsApp handle SVG unreliably.
 */
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`

export type PageSeo = {
  title: string
  description: string
  /** Canonical path, always starting with "/". */
  path: string
  /** Extra JSON-LD blocks for this page, beyond the site-wide ones. */
  jsonLd?: Record<string, unknown>[]
  /** Trail for BreadcrumbList; the home crumb is added automatically. */
  breadcrumb?: { name: string; path: string }[]
  /** Page-specific social share image (absolute URL). Falls back to OG_IMAGE. */
  image?: string
  /** Unmatched paths render this same route with a 200, so crawlers need an explicit signal to skip it. */
  noindex?: boolean
}

const BRAND = 'Abacus Audit'

function t(title: string) {
  return `${title} | ${BRAND}`
}

/** Static pages. Service detail pages are generated below. */
const staticPages: Record<string, Omit<PageSeo, 'path'>> = {
  '/': {
    title: 'Abacus Audit — Bakıda audit, vergi və mühasibatlıq xidmətləri',
    description:
      'Azərbaycan Auditorlar Palatasının üzvü (AT/135). Audit, vergi uçotu, mühasibatlıq, konsaltinq, kadr kargüzarlığı və miqrasiya xidmətləri. 2017-ci ildən Bakıda.',
  },
  '/haqqimizda': {
    title: t('Haqqımızda'),
    description:
      '2017-ci ildən fəaliyyət göstərən Abacus Audit And Consulting MMC — audit, mühasibat, vergi, hüquq və idarəetmə məsləhətləri üzrə aparıcı şirkətlərdən biri.',
    breadcrumb: [{ name: 'Haqqımızda', path: '/haqqimizda' }],
  },
  '/niye-biz': {
    title: t('Niyə biz'),
    description:
      'Zəngin iş təcrübəsi, ixtisaslı heyət, çoxsəviyyəli keyfiyyətə nəzarət, kompleks yanaşma və çoxfaktorlu qiymət siyasəti — Abacus Audit-i seçməyin 5 səbəbi.',
    breadcrumb: [{ name: 'Niyə biz', path: '/niye-biz' }],
  },
  '/partnyorlar': {
    title: t('Partnyorlarımız'),
    description:
      'Bizə etibar edən dövlət qurumları və özəl şirkətlər — Bakı Beynəlxalq Dəniz Ticarət Limanı, Dövlət İmtahan Mərkəzi, Aqrar Sığorta Fondu və digərləri.',
    breadcrumb: [{ name: 'Partnyorlarımız', path: '/partnyorlar' }],
  },
  '/xidmetler': {
    title: t('Xidmətlər'),
    description:
      'Audit, vergi uçotu, mühasibatlıq, konsaltinq, qiymətləndirmə, hüquqi xidmətlər, şirkət qeydiyyatı, kadr kargüzarlığı və miqrasiya — 9 istiqamət üzrə tam həllər.',
    breadcrumb: [{ name: 'Xidmətlər', path: '/xidmetler' }],
  },
  '/bloq': {
    title: t('Bloq'),
    description:
      'Audit, vergi və mühasibatlıq sahəsində xəbərlər, qanunvericilik dəyişiklikləri və peşəkar izahlar.',
    breadcrumb: [{ name: 'Bloq', path: '/bloq' }],
  },
  '/bloq/xeberler': {
    title: t('Xəbərlər'),
    description: 'Abacus Audit-dən və audit-konsaltinq sahəsindən ən son xəbərlər və yeniliklər.',
    breadcrumb: [
      { name: 'Bloq', path: '/bloq' },
      { name: 'Xəbərlər', path: '/bloq/xeberler' },
    ],
  },
  '/bloq/qanunvericilik': {
    title: t('Qanunvericilik'),
    description:
      'Vergi, əmək və mühasibat uçotu qanunvericiliyindəki dəyişikliklər və onların biznesə təsirinin peşəkar izahı.',
    breadcrumb: [
      { name: 'Bloq', path: '/bloq' },
      { name: 'Qanunvericilik', path: '/bloq/qanunvericilik' },
    ],
  },
  '/akademiya': {
    title: t('Abacus Akademiya'),
    description:
      'Maliyyə və mühasibatlıq, insan resursları və dövlət satınalmaları üzrə praktiki təlim proqramları və pulsuz bilik testi.',
    breadcrumb: [{ name: 'Akademiya', path: '/akademiya' }],
  },
  '/kalkulyator': {
    title: t('Əmək haqqı kalkulyatoru 2026'),
    description:
      '2026-cı il üzrə əmək haqqından tutulmaların onlayn hesablanması. GROSS-dan NET-ə və NET-dən GROSS-a: gəlir vergisi, DSMF, işsizlik və tibbi sığorta.',
    breadcrumb: [{ name: 'Kalkulyator', path: '/kalkulyator' }],
  },
  '/elaqe': {
    title: t('Əlaqə'),
    description: `Bakı şəhəri, ${siteConfig.address.district}, ${siteConfig.address.street}. Tel: ${siteConfig.phone}. İş saatları: ${siteConfig.hours.days} ${siteConfig.hours.time}.`,
    breadcrumb: [{ name: 'Əlaqə', path: '/elaqe' }],
  },
  '/muraciet': {
    title: t('Müraciət və təklif'),
    description:
      'Layihəniz barədə qısa məlumat verin — komandamız bir iş günü ərzində sizinlə əlaqə saxlayıb uyğun həll və qiymət təklifi hazırlasın.',
    breadcrumb: [{ name: 'Müraciət', path: '/muraciet' }],
  },
}

function serviceSeo(service: (typeof services)[number]): PageSeo {
  const path = `/xidmetler/${service.slug}`
  const image = `${SITE_URL}${serviceImageUrl(service.slug)}`
  return {
    path,
    title: t(service.title),
    description: service.summary,
    image,
    breadcrumb: [
      { name: 'Xidmətlər', path: '/xidmetler' },
      { name: service.title, path },
    ],
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.summary,
        serviceType: service.title,
        url: `${SITE_URL}${path}`,
        image,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: 'Azərbaycan' },
      },
    ],
  }
}

/** Every canonical path on the site, in sitemap order. */
export function allRoutes(): PageSeo[] {
  const statics = Object.entries(staticPages).map(([path, meta]) => ({ ...meta, path }))
  const serviceRoutes = services.map(serviceSeo)
  // Slot the service detail pages directly after /xidmetler.
  const idx = statics.findIndex((r) => r.path === '/xidmetler')
  return [...statics.slice(0, idx + 1), ...serviceRoutes, ...statics.slice(idx + 1)]
}

export function getSeoForPath(pathname: string): PageSeo {
  const path = pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname

  const serviceMatch = /^\/xidmetler\/([^/]+)$/.exec(path)
  if (serviceMatch) {
    const service = services.find((s) => s.slug === serviceMatch[1])
    if (service) return serviceSeo(service)
  }

  const staticMatch = staticPages[path]
  if (staticMatch) return { ...staticMatch, path }

  return {
    path,
    title: t('Səhifə tapılmadı'),
    description: 'Axtardığınız səhifə mövcud deyil və ya köçürülüb.',
    noindex: true,
  }
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

/** Site-wide Organization + LocalBusiness node, referenced by @id elsewhere. */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'AccountingService'],
    '@id': `${SITE_URL}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: OG_IMAGE,
    description:
      'Azərbaycanda audit, vergi uçotu, mühasibatlıq, konsaltinq, hüquqi xidmətlər, kadr kargüzarlığı və miqrasiya xidmətləri göstərən auditor-konsaltinq şirkəti.',
    foundingDate: String(siteConfig.foundedYear),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.district,
      addressCountry: siteConfig.address.country,
    },
    openingHours: siteConfig.hours.schema,
    priceRange: '$$',
    areaServed: { '@type': 'Country', name: 'Azərbaycan' },
    availableLanguage: ['az', 'en', 'ru'],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'license',
      identifier: siteConfig.license.number,
      recognizedBy: { '@type': 'Organization', name: siteConfig.license.authority },
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.phone,
        contactType: 'customer service',
        areaServed: 'AZ',
        availableLanguage: ['az', 'en', 'ru'],
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Xidmətlər',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.summary,
          url: `${SITE_URL}/xidmetler/${s.slug}`,
        },
      })),
    },
  }
}

export function websiteJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: siteConfig.name,
    inLanguage: 'az',
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export type FaqEntry = { question: string; answer: string }

/**
 * Google requires FAQ markup to match the FAQ a visitor actually sees, so the
 * caller passes in whatever the page is rendering — the live CMS rows at
 * runtime, or the same rows fetched at build time. The static list is only the
 * fallback.
 */
export function faqJsonLd(items: readonly FaqEntry[] = faqItems): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]): Record<string, unknown> {
  const crumbs = [{ name: 'Əsas', path: '/' }, ...trail]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path === '/' ? '' : c.path}`,
    })),
  }
}

/** Every JSON-LD block that belongs on a given page. */
export function jsonLdForPage(
  seo: PageSeo,
  options: { faq?: readonly FaqEntry[] } = {},
): Record<string, unknown>[] {
  const blocks: Record<string, unknown>[] = []

  if (seo.path === '/') {
    blocks.push(organizationJsonLd(), websiteJsonLd(), faqJsonLd(options.faq))
  }
  if (seo.breadcrumb?.length) {
    blocks.push(breadcrumbJsonLd(seo.breadcrumb))
  }
  if (seo.jsonLd?.length) {
    blocks.push(...seo.jsonLd)
  }
  return blocks
}
