import { useEffect, useRef, useState } from 'react'
import { ArrowsLeftRight, Check, Copy, FloppyDisk, Scales, Trash, X } from '@phosphor-icons/react'
import { LangProvider, LangSwitcher, useI18n } from './i18n'

export type Style = 'modern' | 'editorial' | 'friendly'
export interface Pairing {
  id: string
  name: string
  style: Style
  headingFont: 'Poppins' | 'Manrope' | 'Geist' | 'Geist Mono'
  bodyFont: 'Poppins' | 'Manrope' | 'Geist' | 'Geist Mono'
  headingWeight: number
  bodyWeight: number
  headingSize: number
  bodySize: number
  noteEn: string
  noteAr: string
}

export const pairings: Pairing[] = [
  { id: 'p1', name: 'Poppins + Manrope', style: 'modern', headingFont: 'Poppins', bodyFont: 'Manrope', headingWeight: 600, bodyWeight: 400, headingSize: 48, bodySize: 16, noteEn: 'Geometric headings with a warm, open body. Suits product pages.', noteAr: 'عناوين هندسية مع نص دافئ ومفتوح. يناسب صفحات المنتجات.' },
  { id: 'p2', name: 'Geist + Geist Mono', style: 'editorial', headingFont: 'Geist', bodyFont: 'Geist Mono', headingWeight: 600, bodyWeight: 400, headingSize: 44, bodySize: 15, noteEn: 'Clean headings with a technical mono body. Suits docs and tools.', noteAr: 'عناوين نظيفة مع نص أحادي تقني. يناسب الوثائق والأدوات.' },
  { id: 'p3', name: 'Manrope + Manrope', style: 'friendly', headingFont: 'Manrope', bodyFont: 'Manrope', headingWeight: 700, bodyWeight: 400, headingSize: 46, bodySize: 17, noteEn: 'One family, two weights. Calm and consistent for long reads.', noteAr: 'عائلة واحدة ووزنان. هادئ ومتسق للقراءات الطويلة.' },
  { id: 'p4', name: 'Poppins + Geist', style: 'modern', headingFont: 'Poppins', bodyFont: 'Geist', headingWeight: 600, bodyWeight: 400, headingSize: 50, bodySize: 16, noteEn: 'Bold rounded headings with a neutral body. Suits landing pages.', noteAr: 'عناوين جريئة مستديرة مع نص محايد. يناسب الصفحات التعريفية.' },
  { id: 'p5', name: 'Geist + Manrope', style: 'editorial', headingFont: 'Geist', bodyFont: 'Manrope', headingWeight: 600, bodyWeight: 500, headingSize: 44, bodySize: 16, noteEn: 'Quiet headings with a readable medium body. Suits articles.', noteAr: 'عناوين هادئة مع نص متوسط قابل للقراءة. يناسب المقالات.' },
  { id: 'p6', name: 'Manrope + Poppins', style: 'friendly', headingFont: 'Manrope', bodyFont: 'Poppins', headingWeight: 700, bodyWeight: 400, headingSize: 46, bodySize: 15, noteEn: 'Warm headings with a soft rounded body. Suits community pages.', noteAr: 'عناوين دافئة مع نص مستدير ناعم. يناسب صفحات المجتمع.' },
]

export function fontClass(font: Pairing['headingFont']): string {
  if (font === 'Poppins') return 'font-poppins'
  if (font === 'Manrope') return 'font-manrope'
  if (font === 'Geist Mono') return 'font-geist-mono'
  return 'font-geist'
}

const LS = 'typepair-saved-v1'

function Tagline() {
  const { t } = useI18n()
  const ref = useRef<HTMLParagraphElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); ob.disconnect() } }, { threshold: 0.3 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [])
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center">
      <p ref={ref} className="heading-3" aria-label={t('tagline')}>
        {t('tagline').split(' ').map((w, i) => (
          <span key={i} className="motion-base inline-block me-2" style={{ opacity: visible ? 1 : 0.3, transitionDelay: `${Math.min(i * 60, 600)}ms` }}>{w}</span>
        ))}
      </p>
    </section>
  )
}

