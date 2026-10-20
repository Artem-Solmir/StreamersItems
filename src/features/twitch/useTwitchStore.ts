import { create } from 'zustand'
import { fetchTwitchChannels, TwitchApiError } from '@/features/twitch/api'
import { getConfiguredStreamerLogins } from '@/features/twitch/config'
import type {
  TwitchChannel,
  TwitchErrorCode,
  TwitchLoadStatus,
} from '@/features/twitch/types'

interface TwitchStore {
  channels: TwitchChannel[]
  status: TwitchLoadStatus
  errorCode: TwitchErrorCode | null
  lastFetchedAt: number | null
  loadChannels: (logins?: string[]) => Promise<void>
}

export const useTwitchStore = create<TwitchStore>((set) => ({
  channels: [],
  status: 'idle',
  errorCode: null,
  lastFetchedAt: null,
  loadChannels: async (logins = getConfiguredStreamerLogins()) => {
    if (logins.length === 0) {
      set({
        channels: [],
        status: 'error',
        errorCode: 'LOGINS_MISSING',
        lastFetchedAt: null,
      })
      return
    }

    set({ status: 'loading', errorCode: null })

    try {
      const channels = await fetchTwitchChannels(logins)
      set({
        channels,
        status: 'success',
        errorCode: null,
        lastFetchedAt: Date.now(),
      })
    } catch (error) {
      const errorCode =
        error instanceof TwitchApiError ? error.code : 'UNKNOWN'

      set({
        channels: [],
        status: 'error',
        errorCode,
        lastFetchedAt: null,
      })
    }
  },
}))
