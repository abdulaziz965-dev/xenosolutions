// Runs after `vite build`. Turns every page into plain HTML (for Google and other bots) and writes sitemap.xml.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const serverDir = path.join(root, 'dist-server')

const { render, ROUTES, sitemapXml } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const SEO_BLOCK = /<!--seo-start-->[\s\S]*?<!--seo-end-->/
const HTML_TAG = /<html lang="[^"]*" dir="[^"]*">/

if (!SEO_BLOCK.test(template) || !HTML_TAG.test(template) || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing <html lang dir>, <!--seo-start-->...<!--seo-end--> or <!--app-html-->')
}

for (const route of ROUTES) {
  const { html, head, lang, dir } = render(route)
  const page = template
    .replace(HTML_TAG, () => `<html lang="${lang}" dir="${dir}">`)
    .replace(SEO_BLOCK, () => head)
    .replace('<!--app-html-->', () => html)
  const file = path.join(dist, route.file)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, page)
  console.log(`  prerendered ${route.path.padEnd(16)} -> dist/${route.file}`)
}

fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemapXml(new Date().toISOString().slice(0, 10)))
console.log('  wrote dist/sitemap.xml')

fs.rmSync(serverDir, { recursive: true, force: true }) // temporary build output, not deployed