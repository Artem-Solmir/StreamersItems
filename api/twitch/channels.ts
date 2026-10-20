import type { VercelRequest, VercelResponse } from '@vercel/node'
import { twitchHelixFetch } from './_auth'

interface TwitchUser {
  id: string
  login: string
  display_name: string
  profile_image_url: string
}

interface TwitchStream {
  id: string
  user_id: string
  user_login: string
  user_name: string
  game_name: string
  title: string
  viewer_count: number
  started_at: string
  thumbnail_url: string
}

export interface TwitchChannelPayload {
  login: string
  displayName: string
  profileImageUrl: string
  isLive: boolean
  title: string | null
  gameName: string | null
  viewerCount: number | null
  thumbnailUrl: string | null
  startedAt: string | null
  url: string
}

const parseLogins = (value: string | string[] | undefined): string[] => {
  const raw = Array.isArray(value) ? value.join(',') : (value ?? '')
  const logins = raw
    .split(',')
    .map((login) => login.trim().toLowerCase())
    .filter(Boolean)

  return [...new Set(logins)].slice(0, 100)
}

const scaleThumbnail = (url: string, width: number, height: number) =>
  url.replace('{width}', String(width)).replace('{height}', String(height))

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
    const userParams = new URLSearchParams()
    for (const login of logins) {
      userParams.append('login', login)
    }

    const usersBody = (await twitchHelixFetch('users', userParams)) as {
      data: TwitchUser[]
    }

    const streamParams = new URLSearchParams()
    for (const login of logins) {
      streamParams.append('user_login', login)
    }

    const streamsBody = (await twitchHelixFetch('streams', streamParams)) as {
      data: TwitchStream[]
    }

    const streamByLogin = new Map(
      streamsBody.data.map((stream) => [stream.user_login.toLowerCase(), stream]),
    )

    const channels: TwitchChannelPayload[] = usersBody.data
      .map((user) => {
        const login = user.login.toLowerCase()
        const stream = streamByLogin.get(login)

        if (stream) {
          return {
            login,
            displayName: user.display_name,
            profileImageUrl: user.profile_image_url,
            isLive: true,
            title: stream.title,
            gameName: stream.game_name,
            viewerCount: stream.viewer_count,
            thumbnailUrl: scaleThumbnail(stream.thumbnail_url, 440, 248),
            startedAt: stream.started_at,
            url: `https://www.twitch.tv/${login}`,
          } satisfies TwitchChannelPayload
        }

        return {
          login,
          displayName: user.display_name,
          profileImageUrl: user.profile_image_url,
          isLive: false,
          title: null,
          gameName: null,
          viewerCount: null,
          thumbnailUrl: null,
          startedAt: null,
          url: `https://www.twitch.tv/${login}`,
        } satisfies TwitchChannelPayload
      })
      .sort((a, b) => {
        if (a.isLive !== b.isLive) {
          return a.isLive ? -1 : 1
        }
        return a.displayName.localeCompare(b.displayName, undefined, {
          sensitivity: 'base',
        })
      })

    return response.status(200).json({ channels })
  } catch (error) {
    if (error instanceof Error && error.message === 'TWITCH_NOT_CONFIGURED') {
      return response.status(503).json({ error: 'TWITCH_NOT_CONFIGURED' })
    }

    return response.status(502).json({ error: 'TWITCH_UPSTREAM_FAILED' })
  }
}