function Preview({ p, layout, headingSize, bodySize }: { p: Pairing; layout: 'hero' | 'article' | 'card'; headingSize: number; bodySize: number }) {
  const { t } = useI18n()
  const hStyle = { fontFamily: `'${p.headingFont}', sans-serif`, fontWeight: p.headingWeight, fontSize: `${headingSize}px`, lineHeight: 1.1 }
  const bStyle = { fontFamily: `'${p.bodyFont}', sans-serif`, fontWeight: p.bodyWeight, fontSize: `${bodySize}px`, lineHeight: 1.6 }
  if (layout === 'hero') {
    return (
      <div className="rounded-2xl bg-ink p-6 text-white sm:p-8">
        <p className="caption-4 text-neutral-400">{p.headingFont} / {p.bodyFont}</p>
        <h3 style={hStyle} className="mt-4 max-w-xl">{t('pairing.sampleHeading')}</h3>
        <p style={bStyle} className="mt-4 max-w-xl text-neutral-300">{t('pairing.sampleBody')}</p>
      </div>
    )
  }
  if (layout === 'article') {
    return (
      <div className="rounded-2xl border border-line p-6 sm:p-8">
        <h3 style={hStyle}>{t('pairing.sampleHeading')}</h3>
        <p style={bStyle} className="mt-4 text-neutral-600">{t('pairing.sampleBody')}</p>
        <p style={bStyle} className="mt-4 text-neutral-600">{t('pairing.sampleBody')}</p>
      </div>
    )
  }
  return (
    <div className="max-w-sm rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h3 style={{ ...hStyle, fontSize: `${Math.round(headingSize * 0.6)}px` }}>{t('pairing.sampleHeading')}</h3>
      <p style={bStyle} className="mt-3 text-neutral-600">{t('pairing.sampleBody')}</p>
      <span className="button-sm mt-4 inline-block rounded-xl bg-ink px-3 py-2 text-white">{t('pairing.use')}</span>
    </div>
  )
}

function PairingCard({ p, onOpen, inCompare, onToggleCompare, saved, onSave }: {
  p: Pairing; onOpen: () => void; inCompare: boolean; onToggleCompare: () => void; saved: boolean; onSave: () => void
}) {
  const { t, lang } = useI18n()
  return (
    <article className="motion-hover flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 hover:shadow-lg">
      <div className="rounded-xl border border-line p-4">
        <h3 className={fontClass(p.headingFont)} style={{ fontWeight: p.headingWeight, fontSize: 24, lineHeight: 1.2 }}>{t('pairing.sampleHeading')}</h3>
        <p className={fontClass(p.bodyFont)} style={{ fontWeight: p.bodyWeight, fontSize: 14, lineHeight: 1.6, color: '#525252' }}>{t('pairing.sampleBody')}</p>
      </div>
      <div>
        <h4 className="title-2">{p.name}</h4>
        <p className="caption-2 mt-1 text-neutral-500">{t(`filters.${p.style}`)} · {t('pairing.headingFont')}: {p.headingFont} · {t('pairing.bodyFont')}: {p.bodyFont}</p>
        <p className="body-6 mt-2 text-neutral-600">{lang === 'ar' ? p.noteAr : p.noteEn}</p>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        <button type="button" onClick={onOpen} className="button-sm motion-hover rounded-xl bg-ink px-3 py-2 text-white active:scale-[0.98]">{t('pairing.preview')}</button>
        <button type="button" onClick={onToggleCompare} aria-pressed={inCompare} className={`button-sm motion-hover flex items-center gap-1 rounded-xl border px-3 py-2 ${inCompare ? 'border-accent bg-accent-soft text-accent' : 'border-line'}`}>
          <Scales size={16} /> {t('compare.add')}
        </button>
        <button type="button" onClick={onSave} className="button-sm motion-hover flex items-center gap-1 rounded-xl border border-line px-3 py-2">
          <FloppyDisk size={16} /> {saved ? t('pairing.saved') : t('pairing.savePairing')}
        </button>
      </div>
    </article>
  )
}

