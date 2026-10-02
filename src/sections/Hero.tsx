import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { LanguageStrip } from '../components/LanguageMenu'
import WireframeGlobe from '../components/WireframeGlobe'
import { SITE, whatsappLink } from '../data/site'
import type { Dict, LangContext } from '../i18n'

/** White serrated band on the left, like the 9 points on the Qatari flag. */
function Serration() {
  const teeth = 9
  const height = 900
  const step = height / teeth
  let d = 'M0 0 H60'
  for (let i = 0; i < teeth; i++) {
    d += ` L100 ${step * i + step / 2} L60 ${step * (i + 1)}`
  }
  d += ' H0 Z'
  return (
    <svg className="hero-serration" viewBox="0 0 100 900" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={d} fill="#fff" />
    </svg>
  )
}

/** Signal, wifi and battery icons for the phone's status bar. */
function StatusIcons() {
  return (
    <svg width="54" height="12" viewBox="0 0 54 12" fill="currentColor" aria-hidden="true" focusable="false">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="4.5" y="6" width="3" height="6" rx="1" />
      <rect x="9" y="3.5" width="3" height="8.5" rx="1" />
      <rect x="13.5" y="1" width="3" height="11" rx="1" />
      <path d="M26 3.2a8.6 8.6 0 0 1 6 2.4l-1.3 1.3a6.8 6.8 0 0 0-9.4 0L20 5.6a8.6 8.6 0 0 1 6-2.4zm0 3.6a4.8 4.8 0 0 1 3.4 1.4L26 11.6l-3.4-3.4A4.8 4.8 0 0 1 26 6.8z" />
      <rect x="36.5" y="1.5" width="15" height="9" rx="2.5" fill="none" stroke="currentColor" strokeOpacity="0.45" />
      <rect x="38" y="3" width="11" height="6" rx="1.4" />
      <rect x="52.2" y="4.2" width="1.6" height="3.6" rx="0.8" fillOpacity="0.45" />
    </svg>
  )
}

/**
 * Realistic phone showing the example website (SITE.demoUrl) at true phone width, scaled to fit.
 * Desktop only. The drawn mock underneath shows while the site loads, or if it can't load.
 */
  function PhoneMock({ t, src }: { t: Dict; src: string }) {
  const m = t.hero.mock
  const [showSite, setShowSite] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Only load the example website on screens where the phone is visible (saves mobile data).
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 900px)')
    const update = () => setShowSite(desktop.matches)
    update()
    desktop.addEventListener('change', update)
    return () => desktop.removeEventListener('change', update)
  }, [])

  return (
    <figure className="phone">
      <div className="phone-body">
        <span className="phone-btn phone-btn-vol1" aria-hidden="true" />
        <span className="phone-btn phone-btn-vol2" aria-hidden="true" />
        <span className="phone-btn phone-btn-power" aria-hidden="true" />

        <div className="phone-screen" dir="ltr">
          <div className="phone-status" aria-hidden="true">
            <span>9:41</span>
            <span className="phone-island" />
            <StatusIcons />
          </div>

          <div className="phone-viewport">
            <div className="phone-fallback" aria-hidden="true">
              <div className="mock-cover">
                <span className="mock-logo"><Icon name="store" size={30} /></span>
              </div>
              <p className="mock-name">{m.name}</p>
              <p className="mock-status"><i />{m.status}</p>
              <div className="mock-buttons">
                <span><Icon name="phone" size={18} />{m.call}</span>
                <span><Icon name="whatsapp" size={18} />{m.whatsapp}</span>
                <span><Icon name="pin" size={18} />{m.map}</span>
              </div>
              <p className="mock-heading">{m.services}</p>
              <div className="mock-lines"><span /><span /><span /></div>
            </div>

            {showSite && (
              <iframe
                className={loaded ? 'phone-site is-loaded' : 'phone-site'}
                src={src}
                title={m.frameTitle}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            )}
          </div>

          <span className="phone-glare" aria-hidden="true" />
        </div>
      </div>
      <figcaption>{m.caption}</figcaption>
    </figure>
  )
}

export default function Hero({ ctx }: { ctx: LangContext }) {
  const { t, home } = ctx
  return (
    <section className="hero" aria-labelledby="hero-title">
      <WireframeGlobe className="hero-globe" />
      <span className="hero-dot hero-dot-1" aria-hidden="true" />
      <span className="hero-dot hero-dot-2" aria-hidden="true" />
      <span className="hero-dot hero-dot-3" aria-hidden="true" />
      <Serration />
      <div className="container hero-grid">
        <div className="hero-copy">
          <LanguageStrip ctx={ctx} />
          <h1 id="hero-title">{t.hero.title}</h1>
          <p className="hero-lede">{t.hero.lede}</p>
          <div className="hero-actions">
            <a className="btn btn-light btn-lg" href={whatsappLink(t.wa.hello)} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={22} className="icon-wa" />
              {t.wa.button}
            </a>
            <Link className="btn btn-outline-light btn-lg" to={{ pathname: home, hash: '#customers' }}>
              {t.hero.seeWork}
            </Link>
          </div>
          <ul className="hero-points">
            {t.hero.points.map((point) => (
              <li key={point}><Icon name="check" />{point}</li>
            ))}
          </ul>
        </div>
         <PhoneMock t={t} src={home} />
      </div>
    </section>
  )
}