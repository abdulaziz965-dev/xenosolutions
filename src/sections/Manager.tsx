import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import type { Dict } from '../i18n'

export default function Manager({ t }: { t: Dict }) {
  const m = t.manager
  return (
    <section className="section section-pearl" aria-labelledby="manager-title">
      <div className="container manager">
        <div className="manager-photo-wrap">
          <img className="manager-photo" src="/gm.jpg" alt={m.name} width="420" height="420" loading="lazy" />
        </div>
        <div>
          <h2 id="manager-title">{m.title}</h2>
          <blockquote>
            <p>{m.quote}</p>
          </blockquote>
          <p className="manager-name">
            <strong>{m.name}</strong>
            <span>{m.role}</span>
          </p>
          <ul className="manager-facts">
            {m.facts.map((fact) => (
              <li key={fact}><Icon name="check" size={18} />{fact}</li>
            ))}
          </ul>
          <Link className="btn btn-ghost" to="/gm-message">{m.read}</Link>
        </div>
      </div>
    </section>
  )
}