export const getConfiguredStreamerLogins = (): string[] => {
  const raw = import.meta.env.VITE_TWITCH_STREAMER_LOGINS?.trim()
  if (!raw) {
    return []
  }

  const logins = raw
    .split(',')
    .map((login) => login.trim().toLowerCase())
    .filter(Boolean)

  return [...new Set(logins)]
}
