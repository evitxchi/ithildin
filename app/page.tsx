'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import DisplayCards from '@/components/ui/display-cards'
import { Component as SkyDeckBadge } from '@/components/ui/backed-by-yc'
import { FileSearch, Zap, FileText } from 'lucide-react'

/* ── HERO BACKGROUND MEDIA ──
   Drop a file into /public and point this at it. Nothing else needs to change:
     image → { type: 'image', src: '/hero.jpg' }
     video → { type: 'video', src: '/hero.mp4', poster: '/hero-poster.jpg' }
   While type is 'none' the hero sits on the page background and the copy stays
   theme-aware. As soon as media is set, the scrim turns on and the copy locks to
   light so it holds over any footage. */
const HERO_MEDIA: { type: 'none' | 'image' | 'video'; src: string; poster?: string } = {
  type: 'none',
  src: '',
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

/* ── FEATURE VIS: Document Upload ── */
function VisUpload({ active, theme }: { active: boolean; theme: 'dark' | 'light' }) {
  const [scanY, setScanY] = useState(0)
  const [aiVisible, setAiVisible] = useState(false)
  const light = theme === 'light'

  useEffect(() => {
    if (!active) return
    let cancelled = false
    function run() {
      if (cancelled) return
      setScanY(0); setAiVisible(false)
      let y = 0
      const iv = setInterval(() => {
        if (cancelled) { clearInterval(iv); return }
        y += 2; setScanY(y)
        if (y >= 60) {
          clearInterval(iv)
          setTimeout(() => { if (cancelled) return; setAiVisible(true); setTimeout(run, 1800) }, 200)
        }
      }, 16)
    }
    run()
    return () => { cancelled = true }
  }, [active])

  const strokeOuter = light ? 'rgba(0,0,0,0.14)' : 'rgba(255,255,255,0.07)'
  const fillOuter   = light ? 'rgba(0,0,0,0.04)'  : 'rgba(255,255,255,0.02)'
  const lineHeavy   = light ? 'rgba(0,0,0,0.22)'  : 'rgba(255,255,255,0.16)'
  const lineMid     = light ? 'rgba(0,0,0,0.12)'  : 'rgba(255,255,255,0.08)'
  const lineLight   = light ? 'rgba(0,0,0,0.08)'  : 'rgba(255,255,255,0.06)'

  return (
    <svg width="280" height="200" viewBox="0 0 280 200" fill="none">
      <rect x="40" y="60" width="200" height="110" rx="3" fill={fillOuter} stroke={strokeOuter} strokeWidth="1"/>
      <rect x="40" y="48" width="76" height="16" rx="2" fill={fillOuter} stroke={strokeOuter} strokeWidth="1"/>
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={65+i*60} y="78" width="46" height="60" rx="2" fill={fillOuter} stroke={strokeOuter} strokeWidth="1"/>
          <rect x={71+i*60} y="88" width="28" height="1.5" rx="1" fill={lineHeavy}/>
          <rect x={71+i*60} y="93" width="22" height="1.5" rx="1" fill={lineMid}/>
          <rect x={71+i*60} y="98" width="25" height="1.5" rx="1" fill={lineMid}/>
          <rect x={71+i*60} y="103" width="18" height="1.5" rx="1" fill={lineLight}/>
        </g>
      ))}
      <rect x="40" y={78+scanY} width="200" height="1.5" fill="rgba(200,169,110,0.3)"/>
      <rect x="80" y="152" width="120" height="20" rx="3"
        fill="rgba(200,169,110,0.06)" stroke="rgba(200,169,110,0.18)" strokeWidth="1"
        opacity={aiVisible ? 1 : 0} style={{ transition: 'opacity 0.4s ease' }}/>
      <rect x="88" y="159" width="56" height="1.5" rx="1"
        fill="rgba(200,169,110,0.38)" opacity={aiVisible ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.1s' }}/>
      <rect x="88" y="163.5" width="38" height="1.5" rx="1"
        fill="rgba(200,169,110,0.2)" opacity={aiVisible ? 1 : 0}
        style={{ transition: 'opacity 0.4s ease 0.2s' }}/>
    </svg>
  )
}

/* ── FEATURE VIS: Live Transcription ── */
const LIVE_LINES = [
  { s: 'Q', t: 'Were you present on March 14th?', q: true },
  { s: 'A', t: "Yes. I arrived around six o'clock.", q: false },
  { s: 'Q', t: 'Did you see Mr. Calloway?', q: true },
  { s: 'A', t: 'No. I never saw Calloway there.', q: false },
  { s: 'Q', t: 'Your badge log shows otherwise.', q: true },
]

