import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import type { StreamerItemsProject } from '@/features/projects/types'
import { useSelectedProjectStore } from '@/features/projects/store/useSelectedProjectStore'
import styles from '@/features/projects/components/GameSidebar/GameSidebar.module.css'

interface GameSidebarProps {
  projects: StreamerItemsProject[]
}

export const GameSidebar = ({ projects }: GameSidebarProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const selectedProjectId = useSelectedProjectStore(
    (state) => state.selectedProjectId,
  )
  const selectProject = useSelectedProjectStore((state) => state.selectProject)

  return (
    <aside className={styles.sidebar} aria-label={t('sidebar.ariaLabel')}>
      <p className={styles.brand}>{t('meta.title')}</p>

      <nav className={styles.menuNav} aria-label={t('sidebar.menuLabel')}>
        <p className={styles.navTitle}>{t('sidebar.menuTitle')}</p>
        <ul className={styles.list}>
          <li>
            <NavLink
              to="/suggest-items"
              className={({ isActive }) =>
                clsx(styles.gameButton, isActive && styles.gameButtonActive)
              }
            >
              <span className={styles.gameName}>{t('sidebar.suggestItems')}</span>
              <span className={styles.gameMeta}>{t('sidebar.suggestItemsHint')}</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <nav aria-label={t('sidebar.navLabel')}>
        <p className={styles.navTitle}>{t('sidebar.gamesTitle')}</p>
        <ul className={styles.list}>
          {projects.map((project) => {
            const isActive =
              location.pathname === '/' && project.id === selectedProjectId

            return (
              <li key={project.id}>
                <button
                  type="button"
                  className={clsx(
                    styles.gameButton,
                    isActive && styles.gameButtonActive,
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => {
                    selectProject(project.id)
                    void navigate('/')
                  }}
                >
                  <span className={styles.gameName}>{project.primaryGame}</span>
                  <span className={styles.gameMeta}>
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
