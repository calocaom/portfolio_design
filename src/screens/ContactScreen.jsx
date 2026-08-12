import { useLayoutEffect, useRef, useState } from 'react'
import './ContactScreen.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import WatercolorBrush from '../components/WatercolorBrush'
import { HERO_LOGO_STILL } from '../assets'
import { useI18n } from '../i18n/I18nContext'

const EMAIL = 'omarcaloca1@gmail.com'
const PHONE = '(+45) 31 82 01 08'
const PHONE_HREF = '+4531820108'
const LINKEDIN_URL = 'https://www.linkedin.com/in/omarcaloca/'

function EmailIcon() {
  return (
    <svg className="contact-screen__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 13l8-6.99V6H4zm16 12V8.5l-8 6.99-8-6.99V18h16z"
        fill="currentColor"
      />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="contact-screen__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.02l-2.2 2.19z"
        fill="currentColor"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg className="contact-screen__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 6.5 4.75a1.75 1.75 0 0 1 0 3.5zM19 19h-3v-4.34c0-1.03-.02-2.35-1.43-2.35-1.43 0-1.65 1.12-1.65 2.27V19h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59V19z"
        fill="currentColor"
      />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg className="contact-screen__copy-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z"
        fill="currentColor"
      />
    </svg>
  )
}

function CopyButton({ value, labelKey }) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)
  const label = t(labelKey)

  async function handleCopy(event) {
    event.preventDefault()
    event.stopPropagation()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      className={`contact-screen__copy${copied ? ' contact-screen__copy--done' : ''}`}
      onClick={handleCopy}
      aria-label={copied ? `${label} — ${t('contact.copied')}` : `${t('contact.copy')} ${label}`}
      title={copied ? t('contact.copied') : `${t('contact.copy')} ${label}`}
    >
      <CopyIcon />
      <span className="contact-screen__copy-feedback" aria-live="polite">
        {copied ? t('contact.copied') : ''}
      </span>
    </button>
  )
}

function FitPrimaryLink({
  href,
  children,
  className = '',
  maxPx = 96,
  minPx = 14,
  ...props
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    const row = el?.parentElement
    if (!el || !row) return undefined

    function fit() {
      const styles = getComputedStyle(row)
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0
      const siblings = [...row.children].filter((child) => child !== el)
      const used = siblings.reduce(
        (sum, child) => sum + child.getBoundingClientRect().width,
        0,
      )
      const available = Math.max(0, row.clientWidth - used - gap * siblings.length)

      let low = minPx
      let high = maxPx
      let best = minPx

      while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        el.style.fontSize = `${mid}px`
        if (el.scrollWidth <= available + 0.5) {
          best = mid
          low = mid + 1
        } else {
          high = mid - 1
        }
      }

      el.style.fontSize = `${best}px`
    }

    fit()

    const observer = new ResizeObserver(fit)
    observer.observe(row)
    window.addEventListener('resize', fit)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [children, maxPx, minPx])

  return (
    <a
      ref={ref}
      href={href}
      className={`contact-screen__primary${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </a>
  )
}

export default function ContactScreen({ onNavigate }) {
  const screenRef = useRef(null)
  const { t } = useI18n()

  return (
    <div ref={screenRef} className="screen contact-screen">
      <div className="contact-screen__atmosphere" aria-hidden="true">
        <div
          className="contact-screen__bg"
          style={{ backgroundImage: `url(${HERO_LOGO_STILL})` }}
        />
        <WatercolorBrush containerRef={screenRef} />
      </div>

      <main className="contact-screen__content">
        <SiteNav activeId="contact" onNavigate={onNavigate} />

        <section className="contact-screen__body" aria-label={t('contact.infoAria')}>
          <p className="contact-screen__label">{t('contact.label')}</p>

          <div className="contact-screen__row">
            <a
              href={`mailto:${EMAIL}`}
              className="contact-screen__icon-link"
              aria-label={t('contact.emailAria')}
            >
              <EmailIcon />
            </a>
            <FitPrimaryLink href={`mailto:${EMAIL}`} maxPx={96} minPx={16}>
              {EMAIL}
            </FitPrimaryLink>
            <CopyButton value={EMAIL} labelKey="contact.copyEmail" />
          </div>

          <div className="contact-screen__row">
            <a
              href={`tel:${PHONE_HREF}`}
              className="contact-screen__icon-link"
              aria-label={t('contact.phoneAria')}
            >
              <PhoneIcon />
            </a>
            <FitPrimaryLink href={`tel:${PHONE_HREF}`} maxPx={96} minPx={16}>
              {PHONE}
            </FitPrimaryLink>
            <CopyButton value={PHONE} labelKey="contact.copyPhone" />
          </div>

          <div className="contact-screen__row">
            <a
              href={LINKEDIN_URL}
              className="contact-screen__icon-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('contact.linkedinAria')}
            >
              <LinkedInIcon />
            </a>
            <FitPrimaryLink
              href={LINKEDIN_URL}
              className="contact-screen__primary--link"
              maxPx={52}
              minPx={12}
              target="_blank"
              rel="noopener noreferrer"
            >
              {LINKEDIN_URL}
            </FitPrimaryLink>
            <CopyButton value={LINKEDIN_URL} labelKey="contact.copyLinkedin" />
          </div>
        </section>

        <Footer className="footer--in-flow" />
      </main>
    </div>
  )
}
