import { useState } from 'react'
import Icon, { type IconName } from '../components/Icon'
import SectionHead from '../components/SectionHead'
import { CATEGORIES, customers, type CustomerCategory } from '../data/customers'
import { whatsappLink } from '../data/site'
import type { Dict } from '../i18n'

type Filter = 'all' | CustomerCategory

const FILTER_ICONS: Record<Filter, IconName> = {
  all: 'grid',
  building: 'building',
  tailoring: 'scissors',
  shops: 'store',
  laundry: 'shirt',
  sports: 'ball',
}

/**
 * Customer websites with category filters, so a visitor can jump straight to businesses like theirs.
 * The buttons wrap onto new lines (no sideways scrolling). Search engines get the full list.
 */
export default function Customers({ t }: { t: Dict }) {
  const c = t.customers
  const [active, setActive] = useState<Filter>('all')

  const filters: Filter[] = ['all', ...CATEGORIES]
  const count = (filter: Filter) =>
    filter === 'all' ? customers.length : customers.filter((customer) => customer.category === filter).length
  const shown = active === 'all' ? customers : customers.filter((customer) => customer.category === active)

  return (
    <section id="customers" className="section section-pearl" aria-labelledby="customers-title">
      <div className="container">
        <SectionHead id="customers-title" title={c.title} intro={c.intro} />

        <div className="customer-filters" role="group" aria-label={c.filterLabel}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="filter-chip"
              aria-pressed={active === filter}
              onClick={() => setActive(filter)}
            >
              <Icon name={FILTER_ICONS[filter]} size={18} />
              <span>{c.categories[filter]}</span>
              <span className="filter-count">{count(filter)}</span>
            </button>
          ))}
        </div>

        <ul className="customer-list" aria-live="polite">
          {shown.map((customer) => (
            <li key={customer.id} className="customer">
              {customer.image ? (
                <img className="customer-thumb" src={customer.image} alt="" width="52" height="52" loading="lazy" />
              ) : (
                <span className="customer-mono" aria-hidden="true">{customer.initials}</span>
              )}
              <div className="customer-info">
                <h3>{customer.name}</h3>
                <p>{c.types[customer.id]}</p>
              </div>
              <div className="customer-actions">
                <a className="act-btn" href={customer.url} target="_blank" rel="noopener">
                  <Icon name="external" size={16} />
                  <span className="act-label">{c.visit}</span>
                  <span className="sr-only"> {customer.name} ({c.newTab})</span>
                </a>
                <a
                  className="act-btn act-btn-wa"
                  href={whatsappLink(t.wa.likeThis(customer.name))}
                  target="_blank"
                  rel="noopener"
                >
                  <Icon name="whatsapp" size={18} />
                  <span className="act-label">{c.likeThis}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}