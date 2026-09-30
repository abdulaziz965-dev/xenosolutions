import { useEffect, type ReactNode } from 'react'
import type { LangContext } from '../i18n'
import Footer from './Footer'
import Header from './Header'
import Icon from './Icon'
import LanguagePicker from './LanguagePicker'
import OfferBar from './OfferBar'
import WhatsAppBar from './WhatsAppBar'

type ShellProps = {
  ctx: LangContext
  children: ReactNode
  isHome?: boolean // home pages switch language when the visitor picks one in the popup
  englishOnly?: boolean // page text is English; header/footer still follow the chosen language
}

/** Header + page + footer. Sets the page language and direction (needed for Arabic and Urdu). */
export default function Shell({ ctx, children, isHome = false, englishOnly = false }: ShellProps) {
  useEffect(() => {
    document.documentElement.lang = ctx.lang
    document.documentElement.dir = ctx.dir
  }, [ctx.lang, ctx.dir])

  return (
    <>
      <a className="skip-link" href="#main">{ctx.t.skip}</a>
      <OfferBar ctx={ctx} />
      <Header ctx={ctx} />
      <main id="main" tabIndex={-1}>
        {englishOnly ? (
          <>
            {ctx.lang !== 'en' && (
              <div className="container">
                <p className="en-only-note"><Icon name="globe" size={18} />{ctx.t.englishOnly}</p>
              </div>
            )}
            <div lang="en" dir="ltr">{children}</div>
          </>
        ) : (
          children
        )}
      </main>
      <Footer ctx={ctx} />
      <WhatsAppBar ctx={ctx} />
      <LanguagePicker ctx={ctx} isHome={isHome} />
    </>
  )
}