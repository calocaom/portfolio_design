import './UxUiScreen.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import { useI18n } from '../i18n/I18nContext'

const MOSAIC_KEYS = ['projectOne', 'projectTwo']

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
            {MOSAIC_KEYS.map((key) => (
              <li key={key} className="ux-ui-screen__mosaic-item">
                <article className="ux-ui-screen__mosaic">
                  <div
                    className="ux-ui-screen__mosaic-panel"
                    aria-hidden="true"
                  />
                  <div className="ux-ui-screen__mosaic-copy">
                    <h2 className="ux-ui-screen__mosaic-title">
                      {t(`uxUi.mosaics.${key}.title`)}
                    </h2>
                    <p className="ux-ui-screen__mosaic-description">
                      {t(`uxUi.mosaics.${key}.description`)}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <Footer className="footer--in-flow" />
      </main>
    </div>
  )
}
