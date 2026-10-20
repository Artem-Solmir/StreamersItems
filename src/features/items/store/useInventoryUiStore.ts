import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface InventoryUiStore {
  soundEnabled: boolean
  setSoundEnabled: (enabled: boolean) => void
  toggleSound: () => void
}

export const useInventoryUiStore = create<InventoryUiStore>()(
  persist(
    (set, get) => ({
      soundEnabled: true,
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      toggleSound: () => set({ soundEnabled: !get().soundEnabled }),
    }),
    { name: 'streamers-items-inventory-ui' },
  ),
)
