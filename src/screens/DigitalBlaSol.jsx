import './UxCaseStudy.css'
import './Yoga.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import AnimatedTitle from '../components/AnimatedTitle'
import { useI18n } from '../i18n/I18nContext'

const META_KEYS = ['date', 'team', 'tools', 'methods', 'target', 'client']

/* Replace with the live Figma prototype URL when ready */
const FIGMA_PROTOTYPE_URL = '#'

export default function DigitalBlaSol({ onNavigate }) {
  const { dict, t } = useI18n()
  const meta = dict.digitalBlaSol.meta

  return (
    <div className="screen ux-case-study yoga">
      <main className="ux-case-study__content">
        <SiteNav
          activeId="works"
          onNavigate={onNavigate}
          trail={[
            { label: t('digitalSolutions.navCrumb'), to: 'digital-solutions' },
            { label: t('digitalBlaSol.navCrumb') },
          ]}
        />

        <section
          className="ux-case-study__intro"
          aria-label={t('digitalBlaSol.title')}
        >
          <h1 className="ux-case-study__title">{t('digitalBlaSol.title')}</h1>
          <p className="ux-case-study__lede">{t('digitalBlaSol.description')}</p>
          <a
            className="ux-case-study__cta"
            href={FIGMA_PROTOTYPE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('digitalBlaSol.figmaCta')}
          </a>
        </section>

        <div className="ux-case-study__body">
          <div className="ux-case-study__split">
            <dl
              className="ux-case-study__meta"
              aria-label={t('digitalBlaSol.metaAria')}
            >
              {META_KEYS.map((key) => (
                <div key={key} className="ux-case-study__meta-row">
                  <dt className="ux-case-study__meta-label">
                    {t(`digitalBlaSol.metaLabels.${key}`)}
                  </dt>
                  <dd className="ux-case-study__meta-value">{meta[key]}</dd>
                </div>
              ))}
            </dl>
          </div>

          <section
            className="ux-case-study__section"
            aria-labelledby="digital-bla-sol-problem-statement"
          >
            <AnimatedTitle
              id="digital-bla-sol-problem-statement"
              className="ux-case-study__subtitle"
            >
              {t('digitalBlaSol.problemStatement')}
            </AnimatedTitle>
            <div className="ux-case-study__quote">
              <span className="ux-case-study__quote-mark" aria-hidden="true">
                “
              </span>
              <p className="ux-case-study__section-text ux-case-study__section-text--center">
                {t('digitalBlaSol.problemDescription')}
              </p>
            </div>
          </section>

          <div className="ux-case-study__topic-list">
            {dict.digitalBlaSol.topics.map((topic) => (
              <section
                key={topic.title}
                className="ux-case-study__section"
                aria-label={topic.title}
              >
                <AnimatedTitle className="ux-case-study__subtitle">
                  {topic.title}
                </AnimatedTitle>
                <p className="ux-case-study__section-text ux-case-study__section-text--center">
                  {topic.description}
                </p>
              </section>
            ))}
          </div>
        </div>

        <Footer className="footer--in-flow" />
      </main>
    </div>
  )
}
