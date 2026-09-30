import Icon, { type IconName } from '../components/Icon'
import Star from '../components/Star'
import { SITE, whatsappLink } from '../data/site'
import type { Dict } from '../i18n'

const IDEAL_ICONS: IconName[] = [
  'snowflake', 'droplet', 'bolt', 'building', 'shirt', 'scissors', 'smartphone', 'car', 'home', 'rocket',
]

/** The flag's serrated edge, used as the tear line between the price stub and the details. */
function TicketEdge() {
  const teeth = 9
  const step = 900 / teeth
  let vertical = 'M100 0 H40'
  let horizontal = 'M0 100 V40'
  for (let i = 0; i < teeth; i++) {
    vertical += ` L0 ${step * i + step / 2} L40 ${step * (i + 1)}`
    horizontal += ` L${step * i + step / 2} 0 L${step * (i + 1)} 40`
  }
  vertical += ' H100 Z'
  horizontal += ' V100 Z'
  return (
    <>
      <svg className="offer-edge-v" viewBox="0 0 100 900" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d={vertical} fill="#fff" />
      </svg>
      <svg className="offer-edge-h" viewBox="0 0 900 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d={horizontal} fill="#fff" />
      </svg>
    </>
  )
}

export default function Offer({ t }: { t: Dict }) {
  const o = t.offer
  return (
    <section id="offer" className="section offer-section" aria-labelledby="offer-title">
      <div className="container">
        <p className="offer-vision"><Star size={14} />{o.vision}</p>
        <h2 id="offer-title">{o.title}</h2>
        <p className="offer-intro">{o.intro}</p>

        <div className="offer-card">
          <div className="offer-price">
            <p className="offer-amount-row" dir="ltr">
              <span className="offer-currency">{o.currency}</span>
              <span className="offer-amount">{o.amount}</span>
            </p>
            <p className="offer-period">{o.period}</p>
            <p className="offer-allin"><Icon name="check" size={16} />{o.allIn}</p>
            <TicketEdge />
          </div>

          <div className="offer-details">
            <h3>{o.includesTitle}</h3>
            <ul className="offer-includes">
              {o.includes.map((item, index) => (
                <li key={item.title}>
                  <span className="offer-tick"><Icon name="check" size={18} /></span>
                  <strong>{item.title}</strong>
                  <span className="offer-sub">
                    {item.text}
                    {index === 0 && (
                      <>
                        {' '}
                        <bdi dir="ltr" className="offer-domain">{SITE.subdomainExample}</bdi>
                      </>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            <a className="btn btn-wa btn-lg" href={whatsappLink(o.waMessage)} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={22} />
              {o.cta}
            </a>
            <p className="offer-small">{o.renewal}</p>
            <p className="offer-small">{o.small}</p>
          </div>
        </div>

        <div className="offer-ideal">
          <h3>{o.idealTitle}</h3>
          <ul className="ideal-list">
            {o.ideal.map((label, index) => (
              <li key={label}>
                <Icon name={IDEAL_ICONS[index]} size={22} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}