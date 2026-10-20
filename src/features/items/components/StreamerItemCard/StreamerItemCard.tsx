import type { CSSProperties, KeyboardEvent } from 'react'
import { useRef } from 'react'
import clsx from 'clsx'
import { useTilt } from '@/features/items/hooks/useTilt'
import type { StreamerItem } from '@/features/items/types'
import styles from '@/features/items/components/StreamerItemCard/StreamerItemCard.module.css'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  const cardRef = useRef<HTMLElement>(null)
  useTilt(cardRef)

  const copyBase = `${projectTranslationKey}.items.${item.localeKey}`
  const description = t(`${copyBase}.description`)
  const funFact = t(`${copyBase}.funFact`)

  const cardStyle = {
    '--rarity-color': item.rarityColor,
  } as CSSProperties

  const enableGlitch = item.enableGlitch ?? item.rarity === 'secret'

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onToggleCollect()
    }
  }

  return (
    <article
      ref={cardRef}
      className={clsx(
        styles.cardContainer,
        enableGlitch && styles.cardContainerGlitch,
      )}
      style={cardStyle}
      role="button"
      tabIndex={0}
      aria-pressed={isCollected}
      aria-label={`${item.name}. ${description}`}
      onClick={onToggleCollect}
      onKeyDown={onKeyDown}
    >
      <div
        className={clsx(
          styles.collectedIndicator,
          isCollected && styles.collectedIndicatorActive,
        )}
        aria-hidden
      />

      <div className={styles.imageWrapper}>
        <img src={item.imageUrl} alt="" className={styles.itemImage} loading="lazy" />

        <div className={styles.streamerBadge}>
          {item.streamer.isLive ? <span className={styles.liveDot} /> : null}
          <img
            src={item.streamer.avatarUrl}
            alt=""
            className={styles.streamerAvatar}
            width={16}
            height={16}
            loading="lazy"
          />
          <span className={styles.streamerName}>{item.streamer.name}</span>
        </div>
      </div>

      <div className={styles.itemInfo}>
        <span className={styles.gameName}>{item.game}</span>
        <h3 className={styles.itemName}>{item.name}</h3>
        <p className={styles.itemDescription}>{description}</p>
        <div className={styles.funFact}>
          <span className={styles.funFactLabel}>{t('inventory.funFactLabel')}</span>
          <p className={styles.funFactText}>{funFact}</p>
        </div>
      </div>
    </article>
  )
}
