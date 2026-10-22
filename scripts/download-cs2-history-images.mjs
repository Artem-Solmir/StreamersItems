/**
 * Downloads CS2 history item icons (Steam economy CDN, 360×360).
 * Run: node scripts/download-cs2-history-images.mjs
 */
import { mkdir, writeFileSync } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import { createWriteStream } from 'node:fs'
import { Readable } from 'node:stream'

const OUT = new URL('../public/items/cs2/', import.meta.url)

/** @type {Array<[filename: string, imageHash: string]>} */
const ASSETS = [
  [
    'm4-howl.png',
    'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afVSKP-EAm6extF6ueZhW2exwkl2tmTXwt39eCiUPQR2DMN4TOVetUK8xoLgM-K341eM2otDnC6okGoXufBz_TAB',
  ],
  [
    'bizon-judgement-anubis.png',
    'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzl4zv8x1Y-s2sYb5iLs-QG3WDxNF6ueZhW2fkzU0isDvTnomsdS7BbwF0A8ElROJfshC8wN3jYu-2tQ3c2osTxCitkGoXuVioOA3_',
  ],
  [
    'graffiti-flying-awper.png',
    'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOW6a50NmptelvBb0SBrOnZns-The_fPgP_Y9c6TFXjKRwrtztOQxHH_nlk10tWrdmYupIiqQbwMjDZN4Qe9buw74zIPJjQvaLw',
  ],
  [
    'graffiti-defuse-in-fire.png',
    'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOHaC619h7dempVfuTxfwoZLl-zdI6rz4bqdpIvXBDWaWmb4i4edsTiviwU5xtm3VyduqcH-QaFIpDMB2F-IIrFDmxbUfpdCm',
  ],
  [
    'sticker-dickstacy.png',
    'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMGgIXSA7FVwptelsxb0SBrOmp_j9jFP7vG3JvY5JqGQXTLHk-8usbc8GHiwxk93sGWDyImsc3uQbwUoCJF5QeUMsRmm0oqwBnIR3mc',
  ],
  [
    'sticker-howl.png',
    'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmuOHaC619h7delpVHoVhH4kJHf-SNM4bz9bKY_dPWQWDCUkLxy57g_H3DgkB5w42uAzIv4I3meOAQlApdwFO5YrFDmxUNp_lL7',
  ],
  [
    'music-ez4ence.png',
    'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIijyEKzb_3d19nuIXOS81Nn_4z1-ErYEUy_ncG2pHQC66qtOfBsefHEWmTHkOgmtLRsSSq2w0ly4DvSmNipIy2TbRhgVMXK454YZg',
  ],
  [
    'inferno-banana-barrels.png',
    'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjNmxJ3KZ4gQlptW741fhRA__kank9C1J7v-vV6JiKfzdDTHElb0g5rdoS3i3w0wm42vTy9iqJX6ePVckWZclTLQJtxWxl4XhY_SiuVJSvkiJVQ',
  ],
  [
    'overpass-olof-boost.png',
    'i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJai0ki7VeTHjMmyMnTGtRl64oLm-lj0UiLzoZDv9C4V7fT7PaY0efPGDzfJl-0gsbBrGH_izRl3527Rnt77JHnGPVV1DJF2F_lK7EfhTMCN_A',
  ],
]

mkdir(OUT, { recursive: true }, () => {})

for (const [file, hash] of ASSETS) {
  const url = `https://community.cloudflare.steamstatic.com/economy/image/${hash}/360fx360f`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${file}: ${response.status}`)
  }
  const dest = new URL(file, OUT)
  await pipeline(Readable.fromWeb(response.body), createWriteStream(dest))
  console.log('ok', file)
}
