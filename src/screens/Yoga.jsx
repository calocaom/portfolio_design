import './UxCaseStudy.css'
import './Yoga.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import { useI18n } from '../i18n/I18nContext'

const META_KEYS = ['date', 'team', 'tools', 'methods', 'client']

/* Replace with the live Figma prototype URL when ready */
const FIGMA_PROTOTYPE_URL = 'https://www.figma.com/'

export default function Yoga({ onNavigate }) {
  const { dict, t } = useI18n()
  const meta = dict.yoga.meta

  return (
    <div className="screen ux-case-study yoga">
      <main className="ux-case-study__content">
        <SiteNav
          activeId="works"
          onNavigate={onNavigate}
          trail={[
            { label: t('uxUi.navCrumb'), to: 'ux-ui' },
            { label: t('yoga.navCrumb') },
          ]}
        />

        <section
          className="ux-case-study__intro"
          aria-label={t('yoga.title')}
        >
          <h1 className="ux-case-study__title">{t('yoga.title')}</h1>
          <p className="ux-case-study__lede">{t('yoga.description')}</p>
          <a
            className="ux-case-study__cta"
            href={FIGMA_PROTOTYPE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('yoga.figmaCta')}
          </a>
        </section>

        <div className="ux-case-study__body">
          <dl className="ux-case-study__meta" aria-label={t('yoga.metaAria')}>
            {META_KEYS.map((key) => (
              <div key={key} className="ux-case-study__meta-row">
                <dt className="ux-case-study__meta-label">
                  {t(`yoga.metaLabels.${key}`)}
                </dt>
                <dd className="ux-case-study__meta-value">{meta[key]}</dd>
              </div>
            ))}
          </dl>

          <section
            className="ux-case-study__section"
            aria-labelledby="yoga-problem-statement"
          >
            <h2
              id="yoga-problem-statement"
              className="ux-case-study__subtitle"
            >
              {t('yoga.problemStatement')}
            </h2>
            <div className="ux-case-study__quote">
              <span className="ux-case-study__quote-mark" aria-hidden="true">
                “
              </span>
              <p className="ux-case-study__section-text ux-case-study__section-text--center">
                {t('yoga.problemDescription')}
              </p>
            </div>
          </section>

          <section
            className="ux-case-study__section"
            aria-labelledby="yoga-research-results"
          >
            <h2
              id="yoga-research-results"
              className="ux-case-study__subtitle"
            >
              {t('yoga.researchResults')}
            </h2>
            <p className="ux-case-study__section-text ux-case-study__section-text--center">
              {t('yoga.researchDescription')}
            </p>
          </section>

          <section
            className="ux-case-study__section"
            aria-labelledby="yoga-affinity"
          >
            <h2 id="yoga-affinity" className="ux-case-study__subtitle">
              {t('yoga.affinityTitle')}
            </h2>
            <p className="ux-case-study__section-text ux-case-study__section-text--center">
              {t('yoga.affinityDescription')}
            </p>
          </section>

          <section
            className="ux-case-study__section"
            aria-labelledby="yoga-persona"
          >
            <h2 id="yoga-persona" className="ux-case-study__subtitle">
              {t('yoga.personaTitle')}
            </h2>
            <p className="ux-case-study__section-text ux-case-study__section-text--center">
              {t('yoga.personaDescription')}
            </p>
          </section>

          <div className="ux-case-study__topic-list">
            {dict.yoga.topics.map((topic) => (
              <section
                key={topic.title}
                className="ux-case-study__section"
                aria-label={topic.title}
              >
                <h2 className="ux-case-study__subtitle">{topic.title}</h2>
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
