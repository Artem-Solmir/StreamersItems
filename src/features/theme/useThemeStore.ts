import { create } from 'zustand'
import {
  applyTheme,
  resolveInitialTheme,
  THEME_STORAGE_KEY,
} from '@/features/theme/theme'
import type { ThemeMode } from '@/features/theme/types'

interface ThemeStore {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: resolveInitialTheme(),
  setTheme: (theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
    applyTheme(theme)
    set({ theme })
  },
}))
