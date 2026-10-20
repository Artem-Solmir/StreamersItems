import type { TwitchChannel, TwitchErrorCode } from '@/features/twitch/types'

interface ChannelsResponse {
  channels: TwitchChannel[]
}

interface ErrorResponse {
  error: string
}

export class TwitchApiError extends Error {
  readonly code: TwitchErrorCode

  constructor(code: TwitchErrorCode, message?: string) {
    super(message ?? code)
    this.name = 'TwitchApiError'
    this.code = code
  }
}

export const fetchTwitchChannels = async (
  logins: string[],
): Promise<TwitchChannel[]> => {
  if (logins.length === 0) {
    throw new TwitchApiError('LOGINS_MISSING')
  }

  const params = new URLSearchParams({
    logins: logins.join(','),
  })

  let response: Response
  try {
    response = await fetch(`/api/twitch/channels?${params.toString()}`)
  } catch {
    throw new TwitchApiError('NETWORK')
  }

  let body: ChannelsResponse | ErrorResponse
  try {
    body = (await response.json()) as ChannelsResponse | ErrorResponse
  } catch {
    throw new TwitchApiError('NETWORK')
  }

  if (!response.ok) {
    const code = 'error' in body ? body.error : 'UNKNOWN'
    if (code === 'TWITCH_NOT_CONFIGURED') {
      throw new TwitchApiError('TWITCH_NOT_CONFIGURED')
    }
    if (code === 'TWITCH_UPSTREAM_FAILED') {
      throw new TwitchApiError('TWITCH_UPSTREAM_FAILED')
    }
    throw new TwitchApiError('UNKNOWN')
  }

  return (body as ChannelsResponse).channels
}
