import type { StreamerItem } from '@/features/items/types'

export interface StreamerItemGroup {
  id: string
  /** Suffix under `{translationKey}.categories.*` */
  categoryKey: string
}

export interface StreamerItemsProject {
  id: string
  slug: string
  /** i18n prefix, e.g. `projects.cs2Loadouts` → title, subtitle, label */
  translationKey: string
  primaryGame: string
  items: StreamerItem[]
  /** When set, inventory UI shows category filters (e.g. Tarkov collector tabs). */
  itemGroups?: StreamerItemGroup[]
  publishedAt: string
}
