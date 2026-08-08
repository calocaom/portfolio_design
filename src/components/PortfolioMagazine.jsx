import { useCallback, useEffect, useRef, useState } from 'react'
import './PortfolioMagazine.css'
import { useI18n } from '../i18n/I18nContext'

const DESKTOP_MIN = '(min-width: 1025px)'

function useDesktopSpread() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(DESKTOP_MIN).matches : true,
  )

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MIN)
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return isDesktop
}

export default function PortfolioMagazine({ pages = [], title, open, onClose }) {
  const { t } = useI18n()
  const isDesktop = useDesktopSpread()
  const pagesPerView = isDesktop ? 2 : 1

  const pageCount = pages.length
  const [spreadIndex, setSpreadIndex] = useState(0)
  const [animClass, setAnimClass] = useState('')
  const touchStartX = useRef(null)
  const animating = useRef(false)

  const spreadCount = Math.max(1, Math.ceil(pageCount / pagesPerView) || 1)
  const startPage = spreadIndex * pagesPerView + 1
  const visiblePages = Array.from({ length: pagesPerView }, (_, i) => startPage + i).filter(
    (n) => n >= 1 && n <= pageCount,
  )

  useEffect(() => {
    if (!open) return
    setSpreadIndex(0)
    setAnimClass('')
    animating.current = false
  }, [open, pages])

  useEffect(() => {
    if (!open || pageCount === 0) return
    const maxIndex = Math.max(0, Math.ceil(pageCount / pagesPerView) - 1)
    setSpreadIndex((i) => Math.min(i, maxIndex))
  }, [open, pageCount, pagesPerView])

  const go = useCallback(
    (direction) => {
      if (animating.current || pageCount === 0) return
      const maxIndex = Math.max(0, Math.ceil(pageCount / pagesPerView) - 1)
      const next = spreadIndex + direction
      if (next < 0 || next > maxIndex) return

      animating.current = true
      setAnimClass(direction > 0 ? 'is-exit-left' : 'is-exit-right')

      window.setTimeout(() => {
        setSpreadIndex(next)
        setAnimClass(direction > 0 ? 'is-enter-right' : 'is-enter-left')
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimClass('is-settle')
            window.setTimeout(() => {
              setAnimClass('')
              animating.current = false
            }, 420)
          })
        })
      }, 280)
    },
    [pageCount, pagesPerView, spreadIndex],
  )

  useEffect(() => {
    if (!open) return

    function onKey(event) {
      if (event.key === 'Escape') onClose?.()
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, go])

  function onTouchStart(event) {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null
  }

  function onTouchEnd(event) {
    if (touchStartX.current == null) return
    const dx = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 48) return
    go(dx < 0 ? 1 : -1)
  }

  if (!open) return null

  const currentLabel =
    visiblePages.length > 1
      ? `${visiblePages[0]}–${visiblePages[visiblePages.length - 1]}`
      : String(visiblePages[0] || 1)

  return (
    <div
      className="portfolio-magazine"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose?.()
      }}
    >
      <div className="portfolio-magazine__panel">
        <header className="portfolio-magazine__header">
          <h2 className="portfolio-magazine__title">{title}</h2>
          <button
            type="button"
            className="portfolio-magazine__close"
            onClick={onClose}
            aria-label={t('makeupFx.magazineClose')}
          >
            ×
          </button>
        </header>

        <div
          className="portfolio-magazine__stage"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            className="portfolio-magazine__arrow portfolio-magazine__arrow--prev"
            onClick={() => go(-1)}
            disabled={spreadIndex <= 0 || pageCount === 0}
            aria-label={t('makeupFx.magazinePrev')}
          >
            ‹
          </button>

          <div className={`portfolio-magazine__spread ${animClass}`.trim()}>
            {pageCount === 0 ? (
              <p className="portfolio-magazine__status">{t('makeupFx.magazineError')}</p>
            ) : (
              <div
                className={`portfolio-magazine__pages${visiblePages.length > 1 ? ' portfolio-magazine__pages--pair' : ''}`}
              >
                {visiblePages.map((pageNumber) => (
                  <div key={`${spreadIndex}-${pageNumber}`} className="portfolio-magazine__page">
                    <img
                      src={pages[pageNumber - 1]}
                      alt={`${title} — page ${pageNumber}`}
                      className="portfolio-magazine__image"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="portfolio-magazine__arrow portfolio-magazine__arrow--next"
            onClick={() => go(1)}
            disabled={spreadIndex >= spreadCount - 1 || pageCount === 0}
            aria-label={t('makeupFx.magazineNext')}
          >
            ›
          </button>
        </div>

        <p className="portfolio-magazine__counter" aria-live="polite">
          {pageCount > 0
            ? t('makeupFx.magazineCounter')
                .replace('{current}', currentLabel)
                .replace('{total}', String(pageCount))
            : ''}
        </p>
      </div>
    </div>
  )
}
