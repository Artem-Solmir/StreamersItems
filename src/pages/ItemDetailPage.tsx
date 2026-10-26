import type { CSSProperties } from 'react'
import { useEffect, useMemo } from 'react'
import clsx from 'clsx'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { track } from '@vercel/analytics'
import { StreamerItemCard } from '@/features/items/components/StreamerItemCard'
import { useCollectedItemsStore } from '@/features/items/store/useCollectedItemsStore'
import { useStreamerAvatarsStore } from '@/features/streamers/useStreamerAvatarsStore'
import {
  getItemBySlug,
  getProjectForItem,
  getRelatedItems,
} from '@/features/projects/registry'
import { PageMeta, absoluteUrl, localePath } from '@/features/seo'
import { resolveLocale } from '@/features/seo/localePath'
import { useRouteLocale } from '@/hooks/useRouteLocale'
import styles from '@/pages/ItemDetailPage.module.css'

export const ItemDetailPage = () => {
  const { itemSlug } = useParams()
  const routeLocale = useRouteLocale()
  const { t, i18n } = useTranslation()
  const item = itemSlug ? getItemBySlug(itemSlug) : undefined
  const project = item ? getProjectForItem(item) : undefined
  const relatedItems = item ? getRelatedItems(item) : []

  const streamerAvatarUrl = useStreamerAvatarsStore(
    (state) =>
      item
        ? (state.avatarsByLogin[item.streamer.twitchLogin.toLowerCase()] ??
          item.streamer.avatarUrl)
        : '',
  )
  const loadAvatars = useStreamerAvatarsStore((state) => state.loadAvatars)
  const isCollected = useCollectedItemsStore((state) =>
    item ? state.isCollected(item.id) : false,
  )
  const isRelatedCollected = useCollectedItemsStore((state) => state.isCollected)
  const toggleCollected = useCollectedItemsStore((state) => state.toggleCollected)

  const copyBase =
    item && project ? `${project.translationKey}.items.${item.localeKey}` : ''
  const description =
    copyBase && i18n.exists(`${copyBase}.description`)
      ? t(`${copyBase}.description`)
      : ''
  const howToGetKey = `${copyBase}.howToGet`
  const howToGet = copyBase && i18n.exists(howToGetKey) ? t(howToGetKey) : null
  const funFact =
    copyBase && i18n.exists(`${copyBase}.funFact`) ? t(`${copyBase}.funFact`) : ''

  const pageTitle = item
    ? t('meta.titleTemplates.item', {
        itemName: item.name,
        game: item.game,
        streamer: item.streamer.name,
        siteName: t('meta.siteName'),
      })
    : t('meta.titleTemplates.notFound')

  const pageDescription = item ? description : t('meta.itemNotFoundDescription')
  const pathWithoutLocale = item ? `/items/${item.id}` : '/items/not-found'

  const breadcrumbJsonLd = useMemo(() => {
    if (!item || !project) {
      return null
    }
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t('meta.breadcrumbsHome'),
          item: absoluteUrl(localePath(routeLocale)),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: project.primaryGame,
          item: absoluteUrl(localePath(routeLocale, `/games/${project.slug}`)),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: item.name,
          item: absoluteUrl(localePath(routeLocale, `/items/${item.id}`)),
        },
      ],
    }
  }, [item, project, routeLocale, t])

  const productJsonLd = useMemo(() => {
    if (!item) {
      return null
    }
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: item.name,
      description,
      image: absoluteUrl(item.imageUrl),
      brand: {
        '@type': 'Brand',
        name: item.game,
      },
      category: item.game,
    }
  }, [description, item])

  useEffect(() => {
    if (item) {
      void loadAvatars([item.streamer.twitchLogin])
      track('item_page_view', {
        itemSlug: item.id,
        game: item.game,
        locale: routeLocale,
      })
    }
  }, [item, loadAvatars, routeLocale])

  useEffect(() => {
    const scripts: HTMLScriptElement[] = []
    const payloads = [breadcrumbJsonLd, productJsonLd].filter(Boolean)

    for (const payload of payloads) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(payload)
      script.dataset.seoJsonLd = 'true'
      document.head.appendChild(script)
      scripts.push(script)
    }

    return () => {
      for (const script of scripts) {
        script.remove()
      }
    }
  }, [breadcrumbJsonLd, productJsonLd])

  if (!item || !project) {
    return (
      <>
        <PageMeta
          title={pageTitle}
          description={pageDescription}
          locale={resolveLocale(routeLocale)}
          pathWithoutLocale={pathWithoutLocale}
          noindex
        />
        <div className={styles.notFound}>
          <h1>{t('meta.itemNotFoundTitle')}</h1>
          <p>{t('meta.itemNotFoundDescription')}</p>
          <Link to={localePath(routeLocale)}>{t('meta.breadcrumbsHome')}</Link>
        </div>
      </>
    )
  }

  const cardStyle = {
    '--rarity-color': item.rarityColor,
  } as CSSProperties

  return (
    <>
      <PageMeta
        title={pageTitle}
        description={pageDescription}
        locale={routeLocale}
        pathWithoutLocale={pathWithoutLocale}
        ogImagePath={item.imageUrl}
      />

      <article className={styles.page} style={cardStyle}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link to={localePath(routeLocale)}>{t('meta.breadcrumbsHome')}</Link>
          <span aria-hidden>/</span>
          <Link to={localePath(routeLocale, `/games/${project.slug}`)}>
            {project.primaryGame}
          </Link>
          <span aria-hidden>/</span>
          <span>{item.name}</span>
        </nav>

        <div className={styles.hero}>
          <div className={styles.imagePanel}>
            <img
              src={item.imageUrl}
              alt={item.name}
              className={styles.heroImage}
              width={512}
              height={512}
            />
          </div>

          <div className={styles.meta}>
            <p className={styles.game}>{item.game}</p>
            <h1 className={styles.title}>{item.name}</h1>
            <p className={styles.description}>{description}</p>

            <div className={styles.streamerRow}>
              <img
                src={streamerAvatarUrl}
                alt=""
                width={40}
                height={40}
                className={styles.streamerAvatar}
              />
              <div>
                <p className={styles.streamerLabel}>Twitch</p>
                <p className={styles.streamerName}>{item.streamer.name}</p>
              </div>
            </div>

            <button
              type="button"
              className={clsx(
                styles.collectButton,
                isCollected && styles.collectButtonActive,
              )}
              aria-pressed={isCollected}
              onClick={() => toggleCollected(item.id)}
            >
              {t('meta.collectToggle')}
            </button>

            {howToGet ? (
              <div className={styles.block}>
                <h2 className={styles.blockTitle}>{t('inventory.howToGetLabel')}</h2>
                <p>{howToGet}</p>
              </div>
            ) : null}

            <div className={styles.block}>
              <h2 className={styles.blockTitle}>{t('inventory.funFactLabel')}</h2>
              <p>{funFact}</p>
            </div>
          </div>
        </div>

        {relatedItems.length > 0 ? (
          <section className={styles.related} aria-labelledby="related-items-title">
            <h2 id="related-items-title" className={styles.relatedTitle}>
              {t('meta.relatedItems')}
            </h2>
            <ul className={styles.relatedGrid}>
              {relatedItems.map((related) => (
                <li key={related.id}>
                  <StreamerItemCard
                    item={related}
                    projectTranslationKey={project.translationKey}
                    isCollected={isRelatedCollected(related.id)}
                    onToggleCollect={() => toggleCollected(related.id)}
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  )
}
