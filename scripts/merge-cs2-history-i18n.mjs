import { readFileSync, writeFileSync } from 'node:fs'

const lorePath = new URL('./data/cs2-history-lore.json', import.meta.url)
const lore = JSON.parse(readFileSync(lorePath, 'utf8'))

const enPath = new URL('../src/features/i18n/locales/en.json', import.meta.url)
const ruPath = new URL('../src/features/i18n/locales/ru.json', import.meta.url)

const en = JSON.parse(readFileSync(enPath, 'utf8'))
const ru = JSON.parse(readFileSync(ruPath, 'utf8'))

en.projects.cs2Loadouts.subtitle =
  'Streamer loadouts plus CS2 skins, graffiti, stickers, and map legends — tap a slot to mark it collected.'
en.projects.cs2Loadouts.filterAll = 'All categories'
en.projects.cs2Loadouts.categories = {
  streamerLoadouts: 'Streamer loadouts',
  skinsGraffiti: 'Skins & graffiti with history',
  stickersMusic: 'Stickers, music & kits',
  mapLegends: 'Legendary map lore',
}

ru.projects.cs2Loadouts.subtitle =
  'Loadout стримеров и легенды CS2 — скины, граффити, наклейки и мемы карт. Нажмите на слот, чтобы отметить «собрано».'
ru.projects.cs2Loadouts.filterAll = 'Все категории'
ru.projects.cs2Loadouts.categories = {
  streamerLoadouts: 'Loadout стримеров',
  skinsGraffiti: 'Скины и граффити с историей',
  stickersMusic: 'Наклейки, музыка и наборы',
  mapLegends: 'Легендарный внутриигровой мусор',
}

for (const [localeKey, entry] of Object.entries(lore)) {
  en.projects.cs2Loadouts.items[localeKey] = {
    description: entry.en.description,
    funFact: entry.en.funFact,
  }
  ru.projects.cs2Loadouts.items[localeKey] = {
    description: entry.ru.description,
    funFact: entry.ru.funFact,
  }
}

writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`)
writeFileSync(ruPath, `${JSON.stringify(ru, null, 2)}\n`)
console.log('Merged', Object.keys(lore).length, 'CS2 history items into i18n')
