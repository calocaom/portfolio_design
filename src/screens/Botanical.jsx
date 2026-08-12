import './UxCaseStudy.css'
import './Botanical.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import {
  BOTANICAL_OOUX,
  BOTANICAL_PERSONA,
  BOTANICAL_PRINCIPLES,
  BOTANICAL_PURPOSE,
  BOTANICAL_RESEARCH,
  BOTANICAL_RESULTS,
  BOTANICAL_STORYTELLING,
} from '../assets'
import {
  AFFINITY_CLUSTERS,
  AFFINITY_PERSONAS,
} from '../data/botanicalAffinity'
import { useI18n } from '../i18n/I18nContext'
import { publicUrl } from '../utils/publicUrl'

const META_KEYS = ['date', 'team', 'tools', 'methods', 'target', 'client']

const FIGMA_PROTOTYPE_URL =
  'https://www.figma.com/proto/gwtmdifB6wyNumSOFHYsLl/Botanical-Garden-DIGI-XP?node-id=323-2104&t=jD3DIhT7u1f6AWZF-0&scaling=min-zoom&content-scaling=fixed&page-id=113%3A73&starting-point-node-id=142%3A330&show-proto-sidebar=1'

const TOPIC_IMAGES = {
  storytelling: BOTANICAL_STORYTELLING,
  '4-key-dimensions': BOTANICAL_PURPOSE,
  ooux: BOTANICAL_OOUX,
  principles: BOTANICAL_PRINCIPLES,
  results: BOTANICAL_RESULTS,
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
            <h2
              id="botanical-problem-statement"
              className="ux-case-study__subtitle"
            >
              {t('botanical.problemStatement')}
            </h2>
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
            <h2
              id="botanical-research-results"
              className="ux-case-study__subtitle"
            >
              {t('botanical.researchResults')}
            </h2>
            <p className="ux-case-study__section-text ux-case-study__section-text--center">
              {t('botanical.researchDescription')}
            </p>
            <figure className="ux-case-study__figure ux-case-study__figure--sm">
              <img
                src={BOTANICAL_RESEARCH}
                alt={t('botanical.researchImageAlt')}
                className="ux-case-study__figure-image"
              />
            </figure>
          </section>

          <section
            className="ux-case-study__section"
            aria-labelledby="botanical-affinity"
          >
            <h2 id="botanical-affinity" className="ux-case-study__subtitle">
              {t('botanical.affinityTitle')}
            </h2>
            <p className="ux-case-study__section-text ux-case-study__section-text--center">
              {t('botanical.affinityDescription')}
            </p>
            <figure
              className="ux-case-study__figure ux-case-study__figure--sm botanical-affinity"
              aria-label={t('botanical.affinityImageAlt')}
            >
              <div className="botanical-affinity__personas" aria-hidden="true">
                {AFFINITY_PERSONAS.map((persona) => (
                  <p key={persona} className="botanical-affinity__persona">
                    {persona}
                  </p>
                ))}
              </div>
              <div className="botanical-affinity__board">
                {AFFINITY_CLUSTERS.map((cluster) => (
                  <div
                    key={cluster.id}
                    className={`botanical-affinity__cluster botanical-affinity__cluster--${cluster.id}`}
                  >
                    <div className="botanical-affinity__header">
                      <p className="botanical-affinity__header-title">
                        {cluster.title}
                      </p>
                      {cluster.subtitle ? (
                        <p className="botanical-affinity__header-sub">
                          {cluster.subtitle}
                        </p>
                      ) : null}
                    </div>
                    <ul className="botanical-affinity__notes">
                      {cluster.notes.map((note) => (
                        <li key={note} className="botanical-affinity__note">
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </figure>
          </section>

          <section
            className="ux-case-study__section"
            aria-labelledby="botanical-persona"
          >
            <h2 id="botanical-persona" className="ux-case-study__subtitle">
              {t('botanical.personaTitle')}
            </h2>
            <p className="ux-case-study__section-text ux-case-study__section-text--center">
              {t('botanical.personaDescription')}
            </p>
            <figure className="ux-case-study__figure ux-case-study__figure--sm">
              <img
                src={BOTANICAL_PERSONA}
                alt={t('botanical.personaImageAlt')}
                className="ux-case-study__figure-image"
              />
            </figure>
          </section>

          <div className="ux-case-study__topic-list">
            {dict.botanical.topics.map((topic) => {
              const image = topic.imageKey
                ? TOPIC_IMAGES[topic.imageKey]
                : null
              const showPrototypeCta = topic.imageKey === 'results'

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
                  {image ? (
                    <figure className="ux-case-study__figure ux-case-study__figure--sm">
                      <img
                        src={image}
                        alt={topic.imageAlt}
                        className="ux-case-study__figure-image"
                      />
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
