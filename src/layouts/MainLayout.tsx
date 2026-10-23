import { Outlet } from 'react-router-dom'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { GameSidebar } from '@/features/projects/components/GameSidebar'
import { STREAMER_ITEM_PROJECTS } from '@/features/projects/registry'
import '@/App.css'

export const MainLayout = () => (
  <div className="appShell">
    <GameSidebar projects={STREAMER_ITEM_PROJECTS} />

    <div className="appContent">
      <header className="appHeader">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </header>

      <main className="appMain">
        <Outlet />
      </main>
    </div>
  </div>
)
