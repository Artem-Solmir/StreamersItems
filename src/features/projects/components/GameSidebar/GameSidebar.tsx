import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import type { StreamerItemsProject } from '@/features/projects/types'
import { useSelectedProjectStore } from '@/features/projects/store/useSelectedProjectStore'
import styles from '@/features/projects/components/GameSidebar/GameSidebar.module.css'

interface GameSidebarProps {
  projects: StreamerItemsProject[]
}

export const GameSidebar = ({ projects }: GameSidebarProps) => {
  const { t } = useTranslation()
  const selectedProjectId = useSelectedProjectStore(
    (state) => state.selectedProjectId,
  )
  const selectProject = useSelectedProjectStore((state) => state.selectProject)

  return (
    <aside className={styles.sidebar} aria-label={t('sidebar.ariaLabel')}>
      <p className={styles.brand}>{t('meta.title')}</p>
      <nav aria-label={t('sidebar.navLabel')}>
        <p className={styles.navTitle}>{t('sidebar.gamesTitle')}</p>
        <ul className={styles.list}>
          {projects.map((project) => {
            const isActive = project.id === selectedProjectId
            const labelKey = `${project.translationKey}.label`

            return (
              <li key={project.id}>
                <button
                  type="button"
                  className={clsx(
                    styles.gameButton,
                    isActive && styles.gameButtonActive,
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => selectProject(project.id)}
                >
                  <span className={styles.gameName}>{project.primaryGame}</span>
                  <span className={styles.gameMeta}>
                    {t(labelKey)} ·{' '}
                    {t('projects.itemCount', { count: project.items.length })}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
