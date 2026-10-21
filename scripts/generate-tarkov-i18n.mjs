import { readFileSync, writeFileSync } from 'node:fs'

const LOCALE_KEYS = [
  'p2NutSackBalaclava',
  'p2DomontovichUshanka',
  'p2PestilyMask',
  'p2ShroudHalfMask',
  'p2JohnbGlasses',
  'p2ViibiinSneaker',
  'p2NoiceguyPressPass',
  'p2RavenFigurine',
  'p2LootLordPlushie',
  'p2MastichinFigurine',
  'p2SheefggPiggyBank',
  'p2MutkevichFigurine',
  'p2RyzhyFigurine',
  'p2DuckFigurine',
  'p2Kc130Model',
  'p2YmxWater',
  'p2GigabeefMeat',
  'p2FrenchBaguette',
  'p2HolodilnickBag',
  'p2InseqWrench',
  'p2Fireklean',
  'p2DeadlyslobBeardOil',
  'p2LvndmarkRatPoison',
  'p2MazoniDumbbell',
  'p2TigzresqSplint',
  'p2MissamForkliftKey',
  'p2VeritasGuitarPick',
  'p2TamatthiKunai',
  'p2DundukFloppy',
  'p2DesmondpilakCd',
  'p2CyborgKillerVhs',
  'p2SilverBadge',
  'p2WzWallet',
  'p2BatteredAntiqueBook',
]

const enPath = new URL('../src/features/i18n/locales/en.json', import.meta.url)
const ruPath = new URL('../src/features/i18n/locales/ru.json', import.meta.url)

const en = JSON.parse(readFileSync(enPath, 'utf8'))
const ru = JSON.parse(readFileSync(ruPath, 'utf8'))

en.projects.tarkovLoot.subtitle =
  'Streamer items for Escape from Tarkov — Collector-style loot with category filters. Tap a slot to mark it collected.'
en.projects.tarkovLoot.filterAll = 'All categories'
en.projects.tarkovLoot.categories = {
  gear: 'Gear, masks & headwear',
  figurines: 'Figurines & plushies',
  food: 'Food & drinks',
  tools: 'Tools & household',
  valuables: 'Valuables & electronics',
}

ru.projects.tarkovLoot.subtitle =
  'Стримерские предметы Escape from Tarkov — лут в духе Collector с фильтром по категориям. Нажмите на слот, чтобы отметить «собрано».'
ru.projects.tarkovLoot.filterAll = 'Все категории'
ru.projects.tarkovLoot.categories = {
  gear: 'Экипировка, маски и головные уборы',
  figurines: 'Фигурки и игрушки',
  food: 'Еда и напитки',
  tools: 'Инструменты и бытовые предметы',
  valuables: 'Ценности, электроника и сувениры',
}

