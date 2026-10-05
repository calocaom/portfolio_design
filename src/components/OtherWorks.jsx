import './OtherWorks.css'
import { useI18n } from '../i18n/I18nContext'
import { PROJECT_IMAGES, PROJECT_LINKS, PROJECT_ROUTES } from '../data/projects'

const OTHER_WORK_IDS = [1, 2, 4, 5]

export default function OtherWorks({ onNavigate }) {
  const { dict } = useI18n()

  return (
    <ul className="other-works__grid">
      {OTHER_WORK_IDS.map((id) => {
        const project = dict.projects[id]
        const href = PROJECT_LINKS[id]
        const route = PROJECT_ROUTES[id]
        const image = PROJECT_IMAGES[id]
        const label = project.title.replace(/\n/g, ' ')
        const hexClass = `other-works__hex scroll-zoom${image ? '' : ' other-works__hex--empty'}`
        const cover = (
          <>
            {image ? (
              <img
                src={image}
                alt=""
                className={`other-works__image${id === 5 ? ' other-works__image--art' : ''}`}
              />
            ) : null}
            <span className="other-works__veil" aria-hidden="true" />
            <span className="other-works__title">
              {project.title.split('\n').map((line) => (
                <span key={line} className="other-works__title-line">
                  {line}
                </span>
              ))}
            </span>
          </>
        )

        return (
          <li key={id} className="other-works__item">
            {href ? (
              <a
                className={hexClass}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
              >
                {cover}
              </a>
            ) : (
              <button
                type="button"
                className={hexClass}
                onClick={() => onNavigate?.(route)}
                aria-label={label}
              >
                {cover}
              </button>
            )}
          </li>
        )
      })}
    </ul>
  )
}
