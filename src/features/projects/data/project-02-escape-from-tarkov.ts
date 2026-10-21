import {
  buildTarkovCollectorItems,
  TARKOV_COLLECTOR_GROUPS,
} from '@/features/projects/data/tarkov-collector-catalog'
import type { StreamerItemsProject } from '@/features/projects/types'

const PROJECT_ID = 'project-02-escape-from-tarkov'

export const PROJECT_02_ESCAPE_FROM_TARKOV: StreamerItemsProject = {
  id: PROJECT_ID,
  slug: 'escape-from-tarkov-streamer-loot',
  translationKey: 'projects.tarkovLoot',
  primaryGame: 'Escape from Tarkov',
  itemGroups: TARKOV_COLLECTOR_GROUPS,
  items: buildTarkovCollectorItems(PROJECT_ID),
  publishedAt: '2026-10-21',
}
