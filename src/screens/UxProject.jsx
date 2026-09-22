import './UxCaseStudy.css'
import './Yoga.css'
import SiteNav from '../components/SiteNav'
import Footer from '../components/Footer'
import AnimatedTitle from '../components/AnimatedTitle'
import UxCrossPromote from '../components/UxCrossPromote'
import { DIGITAL_CPHFW_COVER } from '../assets'
import { useI18n } from '../i18n/I18nContext'

const META_KEYS = ['date', 'team', 'tools', 'methods', 'target', 'client']
const FIGMA_PROTOTYPE_URL =
  'https://www.figma.com/design/72KpB53cGOVd8RvmTbNsO1/Bla--Sol---Exam-project?m=auto&t=Z9K5tmv6CGfBUkmQ-1'
const CODED_SOLUTION_URL = 'https://barbaraborini.github.io/Exam-Project-BlaSol/'

export default function UxProject({ onNavigate }) {
  const { dict, t } = useI18n()
  const meta = dict.uxProject.meta
  const description = t('uxProject.description')
  const topicTitles = (dict.digitalCphfw?.topics ?? []).map((topic) => topic.title)

  return (
    <div className="screen ux-case-study yoga">
      <main className="ux-case-study__content">
        <SiteNav
          activeId="works"
          onNavigate={onNavigate}
          trail={[
            { label: t('digitalSolutions.navCrumb'), to: 'digital-solutions' },
            { label: t('uxProject.navCrumb') },
          ]}
        />

        <section
          className="ux-case-study__intro"
          aria-label={t('uxProject.title')}
        >
          <h1 className="ux-case-study__title">{t('uxProject.title')}</h1>
          {description ? (
            <p className="ux-case-study__lede">{description}</p>
          ) : null}
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
            aria-labelledby="ux-project-problem-statement"
          >
            <AnimatedTitle
              id="ux-project-problem-statement"
              className="ux-case-study__subtitle"
            >
              {t('digitalCphfw.problemStatement')}
            </AnimatedTitle>
            <div className="ux-case-study__quote">
              <span className="ux-case-study__quote-mark" aria-hidden="true">
                “
              </span>
              <p className="ux-case-study__section-text ux-case-study__section-text--center">
                {t('uxProject.problemDescription')}
              </p>
            </div>
          </section>

          <section
            className="ux-case-study__section"
            aria-labelledby="ux-project-research-summary"
          >
            <AnimatedTitle
              id="ux-project-research-summary"
              className="ux-case-study__subtitle"
            >
              {t('digitalCphfw.researchSummaryTitle')}
            </AnimatedTitle>
            <div className="ux-case-study__findings">
              {(dict.uxProject.researchSummary ?? []).map((paragraph) => (
                <p
                  key={paragraph}
                  className="ux-case-study__section-text ux-case-study__section-text--center"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <div className="ux-case-study__topic-list">
            {topicTitles.map((title) => (
              <section
                key={title}
                className="ux-case-study__section"
                aria-label={title}
              >
                <AnimatedTitle className="ux-case-study__subtitle">
                  {title}
                </AnimatedTitle>
              </section>
            ))}
          </div>
        </div>

        <UxCrossPromote
          onNavigate={onNavigate}
          route="digital-cphfw"
          cover={DIGITAL_CPHFW_COVER}
          title={t('digitalSolutions.mosaics.projectOne.title')}
          coverPosition="left-top"
        />

        <Footer className="footer--in-flow" />
      </main>
    </div>
  )
}
