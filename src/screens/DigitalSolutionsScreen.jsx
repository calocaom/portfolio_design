import ProjectsHubScreen from './ProjectsHubScreen'
import { DIGITAL_CPHFW_COVER, DIGITAL_YOGA_COVER } from '../assets'

const MOSAICS = [
  {
    key: 'projectOne',
    route: 'digital-cphfw',
    cover: DIGITAL_CPHFW_COVER,
    coverPosition: 'left-top',
  },
  { key: 'projectTwo', route: 'digital-yoga', cover: DIGITAL_YOGA_COVER },
]

export default function DigitalSolutionsScreen({ onNavigate }) {
  return (
    <ProjectsHubScreen
      onNavigate={onNavigate}
      i18nKey="digitalSolutions"
      mosaics={MOSAICS}
    />
  )
}
