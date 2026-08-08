import { useEffect, useState } from 'react'
import './ImageCarousel.css'
import {
  CAROUSEL_1,
  CAROUSEL_2,
  CAROUSEL_3,
  CAROUSEL_4,
  CAROUSEL_5,
  CAROUSEL_6,
  CAROUSEL_7,
  CAROUSEL_8,
  CAROUSEL_9,
  CAROUSEL_10,
  CAROUSEL_11,
  CAROUSEL_12,
} from '../assets'

const SLIDES = [
  { src: CAROUSEL_1, alt: 'Portfolio photograph 1' },
  { src: CAROUSEL_2, alt: 'Portfolio photograph 2' },
  { src: CAROUSEL_3, alt: 'Portfolio photograph 3' },
  { src: CAROUSEL_4, alt: 'Portfolio photograph 4' },
  { src: CAROUSEL_5, alt: 'Portfolio photograph 5' },
  { src: CAROUSEL_6, alt: 'Portfolio photograph 6' },
  { src: CAROUSEL_7, alt: 'Portfolio photograph 7' },
  { src: CAROUSEL_8, alt: 'Portfolio photograph 8' },
  { src: CAROUSEL_9, alt: 'Portfolio photograph 9' },
  { src: CAROUSEL_10, alt: 'Portfolio photograph 10' },
  { src: CAROUSEL_11, alt: 'Portfolio photograph 11' },
  { src: CAROUSEL_12, alt: 'Portfolio photograph 12' },
]

export default function ImageCarousel({
  className = '',
  intervalMs = 2500,
  size = 'default',
  axis = 'horizontal',
  label = 'Featured work',
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const count = SLIDES.length

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count)
    }, intervalMs)

    return () => clearInterval(timer)
  }, [count, intervalMs])

  function offsetFromActive(index) {
    let diff = index - activeIndex
    if (diff > count / 2) diff -= count
    if (diff < -count / 2) diff += count
    return diff
  }

  return (
    <div
      className={[
        'image-carousel',
        `image-carousel--${size}`,
        `image-carousel--${axis}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="image-carousel__viewport">
        {SLIDES.map((slide, index) => {
          const offset = offsetFromActive(index)
          const isActive = offset === 0

          return (
            <figure
              key={slide.src}
              className={`image-carousel__slide${isActive ? ' image-carousel__slide--active' : ' image-carousel__slide--negative'}`}
              style={{
                ['--offset']: String(offset),
                zIndex: isActive ? 20 : 10 - Math.abs(offset),
              }}
              aria-hidden={!isActive}
            >
              <img
                src={slide.src}
                alt={isActive ? slide.alt : ''}
                className="image-carousel__image"
                draggable={false}
              />
            </figure>
          )
        })}
      </div>
    </div>
  )
}
