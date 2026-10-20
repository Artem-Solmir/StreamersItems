import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { CyberInventorySection } from '@/features/items/components/CyberInventorySection'
import { STREAMER_ITEM_PROJECTS } from '@/features/projects/registry'
import './App.css'

export const App = () => {
  return (
    <>
      <header className="appHeader">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </header>

      <main className="appMain">
        {STREAMER_ITEM_PROJECTS.map((project) => (
          <CyberInventorySection key={project.id} project={project} />
        ))}
      </main>
    </>
  )
}
