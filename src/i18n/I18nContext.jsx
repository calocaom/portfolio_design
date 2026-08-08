import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { LANGUAGES, translations } from './translations'

const STORAGE_KEY = 'portfolio-lang'
const I18nContext = createContext(null)

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && translations[saved]) return saved
  } catch {
    /* ignore */
  }
  return 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const value = useMemo(() => {
    const dict = translations[lang] ?? translations.en

    function t(path) {
      return path.split('.').reduce((acc, key) => {
        if (acc == null) return undefined
        return acc[key]
      }, dict)
    }

    function setLang(code) {
      if (translations[code]) setLangState(code)
    }

    return {
      lang,
      setLang,
      languages: LANGUAGES,
      t,
      dict,
    }
  }, [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
