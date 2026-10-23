import type { VercelRequest, VercelResponse } from '@vercel/node'

const MAX_LEN = {
  game: 120,
  itemName: 200,
  streamer: 120,
  description: 2000,
  funFact: 2000,
  sourceUrl: 500,
  email: 254,
  locale: 8,
} as const

const trim = (value: unknown, max: number): string => {
  if (typeof value !== 'string') {
    return ''
  }
  return value.trim().slice(0, max)
}

const parseRequestBody = (raw: unknown): Record<string, unknown> => {
  if (raw === null || raw === undefined) {
    return {}
  }
  if (typeof raw === 'string') {
    if (raw.trim() === '') {
      return {}
    }
    try {
      const parsed = JSON.parse(raw) as unknown
      return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : {}
    } catch {
      return {}
    }
  }
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    return raw as Record<string, unknown>
  }
  return {}
}

/** Accepts bare domains; API requires http(s) for URL constructor. */
const normalizeSourceUrl = (url: string): string => {
  if (url === '') {
    return ''
  }
  if (/^https?:\/\//i.test(url)) {
    return url
  }
  return `https://${url}`
}

const isValidEmail = (email: string): boolean =>
  email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const isValidUrl = (url: string): boolean => {
  if (url === '') {
    return true
  }
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

/** GAS /exec responds with 302; follow with GET to read JSON (POST body is handled on first hop). */
const postToGoogleAppsScript = async (
  webhookUrl: string,
  payload: Record<string, string>,
): Promise<{ upstreamOk: boolean; responseText: string; parsed: { ok?: boolean } | null }> => {
  const body = JSON.stringify(payload)
  let upstream = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': String(Buffer.byteLength(body, 'utf8')),
    },
    body,
    redirect: 'manual',
  })

  if ([301, 302, 303, 307, 308].includes(upstream.status)) {
    const location = upstream.headers.get('location')
    if (location) {
      upstream = await fetch(location, { method: 'GET', redirect: 'follow' })
    }
  }

  const responseText = await upstream.text()
  let parsed: { ok?: boolean } | null = null
  try {
    parsed = JSON.parse(responseText) as { ok?: boolean }
  } catch {
    parsed = null
  }

  return { upstreamOk: upstream.ok, responseText, parsed }
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'METHOD_NOT_ALLOWED' })
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEB_APP_URL
  if (!webhookUrl) {
    return response.status(503).json({ error: 'SHEETS_NOT_CONFIGURED' })
  }

  const body = parseRequestBody(request.body)
  const honeypot = trim(body.website, 200)
  if (honeypot) {
    return response.status(200).json({ ok: true })
  }

  const secret = process.env.GOOGLE_SHEETS_SUBMIT_SECRET

  const game = trim(body.game, MAX_LEN.game)
  const itemName = trim(body.itemName, MAX_LEN.itemName)
  const streamer = trim(body.streamer, MAX_LEN.streamer)
  const description = trim(body.description, MAX_LEN.description)
  const funFact = trim(body.funFact, MAX_LEN.funFact)
  const sourceUrlRaw = trim(body.sourceUrl, MAX_LEN.sourceUrl)
  const sourceUrl = normalizeSourceUrl(sourceUrlRaw)
  const email = trim(body.email, MAX_LEN.email)
  const locale = trim(body.locale, MAX_LEN.locale)

  const invalidFields: string[] = []
  if (!game) {
    invalidFields.push('gameOther')
  }
  if (!itemName) {
    invalidFields.push('itemName')
  }
  if (invalidFields.length > 0) {
    return response.status(400).json({
      error: 'VALIDATION_FAILED',
      reason: 'MISSING_REQUIRED',
      invalidFields,
    })
  }

  if (!isValidEmail(email)) {
    return response.status(400).json({
      error: 'VALIDATION_FAILED',
      reason: 'INVALID_EMAIL',
      invalidFields: ['email'],
    })
  }

  if (!isValidUrl(sourceUrl)) {
    return response.status(400).json({
      error: 'VALIDATION_FAILED',
      reason: 'INVALID_SOURCE_URL',
      invalidFields: ['sourceUrl'],
    })
  }

  const payload = {
    secret: secret ?? '',
    submittedAt: new Date().toISOString(),
    locale,
    game,
    itemName,
    streamer,
    description,
    funFact,
    sourceUrl,
    email,
  }

  try {
    const { upstreamOk, responseText, parsed } = await postToGoogleAppsScript(
      webhookUrl,
      payload,
    )

    if (!upstreamOk || parsed?.ok !== true) {
      return response.status(502).json({
        error: 'SHEETS_UPSTREAM_FAILED',
        detail: parsed ?? responseText.slice(0, 200),
      })
    }

    return response.status(200).json({ ok: true })
  } catch {
    return response.status(502).json({ error: 'SHEETS_UPSTREAM_FAILED' })
  }
}
