/**
 * Rasterizes public/og-image.svg into a real JPG. SVG is the design source
 * (edit that), but X, LinkedIn and WhatsApp all handle SVG og:image
 * unreliably, so a rasterized JPG is what actually gets served to crawlers.
 *
 * Run after editing public/og-image.svg:
 *   node scripts/gen-og-image.mjs
 */

import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const svgPath = join(root, 'public/og-image.svg')
const outPath = join(root, 'public/og-image.jpg')

const svg = await readFile(svgPath)
await sharp(svg, { density: 220 })
  .resize(1200, 630)
  .flatten({ background: '#0c2340' })
  .jpeg({ quality: 90 })
  .toFile(outPath)

console.log(`Wrote ${outPath}`)
