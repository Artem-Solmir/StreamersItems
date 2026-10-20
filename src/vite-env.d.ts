/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TWITCH_STREAMER_LOGINS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
