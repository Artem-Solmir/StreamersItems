import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TwitchChannelCard } from '@/features/twitch/components/TwitchChannelCard'
import { useTwitchStore } from '@/features/twitch/useTwitchStore'
import type { TwitchErrorCode } from '@/features/twitch/types'
import styles from '@/features/twitch/components/TwitchLiveSection/TwitchLiveSection.module.css'

const ERROR_I18N_KEY: Record<TwitchErrorCode, string> = {
  LOGINS_MISSING: 'twitch.errors.loginsMissing',
  TWITCH_NOT_CONFIGURED: 'twitch.errors.notConfigured',
  TWITCH_UPSTREAM_FAILED: 'twitch.errors.upstreamFailed',
  NETWORK: 'twitch.errors.network',
  UNKNOWN: 'twitch.errors.unknown',
}

export const TwitchLiveSection = () => {
  const { t } = useTranslation()
  const channels = useTwitchStore((state) => state.channels)
  const status = useTwitchStore((state) => state.status)
  const errorCode = useTwitchStore((state) => state.errorCode)
  const loadChannels = useTwitchStore((state) => state.loadChannels)

  useEffect(() => {
    void loadChannels()
  }, [loadChannels])

  const isLoading = status === 'loading' || status === 'idle'
  const showError = status === 'error' && errorCode

  return (
    <section className={styles.section} aria-labelledby="twitch-live-title">
      <div className={styles.headerRow}>
        <div>
          <h2 id="twitch-live-title" className={styles.title}>
            {t('twitch.title')}
          </h2>
          <p className={styles.subtitle}>{t('twitch.subtitle')}</p>
        </div>
        <button
          type="button"
          className={styles.refreshButton}
          onClick={() => void loadChannels()}
          disabled={isLoading}
        >
          {isLoading ? t('twitch.refreshing') : t('twitch.refresh')}
        </button>
      </div>

      {showError ? (
        <p className={styles.messageError}>
          {t(ERROR_I18N_KEY[errorCode])}
        </p>
      ) : null}

      {!showError && isLoading ? (
        <p className={styles.message}>{t('twitch.loading')}</p>
      ) : null}

      {!showError && !isLoading && channels.length > 0 ? (
        <ul className={styles.grid}>
          {channels.map((channel) => (
            <li key={channel.login}>
              <TwitchChannelCard channel={channel} />
            </li>
          ))}
        </ul>
      ) : null}

      {!showError && !isLoading && channels.length === 0 ? (
        <p className={styles.message}>{t('twitch.empty')}</p>
      ) : null}
    </section>
  )
}
