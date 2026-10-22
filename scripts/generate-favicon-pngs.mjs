/**
 * Rasterize public/favicon.svg to PNG sizes + favicon.ico
 * Run: node scripts/generate-favicon-pngs.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { Resvg } from '@resvg/resvg-js'
import pngToIco from 'png-to-ico'

const svgPath = new URL('../public/favicon.svg', import.meta.url)
const svg = readFileSync(svgPath)

const render = (size) => {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
  })
  return resvg.render().asPng()
}

const sizes = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]

const publicDir = new URL('../public/', import.meta.url)

for (const [name, size] of sizes) {
  const out = new URL(name, publicDir)
  writeFileSync(out, render(size))
  console.log('wrote', name)
}

const ico = await pngToIco([
  new URL('favicon-16x16.png', publicDir).pathname,
  new URL('favicon-32x32.png', publicDir).pathname,
])
writeFileSync(new URL('favicon.ico', publicDir), ico)
console.log('wrote favicon.ico')
