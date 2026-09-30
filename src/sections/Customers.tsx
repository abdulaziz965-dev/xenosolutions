import Icon from '../components/Icon'
import SectionHead from '../components/SectionHead'
import { customers } from '../data/customers'
import { whatsappLink } from '../data/site'
import type { Dict } from '../i18n'

/** Vertical list: on phones people just keep scrolling down, no sideways swiping. */
export default function Customers({ t }: { t: Dict }) {
  return (
    <section id="customers" className="section section-pearl" aria-labelledby="customers-title">
      <div className="container">
        <SectionHead id="customers-title" title={t.customers.title} intro={t.customers.intro} />
        <ul className="customer-list">
          {customers.map((customer) => (
            <li key={customer.id} className="customer">
              {customer.image ? (
                <img className="customer-thumb" src={customer.image} alt="" width="64" height="64" loading="lazy" />
              ) : (
                <span className="customer-mono" aria-hidden="true">{customer.initials}</span>
              )}
              <div className="customer-info">
                <h3>{customer.name}</h3>
                <p>{t.customers.types[customer.type]}</p>
              </div>
              <div className="customer-actions">
                <a className="btn btn-ghost" href={customer.url} target="_blank" rel="noopener">
                  {t.customers.visit}
                  <Icon name="external" size={16} />
                  <span className="sr-only">({t.customers.newTab})</span>
                </a>
                <a className="link-wa" href={whatsappLink(t.wa.likeThis(customer.name))} target="_blank" rel="noopener">
                  <Icon name="whatsapp" size={18} />
                  {t.customers.likeThis}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}