import { useEffect, useRef, useState } from 'react'
import './RunThroughCarousel.css'
import {
  BLA_SOL_RUNTHROUGH_1,
  BLA_SOL_RUNTHROUGH_2,
  BLA_SOL_RUNTHROUGH_3,
  BLA_SOL_RUNTHROUGH_4,
  BLA_SOL_RUNTHROUGH_5,
} from '../assets'

const SLIDE_SOURCES = [
  BLA_SOL_RUNTHROUGH_5,
  BLA_SOL_RUNTHROUGH_4,
  BLA_SOL_RUNTHROUGH_2,
  BLA_SOL_RUNTHROUGH_1,
  BLA_SOL_RUNTHROUGH_3,
]

const SWIPE_THRESHOLD = 40

export default function RunThroughCarousel({
  legends = [],
  prevLabel,
  nextLabel,
  label,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const viewportRef = useRef(null)
  const count = SLIDE_SOURCES.length

  useEffect(() => {
    const media = window.matchMedia('(max-width: 640px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const node = viewportRef.current
    if (!node) return

    const start = { x: 0, y: 0, active: false }

    function onPointerDown(event) {
      if (event.pointerType === 'mouse') return
      start.x = event.clientX
      start.y = event.clientY
      start.active = true
    }

    function onPointerUp(event) {
      if (!start.active) return
      start.active = false
      const dx = event.clientX - start.x
      const dy = event.clientY - start.y
      if (Math.abs(dx) < SWIPE_THRESHOLD) return
      if (Math.abs(dx) <= Math.abs(dy)) return
      setActiveIndex((current) => {
        const next = current + (dx < 0 ? 1 : -1)
        if (next < 0 || next >= count) return current
        return next
      })
    }

    function onPointerCancel() {
      start.active = false
    }

    node.addEventListener('pointerdown', onPointerDown)
    node.addEventListener('pointerup', onPointerUp)
    node.addEventListener('pointercancel', onPointerCancel)
    return () => {
      node.removeEventListener('pointerdown', onPointerDown)
      node.removeEventListener('pointerup', onPointerUp)
      node.removeEventListener('pointercancel', onPointerCancel)
    }
  }, [count])

  function go(step) {
    setActiveIndex((current) => {
      const next = current + step
      if (next < 0 || next >= count) return current
      return next
    })
  }

  function offsetFromActive(index) {
    return index - activeIndex
  }

  const isFirst = activeIndex === 0
  const isLast = activeIndex === count - 1

  function onKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    }
  }

  const legend = legends[activeIndex] || ''

  return (
    <div
      className="run-through"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="run-through__stage">
        <button
          type="button"
          className="run-through__arrow run-through__arrow--prev"
          onClick={() => go(-1)}
          aria-label={prevLabel}
          disabled={isFirst}
        >
          ‹
        </button>

        <div className="run-through__viewport" ref={viewportRef}>
          {SLIDE_SOURCES.map((src, index) => {
            const offset = offsetFromActive(index)
            const isActive = offset === 0
            const isFar = Math.abs(offset) > 1

            const isSide = !isMobile && !isActive && !isFar

            return (
              <figure
                key={src}
                className={`run-through__slide${
                  isActive
                    ? ' run-through__slide--active'
                    : ' run-through__slide--side'
                }${isFar ? ' run-through__slide--far' : ''}`}
                style={{
                  ['--offset']: String(offset),
                  zIndex: isActive ? 20 : 10 - Math.abs(offset),
                }}
                aria-hidden={!isSide && !isActive}
                role={isSide ? 'button' : undefined}
                tabIndex={isSide ? 0 : undefined}
                aria-label={
                  isSide ? (offset < 0 ? prevLabel : nextLabel) : undefined
                }
                onClick={isSide ? () => go(offset) : undefined}
                onKeyDown={
                  isSide
                    ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          go(offset)
                        }
                      }
                    : undefined
                }
              >
                <img
                  src={src}
                  alt={isActive ? legend : ''}
                  className="run-through__image"
                  draggable={false}
                />
              </figure>
            )
          })}
        </div>

        <button
          type="button"
          className="run-through__arrow run-through__arrow--next"
          onClick={() => go(1)}
          aria-label={nextLabel}
          disabled={isLast}
        >
          ›
        </button>
      </div>

      {legend ? (
        <p className="run-through__legend" aria-live="polite">
          {legend}
        </p>
      ) : null}
    </div>
  )
}
