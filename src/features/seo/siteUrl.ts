const trimTrailingSlash = (url: string) => url.replace(/\/+$/, '')

/** Public site origin for canonical / OG URLs (`VITE_SITE_URL` or current origin in browser). */
export const getSiteOrigin = (): string => {
  const fromEnv = import.meta.env.VITE_SITE_URL
  if (typeof fromEnv === 'string' && fromEnv.length > 0) {
    return trimTrailingSlash(fromEnv)
  }
  if (typeof window !== 'undefined') {
    return trimTrailingSlash(window.location.origin)
  }
  return 'https://streamersitems.vercel.app'
}

export const absoluteUrl = (path: string): string => {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${getSiteOrigin()}${normalized}`
}
