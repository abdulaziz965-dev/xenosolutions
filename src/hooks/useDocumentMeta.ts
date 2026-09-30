import { useEffect } from 'react'

type Meta = { title: string; description: string; noindex?: boolean }

function setMeta(name: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.name = name
    document.head.appendChild(tag)
  }
  tag.content = content
}

/** Sets the browser tab title, the Google description and the robots rule for the current page. */
export default function useDocumentMeta({ title, description, noindex = false }: Meta) {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setMeta('robots', noindex ? 'noindex, follow' : 'index, follow')
  }, [title, description, noindex])
}