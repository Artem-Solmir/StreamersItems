import { RARITY_COLORS } from '@/features/items/rarity'
import type { StreamerItem } from '@/features/items/types'
import type { StreamerItemsProject } from '@/features/projects/types'

const PROJECT_ID = 'project-01-cs2-loadouts'

const DEFAULT_AVATAR =
  'https://static-cdn.jtvnw.net/user-default-pictures-uv/41780b5a-def8-11e9-94d9-784f43822e80-profile_image-300x300.png'

/** Twitch profile images (300×300 CDN). Updated via /api/twitch/users when configured. */
const TWITCH_AVATARS = {
  buster:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/96d66837-22f0-4393-89c5-2e5c2408485b-profile_image-300x300.png',
  donk: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/41780b5a-def8-11e9-94d9-784f43822e80-profile_image-300x300.png',
  s1mple:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/146bf883-600b-4edd-a73c-01794e9a6901-profile_image-300x300.png',
  shroud:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/c754eebf-745b-4e0a-814a-10bcaecaabbc-profile_image-300x300.png',
  m0nesy:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/48ebf0b9-c1ac-4a87-af36-6e05a123461e-profile_image-300x300.png',
  csgo:
    'https://static-cdn.jtvnw.net/jtv_user_pictures/d143c2a2-33d8-485d-b4cd-0abe19ccce20-profile_image-300x300.png',
} as const

/** Static files from /public/items — Steam economy CDN (360×360). */
const ITEM_IMAGES = {
  akGold: '/items/ak-gold.png',
  awpDragonLore: '/items/awp-dragon-lore.png',
  knifeDoppler: '/items/knife-doppler.png',
  m4Printstream: '/items/m4-printstream.png',
  glovesVice: '/items/gloves-vice.png',
  uspTicket: '/items/usp-ticket.png',
  m4Howl: '/items/cs2/m4-howl.png',
  bizonAnubis: '/items/cs2/bizon-judgement-anubis.png',
  graffitiFlyingAwper: '/items/cs2/graffiti-flying-awper.png',
  graffitiDefuseInFire: '/items/cs2/graffiti-defuse-in-fire.png',
  stickerDickstacy: '/items/cs2/sticker-dickstacy.png',
  stickerHowl: '/items/cs2/sticker-howl.png',
  musicEz4ence: '/items/cs2/music-ez4ence.png',
  infernoBananaBarrels: '/items/cs2/inferno-banana-barrels.png',
  overpassOlofBoost: '/items/cs2/overpass-olof-boost.png',
} as const

export const CS2_LOADOUT_GROUPS = [
  { id: 'streamerLoadouts', categoryKey: 'streamerLoadouts' },
  { id: 'skinsGraffiti', categoryKey: 'skinsGraffiti' },
  { id: 'stickersMusic', categoryKey: 'stickersMusic' },
  { id: 'mapLegends', categoryKey: 'mapLegends' },
] as const

const item = (
  id: string,
  data: Omit<StreamerItem, 'id' | 'projectId'>,
): StreamerItem => ({
  id,
  projectId: PROJECT_ID,
  ...data,
})

const community = {
  name: 'Counter-Strike',
  twitchLogin: 'csgo',
  avatarUrl: TWITCH_AVATARS.csgo,
  isLive: false,
}

