import { RARITY_COLORS } from '@/features/items/rarity'
import type { ItemRarity } from '@/features/items/types'
import type { StreamerItemGroup } from '@/features/projects/types'
import catalogItems from '@/features/projects/data/fortnite-streamer-items.json'

const IMAGE_BASE = '/items/fortnite'

const DEFAULT_AVATAR =
  'https://static-cdn.jtvnw.net/user-default-pictures-uv/41780b5a-def8-11e9-94d9-784f43822e80-profile_image-300x300.png'

export const FORTNITE_STREAMER_GROUPS: StreamerItemGroup[] = [
  { id: 'iconSeries', categoryKey: 'iconSeries' },
  { id: 'viralAndOg', categoryKey: 'viralAndOg' },
]

type FortniteGroupId = (typeof FORTNITE_STREAMER_GROUPS)[number]['id']

interface FortniteCatalogEntry {
  id: string
  localeKey: string
  name: string
  file: string
  itemGroup: FortniteGroupId
  streamerName: string
  twitchLogin: string
  avatarUrl?: string
  rarity: ItemRarity
  enableGlitch?: boolean
}

const img = (file: string) => `${IMAGE_BASE}/${file}`

export const FORTNITE_STREAMER_CATALOG: FortniteCatalogEntry[] =
  catalogItems as FortniteCatalogEntry[]

export const buildFortniteStreamerItems = (projectId: string) =>
  FORTNITE_STREAMER_CATALOG.map((entry) => ({
    id: entry.id,
    projectId,
    localeKey: entry.localeKey,
    name: entry.name,
    game: 'Fortnite',
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
