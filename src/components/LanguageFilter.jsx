import { useEffect, useRef } from 'react'
import './LanguageFilter.css'
import { useI18n } from '../i18n/I18nContext'

export default function LanguageFilter({
  compact = false,
  open = false,
  onOpenChange,
  panelId,
}) {
  const { lang, setLang, languages, t } = useI18n()
  const rootRef = useRef(null)
  const current = languages.find((item) => item.code === lang) ?? languages[0]

  useEffect(() => {
    if (!compact || !open) return undefined

    function handlePointerDown(event) {
      if (rootRef.current?.contains(event.target)) return
      onOpenChange?.(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [compact, open, onOpenChange])

  if (!compact) {
    return (
      <div className="lang-filter" role="group" aria-label={t('lang.label')}>
        {languages.map((item) => (
          <button
            key={item.code}
            type="button"
            className={`lang-filter__btn${lang === item.code ? ' lang-filter__btn--active' : ''}`}
            onClick={() => setLang(item.code)}
            aria-pressed={lang === item.code}
          >
            {item.label}
          </button>
        ))}
      </div>
    )
  }

  function handleSelect(code) {
    setLang(code)
    onOpenChange?.(false)
  }

  return (
    <div
      ref={rootRef}
      className={`lang-filter lang-filter--compact${open ? ' lang-filter--open' : ''}`}
    >
      <button
        type="button"
        className="lang-filter__trigger"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? t('lang.close') : t('lang.open')}
        onClick={() => onOpenChange?.(!open)}
      >
        {current.label}
      </button>

      {open ? (
        <button
          type="button"
          className="lang-filter__backdrop"
          aria-label={t('lang.close')}
          onClick={() => onOpenChange?.(false)}
        />
      ) : null}

      <div
        id={panelId}
        className="lang-filter__drawer"
        hidden={!open}
        aria-hidden={!open}
      >
        <ul className="lang-filter__drawer-list" role="listbox" aria-label={t('lang.label')}>
          {languages
            .filter((item) => item.code !== lang)
            .map((item) => (
              <li key={item.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={false}
                  className="lang-filter__drawer-option"
                  onClick={() => handleSelect(item.code)}
                >
                  {item.label}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
