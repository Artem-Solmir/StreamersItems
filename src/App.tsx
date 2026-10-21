import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { CyberInventorySection } from '@/features/items/components/CyberInventorySection'
import { GameSidebar } from '@/features/projects/components/GameSidebar'
import {
  FIRST_STREAMER_ITEMS_PROJECT,
  getProjectById,
  STREAMER_ITEM_PROJECTS,
} from '@/features/projects/registry'
import { useSelectedProjectStore } from '@/features/projects/store/useSelectedProjectStore'
import './App.css'

export const App = () => {
  const selectedProjectId = useSelectedProjectStore(
    (state) => state.selectedProjectId,
  )
  const activeProject =
    getProjectById(selectedProjectId) ?? FIRST_STREAMER_ITEMS_PROJECT

  return (
    <div className="appShell">
      <GameSidebar projects={STREAMER_ITEM_PROJECTS} />

      <div className="appContent">
        <header className="appHeader">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </header>

        <main className="appMain">
          <CyberInventorySection
            key={activeProject.id}
            project={activeProject}
          />
        </main>
      </div>
    </div>
  )
}
