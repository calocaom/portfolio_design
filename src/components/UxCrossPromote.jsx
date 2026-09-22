import './UxCrossPromote.css'
import { useI18n } from '../i18n/I18nContext'

export default function UxCrossPromote({
  onNavigate,
  route,
  cover,
  title,
  coverPosition,
  copyKey = 'uxCrossPromote',
}) {
  const { t } = useI18n()

  if (!route || !cover || !title) return null

  return (
    <section
      className="ux-cross-promote"
      aria-label={t(`${copyKey}.aria`)}
    >
      <h2 className="ux-cross-promote__heading">{t(`${copyKey}.heading`)}</h2>
      <button
        type="button"
        className="ux-cross-promote__card"
        onClick={() => onNavigate?.(route)}
        aria-label={title}
      >
        <span className="ux-cross-promote__thumb" aria-hidden="true">
          <img
            src={cover}
            alt=""
            className={`ux-cross-promote__image${
              coverPosition ? ` ux-cross-promote__image--${coverPosition}` : ''
            }`}
          />
        </span>
        <span
          className={`ux-cross-promote__title${
            /^cphfw$/i.test(title) ? ' ux-cross-promote__title--caps' : ''
          }`}
        >
          {title}
        </span>
      </button>
    </section>
  )
}
