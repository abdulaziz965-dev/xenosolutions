import Icon, { type IconName } from '../components/Icon'
import SectionHead from '../components/SectionHead'
import type { Dict } from '../i18n'

const ICONS: IconName[] = ['web', 'server', 'wrench', 'search', 'pos', 'megaphone']

export default function Services({ t }: { t: Dict }) {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <SectionHead id="services-title" title={t.services.title} intro={t.services.intro} />
        <ul className="service-list">
          {t.services.items.map((item, index) => (
            <li key={item.title}>
              <span className="service-icon"><Icon name={ICONS[index]} size={24} /></span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}