import { PROJECT_01_CS2_LOADOUTS } from '@/features/projects/data/project-01-cs2-loadouts'
import type { StreamerItemsProject } from '@/features/projects/types'

export const STREAMER_ITEM_PROJECTS: StreamerItemsProject[] = [
  PROJECT_01_CS2_LOADOUTS,
]

export const FIRST_STREAMER_ITEMS_PROJECT = PROJECT_01_CS2_LOADOUTS

export const getProjectBySlug = (
  slug: string,
): StreamerItemsProject | undefined =>
  STREAMER_ITEM_PROJECTS.find((project) => project.slug === slug)
