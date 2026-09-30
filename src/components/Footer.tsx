import { Link } from 'react-router-dom'
import { SITE, whatsappLink } from '../data/site'
import type { LangContext } from '../i18n'
import { LanguageLinks } from './LanguageMenu'

export default function Footer({ ctx }: { ctx: LangContext }) {
  const { t, home } = ctx
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to={home} className="brand" aria-label="Xenosys Solutions">
            <img src="/logo-mark.webp" alt="" width="52" height="52" loading="lazy" />
            <span className="brand-text">
              <strong>Xenosys</strong>
              <small>Web Solutions</small>
            </span>
          </Link>
          <p className="footer-tagline">{t.footer.tagline}</p>
        </div>

        <nav aria-labelledby="footer-pages">
          <h2 id="footer-pages">{t.footer.pages}</h2>
          <ul className="footer-links">
            <li><Link to={{ pathname: home, hash: '#offer' }}>{t.offer.title}</Link></li>
            <li><Link to={{ pathname: home, hash: '#services' }}>{t.nav.services}</Link></li>
            <li><Link to={{ pathname: home, hash: '#customers' }}>{t.nav.customers}</Link></li>
            <li><Link to="/gm-message">{t.footer.gm}</Link></li>
            <li><Link to="/privacy-policy">{t.footer.privacy}</Link></li>
            <li><Link to="/terms">{t.footer.terms}</Link></li>
          </ul>
        </nav>

        <div>
          <h2>{t.footer.reach}</h2>
          <ul className="footer-links">
            <li>
              <a href={whatsappLink(t.wa.hello)} target="_blank" rel="noopener">
                {t.wa.short} <bdi dir="ltr">{SITE.phoneDisplay}</bdi>
              </a>
            </li>
            <li><a href={`mailto:${SITE.emails.general}`} dir="ltr">{SITE.emails.general}</a></li>
            <li>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener">{t.contact.office}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-langs-row">
        <span className="footer-langs-label">{t.footer.language}</span>
        <LanguageLinks ctx={ctx} className="footer-langs" label={t.footer.language} />
      </div>
      <div className="container footer-bottom">
        © {new Date().getFullYear()} Xenosys Solutions. {t.footer.rights}
      </div>
    </footer>
  )
}