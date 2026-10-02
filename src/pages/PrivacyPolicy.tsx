import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Shell from '../components/Shell'
import { SITE } from '../data/site'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { PAGE_META } from '../seo'
import { useChromeLang } from '../i18n/LanguageProvider'

export default function PrivacyPolicy() {
  const ctx = useChromeLang()
  useDocumentMeta({ ...PAGE_META.privacy })

  return (
    <Shell ctx={ctx} englishOnly>
      <article className="container doc">
        <Link className="back-link" to={ctx.home}><Icon name="back" size={18} />Back to home</Link>
        <h1>Privacy policy</h1>
        <p className="updated">Last updated: October 2026</p>
        <p>
          This policy applies to the website of Xenosys Solutions, a company registered in Qatar under Commercial
          Registration (CR) No. {SITE.crNumber}, with offices at Icono View Offices, Doha.
        </p>

        <h2>Information we collect</h2>
        <p>
          When you send our contact form, we collect your name, your phone or WhatsApp number, your email address if you
          give it, the service you need and your message. When you message us on WhatsApp,
          WhatsApp&apos;s own privacy policy also applies.
        </p>

        <h2>How we use your information</h2>
        <p>
          We use your information only to reply to you, prepare quotations, deliver the services you ask for and improve
          our service. We do not sell your information.
        </p>

        <h2>Services we use</h2>
        <ul>
          <li>EmailJS delivers contact form messages to our email.</li>
          <li>Vercel hosts this website.</li>
          <li>Google Fonts provides the fonts on this website.</li>
          <li>Google Maps opens only when you choose to view our location.</li>
        </ul>

        <h2>Your language choice</h2>
        <p>
          When you choose a language, your browser saves that choice on your device so the website opens in that
          language next time. It is not sent to us and is not used for tracking. You can clear it at any time in your
          browser settings.
        </p>

        <h2>Keeping your information safe</h2>
        <p>
          We take reasonable steps to protect your information against unauthorised access, change or disclosure, and we
          keep it only as long as we need it for your enquiry and our business records.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask us to show, correct or delete the information we hold about you by emailing{' '}
          <a href={`mailto:${SITE.emails.general}`}>{SITE.emails.general}</a>.
        </p>

        <h2>Contact</h2>
        <p>
          For any privacy question, email <a href={`mailto:${SITE.emails.general}`}>{SITE.emails.general}</a> or message
          us on WhatsApp at <bdi dir="ltr">{SITE.phoneDisplay}</bdi>.
        </p>
      </article>
    </Shell>
  )
}