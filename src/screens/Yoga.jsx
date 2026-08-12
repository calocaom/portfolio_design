import { useLayoutEffect, useRef } from 'react'
import './UxCaseStudy.css'
import './Yoga.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import { useI18n } from '../i18n/I18nContext'
import { publicUrl } from '../utils/publicUrl'
import {
  AffinityChart,
  ConventionsChart,
  HmwChart,
  PersonaChart,
  ValuesChart,
} from './YogaCharts'

const META_KEYS = ['date', 'team', 'tools', 'methods', 'target', 'client']
const CHART_DESIGN_WIDTH = 832
const AFFINITY_DESIGN_WIDTH = 1100

/* Replace with the live Figma prototype URL when ready */
const FIGMA_PROTOTYPE_URL = 'https://www.figma.com/'

const TOPIC_CHARTS = {
  hmw: HmwChart,
  values: ValuesChart,
  conventions: ConventionsChart,
}

function ScaleToFit({ children, designWidth = CHART_DESIGN_WIDTH }) {
  const frameRef = useRef(null)
  const contentRef = useRef(null)

  useLayoutEffect(() => {
    const frame = frameRef.current
    const content = contentRef.current
    if (!frame || !content) return undefined

    function update() {
      const available = frame.clientWidth
      if (!available) return

      const scale = Math.min(1, available / designWidth)
      content.style.width = `${designWidth}px`
      content.style.transform = `scale(${scale})`
      content.style.transformOrigin = 'top left'
      frame.style.height = `${content.offsetHeight * scale}px`
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(frame)
    observer.observe(content)
    window.addEventListener('resize', update)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [designWidth])

  return (
    <div ref={frameRef} className="yoga-chart-scale">
      <div ref={contentRef} className="yoga-chart-scale__content">
        {children}
      </div>
    </div>
  )
}

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
          <div className="ux-case-study__split">
            <div className="ux-case-study__video-frame">
              <video
                className="ux-case-study__video"
                controls
                playsInline
                preload="metadata"
                src={publicUrl('videos/yoga.mp4')}
              >
                {t('yoga.videoFallback')}
              </video>
            </div>

            <p className="ux-case-study__video-legend">
              {t('yoga.videoLegend')}
            </p>

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
          </div>

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
            <figure
              className="ux-case-study__figure ux-case-study__figure--sm yoga-chart"
              aria-label={t('yoga.affinityImageAlt')}
            >
              <ScaleToFit designWidth={AFFINITY_DESIGN_WIDTH}>
                <AffinityChart />
              </ScaleToFit>
            </figure>
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
            <figure
              className="ux-case-study__figure ux-case-study__figure--sm yoga-chart"
              aria-label={t('yoga.personaImageAlt')}
            >
              <ScaleToFit>
                <PersonaChart />
              </ScaleToFit>
            </figure>
          </section>

          <div className="ux-case-study__topic-list">
            {dict.yoga.topics.map((topic) => {
              const Chart = topic.imageKey
                ? TOPIC_CHARTS[topic.imageKey]
                : null

              return (
                <section
                  key={topic.title}
                  className="ux-case-study__section"
                  aria-label={topic.title}
                >
                  <h2 className="ux-case-study__subtitle">{topic.title}</h2>
                  <p className="ux-case-study__section-text ux-case-study__section-text--center">
                    {topic.description}
                  </p>
                  {Chart ? (
                    <figure
                      className="ux-case-study__figure ux-case-study__figure--sm yoga-chart"
                      aria-label={topic.imageAlt}
                    >
                      {topic.imageKey === 'conventions' ? (
                        <Chart />
                      ) : (
                        <ScaleToFit>
                          <Chart />
                        </ScaleToFit>
                      )}
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
