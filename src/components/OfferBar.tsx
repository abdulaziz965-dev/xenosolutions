import { Link } from 'react-router-dom'
import type { LangContext } from '../i18n'
import Star from './Star'

/** Slim announcement bar at the top of every page, pointing to the QR 99 offer. */
export default function OfferBar({ ctx }: { ctx: LangContext }) {
  const { t, home } = ctx
  return (
    <div className="offer-bar">
      <div className="container offer-bar-row">
        <Star size={12} />
        <p>
          <strong>{t.offer.barTitle}</strong> {t.offer.barText}
        </p>
        <Link to={{ pathname: home, hash: '#offer' }}>{t.offer.barLink}</Link>
      </div>
    </div>
  )
}