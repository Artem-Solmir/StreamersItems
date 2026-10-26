import { useParams } from 'react-router-dom'
import { resolveLocale } from '@/features/seo/localePath'
import type { SupportedLocale } from '@/features/i18n/types'

export const useRouteLocale = (): SupportedLocale => {
  const { locale } = useParams()
  return resolveLocale(locale)
}
