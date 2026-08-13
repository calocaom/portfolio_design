import {
  DIGITAL_CPHFW_HIFI_AFTER,
  DIGITAL_CPHFW_HIFI_BEFORE,
  DIGITAL_CPHFW_MOODBOARD,
  DIGITAL_CPHFW_SITEMAP,
  DIGITAL_CPHFW_STYLE_TILE,
  DIGITAL_CPHFW_WIREFRAMES_BRANDS,
  DIGITAL_CPHFW_WIREFRAMES_EVENTS,
  DIGITAL_CPHFW_UX_WRITING,
  DIGITAL_YOGA_CONTENT_CREATION,
  DIGITAL_YOGA_HIFI_TESTING,
  DIGITAL_YOGA_MOODBOARD,
  DIGITAL_YOGA_SITEMAP,
  DIGITAL_YOGA_STYLE_TILE,
  DIGITAL_YOGA_WIREFRAMES,
  YOGA_CONVENTIONS,
  YOGA_PERSONA_PHOTO,
  YOGA_UX_WRITING,
} from '../assets'
import { YOGA_AFFINITY_CLUSTERS } from '../data/yogaAffinity'
import { YOGA_HMW_CHART, YOGA_OOUX_CHART } from '../data/yogaCharts'
import { YOGA_MINDMAP } from '../data/yogaMindmap'
import { YOGA_PERSONA_DATA } from '../data/yogaPersona'
import { YOGA_REQUIREMENTS_CHART } from '../data/yogaRequirements'
import { YOGA_RESEARCH_CHART } from '../data/yogaResearch'
import { YOGA_VALUES_CHART } from '../data/yogaValues'

