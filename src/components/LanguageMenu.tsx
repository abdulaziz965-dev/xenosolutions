import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { AVAILABLE, homePath, type LangContext } from '../i18n'
import { useLanguagePreference } from '../i18n/LanguageProvider'
import Icon from './Icon'

function closeMenu(event: MouseEvent<HTMLElement>) {
  event.currentTarget.closest('details')?.removeAttribute('open')
}

/** Globe button in the header. Choosing a language saves it for future visits. */
export function LanguageMenu({ ctx }: { ctx: LangContext }) {
  const { choose } = useLanguagePreference()
  if (AVAILABLE.length < 2) return null
  return (
    <details className="lang-menu">
      <summary aria-label={ctx.t.nav.language}>
        <Icon name="globe" />
        <span className="lang-menu-current lang-sys">{ctx.native}</span>
      </summary>
      <ul onClick={closeMenu}>
        {AVAILABLE.map((language) => (
          <li key={language.code}>
            <Link
              to={homePath(language.code)}
              lang={language.code}
              dir={language.dir}
              className="lang-sys"
              aria-current={language.code === ctx.lang ? 'true' : undefined}
              onClick={() => choose(language.code)}
            >
              {language.native}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}

/** A row of language names (hero and footer). Choosing one saves it for future visits. */
export function LanguageLinks({ ctx, className, label }: { ctx: LangContext; className: string; label: string }) {
  const { choose } = useLanguagePreference()
  if (AVAILABLE.length < 2) return null
  return (
    <nav className={className} aria-label={label}>
      {AVAILABLE.map((language) => (
        <Link
          key={language.code}
          to={homePath(language.code)}
          lang={language.code}
          dir={language.dir}
          className="lang-sys"
          aria-current={language.code === ctx.lang ? 'true' : undefined}
          onClick={() => choose(language.code)}
        >
          {language.native}
        </Link>
      ))}
    </nav>
  )
}

/** Row of languages at the top of the hero, so nobody has to hunt for the menu. */
export function LanguageStrip({ ctx }: { ctx: LangContext }) {
  return <LanguageLinks ctx={ctx} className="lang-strip" label={ctx.t.nav.language} />
}