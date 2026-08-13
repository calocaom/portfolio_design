import './UxCaseStudy.css'
import './Yoga.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import AnimatedTitle from '../components/AnimatedTitle'
import UxCrossPromote from '../components/UxCrossPromote'
import { DIGITAL_YOGA_COVER } from '../assets'
import { useI18n } from '../i18n/I18nContext'
import {
  CphfwHifiTestingChart,
  CphfwMoodboardChart,
  CphfwSiteMapChart,
  CphfwStyleTileChart,
  CphfwUxWritingChart,
  CphfwWireframesChart,
} from './YogaCharts'

const META_KEYS = ['date', 'team', 'role', 'tools', 'methods', 'target', 'client']

const TOPIC_CHARTS = {
  sitemap: CphfwSiteMapChart,
  wireframes: CphfwWireframesChart,
  moodboard: CphfwMoodboardChart,
  'style-tile': CphfwStyleTileChart,
  'ux-writing': CphfwUxWritingChart,
  'hifi-testing': CphfwHifiTestingChart,
}

const FIGMA_PROTOTYPE_URL =
  'https://www.figma.com/proto/dtnyvIJ6zOXbOqDAZZHXvQ/COPENHAGEN-FW?node-id=504-429&t=QBxBwZovP5bOiutE-1&starting-point-node-id=579%3A2864'
const CODED_SOLUTION_URL = 'https://cphfw-dur.pages.dev/'

function ProjectCtas({ t }) {
  return (
    <div className="ux-case-study__cta-row">
      <a
        className="ux-case-study__cta"
        href={FIGMA_PROTOTYPE_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('digitalCphfw.figmaCta')}
      </a>
      <a
        className="ux-case-study__cta"
        href={CODED_SOLUTION_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t('digitalCphfw.codedSolutionCta')}
      </a>
    </div>
  )
}

function TopicDescription({ topic }) {
  if (topic.descriptionBefore != null && topic.descriptionLink != null) {
    return (
      <p className="ux-case-study__section-text ux-case-study__section-text--center">
        {topic.descriptionBefore}
        {topic.descriptionLink}
        {topic.descriptionAfter}
      </p>
    )
  }

  return (
    <p className="ux-case-study__section-text ux-case-study__section-text--center">
      {topic.description}
    </p>
  )
}

export default function DigitalCphfw({ onNavigate }) {
  const { dict, t } = useI18n()
  const meta = dict.digitalCphfw.meta

  return (
    <div className="screen ux-case-study yoga">
      <main className="ux-case-study__content">
        <SiteNav
          activeId="works"
          onNavigate={onNavigate}
          trail={[
            { label: t('digitalSolutions.navCrumb'), to: 'digital-solutions' },
            { label: t('digitalCphfw.navCrumb') },
          ]}
        />

        <section
          className="ux-case-study__intro"
          aria-label={t('digitalCphfw.title')}
        >
          <h1 className="ux-case-study__title">{t('digitalCphfw.title')}</h1>
          <p className="ux-case-study__lede">{t('digitalCphfw.description')}</p>
          <ProjectCtas t={t} />
        </section>

        <div className="ux-case-study__body">
          <div className="ux-case-study__split">
            <dl
              className="ux-case-study__meta"
              aria-label={t('digitalCphfw.metaAria')}
            >
              {META_KEYS.map((key) => (
                <div key={key} className="ux-case-study__meta-row">
                  <dt className="ux-case-study__meta-label">
                    {t(`digitalCphfw.metaLabels.${key}`)}
                  </dt>
                  <dd className="ux-case-study__meta-value">{meta[key]}</dd>
                </div>
              ))}
            </dl>
          </div>

          <section
            className="ux-case-study__section"
            aria-labelledby="digital-cphfw-problem-statement"
          >
            <AnimatedTitle
              id="digital-cphfw-problem-statement"
              className="ux-case-study__subtitle"
            >
              {t('digitalCphfw.problemStatement')}
            </AnimatedTitle>
            <div className="ux-case-study__quote">
              <span className="ux-case-study__quote-mark" aria-hidden="true">
                “
              </span>
              <p className="ux-case-study__section-text ux-case-study__section-text--center">
                {t('digitalCphfw.problemDescription')}
              </p>
            </div>
          </section>

          <section
            className="ux-case-study__section"
            aria-labelledby="digital-cphfw-research-summary"
          >
            <AnimatedTitle
              id="digital-cphfw-research-summary"
              className="ux-case-study__subtitle"
            >
              {t('digitalCphfw.researchSummaryTitle')}
            </AnimatedTitle>
            <div className="ux-case-study__findings">
              <p className="ux-case-study__section-text ux-case-study__section-text--center">
                {dict.digitalCphfw.researchIssuesLabel}
              </p>
              <ol className="ux-case-study__findings-list">
                {dict.digitalCphfw.researchIssues.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              <p className="ux-case-study__section-text ux-case-study__section-text--center">
                {dict.digitalCphfw.researchConclusionsLabel}
              </p>
              <ol className="ux-case-study__findings-list">
                {dict.digitalCphfw.researchConclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>
          </section>

          <div className="ux-case-study__topic-list">
            {dict.digitalCphfw.topics.map((topic) => {
              const Chart = topic.imageKey
                ? TOPIC_CHARTS[topic.imageKey]
                : null
              const showEndCtas = topic.title === 'Results'

              return (
                <section
                  key={topic.title}
                  className="ux-case-study__section"
                  aria-label={topic.title}
                >
                  <AnimatedTitle className="ux-case-study__subtitle">
                    {topic.title}
                  </AnimatedTitle>
                  <TopicDescription topic={topic} />
                  {Chart ? (
                    <figure
                      className="ux-case-study__figure ux-case-study__figure--sm yoga-chart"
                      aria-label={topic.imageAlt}
                    >
                      <Chart />
                    </figure>
                  ) : null}
                  {showEndCtas ? <ProjectCtas t={t} /> : null}
                </section>
              )
            })}
          </div>
        </div>

        <UxCrossPromote
          onNavigate={onNavigate}
          route="digital-yoga"
          cover={DIGITAL_YOGA_COVER}
          title={t('digitalSolutions.mosaics.projectTwo.title')}
        />

        <Footer className="footer--in-flow" />
      </main>
    </div>
  )
}
