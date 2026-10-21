import { RARITY_COLORS } from '@/features/items/rarity'
import type { ItemRarity } from '@/features/items/types'
import type { StreamerItemGroup } from '@/features/projects/types'

const IMAGE_BASE = '/items/tarkov/collector'

const DEFAULT_AVATAR =
  'https://static-cdn.jtvnw.net/user-default-pictures-uv/41780b5a-def8-11e9-94d9-784f43822e80-profile_image-300x300.png'

export const TARKOV_COLLECTOR_GROUPS: StreamerItemGroup[] = [
  { id: 'gear', categoryKey: 'gear' },
  { id: 'figurines', categoryKey: 'figurines' },
  { id: 'food', categoryKey: 'food' },
  { id: 'tools', categoryKey: 'tools' },
  { id: 'valuables', categoryKey: 'valuables' },
]

type CollectorGroupId = (typeof TARKOV_COLLECTOR_GROUPS)[number]['id']

interface CollectorCatalogEntry {
  id: string
  localeKey: string
  name: string
  file: string
  itemGroup: CollectorGroupId
  streamerName: string
  twitchLogin: string
  avatarUrl?: string
  rarity: ItemRarity
  enableGlitch?: boolean
}

const img = (file: string) => `${IMAGE_BASE}/${file}`

