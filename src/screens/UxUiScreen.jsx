import ProjectsHubScreen from './ProjectsHubScreen'
import { BOTANICAL_COVER } from '../assets'

const MOSAICS = [
  { key: 'projectTwo', route: 'yoga', cover: null },
  { key: 'projectOne', route: 'botanical', cover: BOTANICAL_COVER },
]

export default function UxUiScreen({ onNavigate }) {
  return (
    <ProjectsHubScreen
      onNavigate={onNavigate}
      i18nKey="uxUi"
      mosaics={MOSAICS}
    />
  )
}
