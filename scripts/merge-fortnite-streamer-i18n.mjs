import { readFileSync, writeFileSync } from 'node:fs'

const lorePath = new URL('./data/fortnite-streamer-lore.json', import.meta.url)
const lore = JSON.parse(readFileSync(lorePath, 'utf8'))

const enPath = new URL('../src/features/i18n/locales/en.json', import.meta.url)
const ruPath = new URL('../src/features/i18n/locales/ru.json', import.meta.url)

const en = JSON.parse(readFileSync(enPath, 'utf8'))
const ru = JSON.parse(readFileSync(ruPath, 'utf8'))

en.projects.fortniteLoot = {
  label: 'Project 5',
  title: 'Fortnite streamer loot',
  subtitle:
    'Icon Series creator outfits and viral stream-era cosmetics — tap a slot to mark it collected.',
  filterAll: 'All categories',
  categories: {
    iconSeries: 'Icon Series creators',
    viralAndOg: 'Viral & OG stream meta',
  },
  items: {},
}

ru.projects.fortniteLoot = {
  label: 'Проект 5',
  title: 'Стримерский лут Fortnite',
  subtitle:
    'Icon Series от создателей и культовая косметика эры стримов — нажмите на слот, чтобы отметить «собрано».',
  filterAll: 'Все категории',
  categories: {
    iconSeries: 'Icon Series — стримеры',
    viralAndOg: 'Viral & OG мета стримов',
  },
  items: {},
}

for (const [localeKey, entry] of Object.entries(lore)) {
  en.projects.fortniteLoot.items[localeKey] = {
    description: entry.en.description,
    howToGet: entry.en.howToGet,
    funFact: entry.en.funFact,
  }
  ru.projects.fortniteLoot.items[localeKey] = {
    description: entry.ru.description,
    howToGet: entry.ru.howToGet,
    funFact: entry.ru.funFact,
  }
}

writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`)
writeFileSync(ruPath, `${JSON.stringify(ru, null, 2)}\n`)
console.log('Updated fortniteLoot i18n for', Object.keys(lore).length, 'items')
