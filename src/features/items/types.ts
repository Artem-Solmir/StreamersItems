export const ITEM_RARITIES = [
  'common',
  'rare',
  'epic',
  'legendary',
  'secret',
] as const

export type ItemRarity = (typeof ITEM_RARITIES)[number]

export interface StreamerItemStreamer {
  name: string
  avatarUrl: string
  isLive?: boolean
}

export interface StreamerItem {
  id: string
  name: string
  game: string
  imageUrl: string
  streamer: StreamerItemStreamer
  rarity: ItemRarity
  rarityColor: string
  enableGlitch?: boolean
}
