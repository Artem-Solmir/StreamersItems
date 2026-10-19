import { DEFAULT_THEME, type ThemeMode } from '@/features/theme/types'

export const THEME_STORAGE_KEY = 'theme'

export const isThemeMode = (value: string): value is ThemeMode =>
  value === 'light' || value === 'dark'

export const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export const getStoredTheme = (): ThemeMode | null => {
  if (typeof window === 'undefined') {
    return null
  }
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return stored && isThemeMode(stored) ? stored : null
}

export const resolveInitialTheme = (): ThemeMode =>
  getStoredTheme() ?? getSystemTheme()

export const applyTheme = (theme: ThemeMode) => {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

applyTheme(resolveInitialTheme())
