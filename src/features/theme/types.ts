export const THEME_MODES = ['light', 'dark'] as const

export type ThemeMode = (typeof THEME_MODES)[number]

export const THEME_PREFERENCES = ['system', 'light', 'dark'] as const

export type ThemePreference = (typeof THEME_PREFERENCES)[number]

export const DEFAULT_THEME_PREFERENCE: ThemePreference = 'system'
