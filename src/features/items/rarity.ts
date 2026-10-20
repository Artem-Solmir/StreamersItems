import type { ItemRarity } from '@/features/items/types'

export const RARITY_COLORS: Record<ItemRarity, string> = {
  common: '#6b7280',
  rare: '#9146ff',
  epic: '#b24bf3',
  legendary: '#ffb300',
  secret: '#00ffcc',
}

export const shouldEnableGlitch = (rarity: ItemRarity): boolean =>
  rarity === 'secret' || rarity === 'legendary'
