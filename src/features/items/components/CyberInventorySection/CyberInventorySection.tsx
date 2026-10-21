import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
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
  const [activeGroupId, setActiveGroupId] = useState<string>('all')
  const items = project.items
  const itemGroups = project.itemGroups ?? []

  const visibleItems = useMemo(() => {
    if (activeGroupId === 'all' || itemGroups.length === 0) {
      return items
    }
    return items.filter((entry) => entry.itemGroup === activeGroupId)
  }, [activeGroupId, itemGroups.length, items])
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
  const visibleCollectedCount = visibleItems.filter((entry) =>
    isCollected(entry.id),
  ).length

  const onToggleItem = (itemId: string) => {
    const nowCollected = toggleCollected(itemId)
    if (nowCollected) {
      playCollect()
    }
  }

  return (
    <section
      className={styles.section}
      aria-labelledby={`inventory-title-${project.id}`}
    >
      <div className={styles.header}>
        <div>
          <p className={styles.projectLabel}>{t(labelKey)}</p>
          <h2 id={`inventory-title-${project.id}`} className={styles.title}>
            {t(titleKey)}
          </h2>
          <p className={styles.subtitle}>{t(subtitleKey)}</p>
          <p className={styles.projectMeta}>
            {project.primaryGame} · {t('projects.itemCount', { count: total })}
            {itemGroups.length > 0 && activeGroupId !== 'all' ? (
              <>
                {' '}
                ·{' '}
                {t('inventory.filteredCount', {
                  count: visibleItems.length,
                  collected: visibleCollectedCount,
                })}
              </>
            ) : null}
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

      {itemGroups.length > 0 ? (
        <div
          className={styles.categoryFilters}
          role="tablist"
          aria-label={t('inventory.categoryFiltersLabel')}
        >
          <button
            type="button"
            role="tab"
            className={clsx(
              styles.categoryChip,
              activeGroupId === 'all' && styles.categoryChipActive,
            )}
            aria-selected={activeGroupId === 'all'}
            onClick={() => setActiveGroupId('all')}
          >
            {t(`${project.translationKey}.filterAll`)}
          </button>
          {itemGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              role="tab"
              className={clsx(
                styles.categoryChip,
                activeGroupId === group.id && styles.categoryChipActive,
              )}
              aria-selected={activeGroupId === group.id}
              onClick={() => setActiveGroupId(group.id)}
            >
              {t(`${project.translationKey}.categories.${group.categoryKey}`)}
            </button>
          ))}
        </div>
      ) : null}

      <ul className={styles.grid}>
        {visibleItems.map((item) => (
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
