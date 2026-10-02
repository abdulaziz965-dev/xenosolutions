// One place for every contact detail. Change a number or email here and it updates everywhere.
export const SITE = {
  name: 'Xenosys Solutions',
  url: 'https://www.xenosysweb.com',
  whatsappNumber: '97470643918',
  phoneDisplay: '+974 7064 3918',
  phoneHref: 'tel:+97470643918',
  mapsUrl: 'https://maps.app.goo.gl/1AyqAc2eTGRFqW8B7',
  crNumber: '250039', // Commercial Registration number (Qatar)
  // Example free subdomain shown in the QR 99 offer (client sites hosted on Cloudflare Pages).
  subdomainExample: 'yourshop.pages.dev',
  emails: {
    general: 'info@xenosysweb.com',
    sales: 'sales@xenosysweb.com',
    careers: 'hr@xenosysweb.com',
    finance: 'finance@xenosysweb.com',
    procurement: 'procurement@xenosysweb.com',
    marketing: 'marketing@xenosysweb.com',
  },
} as const

export function whatsappLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}