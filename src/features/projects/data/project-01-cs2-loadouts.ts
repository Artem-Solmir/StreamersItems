import { RARITY_COLORS } from '@/features/items/rarity'
import type { StreamerItem } from '@/features/items/types'
import type { StreamerItemsProject } from '@/features/projects/types'

const PROJECT_ID = 'project-01-cs2-loadouts'

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
} as const

/** Static files from /public/items — served as real assets (not SPA fallback). */
/** PNGs from Steam economy CDN (ByMykel/CSGO-API icon URLs, 360×360). */
const ITEM_IMAGES = {
  akGold: '/items/ak-gold.png',
  awpDragonLore: '/items/awp-dragon-lore.png',
  knifeDoppler: '/items/knife-doppler.png',
  m4Printstream: '/items/m4-printstream.png',
  glovesVice: '/items/gloves-vice.png',
  uspTicket: '/items/usp-ticket.png',
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
  item('p1-buster-gold-ak', {
    localeKey: 'p1BusterGoldAk',
    name: 'AK-47 | Gold Arabesque',
    game: 'Counter-Strike 2',
    imageUrl: ITEM_IMAGES.akGold,
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
    streamer: {
      name: 'Buster',
      twitchLogin: 'buster',
      avatarUrl: TWITCH_AVATARS.buster,
      isLive: true,
    },
    rarity: 'common',
    rarityColor: RARITY_COLORS.common,
  }),
]

export const PROJECT_01_CS2_LOADOUTS: StreamerItemsProject = {
  id: PROJECT_ID,
  slug: 'cs2-streamer-loadouts',
  translationKey: 'projects.cs2Loadouts',
  primaryGame: 'Counter-Strike 2',
  items: ITEMS,
  publishedAt: '2026-10-20',
}