const copyEn = {
  p2NutSackBalaclava: ['TheBurntPeanut’s Nut Sack balaclava — meme-tier headwear from the streamer item pool.', 'Added in late 2025; spawns on Scavs like other streamer cosmetics.'],
  p2DomontovichUshanka: ['Domontovich ushanka — cold-raid cosplay with a creator tag.', 'Part of the expanding streamer item roster tied to Russian creators.'],
  p2PestilyMask: ['Pestily plague mask — the mask chat recognizes before the voice line.', 'Classic streamer item since early Tarkov wipes.'],
  p2ShroudHalfMask: ['Shroud half-mask — minimal face cover, maximum streamer recognition.', 'Drops from Scavs; a staple flex slot.'],
  p2JohnbGlasses: ['JohnB Liquid DNB glasses — Dunduk’s signature shades as in-game loot.', 'Often called «Dunduk glasses» in the community.'],
  p2ViibiinSneaker: ['Viibiin sneaker — footwear loot that feels like a highlight reel drop.', 'Safes and jacket raids love hiding these.'],
  p2NoiceguyPressPass: ['Press pass issued for NoiceGuy — Labs energy in item form.', 'Sports bags and streamer loot tables.'],
  p2RavenFigurine: ['Raven figurine — trophy from Markstrom’s tournament win.', 'High-value safe spawn; pure flex.'],
  p2LootLordPlushie: ['Loot Lord plushie — AquaFPS / Lupo mascot in plush form.', 'Sports bags; chat always calls it Lupo.'],
  p2MastichinFigurine: ['Mastichin figurine — mustache memes turned into barter loot.', 'Newer figurine line from recent wipes.'],
  p2SheefggPiggyBank: ['SheefGG piggy bank — mini stash for roubles with streamer branding.', 'Marked rooms and late-wipe economy flex.'],
  p2MutkevichFigurine: ['Politician Mutkevich figurine — satire you can hand in or flex.', 'Part of the trader figurine set.'],
  p2RyzhyFigurine: ['Ryzhy figurine — red-scav personality as a shelf piece.', 'Pairs with other «figurine» streamer items.'],
  p2DuckFigurine: ['Duck figurine — the mandarin-plush meme the community calls «tangerine duck».', 'Event reward turned collectible barter item.'],
  p2Kc130Model: ['LM KC-130 model aircraft — AirwingMarine’s aviation nod.', 'Labs manager office / arsenal spawns on some wipes.'],
  p2YmxWater: ['Bottle of YMXC water — creator-branded hydration loot.', 'Food spawns and ration crates on Customs and beyond.'],
  p2GigabeefMeat: ['Can of GigaBeef meat — tushonka energy with streamer label.', 'Ration crates; wipe 1.1 streamer food trio.'],
  p2FrenchBaguette: ['French bakery baguette — Cocaoo_’s long bread for short raids.', 'Food spawns; part of the 2026 food streamer set.'],
  p2HolodilnickBag: ['Mr. Holodilnick thermal bag — lunchbox loot with creator branding.', 'Thermal bag slot; keeps the meme cold.'],
  p2InseqWrench: ['Inseq gas pipe wrench — adjustable wrench with streamer paint.', 'Technical crates; bright red tool flex.'],
  p2Fireklean: ['#FireKlean gun lube — Klean’s iconic gold tube.', 'Labs tech / streamer item classic since 2018.'],
  p2DeadlyslobBeardOil: ['Deadlyslob’s beard oil — OG streamer item from early wipes.', 'Shoreline and interchange counters; collector veteran bait.'],
  p2LvndmarkRatPoison: ['LVNDMARK’s rat poison — meme consumable with serious flea price.', 'Sports bags and filing cabinets.'],
  p2MazoniDumbbell: ['Mazoni golden dumbbell — gym bro loot for hideout flex.', 'Safes; cultist circle FIR tricks on some wipes.'],
  p2TigzresqSplint: ['Tigzresq splint — medical streamer item for leg meta jokes.', 'Medical spawns across maps.'],
  p2MissamForkliftKey: ['Missam forklift key — DanExert / Missam forklift meme key.', 'Jacket pockets; tiny key, big chat reaction.'],
  p2VeritasGuitarPick: ['Veritas guitar pick — tiny loot, huge streamer recognition.', 'Safes and Labs saferoom routes.'],
  p2TamatthiKunai: ['Tamatthi kunai knife replica — melee memento, not meta, all style.', 'Safes; streamer item since 2024 drops.'],
  p2DundukFloppy: ['Dunduk floppy disk — retro storage for Tarkov.Help vibes.', 'Filing cabinets and safes.'],
  p2DesmondpilakCd: ['DesmondPilak CD — album loot from the Tarkov DJ.', 'Safe spawns; audio meme item.'],
  p2CyborgKillerVhs: ['Cassette with «Cyborg Killer» — Проходимец VHS collectable.', 'Filing cabinets; VHS streamer nostalgia.'],
  p2SilverBadge: ['Silver Badge — polished streamer medallion.', 'Older collector piece; still a status slot.'],
  p2WzWallet: ['WZ Wallet — WillerZ wallet loot.', 'Scav pockets; economy streamer classic.'],
  p2BatteredAntiqueBook: ['Battered antique book — DobbyKillStreak’s dusty tome.', 'Safe loot; quest hand-in history on some accounts.'],
}