const ITEMS: StreamerItem[] = [
  item('p1-buster-gold-ak', {
    localeKey: 'p1BusterGoldAk',
    name: 'AK-47 | Gold Arabesque',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.akGold,
    itemGroup: 'streamerLoadouts',
    streamer: {
      name: 'Buster',
      twitchLogin: 'buster',
      avatarUrl: TWITCH_AVATARS.buster,
      isLive: true,
    },
    rarity: 'legendary',
    rarityColor: '#ffb300',
    enableGlitch: true,
  }),
  item('p1-donk-knife', {
    localeKey: 'p1DonkKnife',
    name: '★ Butterfly Knife | Doppler',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.knifeDoppler,
    itemGroup: 'streamerLoadouts',
    streamer: {
      name: 'donk',
      twitchLogin: 'donk',
      avatarUrl: TWITCH_AVATARS.donk,
      isLive: true,
    },
    rarity: 'legendary',
    rarityColor: RARITY_COLORS.legendary,
    enableGlitch: true,
  }),
  item('p1-s1mple-awp', {
    localeKey: 'p1S1mpleAwp',
    name: 'AWP | Dragon Lore',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.awpDragonLore,
    itemGroup: 'streamerLoadouts',
    streamer: {
      name: 's1mple',
      twitchLogin: 's1mple',
      avatarUrl: TWITCH_AVATARS.s1mple,
      isLive: false,
    },
    rarity: 'secret',
    rarityColor: RARITY_COLORS.secret,
    enableGlitch: true,
  }),
  item('p1-shroud-m4', {
    localeKey: 'p1ShroudM4',
    name: 'M4A1-S | Printstream',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.m4Printstream,
    itemGroup: 'streamerLoadouts',
    streamer: {
      name: 'Shroud',
      twitchLogin: 'shroud',
      avatarUrl: TWITCH_AVATARS.shroud,
      isLive: false,
    },
    rarity: 'epic',
    rarityColor: RARITY_COLORS.epic,
  }),
  item('p1-overdrive-gloves', {
    localeKey: 'p1OverdriveGloves',
    name: '★ Sport Gloves | Vice',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.glovesVice,
    itemGroup: 'streamerLoadouts',
    streamer: {
      name: 'm0NESY',
      twitchLogin: 'm0nesy',
      avatarUrl: TWITCH_AVATARS.m0nesy,
      isLive: true,
    },
    rarity: 'rare',
    rarityColor: RARITY_COLORS.rare,
  }),
  item('p1-starter-usp', {
    localeKey: 'p1StarterUsp',
    name: 'USP-S | Ticket to Hell',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.uspTicket,
    itemGroup: 'streamerLoadouts',
    streamer: {
      name: 'Buster',
      twitchLogin: 'buster',
      avatarUrl: TWITCH_AVATARS.buster,
      isLive: true,
    },
    rarity: 'common',
    rarityColor: RARITY_COLORS.common,
  }),
  item('p1-m4-howl', {
    localeKey: 'p1M4Howl',
    name: 'M4A4 | Howl',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.m4Howl,
    itemGroup: 'skinsGraffiti',
    streamer: community,
    rarity: 'secret',
    rarityColor: '#eb4b4b',
    enableGlitch: true,
  }),
  item('p1-graffiti-flying-awper', {
    localeKey: 'p1GraffitiFlyingAwper',
    name: 'Graffiti «Flying AWPer» (Mirage B)',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.graffitiFlyingAwper,
    itemGroup: 'skinsGraffiti',
    streamer: {
      name: 'coldzera',
      twitchLogin: 'coldzera',
      avatarUrl: DEFAULT_AVATAR,
      isLive: false,
    },
    rarity: 'legendary',
    rarityColor: RARITY_COLORS.legendary,
  }),
  item('p1-graffiti-defuse-in-fire', {
    localeKey: 'p1GraffitiDefuseInFire',
    name: 'Graffiti «Defuse in Fire» (Overpass B)',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.graffitiDefuseInFire,
    itemGroup: 'skinsGraffiti',
    streamer: {
      name: 'olofmeister',
      twitchLogin: 'olofmeister',
      avatarUrl: DEFAULT_AVATAR,
      isLive: false,
    },
    rarity: 'legendary',
    rarityColor: RARITY_COLORS.legendary,
  }),
  item('p1-bizon-judgement-anubis', {
    localeKey: 'p1BizonJudgementAnubis',
    name: 'PP-Bizon | Judgement of Anubis',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.bizonAnubis,
    itemGroup: 'skinsGraffiti',
    streamer: community,
    rarity: 'epic',
    rarityColor: RARITY_COLORS.epic,
  }),
  item('p1-sticker-dickstacy', {
    localeKey: 'p1StickerDickstacy',
    name: 'Sticker | DickStacy',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.stickerDickstacy,
    itemGroup: 'stickersMusic',
    streamer: {
      name: 'DickStacy',
      twitchLogin: 'dickstacy',
      avatarUrl: DEFAULT_AVATAR,
      isLive: false,
    },
    rarity: 'epic',
    rarityColor: RARITY_COLORS.epic,
  }),
  item('p1-sticker-howl', {
    localeKey: 'p1StickerHowl',
    name: 'Sticker | Howl',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.stickerHowl,
    itemGroup: 'stickersMusic',
    streamer: community,
    rarity: 'secret',
    rarityColor: '#eb4b4b',
    enableGlitch: true,
  }),
  item('p1-music-ez4ence', {
    localeKey: 'p1MusicEz4ence',
    name: 'Music Kit | The Verkkars, EZ4ENCE',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.musicEz4ence,
    itemGroup: 'stickersMusic',
    streamer: {
      name: 'ENCE',
      twitchLogin: 'ence',
      avatarUrl: DEFAULT_AVATAR,
      isLive: false,
    },
    rarity: 'legendary',
    rarityColor: RARITY_COLORS.legendary,
  }),
  item('p1-inferno-banana-barrels', {
    localeKey: 'p1InfernoBananaBarrels',
    name: 'Two barrels on Banana (Inferno)',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.infernoBananaBarrels,
    itemGroup: 'mapLegends',
    streamer: {
      name: 'Xizt',
      twitchLogin: 'xizt',
      avatarUrl: DEFAULT_AVATAR,
      isLive: false,
    },
    rarity: 'rare',
    rarityColor: RARITY_COLORS.rare,
  }),
  item('p1-overpass-olof-boost', {
    localeKey: 'p1OverpassOlofBoost',
    name: '«Olof’s house» (Overpass pixel boost)',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.overpassOlofBoost,
    itemGroup: 'mapLegends',
    streamer: {
      name: 'olofmeister',
      twitchLogin: 'olofmeister',
      avatarUrl: DEFAULT_AVATAR,
      isLive: false,
    },
    rarity: 'secret',
    rarityColor: RARITY_COLORS.secret,
  }),
]

export const PROJECT_01_CS2_LOADOUTS: StreamerItemsProject = {
  id: PROJECT_ID,
  slug: 'cs2-streamer-loadouts',
  translationKey: 'projects.cs2Loadouts',
  primaryGame: 'Counter-Strike 2',
  itemGroups: [...CS2_LOADOUT_GROUPS],
  items: ITEMS,
  publishedAt: '2026-10-22',
}
