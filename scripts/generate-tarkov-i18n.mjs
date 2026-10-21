import { readFileSync, writeFileSync } from 'node:fs'

const catalogPath = new URL(
  '../src/features/projects/data/tarkov-collector-items.json',
  import.meta.url,
)
const lorePath = new URL('./data/tarkov-collector-lore.json', import.meta.url)

const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'))
const lore = JSON.parse(readFileSync(lorePath, 'utf8'))

const LOCALE_KEYS = catalog.map((entry) => entry.localeKey)

const enPath = new URL('../src/features/i18n/locales/en.json', import.meta.url)
const ruPath = new URL('../src/features/i18n/locales/ru.json', import.meta.url)

const en = JSON.parse(readFileSync(enPath, 'utf8'))
const ru = JSON.parse(readFileSync(ruPath, 'utf8'))

en.projects.tarkovLoot.subtitle =
  'Streamer items for Escape from Tarkov — Collector-style loot with category filters. Tap a slot to mark it collected.'
en.projects.tarkovLoot.filterAll = 'All categories'
en.projects.tarkovLoot.categories = {
  gear: 'Gear, masks & headwear',
  figurines: 'Figurines, toys & books',
  food: 'Food & drinks',
  tools: 'Tools, chemicals & medicine',
  electronics: 'Electronics, containers & keys',
  valuables: 'Valuables & souvenirs',
}

ru.projects.tarkovLoot.subtitle =
  'Стримерские предметы Escape from Tarkov — лут в духе Collector с фильтром по категориям. Нажмите на слот, чтобы отметить «собрано».'
ru.projects.tarkovLoot.filterAll = 'Все категории'
ru.projects.tarkovLoot.categories = {
  gear: 'Экипировка, маски и головные уборы',
  figurines: 'Фигурки, игрушки и книги',
  food: 'Еда и напитки',
  tools: 'Инструменты, бытовая химия и медицина',
  electronics: 'Электроника, контейнеры и ключи',
  valuables: 'Ценности и сувениры',
}

en.projects.tarkovLoot.items = {}
ru.projects.tarkovLoot.items = {}

for (const localeKey of LOCALE_KEYS) {
  const entry = lore[localeKey]
  if (!entry) {
    throw new Error(`Missing lore for ${localeKey}`)
  }
  en.projects.tarkovLoot.items[localeKey] = {
    description: entry.en.description,
    funFact: entry.en.funFact,
  }
  ru.projects.tarkovLoot.items[localeKey] = {
    description: entry.ru.description,
    funFact: entry.ru.funFact,
  }
}

writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`)
writeFileSync(ruPath, `${JSON.stringify(ru, null, 2)}\n`)
console.log('Updated i18n for', LOCALE_KEYS.length, 'items')
