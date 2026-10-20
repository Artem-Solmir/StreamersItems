export interface TwitchChannel {
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

export type TwitchLoadStatus = 'idle' | 'loading' | 'success' | 'error'

export type TwitchErrorCode =
  | 'LOGINS_MISSING'
  | 'TWITCH_NOT_CONFIGURED'
  | 'TWITCH_UPSTREAM_FAILED'
  | 'NETWORK'
  | 'UNKNOWN'
