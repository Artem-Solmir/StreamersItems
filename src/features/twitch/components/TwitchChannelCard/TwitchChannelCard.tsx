import { useTranslation } from 'react-i18next'
import type { TwitchChannel } from '@/features/twitch/types'
import styles from '@/features/twitch/components/TwitchChannelCard/TwitchChannelCard.module.css'

interface TwitchChannelCardProps {
  channel: TwitchChannel
}

export const TwitchChannelCard = ({ channel }: TwitchChannelCardProps) => {
  const { t } = useTranslation()

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={channel.profileImageUrl}
          alt=""
          width={48}
          height={48}
          loading="lazy"
        />
        <div className={styles.meta}>
          <h3 className={styles.name}>{channel.displayName}</h3>
          <p className={styles.login}>@{channel.login}</p>
          <span
            className={channel.isLive ? styles.badgeLive : styles.badgeOffline}
          >
            {channel.isLive ? t('twitch.live') : t('twitch.offline')}
          </span>
        </div>
      </div>

      {channel.isLive && channel.thumbnailUrl ? (
        <img
          className={styles.thumbnail}
          src={channel.thumbnailUrl}
          alt=""
          width={440}
          height={248}
          loading="lazy"
        />
      ) : null}

      {channel.isLive ? (
        <div className={styles.details}>
          {channel.title ? (
            <p className={styles.streamTitle}>{channel.title}</p>
          ) : null}
          {channel.gameName ? (
            <p className={styles.subline}>{channel.gameName}</p>
          ) : null}
          {channel.viewerCount !== null ? (
            <p className={styles.subline}>
              {t('twitch.viewers', { count: channel.viewerCount })}
            </p>
          ) : null}
        </div>
      ) : null}

      <a
        className={styles.link}
        href={channel.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('twitch.openChannel')}
      </a>
    </article>
  )
}
