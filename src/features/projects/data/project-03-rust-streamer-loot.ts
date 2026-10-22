import {
  buildRustStreamerItems,
  RUST_STREAMER_GROUPS,
} from '@/features/projects/data/rust-streamer-catalog'
import type { StreamerItemsProject } from '@/features/projects/types'

const PROJECT_ID = 'project-03-rust-streamer-loot'

export const PROJECT_03_RUST_STREAMER_LOOT: StreamerItemsProject = {
  id: PROJECT_ID,
  slug: 'rust-streamer-loot',
  translationKey: 'projects.rustLoot',
  primaryGame: 'Rust',
  itemGroups: RUST_STREAMER_GROUPS,
  items: buildRustStreamerItems(PROJECT_ID),
  publishedAt: '2026-10-22',
}
