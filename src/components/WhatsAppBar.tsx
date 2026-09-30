import { whatsappLink } from '../data/site'
import type { LangContext } from '../i18n'
import Icon from './Icon'

/** Big WhatsApp button fixed to the bottom of the screen on phones only. */
export default function WhatsAppBar({ ctx }: { ctx: LangContext }) {
  return (
    <a className="wa-bar" href={whatsappLink(ctx.t.wa.hello)} target="_blank" rel="noopener">
      <Icon name="whatsapp" size={24} />
      {ctx.t.wa.button}
    </a>
  )
}