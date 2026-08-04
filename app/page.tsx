'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DisplayCards from '@/components/ui/display-cards'
import { Component as SkyDeckBadge } from '@/components/ui/backed-by-yc'
import {
  FileSearch, Zap, FileText, FileSpreadsheet, Check, Plus,
  TriangleAlert, Download, TrendingDown, CornerDownRight, Mic,
} from 'lucide-react'

/* ── HERO BACKGROUND MEDIA ──
   Drop a file into /public and point this at it. Nothing else needs to change:
     image → { type: 'image', src: '/hero.jpg' }
     video → { type: 'video', src: '/hero.mp4', poster: '/hero-poster.jpg' }
   While type is 'none' the hero sits on the page background and the copy stays
   theme-aware. As soon as media is set, the scrim turns on and the copy locks to
   light so it holds over any footage. */
const HERO_MEDIA: { type: 'none' | 'image' | 'video'; src: string; poster?: string } = {
  type: 'image',
  src: '/hero.jpg',
}

const heroMediaStyle: React.CSSProperties = {
  position: 'absolute', inset: 0, zIndex: 0,
  width: '100%', height: '100%',
  objectFit: 'cover', objectPosition: 'center',
  pointerEvents: 'none',
}

/* ── THEME HOOK ── */
function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  useEffect(() => {
    const update = () => setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
    update()
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])
  return theme
}

/* ── STAGE CARDS ── */
const STAGE_CARDS = [
  {
    icon: <FileSearch size={16} style={{ color: 'var(--accent)' }} />,
    title: '01 Prepare',
    description: 'AI case analysis & deposition outlines',
    date: 'Pre-deposition',
    className: '[grid-area:stack] display-card-bg hover:-translate-y-10 before:left-0 before:top-0',
  },
  {
    icon: <Zap size={16} style={{ color: 'var(--accent)' }} />,
    title: '02 Depose',
    description: 'Live contradiction detection in real time',
    date: 'In the room',
    className: '[grid-area:stack] translate-x-16 translate-y-10 display-card-bg hover:-translate-y-1 before:left-0 before:top-0',
  },
  {
    icon: <FileText size={16} style={{ color: 'var(--accent)' }} />,
    title: '03 Review',
    description: 'Impeachment briefs, auto-generated',
    date: 'Post-deposition',
    className: '[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10',
  },
]

/* ── SCROLL REVEAL ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ── FEATURE VIS: Case File Ingest ── */
const CASE_FILES = [
  { name: 'Harmon_Depo_Vol_I.pdf',  meta: '214 pp',    Icon: FileText },
  { name: 'Calloway_Agreement.pdf', meta: '31 pp',     Icon: FileText },
  { name: 'Badge_Access_Log.xlsx',  meta: '1,204 rows', Icon: FileSpreadsheet },
  { name: 'Exhibit_07.pdf',         meta: '4 pp',      Icon: FileText },
]

