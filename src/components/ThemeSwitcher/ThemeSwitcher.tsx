import type { ChangeEvent } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import {
  THEME_MODES,
  useThemeStore,
  type ThemeMode,
} from '@/features/theme'
import styles from '@/components/ThemeSwitcher/ThemeSwitcher.module.css'

export const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { t } = useTranslation()
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as ThemeMode)
  }

  return (
    <div className={clsx(styles.root, className)}>
      <label className={styles.label} htmlFor="theme-select">
        {t('theme.label')}
      </label>
      <select
        id="theme-select"
        className={styles.select}
        value={theme}
        onChange={onChange}
        aria-label={t('theme.label')}
      >
        {THEME_MODES.map((mode) => (
          <option key={mode} value={mode}>
            {t(`theme.${mode}`)}
          </option>
        ))}
      </select>
    </div>
  )
}
