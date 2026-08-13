import { useEffect, useLayoutEffect, useRef } from 'react'
import './UxCaseStudy.css'
import './Yoga.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import AnimatedTitle from '../components/AnimatedTitle'
import UxCrossPromote from '../components/UxCrossPromote'
import { BOTANICAL_COVER } from '../assets'
import { useI18n } from '../i18n/I18nContext'
import { publicUrl } from '../utils/publicUrl'
import {
  AffinityChart,
  ConventionsChart,
  HmwChart,
  OouxChart,
  PersonaChart,
  RequirementsChart,
  ResearchChart,
  UxWritingChart,
  ValuesChart,
} from './YogaCharts'

const META_KEYS = ['date', 'team', 'tools', 'methods', 'target', 'client']
const CHART_DESIGN_WIDTH = 832
const AFFINITY_DESIGN_WIDTH = 1100
const REQUIREMENTS_DESIGN_WIDTH = 1100

/* Replace with the live Figma prototype URL when ready */
const FIGMA_PROTOTYPE_URL =
  'https://www.figma.com/proto/EiIQiXYFnZOnF26AiyeLt0/Yoga-exam-project?node-id=125-215&t=IwUGC8agC7ZJBZNg-0&scaling=scale-down-width&content-scaling=fixed&page-id=125%3A214&starting-point-node-id=135%3A557&show-proto-sidebar=1'

const TOPIC_CHARTS = {
  'ux-writing': UxWritingChart,
  hmw: HmwChart,
  values: ValuesChart,
  ooux: OouxChart,
  requirements: RequirementsChart,
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

  useEffect(() => {
    const raw = window.location.hash.replace(/^#\/?/, '')
    const section = raw.split('/')[1]
    if (!section) return undefined

    const timer = window.setTimeout(() => {
      document
        .getElementById(`yoga-topic-${section}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)

    return () => window.clearTimeout(timer)
  }, [])

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
            <AnimatedTitle
              id="yoga-problem-statement"
              className="ux-case-study__subtitle"
            >
              {t('yoga.problemStatement')}
            </AnimatedTitle>
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
            <AnimatedTitle
              id="yoga-research-results"
              className="ux-case-study__subtitle"
            >
              {t('yoga.researchResults')}
            </AnimatedTitle>
            <p className="ux-case-study__section-text ux-case-study__section-text--center">
              {t('yoga.researchDescription')}
            </p>
            <figure
              className="ux-case-study__figure ux-case-study__figure--sm yoga-chart"
              aria-label={t('yoga.researchImageAlt')}
            >
              <ScaleToFit>
                <ResearchChart />
              </ScaleToFit>
            </figure>
          </section>

          <section
            className="ux-case-study__section"
            aria-labelledby="yoga-affinity"
          >
            <AnimatedTitle id="yoga-affinity" className="ux-case-study__subtitle">
              {t('yoga.affinityTitle')}
            </AnimatedTitle>
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
            <AnimatedTitle id="yoga-persona" className="ux-case-study__subtitle">
              {t('yoga.personaTitle')}
            </AnimatedTitle>
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
              const showPrototypeCta = topic.title === 'Results'

              return (
                <section
                  key={topic.title}
                  id={topic.imageKey ? `yoga-topic-${topic.imageKey}` : undefined}
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
                      {topic.imageKey === 'conventions' ||
                      topic.imageKey === 'ux-writing' ? (
                        <Chart />
                      ) : (
                        <ScaleToFit
                          designWidth={
                            topic.imageKey === 'requirements'
                              ? REQUIREMENTS_DESIGN_WIDTH
                              : CHART_DESIGN_WIDTH
                          }
                        >
                          <Chart />
                        </ScaleToFit>
                      )}
                    </figure>
                  ) : null}
                  {showPrototypeCta ? (
                    <a
                      className="ux-case-study__cta"
                      href={FIGMA_PROTOTYPE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('yoga.figmaCta')}
                    </a>
                  ) : null}
                </section>
              )
            })}
          </div>
        </div>

        <UxCrossPromote
          onNavigate={onNavigate}
          route="botanical"
          cover={BOTANICAL_COVER}
          title={t('uxUi.mosaics.projectOne.title')}
        />

        <Footer className="footer--in-flow" />
      </main>
    </div>
  )
}
