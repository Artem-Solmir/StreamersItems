import {
  buildFortniteStreamerItems,
  FORTNITE_STREAMER_GROUPS,
} from '@/features/projects/data/fortnite-streamer-catalog'
import type { StreamerItemsProject } from '@/features/projects/types'

const PROJECT_ID = 'project-05-fortnite-streamer-loot'

export const PROJECT_05_FORTNITE_STREAMER_LOOT: StreamerItemsProject = {
  id: PROJECT_ID,
  slug: 'fortnite-streamer-loot',
  translationKey: 'projects.fortniteLoot',
  primaryGame: 'Fortnite',
  itemGroups: FORTNITE_STREAMER_GROUPS,
  items: buildFortniteStreamerItems(PROJECT_ID),
  publishedAt: '2026-10-28',
}
