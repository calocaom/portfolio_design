import './ProjectsHubScreen.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import { useI18n } from '../i18n/I18nContext'

export default function ProjectsHubScreen({
  onNavigate,
  i18nKey,
  mosaics,
}) {
  const { t } = useI18n()

  return (
    <div className="screen projects-hub">
      <main className="projects-hub__content">
        <SiteNav
          activeId="works"
          onNavigate={onNavigate}
          trail={t(`${i18nKey}.navCrumb`)}
        />

        <section
          className="projects-hub__intro"
          aria-label={t(`${i18nKey}.title`)}
        >
          <h1 className="projects-hub__title">{t(`${i18nKey}.title`)}</h1>
        </section>

        <section
          className="projects-hub__projects"
          aria-label={t(`${i18nKey}.projectsAria`)}
        >
          <ul className="projects-hub__mosaic-grid">
            {mosaics.map(({ key, route, cover, coverPosition }) => {
              const title = t(`${i18nKey}.mosaics.${key}.title`)
              const description = t(`${i18nKey}.mosaics.${key}.description`)
              const body = (
                <>
                  <div
                    className={`projects-hub__mosaic-panel${cover ? ' projects-hub__mosaic-panel--image' : ''}`}
                    aria-hidden="true"
                  >
                    {cover ? (
                      <img
                        src={cover}
                        alt=""
                        className={`projects-hub__mosaic-image${
                          coverPosition
                            ? ` projects-hub__mosaic-image--${coverPosition}`
                            : ''
                        }`}
                      />
                    ) : null}
                  </div>
                  <div className="projects-hub__mosaic-copy">
                    <h2 className="projects-hub__mosaic-title">{title}</h2>
                    <p className="projects-hub__mosaic-description">
                      {description}
                    </p>
                  </div>
                </>
              )

              return (
                <li key={key} className="projects-hub__mosaic-item">
                  {route ? (
                    <button
                      type="button"
                      className="projects-hub__mosaic projects-hub__mosaic--link"
                      onClick={() => onNavigate?.(route)}
                      aria-label={title}
                    >
                      {body}
                    </button>
                  ) : (
                    <article className="projects-hub__mosaic">{body}</article>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <Footer className="footer--in-flow" />
      </main>
    </div>
  )
}
