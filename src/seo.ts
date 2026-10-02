import { SITE } from './data/site'
import { AVAILABLE, DEFAULT_LANG, getLang, homePath, type LangCode } from './i18n'

/*
  Everything Google, WhatsApp previews and other bots read about each page.
  Used at build time (scripts/prerender.mjs) and by the pages themselves.
*/

export const OG_IMAGE = '/og-image.jpg'

/** Titles and descriptions for the English-only pages. */
export const PAGE_META = {
  gm: {
    title: 'Message from the General Manager | Xenosys Solutions',
    description:
      'A message from Mohammed Fazlur Rahman, General Manager of Xenosys Solutions in Doha, with 30+ years of business experience including 16+ years in Qatar.',
  },
  privacy: {
    title: 'Privacy policy | Xenosys Solutions',
    description: 'How Xenosys Solutions collects, uses and protects the information you share with us.',
  },
  terms: {
    title: 'Terms and conditions | Xenosys Solutions',
    description: 'The terms for using the Xenosys Solutions website and our web design, hosting and software services.',
  },
  notFound: {
    title: 'Page not found | Xenosys Solutions',
    description: 'This page does not exist.',
  },
}

type PageKey = keyof typeof PAGE_META

export type RouteInfo =
  | { path: string; file: string; kind: 'home'; lang: LangCode }
  | { path: string; file: string; kind: 'page'; page: PageKey }
  | { path: string; file: string; kind: 'notFound' }

/** Every page that is built into its own HTML file. */
export const ROUTES: RouteInfo[] = [
  ...AVAILABLE.map((language): RouteInfo => ({
    path: homePath(language.code),
    // Cloudflare Pages serves ar.html at /ar (no trailing slash)
    file: language.code === DEFAULT_LANG ? 'index.html' : `${language.code}.html`,
    kind: 'home',
    lang: language.code,
  })),
  { path: '/gm-message', file: 'gm-message.html', kind: 'page', page: 'gm' },
  { path: '/privacy-policy', file: 'privacy-policy.html', kind: 'page', page: 'privacy' },
  { path: '/terms', file: 'terms.html', kind: 'page', page: 'terms' },
  { path: '/404', file: '404.html', kind: 'notFound' },
]

const OG_LOCALE: Record<LangCode, string> = {
  en: 'en_US',
  ar: 'ar_QA',
  hi: 'hi_IN',
  ur: 'ur_PK',
  ml: 'ml_IN',
  bn: 'bn_BD',
  ne: 'ne_NP',
}

const absolute = (path: string) => `${SITE.url}${path}`

function escapeAttr(value: string) {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function jsonLd(data: object) {
  // "<" is escaped so the JSON can never close the script tag early
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
}

/** Business details in the format Google uses for business search results. */
function businessData(lang: LangCode) {
  const t = getLang(lang).t
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': absolute('/#business'),
      name: SITE.name,
      url: absolute('/'),
      logo: absolute('/icon-512.png'),
      image: absolute(OG_IMAGE),
      description: getLang(DEFAULT_LANG).t.meta.description,
      telephone: '+97470643918',
      email: SITE.emails.general,
      identifier: { '@type': 'PropertyValue', propertyID: 'Qatar Commercial Registration', value: SITE.crNumber },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Icono Business Center, Holiday Villa Hotel, Muntaza',
        addressLocality: 'Doha',
        addressCountry: 'QA',
      },
      areaServed: { '@type': 'Country', name: 'Qatar' },
      hasMap: SITE.mapsUrl,
      availableLanguage: AVAILABLE.map((language) => language.english),
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+97470643918',
        email: SITE.emails.general,
        availableLanguage: AVAILABLE.map((language) => language.english),
      },
      makesOffer: {
        '@type': 'Offer',
        name: 'Startup Support Package',
        description: 'Complete website for 1 year with a free subdomain and free hosting, for new businesses in Qatar.',
        price: '99',
        priceCurrency: 'QAR',
        areaServed: { '@type': 'Country', name: 'Qatar' },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': absolute('/#website'),
      name: SITE.name,
      url: absolute('/'),
      inLanguage: lang,
      description: t.meta.description,
      publisher: { '@id': absolute('/#business') },
    },
  ]
}

