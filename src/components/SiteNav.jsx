import './SiteNav.css'
import LanguageFilter from './LanguageFilter'
import { useI18n } from '../i18n/I18nContext'

const LINK_IDS = ['home', 'about', 'works', 'contact']

export default function SiteNav({ navRef, activeId = 'home', onNavigate, trail = null }) {
  const { t } = useI18n()

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
