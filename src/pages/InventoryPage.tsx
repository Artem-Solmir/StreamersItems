import { CyberInventorySection } from '@/features/items/components/CyberInventorySection'
import {
  FIRST_STREAMER_ITEMS_PROJECT,
  getProjectById,
} from '@/features/projects/registry'
import { useSelectedProjectStore } from '@/features/projects/store/useSelectedProjectStore'

export const InventoryPage = () => {
  const selectedProjectId = useSelectedProjectStore(
    (state) => state.selectedProjectId,
  )
  const activeProject =
    getProjectById(selectedProjectId) ?? FIRST_STREAMER_ITEMS_PROJECT

  return (
    <CyberInventorySection key={activeProject.id} project={activeProject} />
  )
}
