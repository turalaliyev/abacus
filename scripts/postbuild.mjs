/**
 * Post-build SEO step.
 *
 * Vite emits a single dist/index.html shell. Crawlers that don't execute
 * JavaScript — most notably the Facebook, WhatsApp and LinkedIn link-preview
 * fetchers — see only that shell, so every route would share one title and one
 * description. This script fixes that by writing a real static HTML file per
 * route with its own <head>, plus a crawlable content fallback inside #root.
 *
 * The app mounts with createRoot(), which replaces the container's contents,
 * so the fallback markup is discarded the moment React boots. Users never see
 * it; crawlers without JS do.
 *
 * Route metadata comes from src/lib/seo.ts — the same module the running app
 * uses — via Node's native TypeScript type-stripping. One source of truth.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  DEFAULT_LOCALE,
  LOCALES,
  OG_IMAGE,
  SITE_URL,
  allRoutes,
  jsonLdForPage,
} from '../src/lib/seo.ts'
import { navItems, siteConfig } from '../src/data/content.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

// Netlify injects env vars directly; locally they live in .env. Either is fine,
// and a missing file just means the FAQ falls back to the static list.
try {
  process.loadEnvFile(join(root, '.env'))
} catch {
  /* no .env — expected in CI */
}

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/** JSON-LD sits in a <script>, so only the closing-tag sequence is dangerous. */
const escJsonLd = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c')

function headFor(seo, faq) {
  const canonical = `${SITE_URL}${seo.path === '/' ? '/' : seo.path}`
  const image = seo.image ?? OG_IMAGE
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<link rel="canonical" href="${esc(canonical)}" />`,

    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(siteConfig.name)}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${esc(canonical)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:locale" content="az_AZ" />`,

    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,

    `<link rel="alternate" hreflang="x-default" href="${esc(canonical)}" />`,
    ...LOCALES.map(
      (lng) =>
        `<link rel="alternate" hreflang="${lng}" href="${esc(
          lng === DEFAULT_LOCALE ? canonical : `${canonical}?lang=${lng}`,
        )}" />`,
    ),
  ]

  for (const block of jsonLdForPage(seo, { faq })) {
    tags.push(`<script type="application/ld+json" data-seo-jsonld>${escJsonLd(block)}</script>`)
  }

  return tags.join('\n    ')
}

/** Flat list of every internal link, so a no-JS crawler can reach each page. */
function crawlableNav() {
  const links = []
  for (const item of navItems) {
    links.push(`<a href="${esc(item.href)}">${esc(item.label)}</a>`)
    for (const child of item.children ?? []) {
      links.push(`<a href="${esc(child.href)}">${esc(child.label)}</a>`)
    }
  }
  return links.join('\n        ')
}

/**
 * Static markup placed inside #root. React replaces it on mount, so it only
 * ever reaches crawlers and users with JavaScript disabled.
 */
function fallbackBody(seo) {
  const trail = [{ name: 'Əsas', path: '/' }, ...(seo.breadcrumb ?? [])]
  return `
      <div id="seo-fallback">
        <nav aria-label="Naviqasiya">
        ${crawlableNav()}
        </nav>
        <nav aria-label="Səhifə yolu">
        ${trail.map((c) => `<a href="${esc(c.path)}">${esc(c.name)}</a>`).join('\n        ')}
        </nav>
        <main>
          <h1>${esc(seo.title.replace(/\s*\|\s*Abacus Audit$/, ''))}</h1>
          <p>${esc(seo.description)}</p>
        </main>
        <footer>
          <p>${esc(siteConfig.legalName)}</p>
          <address>${esc(siteConfig.address.full)}</address>
          <p><a href="tel:${esc(siteConfig.phone.replace(/\s/g, ''))}">${esc(siteConfig.phone)}</a></p>
          <p><a href="mailto:${esc(siteConfig.email)}">${esc(siteConfig.email)}</a></p>
          <p>${esc(siteConfig.hours.days)} ${esc(siteConfig.hours.time)}</p>
        </footer>
      </div>`
}

function buildPage(shell, seo, faq) {
  let html = shell

  // Drop the shell's generic title/description so they can't compete.
  // Anchored to the start of a line (a real tag always is) so this can't
  // latch onto the word "<title>" if it ever appears inside prose in an
  // HTML comment above it — that previously ate everything through the
  // real tag's closing bracket, including the comment's own "-->", which
  // left the rest of the document — app script included — inside an
  // unterminated comment and rendered a blank page.
  html = html.replace(/^[ \t]*<title>[\s\S]*?<\/title>[ \t]*\n?/im, '')
  html = html.replace(/^[ \t]*<meta\s+name="description"[^>]*>[ \t]*\n?/im, '')

  html = html.replace('</head>', `  ${headFor(seo, faq)}\n  </head>`)
  html = html.replace('<div id="root"></div>', `<div id="root">${fallbackBody(seo)}</div>`)

  return html
}

function sitemap(routes) {
  const today = new Date().toISOString().slice(0, 10)
  const priority = (path) => (path === '/' ? '1.0' : path.split('/').length > 2 ? '0.7' : '0.8')

  const urls = routes
    .map(
      (r) => `  <url>
    <loc>${esc(`${SITE_URL}${r.path === '/' ? '/' : r.path}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority(r.path)}</priority>
  </url>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
}

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

/**
 * Pulls the published FAQ so the prerendered FAQPage markup matches what the
 * CMS will render. Any failure (offline build, table not created yet) falls
 * back to the static list rather than breaking the build.
 */
async function fetchFaq() {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) return undefined

  try {
    const res = await fetch(
      `${url}/rest/v1/faq_items?select=question,answer&is_published=eq.true&order=sort_order`,
      { headers: { apikey: key, Authorization: `Bearer ${key}` } },
    )
    if (!res.ok) return undefined
    const rows = await res.json()
    return Array.isArray(rows) && rows.length ? rows : undefined
  } catch {
    return undefined
  }
}

async function main() {
  const shellPath = join(dist, 'index.html')
  const shell = await readFile(shellPath, 'utf8')
  const routes = allRoutes()

  const faq = await fetchFaq()
  console.log(faq ? `SEO: FAQ schema from CMS (${faq.length})` : 'SEO: FAQ schema from static fallback')

  for (const seo of routes) {
    const html = buildPage(shell, seo, faq)
    const outPath =
      seo.path === '/' ? shellPath : join(dist, seo.path.replace(/^\//, ''), 'index.html')

    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, html, 'utf8')
  }

  await writeFile(join(dist, 'sitemap.xml'), sitemap(routes), 'utf8')
  await writeFile(join(dist, 'robots.txt'), robots, 'utf8')

  console.log(`SEO: prerendered ${routes.length} routes + sitemap.xml + robots.txt`)
}

await main()
