import type { VercelRequest, VercelResponse } from '@vercel/node'
import { twitchHelixFetch } from './_auth'

interface TwitchUser {
  login: string
  display_name: string
  profile_image_url: string
}

const parseLogins = (value: string | string[] | undefined): string[] => {
  const raw = Array.isArray(value) ? value.join(',') : (value ?? '')
  const logins = raw
    .split(',')
    .map((login) => login.trim().toLowerCase())
    .filter(Boolean)

  return [...new Set(logins)].slice(0, 100)
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'METHOD_NOT_ALLOWED' })
  }

  const logins = parseLogins(request.query.logins)
  if (logins.length === 0) {
    return response.status(400).json({ error: 'LOGINS_REQUIRED' })
  }

  try {
    const params = new URLSearchParams()
    for (const login of logins) {
      params.append('login', login)
    }

    const body = (await twitchHelixFetch('users', params)) as {
      data: TwitchUser[]
    }

    const users = body.data.map((user) => ({
      login: user.login.toLowerCase(),
      displayName: user.display_name,
      profileImageUrl: user.profile_image_url,
    }))

    return response.status(200).json({ users })
  } catch (error) {
    if (error instanceof Error && error.message === 'TWITCH_NOT_CONFIGURED') {
      return response.status(503).json({ error: 'TWITCH_NOT_CONFIGURED' })
    }

    return response.status(502).json({ error: 'TWITCH_UPSTREAM_FAILED' })
  }
}
