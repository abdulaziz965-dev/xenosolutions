import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AVAILABLE, getLang, homePath, suggestLang, type LangCode, type LangContext } from '../i18n'
import { useLanguagePreference } from '../i18n/LanguageProvider'
import Icon from './Icon'

/** Search engines and link-preview bots never see the popup; they read the page itself. */
function isBot() {
  return /bot|crawl|spider|slurp|lighthouse|headless|inspectiontool|facebookexternalhit|whatsapp|telegram/i.test(
    navigator.userAgent,
  )
}

/**
 * First-visit language popup. Appears once; the choice is saved on the visitor's device.
 * Closing it without choosing keeps the language of the page they are on.
 */
export default function LanguagePicker({ ctx, isHome }: { ctx: LangContext; isHome: boolean }) {
  const { saved, ready, choose } = useLanguagePreference()
  const navigate = useNavigate()
  const dialogRef = useRef<HTMLDivElement>(null)
  const [suggested, setSuggested] = useState<LangCode>(ctx.lang)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (ready && saved === null && !isBot()) {
      setSuggested(suggestLang())
      setShow(true)
    } else {
      setShow(false)
    }
  }, [ready, saved])

  useEffect(() => {
    if (!show) return
    document.body.classList.add('picker-open')
    const first = dialogRef.current?.querySelector<HTMLButtonElement>('.picker-option')
    first?.focus()
    return () => document.body.classList.remove('picker-open')
  }, [show])

  if (!show) return null

  function pick(code: LangCode) {
    choose(code)
    if (isHome && code !== ctx.lang) navigate(homePath(code))
  }

  function dismiss() {
    choose(ctx.lang)
  }

  // Keep keyboard focus inside the popup; Escape closes it.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      dismiss()
      return
    }
    if (event.key !== 'Tab') return
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button')
    if (!focusable || focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  // Shown in the suggested language, so a visitor whose phone is in Arabic reads Arabic straight away.
  const text = getLang(suggested).t.langPicker
  const ordered = [...AVAILABLE].sort((a, b) => (a.code === suggested ? -1 : b.code === suggested ? 1 : 0))
  const suggestedDir = getLang(suggested).dir

  return (
    <div className="picker-backdrop" onMouseDown={(event) => event.target === event.currentTarget && dismiss()}>
      <div
        className="picker"
        role="dialog"
        aria-modal="true"
        aria-labelledby="picker-title"
        ref={dialogRef}
        onKeyDown={onKeyDown}
        lang={suggested}
        dir={suggestedDir}
      >
        <button type="button" className="picker-close" onClick={dismiss} aria-label={text.close}>
          <Icon name="close" size={18} />
        </button>
        <img className="picker-mark" src="/logo-mark.webp" alt="" width="48" height="48" />
        <h2 id="picker-title">{text.title}</h2>
        <p>{text.subtitle}</p>

        <ul className="picker-list">
          {ordered.map((language) => (
            <li key={language.code} className={language.code === suggested ? 'is-suggested' : undefined}>
              <button type="button" className="picker-option" onClick={() => pick(language.code)} lang={language.code} dir={language.dir}>
                <span className="picker-names">
                  <span className="picker-native lang-sys">{language.native}</span>
                  {language.code !== 'en' && <span className="picker-english" lang="en" dir="ltr">{language.english}</span>}
                </span>
                {language.code === suggested && <span className="picker-badge" lang={suggested}>{text.suggested}</span>}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}