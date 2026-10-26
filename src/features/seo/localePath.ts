import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from '@/features/i18n/types'

export const isSupportedLocale = (value: string | undefined): value is SupportedLocale =>
  SUPPORTED_LOCALES.includes(value as SupportedLocale)

export const localePath = (locale: SupportedLocale, path = ''): string => {
  const suffix = path.startsWith('/') ? path : path ? `/${path}` : ''
  return `/${locale}${suffix}`
}

export const parseLocaleFromPathname = (pathname: string): SupportedLocale | null => {
  const segment = pathname.split('/').filter(Boolean)[0]
  return isSupportedLocale(segment) ? segment : null
}

export const pathnameWithoutLocale = (pathname: string): string => {
  const locale = parseLocaleFromPathname(pathname)
  if (!locale) {
    return pathname || '/'
  }
  const rest = pathname.slice(locale.length + 1)
  return rest ? `/${rest.replace(/^\/+/, '')}` : '/'
}

export const swapLocaleInPathname = (
  pathname: string,
  nextLocale: SupportedLocale,
): string => {
  const rest = pathnameWithoutLocale(pathname)
  return localePath(nextLocale, rest === '/' ? '' : rest)
}

export const resolveLocale = (value: string | undefined): SupportedLocale =>
  isSupportedLocale(value) ? value : DEFAULT_LOCALE
