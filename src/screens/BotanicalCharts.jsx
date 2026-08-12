import { BOTANICAL_BUTTERFLY, BOTANICAL_SCIENTIST } from '../assets'
import {
  OOUX_CHART,
  PRINCIPLES_CHART,
  PURPOSE_CHART,
  RESEARCH_CHART,
  STORYTELLING_CHART,
} from '../data/botanicalCharts'

function ChartIcon({ type }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (type) {
    case 'walk':
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="2" />
          <path d="M10 22l2-7 2 2 3 5" />
          <path d="M8 10l4 2 3-4" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...common}>
          <rect x="7" y="3" width="10" height="18" rx="2" />
          <path d="M4 6l16 12" />
        </svg>
      )
    case 'trees':
      return (
        <svg {...common}>
          <path d="M12 22v-6" />
          <path d="M8 16l4-8 4 8H8z" />
          <path d="M5 20l3-6h2" />
          <path d="M19 20l-3-6h-2" />
        </svg>
      )
    case 'heart':
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />
        </svg>
      )
    case 'people':
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="2.2" />
          <circle cx="15" cy="8" r="2.2" />
          <path d="M4.5 18c.8-2.4 2.6-3.5 4.5-3.5S12.7 15.6 13.5 18" />
          <path d="M10.5 18c.8-2.4 2.6-3.5 4.5-3.5s3.7 1.1 4.5 3.5" />
        </svg>
      )
    case 'audio':
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 0 1 16 0" />
          <path d="M8 12v3a2 2 0 0 0 2 2h1" />
          <path d="M16 12v3a2 2 0 0 1-2 2h-1" />
        </svg>
      )
    case 'leaf':
      return (
        <svg {...common}>
          <path d="M5 19c8 0 14-6 14-14-8 0-14 6-14 14z" />
          <path d="M5 19c3-3 7-5 12-6" />
        </svg>
      )
    case 'plant':
      return (
        <svg {...common}>
          <path d="M12 14v7" />
          <path d="M8 21h8" />
          <path d="M12 14c-4-1-6-5-5-9 4 1 6 5 5 9z" />
          <path d="M12 14c4-1 6-5 5-9-4 1-6 5-5 9z" />
        </svg>
      )
    case 'info':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6" />
          <circle cx="12" cy="7" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      )
    default:
      return null
  }
}

function InsightList({ items }) {
  return (
    <ul className="bot-research__list">
      {items.map((item) => (
        <li key={item.text}>
          <span className="bot-research__icon">
            <ChartIcon type={item.icon} />
          </span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  )
}

export function ResearchChart() {
  const data = RESEARCH_CHART

  return (
    <div className="bot-research">
      <div className="bot-research__heads">
        <h3>{data.titleLeft}</h3>
        <h3>{data.titleRight}</h3>
      </div>
      <div className="bot-research__body">
        <div className="bot-research__venn" aria-hidden="false">
          <div className="bot-research__circle bot-research__circle--left">
            <p className="bot-research__circle-title">{data.explorers.title}</p>
            <InsightList items={data.explorers.items} />
          </div>
          <div className="bot-research__circle bot-research__circle--right">
            <p className="bot-research__circle-title bot-research__circle-title--accent">
              {data.learners.title}
            </p>
            <InsightList items={data.learners.items} />
          </div>
          <div className="bot-research__overlap">
            <InsightList items={data.shared.items} />
          </div>
        </div>
        <div className="bot-research__arrow" aria-hidden="true" />
        <ul className="bot-research__goals">
          {data.goals.map((goal) => (
            <li key={goal.text + (goal.emph || '')}>
              {goal.text}
              {goal.emph ? <strong>{goal.emph}</strong> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
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
