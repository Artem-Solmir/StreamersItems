import { useTranslation } from 'react-i18next'
import { StreamerItemCard } from '@/features/items/components/StreamerItemCard'
import { MOCK_STREAMER_ITEMS } from '@/features/items/data/mockStreamerItems'
import { useUiClickSound } from '@/features/items/hooks/useUiClickSound'
import { useCollectedItemsStore } from '@/features/items/store/useCollectedItemsStore'
import { useInventoryUiStore } from '@/features/items/store/useInventoryUiStore'
import styles from '@/features/items/components/CyberInventorySection/CyberInventorySection.module.css'

export const CyberInventorySection = () => {
  const { t } = useTranslation()
  const { playCollect } = useUiClickSound()
  const soundEnabled = useInventoryUiStore((state) => state.soundEnabled)
  const toggleSound = useInventoryUiStore((state) => state.toggleSound)
  const toggleCollected = useCollectedItemsStore((state) => state.toggleCollected)
  const isCollected = useCollectedItemsStore((state) => state.isCollected)
  const collectedIds = useCollectedItemsStore((state) => state.collectedIds)

  const collectedCount = Object.keys(collectedIds).length
  const total = MOCK_STREAMER_ITEMS.length

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
          <h2 id="cyber-inventory-title" className={styles.title}>
            {t('inventory.title')}
          </h2>
          <p className={styles.subtitle}>{t('inventory.subtitle')}</p>
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
        {MOCK_STREAMER_ITEMS.map((item) => (
          <li key={item.id}>
            <StreamerItemCard
              item={item}
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
