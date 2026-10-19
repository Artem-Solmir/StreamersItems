import { create } from 'zustand'
import {
  applyPreference,
  resolveInitialPreference,
  THEME_STORAGE_KEY,
} from '@/features/theme/theme'
import type { ThemePreference } from '@/features/theme/types'

interface ThemeStore {
  preference: ThemePreference
  setPreference: (preference: ThemePreference) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  preference: resolveInitialPreference(),
  setPreference: (preference) => {
    localStorage.setItem(THEME_STORAGE_KEY, preference)
    applyPreference(preference)
    set({ preference })
  },
}))
