import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useStreamerAvatarsStore } from '@/features/streamers/useStreamerAvatarsStore'
import { StreamerItemCard } from '@/features/items/components/StreamerItemCard'
import { useUiClickSound } from '@/features/items/hooks/useUiClickSound'
import { FIRST_STREAMER_ITEMS_PROJECT } from '@/features/projects/registry'
import type { StreamerItemsProject } from '@/features/projects/types'
import { useCollectedItemsStore } from '@/features/items/store/useCollectedItemsStore'
import { useInventoryUiStore } from '@/features/items/store/useInventoryUiStore'
import styles from '@/features/items/components/CyberInventorySection/CyberInventorySection.module.css'

interface CyberInventorySectionProps {
  project?: StreamerItemsProject
}

export const CyberInventorySection = ({
  project = FIRST_STREAMER_ITEMS_PROJECT,
}: CyberInventorySectionProps) => {
  const { t } = useTranslation()
  const items = project.items
  const titleKey = `${project.translationKey}.title`
  const subtitleKey = `${project.translationKey}.subtitle`
  const labelKey = `${project.translationKey}.label`
  const loadAvatars = useStreamerAvatarsStore((state) => state.loadAvatars)

  useEffect(() => {
    const logins = items.map((entry) => entry.streamer.twitchLogin)
    void loadAvatars(logins)
  }, [items, loadAvatars])

  const { playCollect } = useUiClickSound()
  const soundEnabled = useInventoryUiStore((state) => state.soundEnabled)
  const toggleSound = useInventoryUiStore((state) => state.toggleSound)
  const toggleCollected = useCollectedItemsStore((state) => state.toggleCollected)
  const isCollected = useCollectedItemsStore((state) => state.isCollected)

  const collectedCount = items.filter((entry) => isCollected(entry.id)).length
  const total = items.length

  const onToggleItem = (itemId: string) => {
    const nowCollected = toggleCollected(itemId)
    if (nowCollected) {
      playCollect()
    }
  }

  return (
    <section className={styles.section} aria-labelledby="cyber-inventory-title">
      <div className={styles.header}>
        <div>
          <p className={styles.projectLabel}>{t(labelKey)}</p>
          <h2 id="cyber-inventory-title" className={styles.title}>
            {t(titleKey)}
          </h2>
          <p className={styles.subtitle}>{t(subtitleKey)}</p>
          <p className={styles.projectMeta}>
            {project.primaryGame} · {t('projects.itemCount', { count: total })}
          </p>
        </div>
        <div className={styles.controls}>
          <span className={styles.stats}>
            {t('inventory.collected', { count: collectedCount, total })}
          </span>
          <button
            type="button"
            className={styles.soundToggle}
            onClick={toggleSound}
            aria-pressed={soundEnabled}
          >
            {soundEnabled ? t('inventory.soundOn') : t('inventory.soundOff')}
          </button>
        </div>
      </div>

      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.id}>
            <StreamerItemCard
              item={item}
              projectTranslationKey={project.translationKey}
              isCollected={isCollected(item.id)}
              onToggleCollect={() => onToggleItem(item.id)}
            />
          </li>
        ))}
      </ul>

      <p className={styles.hint}>{t('inventory.hint')}</p>
    </section>
  )
}
