import { useEffect, useMemo, useState } from 'react'
import './Photography.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import PhotoWheel, { PHOTO_PANEL_QUERY } from '../components/PhotoWheel'
import OtherWorks from '../components/OtherWorks'
import { PHOTOGRAPHY_PHOTOS } from '../data/photographyPhotos'
import { PHOTOGRAPHY_FILTERS, photoMatchesFilter } from '../data/photographyFilters'
import { arrangePhotosByHue, arrangePhotosForPanel } from '../data/arrangePhotography'
import { PHOTOGRAPHY_PORTRAIT, PHOTO_EDITING_1, PHOTO_EDITING_2 } from '../assets'
import { publicUrl } from '../utils/publicUrl'
import { useI18n } from '../i18n/I18nContext'

const FILTER_LOGO = publicUrl('logoicon.png')

const FILTER_COLUMN_LABELS = [
  ['Portrait', 'People', 'Urban', 'Arquitecture', 'B&W', 'Nature', 'Landscape'],
  ['Asia', 'Japan', 'Mexico City', 'Florence Italy', 'Germany', 'Denmark', 'Norway', 'USA', 'Niagara Falls'],
]

const FILTER_COLUMNS = FILTER_COLUMN_LABELS.map((labels, columnIndex) => {
  const items = labels.map((label) => {
    const filter = PHOTOGRAPHY_FILTERS.find((item) => item.label === label)
    if (!filter) throw new Error(`Missing photography filter: ${label}`)
    return { kind: 'tag', filter }
  })
  if (columnIndex === 0) items.push({ kind: 'random', label: 'Random' })
  return items
})

function pickRandomPhoto(current) {
  const pool = PHOTOGRAPHY_PHOTOS.filter((photo) => photo.src !== current?.src)
  const source = pool.length ? pool : PHOTOGRAPHY_PHOTOS
  return source[Math.floor(Math.random() * source.length)]
}

function FoldHeading({ id, label, open, mobile, onToggle, controls }) {
  if (!mobile) {
    return <h2 id={id} className="photography-screen__section-title">{label}</h2>
  }
  return (
    <h2 id={id} className="photography-screen__section-title">
      <button
        type="button"
        className="photography-screen__fold"
        aria-expanded={open}
        aria-controls={controls}
        onClick={onToggle}
      >
        {label}
        <span
          className={`photography-screen__fold-arrow${open ? ' photography-screen__fold-arrow--up' : ''}`}
          aria-hidden="true"
        />
      </button>
    </h2>
  )
}

export default function Photography({ onNavigate }) {
  const { t } = useI18n()
  const title = t('photography.title')
  const [activeFilter, setActiveFilter] = useState(null)
  const [randomPhoto, setRandomPhoto] = useState(null)
  const [panel, setPanel] = useState(() => window.matchMedia(PHOTO_PANEL_QUERY).matches)
  const [photoOpen, setPhotoOpen] = useState(false)
  const [editingOpen, setEditingOpen] = useState(false)
  const photoFolded = panel && !photoOpen
  const editingFolded = panel && !editingOpen
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
                <div className="photography-screen__filter-column" key={column[0].filter?.label || column[0].label}>
                  {index > 0 ? (
                    <div className="photography-screen__filter-divider" aria-hidden="true" />
                  ) : null}
                  <ul className="photography-screen__filters">
                    {column.map((item) => {
                      if (item.kind === 'random') {
                        const selected = Boolean(randomPhoto)
                        return (
                          <li key="Random">
                            <button
                              type="button"
                              className={`photography-screen__filter${
                                selected ? ' photography-screen__filter--active' : ''
                              }`}
                              aria-pressed={selected}
                              onClick={selectRandom}
                            >
                              <img
                                className="photography-screen__filter-mark"
                                src={FILTER_LOGO}
                                alt=""
                                aria-hidden="true"
                              />
                              <span className="photography-screen__filter-label">Random</span>
                            </button>
                          </li>
                        )
                      }
                      const selected = !randomPhoto && activeFilter?.label === item.filter.label
                      return (
                        <li key={item.filter.label}>
                          <button
                            type="button"
                            className={`photography-screen__filter${
                              selected ? ' photography-screen__filter--active' : ''
                            }`}
                            aria-pressed={selected}
                            onClick={() => selectFilter(item.filter)}
                          >
                            <img
                              className="photography-screen__filter-mark"
                              src={FILTER_LOGO}
                              alt=""
                              aria-hidden="true"
                            />
                            <span className="photography-screen__filter-label">{item.filter.label}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
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

        <section className="photography-screen__other-works" aria-label={t('photography.otherWorks')}>
          <h2 className="photography-screen__section-title">{t('photography.otherWorks')}</h2>
          <OtherWorks onNavigate={onNavigate} />
        </section>

        <Footer className="footer--in-flow" />
      </main>
    </div>
  )
}
