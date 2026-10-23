import {
  buildDbdStreamerItems,
  DBD_STREAMER_GROUPS,
} from '@/features/projects/data/dbd-streamer-catalog'
import type { StreamerItemsProject } from '@/features/projects/types'

const PROJECT_ID = 'project-04-dead-by-daylight'

export const PROJECT_04_DEAD_BY_DAYLIGHT: StreamerItemsProject = {
  id: PROJECT_ID,
  slug: 'dead-by-daylight-streamer-loot',
  translationKey: 'projects.dbdLoot',
  primaryGame: 'Dead by Daylight',
  itemGroups: DBD_STREAMER_GROUPS,
  items: buildDbdStreamerItems(PROJECT_ID),
  publishedAt: '2026-10-22',
}
