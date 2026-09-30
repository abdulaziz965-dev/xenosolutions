import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Shell from '../components/Shell'
import { whatsappLink } from '../data/site'
import useDocumentMeta from '../hooks/useDocumentMeta'
import { PAGE_META } from '../seo'
import { useChromeLang } from '../i18n/LanguageProvider'

const FACTS = [
  ['30+', 'Years of experience'],
  ['16+', 'Years in Qatar'],
  ['6', 'Countries worked in'],
  ['4', 'Languages spoken'],
] as const

const VALUES = [
  ['Integrity', 'Building trust through honesty and transparency.'],
  ['Innovation', 'Using technology to solve real business problems.'],
  ['Excellence', 'Delivering quality without compromise.'],
  ['Commitment', 'We treat every client project as our own.'],
] as const

export default function GMMessage() {
  const ctx = useChromeLang()
  useDocumentMeta({ ...PAGE_META.gm })

  return (
    <Shell ctx={ctx} englishOnly>
      <article className="container gm">
        <Link className="back-link" to={ctx.home}><Icon name="back" size={18} />Back to home</Link>

        <header className="gm-head">
          <h1>Message from the General Manager</h1>
          <p>Leadership through experience and innovation.</p>
        </header>

        <img
          className="gm-office"
          src="/gm-office.jpg"
          alt="Our General Manager in a client meeting at the Xenosys Solutions office"
          width="1600"
          height="900"
        />

        <div className="gm-intro">
          <aside className="gm-card">
            <img src="/gm.jpg" alt="Mohammed Fazlur Rahman" width="180" height="180" />
            <h2>Mohammed Fazlur Rahman</h2>
            <p>General Manager</p>
            <p>MSc (Wales, UK)<br />MBA (Coventry, UK)</p>
          </aside>
          <div className="gm-bio">
            <h2>Meet our General Manager</h2>
            <p>
              Mohammed Fazlur Rahman is an accomplished professional with more than 30 years of industry experience,
              including over 16 years in Qatar. He has worked across Qatar, the United Kingdom, Oman, the UAE, Saudi
              Arabia and India. Holding an MSc from Wales (UK) and an MBA from Coventry (UK), he specialises in business
              leadership, strategic planning, business development, operations management and organisational development.
            </p>
            <p>
              He is fluent in English, Arabic, Urdu and Hindi, and is passionate about mentoring teams, encouraging
              innovation and delivering excellent customer experiences. His leadership is built on integrity,
              collaboration and a commitment to long-term business success.
            </p>
          </div>
        </div>

        <ul className="gm-facts">
          {FACTS.map(([value, label]) => (
            <li key={label}><strong>{value}</strong><span>{label}</span></li>
          ))}
        </ul>

        <section className="gm-letter" aria-labelledby="gm-letter-title">
          <h2 id="gm-letter-title">A message to our clients</h2>
          <p>Dear valued clients and partners,</p>
          <p>Welcome to Xenosys Solutions.</p>
          <p>
            Technology continues to transform businesses at an unprecedented pace, and our mission is to help
            organisations embrace this change with confidence. At Xenosys Solutions, we are committed to delivering
            reliable, innovative and scalable digital solutions.
          </p>
          <p>
            Throughout my professional journey across many countries and industries, I have learned that lasting success
            is built on trust, quality and meaningful partnerships. These principles guide every project we undertake.
          </p>
          <p>
            Whether you are a small business, a startup or an established enterprise, our team is dedicated to helping
            you achieve your digital ambitions with professionalism, integrity and technical excellence.
          </p>
          <p>Thank you for your trust in Xenosys Solutions. We look forward to building the future together.</p>
          <p className="gm-sign">
            <strong>Mohammed Fazlur Rahman</strong>
            <span>General Manager, Xenosys Solutions</span>
          </p>
        </section>

        <section className="gm-values" aria-labelledby="gm-values-title">
          <h2 id="gm-values-title">Leadership philosophy</h2>
          <ul>
            {VALUES.map(([title, text]) => (
              <li key={title}><h3>{title}</h3><p>{text}</p></li>
            ))}
          </ul>
        </section>

        <div className="gm-cta">
          <h2>Let us build your website together</h2>
          <div className="gm-cta-actions">
            <a className="btn btn-wa btn-lg" href={whatsappLink(ctx.t.wa.hello)} target="_blank" rel="noopener">
              <Icon name="whatsapp" size={22} />
              {ctx.t.wa.button}
            </a>
            <Link className="btn btn-ghost btn-lg" to={{ pathname: ctx.home, hash: '#contact' }}>Send us a message</Link>
          </div>
        </div>
      </article>
    </Shell>
  )
}