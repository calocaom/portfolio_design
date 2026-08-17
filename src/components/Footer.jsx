import './Footer.css'
import { useI18n } from '../i18n/I18nContext'

const EMAIL = 'omarcaloca1@gmail.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/omarcaloca'

function ArrowUpIcon() {
  return (
    <svg
      className="back-to-top__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 19V5M6.5 10.5 12 5l5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function scrollScreenToTop() {
  const screen = document.querySelector('.screen')
  if (screen) {
    screen.scrollTo({ top: 0, behavior: 'smooth' })
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default function Footer({ className = '', showBackToTop = true }) {
  const { t } = useI18n()

  return (
    <>
      {showBackToTop ? (
        <div className="back-to-top">
          <button
            type="button"
            className="back-to-top__btn"
            onClick={scrollScreenToTop}
            aria-label={t('footer.backToTopAria')}
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUpIcon />
          </button>
        </div>
      ) : null}
      <footer className={`footer${className ? ` ${className}` : ''}`}>
        <div className="footer__text">
          <p>{t('footer.name')}</p>
          <p>{t('footer.role')}</p>
          <p>{EMAIL}</p>
        </div>
        <div className="footer__aside">
          <p className="footer__scribble">{t('footer.createTogether')}</p>
          <div className="footer__links">
            <a
              href={`mailto:${EMAIL}`}
              className="footer__link"
              aria-label={t('footer.emailAria')}
            >
              <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 13l8-6.99V6H4zm16 12V8.5l-8 6.99-8-6.99V18h16z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href={LINKEDIN_URL}
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('footer.linkedinAria')}
            >
              <svg className="footer__icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5v-9h3v9zM6.5 8.25A1.75 1.75 0 1 1 6.5 4.75a1.75 1.75 0 0 1 0 3.5zM19 19h-3v-4.34c0-1.03-.02-2.35-1.43-2.35-1.43 0-1.65 1.12-1.65 2.27V19h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59V19z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
