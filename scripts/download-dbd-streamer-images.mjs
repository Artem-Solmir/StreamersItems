/**
 * Downloads DBD streamer item UI icons (official wiki.gg filenames from game assets).
 * Run: node scripts/download-dbd-streamer-images.mjs
 */
import { createWriteStream } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream'
import { fileURLToPath } from 'node:url'

const WIKI = 'https://deadbydaylight.wiki.gg/images'

/** @type {Array<[outFile: string, wikiFile: string]>} */
const ASSETS = [
  ['warrior-puppers-charm.png', 'PL_053.png'],
  ['vic-viper-charm.png', 'WA_002.png'],
  ['pandatv-shirt.png', 'DF_Torso04_PandaTVKraken.png'],
  ['h2o-delirious-mask.png', 'Trapper_Head_H20.png'],
  ['twitch-claudette-hoodie.png', 'CM_Torso04_01.png'],
]

const OUT = new URL('../public/items/dbd/', import.meta.url)

const download = async (url, destPath) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${response.status} ${url}`)
  }
  await pipeline(Readable.fromWeb(response.body), createWriteStream(destPath))
}

await mkdir(OUT, { recursive: true })

for (const [file, wikiFile] of ASSETS) {
  const url = `${WIKI}/${encodeURIComponent(wikiFile)}`
  const dest = fileURLToPath(new URL(file, OUT))
  await download(url, dest)
  console.log('ok', file)
}