function VisTranscript({ active, theme }: { active: boolean; theme: 'dark' | 'light' }) {
  const [lines, setLines] = useState<typeof LIVE_LINES>([])
  const [lineCount, setLineCount] = useState(47)
  const idx = useRef(0)
  const light = theme === 'light'

  useEffect(() => {
    if (!active) return
    function add() {
      if (idx.current >= LIVE_LINES.length) {
        idx.current = 0; setLines([]); setLineCount(47); setTimeout(add, 1000); return
      }
      const l = LIVE_LINES[idx.current++]
      setLines(prev => [...prev, l])
      setLineCount(prev => prev + 3)
      setTimeout(add, l.q ? 1600 : 2000)
    }
    add()
  }, [active])

  const cardBg     = light ? 'var(--bg-card)'       : '#0d0d0d'
  const border     = light ? 'var(--border)'         : 'rgba(255,255,255,0.07)'
  const borderSub  = light ? 'var(--border)'         : 'rgba(255,255,255,0.05)'
  const labelColor = light ? 'var(--text-dim)'       : 'rgba(200,200,200,0.3)'
  const waveColor  = light ? 'rgba(0,0,0,0.14)'      : 'rgba(180,180,180,0.18)'
  const counterCol = light ? 'var(--text-dim)'       : 'rgba(255,255,255,0.14)'
  const qColor     = light ? 'rgba(80,80,140,0.55)'  : 'rgba(130,130,180,0.45)'
  const aColor     = light ? 'rgba(140,80,80,0.55)'  : 'rgba(180,130,130,0.45)'
  const qText      = light ? 'var(--text-muted)'     : 'rgba(180,180,200,0.6)'
  const aText      = light ? 'var(--text-muted)'     : 'rgba(215,215,215,0.75)'

  return (
    <div style={{ width: 260 }}>
      <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ padding: '8px 14px', borderBottom: `1px solid ${borderSub}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 300, color: labelColor, letterSpacing: '0.06em' }}>Live Transcript</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#e74c3c', animation: 'pulse 1.2s ease-in-out infinite' }}/>
            <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(231,76,60,0.8)', letterSpacing: '0.08em' }}>REC</span>
          </div>
        </div>
        <div style={{ padding: '12px 14px', minHeight: 130, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lines.map((l, i) => (
            <div key={i} style={{ display: 'flex', gap: 7, animation: 'fadeUp 0.3s ease forwards' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: l.q ? qColor : aColor, marginTop: 2, width: 9, flexShrink: 0 }}>{l.s}</span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 300, color: l.q ? qText : aText, fontStyle: l.q ? 'italic' : 'normal', lineHeight: 1.5 }}>{l.t}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: '7px 14px', borderTop: `1px solid ${borderSub}`, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 1.5, alignItems: 'center', height: 12 }}>
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} style={{ width: 1.5, borderRadius: 1, height: `${3 + Math.abs(Math.sin(i * 0.9)) * 6}px`, background: waveColor, animation: `pulse ${0.5 + (i % 3) * 0.2}s ease-in-out infinite`, animationDelay: `${i * 0.06}s` }}/>
            ))}
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: counterCol }}>p.14 : l.{lineCount}</span>
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
    const timers = [setTimeout(() => setStep(1), 400), setTimeout(() => setStep(2), 1200), setTimeout(() => setStep(3), 2100)]
    return () => timers.forEach(clearTimeout)
  }, [active])

  const light     = theme === 'light'
  const cardBg    = light ? 'var(--bg-card)'      : '#0d0d0d'
  const border    = light ? 'var(--border)'        : 'rgba(255,255,255,0.07)'
  const itemBg    = light ? 'rgba(0,0,0,0.03)'    : 'rgba(255,255,255,0.02)'
  const itemBor   = light ? 'var(--border)'        : 'rgba(255,255,255,0.06)'
  const refColor  = light ? 'var(--text-dim)'      : 'rgba(200,200,200,0.28)'
  const strikeCol = light ? 'var(--text-dim)'      : 'rgba(160,160,160,0.5)'
  const quoteCol  = light ? 'var(--text-muted)'    : 'rgba(215,215,215,0.75)'

  return (
    <div style={{ width: 280 }}>
      <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {step >= 1 && (
          <div style={{ padding: '8px 12px', background: itemBg, border: `1px solid ${itemBor}`, borderRadius: 4, animation: 'fadeUp 0.35s ease forwards' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: refColor, marginBottom: 4, letterSpacing: '0.08em' }}>p.4:12</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 300, color: strikeCol, lineHeight: 1.45, textDecoration: 'line-through' }}>"I never saw Calloway there."</p>
          </div>
        )}
        {step >= 2 && (
          <div style={{ padding: '8px 12px', background: itemBg, border: `1px solid ${itemBor}`, borderRadius: 4, animation: 'fadeUp 0.35s ease forwards' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: refColor, marginBottom: 4, letterSpacing: '0.08em' }}>p.7:31</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 300, color: quoteCol, lineHeight: 1.45 }}>"I may have seen him briefly."</p>
          </div>
        )}
        {step >= 3 && (
          <div style={{ padding: '10px 12px', background: 'rgba(192,57,43,0.08)', border: '1px solid rgba(192,57,43,0.18)', borderLeft: '2px solid rgba(192,57,43,0.6)', borderRadius: '0 4px 4px 0', animation: 'fadeUp 0.35s ease forwards' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(231,76,60,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 5 }}>⚡ Contradiction Detected</span>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 300, color: light ? 'rgba(180,60,50,0.8)' : 'rgba(255,150,140,0.65)', lineHeight: 1.45 }}>Badge log confirms shared server room access at 7:43 PM. Exhibit 7</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── FEATURE VIS: Impeachment Brief ── */
const BRIEF = [
  { label: 'Section IV', text: 'Impeachment of Robert Harmon' },
  { label: 'p.4:12',     text: '"I never saw Calloway there."' },
  { label: 'p.7:31',     text: '"I may have seen him briefly."' },
  { label: 'Exhibit 7',  text: 'Badge log confirms shared access 7:43 PM' },
  { label: 'Basis',      text: 'Prior inconsistent statement, FRE 613' },
]

function VisBrief({ active, theme }: { active: boolean; theme: 'dark' | 'light' }) {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (!active) return
    let cancelled = false
    function run() {
      if (cancelled) return
      setShown(0)
      BRIEF.forEach((_, i) => setTimeout(() => { if (!cancelled) setShown(i + 1) }, i * 380))
      setTimeout(run, BRIEF.length * 380 + 1800)
    }
    run()
    return () => { cancelled = true }
  }, [active])

  const light    = theme === 'light'
  const cardBg   = light ? 'var(--bg-card)' : '#0d0d0d'
  const border   = light ? 'var(--border)'  : 'rgba(255,255,255,0.07)'
  const labelCol = light ? 'var(--text-dim)' : 'rgba(200,200,200,0.28)'
  const rowBor   = light ? 'var(--border)'  : 'rgba(255,255,255,0.04)'
  const bodyCol  = light ? 'var(--text-muted)' : 'rgba(200,200,200,0.62)'

  return (
    <div style={{ width: 270 }}>
      <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 8, padding: '16px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, paddingBottom: 10, borderBottom: `1px solid ${rowBor}` }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.58rem', fontWeight: 300, color: labelCol, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Impeachment Brief</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(200,169,110,0.55)' }}>AUTO-GENERATED</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {BRIEF.slice(0, shown).map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '7px 0', borderBottom: `1px solid ${rowBor}`, animation: 'fadeUp 0.35s ease forwards' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(200,169,110,0.4)', whiteSpace: 'nowrap', marginTop: 2, minWidth: 50 }}>{item.label}</span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 300, color: bodyCol, lineHeight: 1.4 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── FEATURE VIS: Credibility Score ── */
const CRED_ROWS = [
  { label: 'Consistency',           score: 42, color: '#e74c3c' },
  { label: 'Timeline accuracy',     score: 71, color: '#c8a96e' },
  { label: 'Document alignment',    score: 38, color: '#e74c3c' },
  { label: 'Prior statement match', score: 55, color: '#888' },
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

  return (
    <div style={{ width: 280 }}>
      <div style={{ background: cardBg, border: `1px solid ${border}`, borderRadius: 8, padding: '18px 20px' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 300, color: labelColor, letterSpacing: '0.06em' }}>Overall Credibility Score</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: scoreColor }}>{count}%</span>
          </div>
          <div style={{ height: 2, background: trackColor, borderRadius: 1, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${count}%`, background: 'linear-gradient(90deg, #e74c3c, #c8a96e)', borderRadius: 1, transition: 'width 0.1s linear' }}/>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CRED_ROWS.slice(0, rows).map((row, i) => (
            <div key={i} style={{ animation: 'fadeUp 0.35s ease forwards' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 300, color: rowLabel }}>{row.label}</span>
                <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: row.color }}>{row.score}%</span>
              </div>
              <div style={{ height: 2, background: trackColor, borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: 1, background: row.color, width: bars ? `${row.score}%` : '0%', transition: 'width 0.9s ease' }}/>
              </div>
            </div>
          ))}
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

      {/* ── CTA ── */}
      <section style={{ padding: '160px 52px', textAlign: 'center', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(200,200,200,0.02) 0%, transparent 70%)', pointerEvents: 'none' }}/>
        <div className="reveal" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 20 }}>
            Built for firms that can&rsquo;t<br/>afford to miss anything.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 300, color: 'var(--text-muted)', marginBottom: 44 }}>
            Assume the other side is already running it.
          </p>
          <Link href="/demo" className="btn btn-solid btn-rect">Book a Demo</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
