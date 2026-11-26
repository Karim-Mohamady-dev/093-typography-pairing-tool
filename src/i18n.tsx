import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import en from '../locales/en/common.json'
import ar from '../locales/ar/common.json'

export type Lang = 'en' | 'ar'
const dicts: Record<Lang, Record<string, unknown>> = { en: en as never, ar: ar as never }

function get(obj: Record<string, unknown>, path: string): string {
  let cur: unknown = obj
  for (const part of path.split('.')) {
    if (cur && typeof cur === 'object') cur = (cur as Record<string, unknown>)[part]
    else return path
  }
  return typeof cur === 'string' ? cur : path
}

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: 'en', setLang: () => undefined, t: (k) => k,
})

export function LangProvider({ children, storageKey }: { children: ReactNode; storageKey: string }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try { return (localStorage.getItem(storageKey) as Lang) || 'en' } catch { return 'en' }
  })
  useEffect(() => {
    try { localStorage.setItem(storageKey, lang) } catch { /* ignore */ }
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang, storageKey])
  const value = useMemo(() => ({
    lang,
    setLang: setLangState,
    t: (k: string) => get(dicts[lang], k),
  }), [lang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useI18n() { return useContext(Ctx) }

export function LangSwitcher() {
  const { lang, setLang } = useI18n()
  return (
    <div className="flex rounded-full border border-line p-1" role="group" aria-label="Language">
      {(['en', 'ar'] as Lang[]).map((l) => (
        <button key={l} type="button" onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`button-sm rounded-full px-3 py-1 motion-hover ${lang === l ? 'bg-ink text-white' : 'text-ink'}`}>
          {l === 'en' ? 'English' : 'العربية'}
        </button>
      ))}
    </div>
  )
}
