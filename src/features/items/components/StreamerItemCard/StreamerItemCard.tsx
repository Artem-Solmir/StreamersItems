import type { CSSProperties } from 'react'
import { useRef } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useTilt } from '@/features/items/hooks/useTilt'
import type { StreamerItem } from '@/features/items/types'
import styles from '@/features/items/components/StreamerItemCard/StreamerItemCard.module.css'
import { useTranslation } from 'react-i18next'
import { useStreamerAvatarsStore } from '@/features/streamers/useStreamerAvatarsStore'
import { localePath } from '@/features/seo'
import { useRouteLocale } from '@/hooks/useRouteLocale'

interface StreamerItemCardProps {
  item: StreamerItem
  projectTranslationKey: string
  isCollected: boolean
  onToggleCollect: () => void
}

export const StreamerItemCard = ({
  item,
  projectTranslationKey,
  isCollected,
  onToggleCollect,
}: StreamerItemCardProps) => {
  const { t, i18n } = useTranslation()
  const locale = useRouteLocale()
  const cardRef = useRef<HTMLElement>(null)
  useTilt(cardRef)

  const streamerAvatarUrl = useStreamerAvatarsStore(
    (state) =>
      state.avatarsByLogin[item.streamer.twitchLogin.toLowerCase()] ??
      item.streamer.avatarUrl,
  )

  const copyBase = `${projectTranslationKey}.items.${item.localeKey}`
  const description = t(`${copyBase}.description`)
  const howToGetKey = `${copyBase}.howToGet`
  const howToGet = i18n.exists(howToGetKey) ? t(howToGetKey) : null
  const funFact = t(`${copyBase}.funFact`)
  const itemHref = localePath(locale, `/items/${item.id}`)

  const cardStyle = {
    '--rarity-color': item.rarityColor,
  } as CSSProperties

  const enableGlitch = item.enableGlitch ?? item.rarity === 'secret'

  return (
    <article
      ref={cardRef}
      className={clsx(
        styles.cardContainer,
        enableGlitch && styles.cardContainerGlitch,
      )}
      style={cardStyle}
    >
      <button
        type="button"
        className={clsx(
          styles.collectedIndicator,
          isCollected && styles.collectedIndicatorActive,
        )}
        aria-pressed={isCollected}
        aria-label={t('meta.collectToggle')}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onToggleCollect()
        }}
      />

      <Link to={itemHref} className={styles.itemLink}>
        <div className={styles.imageWrapper}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className={styles.itemImage}
            loading="lazy"
            decoding="async"
            draggable={false}
          />

          <div className={styles.streamerBadge}>
            {item.streamer.isLive ? <span className={styles.liveDot} /> : null}
            <img
              src={streamerAvatarUrl}
              alt=""
              className={styles.streamerAvatar}
              width={16}
              height={16}
              loading="lazy"
              decoding="async"
            />
            <span className={styles.streamerName}>{item.streamer.name}</span>
          </div>
        </div>

        <div className={styles.itemInfo}>
          <span className={styles.gameName}>{item.game}</span>
          <h3 className={styles.itemName}>{item.name}</h3>
          <p className={styles.itemDescription}>{description}</p>
        </div>
      </Link>

      {howToGet ? (
        <div className={clsx(styles.funFact, styles.howToGet)}>
          <span className={styles.funFactLabel}>
            {t('inventory.howToGetLabel')}
          </span>
          <p className={styles.funFactText}>{howToGet}</p>
        </div>
      ) : null}
      <div className={styles.funFact}>
        <span className={styles.funFactLabel}>{t('inventory.funFactLabel')}</span>
        <p className={styles.funFactText}>{funFact}</p>
      </div>
    </article>
  )
}
