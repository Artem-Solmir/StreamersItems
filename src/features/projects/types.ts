import type { StreamerItem } from '@/features/items/types'

export interface StreamerItemsProject {
  id: string
  slug: string
  /** i18n prefix, e.g. `projects.cs2Loadouts` → title, subtitle, label */
  translationKey: string
  primaryGame: string
  items: StreamerItem[]
  publishedAt: string
}
