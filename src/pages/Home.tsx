import Marquee from '../components/Marquee'
import Shell from '../components/Shell'
import useDocumentMeta from '../hooks/useDocumentMeta'
import type { LangContext } from '../i18n'
import Contact from '../sections/Contact'
import Customers from '../sections/Customers'
import Hero from '../sections/Hero'
import Manager from '../sections/Manager'
import Offer from '../sections/Offer'
import Process from '../sections/Process'
import Services from '../sections/Services'

export default function Home({ ctx }: { ctx: LangContext }) {
  useDocumentMeta({ title: ctx.t.meta.title, description: ctx.t.meta.description })
  return (
    <Shell ctx={ctx} isHome>
      <Hero ctx={ctx} />
      <Offer t={ctx.t} />
      <Marquee items={ctx.t.services.items.map((item) => item.title)} />
      <Services t={ctx.t} />
      <Customers t={ctx.t} />
      <Process t={ctx.t} />
      <Manager t={ctx.t} />
      <Contact t={ctx.t} lang={ctx.lang} />
    </Shell>
  )
}