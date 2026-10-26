import { Navigate, createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { InventoryPage } from '@/pages/InventoryPage'
import { ItemDetailPage } from '@/pages/ItemDetailPage'
import { GameProjectPage } from '@/pages/GameProjectPage'
import { SuggestItemPage } from '@/pages/SuggestItemPage'
import { LocaleLayout } from '@/routes/LocaleLayout'
import { DEFAULT_LOCALE } from '@/features/i18n/types'

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to={`/${DEFAULT_LOCALE}`} replace /> },
  {
    path: 'suggest-items',
    element: <Navigate to={`/${DEFAULT_LOCALE}/suggest-items`} replace />,
  },
  {
    path: '/:locale',
    element: <LocaleLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <InventoryPage /> },
          { path: 'games/:projectSlug', element: <GameProjectPage /> },
          { path: 'items/:itemSlug', element: <ItemDetailPage /> },
          { path: 'suggest-items', element: <SuggestItemPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to={`/${DEFAULT_LOCALE}`} replace /> },
])
