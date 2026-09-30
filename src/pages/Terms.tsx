import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Shell from '../components/Shell'
import { SITE } from '../data/site'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { PAGE_META } from '../seo'
import { useChromeLang } from '../i18n/LanguageProvider'

export default function Terms() {
  const ctx = useChromeLang()
  useDocumentMeta({ ...PAGE_META.terms })

  return (
    <Shell ctx={ctx} englishOnly>
      <article className="container doc">
        <Link className="back-link" to={ctx.home}><Icon name="back" size={18} />Back to home</Link>
        <h1>Terms and conditions</h1>
        <p className="updated">Last updated: September 2026</p>

        <h2>Accepting these terms</h2>
        <p>By using this website, you agree to these terms and to all applicable laws.</p>

        <h2>Our services</h2>
        <p>
          Xenosys Solutions provides website design and development, hosting, debugging, search engine optimisation,
          custom ERP and POS software, digital marketing, consulting and related digital services.
        </p>

        <h2>Intellectual property</h2>
        <p>
          All content, branding, graphics and source code on this website belong to Xenosys Solutions unless stated
          otherwise. Websites we build for clients are covered by the agreement for that project.
        </p>

        <h2>No guaranteed results</h2>
        <p>
          Our services cover the website and the work described in your package or agreement. We do not promise or
          guarantee any number of customers, enquiries, sales, website visits or search engine rankings.
        </p>

        <h2>Project payments</h2>
        <p>
          Client projects may be paid in milestones. We deliver the final project after the agreed payments are complete.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          Xenosys Solutions is not liable for indirect or consequential damages arising from the use of this website or
          our services.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <a href={`mailto:${SITE.emails.general}`}>{SITE.emails.general}</a>.
        </p>
      </article>
    </Shell>
  )
}