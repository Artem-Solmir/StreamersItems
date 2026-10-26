import { useEffect } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useLocaleStore } from '@/features/i18n/useLocaleStore'
import { DEFAULT_LOCALE } from '@/features/i18n/types'
import { isSupportedLocale } from '@/features/seo/localePath'

export const LocaleLayout = () => {
  const { locale } = useParams()
  const setLocale = useLocaleStore((state) => state.setLocale)
  const valid = isSupportedLocale(locale)

  useEffect(() => {
    if (!valid || !locale) {
      return
    }
    void setLocale(locale)
    document.documentElement.lang = locale
  }, [locale, setLocale, valid])

  if (!valid) {
    return <Navigate to={`/${DEFAULT_LOCALE}`} replace />
  }

  return <Outlet />
}
