/**
 * High-quality Fortnite cosmetic renders via fortnite-api.com (Icon / viral streamer loot).
 * Run: node scripts/download-fortnite-streamer-images.mjs
 */
import { createWriteStream } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream'
import { fileURLToPath } from 'node:url'

const API = 'https://fortnite-api.com/v2/cosmetics/br/search/all'

/** @type {Array<[outFile: string, cosmeticName: string, kind: 'outfit' | 'emote']>} */
const ASSETS = [
  ['ninja-outfit.png', 'Ninja', 'outfit'],
  ['bugha-outfit.png', 'Bugha', 'outfit'],
  ['loserfruit-outfit.png', 'Loserfruit', 'outfit'],
  ['thegrefg-outfit.png', 'TheGrefg', 'outfit'],
  ['renegade-raider-outfit.png', 'Renegade Raider', 'outfit'],
  ['boogie-down-emote.png', 'Boogie Down', 'emote'],
  ['orange-justice-emote.png', 'Orange Justice', 'emote'],
]

const OUT = new URL('../public/items/fortnite/', import.meta.url)

const download = async (url, destPath) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${response.status} ${url}`)
  }
  await pipeline(Readable.fromWeb(response.body), createWriteStream(destPath))
}

const findCosmetic = async (name) => {
  const response = await fetch(`${API}?name=${encodeURIComponent(name)}`)
  if (!response.ok) {
    throw new Error(`search ${response.status} for ${name}`)
  }
  const json = await response.json()
  const list = json.data ?? []
  const exact = list.find(
    (entry) => entry.name?.toLowerCase() === name.toLowerCase(),
  )
  if (!exact) {
    throw new Error(`cosmetic not found: ${name}`)
  }
  return exact
}

await mkdir(OUT, { recursive: true })

for (const [file, cosmeticName, kind] of ASSETS) {
  const cosmetic = await findCosmetic(cosmeticName)
  const url =
    kind === 'outfit'
      ? cosmetic.images?.featured ?? cosmetic.images?.icon
      : cosmetic.images?.icon ?? cosmetic.images?.featured
  if (!url) {
    throw new Error(`no image URL for ${cosmeticName}`)
  }
  const dest = fileURLToPath(new URL(file, OUT))
  await download(url, dest)
  console.log('ok', file, '←', cosmetic.id)
}
