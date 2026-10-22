import { RARITY_COLORS } from '@/features/items/rarity'
import type { ItemRarity } from '@/features/items/types'
import type { StreamerItemGroup } from '@/features/projects/types'
import catalogItems from '@/features/projects/data/rust-streamer-items.json'

const IMAGE_BASE = '/items/rust'

const DEFAULT_AVATAR =
  'https://static-cdn.jtvnw.net/user-default-pictures-uv/41780b5a-def8-11e9-94d9-784f43822e80-profile_image-300x300.png'

export const RUST_STREAMER_GROUPS: StreamerItemGroup[] = [
  { id: 'armorCamo', categoryKey: 'armorCamo' },
  { id: 'weaponsSights', categoryKey: 'weaponsSights' },
  { id: 'buildTactical', categoryKey: 'buildTactical' },
]

type RustGroupId = (typeof RUST_STREAMER_GROUPS)[number]['id']

interface RustCatalogEntry {
  id: string
  localeKey: string
  name: string
  file: string
  itemGroup: RustGroupId
  streamerName: string
  twitchLogin: string
  avatarUrl?: string
  rarity: ItemRarity
  enableGlitch?: boolean
}

const img = (file: string) => `${IMAGE_BASE}/${file}`

export const RUST_STREAMER_CATALOG: RustCatalogEntry[] =
  catalogItems as RustCatalogEntry[]

export const buildRustStreamerItems = (projectId: string) =>
  RUST_STREAMER_CATALOG.map((entry) => ({
    id: entry.id,
    projectId,
    localeKey: entry.localeKey,
    name: entry.name,
    game: 'Rust',
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
      entry.localeKey === 'p3BigGrinMask'
        ? '#eb4b4b'
        : RARITY_COLORS[entry.rarity],
    enableGlitch:
      entry.enableGlitch ??
      (entry.localeKey === 'p3NinjaSuit' || entry.localeKey === 'p3BigGrinMask'),
  }))
