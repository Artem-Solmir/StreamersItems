import { createWriteStream } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream'

/** @typedef {{ slug: string, kappaFile?: string, bsgId?: string }} AssetSpec */

/** @type {AssetSpec[]} */
const ASSETS = [
  { slug: 'nut-sack-balaclava', kappaFile: 'nut-sack-balaclava.webp' },
  { slug: 'domontovich-ushanka', kappaFile: 'domontovich-ushanka-hat.webp' },
  { slug: 'pestily-plague-mask', kappaFile: 'pestily-plague-mask.png' },
  { slug: 'shroud-half-mask', kappaFile: 'shroud-half-mask.png' },
  { slug: 'johnb-liquid-dnb-glasses', kappaFile: 'johnb-liquid-dnb-glasses.png' },
  { slug: 'viibiin-sneaker', kappaFile: 'viibiin-sneaker.png', bsgId: '66b37eb4acff495a29492407' },
  { slug: 'press-pass-noiceguy', kappaFile: 'press-pass-issued-for-noiceguy-.png' },
  { slug: 'raven-figurine', kappaFile: 'raven-figurine.png' },
  { slug: 'loot-lord-plushie', kappaFile: 'loot-lord-plushie.png' },
  { slug: 'mastichin-figurine', bsgId: '68f261f6928cd23ddf0471fd' },
  { slug: 'sheefgg-piggy-bank', kappaFile: 'sheefgg-piggy-bank.png' },
  { slug: 'politician-mutkevich-figurine', bsgId: '655c66e40b2de553b618d4b8' },
  { slug: 'ryzhy-figurine', bsgId: '655c67782a1356436041c9c5' },
  { slug: 'duck-figurine', bsgId: '697cddb414e932098005748d' },
  { slug: 'lm-kc-130-model-aircraft', kappaFile: 'lm-kc-130-model-aircraft.png' },
  { slug: 'bottle-of-ymxc-water', kappaFile: 'bottle-of-yxmc-water.png' },
  { slug: 'can-of-gigabeef-meat', kappaFile: 'can-of-gigabeef-meat.png' },
  { slug: 'french-bakery-baguette', kappaFile: 'french-bakery-baguette.png' },
  { slug: 'mr-holodilnick-thermal-bag', bsgId: '5c093db286f7740a1b2617e3' },
  { slug: 'inseq-gas-pipe-wrench', kappaFile: 'inseq-gas-pipe-wrench.png', bsgId: '66b37f114410565a8f6789e2' },
  { slug: 'fireklean-gun-lube', kappaFile: 'fireklean-gun-lube.png' },
  { slug: 'deadlyslob-beard-oil', kappaFile: 'deadlyslob-27s-beard-oil.png' },
  { slug: 'lvndmark-rat-poison', kappaFile: 'lvndmark-27s-rat-poison.png' },
  { slug: 'mazoni-golden-dumbbell', kappaFile: 'mazoni-golden-dumbbell.webp', bsgId: '6937edb912d456a817083e82' },
  { slug: 'tigzresq-splint', kappaFile: 'tigzresq-splint.webp' },
  { slug: 'missam-forklift-key', kappaFile: 'missam-forklift-key.png' },
  { slug: 'veritas-guitar-pick', kappaFile: 'veritas-guitar-pick.png' },
  { slug: 'dunduk-floppy-disk', kappaFile: 'dunduk-floppy-disk.png' },
  { slug: 'desmondpilak-cd', kappaFile: 'desmondpilak-cd.png' },
  { slug: 'cyborg-killer-vhs', kappaFile: 'video-cassette-with-the-cyborg-killer-movie.png' },
  { slug: 'silver-badge', kappaFile: 'silver-badge.png' },
  { slug: 'wz-wallet', kappaFile: 'wz-wallet.png' },
  { slug: 'battered-antique-book', kappaFile: 'battered-antique-book.png' },
]

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
