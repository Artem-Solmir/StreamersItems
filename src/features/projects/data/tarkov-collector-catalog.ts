import { RARITY_COLORS } from '@/features/items/rarity'
import type { ItemRarity } from '@/features/items/types'
import type { StreamerItemGroup } from '@/features/projects/types'
import catalogItems from '@/features/projects/data/tarkov-collector-items.json'

const IMAGE_BASE = '/items/tarkov/collector'

const DEFAULT_AVATAR =
  'https://static-cdn.jtvnw.net/user-default-pictures-uv/41780b5a-def8-11e9-94d9-784f43822e80-profile_image-300x300.png'

export const TARKOV_COLLECTOR_GROUPS: StreamerItemGroup[] = [
  { id: 'gear', categoryKey: 'gear' },
  { id: 'figurines', categoryKey: 'figurines' },
  { id: 'food', categoryKey: 'food' },
  { id: 'tools', categoryKey: 'tools' },
  { id: 'electronics', categoryKey: 'electronics' },
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
export const TARKOV_COLLECTOR_CATALOG: CollectorCatalogEntry[] =
  catalogItems as CollectorCatalogEntry[]

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
