import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'
import { headFor, ROUTES, sitemapXml, type RouteInfo } from './seo'

/** Used only at build time by scripts/prerender.mjs to turn each page into plain HTML. */
export function render(route: RouteInfo) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={route.path}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
  return { html, ...headFor(route) }
}

export { ROUTES, sitemapXml }