import { Link } from 'react-router-dom'
import Star from '../components/Star'
import { aboutPath, type LangContext } from '../i18n'

/** Short band on the home page: the vision in one line, linking to the About page. */
export default function VisionStrip({ ctx }: { ctx: LangContext }) {
  const a = ctx.t.about
  return (
    <section className="vision-strip" aria-label={a.visionTitle}>
      <div className="container vision-strip-row">
        <Star size={18} />
        <p>{a.strip}</p>
        <Link className="btn btn-light" to={aboutPath(ctx.lang)}>
          {a.stripLink}
        </Link>
      </div>
    </section>
  )
}