function sharedTags(opts: { title: string; description: string; url?: string; locale: string; altLocales?: string[] }) {
  const tags = [
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${escapeAttr(SITE.name)}">`,
    `<meta property="og:title" content="${escapeAttr(opts.title)}">`,
    `<meta property="og:description" content="${escapeAttr(opts.description)}">`,
    `<meta property="og:image" content="${absolute(OG_IMAGE)}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="Xenosys Solutions: professional websites for businesses in Qatar">`,
    `<meta property="og:locale" content="${opts.locale}">`,
    ...(opts.altLocales ?? []).map((locale) => `<meta property="og:locale:alternate" content="${locale}">`),
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${escapeAttr(opts.title)}">`,
    `<meta name="twitter:description" content="${escapeAttr(opts.description)}">`,
    `<meta name="twitter:image" content="${absolute(OG_IMAGE)}">`,
  ]
  if (opts.url) tags.push(`<meta property="og:url" content="${opts.url}">`)
  return tags
}

/** The <head> tags, language and direction for one page. */
export function headFor(route: RouteInfo) {
  if (route.kind === 'home') {
    const { t, dir } = getLang(route.lang)
    const url = absolute(route.path)
    const tags = [
      `<title>${escapeAttr(t.meta.title)}</title>`,
      `<meta name="description" content="${escapeAttr(t.meta.description)}">`,
      `<meta name="robots" content="index, follow, max-image-preview:large">`,
      `<link rel="canonical" href="${url}">`,
      // Tells Google these pages are the same content in different languages
      ...AVAILABLE.map((language) => `<link rel="alternate" hreflang="${language.code}" href="${absolute(homePath(language.code))}">`),
      `<link rel="alternate" hreflang="x-default" href="${absolute('/')}">`,
      ...sharedTags({
        title: t.meta.title,
        description: t.meta.description,
        url,
        locale: OG_LOCALE[route.lang],
        altLocales: AVAILABLE.filter((language) => language.code !== route.lang).map((language) => OG_LOCALE[language.code]),
      }),
      ...businessData(route.lang).map(jsonLd),
    ]
    return { head: tags.join('\n    '), lang: route.lang, dir }
  }

  if (route.kind === 'page') {
    const meta = PAGE_META[route.page]
    const url = absolute(route.path)
    const tags = [
      `<title>${escapeAttr(meta.title)}</title>`,
      `<meta name="description" content="${escapeAttr(meta.description)}">`,
      `<meta name="robots" content="index, follow, max-image-preview:large">`,
      `<link rel="canonical" href="${url}">`,
      ...sharedTags({ title: meta.title, description: meta.description, url, locale: OG_LOCALE.en }),
    ]
    return { head: tags.join('\n    '), lang: DEFAULT_LANG, dir: 'ltr' as const }
  }

  const meta = PAGE_META.notFound
  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}">`,
    `<meta name="robots" content="noindex, follow">`,
  ]
  return { head: tags.join('\n    '), lang: DEFAULT_LANG, dir: 'ltr' as const }
}

/** sitemap.xml with every page, and the language versions of the home page linked together. */
export function sitemapXml(lastmod: string) {
  const alternates = [
    ...AVAILABLE.map(
      (language) => `    <xhtml:link rel="alternate" hreflang="${language.code}" href="${absolute(homePath(language.code))}"/>`,
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute('/')}"/>`,
  ].join('\n')

  const urls = ROUTES.filter((route) => route.kind !== 'notFound').map((route) => {
    const extra = route.kind === 'home' ? `\n${alternates}` : ''
    return `  <url>\n    <loc>${absolute(route.path)}</loc>\n    <lastmod>${lastmod}</lastmod>${extra}\n  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`
}