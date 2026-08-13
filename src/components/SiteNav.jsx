import { useEffect, useId, useState } from 'react'
import './SiteNav.css'
import LanguageFilter from './LanguageFilter'
import { useI18n } from '../i18n/I18nContext'
import { publicUrl } from '../utils/publicUrl'

const LINK_IDS = ['about', 'works', 'contact']
const DRAWER_LINK_IDS = ['home', 'about', 'works', 'contact']
const COMPACT_MQ = '(max-width: 1024px)'
const RESUME_HREF = 'Omar-Caloca-Resume.pdf'

function normalizeTrail(trail) {
  if (!trail) return []
  if (typeof trail === 'string') return [{ label: trail }]
  return trail.filter((segment) => segment?.label)
}

function PdfDownloadIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-6Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11v6.5M9.5 15.5 12 18l2.5-2.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function SiteNav({ navRef, activeId = 'home', onNavigate, trail = null }) {
  const { t } = useI18n()
  const homeActive = activeId === 'home'
  const trailSegments = normalizeTrail(trail)
  const [panel, setPanel] = useState(null)
  const drawerId = useId()
  const langPanelId = useId()
  const menuOpen = panel === 'menu'
  const langOpen = panel === 'lang'

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_MQ)

    function closeIfDesktop(event) {
      if (!event.matches) setPanel(null)
    }

    mq.addEventListener('change', closeIfDesktop)
    return () => mq.removeEventListener('change', closeIfDesktop)
  }, [])

  useEffect(() => {
    if (!panel) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    if (panel === 'menu') {
      document.documentElement.classList.add('nav-menu-open')
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') setPanel(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.documentElement.classList.remove('nav-menu-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [panel])

  function handleClick(id) {
    setPanel(null)

    if (onNavigate) {
      onNavigate(id)
      return
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function renderLinks(variant) {
    const linkClass =
      variant === 'drawer' ? 'site-nav__drawer-link' : 'site-nav__link'
    const activeClass =
      variant === 'drawer'
        ? ' site-nav__drawer-link--active'
        : ' site-nav__link--active'
    const ids = variant === 'drawer' ? DRAWER_LINK_IDS : LINK_IDS

    return ids.map((id) => {
      const isActive = activeId === id
      const showTrail = id === 'works' && trailSegments.length > 0

      if (variant === 'drawer') {
        return (
          <li key={id} className="site-nav__drawer-item">
            <button
              type="button"
              className={`${linkClass}${isActive || showTrail ? activeClass : ''}`}
              onClick={() => handleClick(id)}
              aria-current={isActive && !showTrail ? 'page' : undefined}
            >
              {t(`nav.${id}`)}
            </button>
            {showTrail ? (
              <ul className="site-nav__drawer-trail">
                {trailSegments.map((segment, index) => {
                  const isLast = index === trailSegments.length - 1

                  return (
                    <li key={`${segment.label}-${index}`}>
                      {isLast || !segment.to ? (
                        <span
                          className={`site-nav__drawer-trail-link${
                            isLast ? ' site-nav__drawer-trail-link--current' : ''
                          }`}
                          aria-current={isLast ? 'page' : undefined}
                        >
                          {segment.label}
                        </span>
                      ) : (
                        <button
                          type="button"
                          className="site-nav__drawer-trail-link"
                          onClick={() => handleClick(segment.to)}
                        >
                          {segment.label}
                        </button>
                      )}
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </li>
        )
      }

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
              className={`${linkClass}${isActive ? activeClass : ''}`}
              onClick={() => handleClick(id)}
              aria-current={isActive ? 'page' : undefined}
            >
              {t(`nav.${id}`)}
            </button>
          )}
        </li>
      )
    })
  }

  function renderResume(variant) {
    const isDrawer = variant === 'drawer'
    return (
      <li key="resume" className={isDrawer ? 'site-nav__drawer-item' : undefined}>
        <a
          className={
            isDrawer
              ? 'site-nav__drawer-link site-nav__resume site-nav__resume--drawer'
              : 'site-nav__link site-nav__resume'
          }
          href={publicUrl(RESUME_HREF)}
          download="Omar-Caloca-Resume.pdf"
          aria-label={t('contact.resumeAria')}
          onClick={() => setPanel(null)}
        >
          <PdfDownloadIcon className="site-nav__resume-icon" />
          <span>{t('contact.resume')}</span>
        </a>
      </li>
    )
  }

  return (
    <nav
      className={`site-nav${menuOpen ? ' site-nav--menu-open' : ''}${langOpen ? ' site-nav--lang-open' : ''}`}
      ref={navRef}
      aria-label={t('nav.site')}
    >
      <div className="site-nav__compact">
        <div className="site-nav__compact-lang">
          <LanguageFilter
            compact
            open={langOpen}
            onOpenChange={(nextOpen) => setPanel(nextOpen ? 'lang' : null)}
            panelId={langPanelId}
          />
        </div>

        <button
          type="button"
          className={`site-nav__home site-nav__home--compact${homeActive ? ' site-nav__home--active' : ''}`}
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

        <button
          type="button"
          className="site-nav__burger"
          aria-expanded={menuOpen}
          aria-controls={drawerId}
          aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          onClick={() => setPanel(menuOpen ? null : 'menu')}
        >
          <span className="site-nav__burger-icon" aria-hidden="true">
            <span className="site-nav__burger-line" />
            <span className="site-nav__burger-line" />
          </span>
        </button>
      </div>

      <div className="site-nav__bar site-nav__bar--desktop">
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
          {renderLinks('desktop')}
          {renderResume('desktop')}
        </ul>
      </div>

      <div
        id={drawerId}
        className="site-nav__drawer"
        hidden={!menuOpen}
        aria-hidden={!menuOpen}
      >
        <ul className="site-nav__drawer-list">
          {renderLinks('drawer')}
          {renderResume('drawer')}
        </ul>
      </div>
    </nav>
  )
}
