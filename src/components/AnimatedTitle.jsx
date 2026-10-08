import './AnimatedTitle.css'
import { useEffect, useRef, useState } from 'react'

export default function AnimatedTitle({ children, className = '', id, as: Tag = 'h2' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const [playId, setPlayId] = useState(0)
  const text = String(children)
  const lines = text.split('\n')
  const ariaLabel = text.replace(/\n/g, ' ')

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const root = el.closest(
      '.main-page, .about-screen, .makeup-fx-screen, .ux-case-study, .photography-screen',
    )

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
    <Tag
      id={id}
      ref={ref}
      className={`project-row__title${active ? ' project-row__title--in' : ''}${className ? ` ${className}` : ''}`}
      aria-label={ariaLabel}
    >
      {lines.map((line, lineIndex) => {
        const lineStart = runningIndex
        const chars = Array.from(line)
        runningIndex += chars.length

        const tokens = []
        let word = []
        chars.forEach((char, localIndex) => {
          const index = lineStart + localIndex
          if (char === ' ') {
            if (word.length) {
              tokens.push({ kind: 'word', chars: word })
              word = []
            }
            tokens.push({ kind: 'space', index })
          } else {
            word.push({ char, index })
          }
        })
        if (word.length) tokens.push({ kind: 'word', chars: word })

        return (
          <span key={`${playId}-line-${lineIndex}`} className="project-row__line">
            {tokens.map((token, tokenIndex) => {
              if (token.kind === 'space') {
                return (
                  <span
                    key={`${playId}-${token.index}-space`}
                    className="project-row__char"
                    style={{ '--i': token.index }}
                    aria-hidden="true"
                  >
                    {'\u00A0'}
                  </span>
                )
              }

              return (
                <span key={`${playId}-word-${lineIndex}-${tokenIndex}`} className="project-row__word">
                  {token.chars.map(({ char, index }) => (
                    <span
                      key={`${playId}-${index}-${char}`}
                      className="project-row__char"
                      style={{ '--i': index }}
                      aria-hidden="true"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              )
            })}
          </span>
        )
      })}
    </Tag>
  )
}
