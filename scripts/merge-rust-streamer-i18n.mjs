import { readFileSync, writeFileSync } from 'node:fs'

const lorePath = new URL('./data/rust-streamer-lore.json', import.meta.url)
const lore = JSON.parse(readFileSync(lorePath, 'utf8'))

const enPath = new URL('../src/features/i18n/locales/en.json', import.meta.url)
const ruPath = new URL('../src/features/i18n/locales/ru.json', import.meta.url)

const en = JSON.parse(readFileSync(enPath, 'utf8'))
const ru = JSON.parse(readFileSync(ruPath, 'utf8'))

en.projects.rustLoot = {
  label: 'Project 3',
  title: 'Rust streamer drops & lore',
  subtitle:
    'Twitch drops and streamer skins in Rust — armor, «legal» sights, and base gadgets. Tap a slot to mark it collected.',
  filterAll: 'All categories',
  categories: {
    armorCamo: 'Streamer armor & camouflage',
    weaponsSights: 'Weapons with «cheater» sights',
    buildTactical: 'Living, building & tactics',
  },
  items: {},
}

ru.projects.rustLoot = {
  label: 'Проект 3',
  title: 'Стримерский лут Rust',
  subtitle:
    'Twitch Drops и скины стримеров в Rust — броня, «легальные» прицелы и базовые фишки. Нажмите на слот, чтобы отметить «собрано».',
  filterAll: 'Все категории',
  categories: {
    armorCamo: 'Стримерская броня и маскировка',
    weaponsSights: 'Оружие с «читерскими» прицелами',
    buildTactical: 'Быт, строительство и тактические постройки',
  },
  items: {},
}

for (const [localeKey, entry] of Object.entries(lore)) {
  en.projects.rustLoot.items[localeKey] = {
    description: entry.en.description,
    funFact: entry.en.funFact,
  }
  ru.projects.rustLoot.items[localeKey] = {
    description: entry.ru.description,
    funFact: entry.ru.funFact,
  }
}

writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`)
writeFileSync(ruPath, `${JSON.stringify(ru, null, 2)}\n`)
console.log('Updated rustLoot i18n for', Object.keys(lore).length, 'items')
