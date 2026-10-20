import { create } from 'zustand'

interface StreamerAvatarsStore {
  avatarsByLogin: Record<string, string>
  loadAvatars: (logins: string[]) => Promise<void>
  getAvatarUrl: (login: string, fallbackUrl: string) => string
}

export const useStreamerAvatarsStore = create<StreamerAvatarsStore>(
  (set, get) => ({
    avatarsByLogin: {},
    getAvatarUrl: (login, fallbackUrl) => {
      const key = login.toLowerCase()
      return get().avatarsByLogin[key] ?? fallbackUrl
    },
    loadAvatars: async (logins) => {
      const unique = [...new Set(logins.map((l) => l.toLowerCase()))].filter(
        Boolean,
      )
      if (unique.length === 0) {
        return
      }

      try {
        const params = new URLSearchParams({ logins: unique.join(',') })
        const response = await fetch(`/api/twitch/users?${params.toString()}`)
        if (!response.ok) {
          return
        }

        const body = (await response.json()) as {
          users: { login: string; profileImageUrl: string }[]
        }

        set((state) => {
          const next = { ...state.avatarsByLogin }
          for (const user of body.users) {
            next[user.login.toLowerCase()] = user.profileImageUrl
          }
          return { avatarsByLogin: next }
        })
      } catch {
        // Offline / local dev without vercel dev — keep fallback URLs from data.
      }
    },
  }),
)
