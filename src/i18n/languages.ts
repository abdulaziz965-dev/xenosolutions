export type LangCode = 'en' | 'ar' | 'hi' | 'ur' | 'ml' | 'bn' | 'ne'

export type Language = {
  code: LangCode
  native: string // what the visitor sees in the language menu
  english: string
  dir: 'ltr' | 'rtl'
}

export const LANGUAGES: Language[] = [
  { code: 'en', native: 'English', english: 'English', dir: 'ltr' },
  { code: 'ar', native: 'العربية', english: 'Arabic', dir: 'rtl' },
  { code: 'hi', native: 'हिन्दी', english: 'Hindi', dir: 'ltr' },
  { code: 'ur', native: 'اردو', english: 'Urdu', dir: 'rtl' },
  { code: 'ml', native: 'മലയാളം', english: 'Malayalam', dir: 'ltr' },
  { code: 'bn', native: 'বাংলা', english: 'Bengali', dir: 'ltr' },
  { code: 'ne', native: 'नेपाली', english: 'Nepali', dir: 'ltr' },
]

export const DEFAULT_LANG: LangCode = 'en'