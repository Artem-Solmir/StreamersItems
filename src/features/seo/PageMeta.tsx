import { useEffect } from 'react'
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from '@/features/i18n/types'
import { absoluteUrl } from '@/features/seo/siteUrl'
import { localePath, pathnameWithoutLocale } from '@/features/seo/localePath'

interface PageMetaProps {
  title: string
  description: string
  locale: SupportedLocale
  /** Path after locale, e.g. `/items/p2-pestily-mask` or `/` */
  pathWithoutLocale: string
  ogImagePath?: string
  noindex?: boolean
}

const upsertMeta = (
  attribute: 'name' | 'property',
  key: string,
  content: string,
) => {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`,
  ) as HTMLMetaElement | null
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

const upsertLink = (rel: string, href: string, hreflang?: string) => {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  let element = document.head.querySelector(selector) as HTMLLinkElement | null
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    if (hreflang) {
      element.hreflang = hreflang
    }
    document.head.appendChild(element)
  }
  element.href = href
}

export const PageMeta = ({
  title,
  description,
  locale,
  pathWithoutLocale,
  ogImagePath = '/icon-512.png',
  noindex = false,
}: PageMetaProps) => {
  useEffect(() => {
    document.title = title
    document.documentElement.lang = locale

    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:locale', locale === 'ru' ? 'ru_RU' : 'en_US')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    const normalizedPath =
      pathWithoutLocale === '/' ? '' : pathWithoutLocale.replace(/\/+$/, '')
    const canonicalPath = localePath(locale, normalizedPath)
    const canonicalUrl = absoluteUrl(canonicalPath)
    const ogImage = absoluteUrl(ogImagePath)

    upsertLink('canonical', canonicalUrl)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('name', 'twitter:image', ogImage)

    for (const code of SUPPORTED_LOCALES) {
      const altPath = localePath(code, normalizedPath)
      upsertLink('alternate', absoluteUrl(altPath), code)
    }
    upsertLink(
      'alternate',
      absoluteUrl(localePath(DEFAULT_LOCALE, normalizedPath)),
      'x-default',
    )

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow')
    } else {
      upsertMeta('name', 'robots', 'index, follow')
    }
  }, [description, locale, noindex, ogImagePath, pathWithoutLocale, title])

  return null
}

/** Stable path segment for hreflang swaps (no locale prefix). */
export const metaPathFromLocation = (pathname: string): string =>
  pathnameWithoutLocale(pathname) || '/'
