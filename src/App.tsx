import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { CyberInventorySection } from '@/features/items/components/CyberInventorySection'
import './App.css'

export const App = () => {
  return (
    <>
      <header className="appHeader">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </header>

      <CyberInventorySection />
    </>
  )
}
