// Recent customers shown on the home page, in this order.
// `type` picks the translated business description from the language files.
// `image` is optional: put a phone screenshot in /public/work/ (e.g. /work/bilal.webp)
// and add `image: '/work/bilal.webp'` to show it instead of the initials tile.
export type CustomerType = 'contracting' | 'design' | 'sports' | 'salon' | 'laundry' | 'coach'

export type Customer = {
  id: string
  name: string
  initials: string
  type: CustomerType
  url: string
  image?: string
}

export const customers: Customer[] = [
  {
    id: 'bilal',
    name: 'Bilal for Building Maintenance & Contracting',
    initials: 'BM',
    type: 'contracting',
    url: 'https://bilal-for-building-maintenance-cont.vercel.app/',
  },
  {
    id: 'propert',
    name: 'Propert Design Trading & Contracting',
    initials: 'PD',
    type: 'design',
    url: 'https://propert-trading.vercel.app/',
  },
  {
    id: 'sk-mohan',
    name: 'SK Mohan Sports Academy',
    initials: 'SK',
    type: 'sports',
    url: 'https://mohan-sk-sports-academy.vercel.app/',
  },
  {
    id: 'adil-luxe',
    name: 'Adil Luxe Care',
    initials: 'AL',
    type: 'salon',
    url: 'https://adilluxecarebeautyservices.com/',
  },
  {
    id: 'al-askari',
    name: 'New Al Askari Laundry',
    initials: 'AA',
    type: 'laundry',
    url: 'https://al-askari-laundry.vercel.app/',
  },
  {
    id: 'amine-khatim',
    name: 'Amine Khatim',
    initials: 'AK',
    type: 'coach',
    url: 'https://amine-khatim.vercel.app/',
  },
]