import { RARITY_COLORS } from '@/features/items/rarity'
import type { StreamerItem } from '@/features/items/types'

const avatar = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`

export const MOCK_STREAMER_ITEMS: StreamerItem[] = [
  {
    id: 'awp-dragon-lore',
    name: 'AWP | Dragon Lore',
    game: 'Counter-Strike 2',
    imageUrl: '/assets/hero.png',
    streamer: { name: 's1mple', avatarUrl: avatar('s1mple'), isLive: true },
    rarity: 'legendary',
    rarityColor: RARITY_COLORS.legendary,
    enableGlitch: true,
  },
  {
    id: 'shroud-mask',
    name: 'Shroud Mask',
    game: 'PUBG',
    imageUrl: '/assets/hero.png',
    streamer: { name: 'Shroud', avatarUrl: avatar('shroud'), isLive: false },
    rarity: 'legendary',
    rarityColor: '#ffb300',
    enableGlitch: true,
  },
  {
    id: 'buster-tee',
    name: 'Buster Signature Tee',
    game: 'IRL Drop',
    imageUrl: '/assets/react.svg',
    streamer: { name: 'Buster', avatarUrl: avatar('buster'), isLive: true },
    rarity: 'rare',
    rarityColor: RARITY_COLORS.rare,
  },
  {
    id: 'frost-arcana',
    name: 'Frost Avalanche Arcana',
    game: 'Dota 2',
    imageUrl: '/assets/react.svg',
    streamer: { name: 'Yatoro', avatarUrl: avatar('yatoro'), isLive: false },
    rarity: 'epic',
    rarityColor: RARITY_COLORS.epic,
  },
  {
    id: 'vaulted-emote',
    name: 'Vaulted Emote — Season 1',
    game: 'Fortnite',
    imageUrl: '/assets/vite.svg',
    streamer: { name: 'Bugha', avatarUrl: avatar('bugha'), isLive: false },
    rarity: 'secret',
    rarityColor: RARITY_COLORS.secret,
    enableGlitch: true,
  },
  {
    id: 'default-knife',
    name: 'Standard Issue Knife',
    game: 'Counter-Strike 2',
    imageUrl: '/assets/vite.svg',
    streamer: { name: 'donk', avatarUrl: avatar('donk'), isLive: true },
    rarity: 'common',
    rarityColor: RARITY_COLORS.common,
  },
]
