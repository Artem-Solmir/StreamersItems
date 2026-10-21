import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  FIRST_STREAMER_ITEMS_PROJECT,
  getProjectById,
} from '@/features/projects/registry'

const STORAGE_KEY = 'streamers-items-selected-project'

interface SelectedProjectStore {
  selectedProjectId: string
  selectProject: (projectId: string) => void
}

export const useSelectedProjectStore = create<SelectedProjectStore>()(
  persist(
    (set) => ({
      selectedProjectId: FIRST_STREAMER_ITEMS_PROJECT.id,
      selectProject: (projectId) => {
        if (!getProjectById(projectId)) {
          return
        }
        set({ selectedProjectId: projectId })
      },
    }),
    {
      name: STORAGE_KEY,
      merge: (persisted, current) => {
        const merged = { ...current, ...(persisted as SelectedProjectStore) }
        if (!getProjectById(merged.selectedProjectId)) {
          merged.selectedProjectId = FIRST_STREAMER_ITEMS_PROJECT.id
        }
        return merged
      },
    },
  ),
)
