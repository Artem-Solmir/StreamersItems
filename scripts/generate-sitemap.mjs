/**
 * Generates public/sitemap.xml and public/robots.txt from catalog data.
 * Run: node scripts/generate-sitemap.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const ROOT = new URL('../', import.meta.url)
const SITE_URL = (
  process.env.VITE_SITE_URL ?? 'https://streamersitems.vercel.app'
).replace(/\/+$/, '')

const LOCALES = ['en', 'ru']

const readJsonIds = (relativePath) => {
  const raw = readFileSync(new URL(relativePath, ROOT), 'utf8')
  const data = JSON.parse(raw)
  return data.map((entry) => entry.id)
}

const readCs2Ids = () => {
  const raw = readFileSync(
    new URL('../src/features/projects/data/project-01-cs2-loadouts.ts', import.meta.url),
    'utf8',
  )
  return [...raw.matchAll(/item\('([^']+)'/g)].map((match) => match[1])
}

const projectSlugs = [
  'cs2-streamer-loadouts',
  'escape-from-tarkov-streamer-loot',
  'rust-streamer-loot',
  'dead-by-daylight-streamer-loot',
]

const itemIds = [
  ...readCs2Ids(),
  ...readJsonIds('src/features/projects/data/tarkov-collector-items.json'),
  ...readJsonIds('src/features/projects/data/rust-streamer-items.json'),
  ...readJsonIds('src/features/projects/data/dbd-streamer-items.json'),
]

const uniqueItemIds = [...new Set(itemIds)]

const paths = []
for (const locale of LOCALES) {
  paths.push(`/${locale}`)
  paths.push(`/${locale}/suggest-items`)
  for (const slug of projectSlugs) {
    paths.push(`/${locale}/games/${slug}`)
  }
  for (const id of uniqueItemIds) {
    paths.push(`/${locale}/items/${id}`)
  }
}

const urlEntries = paths
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${path.includes('/items/') ? '0.8' : '0.9'}</priority>
  </url>`,
  )
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

writeFileSync(new URL('public/sitemap.xml', ROOT), sitemap, 'utf8')
writeFileSync(new URL('public/robots.txt', ROOT), robots, 'utf8')

console.log(
  `sitemap: ${paths.length} URLs (${uniqueItemIds.length} items × ${LOCALES.length} locales)`,
)
