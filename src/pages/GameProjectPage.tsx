import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CyberInventorySection } from '@/features/items/components/CyberInventorySection'
import { PageMeta } from '@/features/seo'
import { getProjectBySlug } from '@/features/projects/registry'
import { useSelectedProjectStore } from '@/features/projects/store/useSelectedProjectStore'
import { resolveLocale } from '@/features/seo/localePath'

export const GameProjectPage = () => {
  const { locale, projectSlug } = useParams()
  const { t } = useTranslation()
  const resolvedLocale = resolveLocale(locale)
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined
  const selectProject = useSelectedProjectStore((state) => state.selectProject)

  useEffect(() => {
    if (project) {
      selectProject(project.id)
    }
  }, [project, selectProject])

  if (!projectSlug || !project) {
    return <Navigate to={`/${resolvedLocale}`} replace />
  }

  const title = t('meta.titleTemplates.game', {
    game: project.primaryGame,
    siteName: t('meta.siteName'),
  })
  const description = t(`${project.translationKey}.subtitle`)

  return (
    <>
      <PageMeta
        title={title}
        description={description}
        locale={resolvedLocale}
        pathWithoutLocale={`/games/${project.slug}`}
      />
      <CyberInventorySection project={project} />
    </>
  )
}