export function ValuesChart() {
  const data = YOGA_VALUES_CHART

  return (
    <div className="yoga-values">
      <div className="yoga-values__header">{data.title}</div>
      <div className="yoga-values__board">
        <table className="yoga-values__table">
          <tbody>
            {data.items.map((item) => (
              <tr key={item.label}>
                <th scope="row">{item.label}</th>
                <td>{item.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function ResearchChart() {
  const data = YOGA_RESEARCH_CHART

  return (
    <div className="yoga-research">
      <div className="yoga-research__header">{data.title}</div>
      <div className="yoga-research__board">
        <ol className="yoga-research__list">
          {data.items.map((item, index) => (
            <li key={item.text || item.lines?.[0]} className="yoga-research__row">
              <span className="yoga-research__num" aria-hidden="true">
                {index + 1}
              </span>
              <div className="yoga-research__body">
                {item.lines ? (
                  item.lines.map((line) => <p key={line}>{line}</p>)
                ) : (
                  <p>{item.text}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export function HmwChart() {
  const data = YOGA_HMW_CHART

  return (
    <div className="yoga-hmw">
      <div className="yoga-hmw__header">{data.title}</div>
      <div className="yoga-hmw__board">
        <table className="yoga-hmw__table">
          <thead>
            <tr>
              {data.columns.map((col) => (
                <th key={col}>
                  <span className="yoga-hmw__col-label">{col}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.question}>
                <td>{row.question}</td>
                <td>{row.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function OouxChart() {
  const data = YOGA_OOUX_CHART

  return (
    <div className="yoga-ooux">
      <div className="yoga-ooux__header">{data.title}</div>
      <div className="yoga-ooux__board">
        <table className="yoga-ooux__table">
          <thead>
            <tr>
              {data.headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.object}>
                <th scope="row">{row.object}</th>
                <td>
                  <ul>
                    {row.properties.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {row.relationships.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <ul>
                    {row.cta.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function AffinityChart() {
  return (
    <div className="yoga-affinity">
      <div className="yoga-affinity__header">Affinity Diagram</div>
      <div className="yoga-affinity__board">
        {YOGA_AFFINITY_CLUSTERS.map((cluster) => (
          <div key={cluster.id} className="yoga-affinity__cluster">
            <div className="yoga-affinity__sticky yoga-affinity__sticky--header">
              <p className="yoga-affinity__sticky-title">{cluster.title}</p>
            </div>
            <ul className="yoga-affinity__notes">
              {cluster.notes.map((note) => (
                <li
                  key={note}
                  className="yoga-affinity__sticky yoga-affinity__sticky--note"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PersonaChart() {
  const data = YOGA_PERSONA_DATA

  return (
    <div className="yoga-persona">
      <div className="yoga-persona__top">
        <div className="yoga-persona__identity">
          <img
            src={YOGA_PERSONA_PHOTO}
            alt=""
            className="yoga-persona__photo"
          />
          <div className="yoga-persona__intro">
            <h3 className="yoga-persona__name">{data.name}</h3>
            <p className="yoga-persona__subtitle">{data.subtitle}</p>
            <dl className="yoga-persona__details">
              {data.details.map((item) => (
                <div key={item.label} className="yoga-persona__detail">
                  <dt>{item.label}:</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="yoga-persona__scales">
              {data.scales.map((scale) => (
                <li key={scale.left} className="yoga-persona__scale">
                  <span>{scale.left}</span>
                  <span className="yoga-persona__scale-track">
                    <span
                      className="yoga-persona__scale-thumb"
                      style={{ left: `${scale.value * 100}%` }}
                    />
                  </span>
                  <span>{scale.right}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <blockquote className="yoga-persona__quote">
          <p>“{data.quote}”</p>
        </blockquote>
        <p className="yoga-persona__summary">{data.summary}</p>
      </div>

      <div className="yoga-persona__panels">
        {data.panels.map((panel) => (
          <section
            key={panel.id}
            className="yoga-persona__panel"
            aria-label={panel.title}
          >
            <h4 className="yoga-persona__panel-title">{panel.title}</h4>
            {panel.intro ? (
              <p className="yoga-persona__panel-intro">{panel.intro}</p>
            ) : null}
            {panel.subtitle ? (
              <p className="yoga-persona__panel-sub">{panel.subtitle}</p>
            ) : null}
            {panel.items ? (
              <ul className="yoga-persona__panel-list">
                {panel.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {panel.sections
              ? panel.sections.map((section) => (
                  <div key={section.subtitle}>
                    <p className="yoga-persona__panel-sub">{section.subtitle}</p>
                    <ul className="yoga-persona__panel-list">
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))
              : null}
          </section>
        ))}
      </div>
    </div>
  )
}

export function ConventionsChart() {
  return (
    <img
      src={YOGA_CONVENTIONS}
      alt=""
      className="yoga-conventions-img"
    />
  )
}

export function UxWritingChart() {
  return (
    <div className="yoga-ux-writing">
      <img
        src={YOGA_UX_WRITING}
        alt=""
        className="yoga-ux-writing__img"
      />
    </div>
  )
}

export function SiteMapChart() {
  return (
    <div className="yoga-portrait-chart">
      <img
        src={DIGITAL_YOGA_SITEMAP}
        alt=""
        className="yoga-portrait-chart__img"
      />
    </div>
  )
}

export function CphfwSiteMapChart() {
  return (
    <div className="yoga-portrait-chart">
      <img
        src={DIGITAL_CPHFW_SITEMAP}
        alt=""
        className="yoga-portrait-chart__img"
      />
    </div>
  )
}

export function CphfwMoodboardChart() {
  return (
    <div className="yoga-ux-writing">
      <img
        src={DIGITAL_CPHFW_MOODBOARD}
        alt=""
        className="yoga-ux-writing__img"
      />
    </div>
  )
}

export function CphfwStyleTileChart() {
  return (
    <div className="yoga-portrait-chart">
      <img
        src={DIGITAL_CPHFW_STYLE_TILE}
        alt=""
        className="yoga-portrait-chart__img"
      />
    </div>
  )
}

export function CphfwWireframesChart() {
  return (
    <div className="cphfw-wireframes">
      <img
        src={DIGITAL_CPHFW_WIREFRAMES_BRANDS}
        alt=""
        className="cphfw-wireframes__img"
      />
      <img
        src={DIGITAL_CPHFW_WIREFRAMES_EVENTS}
        alt=""
        className="cphfw-wireframes__img"
      />
    </div>
  )
}

export function CphfwUxWritingChart() {
  return (
    <div className="yoga-ux-writing">
      <img
        src={DIGITAL_CPHFW_UX_WRITING}
        alt=""
        className="yoga-ux-writing__img"
      />
    </div>
  )
}

export function CphfwHifiTestingChart() {
  return (
    <div className="cphfw-hifi" aria-hidden="true">
      <img
        src={DIGITAL_CPHFW_HIFI_BEFORE}
        alt=""
        className="cphfw-hifi__img"
      />
      <div className="cphfw-hifi__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 40" focusable="false">
          <path
            d="M12 4v28M6 26l6 8 6-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <img
        src={DIGITAL_CPHFW_HIFI_AFTER}
        alt=""
        className="cphfw-hifi__img"
      />
    </div>
  )
}

export function StyleTileChart() {
  return (
    <div className="yoga-portrait-chart">
      <img
        src={DIGITAL_YOGA_STYLE_TILE}
        alt=""
        className="yoga-portrait-chart__img"
      />
    </div>
  )
}

export function WireframesChart() {
  return (
    <div className="yoga-ux-writing">
      <img
        src={DIGITAL_YOGA_WIREFRAMES}
        alt=""
        className="yoga-ux-writing__img"
      />
    </div>
  )
}

export function ContentCreationChart() {
  return (
    <div className="yoga-ux-writing">
      <img
        src={DIGITAL_YOGA_CONTENT_CREATION}
        alt=""
        className="yoga-ux-writing__img"
      />
    </div>
  )
}

export function MoodboardChart() {
  return (
    <div className="yoga-portrait-chart">
      <img
        src={DIGITAL_YOGA_MOODBOARD}
        alt=""
        className="yoga-portrait-chart__img"
      />
    </div>
  )
}

export function HifiTestingChart() {
  return (
    <div className="yoga-portrait-chart">
      <img
        src={DIGITAL_YOGA_HIFI_TESTING}
        alt=""
        className="yoga-portrait-chart__img"
      />
    </div>
  )
}

function MindmapBranchArrow() {
  return (
    <svg
      className="yoga-mindmap__arrow"
      viewBox="0 0 72 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M4 60 H28 C40 60 44 20 58 20 H66"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M4 60 H28 C40 60 44 60 58 60 H66"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M4 60 H28 C40 60 44 100 58 100 H66"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path d="M62 16 L68 20 L62 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M62 56 L68 60 L62 64" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M62 96 L68 100 L62 104" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function MindmapChart() {
  const data = YOGA_MINDMAP

  return (
    <div className="yoga-mindmap">
      <div className="yoga-mindmap__columns">
        <p className="yoga-mindmap__col-title yoga-mindmap__col-title--left">
          {data.leftTitle}
        </p>
        <span className="yoga-mindmap__col-spacer" aria-hidden="true" />
        <p className="yoga-mindmap__col-title yoga-mindmap__col-title--right">
          {data.rightTitle}
        </p>
      </div>

      <ul className="yoga-mindmap__branches">
        {data.branches.map((branch) => (
          <li key={branch.concern} className="yoga-mindmap__branch">
            <div className="yoga-mindmap__concern">
              <p>{branch.concern}</p>
            </div>
            <MindmapBranchArrow />
            <ul className="yoga-mindmap__solutions">
              {branch.solutions.map((solution) => (
                <li key={solution}>{solution}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function RequirementsChart() {
  const data = YOGA_REQUIREMENTS_CHART

  return (
    <div className="yoga-requirements">
      <div className="yoga-requirements__header">{data.title}</div>
      <div className="yoga-requirements__board">
        {data.groups.map((group) => (
          <section
            key={group.id}
            className={`yoga-requirements__card${
              group.id === 'page-a' ? ' yoga-requirements__card--page-a' : ''
            }`}
          >
            <h3 className="yoga-requirements__card-title">{group.title}</h3>
            {group.subtitle ? (
              <p className="yoga-requirements__card-subtitle">{group.subtitle}</p>
            ) : null}
            <ul className="yoga-requirements__list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
