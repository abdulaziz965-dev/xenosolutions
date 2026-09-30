# Xenosys Solutions Website

Official website of Xenosys Solutions, a web design and development company based in Doha, Qatar.

**Live site:** [www.xenosysweb.com](https://www.xenosysweb.com)

The site presents Xenosys Solutions' services, recent client work and the Startup Support Package to small businesses and entrepreneurs in Qatar. It is available in seven languages, is fully pre-rendered for search engines, and is deployed on Cloudflare Pages.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [How the Build Works](#how-the-build-works)
- [Languages](#languages)
- [Editing Content](#editing-content)
- [Search Engine Optimisation](#search-engine-optimisation)
- [Deployment](#deployment)
- [Content Guidelines](#content-guidelines)
- [License](#license)

---

## Features

- **Seven languages:** English, Arabic, Hindi, Urdu, Malayalam, Bengali and Nepali, with right-to-left layout for Arabic and Urdu.
- **First-visit language selection:** visitors choose a language once; the choice is remembered on their device and can be changed at any time.
- **Pre-rendered pages:** every page is generated as static HTML at build time, so search engines and link previews can read the full content without running JavaScript.
- **Search engine optimisation:** per-page titles and descriptions, canonical URLs, `hreflang` language alternates, structured business data (Schema.org), Open Graph and social share tags, and an automatically generated sitemap.
- **WhatsApp-first contact:** WhatsApp buttons throughout the site, with pre-filled messages in the visitor's language followed by an English translation for the team.
- **Contact form:** delivered by email through EmailJS, with spam protection and duplicate-submission prevention.
- **Startup Support Package:** a dedicated offer section and site-wide announcement bar.
- **Live example site:** a working mobile website displayed inside an interactive phone mock-up on desktop.
- **Accessible and responsive:** keyboard navigable, screen-reader friendly, and designed mobile-first.

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Routing | React Router 7 |
| Styling | Plain CSS with custom properties (no CSS framework) |
| Forms | EmailJS |
| Fonts | Readex Pro and Noto Sans (Devanagari, Malayalam, Bengali, Nastaliq Urdu) via Google Fonts |
| Hosting | Cloudflare Pages |
| Package manager | pnpm |

The site has no backend and no database. All pages are static files.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 22 or later
- [pnpm](https://pnpm.io) 12 or later

Install pnpm if you do not have it:

```bash
npm install -g pnpm
```

### Installation

```bash
git clone https://github.com/abdulaziz965-dev/xenosolutions.git
cd xenosolutions
pnpm install
```

Create a `.env` file in the project root (see [Environment Variables](#environment-variables)), then start the development server:

```bash
pnpm dev
```

The site is available at `http://localhost:5173`. To test on a phone, connect it to the same Wi-Fi network and open the **Network** address shown in the terminal.

## Environment Variables

Create a file named `.env` in the project root. It is excluded from Git and must never be committed.

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxx
```

| Variable | Where to find it |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS dashboard, **Email Services** |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS dashboard, **Email Templates** |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS dashboard, **Account > General** |

If these are missing, the site still works, but the contact form shows a message asking visitors to use WhatsApp instead.

The EmailJS template receives the following fields: `{{name}}`, `{{phone}}`, `{{email}}`, `{{project}}`, `{{message}}` and `{{language}}`. The service name always arrives in English, whatever language the visitor used.

The same three variables must also be set in the Cloudflare Pages project settings. Restart `pnpm dev` after changing `.env`.

## Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Starts the development server with instant reload. |
| `pnpm build` | Type-checks the code, builds the site and pre-renders every page into `dist/`. |
| `pnpm preview` | Serves the production build locally for a final check. |

Always run `pnpm build` before pushing. It fails on any type error, which prevents broken code from reaching the live site.

## Project Structure

```
xenosolutions/
├── index.html                 HTML template (head tags are replaced per page at build time)
├── package.json
├── vite.config.ts
├── scripts/
│   └── prerender.mjs          Generates the static HTML pages and sitemap.xml after the build
├── public/                    Files copied to the site as they are
│   ├── _headers               Cloudflare Pages response headers (caching, security)
│   ├── _redirects             Cloudflare Pages redirects
│   ├── robots.txt             Crawler rules
│   ├── llms.txt               Plain-text site summary for AI assistants
│   ├── og-image.jpg           Share preview image (1200 x 630)
│   ├── site.webmanifest       Web app manifest
│   └── ...                    Favicons, logo and photographs
└── src/
    ├── main.tsx               Browser entry point
    ├── entry-server.tsx       Build-time entry point used for pre-rendering
    ├── App.tsx                Routes
    ├── seo.ts                 Page titles, descriptions, structured data and sitemap
    ├── index.css              All styles
    ├── components/            Header, footer, menus, language picker, icons and shared parts
    ├── sections/              Home page sections (hero, offer, services, customers, contact)
    ├── pages/                 Home, General Manager message, privacy policy, terms, 404
    ├── i18n/                  Language list and one text file per language
    ├── data/                  Contact details and the customer list
    └── hooks/                 Shared React hooks
```

## How the Build Works

`pnpm build` runs four steps:

1. **Type check:** `tsc --noEmit` verifies the TypeScript code.
2. **Client build:** Vite bundles the site into `dist/`.
3. **Server build:** Vite builds `src/entry-server.tsx` into a temporary `dist-server/` folder.
4. **Pre-render:** `scripts/prerender.mjs` renders every route to static HTML, inserts the correct head tags for each page, writes `sitemap.xml`, and removes `dist-server/`.

| Route | Output file |
| --- | --- |
| `/` | `dist/index.html` |
| `/ar`, `/hi`, `/ur`, `/ml`, `/bn`, `/ne` | `dist/ar.html`, `dist/hi.html`, and so on |
| `/gm-message` | `dist/gm-message.html` |
| `/privacy-policy` | `dist/privacy-policy.html` |
| `/terms` | `dist/terms.html` |
| Any unknown address | `dist/404.html` (served with a 404 status) |

When a page loads in the browser, React attaches to the pre-rendered HTML and the site becomes interactive.

## Languages

All visible text lives in `src/i18n/`, one file per language. `en.ts` is the reference file; every other language file must contain exactly the same keys.

| Code | Language | File | Direction |
| --- | --- | --- | --- |
| `en` | English | `en.ts` | Left to right |
| `ar` | Arabic | `ar.ts` | Right to left |
| `hi` | Hindi | `hi.ts` | Left to right |
| `ur` | Urdu | `ur.ts` | Right to left |
| `ml` | Malayalam | `ml.ts` | Left to right |
| `bn` | Bengali | `bn.ts` | Left to right |
| `ne` | Nepali | `ne.ts` | Left to right |

**Language behaviour**

- On the first visit, a language picker appears, with the visitor's device language suggested first. Search engines and link-preview bots never see it.
- The choice is saved in the browser's local storage under the key `xenosys-lang`. Returning visitors are taken straight to their saved language.
- Visitors can change language at any time from the globe button in the header, the language row in the hero, or the footer.
- A shared language link, such as `/hi`, opens in that language without overwriting the visitor's saved choice.
- The General Manager message, privacy policy and terms pages are in English only. Their header, menu and footer follow the visitor's chosen language.

**Changing text**

Open the relevant language file and edit the text between the quotes. The same key holds the same sentence in every file.

**Adding a language**

1. Copy `src/i18n/en.ts` to a new file, for example `ta.ts`, and translate the text.
2. Add the language to `src/i18n/languages.ts` (code, native name, English name, direction) and to the `LangCode` type.
3. Import it and add it to `DICTS` in `src/i18n/index.ts`.
4. Add the language code to the redirect script in `index.html` and to `public/_redirects`.
5. If the language uses a new script, add a matching Noto font to the Google Fonts link in `index.html` and a font rule in `src/index.css`.

The language menus, sitemap and `hreflang` tags update automatically.

**Removing a language** reverses the same steps.

All translations should be reviewed by a native speaker before publication.

## Editing Content

| What to change | File |
| --- | --- |
| Phone number, WhatsApp number, email addresses, map link | `src/data/site.ts` |
| Example website shown inside the phone | `demoUrl` in `src/data/site.ts` |
| Example subdomain in the Startup Support Package | `subdomainExample` in `src/data/site.ts` |
| Customer list | `src/data/customers.ts` |
| Page titles and descriptions for English-only pages | `PAGE_META` in `src/seo.ts` |
| Business details for search engines | `businessData` in `src/seo.ts` |
| Colours, fonts and spacing | `:root` at the top of `src/index.css` |

**Adding a customer**

Add an entry to `src/data/customers.ts`:

```ts
{
  id: 'new-customer',
  name: 'New Customer Name',
  initials: 'NC',
  type: 'salon',
  url: 'https://example.pages.dev/',
}
```

`type` must be one of the business types defined under `customers.types` in the language files. To add a new type, add it to the `CustomerType` list in `customers.ts` and translate it in every language file.

To show a screenshot instead of the initials, place an image in `public/work/` and add `image: '/work/new-customer.webp'` to the entry.

## Search Engine Optimisation

Each build produces:

- A unique title, description and canonical URL for every page.
- `hreflang` links connecting all seven language versions of the home page, plus an `x-default`.
- Schema.org structured data (`ProfessionalService` and `WebSite`) describing the business, contact details, languages and the Startup Support Package.
- Open Graph and Twitter tags with a 1200 x 630 share image.
- `sitemap.xml` listing every page with its language alternates.
- A `noindex` 404 page returned with a real 404 status.

`robots.txt` allows all crawlers and points to the sitemap.

**After each major launch**

1. Submit `https://www.xenosysweb.com/sitemap.xml` in Google Search Console.
2. Use **URL Inspection** to request indexing for key pages.
3. Import the site into Bing Webmaster Tools from Google Search Console.
4. Verify structured data with Google's Rich Results Test.

## Deployment

The site is hosted on **Cloudflare Pages** and deploys automatically on every push to `main`.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Environment variables | `NODE_VERSION=22` and the three `VITE_EMAILJS_*` variables |

Response headers are configured in `public/_headers` and redirects in `public/_redirects`. Pages on other branches receive a preview deployment on a `pages.dev` address.

**Before pushing to `main`**

1. Run `pnpm build` locally and confirm it completes without errors.
2. Check the site with `pnpm dev`, including at least one right-to-left language.
3. Never commit `.env`, `dist/` or `dist-server/`.

## Content Guidelines

These rules apply to all text on the website, in every language.

- **No guaranteed results.** The website must not promise or imply any number of customers, enquiries, sales, visits or search rankings. Describe what Xenosys Solutions delivers (the website, hosting, setup and support), not the results a client will get from it.
- **No government affiliation.** The Startup Support Package supports Qatar National Vision 2030 but is an independent offer. Do not use wording that suggests a partnership with, or endorsement by, any government body, and do not use government logos or the national emblem.
- **Clear pricing.** Package prices must state what is included. Renewal terms after the first year are agreed separately with each client and must not be described as free.
- **Plain language.** Write short, simple sentences suitable for readers of all backgrounds and reading levels.
- **Consistency across languages.** Any change to the English text must be made in every language file.

## License

Copyright © 2026 Xenosys Solutions. All rights reserved.

This repository and its contents are proprietary. No part of it may be copied, modified or distributed without written permission from Xenosys Solutions.