function VisUpload({ active, theme }: { active: boolean; theme: 'dark' | 'light' }) {
  const [done, setDone] = useState(0)
  const [summary, setSummary] = useState(false)
  const light = theme === 'light'

  useEffect(() => {
    if (!active) return
    let cancelled = false
    const timers: NodeJS.Timeout[] = []
    function run() {
      if (cancelled) return
      setDone(0); setSummary(false)
      const step = 460
      CASE_FILES.forEach((_, i) => {
        timers.push(setTimeout(() => { if (!cancelled) setDone(i + 1) }, 420 + i * step))
      })
      const settled = 420 + CASE_FILES.length * step
      timers.push(setTimeout(() => { if (!cancelled) setSummary(true) }, settled))
      timers.push(setTimeout(run, settled + 2600))
    }
    run()
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [active])

  const cardBg    = light ? 'var(--bg-card)'      : '#0d0d0d'
  const border    = light ? 'var(--border)'        : 'rgba(255,255,255,0.07)'
  const borderSub = light ? 'var(--border)'        : 'rgba(255,255,255,0.05)'
  const rowBor    = light ? 'var(--border)'        : 'rgba(255,255,255,0.04)'
  const labelCol  = light ? 'var(--text-dim)'      : 'rgba(200,200,200,0.3)'
  const nameCol   = light ? 'var(--text-muted)'    : 'rgba(215,215,215,0.75)'
  const metaCol   = light ? 'var(--text-dim)'      : 'rgba(200,200,200,0.28)'
  const trackCol  = light ? 'rgba(0,0,0,0.08)'     : 'rgba(255,255,255,0.05)'
  const btnBor    = light ? 'var(--border-mid)'    : 'rgba(255,255,255,0.14)'

  const pct = Math.round((done / CASE_FILES.length) * 100)

  return (
    <div style={{ width: 280 }}>
      <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '8px 14px', borderBottom: `1px solid ${borderSub}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 300, color: labelCol, letterSpacing: '0.06em' }}>Case Files</span>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 4,
            border: `1px solid ${btnBor}`, borderRadius: 3, padding: '3px 8px',
            fontFamily: 'var(--font-sans)', fontSize: '0.55rem', fontWeight: 300,
            color: labelCol, letterSpacing: '0.04em',
          }}>
            <Plus size={8} strokeWidth={1.6} /> Upload
          </span>
        </div>

        {/* File rows */}
        <div style={{ padding: '6px 14px 10px' }}>
          {CASE_FILES.map((f, i) => {
            const complete = i < done
            const reading  = i === done
            return (
              <div key={f.name} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 0',
                borderBottom: i < CASE_FILES.length - 1 ? `1px solid ${rowBor}` : 'none',
                opacity: complete ? 1 : reading ? 0.85 : 0.35,
                transition: 'opacity 0.4s ease',
              }}>
                <f.Icon size={11} strokeWidth={1.3} style={{
                  color: complete ? 'rgba(200,169,110,0.7)' : metaCol,
                  flexShrink: 0, transition: 'color 0.4s ease',
                }} />
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.66rem', fontWeight: 300,
                  color: nameCol, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{f.name}</span>
                <span style={{ fontFamily: 'monospace', fontSize: '0.48rem', color: metaCol, flexShrink: 0 }}>{f.meta}</span>
                <span style={{ width: 10, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                  {complete ? (
                    <Check size={10} strokeWidth={2} style={{ color: 'rgba(200,169,110,0.75)' }} />
                  ) : reading ? (
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(200,169,110,0.8)', animation: 'pulse 1s ease-in-out infinite' }} />
                  ) : null}
                </span>
              </div>
            )
          })}
        </div>

        {/* Cross-reference progress */}
        <div style={{ padding: '0 14px 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.58rem', fontWeight: 300, color: labelCol, letterSpacing: '0.04em' }}>
              {summary ? 'Cross-referenced' : 'Cross-referencing'}
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(200,169,110,0.7)' }}>{pct}%</span>
          </div>
          <div style={{ height: 2, background: trackCol, borderRadius: 1, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${pct}%`, borderRadius: 1,
              background: 'linear-gradient(90deg, rgba(200,169,110,0.45), rgba(200,169,110,0.9))',
              transition: 'width 0.5s cubic-bezier(.4,0,.2,1)',
            }}/>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '7px 14px', borderTop: `1px solid ${borderSub}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 27 }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: metaCol, letterSpacing: '0.02em' }}>
            4 files · 249 pp · 1,204 rows
          </span>
          {summary && (
            <span style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.5rem', fontWeight: 300,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'rgba(231,76,60,0.8)',
              background: 'rgba(192,57,43,0.08)',
              border: '1px solid rgba(192,57,43,0.2)',
              borderRadius: 3, padding: '2px 7px',
              animation: 'fadeUpFast 0.3s ease forwards',
            }}>
              2 conflicts
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── FEATURE VIS: Live Transcription ── */
const LIVE_LINES = [
  { s: 'Q', ref: '4:08', t: 'Were you present on March 14th?', q: true },
  { s: 'A', ref: '4:09', t: "Yes. I arrived around six o'clock.", q: false },
  { s: 'Q', ref: '4:11', t: 'Did you see Mr. Calloway?', q: true },
  { s: 'A', ref: '4:12', t: 'No. I never saw Calloway there.', q: false },
  { s: 'Q', ref: '4:14', t: 'Your badge log shows otherwise.', q: true, suggested: true },
]

function VisTranscript({ active, theme }: { active: boolean; theme: 'dark' | 'light' }) {
  const [shown, setShown] = useState(0)
  const light = theme === 'light'

  useEffect(() => {
    if (!active) return
    let cancelled = false
    const timers: NodeJS.Timeout[] = []
    function run() {
      if (cancelled) return
      setShown(0)
      let t = 500
      LIVE_LINES.forEach((l, i) => {
        timers.push(setTimeout(() => { if (!cancelled) setShown(i + 1) }, t))
        t += l.q ? 1250 : 1550
      })
      timers.push(setTimeout(run, t + 2100))
    }
    run()
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [active])

  const cardBg     = light ? 'var(--bg-card)'       : '#0d0d0d'
  const border     = light ? 'var(--border)'         : 'rgba(255,255,255,0.07)'
  const borderSub  = light ? 'var(--border)'         : 'rgba(255,255,255,0.05)'
  const labelColor = light ? 'var(--text-dim)'       : 'rgba(200,200,200,0.3)'
  const waveColor  = light ? 'rgba(0,0,0,0.18)'      : 'rgba(180,180,180,0.22)'
  const counterCol = light ? 'var(--text-dim)'       : 'rgba(255,255,255,0.2)'
  const refCol     = light ? 'var(--text-dim)'       : 'rgba(200,200,200,0.26)'
  const qColor     = light ? 'rgba(80,80,140,0.7)'   : 'rgba(140,140,190,0.6)'
  const aColor     = light ? 'rgba(140,80,80,0.7)'   : 'rgba(190,140,140,0.6)'
  const qText      = light ? 'var(--text-muted)'     : 'rgba(180,180,200,0.62)'
  const aText      = light ? 'var(--text-muted)'     : 'rgba(220,220,220,0.8)'

  const visible = LIVE_LINES.slice(0, shown)

  return (
    <div style={{ width: 272 }}>
      <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '8px 14px', borderBottom: `1px solid ${borderSub}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Mic size={10} strokeWidth={1.4} style={{ color: labelColor }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 300, color: labelColor, letterSpacing: '0.06em' }}>Live Transcript</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#e74c3c', animation: 'pulse 1.2s ease-in-out infinite' }}/>
            <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(231,76,60,0.8)', letterSpacing: '0.08em' }}>REC</span>
          </div>
        </div>

        {/* Lines, with a page:line gutter */}
        <div style={{ padding: '10px 14px', minHeight: 148, display: 'flex', flexDirection: 'column', gap: 7 }}>
          {visible.map((l, i) => {
            const isLast = i === visible.length - 1
            return (
              <div key={l.ref} style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
                animation: 'fadeUpFast 0.28s ease forwards',
                ...(l.suggested ? {
                  borderLeft: '2px solid rgba(200,169,110,0.55)',
                  background: 'rgba(200,169,110,0.05)',
                  borderRadius: '0 3px 3px 0',
                  padding: '4px 6px 4px 7px',
                  marginLeft: -9,
                } : null),
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.46rem', color: refCol, marginTop: 3, flexShrink: 0, letterSpacing: '0.04em' }}>{l.ref}</span>
                <span style={{
                  fontFamily: 'monospace', fontSize: '0.46rem', fontWeight: 400,
                  color: l.q ? qColor : aColor, marginTop: 2.5, flexShrink: 0,
                  border: `1px solid ${l.q ? qColor : aColor}`, borderRadius: 2,
                  width: 11, height: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{l.s}</span>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 300,
                  color: l.q ? qText : aText, fontStyle: l.q ? 'italic' : 'normal',
                  lineHeight: 1.45, flex: 1,
                }}>
                  {l.t}
                  {isLast && <span className="cursor-blink" style={{ height: '0.72em', marginLeft: 3 }} />}
                  {l.suggested && (
                    <span style={{
                      display: 'block', marginTop: 4,
                      fontFamily: 'var(--font-sans)', fontSize: '0.46rem', fontStyle: 'normal',
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: 'rgba(200,169,110,0.75)',
                    }}>Suggested follow-up</span>
                  )}
                </p>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div style={{ padding: '7px 14px', borderTop: `1px solid ${borderSub}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', height: 12 }}>
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} style={{
                width: 1.5, borderRadius: 1,
                height: `${2.5 + Math.abs(Math.sin(i * 1.1)) * 8}px`,
                background: waveColor,
                animation: `pulse ${0.55 + (i % 4) * 0.18}s ease-in-out infinite`,
                animationDelay: `${i * 0.05}s`,
              }}/>
            ))}
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: counterCol, letterSpacing: '0.04em' }}>
            p.14 : l.{47 + shown * 3}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── FEATURE VIS: Contradiction ── */
function VisContradiction({ active, theme }: { active: boolean; theme: 'dark' | 'light' }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!active) return
    let cancelled = false
    const timers: NodeJS.Timeout[] = []
    function run() {
      if (cancelled) return
      setStep(0)
      ;[500, 1400, 2400].forEach((ms, i) => {
        timers.push(setTimeout(() => { if (!cancelled) setStep(i + 1) }, ms))
      })
      timers.push(setTimeout(run, 2400 + 3200))
    }
    run()
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [active])

  const light     = theme === 'light'
  const cardBg    = light ? 'var(--bg-card)'      : '#0d0d0d'
  const border    = light ? 'var(--border)'        : 'rgba(255,255,255,0.07)'
  const itemBg    = light ? 'rgba(0,0,0,0.03)'    : 'rgba(255,255,255,0.02)'
  const itemBor   = light ? 'var(--border)'        : 'rgba(255,255,255,0.06)'
  const refColor  = light ? 'var(--text-dim)'      : 'rgba(200,200,200,0.28)'
  const strikeCol = light ? 'var(--text-dim)'      : 'rgba(160,160,160,0.5)'
  const quoteCol  = light ? 'var(--text-muted)'    : 'rgba(215,215,215,0.75)'

  const labelCol = light ? 'var(--text-dim)' : 'rgba(200,200,200,0.3)'
  const btnBor   = light ? 'var(--border-mid)' : 'rgba(255,255,255,0.14)'
  const red      = 'rgba(231,76,60,'

  return (
    <div style={{ width: 282 }}>
      <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '8px 14px', borderBottom: `1px solid ${itemBor}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 300, color: labelCol, letterSpacing: '0.06em' }}>Contradiction Detection</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.46rem', color: labelCol, letterSpacing: '0.08em' }}>SCANNING</span>
        </div>

        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 0, minHeight: 168 }}>
          {/* Live statement */}
          {step >= 1 && (
            <div style={{ padding: '8px 10px', background: itemBg, border: `1px solid ${itemBor}`, borderRadius: 4, animation: 'fadeUpFast 0.3s ease forwards' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.48rem', color: refColor, letterSpacing: '0.08em' }}>p.7:31</span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.44rem', color: refColor, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Just said</span>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 300, color: quoteCol, lineHeight: 1.4 }}>&ldquo;I may have seen him briefly.&rdquo;</p>
            </div>
          )}

          {/* Connector */}
          {step >= 2 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 0 6px 8px', animation: 'fadeUpFast 0.25s ease forwards' }}>
              <CornerDownRight size={10} strokeWidth={1.4} style={{ color: refColor, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.52rem', fontWeight: 300, color: refColor, letterSpacing: '0.03em' }}>
                Conflicts with prior testimony
              </span>
            </div>
          )}

          {/* Prior statement, struck */}
          {step >= 2 && (
            <div style={{ padding: '8px 10px', background: itemBg, border: `1px solid ${itemBor}`, borderRadius: 4, animation: 'fadeUpFast 0.3s ease forwards' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.48rem', color: refColor, letterSpacing: '0.08em', display: 'block', marginBottom: 4 }}>p.4:12</span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 300, color: strikeCol, lineHeight: 1.4, textDecoration: 'line-through' }}>&ldquo;I never saw Calloway there.&rdquo;</p>
            </div>
          )}

          {/* Flag */}
          {step >= 3 && (
            <div style={{
              marginTop: 10, padding: '9px 10px',
              background: 'rgba(192,57,43,0.08)',
              border: '1px solid rgba(192,57,43,0.2)',
              borderLeft: '2px solid rgba(192,57,43,0.65)',
              borderRadius: '0 4px 4px 0',
              animation: 'fadeUpFast 0.3s ease forwards',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-sans)', fontSize: '0.48rem', color: `${red}0.85)`, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  <TriangleAlert size={9} strokeWidth={1.8} /> Contradiction
                </span>
                <span style={{
                  fontFamily: 'monospace', fontSize: '0.44rem', color: `${red}0.9)`,
                  border: `1px solid ${red}0.35)`, borderRadius: 2, padding: '1px 5px', letterSpacing: '0.06em',
                }}>HIGH</span>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 300, color: light ? 'rgba(150,50,42,0.85)' : 'rgba(255,170,160,0.72)', lineHeight: 1.4, marginBottom: 8 }}>
                Exhibit 7 badge log places both in the server room at 7:43 PM.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.52rem', fontWeight: 400,
                  color: light ? '#1c1c1c' : '#0d0d0d', background: `${red}0.9)`,
                  borderRadius: 3, padding: '4px 9px',
                }}>Impeach now</span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.52rem', fontWeight: 300,
                  color: quoteCol, border: `1px solid ${btnBor}`, borderRadius: 3, padding: '3px 9px',
                }}>Add to brief</span>
                <span style={{ fontFamily: 'monospace', fontSize: '0.44rem', color: refColor, marginLeft: 'auto', letterSpacing: '0.04em' }}>FRE 613</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── FEATURE VIS: Impeachment Brief ── */
const BRIEF = [
  { label: 'p.4:12',    text: '“I never saw Calloway there.”' },
  { label: 'p.7:31',    text: '“I may have seen him briefly.”' },
  { label: 'Exhibit 7', text: 'Badge log, shared access 7:43 PM' },
  { label: 'Basis',     text: 'Prior inconsistent statement, FRE 613' },
]

function VisBrief({ active, theme }: { active: boolean; theme: 'dark' | 'light' }) {
  const [shown, setShown] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!active) return
    let cancelled = false
    const timers: NodeJS.Timeout[] = []
    function run() {
      if (cancelled) return
      setShown(0); setReady(false)
      BRIEF.forEach((_, i) => {
        timers.push(setTimeout(() => { if (!cancelled) setShown(i + 1) }, 400 + i * 480))
      })
      const settled = 400 + BRIEF.length * 480
      timers.push(setTimeout(() => { if (!cancelled) setReady(true) }, settled))
      timers.push(setTimeout(run, settled + 2600))
    }
    run()
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [active])

  const light    = theme === 'light'
  const cardBg   = light ? 'var(--bg-card)'    : '#0d0d0d'
  const border   = light ? 'var(--border)'      : 'rgba(255,255,255,0.07)'
  const labelCol = light ? 'var(--text-dim)'    : 'rgba(200,200,200,0.3)'
  const rowBor   = light ? 'var(--border)'      : 'rgba(255,255,255,0.04)'
  const bodyCol  = light ? 'var(--text-muted)'  : 'rgba(210,210,210,0.72)'
  const headCol  = light ? 'var(--white)'       : '#e8e8e8'
  const btnBor   = light ? 'var(--border-mid)'  : 'rgba(255,255,255,0.14)'

  return (
    <div style={{ width: 274 }}>
      <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '8px 14px', borderBottom: `1px solid ${rowBor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 300, color: labelCol, letterSpacing: '0.06em' }}>Impeachment Brief</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.46rem', color: 'rgba(200,169,110,0.6)', letterSpacing: '0.06em' }}>AUTO-GENERATED</span>
        </div>

        <div style={{ padding: '12px 14px 10px', minHeight: 158 }}>
          {/* Section heading, like a real brief */}
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.86rem', color: headCol, letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: 3 }}>
            IV. Impeachment of R. Harmon
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: '0.44rem', color: labelCol, letterSpacing: '0.08em', marginBottom: 10 }}>
            HARMON v. CALLOWAY · NO. 24-CV-8871
          </p>

          {/* Citation rows */}
          {BRIEF.slice(0, shown).map((item, i) => (
            <div key={item.label} style={{
              display: 'flex', gap: 9, alignItems: 'flex-start',
              padding: '6px 0',
              borderTop: `1px solid ${rowBor}`,
              animation: 'fadeUpFast 0.28s ease forwards',
            }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.46rem', color: 'rgba(200,169,110,0.55)', whiteSpace: 'nowrap', marginTop: 2.5, minWidth: 44, letterSpacing: '0.04em' }}>{item.label}</span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.66rem', fontWeight: 300, color: bodyCol, lineHeight: 1.4, flex: 1 }}>
                {item.text}
                {i === shown - 1 && !ready && <span className="cursor-blink" style={{ height: '0.7em', marginLeft: 3 }} />}
              </p>
            </div>
          ))}
        </div>

        {/* Footer with a real export action */}
        <div style={{ padding: '7px 14px', borderTop: `1px solid ${rowBor}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 30 }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.46rem', color: labelCol, letterSpacing: '0.04em' }}>
            {ready ? '4 citations · 1 exhibit' : 'Drafting…'}
          </span>
          {ready && (
            <span style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontFamily: 'var(--font-sans)', fontSize: '0.52rem', fontWeight: 300,
              color: bodyCol, border: `1px solid ${btnBor}`, borderRadius: 3, padding: '3px 8px',
              animation: 'fadeUpFast 0.3s ease forwards',
            }}>
              <Download size={8} strokeWidth={1.6} /> Export .docx
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── FEATURE VIS: Credibility Score ── */
const CRED_ROWS = [
  { label: 'Consistency',           score: 42, color: '#e74c3c', verdict: 'Weak' },
  { label: 'Timeline accuracy',     score: 71, color: '#c8a96e', verdict: 'Holds' },
  { label: 'Document alignment',    score: 38, color: '#e74c3c', verdict: 'Weak' },
  { label: 'Prior statement match', score: 55, color: '#8d8d8d', verdict: 'Mixed' },
]

function VisCredibility({ active, theme }: { active: boolean; theme: 'dark' | 'light' }) {
  const [count, setCount] = useState(0)
  const [rows, setRows] = useState(0)
  const [bars, setBars] = useState(false)
  useEffect(() => {
    if (!active) return
    let cancelled = false
    function run() {
      if (cancelled) return
      setCount(0); setRows(0); setBars(false)
      let c = 0
      const iv = setInterval(() => { if (cancelled) { clearInterval(iv); return }; c++; setCount(c); if (c >= 48) clearInterval(iv) }, 18)
      CRED_ROWS.forEach((_, i) => setTimeout(() => { if (!cancelled) setRows(i + 1) }, 300 + i * 280))
      setTimeout(() => { if (!cancelled) setBars(true) }, 500)
      setTimeout(run, 300 + CRED_ROWS.length * 280 + 2000)
    }
    run()
    return () => { cancelled = true }
  }, [active])

  const light      = theme === 'light'
  const cardBg     = light ? 'var(--bg-card)'   : '#0d0d0d'
  const border     = light ? 'var(--border)'     : 'rgba(255,255,255,0.07)'
  const labelColor = light ? 'var(--text-dim)'   : 'rgba(200,200,200,0.28)'
  const scoreColor = light ? 'var(--white)'      : '#e8e8e8'
  const trackColor = light ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)'
  const rowLabel   = light ? 'var(--text-dim)'   : 'rgba(130,130,130,0.5)'

  const rowBor = light ? 'var(--border)' : 'rgba(255,255,255,0.04)'

  return (
    <div style={{ width: 282 }}>
      <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '8px 14px', borderBottom: `1px solid ${rowBor}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 300, color: labelColor, letterSpacing: '0.06em' }}>Witness Credibility</span>
          <span style={{
            fontFamily: 'monospace', fontSize: '0.46rem', color: labelColor,
            border: `1px solid ${rowBor}`, borderRadius: 2, padding: '1px 6px', letterSpacing: '0.06em',
          }}>R. HARMON</span>
        </div>

        {/* Score */}
        <div style={{ padding: '14px 16px 12px', borderBottom: `1px solid ${rowBor}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 9 }}>
            <div>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.52rem', fontWeight: 300, color: labelColor, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>
                Overall score
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <TrendingDown size={11} strokeWidth={1.6} style={{ color: 'rgba(231,76,60,0.8)' }} />
                <span style={{ fontFamily: 'monospace', fontSize: '0.48rem', color: 'rgba(231,76,60,0.8)', letterSpacing: '0.04em' }}>
                  down 19 pts this session
                </span>
              </span>
            </div>
            <span style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', color: scoreColor, letterSpacing: '-0.02em', lineHeight: 1 }}>{count}%</span>
              <span style={{
                fontFamily: 'monospace', fontSize: '0.44rem', color: 'rgba(231,76,60,0.9)',
                border: '1px solid rgba(231,76,60,0.35)', borderRadius: 2, padding: '1px 5px', letterSpacing: '0.06em',
              }}>LOW</span>
            </span>
          </div>
          <div style={{ height: 2, background: trackColor, borderRadius: 1, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${count}%`, background: 'linear-gradient(90deg, #e74c3c, #c8a96e)', borderRadius: 1, transition: 'width 0.1s linear' }}/>
          </div>
        </div>

        {/* Dimension rows */}
        <div style={{ padding: '10px 16px 12px', display: 'flex', flexDirection: 'column', gap: 9, minHeight: 104 }}>
          {CRED_ROWS.slice(0, rows).map(row => (
            <div key={row.label} style={{ animation: 'fadeUpFast 0.28s ease forwards' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 300, color: rowLabel }}>{row.label}</span>
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.48rem', fontWeight: 300, color: rowLabel, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{row.verdict}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.56rem', color: row.color }}>{row.score}%</span>
                </span>
              </div>
              <div style={{ height: 2, background: trackColor, borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 1, background: row.color, width: bars ? `${row.score}%` : '0%', transition: 'width 0.9s cubic-bezier(.4,0,.2,1)' }}/>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '7px 14px', borderTop: `1px solid ${rowBor}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.46rem', color: labelColor, letterSpacing: '0.04em' }}>4 dimensions · 218 answers</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.46rem', color: 'rgba(200,169,110,0.6)', letterSpacing: '0.06em' }}>SCORED</span>
        </div>
      </div>
    </div>
  )
}

