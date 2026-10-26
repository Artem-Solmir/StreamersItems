import { useTranslation } from 'react-i18next'
import { SuggestItemForm } from '@/features/suggest/components/SuggestItemForm/SuggestItemForm'
import { PageMeta } from '@/features/seo'
import { useRouteLocale } from '@/hooks/useRouteLocale'

export const SuggestItemPage = () => {
  const { t } = useTranslation()
  const locale = useRouteLocale()

  return (
    <>
      <PageMeta
        title={t('meta.titleTemplates.suggest')}
        description={t('suggest.subtitle')}
        locale={locale}
        pathWithoutLocale="/suggest-items"
      />
      <SuggestItemForm />
    </>
  )
}
