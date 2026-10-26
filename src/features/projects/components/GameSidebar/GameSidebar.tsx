import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import type { StreamerItemsProject } from '@/features/projects/types'
import { useSelectedProjectStore } from '@/features/projects/store/useSelectedProjectStore'
import { localePath } from '@/features/seo'
import { useRouteLocale } from '@/hooks/useRouteLocale'
import styles from '@/features/projects/components/GameSidebar/GameSidebar.module.css'

interface GameSidebarProps {
  projects: StreamerItemsProject[]
}

export const GameSidebar = ({ projects }: GameSidebarProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const locale = useRouteLocale()
  const selectedProjectId = useSelectedProjectStore(
    (state) => state.selectedProjectId,
  )
  const selectProject = useSelectedProjectStore((state) => state.selectProject)

  return (
    <aside className={styles.sidebar} aria-label={t('sidebar.ariaLabel')}>
      <Link to={localePath(locale)} className={styles.brand}>
        {t('meta.siteName')}
      </Link>

      <nav className={styles.menuNav} aria-label={t('sidebar.menuLabel')}>
        <p className={styles.navTitle}>{t('sidebar.menuTitle')}</p>
        <ul className={styles.list}>
          <li>
            <NavLink
              to={localePath(locale, '/suggest-items')}
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
            const gamePath = localePath(locale, `/games/${project.slug}`)
            const isActive =
              location.pathname === gamePath ||
              (location.pathname === localePath(locale) &&
                project.id === selectedProjectId)

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
                    void navigate(gamePath)
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
