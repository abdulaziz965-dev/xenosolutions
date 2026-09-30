import { Link } from 'react-router-dom'
import { whatsappLink } from '../data/site'
import type { LangContext } from '../i18n'
import Icon from './Icon'
import { LanguageMenu } from './LanguageMenu'
import SiteMenu from './SiteMenu'

export default function Header({ ctx }: { ctx: LangContext }) {
  const { t, home } = ctx
  const links = [
    ['services', t.nav.services],
    ['customers', t.nav.customers],
    ['process', t.nav.process],
    ['contact', t.nav.contact],
  ] as const

  return (
    <header className="site-header">
      <div className="container header-row">
        <Link to={home} className="brand" aria-label="Xenosys Solutions">
          <img src="/logo-mark.webp" alt="" width="52" height="52" />
          <span className="brand-text">
            <strong>Xenosys</strong>
            <small>Web Solutions</small>
          </span>
        </Link>

        <nav className="header-nav" aria-label="Main">
          {links.map(([id, label]) => (
            <Link key={id} to={{ pathname: home, hash: `#${id}` }}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageMenu ctx={ctx} />
          <a
            className="btn btn-wa btn-sm"
            href={whatsappLink(t.wa.hello)}
            target="_blank"
            rel="noopener"
            aria-label={t.wa.button}
          >
            <Icon name="whatsapp" />
            <span className="hide-xs">{t.wa.short}</span>
          </a>
          <SiteMenu ctx={ctx} />
        </div>
      </div>
    </header>
  )
}