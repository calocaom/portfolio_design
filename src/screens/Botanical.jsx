import { useLayoutEffect, useRef } from 'react'
import './UxCaseStudy.css'
import './Botanical.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import AnimatedTitle from '../components/AnimatedTitle'
import {
  BOTANICAL_PERSONA_PHOTO,
  BOTANICAL_PERSONA_SCENE,
} from '../assets'
import { AFFINITY_CLUSTERS } from '../data/botanicalAffinity'
import { BOTANICAL_PERSONA_DATA } from '../data/botanicalPersona'
import { useI18n } from '../i18n/I18nContext'
import { publicUrl } from '../utils/publicUrl'
import {
  OouxChart,
  PrinciplesChart,
  PurposeChart,
  ResearchChart,
  StorytellingChart,
} from './BotanicalCharts'

const META_KEYS = ['date', 'team', 'role', 'tools', 'methods', 'target', 'client']
const CHART_DESIGN_WIDTH = 832

const FIGMA_PROTOTYPE_URL =
  'https://www.figma.com/proto/gwtmdifB6wyNumSOFHYsLl/Botanical-Garden-DIGI-XP?node-id=323-2104&t=jD3DIhT7u1f6AWZF-0&scaling=min-zoom&content-scaling=fixed&page-id=113%3A73&starting-point-node-id=142%3A330&show-proto-sidebar=1'

const TOPIC_CHARTS = {
  storytelling: StorytellingChart,
  '4-key-dimensions': PurposeChart,
  ooux: OouxChart,
  principles: PrinciplesChart,
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
    <div ref={frameRef} className="botanical-chart-scale">
      <div ref={contentRef} className="botanical-chart-scale__content">
        {children}
      </div>
    </div>
  )
}