/* ── FEATURE SECTION WRAPPER ── */
function FeatSection({ tag, title, body, sub, vis, reverse = false, id }: {
  tag: string; title: string; body: string; sub: string
  vis: (active: boolean) => React.ReactNode
  reverse?: boolean; id: string
}) {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !active) setActive(true) }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [active])

  const text = (
    <div style={{ padding: '60px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: reverse ? 'none' : '1px solid var(--border)', borderLeft: reverse ? '1px solid var(--border)' : 'none' }}>
      <span className="feat-tag">{tag}</span>
      <h3 className="feat-title">{title}</h3>
      <p className="feat-body">{body}</p>
      <p className="feat-sub">{sub}</p>
    </div>
  )
  const visual = <div className="feat-vis">{vis(active)}</div>
  return (
    <div ref={ref} className="feat-section reveal" id={id} style={{ direction: 'ltr' }}>
      {reverse ? <>{visual}{text}</> : <>{text}{visual}</>}
    </div>
  )
}

/* ── PAGE ── */
export default function Home() {
  useReveal()
  const theme = useTheme()
  const onMedia = HERO_MEDIA.type !== 'none'

  return (
    <main style={{ background: 'var(--bg)' }}>
      <Nav />

      {/* ── HERO ── */}
      <section className="hero-section" style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'center', textAlign: 'left',
        padding: '128px clamp(24px, 7vw, 112px) 96px',
        position: 'relative', overflow: 'hidden',
        background: onMedia ? '#0a0a0a' : 'var(--bg)',
      }}>
        {/* Background media */}
        {HERO_MEDIA.type === 'image' && (
          <img src={HERO_MEDIA.src} alt="" aria-hidden="true" style={heroMediaStyle} />
        )}
        {HERO_MEDIA.type === 'video' && (
          <video
            src={HERO_MEDIA.src}
            poster={HERO_MEDIA.poster}
            autoPlay muted loop playsInline
            aria-hidden="true"
            style={heroMediaStyle}
          />
        )}

        {/* Legibility scrim. Darkens the left so the copy holds over any footage. */}
        {onMedia && (
          <>
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
              background: 'linear-gradient(to right, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.58) 40%, rgba(0,0,0,0.18) 74%, rgba(0,0,0,0.06) 100%)',
            }}/>
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
              background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 42%)',
            }}/>
          </>
        )}

        <div style={{ position: 'relative', zIndex: 3, maxWidth: 640, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <p className="label" style={{ marginBottom: 24, ...(onMedia ? { color: 'rgba(255,255,255,0.62)' } : null) }}>
            AI Deposition Intelligence
          </p>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 4.8vw, 4.2rem)',
            fontWeight: 400, lineHeight: 1.04, letterSpacing: '-0.025em',
            color: onMedia ? '#f7f4ef' : (theme === 'light' ? '#111111' : '#f2f2f2'),
            marginBottom: 24,
          }}>
            Some Firms Always Seem to Know.<br />Now You Will.
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '1rem', fontWeight: 300,
            lineHeight: 1.65, marginBottom: 40, maxWidth: 470,
            color: onMedia ? 'rgba(255,255,255,0.82)' : (theme === 'light' ? 'rgba(0,0,0,0.68)' : 'rgba(255,255,255,0.78)'),
          }}>
            Real-time contradiction detection for litigators. Cited to page and line, before the deposition ends.
          </p>
          <Link href="/demo" className="btn btn-solid btn-rect">Book a Demo</Link>
          {/* -8px pulls the badge's own padding back so it sits flush with the button */}
          <div style={{ marginTop: 28, marginLeft: -8 }}>
            <SkyDeckBadge />
          </div>
          <p style={{
            marginTop: 10, fontFamily: 'var(--font-sans)', fontSize: '0.65rem',
            fontWeight: 300, letterSpacing: '0.05em',
            color: onMedia ? 'rgba(255,255,255,0.55)' : (theme === 'light' ? 'rgba(0,0,0,0.42)' : 'rgba(255,255,255,0.5)'),
          }}>
            Currently in private beta
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 3 }}>
          <div className="hero-scroll-line" />
        </div>
      </section>

      <div className="line"/>

      {/* ── STAGES ── */}
      <section style={{ padding: '72px 52px 0', maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 52 }}>
          <p className="label" style={{ marginBottom: 18 }}>The Platform</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.05 }}>The prep you&rsquo;d get from three more associates.</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 180px' }}>
          <DisplayCards cards={STAGE_CARDS} />
        </div>
      </section>

      {/* ── FULL-BLEED BAND ──
          Standalone image that cuts the Platform and Capabilities modules apart. */}
      <div className="reveal band-image">
        <img src="/platform-band.jpg" alt="" aria-hidden="true" />
      </div>

      {/* ── ANIMATED FEATURE SECTIONS ── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', borderTop: '1px solid var(--border)' }}>
        <div className="reveal" style={{ padding: '60px 52px 0' }}>
          <p className="label" style={{ marginBottom: 18 }}>Capabilities</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 48 }}>Everything your case demands</h2>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', borderTop: '1px solid var(--border)' }}>
        <FeatSection id="f1" tag="Preparation" title="Case Analysis"
          body="Upload case files, prior depositions, and exhibits. Ithildin ingests and cross-references everything, surfacing the insights that matter before you walk in."
          sub="The conflict you'd have found on the third read-through. Found before the first."
          vis={(a) => <VisUpload active={a} theme={theme} />}
        />
        <FeatSection id="f2" tag="Live Intelligence" title="Real-Time Transcription" reverse
          body="Ithildin listens and transcribes with speaker attribution, timestamps, and instant page:line references as the witness speaks."
          sub="Page and line, live. No waiting on the rough."
          vis={(a) => <VisTranscript active={a} theme={theme} />}
        />
        <FeatSection id="f3" tag="Live Intelligence" title="Contradiction Detection"
          body="The moment a witness contradicts prior testimony or your documents, Ithildin flags it in real time, with the source, page, and line."
          sub="Caught in the room. Not in the transcript three weeks later."
          vis={(a) => <VisContradiction active={a} theme={theme} />}
        />
        <FeatSection id="f4" tag="Post-Deposition" title="Impeachment Brief" reverse
          body="Automatically drafts impeachment sections from every contradiction found. Cite-ready for court, generated within minutes of concluding."
          sub="The brief your associate writes over a weekend, in twelve minutes."
          vis={(a) => <VisBrief active={a} theme={theme} />}
        />
        <FeatSection id="f5" tag="Intelligence" title="Witness Credibility"
          body="Consistency scoring across the full deposition. See where testimony holds, where it shifts, and where it breaks, mapped visually."
          sub="You already knew the witness was lying. Now it's on the record."
          vis={(a) => <VisCredibility active={a} theme={theme} />}
        />
      </div>

      {/* ── FULL-BLEED BAND ── */}
      <div className="reveal band-image band-image--cta">
        <img src="/cta-band.jpg" alt="" aria-hidden="true" />
      </div>

      {/* ── CTA ── */}
      <section style={{ padding: '160px 52px', textAlign: 'center', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(200,200,200,0.02) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <div className="reveal" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 20 }}>
            Built for firms that can&rsquo;t<br/>afford to miss anything.
          </h2>
          <p className="msg-line" style={{ marginBottom: 48 }}>
            Assume the other side is already running it.
          </p>
          <Link href="/demo" className="btn btn-solid btn-rect">Book a Demo</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
