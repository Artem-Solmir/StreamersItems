import { readFileSync, writeFileSync } from 'node:fs'

const lorePath = new URL('./data/dbd-streamer-lore.json', import.meta.url)
const lore = JSON.parse(readFileSync(lorePath, 'utf8'))

const enPath = new URL('../src/features/i18n/locales/en.json', import.meta.url)
const ruPath = new URL('../src/features/i18n/locales/ru.json', import.meta.url)

const en = JSON.parse(readFileSync(enPath, 'utf8'))
const ru = JSON.parse(readFileSync(ruPath, 'utf8'))

en.projects.dbdLoot = {
  label: 'Project 4',
  title: 'Dead by Daylight streamer loot',
  subtitle:
    'Charms and legendary streamer cosmetics in the Fog — tap a slot to mark it collected.',
  filterAll: 'All categories',
  categories: {
    charms: 'Charms',
    merch: 'Legendary streamer merch',
  },
  items: {},
}

ru.projects.dbdLoot = {
  label: 'Проект 4',
  title: 'Стримерский лут Dead by Daylight',
  subtitle:
    'Амулеты и легендарный стримерский мерч в Тумане — нажмите на слот, чтобы отметить «собрано».',
  filterAll: 'Все категории',
  categories: {
    charms: 'Амулеты',
    merch: 'Легендарный стримерский мерч',
  },
  items: {},
}

for (const [localeKey, entry] of Object.entries(lore)) {
  en.projects.dbdLoot.items[localeKey] = {
    description: entry.en.description,
    howToGet: entry.en.howToGet,
    funFact: entry.en.funFact,
  }
  ru.projects.dbdLoot.items[localeKey] = {
    description: entry.ru.description,
    howToGet: entry.ru.howToGet,
    funFact: entry.ru.funFact,
  }
}

en.inventory.howToGetLabel = 'How to get'
ru.inventory.howToGetLabel = 'Как получить'

writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`)
writeFileSync(ruPath, `${JSON.stringify(ru, null, 2)}\n`)
console.log('Updated dbdLoot i18n for', Object.keys(lore).length, 'items')
