import type { ChangeEvent } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  SUPPORTED_LOCALES,
  useLocaleStore,
  type SupportedLocale,
} from '@/features/i18n'
import { swapLocaleInPathname } from '@/features/seo'
import styles from '@/components/LanguageSwitcher/LanguageSwitcher.module.css'

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const locale = useLocaleStore((state) => state.locale)

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value as SupportedLocale
    const nextPath = swapLocaleInPathname(location.pathname, nextLocale)
    void navigate(`${nextPath}${location.search}${location.hash}`)
  }

  return (
    <div className={clsx(styles.root, className)}>
      <label className={styles.label} htmlFor="language-select">
        {t('language.label')}
      </label>
      <select
        id="language-select"
        className={styles.select}
        value={locale}
        onChange={onChange}
        aria-label={t('language.label')}
      >
        {SUPPORTED_LOCALES.map((code) => (
          <option key={code} value={code}>
            {t(`language.${code}`)}
          </option>
        ))}
      </select>
    </div>
  )
}
