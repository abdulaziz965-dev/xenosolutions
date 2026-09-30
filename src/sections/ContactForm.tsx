import { useState, type FormEvent } from 'react'
import { english, getLang, type Dict, type LangCode } from '../i18n'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMAIL = {
  service: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  template: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}
const configured = Boolean(EMAIL.service && EMAIL.template && EMAIL.publicKey)

export default function ContactForm({ t, lang }: { t: Dict; lang: LangCode }) {
  const f = t.contact.form
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return // stops double-clicks sending twice
    const form = event.currentTarget
    const data = new FormData(form)

    // Hidden field only bots fill in. Pretend it worked and send nothing.
    if (data.get('company_website')) {
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const emailjs = (await import('@emailjs/browser')).default // loaded only when needed
      await emailjs.send(
        EMAIL.service!,
        EMAIL.template!,
        {
          name: String(data.get('name') ?? ''),
          phone: String(data.get('phone') ?? ''),
          email: String(data.get('email') ?? ''),
          project: String(data.get('project') ?? ''),
          message: String(data.get('message') ?? ''),
          language: getLang(lang).english, // add {{language}} to the EmailJS template to see it
        },
        { publicKey: EMAIL.publicKey! },
      )
      form.reset()
      setStatus('sent')
    } catch (error) {
      console.error('Contact form failed', error)
      setStatus('error')
    }
  }

  if (!configured) {
    return (
      <div className="form-panel">
        <h3>{f.title}</h3>
        <p className="form-status is-error">{f.unavailable}</p>
      </div>
    )
  }

  const statusText = status === 'sending' ? f.sending : status === 'sent' ? f.sent : status === 'error' ? f.error : ''

  return (
    <form className="form-panel" onSubmit={onSubmit}>
      <h3>{f.title}</h3>

      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-name">{f.name}</label>
          <input id="cf-name" name="name" autoComplete="name" required maxLength={80} />
        </div>
        <div className="field">
          <label htmlFor="cf-phone">{f.phone}</label>
          <input id="cf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" required maxLength={20} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="cf-email">
          {f.email} <small>({f.optional})</small>
        </label>
        <input id="cf-email" name="email" type="email" autoComplete="email" dir="ltr" maxLength={120} />
      </div>

      <div className="field">
        <label htmlFor="cf-project">{f.service}</label>
        <select id="cf-project" name="project" required defaultValue="">
          <option value="" disabled>{f.choose}</option>
          {/* The visitor sees their language; the email always arrives in English. */}
          {t.services.items.map((item, index) => (
            <option key={item.title} value={english.services.items[index].title}>{item.title}</option>
          ))}
          <option value={english.contact.form.fullPackage}>{f.fullPackage}</option>
          <option value={english.contact.form.notSure}>{f.notSure}</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="cf-message">
          {f.message} <small>({f.optional})</small>
        </label>
        <textarea id="cf-message" name="message" rows={4} placeholder={f.messageHint} maxLength={1500} />
      </div>

      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <button className="btn btn-primary btn-lg" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? f.sending : f.send}
      </button>
      <p className={`form-status${status === 'error' ? ' is-error' : status === 'sent' ? ' is-ok' : ''}`} role="status" aria-live="polite">
        {statusText}
      </p>
    </form>
  )
}