import {
  DEFAULT_THEME_PREFERENCE,
  type ThemeMode,
  type ThemePreference,
} from '@/features/theme/types'

export const THEME_STORAGE_KEY = 'theme'

export const isThemePreference = (value: string): value is ThemePreference =>
  value === 'system' || value === 'light' || value === 'dark'

export const getSystemTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'light'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export const getStoredPreference = (): ThemePreference | null => {
  if (typeof window === 'undefined') {
    return null
  }
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return stored && isThemePreference(stored) ? stored : null
}

export const resolveInitialPreference = (): ThemePreference =>
  getStoredPreference() ?? DEFAULT_THEME_PREFERENCE

export const resolveEffectiveTheme = (
  preference: ThemePreference,
): ThemeMode => (preference === 'system' ? getSystemTheme() : preference)

export const applyTheme = (theme: ThemeMode) => {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export const applyPreference = (preference: ThemePreference) => {
  applyTheme(resolveEffectiveTheme(preference))
}

const onSystemThemeChange = () => {
  const preference = getStoredPreference() ?? DEFAULT_THEME_PREFERENCE
  if (preference === 'system') {
    applyTheme(getSystemTheme())
  }
}

export const initTheme = () => {
  applyPreference(resolveInitialPreference())

  if (typeof window === 'undefined') {
    return
  }

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', onSystemThemeChange)
}

initTheme()
