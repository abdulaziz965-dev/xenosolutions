import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Shell from '../components/Shell'
import Star from '../components/Star'
import { whatsappLink } from '../data/site'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { aboutPath, type LangContext } from '../i18n'

const SERVICE_ICONS = ['web', 'megaphone'] as const

/** About us: vision, mission and core values. Translated into every language (/about, /ar/about ...). */
export default function About({ ctx }: { ctx: LangContext }) {
  const { t } = ctx
  const a = t.about
  useDocumentMeta({ title: a.metaTitle, description: a.metaDescription })

  return (
    <Shell ctx={ctx} langPath={aboutPath}>
      <article className="container about">
        <Link className="back-link" to={ctx.home}>
          <Icon name="back" size={18} />
          {a.back}
        </Link>

        <header className="about-head">
          <h1>{a.title}</h1>
          <p>{a.lede}</p>
        </header>

        <section className="about-vision" aria-labelledby="about-vision-title">
          <h2 id="about-vision-title" className="about-label">
            <Star size={14} />
            {a.visionTitle}
          </h2>
          <p className="about-vision-text">{a.vision}</p>
          <p className="about-vision-sub">{a.visionText}</p>
        </section>

        <section className="about-block" aria-labelledby="about-mission-title">
          <h2 id="about-mission-title">{a.missionTitle}</h2>
          <p className="about-sub">{a.missionSubtitle}</p>
          <ol className="about-mission-list">
            {a.mission.map((item, index) => (
              <li key={item}>
                <span className="about-num" aria-hidden="true">{index + 1}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>

          <h3 className="about-services-title">{a.servicesTitle}</h3>
          <ul className="about-services">
            {a.services.map((service, index) => (
              <li key={service.title}>
                <span className="about-service-icon"><Icon name={SERVICE_ICONS[index]} size={22} /></span>
                <div>
                  <h4>{service.title}</h4>
                  <p>{service.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="about-block" aria-labelledby="about-values-title">
          <h2 id="about-values-title">{a.valuesTitle}</h2>
          <ol className="about-values-list">
            {a.values.map((value) => (
              <li key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="about-cta">
          <h2>{a.ctaTitle}</h2>
          <div className="about-cta-actions">
            <a className="btn btn-wa btn-lg" href={whatsappLink(t.wa.hello)} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={22} />
              {t.wa.button}
            </a>
            <Link className="btn btn-ghost btn-lg" to={{ pathname: ctx.home, hash: '#offer' }}>
              {t.offer.barLink}
            </Link>
          </div>
        </div>
      </article>
    </Shell>
  )
}