interface TokenCache {
  accessToken: string
  expiresAtMs: number
}

let tokenCache: TokenCache | null = null

export const getTwitchCredentials = () => {
  const clientId = process.env.TWITCH_CLIENT_ID
  const clientSecret = process.env.TWITCH_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return null
  }

  return { clientId, clientSecret }
}

export const getAppAccessToken = async (): Promise<string> => {
  const credentials = getTwitchCredentials()
  if (!credentials) {
    throw new Error('TWITCH_NOT_CONFIGURED')
  }

  const now = Date.now()
  if (tokenCache && now < tokenCache.expiresAtMs - 60_000) {
    return tokenCache.accessToken
  }

  const params = new URLSearchParams({
    client_id: credentials.clientId,
    client_secret: credentials.clientSecret,
    grant_type: 'client_credentials',
  })

  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?${params.toString()}`,
    { method: 'POST' },
  )

  if (!response.ok) {
    throw new Error('TWITCH_TOKEN_FAILED')
  }

  const body = (await response.json()) as {
    access_token: string
    expires_in: number
  }

  tokenCache = {
    accessToken: body.access_token,
    expiresAtMs: now + body.expires_in * 1000,
  }

  return tokenCache.accessToken
}

export const twitchHelixFetch = async (
  path: string,
  searchParams: URLSearchParams,
) => {
  const credentials = getTwitchCredentials()
  if (!credentials) {
    throw new Error('TWITCH_NOT_CONFIGURED')
  }

  const token = await getAppAccessToken()
  const url = `https://api.twitch.tv/helix/${path}?${searchParams.toString()}`

  const response = await fetch(url, {
    headers: {
      'Client-Id': credentials.clientId,
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('TWITCH_HELIX_FAILED')
  }

  return response.json()
}
