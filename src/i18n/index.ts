import ar from './ar'
import bn from './bn'
import en, { type Dict } from './en'
import hi from './hi'
import { DEFAULT_LANG, LANGUAGES, type LangCode, type Language } from './languages'
import ml from './ml'
import ne from './ne'
import ur from './ur'

/**
 * WhatsApp messages are sent in the visitor's language with the English underneath,
 * so the team can always read them (including Malayalam, Bengali and Nepali).
 */
function withEnglishMessages(t: Dict): Dict {
  return {
    ...t,
    wa: {
      ...t.wa,
      hello: `${t.wa.hello}\n(${en.wa.hello})`,
      likeThis: (name: string) => `${t.wa.likeThis(name)}\n(${en.wa.likeThis(name)})`,
    },
    offer: { ...t.offer, waMessage: `${t.offer.waMessage}\n(${en.offer.waMessage})` },
  }
}

const DICTS: Record<LangCode, Dict> = {
  en,
  ar: withEnglishMessages(ar),
  hi: withEnglishMessages(hi),
  ur: withEnglishMessages(ur),
  ml: withEnglishMessages(ml),
  bn: withEnglishMessages(bn),
  ne: withEnglishMessages(ne),
}

/** Languages that have a translation file (all of them now). */
export const AVAILABLE: Language[] = LANGUAGES.filter((language) => DICTS[language.code])

export function isAvailableLang(value: string | null | undefined): value is LangCode {
  return !!value && AVAILABLE.some((language) => language.code === value)
}

export function homePath(lang: LangCode) {
  return lang === DEFAULT_LANG ? '/' : `/${lang}`
}

export function getLang(code: LangCode) {
  const language = LANGUAGES.find((item) => item.code === code) ?? LANGUAGES[0]
  return {
    lang: language.code,
    dir: language.dir,
    native: language.native,
    english: language.english,
    t: DICTS[language.code],
    home: homePath(language.code),
  }
}

/** The best match for the visitor's phone or browser language, used to suggest one in the popup. */
export function suggestLang(): LangCode {
  if (typeof navigator === 'undefined') return DEFAULT_LANG
  const tags = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const tag of tags) {
    const base = tag?.toLowerCase().split('-')[0]
    if (isAvailableLang(base)) return base
  }
  return DEFAULT_LANG
}

export type LangContext = ReturnType<typeof getLang>
export type { Dict, LangCode }
export { DEFAULT_LANG, en as english }