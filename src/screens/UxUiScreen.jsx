import './UxUiScreen.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import { useI18n } from '../i18n/I18nContext'

const MOSAICS = [
  { key: 'projectOne', route: 'botanical' },
  { key: 'projectTwo', route: 'yoga' },
]

export default function UxUiScreen({ onNavigate }) {
  const { t } = useI18n()

  return (
    <div className="screen ux-ui-screen">
      <main className="ux-ui-screen__content">
        <SiteNav
          activeId="works"
          onNavigate={onNavigate}
          trail={t('uxUi.navCrumb')}
        />

        <section
          className="ux-ui-screen__intro"
          aria-label={t('uxUi.title')}
        >
          <h1 className="ux-ui-screen__title">{t('uxUi.title')}</h1>
        </section>

        <section
          className="ux-ui-screen__projects"
          aria-label={t('uxUi.projectsAria')}
        >
          <ul className="ux-ui-screen__mosaic-grid">
            {MOSAICS.map(({ key, route }) => {
              const title = t(`uxUi.mosaics.${key}.title`)
              const description = t(`uxUi.mosaics.${key}.description`)
              const body = (
                <>
                  <div
                    className="ux-ui-screen__mosaic-panel"
                    aria-hidden="true"
                  />
                  <div className="ux-ui-screen__mosaic-copy">
                    <h2 className="ux-ui-screen__mosaic-title">{title}</h2>
                    <p className="ux-ui-screen__mosaic-description">
                      {description}
                    </p>
                  </div>
                </>
              )

              return (
                <li key={key} className="ux-ui-screen__mosaic-item">
                  {route ? (
                    <button
                      type="button"
                      className="ux-ui-screen__mosaic ux-ui-screen__mosaic--link"
                      onClick={() => onNavigate?.(route)}
                      aria-label={title}
                    >
                      {body}
                    </button>
                  ) : (
                    <article className="ux-ui-screen__mosaic">{body}</article>
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
