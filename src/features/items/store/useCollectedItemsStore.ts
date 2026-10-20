import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const STORAGE_KEY = 'streamers-items-collected'

interface CollectedItemsStore {
  collectedIds: Record<string, true>
  toggleCollected: (itemId: string) => boolean
  isCollected: (itemId: string) => boolean
}

export const useCollectedItemsStore = create<CollectedItemsStore>()(
  persist(
    (set, get) => ({
      collectedIds: {},
      isCollected: (itemId) => Boolean(get().collectedIds[itemId]),
      toggleCollected: (itemId) => {
        const wasCollected = Boolean(get().collectedIds[itemId])
        set((state) => {
          const next = { ...state.collectedIds }
          if (wasCollected) {
            delete next[itemId]
          } else {
            next[itemId] = true
          }
          return { collectedIds: next }
        })
        return !wasCollected
      },
    }),
    { name: STORAGE_KEY },
  ),
)