const copyRu = {
  p2NutSackBalaclava: ['Балаклава Nut Sack от TheBurntPeanut — мемный headwear из пула стримерских предметов.', 'Добавлена в конце 2025; спавнится на Scav, как другая streamer-косметика.'],
  p2DomontovichUshanka: ['Ушанка Домонтовича — зимний cosplay с авторской меткой.', 'Часть расширяющегося списка предметов русскоязычных стримеров.'],
  p2PestilyMask: ['Маска чумного доктора Pestily — узнаётся в чате раньше голоса.', 'Классика streamer items с ранних вайпов.'],
  p2ShroudHalfMask: ['Полумаска Shroud — минимум маски, максимум узнаваемости.', 'Дроп с Scav; любимый flex-слот.'],
  p2JohnbGlasses: ['Очки JohnB Liquid DNB — фирменные «очки Dunduk» в луте.', 'В комьюнити часто зовут «очки Dunduk».'],
  p2ViibiinSneaker: ['Кроссовки Viibiin — обувь, которую рады видеть в хайлайте.', 'Сейфы и куртки прячут их с удовольствием.'],
  p2NoiceguyPressPass: ['Пресс-карта NoiceGuy — Labs-энергия в виде предмета.', 'Спорт-сумки и таблицы streamer loot.'],
  p2RavenFigurine: ['Статуэтка ворона — трофей победы Markstrom на турнире.', 'Дорогой safe spawn; чистый flex.'],
  p2LootLordPlushie: ['Плюш Loot Lord — маскот AquaFPS / Lupo.', 'Sports bag; чат зовёт его Lupo.'],
  p2MastichinFigurine: ['Фигурка Mastichin — усы как barter-лут.', 'Новая линейка figurine на свежих вайпах.'],
  p2SheefggPiggyBank: ['Копилка SheefGG — мини-кейс под рубли со стримерским брендом.', 'Marked rooms; flex экономики.'],
  p2MutkevichFigurine: ['Фигурка депутата Муткевича — сатира, которую сдают или flex\'ят.', 'Из набора trader figurines.'],
  p2RyzhyFigurine: ['Фигурка Рыжего — scav-персона в миниатюре.', 'Соседствует с другими figurine-предметами.'],
  p2DuckFigurine: ['Фигурка утки — «мандариновая уточка» из ивентов и мемов.', 'Коллекционный barter после ивентов.'],
  p2Kc130Model: ['Модель LM KC-130 — отсылка AirwingMarine к авиации.', 'Labs office / arsenal на некоторых вайпах.'],
  p2YmxWater: ['Бутылка воды YMXC — брендированная вода стримера.', 'Food spawns и ration crates.'],
  p2GigabeefMeat: ['Банка тушенки GigaBeef — стримерская тушонка.', 'Ration crates; food trio 2026.'],
  p2FrenchBaguette: ['Французский багет — длинный хлеб Cocaoo_.', 'Food spawns; часть food streamer набора.'],
  p2HolodilnickBag: ['Термосумка Mr. Holodilnick — ланчбокс с брендом.', 'Thermal bag; мем про холод.'],
  p2InseqWrench: ['Красный разводной ключ Inseq — яркий tool flex.', 'Technical crates.'],
  p2Fireklean: ['#FireKlean — золотая смазка Klean.', 'Labs tech; классика с 2018.'],
  p2DeadlyslobBeardOil: ['Масло для бороды Deadlyslob — OG streamer item.', 'Shoreline / Interchange; bait для вeteranов.'],
  p2LvndmarkRatPoison: ['Крысиный яд LVNDMARK — мем с серьёзной ценой на барахолке.', 'Sports bags и шкафы.'],
  p2MazoniDumbbell: ['Золотая гантель Mazoni — gym flex для hideout.', 'Safes; иногда FIR через Cultist Circle.'],
  p2TigzresqSplint: ['Шина Tigzresq — мед streamer item про ноги.', 'Medical spawns.'],
  p2MissamForkliftKey: ['Ключ Missam — мем погрузчика DanExert.', 'Куртки; маленький ключ, громкая реакция чата.'],
  p2VeritasGuitarPick: ['Медиатор Veritas — маленький лут, большая узнаваемость.', 'Safes и Labs saferoom.'],
  p2TamatthiKunai: ['Реплика кунай Tamatthi — стиль, не meta.', 'Safes; streamer item с 2024.'],
  p2DundukFloppy: ['Дискета Dunduk — retro под Tarkov.Help.', 'Шкафы и сейфы.'],
  p2DesmondpilakCd: ['CD DesmondPilak — музыкальный streamer loot.', 'Safes.'],
  p2CyborgKillerVhs: ['Кассета «Киборг-убийца» — VHS от Проходимца.', 'Шкафы; ностальгия по VHS.'],
  p2SilverBadge: ['Серебряный жетон — полированная streamer медаль.', 'Старый collector piece; статусный слот.'],
  p2WzWallet: ['Кошелёк WZ — wallet loot WillerZ.', 'Карманы Scav; классика экономики.'],
  p2BatteredAntiqueBook: ['Потрепанная антикварная книга — том DobbyKillStreak.', 'Safe loot; история hand-in на квестах.'],
}

en.projects.tarkovLoot.items = {}
ru.projects.tarkovLoot.items = {}

for (const localeKey of LOCALE_KEYS) {
  const [description, funFact] = copyEn[localeKey]
  const [descriptionRu, funFactRu] = copyRu[localeKey]
  en.projects.tarkovLoot.items[localeKey] = { description, funFact }
  ru.projects.tarkovLoot.items[localeKey] = {
    description: descriptionRu,
    funFact: funFactRu,
  }
}

writeFileSync(enPath, `${JSON.stringify(en, null, 2)}\n`)
writeFileSync(ruPath, `${JSON.stringify(ru, null, 2)}\n`)
console.log('Updated i18n for', LOCALE_KEYS.length, 'items')