function AppInner() {
  const { t } = useI18n()
  const [style, setStyle] = useState<'all' | Style>('all')
  const [selected, setSelected] = useState<Pairing | null>(null)
  const [layout, setLayout] = useState<'hero' | 'article' | 'card'>('hero')
  const [headingSize, setHeadingSize] = useState(48)
  const [bodySize, setBodySize] = useState(16)
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [showCompare, setShowCompare] = useState(false)
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(LS) || '[]') as string[] } catch { return [] }
  })
  const [copied, setCopied] = useState(false)
  useEffect(() => { try { localStorage.setItem(LS, JSON.stringify(savedIds)) } catch { /* ignore */ } }, [savedIds])
  useEffect(() => { if (selected) { setHeadingSize(selected.headingSize); setBodySize(selected.bodySize) } }, [selected])

  const filtered = pairings.filter((p) => style === 'all' || p.style === style)
  const compareList = pairings.filter((p) => compareIds.includes(p.id))
  const savedList = pairings.filter((p) => savedIds.includes(p.id))
  const toggleCompare = (id: string) => setCompareIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : prev.length >= 3 ? prev : [...prev, id])
  const copyCss = async (p: Pairing) => {
    const css = `/* ${p.name} */\n--font-heading: '${p.headingFont}', sans-serif;\n--font-body: '${p.bodyFont}', sans-serif;\nh1 { font-family: var(--font-heading); font-weight: ${p.headingWeight}; }\nbody { font-family: var(--font-body); font-weight: ${p.bodyWeight}; }`
    try { await navigator.clipboard.writeText(css) } catch { /* ignore */ }
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:p-4">Skip to content</a>
      <header className="sticky top-4 z-40 mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 rounded-2xl border border-line bg-white/90 px-4 py-2 shadow-sm backdrop-blur">
        <a href="#" className="title-1 font-semibold text-accent">{t('app.name')}</a>
        <nav className="hidden items-center gap-4 md:flex" aria-label="Main">
          <a href="#pairings" className="title-4">{t('nav.pairings')}</a>
          <a href="#how" className="title-4">{t('nav.how')}</a>
          <a href="#faq" className="title-4">{t('nav.faq')}</a>
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setShowCompare((v) => !v)} className="button-sm motion-hover flex items-center gap-1 rounded-full border border-line px-3 py-2">
            <Scales size={16} /> {t('nav.compare')} ({compareIds.length})
          </button>
          <LangSwitcher />
        </div>
      </header>

      <main id="main">
        <section className="mx-auto max-w-3xl px-4 pt-16 pb-8 text-center sm:pt-24">
          <p className="caption-4 inline-block rounded-full bg-accent-soft px-3 py-1 text-accent">{t('hero.proof')}</p>
          <h1 className="heading-1 hero-gradient-light mx-auto mt-6 max-w-[680px]">{t('hero.title')}</h1>
          <p className="body-3 mx-auto mt-6 max-w-[680px] text-neutral-600">{t('hero.subtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#pairings" className="button-md motion-hover rounded-xl bg-accent px-3 py-2 text-white active:scale-[0.98]">{t('hero.cta')}</a>
            <a href="#how" className="button-md motion-hover rounded-xl border border-line px-3 py-2 active:scale-[0.98]">{t('hero.ctaSecondary')}</a>
          </div>
        </section>

        <Tagline />

        <section id="pairings" className="mx-auto max-w-6xl px-4 pb-16">
          <div className="flex flex-wrap gap-2" role="group" aria-label={t('filters.style')}>
            {(['all', 'modern', 'editorial', 'friendly'] as const).map((s) => (
              <button key={s} type="button" onClick={() => setStyle(s)} aria-pressed={style === s}
                className={`button-sm motion-hover rounded-full border px-3 py-2 ${style === s ? 'border-accent bg-accent text-white' : 'border-line'}`}>
                {t(`filters.${s}`)}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PairingCard key={p.id} p={p} onOpen={() => setSelected(p)}
                inCompare={compareIds.includes(p.id)} onToggleCompare={() => toggleCompare(p.id)}
                saved={savedIds.includes(p.id)}
                onSave={() => setSavedIds((prev) => prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id])} />
            ))}
          </div>
        </section>

        {showCompare && (
          <section className="mx-auto max-w-6xl px-4 pb-16" aria-label={t('compare.title')}>
            <div className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
              <div className="flex items-center justify-between gap-2">
                <h2 className="heading-6 flex items-center gap-2"><ArrowsLeftRight size={20} /> {t('compare.title')}</h2>
                <button type="button" onClick={() => setCompareIds([])} className="button-sm rounded-xl border border-line px-3 py-2">{t('compare.clear')}</button>
              </div>
              {compareList.length === 0 ? (
                <p className="body-3 mt-4 text-neutral-600">{t('compare.empty')}</p>
              ) : (
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {compareList.map((p) => (
                    <div key={p.id} className="rounded-2xl border border-line bg-white p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="title-3">{p.name}</h3>
                        <button type="button" onClick={() => toggleCompare(p.id)} aria-label={t('compare.remove')} className="rounded-full border border-line p-1"><X size={14} /></button>
                      </div>
                      <h4 className={fontClass(p.headingFont)} style={{ fontWeight: p.headingWeight, fontSize: 22, lineHeight: 1.2, marginTop: 12 }}>{t('pairing.sampleHeading')}</h4>
                      <p className={fontClass(p.bodyFont)} style={{ fontWeight: p.bodyWeight, fontSize: 14, lineHeight: 1.6, color: '#525252', marginTop: 8 }}>{t('pairing.sampleBody')}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section id="saved" className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="heading-3">{t('saved.title')}</h2>
          {savedList.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-line bg-surface p-8 text-center">
              <p className="title-1">{t('saved.empty')}</p>
              <p className="body-3 mt-2 text-neutral-600">{t('saved.emptyHint')}</p>
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedList.map((p) => (
                <article key={p.id} className="rounded-2xl border border-line bg-white p-4">
                  <h3 className="title-2">{p.name}</h3>
                  <p className="caption-2 mt-1 text-neutral-500">{p.headingFont} / {p.bodyFont}</p>
                  <div className="mt-4 flex gap-2">
                    <button type="button" onClick={() => setSelected(p)} className="button-sm motion-hover rounded-xl bg-ink px-3 py-2 text-white">{t('saved.load')}</button>
                    <button type="button" onClick={() => setSavedIds((prev) => prev.filter((x) => x !== p.id))} aria-label={t('common.delete')} className="rounded-xl border border-line p-2"><Trash size={16} /></button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section id="how" className="bg-surface py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="heading-3 text-center">{t('how.title')}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {(['s1', 's2', 's3'] as const).map((s, i) => (
                <article key={s} className="rounded-2xl border border-line bg-white p-6">
                  <p className="heading-5 text-accent">{i + 1}</p>
                  <h3 className="title-1 mt-4">{t(`how.${s}t`)}</h3>
                  <p className="body-3 mt-2 text-neutral-600">{t(`how.${s}d`)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-3xl px-4 pb-16 pt-16">
          <h2 className="heading-3 text-center">{t('faq.title')}</h2>
          <div className="mt-8 flex flex-col gap-4">
            {(['q1', 'q2', 'q3'] as const).map((q, i) => (
              <details key={q} className="rounded-2xl border border-line p-4">
                <summary className="title-3 cursor-pointer">{t(`faq.${q}`)}</summary>
                <p className="body-3 mt-2 text-neutral-600">{t(`faq.a${i + 1}`)}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-line py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between">
          <p className="caption-2 text-neutral-500">{t('footer.note')}</p>
          <div className="flex gap-4">
            <a href="#" className="caption-2">{t('footer.privacy')}</a>
            <a href="#" className="caption-2">{t('footer.terms')}</a>
          </div>
        </div>
      </footer>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center" role="dialog" aria-modal="true" aria-label={selected.name} onClick={() => setSelected(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="heading-6">{selected.name}</h2>
                <p className="caption-2 mt-1 text-neutral-500">{t('pairing.headingFont')}: {selected.headingFont} · {t('pairing.bodyFont')}: {selected.bodyFont}</p>
              </div>
              <button type="button" onClick={() => setSelected(null)} aria-label={t('common.close')} className="rounded-full border border-line p-2"><X size={18} /></button>
            </div>
            <div className="mt-4 flex gap-2" role="group" aria-label={t('preview.title')}>
              {(['hero', 'article', 'card'] as const).map((l) => (
                <button key={l} type="button" onClick={() => setLayout(l)} aria-pressed={layout === l}
                  className={`button-sm motion-hover rounded-full border px-3 py-2 ${layout === l ? 'border-accent bg-accent text-white' : 'border-line'}`}>{t(`preview.${l}`)}</button>
              ))}
            </div>
            <div className="mt-4"><Preview p={selected} layout={layout} headingSize={headingSize} bodySize={bodySize} /></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="title-4">{t('pairing.headingFont')} — {headingSize}px</span>
                <input type="range" min={28} max={64} value={headingSize} onChange={(e) => setHeadingSize(+e.target.value)} className="w-full accent-[#b45309]" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="title-4">{t('pairing.bodyFont')} — {bodySize}px</span>
                <input type="range" min={13} max={20} value={bodySize} onChange={(e) => setBodySize(+e.target.value)} className="w-full accent-[#b45309]" />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <button type="button" onClick={() => copyCss(selected)} className="button-sm motion-hover flex items-center gap-1 rounded-xl border border-line px-3 py-2">
                {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />} {copied ? t('common.copied') : t('pairing.copyCss')}
              </button>
              <button type="button" onClick={() => setSavedIds((prev) => prev.includes(selected.id) ? prev : [...prev, selected.id])} className="button-sm motion-hover flex items-center gap-1 rounded-xl bg-accent px-3 py-2 text-white">
                <FloppyDisk size={16} /> {t('pairing.savePairing')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function App() {
  return <LangProvider storageKey="typepair-lang"><AppInner /></LangProvider>
}
