import ProjectsHubScreen from './ProjectsHubScreen'

const MOSAICS = [
  { key: 'projectOne', route: 'digital-bla-sol', cover: null },
  { key: 'projectTwo', route: 'digital-yoga', cover: null },
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
