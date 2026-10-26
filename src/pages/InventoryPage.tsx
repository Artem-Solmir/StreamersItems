import { useTranslation } from 'react-i18next'
import { CyberInventorySection } from '@/features/items/components/CyberInventorySection'
import {
  FIRST_STREAMER_ITEMS_PROJECT,
  getProjectById,
} from '@/features/projects/registry'
import { useSelectedProjectStore } from '@/features/projects/store/useSelectedProjectStore'
import { PageMeta } from '@/features/seo'
import { useRouteLocale } from '@/hooks/useRouteLocale'

export const InventoryPage = () => {
  const { t } = useTranslation()
  const locale = useRouteLocale()
  const selectedProjectId = useSelectedProjectStore(
    (state) => state.selectedProjectId,
  )
  const activeProject =
    getProjectById(selectedProjectId) ?? FIRST_STREAMER_ITEMS_PROJECT

  return (
    <>
      <PageMeta
        title={t('meta.titleTemplates.home')}
        description={t('meta.defaultDescription')}
        locale={locale}
        pathWithoutLocale="/"
      />
      <CyberInventorySection key={activeProject.id} project={activeProject} />
    </>
  )
}
