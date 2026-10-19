import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/features/theme/theme'
import '@/features/theme/useThemeStore'
import { i18n } from '@/features/i18n/i18n'
import '@/features/i18n/useLocaleStore'
import { App } from '@/App'
import './index.css'

void i18n

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
