import { useEffect, useRef, useState } from 'react'
import './MainPage.css'
import StatusBar from '../components/StatusBar'
import Header from '../components/Header'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import AnimatedTitle from '../components/AnimatedTitle'
import { HERO_LOGO } from '../assets'
import { PROJECT_IDS, PROJECT_IMAGES, PROJECT_LINKS, PROJECT_ROUTES } from '../data/projects'
import { useI18n } from '../i18n/I18nContext'

const TABLET_MAX_WIDTH = '(max-width: 1024px)'

function ProjectRow({ id, index, project, href, route, titleLabel, pageRef, onNavigate }) {
  const { t } = useI18n()
  const rowRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const row = rowRef.current
    if (!row) return

    const mq = window.matchMedia(TABLET_MAX_WIDTH)
    let observer

    function bindObserver() {
      observer?.disconnect()
      if (!mq.matches) {
        setInView(false)
        return
      }

      const root = pageRef.current ?? null
      observer = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { root, threshold: 0.42 },
      )
      observer.observe(row)
    }

    bindObserver()
    mq.addEventListener('change', bindObserver)
    return () => {
      mq.removeEventListener('change', bindObserver)
      observer?.disconnect()
    }
  }, [pageRef])

  const isClickable = Boolean(href || route)
  const rowClass = `project-row${index % 2 === 1 ? ' project-row--reverse' : ''}${isClickable ? ' project-row--clickable' : ''}${inView ? ' project-row--in-view' : ''}`

  const body = (
    <div className="project-row__veil">
      <div className={`project-row__hex${id === 5 ? ' project-row__hex--art' : ''}`}>
        <img
          src={PROJECT_IMAGES[id]}
          alt=""
          className="project-row__hex-image"
        />
      </div>
      <div className="project-row__copy">
        <AnimatedTitle>{project.title}</AnimatedTitle>
        <p className="project-row__description">{project.description}</p>
        <span className="project-row__cta" aria-hidden="true">
          {t('seeMyProjects')}
        </span>
      </div>
    </div>
  )

  if (href) {
    return (
      <a
        ref={rowRef}
        className={rowClass}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${titleLabel} (opens in a new tab)`}
      >
        {body}
      </a>
    )
  }

  if (route) {
    return (
      <button
        ref={rowRef}
        type="button"
        className={rowClass}
        onClick={() => onNavigate?.(route)}
        aria-label={titleLabel}
      >
        {body}
      </button>
    )
  }

  return (
    <article ref={rowRef} className={rowClass}>
      {body}
    </article>
  )
}

export default function MainPage({
  onNavigate,
  pendingScroll = null,
  onPendingScrollDone,
}) {
  const { dict, t } = useI18n()
  const pageRef = useRef(null)
  const navRef = useRef(null)
  const heroRef = useRef(null)
  const worksRef = useRef(null)
  const [lightBg, setLightBg] = useState(false)
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const page = pageRef.current
    const hero = heroRef.current
    const works = worksRef.current
    const nav = navRef.current
    if (!page || !hero || !works || !nav) return

    function updateFromScroll() {
      const pageTop = page.getBoundingClientRect().top
      const navTop = nav.getBoundingClientRect().top
      const navHeight = nav.offsetHeight
      const worksTop = works.getBoundingClientRect().top

      setLightBg(navTop <= pageTop + 2)
      setActiveId(worksTop <= pageTop + navHeight + 12 ? 'works' : 'home')
    }

    updateFromScroll()
    page.addEventListener('scroll', updateFromScroll, { passive: true })
    window.addEventListener('resize', updateFromScroll)

    const heroImg = hero.querySelector('img')
    heroImg?.addEventListener('load', updateFromScroll)

    const resizeObserver = new ResizeObserver(() => {
      updateFromScroll()
    })
    resizeObserver.observe(hero)
    resizeObserver.observe(nav)

    return () => {
      page.removeEventListener('scroll', updateFromScroll)
      window.removeEventListener('resize', updateFromScroll)
      heroImg?.removeEventListener('load', updateFromScroll)
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!pendingScroll) return

    const page = pageRef.current
    if (!page) {
      onPendingScrollDone?.()
      return
    }

    let cancelled = false
    let loadHandler = null
    let fallbackTimer = null

    function scrollToPending() {
      if (cancelled) return

      const nav = navRef.current
      const target =
        pendingScroll === 'works' && nav
          ? nav
          : document.getElementById(pendingScroll)

      if (!target) {
        onPendingScrollDone?.()
        return
      }

      const pageRect = page.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const nextTop = page.scrollTop + (targetRect.top - pageRect.top)

      page.scrollTo({ top: Math.max(0, nextTop), behavior: 'auto' })
      onPendingScrollDone?.()
    }

    function scheduleScroll() {
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToPending)
      })
    }

    const heroImg = heroRef.current?.querySelector('img')
    if (pendingScroll === 'works' && heroImg && !heroImg.complete) {
      loadHandler = () => scheduleScroll()
      heroImg.addEventListener('load', loadHandler, { once: true })
      fallbackTimer = window.setTimeout(scheduleScroll, 600)
    } else {
      scheduleScroll()
    }

    return () => {
      cancelled = true
      if (loadHandler) {
        heroImg?.removeEventListener('load', loadHandler)
      }
      if (fallbackTimer != null) {
        window.clearTimeout(fallbackTimer)
      }
    }
  }, [pendingScroll, onPendingScrollDone])

  return (
    <div
      ref={pageRef}
      className={`screen main-page${lightBg ? ' main-page--light' : ''}`}
    >
      <StatusBar />

      <main className="main-page__content">
        <div id="home">
          <Header />
        </div>

        <section
          id="about"
          ref={heroRef}
          className="main-page__hero"
          aria-label={t('nav.about')}
        >
          <img
            src={HERO_LOGO}
            alt=""
            className="main-page__hero-media"
          />
        </section>

        <SiteNav
          navRef={navRef}
          activeId={activeId}
          onNavigate={onNavigate}
        />

        <section
          id="works"
          ref={worksRef}
          className="main-page__gallery"
          aria-label={t('nav.works')}
        >
          {PROJECT_IDS.map((id, index) => {
            const project = dict.projects[id]
            const href = PROJECT_LINKS[id]
            const route = PROJECT_ROUTES[id]
            const titleLabel = project.title.replace(/\n/g, ' ')

            return (
              <ProjectRow
                key={id}
                id={id}
                index={index}
                project={project}
                href={href}
                route={route}
                titleLabel={titleLabel}
                pageRef={pageRef}
                onNavigate={onNavigate}
              />
            )
          })}
        </section>

        <Footer className="footer--in-flow" />
      </main>
    </div>
  )
}
