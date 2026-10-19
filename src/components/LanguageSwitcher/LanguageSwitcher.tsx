import type { ChangeEvent } from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import {
  SUPPORTED_LOCALES,
  useLocaleStore,
  type SupportedLocale,
} from '@/features/i18n'
import styles from '@/components/LanguageSwitcher/LanguageSwitcher.module.css'

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { t } = useTranslation()
  const locale = useLocaleStore((state) => state.locale)
  const setLocale = useLocaleStore((state) => state.setLocale)

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    void setLocale(event.target.value as SupportedLocale)
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
