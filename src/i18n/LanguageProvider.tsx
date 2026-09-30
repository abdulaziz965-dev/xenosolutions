import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_LANG, getLang, isAvailableLang, type LangCode, type LangContext } from './index'

/** Key used in the visitor's browser storage. The same key is read by the small script in index.html. */
export const STORAGE_KEY = 'xenosys-lang'

type LanguagePreference = {
  saved: LangCode | null // the language the visitor chose, or null on their first visit
  ready: boolean // false until the browser storage has been read
  choose: (code: LangCode) => void // saves a choice
}

const Preference = createContext<LanguagePreference>({ saved: null, ready: false, choose: () => {} })

function readSaved(): LangCode | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return isAvailableLang(value) ? value : null
  } catch {
    return null // storage blocked (private mode on some phones): just ask again next time
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<LangCode | null>(null)
  const [ready, setReady] = useState(false)

  // Read storage after the first render so the pre-rendered HTML (Phase 3) matches.
  useEffect(() => {
    setSaved(readSaved())
    setReady(true)
  }, [])

  const choose = useCallback((code: LangCode) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      // storage blocked: the choice still applies for this visit
    }
    setSaved(code)
  }, [])

  const value = useMemo(() => ({ saved, ready, choose }), [saved, ready, choose])
  return <Preference.Provider value={value}>{children}</Preference.Provider>
}

export function useLanguagePreference() {
  return useContext(Preference)
}

/**
 * For pages that exist only in English (GM message, privacy, terms, 404):
 * the header, menu and footer follow the visitor's saved language.
 */
export function useChromeLang(): LangContext {
  const { saved } = useLanguagePreference()
  return getLang(saved ?? DEFAULT_LANG)
}