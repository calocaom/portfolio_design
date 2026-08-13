import './UxCaseStudy.css'
import './Yoga.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import AnimatedTitle from '../components/AnimatedTitle'
import { useI18n } from '../i18n/I18nContext'
import { publicUrl } from '../utils/publicUrl'
import { UxWritingChart } from './YogaCharts'

const META_KEYS = ['date', 'team', 'tools', 'methods', 'target', 'client']

const TOPIC_CHARTS = {
  'ux-writing': UxWritingChart,
}

/* Same prototype as the UX/UI Yoga case study until a Digital Solutions link is set */
const FIGMA_PROTOTYPE_URL =
  'https://www.figma.com/proto/EiIQiXYFnZOnF26AiyeLt0/Yoga-exam-project?node-id=125-215&t=IwUGC8agC7ZJBZNg-0&scaling=scale-down-width&content-scaling=fixed&page-id=125%3A214&starting-point-node-id=135%3A557&show-proto-sidebar=1'

export default function DigitalYoga({ onNavigate }) {
  const { dict, t } = useI18n()
  const meta = dict.digitalYoga.meta

  return (
    <div className="screen ux-case-study yoga">
      <main className="ux-case-study__content">
        <SiteNav
          activeId="works"
          onNavigate={onNavigate}
          trail={[
            { label: t('digitalSolutions.navCrumb'), to: 'digital-solutions' },
            { label: t('digitalYoga.navCrumb') },
          ]}
        />

        <section
          className="ux-case-study__intro"
          aria-label={t('digitalYoga.title')}
        >
          <h1 className="ux-case-study__title">{t('digitalYoga.title')}</h1>
          <p className="ux-case-study__lede">{t('digitalYoga.description')}</p>
          <a
            className="ux-case-study__cta"
            href={FIGMA_PROTOTYPE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('digitalYoga.figmaCta')}
          </a>
        </section>

        <div className="ux-case-study__body">
          <div className="ux-case-study__split">
            <div className="ux-case-study__video-frame">
              <video
                className="ux-case-study__video"
                controls
                playsInline
                preload="metadata"
                src={publicUrl('videos/yoga.mp4')}
              >
                {t('digitalYoga.videoFallback')}
              </video>
            </div>

            <p className="ux-case-study__video-legend">
              {t('digitalYoga.videoLegend')}
            </p>

            <dl
              className="ux-case-study__meta"
              aria-label={t('digitalYoga.metaAria')}
            >
              {META_KEYS.map((key) => (
                <div key={key} className="ux-case-study__meta-row">
                  <dt className="ux-case-study__meta-label">
                    {t(`digitalYoga.metaLabels.${key}`)}
                  </dt>
                  <dd className="ux-case-study__meta-value">{meta[key]}</dd>
                </div>
              ))}
            </dl>
          </div>

          <section
            className="ux-case-study__section"
            aria-labelledby="digital-yoga-problem-statement"
          >
            <AnimatedTitle
              id="digital-yoga-problem-statement"
              className="ux-case-study__subtitle"
            >
              {t('digitalYoga.problemStatement')}
            </AnimatedTitle>
            <div className="ux-case-study__quote">
              <span className="ux-case-study__quote-mark" aria-hidden="true">
                “
              </span>
              <p className="ux-case-study__section-text ux-case-study__section-text--center">
                {t('digitalYoga.problemDescription')}
              </p>
            </div>
          </section>

          <div className="ux-case-study__topic-list">
            {dict.digitalYoga.topics.map((topic) => {
              const Chart = topic.imageKey
                ? TOPIC_CHARTS[topic.imageKey]
                : null

              return (
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
                  {Chart ? (
                    <figure
                      className="ux-case-study__figure ux-case-study__figure--sm yoga-chart"
                      aria-label={topic.imageAlt}
                    >
                      <Chart />
                    </figure>
                  ) : null}
                </section>
              )
            })}
          </div>
        </div>

        <Footer className="footer--in-flow" />
      </main>
    </div>
  )
}
