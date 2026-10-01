import Icon from '../components/Icon'
import SectionHead from '../components/SectionHead'
import { SITE, whatsappLink } from '../data/site'
import type { Dict, LangCode } from '../i18n'
import ContactForm from './ContactForm'

export default function Contact({ t, lang }: { t: Dict; lang: LangCode }) {
  const c = t.contact
  const otherEmails = [
    [c.departments.careers, SITE.emails.careers],
    [c.departments.finance, SITE.emails.finance],
    [c.departments.procurement, SITE.emails.procurement],
    [c.departments.marketing, SITE.emails.marketing],
  ] as const

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHead id="contact-title" title={c.title} intro={c.intro} />
        <div className="contact-grid">
          <div className="contact-ways">
            <a className="wa-card" href={whatsappLink(t.wa.hello)} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={36} />
              <span>
                <strong>{c.waTitle}</strong>
                <bdi className="wa-number" dir="ltr">{SITE.phoneDisplay}</bdi>
                <small>{c.waText}</small>
              </span>
            </a>

            <ul className="contact-list">
              <li>
                <Icon name="phone" />
                <div>
                  <span>{c.call}</span>
                  <a href={SITE.phoneHref}><bdi dir="ltr">{SITE.phoneDisplay}</bdi></a>{' '}
                </div>
              </li>
              <li>
                <Icon name="mail" />
                <div>
                  <span>{c.email}</span>
                  <a href={`mailto:${SITE.emails.general}`} dir="ltr">{SITE.emails.general}</a>{' '}
                  <a href={`mailto:${SITE.emails.sales}`} dir="ltr">{SITE.emails.sales}</a>
                </div>
              </li>
            </ul>

            <details className="more-emails">
              <summary>{c.otherEmails}</summary>
              <ul>
                {otherEmails.map(([label, email]) => (
                  <li key={email}>
                    <span>{label}</span>
                    <a href={`mailto:${email}`} dir="ltr">{email}</a>
                  </li>
                ))}
              </ul>
            </details>

            <a className="office-card" href={SITE.mapsUrl} target="_blank" rel="noopener">
              <img src="/icono-view.jpeg" alt={c.officePhotoAlt} width="96" height="96" loading="lazy" />
              <span className="office-text">
                <strong>{c.officeTitle}</strong>
                <span className="office-address">{c.office}</span>
                <span className="office-link"><Icon name="pin" size={16} />{c.openMap}</span>
              </span>
            </a>
          </div>

          <ContactForm t={t} lang={lang} />
        </div>
      </div>
    </section>
  )
}