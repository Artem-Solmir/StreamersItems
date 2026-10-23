import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { InventoryPage } from '@/pages/InventoryPage'
import { SuggestItemPage } from '@/pages/SuggestItemPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <InventoryPage /> },
      { path: 'suggest-items', element: <SuggestItemPage /> },
    ],
  },
])
