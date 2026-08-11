import './SiteNav.css'
import LanguageFilter from './LanguageFilter'
import { useI18n } from '../i18n/I18nContext'
import { publicUrl } from '../utils/publicUrl'

const LINK_IDS = ['about', 'works', 'contact']

function normalizeTrail(trail) {
  if (!trail) return []
  if (typeof trail === 'string') return [{ label: trail }]
  return trail.filter((segment) => segment?.label)
}

export default function SiteNav({ navRef, activeId = 'home', onNavigate, trail = null }) {
  const { t } = useI18n()
  const homeActive = activeId === 'home'
  const trailSegments = normalizeTrail(trail)

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
            const showTrail = id === 'works' && trailSegments.length > 0

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
                    {trailSegments.map((segment, index) => {
                      const isLast = index === trailSegments.length - 1

                      return (
                        <span key={`${segment.label}-${index}`} className="site-nav__trail-step">
                          <span className="site-nav__trail-sep" aria-hidden="true">
                            {'>\u00A0'}
                          </span>
                          {isLast || !segment.to ? (
                            <span
                              className={
                                isLast
                                  ? 'site-nav__trail-current'
                                  : 'site-nav__trail-parent'
                              }
                              aria-current={isLast ? 'page' : undefined}
                            >
                              {segment.label}
                            </span>
                          ) : (
                            <button
                              type="button"
                              className="site-nav__link site-nav__link--active site-nav__trail-parent"
                              onClick={() => handleClick(segment.to)}
                            >
                              {segment.label}
                            </button>
                          )}
                        </span>
                      )
                    })}
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
