import { RARITY_COLORS } from '@/features/items/rarity'
import type { StreamerItem } from '@/features/items/types'
import type { StreamerItemsProject } from '@/features/projects/types'

const PROJECT_ID = 'project-01-cs2-loadouts'

const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`

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
    imageUrl: '/assets/hero.png',
    streamer: {
      name: 'Buster',
      avatarUrl: avatar('buster'),
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
    imageUrl: '/assets/react.svg',
    streamer: {
      name: 'donk',
      avatarUrl: avatar('donk'),
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
    imageUrl: '/assets/hero.png',
    streamer: {
      name: 's1mple',
      avatarUrl: avatar('s1mple'),
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
    imageUrl: '/assets/vite.svg',
    streamer: {
      name: 'Shroud',
      avatarUrl: avatar('shroud'),
      isLive: false,
    },
    rarity: 'epic',
    rarityColor: RARITY_COLORS.epic,
  }),
  item('p1-overdrive-gloves', {
    localeKey: 'p1OverdriveGloves',
    name: '★ Sport Gloves | Vice',
    game: 'Counter-Strike 2',
    imageUrl: '/assets/react.svg',
    streamer: {
      name: 'OverDrive',
      avatarUrl: avatar('overdrive'),
      isLive: true,
    },
    rarity: 'rare',
    rarityColor: RARITY_COLORS.rare,
  }),
  item('p1-starter-usp', {
    localeKey: 'p1StarterUsp',
    name: 'USP-S | Ticket to Hell',
    game: 'Counter-Strike 2',
    imageUrl: '/assets/vite.svg',
    streamer: {
      name: 'Buster',
      avatarUrl: avatar('buster'),
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
