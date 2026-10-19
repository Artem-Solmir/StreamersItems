import { create } from 'zustand'
import { i18n, normalizeLocale } from '@/features/i18n/i18n'
import type { SupportedLocale } from '@/features/i18n/types'

interface LocaleStore {
  locale: SupportedLocale
  setLocale: (locale: SupportedLocale) => Promise<void>
}

export const useLocaleStore = create<LocaleStore>((set) => ({
  locale: normalizeLocale(i18n.language),
  setLocale: async (locale) => {
    await i18n.changeLanguage(locale)
    set({ locale })
  },
}))

i18n.on('languageChanged', (lng) => {
  useLocaleStore.setState({ locale: normalizeLocale(lng) })
})
