import { useEffect, useMemo, useRef, useState } from 'react'
import './Photography.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import PhotoWheel, { PHOTO_PANEL_QUERY } from '../components/PhotoWheel'
import OtherWorks from '../components/OtherWorks'
import AnimatedTitle from '../components/AnimatedTitle'
import { PHOTOGRAPHY_PHOTOS } from '../data/photographyPhotos'
import { PHOTOGRAPHY_FILTERS, photoMatchesFilter } from '../data/photographyFilters'
import { arrangePhotosByHue, arrangePhotosForPanel } from '../data/arrangePhotography'
import { AARHUS_DOMKIRKE, ALBANIA_STATUE, CARIBBEAN_PAINTING, DREAM_ILLUSTRATION, FIGURE_SKETCH_1, FIGURE_SKETCH_2, FLENSBURG_DOOR, FLORENCE_SCULPTURE, HERO_LOGO, HERO_LOGO_MOBILE, JAPAN_GARDEN, MOTH_PAINTING, PHOTOGRAPHY_PORTRAIT, PHOTO_EDITING_1, PHOTO_EDITING_2, PIRATE_SHIP } from '../assets'
import { publicUrl } from '../utils/publicUrl'
import { useI18n } from '../i18n/I18nContext'

const FILTER_LOGO = publicUrl('logoicon.png')

const FILTER_COLUMN_LABELS = [
  ['Portrait', 'People', 'Urban', 'Arquitecture', 'B&W', 'Nature', 'Landscape'],
  ['Asia', 'Japan', 'Mexico City', 'Florence Italy', 'Germany', 'Denmark', 'Norway', 'USA', 'Niagara Falls'],
]

const FILTER_COLUMNS = FILTER_COLUMN_LABELS.map((labels) =>
  labels.map((label) => {
    const filter = PHOTOGRAPHY_FILTERS.find((item) => item.label === label)
    if (!filter) throw new Error(`Missing photography filter: ${label}`)
    return filter
  }),
)

function pickRandomPhoto(current) {
  const pool = PHOTOGRAPHY_PHOTOS.filter((photo) => photo.src !== current?.src)
  const source = pool.length ? pool : PHOTOGRAPHY_PHOTOS
  return source[Math.floor(Math.random() * source.length)]
}

function IllustrationFigure({ children, caption }) {
  const ref = useRef(null)
  const [orientation, setOrientation] = useState('portrait')

  useEffect(() => {
    const media = ref.current?.querySelector('img, video')
    if (!media) return undefined

    function apply() {
      const width = media.naturalWidth || media.videoWidth
      const height = media.naturalHeight || media.videoHeight
      if (!width || !height) return
      setOrientation(width >= height ? 'landscape' : 'portrait')
    }

    apply()
    media.addEventListener('load', apply)
    media.addEventListener('loadedmetadata', apply)
    return () => {
      media.removeEventListener('load', apply)
      media.removeEventListener('loadedmetadata', apply)
    }
  }, [])

  return (
    <figure
      ref={ref}
      className={`photography-screen__illustration photography-screen__illustration--${orientation}`}
    >
      {children}
      {caption ? (
        <figcaption className="photography-screen__logo-caption">{caption}</figcaption>
      ) : null}
    </figure>
  )
}

const SECTION_STARTS = [
  'photography-heading',
  'photo-editing-heading',
  'logo-design-heading',
  'video-editing-heading',
  'animation-heading',
  'other-works-heading',
]

function goToCurrentSection() {
  const screen = document.querySelector('.photography-screen')
  if (!screen) return
  const nav = screen.querySelector('.site-nav')
  const navBottom = nav ? nav.getBoundingClientRect().bottom : 0
  const marker = navBottom + 8
  let target = null
  for (const id of SECTION_STARTS) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= marker) target = el
  }
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  if (!target) {
    screen.scrollTo({ top: 0, behavior })
    return
  }
  const delta = target.getBoundingClientRect().top - (navBottom + 12)
  screen.scrollTo({ top: Math.max(0, screen.scrollTop + delta), behavior })
}

function FoldHeading({ id, label, open, mobile, onToggle, controls }) {
  if (!mobile) {
    return (
      <AnimatedTitle id={id} className="photography-screen__section-title">
        {label}
      </AnimatedTitle>
    )
  }
  return (
    <h2 id={id} className="photography-screen__section-title">
      <button
        type="button"
        className="photography-screen__fold"
        aria-expanded={open}
        aria-controls={controls}
        aria-label={label}
        onClick={onToggle}
      >
        <AnimatedTitle as="span">{label}</AnimatedTitle>
        <span
          className={`photography-screen__fold-arrow${open ? ' photography-screen__fold-arrow--up' : ''}`}
          aria-hidden="true"
        />
      </button>
    </h2>
  )
}

