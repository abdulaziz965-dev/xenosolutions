// Customers shown on the home page, in this exact order (also the order inside each filter).
// `id` also picks the translated tagline from `customers.types` in the language files.
// `category` decides which filter button shows the business.
// `image` is optional: put a phone screenshot in /public/work/ (e.g. /work/bilal.webp)
// and add `image: '/work/bilal.webp'` to show it instead of the initials tile.
export type CustomerId =
  | 'alAlwai'
  | 'bilal'
  | 'holyDream'
  | 'propert'
  | 'involved'
  | 'abuJohar'
  | 'manikgonj'
  | 'alJuzraa'
  | 'darAlZahra'
  | 'liyaliNajd'
  | 'adilLuxe'
  | 'skMohan'
  | 'zarbia'
  | 'alAskari'
  | 'amine'

export type CustomerCategory = 'building' | 'tailoring' | 'shops' | 'laundry' | 'sports'

/** Order of the filter buttons. */
export const CATEGORIES: CustomerCategory[] = ['building', 'tailoring', 'shops', 'laundry', 'sports']

export type Customer = {
  id: CustomerId
  name: string
  initials: string
  category: CustomerCategory
  url: string
  image?: string
}

export const customers: Customer[] = [
  { id: 'alAlwai', name: 'Al Alwai Real Estate', initials: 'AA', category: 'building', url: 'https://al-alwai.vercel.app/' },
  { id: 'bilal', name: 'Bilal for Building Maintenance & Contracting', initials: 'BM', category: 'building', url: 'https://bilal-for-building-maintenance-cont.vercel.app/' },
  { id: 'holyDream', name: 'Holy Dream Trading and Contracting', initials: 'HD', category: 'building', url: 'https://holy-dream-trading-and-contracting.vercel.app/' },
  { id: 'propert', name: 'Propert Design Trading & Contracting', initials: 'PD', category: 'building', url: 'https://propert-trading.vercel.app/' },
  { id: 'involved', name: 'Involved Trading', initials: 'IT', category: 'building', url: 'https://involved-trading.vercel.app/' },
  { id: 'abuJohar', name: 'Abu Johar Furniture', initials: 'AJ', category: 'shops', url: 'https://abu-johar-furniture.vercel.app/' },
  { id: 'manikgonj', name: 'Manikgonj Contracting and Hospitality Services', initials: 'MC', category: 'building', url: 'https://manikgonj-contracting-and-hospitali.vercel.app/' },
  { id: 'alJuzraa', name: 'Al Juzraa Auto', initials: 'JA', category: 'shops', url: 'https://al-juzraa.vercel.app/' },
  { id: 'darAlZahra', name: 'Dar Al Zahra Tailor', initials: 'DZ', category: 'tailoring', url: 'https://dar-al-zahra-tailor.vercel.app/' },
  { id: 'liyaliNajd', name: 'Liyali Najd Abaya', initials: 'LN', category: 'tailoring', url: 'https://liyali-najd-abaya.vercel.app/' },
  { id: 'adilLuxe', name: 'Adil Luxe Care', initials: 'AL', category: 'tailoring', url: 'https://adilluxecarebeautyservices.com/' },
  { id: 'skMohan', name: 'SK Mohan Sports Academy', initials: 'SK', category: 'sports', url: 'https://mohan-sk-sports-academy.vercel.app/' },
  { id: 'zarbia', name: 'Zarbia Laundry', initials: 'ZL', category: 'laundry', url: 'https://zarbia-laundry.vercel.app/' },
  { id: 'alAskari', name: 'New Al Askari Laundry', initials: 'NA', category: 'laundry', url: 'https://al-askari-laundry.vercel.app/' },
  { id: 'amine', name: 'Amine Khatim', initials: 'AK', category: 'sports', url: 'https://amine-khatim.vercel.app/' },
]