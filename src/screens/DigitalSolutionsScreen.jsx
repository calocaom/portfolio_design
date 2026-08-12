import ProjectsHubScreen from './ProjectsHubScreen'

const MOSAICS = [
  { key: 'projectOne', route: null, cover: null },
  { key: 'projectTwo', route: null, cover: null },
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
