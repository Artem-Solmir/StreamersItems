import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from '@/features/i18n/locales/en.json'
import ru from '@/features/i18n/locales/ru.json'
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from '@/features/i18n/types'

export const LOCALE_STORAGE_KEY = 'locale'

export const normalizeLocale = (lng: string): SupportedLocale => {
  const base = lng.split('-')[0]?.toLowerCase()
  if (base === 'ru') {
    return 'ru'
  }
  return DEFAULT_LOCALE
}

const syncDocumentLanguage = (lng: string) => {
  document.documentElement.lang = normalizeLocale(lng)
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      ru: { common: ru },
    },
    defaultNS: 'common',
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: [...SUPPORTED_LOCALES],
    nonExplicitSupportedLngs: true,
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: LOCALE_STORAGE_KEY,
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  })

syncDocumentLanguage(i18n.language)
i18n.on('languageChanged', syncDocumentLanguage)

export { i18n }
