import { Link } from 'react-router-dom'
import Shell from '../components/Shell'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { PAGE_META } from '../seo'
import { useChromeLang } from '../i18n/LanguageProvider'

export default function NotFound() {
  const ctx = useChromeLang()
  useDocumentMeta({ ...PAGE_META.notFound, noindex: true })

  return (
    <Shell ctx={ctx} englishOnly>
      <section className="container not-found">
        <p className="not-found-code" aria-hidden="true">404</p>
        <h1>This page does not exist</h1>
        <p>It may have been moved, or the link has a typo.</p>
        <Link className="btn btn-primary btn-lg" to={ctx.home}>Go to the home page</Link>
      </section>
    </Shell>
  )
}