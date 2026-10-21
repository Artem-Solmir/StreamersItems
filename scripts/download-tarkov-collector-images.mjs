import { createWriteStream } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream'
import { readFileSync } from 'node:fs'

/** @typedef {{ slug: string, kappaFile?: string, bsgId?: string }} AssetSpec */

const catalog = JSON.parse(
  readFileSync(
    new URL('../src/features/projects/data/tarkov-collector-items.json', import.meta.url),
    'utf8',
  ),
)

/** @type {Record<string, { kappaFile?: string, bsgId?: string }>} */
const KAPPA_OVERRIDES = {
  'domontovich-ushanka.webp': { kappaFile: 'domontovich-ushanka-hat.webp' },
  'bottle-of-ymxc-water.png': { kappaFile: 'bottle-of-yxmc-water.png' },
  'can-of-dr-lupo-coffee-beans.png': {
    kappaFile: 'can-of-dr-lupo-27s-coffee-beans.png',
  },
  'can-of-ratcola-soda.webp': { kappaFile: 'can-of-ratcola-soda.webp' },
  'deadlyslob-beard-oil.png': { kappaFile: 'deadlyslob-27s-beard-oil.png' },
  'lvndmark-rat-poison.png': { kappaFile: 'lvndmark-27s-rat-poison.png' },
  'baddie-red-beard.png': { kappaFile: 'baddie-27s-red-beard.png' },
  'cyborg-killer-vhs.png': {
    kappaFile: 'video-cassette-with-the-cyborg-killer-movie.png',
  },
  'viibiin-sneaker.png': { bsgId: '66b37eb4acff495a29492407' },
  'inseq-gas-pipe-wrench.png': { bsgId: '66b37f114410565a8f6789e2' },
  'tamatthi-kunai-replica.png': {
    kappaFile: 'tamatthi-kunai-knife-replica.png',
  },
}

/** @type {AssetSpec[]} */
const ASSETS = catalog.map((entry) => {
  const slug = entry.file.replace(/\.(webp|png|jpg)$/i, '')
  const override = KAPPA_OVERRIDES[entry.file] ?? {}
  return {
    slug,
    kappaFile: override.kappaFile ?? entry.file,
    bsgId: override.bsgId,
  }
})

const OUT_DIR = new URL('../public/items/tarkov/collector/', import.meta.url)

const download = async (url, destPath) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${response.status} ${url}`)
  }
  await pipeline(Readable.fromWeb(response.body), createWriteStream(destPath))
}

await mkdir(OUT_DIR, { recursive: true })

for (const asset of ASSETS) {
  const extFromKappa = asset.kappaFile?.split('.').pop() ?? 'webp'
  let saved = false

  if (asset.kappaFile) {
    const dest = new URL(`${asset.slug}.${extFromKappa}`, OUT_DIR)
    try {
      await download(
        `https://kappatracker.com/images/${asset.kappaFile}`,
        dest.pathname,
      )
      console.log('kappa', asset.slug)
      saved = true
    } catch {
      // try tarkov.dev next
    }
  }

  if (!saved && asset.bsgId) {
    const dest = new URL(`${asset.slug}.webp`, OUT_DIR)
    await download(
      `https://assets.tarkov.dev/${asset.bsgId}-512.webp`,
      dest.pathname,
    )
    console.log('tarkov', asset.slug)
    continue
  }

  if (!saved) {
    console.error('FAILED', asset.slug)
    process.exitCode = 1
  }
}
