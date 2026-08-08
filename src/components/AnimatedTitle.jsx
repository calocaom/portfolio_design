import './AnimatedTitle.css'
import { useEffect, useRef, useState } from 'react'

export default function AnimatedTitle({ children, className = '' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const [playId, setPlayId] = useState(0)
  const text = String(children)
  const lines = text.split('\n')
  const ariaLabel = text.replace(/\n/g, ' ')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const root = el.closest('.main-page, .about-screen, .makeup-fx-screen')

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlayId((id) => id + 1)
          setActive(true)
        } else {
          setActive(false)
        }
      },
      {
        root,
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  let runningIndex = 0

  return (
    <h2
      ref={ref}
      className={`project-row__title${active ? ' project-row__title--in' : ''}${className ? ` ${className}` : ''}`}
      aria-label={ariaLabel}
    >
      {lines.map((line, lineIndex) => {
        const lineStart = runningIndex
        const chars = Array.from(line)
        runningIndex += chars.length

        return (
          <span key={`${playId}-line-${lineIndex}`} className="project-row__line">
            {chars.map((char, localIndex) => {
              const index = lineStart + localIndex

              return (
                <span
                  key={`${playId}-${index}-${char}`}
                  className="project-row__char"
                  style={{ '--i': index }}
                  aria-hidden="true"
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              )
            })}
          </span>
        )
      })}
    </h2>
  )
}
