import { RARITY_COLORS } from '@/features/items/rarity'
import type { StreamerItem } from '@/features/items/types'
import type { StreamerItemsProject } from '@/features/projects/types'

const PROJECT_ID = 'project-02-escape-from-tarkov'

const TWITCH_AVATARS = {
  lvndmark:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/8dcaf96d-68ee-4fc6-bfdc-fdfc564e134a-profile_image-300x300.png',
  pestily:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/6d33e15c-f918-468f-9a29-f56399786532-profile_image-300x300.png',
  summit1g:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/99aa4739-21d6-40af-86ae-4b4d3457fce4-profile_image-300x300.png',
  veritas:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/a1242fcb-6eed-438d-a13f-7c6a8129fc34-profile_image-300x300.png',
  jessekazam:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/d3464f81-c1d8-44ff-9ef0-baa0b76add1c-profile_image-300x300.jpg',
  deadlyslob:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/b1f8692d1f66c5cb-profile_image-300x300.jpeg',
} as const

/** 512px WebP from assets.tarkov.dev (same pipeline as tarkov.dev / KappaTracker). */
const ITEM_IMAGES = {
  bitcoin: '/items/tarkov/bitcoin.webp',
  ledx: '/items/tarkov/ledx.webp',
  redKeycard: '/items/tarkov/red-keycard.webp',
  thiccCase: '/items/tarkov/thicc-case.webp',
  slick: '/items/tarkov/slick.webp',
  grizzly: '/items/tarkov/grizzly.webp',
} as const

const item = (
  id: string,
  data: Omit<StreamerItem, 'id' | 'projectId'>,
): StreamerItem => ({
  id,
  projectId: PROJECT_ID,
  ...data,
})

const ITEMS: StreamerItem[] = [
  item('p2-lvndmark-bitcoin', {
    localeKey: 'p2LvndmarkBitcoin',
    name: 'Physical Bitcoin',
    game: 'Escape from Tarkov',
    imageUrl: ITEM_IMAGES.bitcoin,
    streamer: {
      name: 'LVNDMARK',
      twitchLogin: 'lvndmark',
      avatarUrl: TWITCH_AVATARS.lvndmark,
      isLive: false,
    },
    rarity: 'legendary',
    rarityColor: '#f5a623',
    enableGlitch: true,
  }),
  item('p2-pestily-ledx', {
    localeKey: 'p2PestilyLedx',
    name: 'LEDX Skin Transilluminator',
    game: 'Escape from Tarkov',
    imageUrl: ITEM_IMAGES.ledx,
    streamer: {
      name: 'Pestily',
      twitchLogin: 'pestily',
      avatarUrl: TWITCH_AVATARS.pestily,
      isLive: true,
    },
    rarity: 'secret',
    rarityColor: RARITY_COLORS.secret,
    enableGlitch: true,
  }),
  item('p2-summit-red-keycard', {
    localeKey: 'p2SummitRedKeycard',
    name: 'Red Keycard',
    game: 'Escape from Tarkov',
    imageUrl: ITEM_IMAGES.redKeycard,
    streamer: {
      name: 'summit1g',
      twitchLogin: 'summit1g',
      avatarUrl: TWITCH_AVATARS.summit1g,
      isLive: false,
    },
    rarity: 'epic',
    rarityColor: RARITY_COLORS.epic,
  }),
  item('p2-veritas-thicc', {
    localeKey: 'p2VeritasThicc',
    name: 'T H I C C Items case',
    game: 'Escape from Tarkov',
    imageUrl: ITEM_IMAGES.thiccCase,
    streamer: {
      name: 'Veritas',
      twitchLogin: 'veritas',
      avatarUrl: TWITCH_AVATARS.veritas,
      isLive: false,
    },
    rarity: 'legendary',
    rarityColor: RARITY_COLORS.legendary,
    enableGlitch: true,
  }),
  item('p2-jesse-slick', {
    localeKey: 'p2JesseSlick',
    name: 'LBT 6094A Slick Plate Carrier',
    game: 'Escape from Tarkov',
    imageUrl: ITEM_IMAGES.slick,
    streamer: {
      name: 'JesseKazam',
      twitchLogin: 'jessekazam',
      avatarUrl: TWITCH_AVATARS.jessekazam,
      isLive: true,
    },
    rarity: 'rare',
    rarityColor: RARITY_COLORS.rare,
  }),
  item('p2-slob-grizzly', {
    localeKey: 'p2SlobGrizzly',
    name: 'Grizzly medical kit',
    game: 'Escape from Tarkov',
    imageUrl: ITEM_IMAGES.grizzly,
    streamer: {
      name: 'DeadlySlob',
      twitchLogin: 'deadlyslob',
      avatarUrl: TWITCH_AVATARS.deadlyslob,
      isLive: false,
    },
    rarity: 'common',
    rarityColor: RARITY_COLORS.common,
  }),
]

export const PROJECT_02_ESCAPE_FROM_TARKOV: StreamerItemsProject = {
  id: PROJECT_ID,
  slug: 'escape-from-tarkov-streamer-loot',
  translationKey: 'projects.tarkovLoot',
  primaryGame: 'Escape from Tarkov',
  items: ITEMS,
  publishedAt: '2026-10-20',
}