/** Collector / streamer items (images: kappatracker.com + assets.tarkov.dev). */
export const TARKOV_COLLECTOR_CATALOG: CollectorCatalogEntry[] = [
  {
    id: 'p2-nut-sack-balaclava',
    localeKey: 'p2NutSackBalaclava',
    name: 'Nut Sack balaclava',
    file: 'nut-sack-balaclava.webp',
    itemGroup: 'gear',
    streamerName: 'TheBurntPeanut',
    twitchLogin: 'theburntpeanut',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/058ee082-68f4-417b-8f8b-8c3ad4246f2a-profile_image-300x300.png',
    rarity: 'epic',
  },
  {
    id: 'p2-domontovich-ushanka',
    localeKey: 'p2DomontovichUshanka',
    name: 'Domontovich ushanka hat',
    file: 'domontovich-ushanka.webp',
    itemGroup: 'gear',
    streamerName: 'Domontovich',
    twitchLogin: 'domontovich',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/42330dbe-73d0-4cde-ac72-b635b7fbd0e9-profile_image-300x300.png',
    rarity: 'rare',
  },
  {
    id: 'p2-pestily-mask',
    localeKey: 'p2PestilyMask',
    name: 'Pestily plague mask',
    file: 'pestily-plague-mask.png',
    itemGroup: 'gear',
    streamerName: 'Pestily',
    twitchLogin: 'pestily',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/6d33e15c-f918-468f-9a29-f56399786532-profile_image-300x300.png',
    rarity: 'legendary',
    enableGlitch: true,
  },
  {
    id: 'p2-shroud-half-mask',
    localeKey: 'p2ShroudHalfMask',
    name: 'Shroud half-mask',
    file: 'shroud-half-mask.png',
    itemGroup: 'gear',
    streamerName: 'Shroud',
    twitchLogin: 'shroud',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/c754eebf-745b-4e0a-814a-10bcaecaabbc-profile_image-300x300.png',
    rarity: 'epic',
  },
  {
    id: 'p2-johnb-glasses',
    localeKey: 'p2JohnbGlasses',
    name: 'JohnB Liquid DNB glasses',
    file: 'johnb-liquid-dnb-glasses.png',
    itemGroup: 'gear',
    streamerName: 'Dunduk',
    twitchLogin: 'dunduk',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/34f3d4fd-4018-4f49-8558-8efbba90f2a-profile_image-300x300.png',
    rarity: 'rare',
  },
  {
    id: 'p2-viibiin-sneaker',
    localeKey: 'p2ViibiinSneaker',
    name: 'Viibiin sneaker',
    file: 'viibiin-sneaker.png',
    itemGroup: 'gear',
    streamerName: 'Viibiin',
    twitchLogin: 'viibiin',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/04a3d90b-eab4-49e1-9512-1eebcf06c8a0-profile_image-300x300.png',
    rarity: 'rare',
  },
  {
    id: 'p2-noiceguy-press-pass',
    localeKey: 'p2NoiceguyPressPass',
    name: 'Press pass (NoiceGuy)',
    file: 'press-pass-noiceguy.png',
    itemGroup: 'gear',
    streamerName: 'NoiceGuy',
    twitchLogin: 'noiceguy',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/a5fc9f98-931e-43bf-8aea-76024076f0a0-profile_image-300x300.png',
    rarity: 'epic',
  },
  {
    id: 'p2-raven-figurine',
    localeKey: 'p2RavenFigurine',
    name: 'Raven figurine',
    file: 'raven-figurine.png',
    itemGroup: 'figurines',
    streamerName: 'Markstrom',
    twitchLogin: 'markstrom',
    rarity: 'legendary',
    enableGlitch: true,
  },
  {
    id: 'p2-loot-lord-plushie',
    localeKey: 'p2LootLordPlushie',
    name: 'Loot Lord plushie',
    file: 'loot-lord-plushie.png',
    itemGroup: 'figurines',
    streamerName: 'AquaFPS',
    twitchLogin: 'aquafps',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/63cd9086-cc82-4fc0-9156-64c3277a2a0f-profile_image-300x300.png',
    rarity: 'epic',
  },
  {
    id: 'p2-mastichin-figurine',
    localeKey: 'p2MastichinFigurine',
    name: 'Mastichin figurine',
    file: 'mastichin-figurine.webp',
    itemGroup: 'figurines',
    streamerName: 'Mastichin',
    twitchLogin: 'mastichin',
    rarity: 'rare',
  },
  {
    id: 'p2-sheefgg-piggy-bank',
    localeKey: 'p2SheefggPiggyBank',
    name: 'SheefGG piggy bank',
    file: 'sheefgg-piggy-bank.png',
    itemGroup: 'figurines',
    streamerName: 'SheefGG',
    twitchLogin: 'sheefgg',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/2aead78a-797a-47a3-8cf2-2a86dc00a0b0-profile_image-300x300.png',
    rarity: 'legendary',
    enableGlitch: true,
  },
  {
    id: 'p2-mutkevich-figurine',
    localeKey: 'p2MutkevichFigurine',
    name: 'Politician Mutkevich figurine',
    file: 'politician-mutkevich-figurine.webp',
    itemGroup: 'figurines',
    streamerName: 'Mutkevich',
    twitchLogin: 'mutkevich',
    rarity: 'epic',
  },
  {
    id: 'p2-ryzhy-figurine',
    localeKey: 'p2RyzhyFigurine',
    name: 'Ryzhy figurine',
    file: 'ryzhy-figurine.webp',
    itemGroup: 'figurines',
    streamerName: 'Ryzhy',
    twitchLogin: 'ryzhy',
    rarity: 'epic',
  },
  {
    id: 'p2-duck-figurine',
    localeKey: 'p2DuckFigurine',
    name: 'Duck figurine',
    file: 'duck-figurine.webp',
    itemGroup: 'figurines',
    streamerName: 'Tarkov',
    twitchLogin: 'tarkov',
    rarity: 'rare',
  },
  {
    id: 'p2-kc130-model',
    localeKey: 'p2Kc130Model',
    name: 'LM KC-130 model aircraft',
    file: 'lm-kc-130-model-aircraft.png',
    itemGroup: 'figurines',
    streamerName: 'AirwingMarine',
    twitchLogin: 'airwingmarine',
    rarity: 'legendary',
    enableGlitch: true,
  },
  {
    id: 'p2-ymxc-water',
    localeKey: 'p2YmxWater',
    name: 'Bottle of YMXC water',
    file: 'bottle-of-ymxc-water.png',
    itemGroup: 'food',
    streamerName: 'YMXC',
    twitchLogin: 'ymxcs',
    rarity: 'rare',
  },
  {
    id: 'p2-gigabeef-meat',
    localeKey: 'p2GigabeefMeat',
    name: 'Can of GigaBeef meat',
    file: 'can-of-gigabeef-meat.png',
    itemGroup: 'food',
    streamerName: 'GigaBeef',
    twitchLogin: 'gigabeef',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/cd94c4b0-66a6-4929-ac8c-1600b7a62f0-profile_image-300x300.png',
    rarity: 'rare',
  },
  {
    id: 'p2-french-baguette',
    localeKey: 'p2FrenchBaguette',
    name: 'French bakery baguette',
    file: 'french-bakery-baguette.png',
    itemGroup: 'food',
    streamerName: 'Cocaoo_',
    twitchLogin: 'cocaoo_',
    rarity: 'common',
  },
  {
    id: 'p2-holodilnick-bag',
    localeKey: 'p2HolodilnickBag',
    name: 'Mr. Holodilnick thermal bag',
    file: 'mr-holodilnick-thermal-bag.webp',
    itemGroup: 'food',
    streamerName: 'Mr. Holodilnick',
    twitchLogin: 'mrholodilnick',
    rarity: 'epic',
  },
  {
    id: 'p2-inseq-wrench',
    localeKey: 'p2InseqWrench',
    name: 'Inseq gas pipe wrench',
    file: 'inseq-gas-pipe-wrench.png',
    itemGroup: 'tools',
    streamerName: 'Inseq',
    twitchLogin: 'inseq',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/79543e3e-b2c7-4587-9890-336d1a40f0a0-profile_image-300x300.png',
    rarity: 'rare',
  },
  {
    id: 'p2-fireklean',
    localeKey: 'p2Fireklean',
    name: '#FireKlean gun lube',
    file: 'fireklean-gun-lube.png',
    itemGroup: 'tools',
    streamerName: 'Klean',
    twitchLogin: 'klean',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/82dc2397-e289-4e7c-bd59-471e6612a0-profile_image-300x300.png',
    rarity: 'legendary',
    enableGlitch: true,
  },
  {
    id: 'p2-deadlyslob-beard-oil',
    localeKey: 'p2DeadlyslobBeardOil',
    name: 'Deadlyslob\'s beard oil',
    file: 'deadlyslob-beard-oil.png',
    itemGroup: 'tools',
    streamerName: 'DeadlySlob',
    twitchLogin: 'deadlyslob',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/b1f8692d1f66c5cb-profile_image-300x300.jpeg',
    rarity: 'common',
  },
  {
    id: 'p2-lvndmark-rat-poison',
    localeKey: 'p2LvndmarkRatPoison',
    name: 'LVNDMARK\'s rat poison',
    file: 'lvndmark-rat-poison.png',
    itemGroup: 'tools',
    streamerName: 'LVNDMARK',
    twitchLogin: 'lvndmark',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/8dcaf96d-68ee-4fc6-bfdc-fdfc564e134a-profile_image-300x300.png',
    rarity: 'epic',
  },
  {
    id: 'p2-mazoni-dumbbell',
    localeKey: 'p2MazoniDumbbell',
    name: 'Mazoni golden dumbbell',
    file: 'mazoni-golden-dumbbell.webp',
    itemGroup: 'tools',
    streamerName: 'MAZA4KST',
    twitchLogin: 'maza4kst',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/a8dda47b-be45-4b2d-b01b-6fa2497450a-profile_image-300x300.png',
    rarity: 'legendary',
    enableGlitch: true,
  },
  {
    id: 'p2-tigzresq-splint',
    localeKey: 'p2TigzresqSplint',
    name: 'Tigzresq splint',
    file: 'tigzresq-splint.webp',
    itemGroup: 'tools',
    streamerName: 'Tigzresq',
    twitchLogin: 'tigzresq',
    rarity: 'rare',
  },
  {
    id: 'p2-missam-forklift-key',
    localeKey: 'p2MissamForkliftKey',
    name: 'Missam forklift key',
    file: 'missam-forklift-key.png',
    itemGroup: 'tools',
    streamerName: 'DanExert',
    twitchLogin: 'danexert',
    rarity: 'rare',
  },
  {
    id: 'p2-veritas-guitar-pick',
    localeKey: 'p2VeritasGuitarPick',
    name: 'Veritas guitar pick',
    file: 'veritas-guitar-pick.png',
    itemGroup: 'valuables',
    streamerName: 'Veritas',
    twitchLogin: 'veritas',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/a1242fcb-6eed-438d-a13f-7c6a8129fc34-profile_image-300x300.png',
    rarity: 'legendary',
    enableGlitch: true,
  },
  {
    id: 'p2-tamatthi-kunai',
    localeKey: 'p2TamatthiKunai',
    name: 'Tamatthi kunai knife replica',
    file: 'tamatthi-kunai-replica.png',
    itemGroup: 'valuables',
    streamerName: 'Tamatthi',
    twitchLogin: 'tamatthi',
    rarity: 'rare',
  },
  {
    id: 'p2-dunduk-floppy',
    localeKey: 'p2DundukFloppy',
    name: 'Dunduk floppy disk',
    file: 'dunduk-floppy-disk.png',
    itemGroup: 'valuables',
    streamerName: 'Dunduk',
    twitchLogin: 'dunduk',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/34f3d4fd-4018-4f49-8558-8efbba90f2a-profile_image-300x300.png',
    rarity: 'epic',
  },
  {
    id: 'p2-desmondpilak-cd',
    localeKey: 'p2DesmondpilakCd',
    name: 'DesmondPilak CD',
    file: 'desmondpilak-cd.png',
    itemGroup: 'valuables',
    streamerName: 'DesmondPilak',
    twitchLogin: 'desmondpilak',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/61ec0abb-eae8-4c03-bf02-c19d2cbf5c0a-profile_image-300x300.png',
    rarity: 'rare',
  },
  {
    id: 'p2-cyborg-killer-vhs',
    localeKey: 'p2CyborgKillerVhs',
    name: 'Video cassette with the Cyborg Killer movie',
    file: 'cyborg-killer-vhs.png',
    itemGroup: 'valuables',
    streamerName: 'CyborgKiller',
    twitchLogin: 'cyborgkiller',
    rarity: 'epic',
  },
  {
    id: 'p2-silver-badge',
    localeKey: 'p2SilverBadge',
    name: 'Silver Badge',
    file: 'silver-badge.png',
    itemGroup: 'valuables',
    streamerName: 'Silver',
    twitchLogin: 'silver',
    rarity: 'secret',
    enableGlitch: true,
  },
  {
    id: 'p2-wz-wallet',
    localeKey: 'p2WzWallet',
    name: 'WZ Wallet',
    file: 'wz-wallet.png',
    itemGroup: 'valuables',
    streamerName: 'WillerZ',
    twitchLogin: 'willerz',
    avatarUrl:
      'https://static-cdn.jtvnw.net/jtv_user_pictures/c41395c8-7eb3-48e1-8169-36fac4391f0a-profile_image-300x300.png',
    rarity: 'epic',
  },
  {
    id: 'p2-battered-antique-book',
    localeKey: 'p2BatteredAntiqueBook',
    name: 'Battered antique book',
    file: 'battered-antique-book.png',
    itemGroup: 'valuables',
    streamerName: 'DobbyKillStreak',
    twitchLogin: 'dobbykillstreak',
    rarity: 'rare',
  },
]

export const buildTarkovCollectorItems = (projectId: string) =>
  TARKOV_COLLECTOR_CATALOG.map((entry) => ({
    id: entry.id,
    projectId,
    localeKey: entry.localeKey,
    name: entry.name,
    game: 'Escape from Tarkov',
    imageUrl: img(entry.file),
    itemGroup: entry.itemGroup,
    streamer: {
      name: entry.streamerName,
      twitchLogin: entry.twitchLogin,
      avatarUrl: entry.avatarUrl ?? DEFAULT_AVATAR,
      isLive: false,
    },
    rarity: entry.rarity,
    rarityColor: RARITY_COLORS[entry.rarity],
    enableGlitch: entry.enableGlitch,
  }))
