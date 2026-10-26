import { RARITY_COLORS } from '@/features/items/rarity'
import type { ItemRarity } from '@/features/items/types'
import type { StreamerItemGroup } from '@/features/projects/types'
import catalogItems from '@/features/projects/data/dbd-streamer-items.json'

const IMAGE_BASE = '/items/dbd'

const DEFAULT_AVATAR =
  'https://static-cdn.jtvnw.net/user-default-pictures-uv/41780b5a-def8-11e9-94d9-784f43822e80-profile_image-300x300.png'

export const DBD_STREAMER_GROUPS: StreamerItemGroup[] = [
  { id: 'charms', categoryKey: 'charms' },
  { id: 'merch', categoryKey: 'merch' },
]

type DbdGroupId = (typeof DBD_STREAMER_GROUPS)[number]['id']

interface DbdCatalogEntry {
  id: string
  localeKey: string
  name: string
  file: string
  itemGroup: DbdGroupId
  streamerName: string
  twitchLogin: string
  avatarUrl?: string
  rarity: ItemRarity
  enableGlitch?: boolean
}

const img = (file: string) => `${IMAGE_BASE}/${file}`

/** Streamer charms & merch (UI icons: deadbydaylight.wiki.gg game filenames). */
export const DBD_STREAMER_CATALOG: DbdCatalogEntry[] =
  catalogItems as DbdCatalogEntry[]

export const buildDbdStreamerItems = (projectId: string) =>
  DBD_STREAMER_CATALOG.map((entry) => ({
    id: entry.id,
    projectId,
    localeKey: entry.localeKey,
    name: entry.name,
    game: 'Dead by Daylight',
    imageUrl: img(entry.file),
    itemGroup: entry.itemGroup,
    streamer: {
      name: entry.streamerName,
      twitchLogin: entry.twitchLogin,
      avatarUrl: entry.avatarUrl ?? DEFAULT_AVATAR,
      isLive: false,
    },
    rarity: entry.rarity,
    rarityColor:
      entry.localeKey === 'p4PandaTvShirt'
        ? '#9146ff'
        : RARITY_COLORS[entry.rarity],
    enableGlitch: entry.enableGlitch,
  }))