export default function Botanical({ onNavigate }) {
  const { dict, t } = useI18n()
  const meta = dict.botanical.meta

  return (
    <div className="screen ux-case-study botanical">
      <main className="ux-case-study__content">
        <SiteNav
          activeId="works"
          onNavigate={onNavigate}
          trail={[
            { label: t('uxUi.navCrumb'), to: 'ux-ui' },
            { label: t('botanical.navCrumb') },
          ]}
        />

        <section
          className="ux-case-study__intro"
          aria-label={t('botanical.title')}
        >
          <h1 className="ux-case-study__title">{t('botanical.title')}</h1>
          <p className="ux-case-study__lede">{t('botanical.description')}</p>
          <a
            className="ux-case-study__cta"
            href={FIGMA_PROTOTYPE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('botanical.figmaCta')}
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
                src={publicUrl('videos/botanical.mp4')}
              >
                {t('botanical.videoFallback')}
              </video>
            </div>

            <dl className="ux-case-study__meta" aria-label={t('botanical.metaAria')}>
              {META_KEYS.map((key) => (
                <div key={key} className="ux-case-study__meta-row">
                  <dt className="ux-case-study__meta-label">
                    {t(`botanical.metaLabels.${key}`)}
                  </dt>
                  <dd className="ux-case-study__meta-value">{meta[key]}</dd>
                </div>
              ))}
            </dl>

            <p className="ux-case-study__video-legend">
              {t('botanical.videoLegend')}
            </p>
          </div>

          <section
            className="ux-case-study__section"
            aria-labelledby="botanical-problem-statement"
          >
            <AnimatedTitle
              id="botanical-problem-statement"
              className="ux-case-study__subtitle"
            >
              {t('botanical.problemStatement')}
            </AnimatedTitle>
            <div className="ux-case-study__quote">
              <span className="ux-case-study__quote-mark" aria-hidden="true">
                “
              </span>
              <p className="ux-case-study__section-text ux-case-study__section-text--center">
                {t('botanical.problemDescription')}
              </p>
            </div>
          </section>

          <section
            className="ux-case-study__section"
            aria-labelledby="botanical-research-results"
          >
            <AnimatedTitle
              id="botanical-research-results"
              className="ux-case-study__subtitle"
            >
              {t('botanical.researchResults')}
            </AnimatedTitle>
            <p className="ux-case-study__section-text ux-case-study__section-text--center">
              {t('botanical.researchDescription')}
            </p>
            <figure
              className="ux-case-study__figure ux-case-study__figure--sm botanical-chart"
              aria-label={t('botanical.researchImageAlt')}
            >
              <ResearchChart />
            </figure>
          </section>

          <section
            className="ux-case-study__section"
            aria-labelledby="botanical-affinity"
          >
            <AnimatedTitle
              id="botanical-affinity"
              className="ux-case-study__subtitle"
            >
              {t('botanical.affinityTitle')}
            </AnimatedTitle>
            <p className="ux-case-study__section-text ux-case-study__section-text--center">
              {t('botanical.affinityDescription')}
            </p>
            <figure
              className="ux-case-study__figure ux-case-study__figure--sm botanical-chart"
              aria-label={t('botanical.affinityImageAlt')}
            >
              <ScaleToFit>
                <div className="botanical-affinity">
                  <div className="botanical-affinity__board">
                    {AFFINITY_CLUSTERS.map((cluster) => (
                      <div
                        key={cluster.id}
                        className="botanical-affinity__cluster"
                      >
                        <div className="botanical-affinity__sticky botanical-affinity__sticky--header">
                          <p className="botanical-affinity__sticky-title">
                            {cluster.title}
                          </p>
                          {cluster.subtitle ? (
                            <p className="botanical-affinity__sticky-sub">
                              {cluster.subtitle}
                            </p>
                          ) : null}
                        </div>
                        <ul className="botanical-affinity__notes">
                          {cluster.notes.map((note) => (
                            <li
                              key={note}
                              className="botanical-affinity__sticky botanical-affinity__sticky--note"
                            >
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </ScaleToFit>
            </figure>
          </section>

          <section
            className="ux-case-study__section"
            aria-labelledby="botanical-persona"
          >
            <AnimatedTitle
              id="botanical-persona"
              className="ux-case-study__subtitle"
            >
              {t('botanical.personaTitle')}
            </AnimatedTitle>
            <p className="ux-case-study__section-text ux-case-study__section-text--center">
              {t('botanical.personaDescription')}
            </p>
            <figure
              className="ux-case-study__figure ux-case-study__figure--sm botanical-chart"
              aria-label={t('botanical.personaImageAlt')}
            >
              <ScaleToFit>
                <div className="botanical-persona">
                  <div className="botanical-persona__layout">
                    <div className="botanical-persona__intro">
                      <p className="botanical-persona__eyebrow">Persona</p>
                      <div className="botanical-persona__identity">
                        <img
                          src={BOTANICAL_PERSONA_PHOTO}
                          alt=""
                          className="botanical-persona__photo"
                        />
                        <dl className="botanical-persona__details">
                          {BOTANICAL_PERSONA_DATA.details.map((item) => (
                            <div
                              key={item.label}
                              className="botanical-persona__detail"
                            >
                              <dt>{item.label}:</dt>
                              <dd>{item.value}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                      <h3 className="botanical-persona__name">
                        {BOTANICAL_PERSONA_DATA.name}
                      </h3>
                      <blockquote className="botanical-persona__quote">
                        <p>“{BOTANICAL_PERSONA_DATA.quote}”</p>
                      </blockquote>
                      <p className="botanical-persona__summary">
                        {BOTANICAL_PERSONA_DATA.summary}
                      </p>
                    </div>

                    <div className="botanical-persona__panels">
                      {BOTANICAL_PERSONA_DATA.panels.map((panel) => (
                        <section
                          key={panel.id}
                          className="botanical-persona__panel"
                          aria-label={panel.title}
                        >
                          <h4 className="botanical-persona__panel-title">
                            {panel.title}
                          </h4>
                          <ul className="botanical-persona__panel-list">
                            {panel.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </section>
                      ))}
                    </div>

                    <img
                      src={BOTANICAL_PERSONA_SCENE}
                      alt=""
                      className="botanical-persona__scene"
                    />
                  </div>
                </div>
              </ScaleToFit>
            </figure>
          </section>

          <div className="ux-case-study__topic-list">
            {dict.botanical.topics.map((topic) => {
              const Chart = topic.imageKey
                ? TOPIC_CHARTS[topic.imageKey]
                : null
              const showPrototypeCta = topic.title === 'Results'

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
                      className="ux-case-study__figure ux-case-study__figure--sm botanical-chart"
                      aria-label={topic.imageAlt}
                    >
                      <ScaleToFit>
                        <Chart />
                      </ScaleToFit>
                    </figure>
                  ) : null}
                  {showPrototypeCta ? (
                    <a
                      className="ux-case-study__cta"
                      href={FIGMA_PROTOTYPE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('botanical.figmaCta')}
                    </a>
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
