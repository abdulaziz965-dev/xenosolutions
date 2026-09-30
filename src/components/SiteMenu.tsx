import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { whatsappLink } from '../data/site'
import type { LangContext } from '../i18n'
import Icon from './Icon'

/**
 * Menu button in the header. Holds every page, including the GM message, Privacy policy and Terms.
 * Desktop: small dropdown. Phones: full-screen panel with big tap targets.
 * Closes on link click, Escape, clicking outside, or page change.
 */
export default function SiteMenu({ ctx }: { ctx: LangContext }) {
  const { t, home } = ctx
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const { pathname, hash } = useLocation()

  useEffect(() => setOpen(false), [pathname, hash])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const onPointer = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    document.body.classList.add('menu-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
      document.body.classList.remove('menu-open')
    }
  }, [open])

  const close = () => setOpen(false)

  const sections = [
    ['services', t.nav.services],
    ['customers', t.nav.customers],
    ['process', t.nav.process],
    ['contact', t.nav.contact],
  ] as const

  const pages = [
    ['/gm-message', t.footer.gm],
    ['/privacy-policy', t.footer.privacy],
    ['/terms', t.footer.terms],
  ] as const

  return (
    <div className="site-menu" ref={wrapRef}>
      <button
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls="site-menu-panel"
        aria-label={open ? t.nav.close : t.nav.menu}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name={open ? 'close' : 'menu'} />
        <span className="hide-xs">{t.nav.menu}</span>
      </button>

      {open && (
        <div id="site-menu-panel" className="menu-panel">
          <nav aria-label={t.nav.menu}>
            <ul className="menu-group">
              {sections.map(([id, label]) => (
                <li key={id}>
                  <Link to={{ pathname: home, hash: `#${id}` }} onClick={close}>{label}</Link>
                </li>
              ))}
            </ul>
            <ul className="menu-group menu-pages">
              {pages.map(([path, label]) => (
                <li key={path}>
                  <Link to={path} onClick={close} aria-current={pathname === path ? 'page' : undefined}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a className="btn btn-wa btn-lg menu-wa" href={whatsappLink(t.wa.hello)} target="_blank" rel="noopener">
            <Icon name="whatsapp" size={22} />
            {t.wa.button}
          </a>
        </div>
      )}
    </div>
  )
}