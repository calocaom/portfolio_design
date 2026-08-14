import { useEffect, useRef, useState } from 'react'
import './AboutScreen.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import ImageCarousel from '../components/ImageCarousel'
import AnimatedSubheadline from '../components/AnimatedSubheadline'
import AnimatedTitle from '../components/AnimatedTitle'
import LogoLava from '../components/LogoLava'
import { PROJECT_IDS, PROJECT_IMAGES, PROJECT_LINKS, PROJECT_ROUTES } from '../data/projects'
import { useI18n } from '../i18n/I18nContext'
import { publicUrl } from '../utils/publicUrl'

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function easeInOut(t) {
  return t * t * (3 - 2 * t)
}

const LAVA_IDLE = { sun: 0, fill: 0 }
const HERO_SCALE_MIN = 0.42
const REEL_SRC = 'videos/reel_portfolio.mp4'
const REEL_POSTER = 'videos/reel_portfolio-poster.jpg'

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72L19 12 8 5.14Z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6.5" y="5.5" width="3.75" height="13" rx="1" />
      <rect x="13.75" y="5.5" width="3.75" height="13" rx="1" />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6.5" y="6.5" width="11" height="11" rx="1.2" />
    </svg>
  )
}

function MuteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10.5v3h3.2L11 17V7L7.2 10.5H4Z"
        fill="currentColor"
      />
      <path
        d="m15.2 9.2 4.6 4.6M19.8 9.2l-4.6 4.6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SoundIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 10.5v3h3.2L11 17V7L7.2 10.5H4Z"
        fill="currentColor"
      />
      <path
        d="M14.2 9.4a3.6 3.6 0 0 1 0 5.2M16.6 7.2a6.4 6.4 0 0 1 0 9.6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

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
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const worksRef = useRef(null)
  const sixthParaRef = useRef(null)
  const savedTimeRef = useRef(0)
  const autoResumeRef = useRef(true)
  const soundOnRef = useRef(true)
  const soundZoneRef = useRef(null)
  const [lava, setLava] = useState(LAVA_IDLE)
  const [heroScale, setHeroScale] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const setVideoMuted = (muted) => {
    const video = videoRef.current
    if (!video) return
    video.muted = muted
    setIsMuted(muted)
  }

  const playVideo = (opts = {}) => {
    const video = videoRef.current
    if (!video) return

    const { fromSaved = false, withSound = soundOnRef.current } = opts
    if (fromSaved) {
      const resumeAt = savedTimeRef.current
      if (video.ended || resumeAt >= (video.duration || Infinity) - 0.05) {
        video.currentTime = 0
      } else if (Math.abs(video.currentTime - resumeAt) > 0.08) {
        video.currentTime = resumeAt
      }
    }

    setVideoMuted(!withSound)

    const attempt = video.play()
    if (attempt?.then) {
      attempt
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Browsers may block unmuted autoplay — fall back to muted.
          if (!video.muted) {
            setVideoMuted(true)
            video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
            return
          }
          setIsPlaying(false)
        })
    }
  }

  const pauseVideo = ({ reset = false } = {}) => {
    const video = videoRef.current
    if (!video) return
    savedTimeRef.current = reset ? 0 : video.currentTime
    video.pause()
    if (reset) video.currentTime = 0
    setIsPlaying(false)
  }

  const handleTogglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (!video.paused && !video.ended) {
      autoResumeRef.current = false
      pauseVideo({ reset: false })
      return
    }

    autoResumeRef.current = true
    playVideo({ fromSaved: true, withSound: soundOnRef.current })
  }

  const handleStop = () => {
    autoResumeRef.current = false
    pauseVideo({ reset: true })
  }

  const handleToggleSound = () => {
    const video = videoRef.current
    if (!video) return

    if (soundOnRef.current && !video.muted) {
      soundOnRef.current = false
      setVideoMuted(true)
      return
    }

    soundOnRef.current = true
    setVideoMuted(false)
    if (video.paused && autoResumeRef.current) {
      playVideo({ fromSaved: true, withSound: true })
    }
  }

  useEffect(() => {
    const video = videoRef.current
    const hero = heroRef.current
    const root = screenRef.current
    if (!video || !hero || !root) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      savedTimeRef.current = 0
      setIsPlaying(false)
    }
    const onTimeUpdate = () => {
      if (!video.paused) savedTimeRef.current = video.currentTime
    }

    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onEnded)
    video.addEventListener('timeupdate', onTimeUpdate)

    if (!reduced) {
      // Prefer sound on; playVideo falls back to muted if the browser blocks unmuted autoplay.
      playVideo({ fromSaved: false, withSound: true })
    }

    // Keep playback tied to overall hero visibility.
    const playObserver = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.2
        if (visible) {
          if (autoResumeRef.current && video.paused) {
            playVideo({
              fromSaved: true,
              withSound: soundOnRef.current && !video.muted,
            })
          }
        } else if (!video.paused) {
          savedTimeRef.current = video.currentTime
          video.pause()
          setIsPlaying(false)
        }
      },
      { root, threshold: [0, 0.2, 0.5, 1] },
    )
    playObserver.observe(hero)

    return () => {
      playObserver.disconnect()
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only media wiring
  }, [])

  useEffect(() => {
    const root = screenRef.current
    if (!root) return undefined

    let frame = 0

    const topInRoot = (el) => {
      const rootRect = root.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      return elRect.top - rootRect.top + root.scrollTop
    }

    const bottomHalfMostlyVisible = () => {
      const zone = soundZoneRef.current
      if (!zone) return false
      const rootRect = root.getBoundingClientRect()
      const zoneRect = zone.getBoundingClientRect()
      const visible = Math.min(zoneRect.bottom, rootRect.bottom) - Math.max(zoneRect.top, rootRect.top)
      return visible >= zoneRect.height * 0.5
    }

    const syncScrollAudio = (scale) => {
      const video = videoRef.current
      if (!video) return

      // Smaller / scrolled away → mute. Near-full + bottom half back in view → unmute.
      const wantSound =
        soundOnRef.current && scale >= 0.88 && bottomHalfMostlyVisible()

      if (video.muted !== !wantSound) {
        setVideoMuted(!wantSound)
      }
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

      // Bright sun behind hero, then fades through early bio
      const sunRise = clamp((focusY - introTop) / Math.max(1, heroDepth - introTop))
      const sunFade = clamp((focusY - heroDepth) / Math.max(1, introBottom - heroDepth))
      const sun = easeInOut(sunRise * (1 - sunFade))

      // From 6th paragraph: light returns and brightens into works (capped before footer)
      const fillRaw = clamp((focusY - sixthTop) / Math.max(1, worksFillEnd - sixthTop))
      const fill = easeInOut(fillRaw)

      // Full-bleed at top; shrink as the user scrolls down the intro pin
      const shrink = clamp(scrollY / Math.max(1, viewH * 0.95))
      const nextScale = 1 - easeInOut(shrink) * (1 - HERO_SCALE_MIN)

      setLava((prev) =>
        Math.abs(prev.sun - sun) < 0.004 && Math.abs(prev.fill - fill) < 0.004
          ? prev
          : { sun, fill },
      )
      setHeroScale((prev) => (Math.abs(prev - nextScale) < 0.002 ? prev : nextScale))
      syncScrollAudio(nextScale)
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
        '--hero-scale': heroScale,
      }}
    >
      <main className="about-screen__content">
        <div className="about-screen__lava-range">
          <div className="about-screen__lava-sticky">
            <LogoLava sun={lava.sun} fill={lava.fill} />
          </div>

          <section
            ref={introRef}
            className="about-screen__intro"
            aria-label={t('about.introAria')}
          >
            <div className="about-screen__hero-pin">
              <div className="about-screen__hero" ref={heroRef}>
                <div className="about-screen__hero-frame">
                  <button
                    type="button"
                    className="about-screen__hero-hit"
                    onClick={handleToggleSound}
                    aria-label={isMuted ? t('about.reelSound') : t('about.reelMute')}
                  />
                  <div
                    ref={soundZoneRef}
                    className="about-screen__hero-sound-zone"
                    aria-hidden="true"
                  />
                  <video
                    ref={videoRef}
                    className="about-screen__hero-media"
                    poster={publicUrl(REEL_POSTER)}
                    src={publicUrl(REEL_SRC)}
                    muted={isMuted}
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                  >
                    {t('about.videoFallback')}
                  </video>
                  <div className="about-screen__hero-controls" role="group" aria-label={t('about.reelControls')}>
                    <button
                      type="button"
                      className="about-screen__hero-control"
                      onClick={handleTogglePlay}
                      aria-label={isPlaying ? t('about.reelPause') : t('about.reelPlay')}
                      aria-pressed={isPlaying}
                    >
                      {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>
                    <button
                      type="button"
                      className="about-screen__hero-control"
                      onClick={handleStop}
                      aria-label={t('about.reelStop')}
                    >
                      <StopIcon />
                    </button>
                    <button
                      type="button"
                      className="about-screen__hero-control"
                      onClick={handleToggleSound}
                      aria-label={isMuted ? t('about.reelSound') : t('about.reelMute')}
                      aria-pressed={!isMuted}
                    >
                      {isMuted ? <MuteIcon /> : <SoundIcon />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="about-screen__title">{t('header.name')}</h1>
          </section>

          <SiteNav activeId="about" onNavigate={onNavigate} />

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
            className="about-screen__testimonials"
            aria-label={t('about.testimonialsAria')}
          >
            <div className="about-screen__testimonials-heading">
              <AnimatedTitle>{t('about.testimonialsTitle')}</AnimatedTitle>
            </div>
            <figure className="about-screen__testimonials-media">
              <div className="about-screen__testimonials-frame">
                <video
                  className="about-screen__testimonials-video"
                  controls
                  playsInline
                  preload="metadata"
                  poster={publicUrl('videos/testimonials-poster.jpg')}
                  src={publicUrl('videos/testimonials.mp4')}
                >
                  {t('about.videoFallback')}
                </video>
              </div>
              <figcaption className="about-screen__testimonials-legend">
                {t('about.testimonialsLegend')}
              </figcaption>
            </figure>
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
