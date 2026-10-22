/**
 * Downloads Rust streamer item icons (wiki.rustclash.com + Steam market).
 * Run: node scripts/download-rust-streamer-images.mjs
 */
import { mkdir } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { createWriteStream } from 'node:fs'
import { Readable } from 'node:stream'

const OUT = new URL('../public/items/rust/', import.meta.url)
const RUSTCLASH = 'https://wiki.rustclash.com/img/items180'
const STEAM_IMG = 'https://community.cloudflare.steamstatic.com/economy/image'

/** @type {Array<[outFile: string, url: string]>} */
const ASSETS = [
  [`ninja-suit.png`, `${RUSTCLASH}/attire.ninja.suit.png`],
  [
    `big-grin-facemask.png`,
    `${STEAM_IMG}/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Fe5GLEfCk4nReh8DEiv5daPq0_qrw_QfG9O-tu0Dw/360fx360f`,
  ],
  [`mp5-oil-rats.png`, `${RUSTCLASH}/smg.mp5.png`],
  [`ak-trainwreck.png`, `${RUSTCLASH}/rifle.ak.png`],
  [`hobo-barrel.png`, `${RUSTCLASH}/hobobarrel.png`],
  [`industrial-door.png`, `${RUSTCLASH}/door.hinged.industrial.a.png`],
  [`poko-plush.png`, `${RUSTCLASH}/hazmat.plushy.png`],
]

mkdir(OUT, { recursive: true }, () => {})

for (const [file, url] of ASSETS) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${file}: ${response.status} ${url}`)
  }
  const dest = new URL(file, OUT)
  await pipeline(Readable.fromWeb(response.body), createWriteStream(dest))
  console.log('ok', file)
}
