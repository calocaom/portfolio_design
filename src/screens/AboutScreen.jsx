import { useEffect, useRef, useState } from 'react'
import './AboutScreen.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import ImageCarousel from '../components/ImageCarousel'
import AnimatedSubheadline from '../components/AnimatedSubheadline'
import AnimatedTitle from '../components/AnimatedTitle'
import LogoLava from '../components/LogoLava'
import { HERO_LOGO } from '../assets'
import { PROJECT_IDS, PROJECT_IMAGES, PROJECT_LINKS, PROJECT_ROUTES } from '../data/projects'
import { useI18n } from '../i18n/I18nContext'

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function easeInOut(t) {
  return t * t * (3 - 2 * t)
}

const LAVA_IDLE = { sun: 0, fill: 0 }

function BookContourIcon() {
  return (
    <svg
      className="about-screen__book-icon"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 12.5c-3.2-2.4-7.4-3.8-12-3.8H8v27.6h4.2c4.5 0 8.6 1.3 11.8 3.5 3.2-2.2 7.3-3.5 11.8-3.5H40V8.7h-3.8c-4.6 0-8.8 1.4-12 3.8Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M24 12.5v27.3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function AboutScreen({ onNavigate }) {
  const { dict, t } = useI18n()
  const bioBefore = dict.about.bioBefore
  const bioAfter = dict.about.bioAfter

  const screenRef = useRef(null)
  const introRef = useRef(null)
  const worksRef = useRef(null)
  const sixthParaRef = useRef(null)
  const [lava, setLava] = useState(LAVA_IDLE)

  useEffect(() => {
    const root = screenRef.current
    if (!root) return undefined

    let frame = 0

    const topInRoot = (el) => {
      const rootRect = root.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      return elRect.top - rootRect.top + root.scrollTop
    }

    const update = () => {
      frame = 0
      const intro = introRef.current
      const works = worksRef.current
      const sixth = sixthParaRef.current
      if (!intro || !works || !sixth) return

      const viewH = root.clientHeight
      const scrollY = root.scrollTop
      const focusY = scrollY + viewH * 0.38

      const introTop = topInRoot(intro)
      const introBottom = introTop + intro.offsetHeight
      const heroDepth = introTop + intro.offsetHeight * 0.45
      const sixthTop = topInRoot(sixth)
      const worksTop = topInRoot(works)
      // Solid violet fully on by mid-works; never into footer
      const worksFillEnd = worksTop + Math.min(works.offsetHeight * 0.55, viewH * 0.45)

      // 1) Bright sun behind GIF, then shrinks to zero (fully gone through early bio)
      const sunRise = clamp((focusY - introTop) / Math.max(1, heroDepth - introTop))
      const sunFade = clamp((focusY - heroDepth) / Math.max(1, introBottom - heroDepth))
      const sun = easeInOut(sunRise * (1 - sunFade))

      // 2) From 6th paragraph: light returns and brightens into works (capped before footer)
      const fillRaw = clamp((focusY - sixthTop) / Math.max(1, worksFillEnd - sixthTop))
      const fill = easeInOut(fillRaw)

      setLava((prev) =>
        Math.abs(prev.sun - sun) < 0.004 && Math.abs(prev.fill - fill) < 0.004
          ? prev
          : { sun, fill },
      )
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    root.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      root.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // bioBefore (3) + bioAfter (3) → 6th paragraph is the last bioAfter entry
  const sixthAfterIndex = bioAfter.length - 1

  return (
    <div
      ref={screenRef}
      className="screen about-screen"
      style={{
        '--lava-sun': lava.sun,
        '--lava-fill': lava.fill,
      }}
    >
      <main className="about-screen__content">
        <SiteNav activeId="about" onNavigate={onNavigate} />

        <div className="about-screen__lava-range">
          <div className="about-screen__lava-sticky">
            <LogoLava sun={lava.sun} fill={lava.fill} />
          </div>

          <section
            ref={introRef}
            className="about-screen__intro"
            aria-label={t('about.introAria')}
          >
            <div className="about-screen__hero">
              <img
                src={HERO_LOGO}
                alt=""
                className="about-screen__hero-media"
              />
            </div>
            <h1 className="about-screen__title">{t('header.name')}</h1>
          </section>

          <section className="about-screen__split" aria-label={t('about.bioAria')}>
            <div className="about-screen__bio">
              {bioBefore.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="about-screen__text">
                  {paragraph}
                </p>
              ))}

              <div className="about-screen__mission">
                <p className="about-screen__mission-label">{t('about.missionLabel')}</p>
                <span className="about-screen__quote-mark" aria-hidden="true">
                  “
                </span>
                <blockquote className="about-screen__quote">
                  {dict.about.mission}
                </blockquote>
              </div>

              {bioAfter.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 48)}
                  ref={index === sixthAfterIndex ? sixthParaRef : undefined}
                  className="about-screen__text"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <aside className="about-screen__aside">
              <div className="about-screen__carousel">
                <ImageCarousel
                  size="large"
                  axis="vertical"
                  intervalMs={7500}
                  label={t('nav.works')}
                />
              </div>
              <div className="about-screen__subheadline">
                <AnimatedSubheadline />
              </div>
            </aside>
          </section>

          <section
            className="about-screen__education"
            aria-label={t('about.educationAria')}
          >
            <div className="about-screen__education-heading">
              <AnimatedTitle>{t('about.educationTitle')}</AnimatedTitle>
            </div>
            <ul className="about-screen__education-list">
              {dict.about.education.map((item) => (
                <li key={item.program} className="about-screen__education-item">
                  <BookContourIcon />
                  <div className="about-screen__education-copy">
                    <p className="about-screen__education-program">{item.program}</p>
                    <p className="about-screen__education-school">{item.school}</p>
                    <p className="about-screen__education-detail">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section
            ref={worksRef}
            className="about-screen__works"
            aria-label={t('about.worksAria')}
          >
            <div className="about-screen__works-heading">
              <AnimatedTitle>{t('about.checkWorks')}</AnimatedTitle>
            </div>

            <ul className="about-screen__hex-grid">
              {PROJECT_IDS.map((id) => {
                const project = dict.projects[id]
                const href = PROJECT_LINKS[id]
                const route = PROJECT_ROUTES[id]
                const label = project.title.replace(/\n/g, ' ')

                return (
                  <li key={id} className="about-screen__hex-item">
                    {href ? (
                      <a
                        className="about-screen__hex"
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in a new tab)`}
                      >
                        <img
                          src={PROJECT_IMAGES[id]}
                          alt=""
                          className={`about-screen__hex-image${id === 5 ? ' about-screen__hex-image--art' : ''}`}
                        />
                        <span className="about-screen__hex-veil" aria-hidden="true" />
                        <span className="about-screen__hex-title">
                          {project.title.split('\n').map((line) => (
                            <span key={line} className="about-screen__hex-title-line">
                              {line}
                            </span>
                          ))}
                        </span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="about-screen__hex"
                        onClick={() => onNavigate?.(route ?? 'works')}
                        aria-label={label}
                      >
                        <img
                          src={PROJECT_IMAGES[id]}
                          alt=""
                          className={`about-screen__hex-image${id === 5 ? ' about-screen__hex-image--art' : ''}`}
                        />
                        <span className="about-screen__hex-veil" aria-hidden="true" />
                        <span className="about-screen__hex-title">
                          {project.title.split('\n').map((line) => (
                            <span key={line} className="about-screen__hex-title-line">
                              {line}
                            </span>
                          ))}
                        </span>
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        </div>

        <Footer className="footer--in-flow" />
      </main>
    </div>
  )
}
