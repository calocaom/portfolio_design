import './LanguageFilter.css'
import { useI18n } from '../i18n/I18nContext'

export default function LanguageFilter() {
  const { lang, setLang, languages, t } = useI18n()

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
