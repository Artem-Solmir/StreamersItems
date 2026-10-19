import type { ChangeEvent } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import {
  THEME_PREFERENCES,
  useThemeStore,
  type ThemePreference,
} from '@/features/theme'
import styles from '@/components/ThemeSwitcher/ThemeSwitcher.module.css'

export const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { t } = useTranslation()
  const preference = useThemeStore((state) => state.preference)
  const setPreference = useThemeStore((state) => state.setPreference)

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPreference(event.target.value as ThemePreference)
  }

  return (
    <div className={clsx(styles.root, className)}>
      <label className={styles.label} htmlFor="theme-select">
        {t('theme.label')}
      </label>
      <select
        id="theme-select"
        className={styles.select}
        value={preference}
        onChange={onChange}
        aria-label={t('theme.label')}
      >
        {THEME_PREFERENCES.map((mode) => (
          <option key={mode} value={mode}>
            {t(`theme.${mode}`)}
          </option>
        ))}
      </select>
    </div>
  )
}
