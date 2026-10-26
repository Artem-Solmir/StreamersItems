import { PROJECT_01_CS2_LOADOUTS } from '@/features/projects/data/project-01-cs2-loadouts'
import { PROJECT_02_ESCAPE_FROM_TARKOV } from '@/features/projects/data/project-02-escape-from-tarkov'
import { PROJECT_03_RUST_STREAMER_LOOT } from '@/features/projects/data/project-03-rust-streamer-loot'
import { PROJECT_04_DEAD_BY_DAYLIGHT } from '@/features/projects/data/project-04-dead-by-daylight'
import type { StreamerItem } from '@/features/items/types'
import type { StreamerItemsProject } from '@/features/projects/types'

export const STREAMER_ITEM_PROJECTS: StreamerItemsProject[] = [
  PROJECT_01_CS2_LOADOUTS,
  PROJECT_02_ESCAPE_FROM_TARKOV,
  PROJECT_03_RUST_STREAMER_LOOT,
  PROJECT_04_DEAD_BY_DAYLIGHT,
]

export const FIRST_STREAMER_ITEMS_PROJECT = PROJECT_01_CS2_LOADOUTS

export const getProjectBySlug = (
  slug: string,
): StreamerItemsProject | undefined =>
  STREAMER_ITEM_PROJECTS.find((project) => project.slug === slug)

export const getProjectById = (
  id: string,
): StreamerItemsProject | undefined =>
  STREAMER_ITEM_PROJECTS.find((project) => project.id === id)

export const getAllItems = (): StreamerItem[] =>
  STREAMER_ITEM_PROJECTS.flatMap((project) => project.items)

const itemBySlug = new Map<string, StreamerItem>(
  getAllItems().map((item) => [item.id, item]),
)

if (import.meta.env.DEV && itemBySlug.size !== getAllItems().length) {
  throw new Error('Duplicate streamer item ids detected — item slugs must be unique.')
}

export const getItemBySlug = (itemSlug: string): StreamerItem | undefined =>
  itemBySlug.get(itemSlug)

export const getProjectForItem = (
  item: StreamerItem,
): StreamerItemsProject | undefined => getProjectById(item.projectId)

export const getRelatedItems = (
  item: StreamerItem,
  limit = 6,
): StreamerItem[] =>
  getAllItems()
    .filter(
      (entry) =>
        entry.projectId === item.projectId && entry.id !== item.id,
    )
    .slice(0, limit)