export default function Photography({ onNavigate }) {
  const { dict, t } = useI18n()
  const logoTopic = dict.digitalYoga.topics.find((topic) => topic.videoSrc)
  const title = t('photography.title')
  const [activeFilter, setActiveFilter] = useState(null)
  const [randomPhoto, setRandomPhoto] = useState(null)
  const [panel, setPanel] = useState(() => window.matchMedia(PHOTO_PANEL_QUERY).matches)
  const [photoOpen, setPhotoOpen] = useState(false)
  const [editingOpen, setEditingOpen] = useState(false)
  const [logoOpen, setLogoOpen] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [animationOpen, setAnimationOpen] = useState(false)
  const photoFolded = panel && !photoOpen
  const editingFolded = panel && !editingOpen
  const logoFolded = panel && !logoOpen
  const videoFolded = panel && !videoOpen
  const animationFolded = panel && !animationOpen
  const anySectionOpen = photoOpen || editingOpen || logoOpen || videoOpen || animationOpen
  const [onOtherWorks, setOnOtherWorks] = useState(false)
  const showSectionJump = panel && anySectionOpen && !onOtherWorks
  const photos = useMemo(() => {
    if (randomPhoto) return [randomPhoto]
    const source = activeFilter
      ? PHOTOGRAPHY_PHOTOS.filter((photo) => photoMatchesFilter(photo, activeFilter))
      : PHOTOGRAPHY_PHOTOS
    return panel ? arrangePhotosForPanel(source) : arrangePhotosByHue(source)
  }, [activeFilter, randomPhoto, panel])

  useEffect(() => {
    const media = window.matchMedia(PHOTO_PANEL_QUERY)
    const apply = () => setPanel(media.matches)
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!panel) return undefined
    const screen = document.querySelector('.photography-screen')
    if (!screen) return undefined
    const update = () => {
      const grid = screen.querySelector('.photography-screen__other-works .other-works__grid')
      if (!grid) return
      const jump = document.querySelector('.photography-screen__section-jump')
      const line = jump ? jump.getBoundingClientRect().top : window.innerHeight - 50
      const next = grid.getBoundingClientRect().top <= line + 1
      setOnOtherWorks((current) => (current === next ? current : next))
    }
    update()
    screen.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      screen.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [panel, anySectionOpen])

  function selectFilter(filter) {
    setRandomPhoto(null)
    setActiveFilter((current) => (current?.label === filter.label ? null : filter))
  }

  function selectRandom() {
    setActiveFilter(null)
    setRandomPhoto((current) => pickRandomPhoto(current))
  }

  return (
    <div className="screen photography-screen">
      <main className="photography-screen__content">
        <SiteNav
          activeId="works"
          onNavigate={onNavigate}
          trail={t('photography.navCrumb')}
        />

        <section className="photography-screen__intro" aria-label={title.replace(/\n/g, ' ')}>
          <h1 className="photography-screen__title">
            {title.split('\n').map((line) => (
              <span key={line} className="photography-screen__title-line">
                {line}
              </span>
            ))}
          </h1>
          <FoldHeading
            id="photography-heading"
            label={t('photography.sectionTitle')}
            open={photoOpen}
            mobile={panel}
            controls="photography-lede photography-gallery"
            onToggle={() => setPhotoOpen((open) => !open)}
          />
          <div id="photography-lede" className="photography-screen__lede-row" hidden={photoFolded}>
            <div className="photography-screen__portrait-hex">
              <img
                className="photography-screen__portrait"
                src={PHOTOGRAPHY_PORTRAIT}
                alt="Omar Caloca"
              />
            </div>
            <p className="photography-screen__lede">{t('photography.lede')}</p>
          </div>
        </section>

        <div id="photography-gallery" className="photography-screen__gallery" hidden={photoFolded}>
        <PhotoWheel
          photos={photos}
          label={t('photography.wheelAria')}
          closeLabel={t('photography.close')}
          openCenter={Boolean(randomPhoto)}
        />
          <div className="photography-screen__filter-menu">
            <p className="photography-screen__filter-title">Filter Photos by:</p>
            <div
              className="photography-screen__filter-columns"
              role="group"
              aria-label={t('photography.filtersAria')}
            >
              {FILTER_COLUMNS.map((column, index) => (
                <div className="photography-screen__filter-column" key={column[0].label}>
                  {index > 0 ? (
                    <div className="photography-screen__filter-divider" aria-hidden="true" />
                  ) : null}
                  <ul className="photography-screen__filters">
                    {column.map((filter) => {
                      const selected = !randomPhoto && activeFilter?.label === filter.label
                      return (
                        <li key={filter.label}>
                          <button
                            type="button"
                            className={`photography-screen__filter${
                              selected ? ' photography-screen__filter--active' : ''
                            }`}
                            aria-pressed={selected}
                            onClick={() => selectFilter(filter)}
                          >
                            <img
                              className="photography-screen__filter-mark"
                              src={FILTER_LOGO}
                              alt=""
                              aria-hidden="true"
                            />
                            <span className="photography-screen__filter-label">{filter.label}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <button
              type="button"
              className={`photography-screen__random${
                randomPhoto ? ' photography-screen__random--active' : ''
              }`}
              aria-pressed={Boolean(randomPhoto)}
              onClick={selectRandom}
            >
              <span className="photography-screen__random-hex" aria-hidden="true" />
              <span>Random</span>
            </button>
          </div>
        </div>

        <section className="photography-screen__editing" aria-label={t('photography.editingTitle')}>
          <FoldHeading
            id="photo-editing-heading"
            label={t('photography.editingTitle')}
            open={editingOpen}
            mobile={panel}
            controls="photo-editing-panel"
            onToggle={() => setEditingOpen((open) => !open)}
          />
          <div id="photo-editing-panel" hidden={editingFolded}>
            <p className="photography-screen__editing-lede">{t('photography.editingLede')}</p>
            <div className="photography-screen__editing-photos">
              <img src={PHOTO_EDITING_1} alt="Before and after portrait with touch ups and light adjustments in Photoshop" />
              <img src={PHOTO_EDITING_2} alt="Before and after close-up of blue editorial makeup and lighting" />
            </div>
          </div>
        </section>

        <section className="photography-screen__disciplines">
          <article className="photography-screen__discipline">
            <FoldHeading
              id="logo-design-heading"
              label={t('photography.logoTitle')}
              open={logoOpen}
              mobile={panel}
              controls="logo-design-panel"
              onToggle={() => setLogoOpen((open) => !open)}
            />
            <div id="logo-design-panel" hidden={logoFolded}>
            {logoTopic ? (
              <figure className="photography-screen__logo-project">
                <video
                  className="photography-screen__logo-video"
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  src={publicUrl(logoTopic.videoSrc)}
                  aria-label={logoTopic.videoAlt}
                >
                  {t('digitalYoga.videoFallback')}
                </video>
                <figcaption className="photography-screen__logo-caption">
                  {t('photography.logoCaptionBefore')}
                  <a
                    className="photography-screen__logo-link"
                    href="#digital-yoga/logo"
                    onClick={(event) => {
                      event.preventDefault()
                      onNavigate('digital-yoga/logo')
                    }}
                  >
                    {t('photography.logoCaptionLink')}
                  </a>
                  {t('photography.logoCaptionAfter')}
                </figcaption>
              </figure>
            ) : null}
            <figure className="photography-screen__logo-project">
              <img
                src={HERO_LOGO}
                alt=""
                className="photography-screen__logo-hero photography-screen__logo-hero--desktop"
              />
              <img
                src={HERO_LOGO_MOBILE}
                alt=""
                className="photography-screen__logo-hero photography-screen__logo-hero--mobile"
              />
              <figcaption className="photography-screen__logo-caption">
                {t('photography.logoSiteCaption')}
              </figcaption>
            </figure>
            </div>
          </article>
          <article className="photography-screen__discipline">
            <FoldHeading
              id="video-editing-heading"
              label={t('photography.videoTitle')}
              open={videoOpen}
              mobile={panel}
              controls="video-editing-panel"
              onToggle={() => setVideoOpen((open) => !open)}
            />
            <div id="video-editing-panel" hidden={videoFolded}>
              <figure className="photography-screen__logo-project">
                <video
                  className="photography-screen__logo-hero"
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={publicUrl('videos/reel_portfolio-poster.jpg')}
                  src={publicUrl('videos/reel_portfolio.mp4')}
                >
                  {t('about.videoFallback')}
                </video>
                <AnimatedTitle as="h3" className="photography-screen__piece-title">
                  {t('photography.videoBrandTitle')}
                </AnimatedTitle>
                <figcaption className="photography-screen__logo-caption">
                  {t('photography.videoCaptionBefore')}
                  <a
                    className="photography-screen__logo-link"
                    href="#about"
                    onClick={(event) => {
                      event.preventDefault()
                      onNavigate('about')
                    }}
                  >
                    {t('photography.videoCaptionLink')}
                  </a>
                  {t('photography.videoCaptionAfter')}
                </figcaption>
              </figure>
              <figure className="photography-screen__logo-project">
                <video
                  className="photography-screen__logo-hero"
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={publicUrl('videos/reel-professional-poster.jpg')}
                  src={publicUrl('videos/reel-professional.mp4')}
                >
                  {t('about.videoFallback')}
                </video>
                <AnimatedTitle as="h3" className="photography-screen__piece-title">
                  {t('photography.videoReelsTitle')}
                </AnimatedTitle>
                <figcaption className="photography-screen__logo-caption">
                  {t('photography.videoReelCaption')}
                </figcaption>
              </figure>
              <figure className="photography-screen__logo-project">
                <video
                  className="photography-screen__logo-hero"
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  src={publicUrl('videos/botanical.mp4')}
                >
                  {t('botanical.videoFallback')}
                </video>
                <AnimatedTitle as="h3" className="photography-screen__piece-title">
                  {t('photography.videoOfferTitle')}
                </AnimatedTitle>
                <figcaption className="photography-screen__logo-caption">
                  {t('photography.videoOfferCaptionBefore')}
                  <a
                    className="photography-screen__logo-link"
                    href="#botanical"
                    onClick={(event) => {
                      event.preventDefault()
                      onNavigate('botanical')
                    }}
                  >
                    {t('photography.videoOfferCaptionLink')}
                  </a>
                  {t('photography.videoOfferCaptionAfter')}
                </figcaption>
              </figure>
            </div>
          </article>
          <article className="photography-screen__discipline photography-screen__discipline--illustration">
            <FoldHeading
              id="animation-heading"
              label={t('photography.animationTitle')}
              open={animationOpen}
              mobile={panel}
              controls="animation-panel"
              onToggle={() => setAnimationOpen((open) => !open)}
            />
            <div id="animation-panel" className="photography-screen__illustrations" hidden={animationFolded}>
              <IllustrationFigure caption={t('photography.gardenCaption')}>
                <img src={JAPAN_GARDEN} alt="" />
              </IllustrationFigure>
              <IllustrationFigure caption={t('photography.shipCaption')}>
                <img src={PIRATE_SHIP} alt="" />
              </IllustrationFigure>
              <IllustrationFigure caption={t('photography.dreamCaption')}>
                <img src={DREAM_ILLUSTRATION} alt="" />
              </IllustrationFigure>
              <IllustrationFigure caption={t('photography.caribbeanCaption')}>
                <img src={CARIBBEAN_PAINTING} alt="" />
              </IllustrationFigure>
              <IllustrationFigure caption={t('photography.mothCaption')}>
                <img src={MOTH_PAINTING} alt="" />
              </IllustrationFigure>
              <IllustrationFigure caption={t('photography.domkirkeCaption')}>
                <img src={AARHUS_DOMKIRKE} alt="" />
              </IllustrationFigure>
              <IllustrationFigure caption={t('photography.flensburgCaption')}>
                <img src={FLENSBURG_DOOR} alt="" />
              </IllustrationFigure>
              <IllustrationFigure caption={t('photography.florenceCaption')}>
                <img src={FLORENCE_SCULPTURE} alt="" />
              </IllustrationFigure>
              <IllustrationFigure caption={t('photography.albaniaCaption')}>
                <img src={ALBANIA_STATUE} alt="" />
              </IllustrationFigure>
              <figure className="photography-screen__illustration photography-screen__illustration--pair">
                <img src={FIGURE_SKETCH_1} alt="" />
                <img src={FIGURE_SKETCH_2} alt="" />
                <figcaption className="photography-screen__logo-caption">
                  {t('photography.sketchCaption')}
                </figcaption>
              </figure>
              <a
                className="photography-screen__more"
                href="https://omarcaloca.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('photography.findMore')}
              </a>
            </div>
          </article>
        </section>

        <section className="photography-screen__other-works" aria-label={t('photography.otherWorks')}>
          <AnimatedTitle id="other-works-heading" className="photography-screen__section-title">
            {t('photography.otherWorks')}
          </AnimatedTitle>
          <OtherWorks onNavigate={onNavigate} />
        </section>

        <Footer className="footer--in-flow" />
      </main>
      {showSectionJump ? (
        <button type="button" className="photography-screen__section-jump" onClick={goToCurrentSection}>
          {t('photography.goToSectionStart')}
        </button>
      ) : null}
    </div>
  )
}
