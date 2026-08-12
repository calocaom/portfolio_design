import { YOGA_CONVENTIONS, YOGA_PERSONA_PHOTO } from '../assets'
import { YOGA_AFFINITY_CLUSTERS } from '../data/yogaAffinity'
import { YOGA_HMW_CHART } from '../data/yogaCharts'
import { YOGA_PERSONA_DATA } from '../data/yogaPersona'
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
