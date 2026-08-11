import './SiteNav.css'
import LanguageFilter from './LanguageFilter'
import { useI18n } from '../i18n/I18nContext'
import { publicUrl } from '../utils/publicUrl'

const LINK_IDS = ['about', 'works', 'contact']

export default function SiteNav({ navRef, activeId = 'home', onNavigate, trail = null }) {
  const { t } = useI18n()
  const homeActive = activeId === 'home'

  function handleClick(id) {
    if (onNavigate) {
      onNavigate(id)
      return
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="site-nav" ref={navRef} aria-label={t('nav.site')}>
      <div className="site-nav__bar">
        <LanguageFilter />
        <ul className="site-nav__list">
          <li>
            <button
              type="button"
              className={`site-nav__home${homeActive ? ' site-nav__home--active' : ''}`}
              onClick={() => handleClick('home')}
              aria-label={t('nav.home')}
              aria-current={homeActive ? 'page' : undefined}
            >
              <img
                src={publicUrl('logoicon.png')}
                alt=""
                className="site-nav__home-icon"
              />
            </button>
          </li>
          {LINK_IDS.map((id) => {
            const isActive = activeId === id
            const showTrail = id === 'works' && trail

            return (
              <li key={id}>
                {showTrail ? (
                  <span className="site-nav__trail">
                    <button
                      type="button"
                      className="site-nav__link site-nav__link--active site-nav__trail-parent"
                      onClick={() => handleClick('works')}
                    >
                      {t('nav.works')}
                    </button>
                    <span className="site-nav__trail-sep" aria-hidden="true">
                      {'>\u00A0'}
                    </span>
                    <span
                      className="site-nav__trail-current"
                      aria-current="page"
                    >
                      {trail}
                    </span>
                  </span>
                ) : (
                  <button
                    type="button"
                    className={`site-nav__link${isActive ? ' site-nav__link--active' : ''}`}
                    onClick={() => handleClick(id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t(`nav.${id}`)}
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
