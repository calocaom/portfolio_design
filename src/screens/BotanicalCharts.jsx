import { BOTANICAL_BUTTERFLY, BOTANICAL_RESEARCH, BOTANICAL_SCIENTIST } from '../assets'
import {
  OOUX_CHART,
  PRINCIPLES_CHART,
  PURPOSE_CHART,
  STORYTELLING_CHART,
} from '../data/botanicalCharts'

export function ResearchChart() {
  return (
    <img
      src={BOTANICAL_RESEARCH}
      alt=""
      className="bot-research-img"
    />
  )
}

export function StorytellingChart() {
  const data = STORYTELLING_CHART

  return (
    <div className="bot-story">
      <h3 className="bot-story__title">{data.title}</h3>
      <div className="bot-story__layout">
        <div className="bot-story__left">
          <h4>{data.linearTitle}</h4>
          <ul>
            {data.linearItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <img
            src={BOTANICAL_BUTTERFLY}
            alt=""
            className="bot-story__butterfly"
          />
        </div>
        <div className="bot-story__right">
          <div className="bot-story__tone-card">
            <p className="bot-story__tone-card-title">{data.toneCardTitle}</p>
            <ul className="bot-story__scales">
              {data.toneScales.map((scale) => (
                <li key={`${scale.left}-${scale.right}`} className="bot-story__scale">
                  <span>{scale.left}</span>
                  <div className="bot-story__track">
                    <span
                      className="bot-story__marker"
                      style={{ left: `${scale.position}%` }}
                    >
                      <img src={BOTANICAL_BUTTERFLY} alt="" />
                    </span>
                  </div>
                  <span>{scale.right}</span>
                </li>
              ))}
            </ul>
          </div>
          <h4>{data.toneTitle}</h4>
          <ul>
            {data.toneItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function PurposeChart() {
  const data = PURPOSE_CHART

  return (
    <div className="bot-purpose">
      <h3 className="bot-purpose__title">{data.title}</h3>
      <div className="bot-purpose__grid">
        {data.dimensions.map((dim) => (
          <div key={dim.id} className={`bot-purpose__dim bot-purpose__dim--${dim.id}`}>
            <h4>{dim.title}</h4>
            <p>{dim.description}</p>
          </div>
        ))}
        <img
          src={BOTANICAL_SCIENTIST}
          alt=""
          className="bot-purpose__scientist"
        />
      </div>
      <p className="bot-purpose__caption">{data.caption}</p>
    </div>
  )
}

export function OouxChart() {
  const data = OOUX_CHART

  return (
    <div className="bot-ooux">
      <table className="bot-ooux__table">
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
                  {row.relationship.map((item) => (
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
  )
}

export function PrinciplesChart() {
  const data = PRINCIPLES_CHART

  return (
    <div className="bot-principles">
      <div className="bot-principles__left">
        <img
          src={BOTANICAL_BUTTERFLY}
          alt=""
          className="bot-principles__butterfly"
        />
        <p className="bot-principles__title">
          {data.title}
          <br />
          {data.subtitle}
        </p>
      </div>
      <ul className="bot-principles__right">
        {data.items.map((item) => (
          <li key={item.label}>
            <span className="bot-principles__label">→ {item.label}</span>
            <span className="bot-principles__text">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
