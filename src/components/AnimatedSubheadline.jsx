import { useEffect, useState } from 'react'
import './AnimatedSubheadline.css'
import { useI18n } from '../i18n/I18nContext'

const ENTER_STAGGER_MS = 28
const EXIT_STAGGER_MS = 22
const HOLD_MS = 3000
const LETTER_TRAVEL_MS = 280

/** @param {{ variant?: 'home' | 'about' }} props */
export default function AnimatedSubheadline({ variant = 'about' }) {
  const { dict, lang } = useI18n()
  const sentences =
    variant === 'home' ? dict.subheadlineHome : dict.subheadline
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [phase, setPhase] = useState('entering')

  useEffect(() => {
    setSentenceIndex(0)
    setPhase('entering')
  }, [lang, variant])

  const sentence = sentences[sentenceIndex % sentences.length] ?? ''
  const letters = Array.from(sentence)

  useEffect(() => {
    const enterDuration = letters.length * ENTER_STAGGER_MS + LETTER_TRAVEL_MS
    const exitDuration = letters.length * EXIT_STAGGER_MS + LETTER_TRAVEL_MS
    const timers = []

    if (phase === 'entering') {
      timers.push(setTimeout(() => setPhase('holding'), enterDuration))
    }

    if (phase === 'holding') {
      timers.push(setTimeout(() => setPhase('exiting'), HOLD_MS))
    }

    if (phase === 'exiting') {
      timers.push(
        setTimeout(() => {
          setSentenceIndex((prev) => (prev + 1) % sentences.length)
          setPhase('entering')
        }, exitDuration),
      )
    }

    return () => timers.forEach(clearTimeout)
  }, [phase, letters.length, sentenceIndex, sentences.length])

  return (
    <p className={`subheadline subheadline--${phase}`} aria-live="polite">
      {letters.map((char, index) => (
        <span
          key={`${lang}-${sentenceIndex}-${index}`}
          className="subheadline__letter"
          style={{
            '--i': index,
            '--n': letters.length,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </p>
  )
}
