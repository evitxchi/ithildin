'use client'
import { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

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

/* Shared surface tokens so every demo on this page reads as one system,
   in both light and dark. */
function usePalette() {
  const light = useTheme() === 'light'
  return {
    light,
    card:    light ? '#ece9e3'          : '#0d0d0d',
    chrome:  light ? '#e3dfd8'          : '#0a0a0a',
    inset:   light ? '#f6f4f0'          : '#080808',
    border:  light ? 'rgba(0,0,0,0.11)' : 'rgba(255,255,255,0.07)',
    hair:    light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.045)',
    heading: light ? '#141414'          : '#e9e9e9',
    body:    light ? 'rgba(0,0,0,0.74)' : 'rgba(216,216,216,0.78)',
    label:   light ? 'rgba(0,0,0,0.5)'  : 'rgba(200,200,200,0.34)',
    faint:   light ? 'rgba(0,0,0,0.33)' : 'rgba(200,200,200,0.22)',
    track:   light ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)',
  }
}

type Palette = ReturnType<typeof usePalette>

/* Semantic issue tags. Muted enough to sit in the palette, distinct enough to scan. */
const ISSUE_COLORS: Record<string, string> = {
  'CONTRACT':      '#8f8f8f',
  'CONTROLS GAP':  '#8f8f8f',
  'KNOWLEDGE':     '#6f92d1',
  'CONFLICT':      '#e0614f',
  'CONTRADICTION': '#e0614f',
  'SCIENTER':      '#e0614f',
  'OMISSION':      '#e39a3c',
  'MOTIVE':        '#c8a96e',
  'AUTHORITY':     '#4fae7c',
}

function IssueChip({ label }: { label: string }) {
  const c = ISSUE_COLORS[label] ?? '#8f8f8f'
  return (
    <span style={{
      fontFamily: 'var(--font-sans)', fontSize: '0.48rem', fontWeight: 400,
      letterSpacing: '0.09em', textTransform: 'uppercase', whiteSpace: 'nowrap',
      color: c, background: `${c}1f`, border: `1px solid ${c}4d`,
      borderRadius: 3, padding: '2px 6px', lineHeight: 1.5,
    }}>{label}</span>
  )
}

// ─── LIVE DEPOSITION ──────────────────────────────────────────────────────────

const LINES = [
  { ref: '4:06', s: 'Q', t: 'Mr. Harmon, you were present at the facility on March 14th?' },
  { ref: '4:07', s: 'A', t: 'Yes. I was there from six until approximately nine.' },
  { ref: '4:09', s: 'Q', t: 'Did you interact with Mr. Calloway that evening?' },
  { ref: '4:12', s: 'A', t: 'No. I never saw Calloway there.' },
  { ref: '4:15', s: 'Q', t: 'Exhibit 7. Your badge and Calloway’s both accessed the server room at 7:43 PM.', exhibit: 'EX. 7' },
  {
    ref: '7:31', s: 'A', t: 'I... well, I may have seen him briefly. I didn’t think it was relevant.',
    flag: {
      type: 'Contradiction', sev: 'HIGH', basis: 'FRE 613',
      detail: 'Contradicts “I never saw Calloway there.” at 4:12. Exhibit 7 places both in the server room at 7:43 PM.',
    },
  },
  { ref: '7:36', s: 'Q', t: 'You testified moments ago that you never saw him. Which is accurate?' },
  {
    ref: '7:40', s: 'A', t: 'It was brief. I forgot.',
    flag: {
      type: 'Memory lapse', sev: 'MED', basis: 'Impeachment',
      detail: 'Definitive absence, now a memory lapse. The prior answer is already on the record.',
    },
  },
]

function DepoDemo() {
  const p = usePalette()
  const [shown, setShown] = useState(0)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    const timers: NodeJS.Timeout[] = []
    function run() {
      if (cancelled) return
      setShown(0)
      let t = 700
      LINES.forEach((l, i) => {
        timers.push(setTimeout(() => { if (!cancelled) setShown(i + 1) }, t))
        t += l.flag ? 2400 : 1500
      })
      timers.push(setTimeout(run, t + 3200))
    }
    run()
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [])

  useEffect(() => {
    const el = bodyRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [shown])

  const visible = LINES.slice(0, shown)
  const flags = visible.filter(l => l.flag).length
  const exhibits = visible.filter(l => l.exhibit).length

  const SIGNALS = [
    { label: 'Contradictions', value: String(flags), hot: flags > 0 },
    { label: 'Exhibits used', value: `${exhibits} / 7`, hot: false },
    { label: 'Answers scored', value: String(visible.filter(l => l.s === 'A').length), hot: false },
  ]

  const lastFlag = [...visible].reverse().find(l => l.flag)?.flag

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', background: p.card, border: `1px solid ${p.border}`, borderRadius: 10, overflow: 'hidden' }}>
      {/* Title bar */}
      <div style={{ padding: '10px 16px', background: p.chrome, borderBottom: `1px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <span style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', border: `1px solid ${p.border}`, background: p.track }} />
            ))}
          </span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.66rem', fontWeight: 300, color: p.body, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Harmon v. Calloway · Deposition of Robert Harmon
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#e74c3c', animation: 'pulse 1.2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(231,76,60,0.85)', letterSpacing: '0.08em' }}>REC</span>
          </span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: p.faint, letterSpacing: '0.04em' }}>02:14:07</span>
        </div>
      </div>

      <div className="depo-grid">
        {/* Transcript */}
        <div ref={bodyRef} style={{ padding: '16px 18px', height: 316, overflow: 'hidden', background: p.inset }}>
          {visible.map((l, i) => (
            <div key={l.ref} style={{ marginBottom: 12, animation: 'fadeUpFast 0.3s ease forwards' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: p.faint, marginTop: 4, flexShrink: 0, letterSpacing: '0.04em', width: 24 }}>{l.ref}</span>
                <span style={{
                  fontFamily: 'monospace', fontSize: '0.5rem', marginTop: 3, flexShrink: 0,
                  width: 13, height: 13, borderRadius: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: l.s === 'Q' ? (p.light ? '#5a5a96' : '#9a9ad2') : (p.light ? '#96565a' : '#d29a9a'),
                  border: `1px solid ${l.s === 'Q' ? (p.light ? '#5a5a9655' : '#9a9ad255') : (p.light ? '#96565a55' : '#d29a9a55')}`,
                }}>{l.s}</span>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.76rem', fontWeight: 300,
                  color: l.s === 'Q' ? p.label : p.body,
                  fontStyle: l.s === 'Q' ? 'italic' : 'normal',
                  lineHeight: 1.55, flex: 1,
                }}>
                  {l.t}
                  {l.exhibit && (
                    <span style={{
                      marginLeft: 6, fontFamily: 'monospace', fontSize: '0.46rem', fontStyle: 'normal',
                      color: '#c8a96e', border: '1px solid rgba(200,169,110,0.4)', background: 'rgba(200,169,110,0.1)',
                      borderRadius: 2, padding: '1px 5px', whiteSpace: 'nowrap', letterSpacing: '0.06em',
                    }}>{l.exhibit}</span>
                  )}
                  {i === visible.length - 1 && <span className="cursor-blink" style={{ height: '0.72em', marginLeft: 3 }} />}
                </p>
              </div>

              {l.flag && (
                <div style={{
                  marginTop: 8, marginLeft: 47, padding: '9px 11px',
                  background: 'rgba(192,57,43,0.08)',
                  border: '1px solid rgba(192,57,43,0.2)',
                  borderLeft: '2px solid rgba(192,57,43,0.65)',
                  borderRadius: '0 4px 4px 0',
                  animation: 'fadeUpFast 0.3s ease forwards',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.5rem', color: 'rgba(231,76,60,0.9)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {l.flag.type}
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.44rem', color: 'rgba(231,76,60,0.9)', border: '1px solid rgba(231,76,60,0.35)', borderRadius: 2, padding: '1px 5px' }}>
                      {l.flag.sev}
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.44rem', color: p.faint, marginLeft: 'auto' }}>{l.flag.basis}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.66rem', fontWeight: 300, color: p.light ? 'rgba(150,50,42,0.9)' : 'rgba(255,175,165,0.75)', lineHeight: 1.45 }}>
                    {l.flag.detail}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Signals rail */}
        <div className="depo-rail" style={{ borderLeft: `1px solid ${p.border}`, padding: '14px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.52rem', color: p.label, letterSpacing: '0.14em', textTransform: 'uppercase' }}>Signals</span>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {SIGNALS.map(s => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 300, color: p.label }}>{s.label}</span>
                <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: s.hot ? '#e0614f' : p.body }}>{s.value}</span>
              </div>
            ))}
          </div>

          <div style={{ height: 1, background: p.hair }} />

          {lastFlag ? (
            <div style={{ animation: 'fadeUpFast 0.3s ease forwards' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.48rem', color: p.faint, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                Suggested action
              </span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.66rem', fontWeight: 300, color: p.body, lineHeight: 1.5, marginBottom: 10 }}>
                Read the 4:12 answer back, then hand him Exhibit 7.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.56rem', fontWeight: 400, textAlign: 'center',
                  color: p.light ? '#f6f4f0' : '#0d0d0d', background: 'rgba(224,97,79,0.92)',
                  borderRadius: 3, padding: '5px 10px',
                }}>Impeach now</span>
                <span style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.56rem', fontWeight: 300, textAlign: 'center',
                  color: p.body, border: `1px solid ${p.border}`, borderRadius: 3, padding: '4px 10px',
                }}>Add to brief</span>
              </div>
            </div>
          ) : (
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 300, color: p.faint, lineHeight: 1.5 }}>
              Listening. Nothing conflicts with the record yet.
            </p>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div style={{ padding: '8px 16px', background: p.chrome, borderTop: `1px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end', height: 11 }}>
          {Array.from({ length: 22 }).map((_, i) => (
            <div key={i} style={{
              width: 1.5, borderRadius: 1,
              height: `${2.5 + Math.abs(Math.sin(i * 1.1)) * 7}px`,
              background: p.light ? 'rgba(0,0,0,0.2)' : 'rgba(180,180,180,0.24)',
              animation: `pulse ${0.55 + (i % 4) * 0.18}s ease-in-out infinite`,
              animationDelay: `${i * 0.05}s`,
            }} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.48rem', color: p.faint }}>p.14 : l.{47 + shown * 3}</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.48rem', color: flags ? '#e0614f' : p.faint }}>{flags} flagged</span>
        </div>
      </div>
    </div>
  )
}

// ─── MASTER CHRONOLOGY ────────────────────────────────────────────────────────

const CHRONO_PHASES = [
  {
    n: '1',
    title: 'Access and Credentials',
    range: 'Jan 2024 – Mar 2024',
    desc: 'Badge provisioning, server room policy, and the run-up to March 14.',
    entries: [
      { date: '01/15/2024', text: 'Master services agreement executed between the parties.', actor: 'Counsel', issue: 'CONTRACT' },
      { date: '02/03/2024', text: 'Email chain establishes the shared server room access protocol.', actor: 'Facilities', issue: 'KNOWLEDGE' },
      { date: '03/07/2024', text: 'Badge credentials issued to Harmon and Calloway on a single request.', actor: 'Facilities', issue: 'CONTROLS GAP' },
    ],
  },
  {
    n: '2',
    title: 'The Evening of March 14',
    range: 'Mar 2024',
    desc: 'Conflicting accounts of who was present, and when.',
    entries: [
      { date: '03/14/2024', text: 'Badge log records Harmon entry at 6:02 PM and Calloway at 7:41 PM.', actor: 'Badge System', issue: 'KNOWLEDGE' },
      { date: '03/14/2024', text: 'Both badges register server room access inside the same two minutes.', actor: 'Badge System', issue: 'CONFLICT', flagged: true },
      { date: '03/14/2024', text: 'Harmon accounts for the evening as six until nine, alone.', actor: 'Harmon', issue: 'CONTRADICTION' },
    ],
  },
  {
    n: '3',
    title: 'Written Statements',
    range: 'Apr 2024 – Jul 2024',
    desc: 'Declarations that lock the witness in well before the deposition.',
    entries: [
      { date: '04/02/2024', text: 'Incident report filed with no mention of a second person present.', actor: 'Harmon', issue: 'OMISSION' },
      { date: '04/18/2024', text: 'Sworn declaration states he never saw Calloway at the facility.', actor: 'Harmon', issue: 'SCIENTER' },
    ],
  },
]

const CHRONO_TOTAL = CHRONO_PHASES.reduce((n, ph) => n + ph.entries.length, 0)

function MasterChronologyDemo() {
  const p = usePalette()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    let cancelled = false
    const timers: NodeJS.Timeout[] = []
    function run() {
      if (cancelled) return
      setShown(0)
      for (let i = 0; i < CHRONO_TOTAL; i++) {
        timers.push(setTimeout(() => { if (!cancelled) setShown(i + 1) }, 350 + i * 260))
      }
      timers.push(setTimeout(run, 350 + CHRONO_TOTAL * 260 + 3600))
    }
    run()
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [])

  let counter = 0

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', background: p.card, border: `1px solid ${p.border}`, borderRadius: 10, overflow: 'hidden' }}>
      {/* Document header */}
      <div style={{ padding: '16px 20px 14px', borderBottom: `1px solid ${p.border}`, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ minWidth: 0 }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: p.heading, letterSpacing: '-0.01em', marginBottom: 6 }}>
            Master Chronology
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontSize: '0.58rem', fontWeight: 300, color: p.label }}>
            <span><span style={{ color: p.body }}>Matter:</span> Harmon v. Calloway</span>
            <span style={{ color: p.faint }}>·</span>
            <span>Jan 2024 – Jul 2024</span>
            <span style={{ color: p.faint }}>·</span>
            <span>3 phases</span>
            <span style={{ color: p.faint }}>·</span>
            <span>{CHRONO_TOTAL} entries</span>
            <span style={{ color: p.faint }}>·</span>
            <span style={{ color: '#c8a96e' }}>Attorney Work Product</span>
          </div>
        </div>
        <span style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.56rem', fontWeight: 300, whiteSpace: 'nowrap',
          color: p.body, border: `1px solid ${p.border}`, borderRadius: 3, padding: '4px 10px',
        }}>Collapse all</span>
      </div>

      {/* Phases */}
      <div style={{ padding: '4px 20px 18px' }}>
        {CHRONO_PHASES.map(ph => (
          <div key={ph.n} style={{ paddingTop: 18 }}>
            {/* Phase header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
              <span style={{
                width: 18, height: 18, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                border: `1px solid ${p.border}`, background: p.inset,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'monospace', fontSize: '0.5rem', color: p.label,
              }}>{ph.n}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: p.heading, letterSpacing: '-0.005em' }}>{ph.title}</span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.55rem', fontWeight: 300, color: p.faint, whiteSpace: 'nowrap' }}>{ph.range}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 300, fontStyle: 'italic', color: p.label, marginTop: 3, lineHeight: 1.5 }}>
                  {ph.desc}
                </p>
              </div>
            </div>

            {/* Entries on a rail */}
            <div style={{ paddingLeft: 8, borderLeft: `1px solid ${p.hair}`, marginLeft: 8, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {ph.entries.map(e => {
                const visible = counter++ < shown
                return (
                  <div key={e.date + e.text} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '7px 11px',
                    background: p.inset,
                    border: `1px solid ${e.flagged ? 'rgba(200,169,110,0.4)' : p.hair}`,
                    borderRadius: 4,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'none' : 'translateY(6px)',
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                  }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: p.faint, flexShrink: 0, letterSpacing: '0.02em' }}>{e.date}</span>
                    <span style={{
                      fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 300, color: p.body,
                      flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{e.text}</span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.56rem', fontWeight: 300, color: p.label, flexShrink: 0, whiteSpace: 'nowrap' }}>{e.actor}</span>
                    <IssueChip label={e.issue} />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: '8px 20px', background: p.chrome, borderTop: `1px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '0.48rem', color: p.faint, letterSpacing: '0.02em' }}>
          {Math.min(shown, CHRONO_TOTAL)} / {CHRONO_TOTAL} entries built from your documents
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: '0.48rem', color: '#c8a96e', letterSpacing: '0.06em' }}>2 CONFLICTS</span>
      </div>
    </div>
  )
}

// ─── WITNESS CHRONOLOGY ───────────────────────────────────────────────────────

const WITNESS_ROWS = [
  {
    date: '03/07/2024', ex: 'Ex. 3', actors: 'Facilities; Harmon',
    fact: 'Badge credentials issued to Harmon and Calloway on a single request.',
    issue: 'CONTROLS GAP',
    use: 'Establishes both men held access well before the evening in question.',
  },
  {
    date: '03/14/2024', ex: 'Ex. 7', actors: 'Badge System',
    fact: 'Both badges register server room access at 7:43 PM.',
    issue: 'CONFLICT',
    use: 'Anchor exhibit. Confront with the timestamp before allowing any qualification.',
  },
  {
    date: '04/18/2024', ex: 'Ex. 11', actors: 'Harmon',
    fact: 'Sworn declaration states he never saw Calloway at the facility.',
    issue: 'SCIENTER',
    use: 'Lock in the declaration first, then hand him Exhibit 7.',
  },
  {
    date: '07/31/2024', ex: 'Ex. 14', actors: 'Harmon; Counsel',
    fact: 'Interrogatory response omits the shared access entirely.',
    issue: 'OMISSION',
    use: 'Use to show the omission repeated, rather than a single lapse.',
  },
]

const WITNESS_COLS = ['Date', 'Ex.', 'Actor(s)', 'Event / Fact', 'Issue', 'Deposition Use']

function WitnessChronologyDemo() {
  const p = usePalette()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    let cancelled = false
    const timers: NodeJS.Timeout[] = []
    function run() {
      if (cancelled) return
      setShown(0)
      WITNESS_ROWS.forEach((_, i) => {
        timers.push(setTimeout(() => { if (!cancelled) setShown(i + 1) }, 400 + i * 420))
      })
      timers.push(setTimeout(run, 400 + WITNESS_ROWS.length * 420 + 3600))
    }
    run()
    return () => { cancelled = true; timers.forEach(clearTimeout) }
  }, [])

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', background: p.card, border: `1px solid ${p.border}`, borderRadius: 10, overflow: 'hidden' }}>
      {/* Document header */}
      <div style={{ padding: '16px 20px 14px', borderBottom: `1px solid ${p.border}` }}>
        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: p.heading, letterSpacing: '-0.01em', marginBottom: 6 }}>
          Witness Chronology
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontSize: '0.58rem', fontWeight: 300, color: p.label }}>
          <span style={{ color: p.body }}>Harmon, R.</span>
          <span style={{ fontStyle: 'italic' }}>Facilities Lead / Central Access Witness</span>
          <span style={{ color: p.faint }}>·</span>
          <span>{WITNESS_ROWS.length} anchor exhibits</span>
          <span style={{ color: p.faint }}>·</span>
          <span style={{ color: '#c8a96e' }}>Attorney Work Product</span>
        </div>
      </div>

      {/* Table */}
      <div className="chrono-scroll">
        <table style={{ width: '100%', minWidth: 820, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: p.inset }}>
              {WITNESS_COLS.map(c => (
                <th key={c} style={{
                  textAlign: 'left', padding: '8px 12px',
                  borderBottom: `1px solid ${p.border}`,
                  fontFamily: 'var(--font-sans)', fontSize: '0.48rem', fontWeight: 400,
                  letterSpacing: '0.14em', textTransform: 'uppercase', color: p.label,
                  whiteSpace: 'nowrap',
                }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {WITNESS_ROWS.map((r, i) => {
              const visible = i < shown
              return (
                <tr key={r.ex} style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(6px)',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                }}>
                  <td style={{ padding: '11px 12px', borderBottom: `1px solid ${p.hair}`, verticalAlign: 'top', fontFamily: 'monospace', fontSize: '0.5rem', color: p.faint, whiteSpace: 'nowrap' }}>{r.date}</td>
                  <td style={{ padding: '11px 12px', borderBottom: `1px solid ${p.hair}`, verticalAlign: 'top', fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 400, color: p.heading, whiteSpace: 'nowrap' }}>{r.ex}</td>
                  <td style={{ padding: '11px 12px', borderBottom: `1px solid ${p.hair}`, verticalAlign: 'top', fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 300, color: p.label, whiteSpace: 'nowrap' }}>{r.actors}</td>
                  <td style={{ padding: '11px 12px', borderBottom: `1px solid ${p.hair}`, verticalAlign: 'top', fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 300, color: p.body, lineHeight: 1.5, minWidth: 220 }}>{r.fact}</td>
                  <td style={{ padding: '11px 12px', borderBottom: `1px solid ${p.hair}`, verticalAlign: 'top' }}><IssueChip label={r.issue} /></td>
                  <td style={{ padding: '11px 12px', borderBottom: `1px solid ${p.hair}`, verticalAlign: 'top', fontFamily: 'var(--font-sans)', fontSize: '0.64rem', fontWeight: 300, fontStyle: 'italic', color: p.label, lineHeight: 1.5, minWidth: 220 }}>{r.use}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ padding: '8px 20px', background: p.chrome, borderTop: `1px solid ${p.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '0.48rem', color: p.faint }}>Ordered by date · grouped by witness</span>
        <span style={{ fontFamily: 'monospace', fontSize: '0.48rem', color: '#c8a96e', letterSpacing: '0.06em' }}>EXPORT OUTLINE</span>
      </div>
    </div>
  )
}

// ─── HEAT MAP ─────────────────────────────────────────────────────────────────

const HEAT_LINES = [
  { s: 'Q', t: 'Were you at the facility on March 14th?',                          r: 0 },
  { s: 'A', t: 'Yes. I was there from six until approximately nine.',              r: 0 },
  { s: 'Q', t: 'Did you interact with Mr. Calloway that evening?',                r: 0 },
  { s: 'A', t: 'No. I never saw Calloway there.',                                  r: 0 },
  { s: 'Q', t: 'What was your purpose at the facility?',                          r: 0 },
  { s: 'A', t: 'Routine server maintenance. Standard check.',                     r: 0 },
  { s: 'Q', t: 'Were you accompanied by anyone that evening?',                    r: 0 },
  { s: 'A', t: 'No, I was alone the entire time.',                                r: 1, note: 'Watch: inconsistent with badge log' },
  { s: 'Q', t: 'Exhibit 3. Your badge log shows entry at 7:43 PM.',             r: 0 },
  { s: 'A', t: 'That log... may have errors in it.',                              r: 2, note: 'Evasion: challenging document integrity' },
  { s: 'Q', t: "You're saying the facility's badge log is inaccurate?",           r: 0 },
  { s: 'A', t: 'I... yes. It sometimes misrecords entries.',                      r: 2, note: 'Hedging: qualified denial, evasion pattern' },
  { s: 'Q', t: 'Exhibit 7. Calloway\'s badge, same exact timestamp as yours.', r: 0 },
  { s: 'A', t: "I may have seen him briefly. I didn't think it was relevant.",    r: 3, note: 'CONTRADICTION: "I never saw Calloway" (4:12)' },
  { s: 'Q', t: 'You testified moments ago you never saw him. Which is accurate?', r: 0 },
  { s: 'A', t: 'It was brief. I forgot.',                                         r: 3, note: 'Memory lapse: consider immediate impeachment' },
  { s: 'Q', t: 'How many times have you revised this account today?',             r: 0 },
  { s: 'A', t: 'This is the first time.',                                         r: 3, note: 'DEMONSTRABLY FALSE: see declaration 4/18' },
]

const RISK_BG   = ['rgba(255,255,255,0.02)', 'rgba(253,203,110,0.12)', 'rgba(255,165,2,0.18)', 'rgba(255,71,87,0.18)']
const RISK_GUTTER = ['rgba(255,255,255,0.06)', '#fdcb6e', '#ffa502', '#ff4757']
const RISK_LABEL  = ['', 'WATCH', 'INCONSISTENT', 'CONTRADICTION']

function HeatMapDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTriggered(true); io.disconnect() }
    }, { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const riskCounts = [0, 1, 2, 3].map(r => HEAT_LINES.filter(l => l.r === r).length)

  return (
    <div ref={ref} style={{ background: '#090909', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.7)', maxWidth: 820, margin: '0 auto' }}>
      <div style={{ background: '#0f0f0f', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
        {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#222' }}/>)}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, padding: '3px 18px', fontFamily: 'monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)' }}>
            app.ithildin.com/depose/harmon-v-calloway/heatmap
          </div>
        </div>
      </div>
      <div style={{ padding: '8px 18px', background: '#0b0b0b', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 300, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em' }}>Deposition Heat Map · Robert Harmon</span>
        <div style={{ display: 'flex', gap: 12 }}>
          {[['#2ed573','Clean',riskCounts[0]],['#fdcb6e','Watch',riskCounts[1]],['#ffa502','Inconsistent',riskCounts[2]],['#ff4757','Contradiction',riskCounts[3]]].map(([c,l,n]) => (
            <div key={l as string} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: 1, background: c as string }}/>
              <span style={{ fontFamily: 'monospace', fontSize: '0.4rem', color: 'rgba(255,255,255,0.3)' }}>{l} ({n})</span>
            </div>
          ))}
        </div>
      </div>
      {/* Body: transcript + minimap */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 28px', height: 340 }}>
        {/* Transcript */}
        <div style={{ overflowY: 'auto', padding: '6px 0' }}>
          {HEAT_LINES.map((line, i) => (
            <div key={i} style={{
              display: 'flex', gap: 0,
              background: RISK_BG[line.r],
              borderLeft: `3px solid ${RISK_GUTTER[line.r]}`,
              opacity: triggered ? 1 : 0,
              transform: triggered ? 'none' : 'translateX(-4px)',
              transition: `opacity 0.35s ease ${i * 0.04}s, transform 0.35s ease ${i * 0.04}s`,
            }}>
              <span style={{ fontFamily: 'monospace', fontSize: '0.46rem', color: 'rgba(255,255,255,0.15)', padding: '5px 8px 5px 6px', minWidth: 30, textAlign: 'right', flexShrink: 0 }}>{i + 1}</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.48rem', color: line.s === 'Q' ? 'rgba(130,130,200,0.5)' : 'rgba(200,200,200,0.22)', padding: '5px 6px 5px 0', flexShrink: 0 }}>{line.s}</span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 300, color: line.r === 0 ? 'rgba(255,255,255,0.42)' : line.r === 3 ? 'rgba(255,200,200,0.75)' : 'rgba(255,255,255,0.6)', padding: '4px 10px 4px 4px', lineHeight: 1.45, flex: 1, minWidth: 0 }}>
                {line.t}
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4px 8px', gap: 2, flexShrink: 0, minWidth: line.r > 0 ? 'auto' : 0 }}>
                {line.r > 0 && (
                  <>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.38rem', letterSpacing: '0.08em', color: RISK_GUTTER[line.r], whiteSpace: 'nowrap' }}>{RISK_LABEL[line.r]}</span>
                    {line.note && <span style={{ fontFamily: 'monospace', fontSize: '0.36rem', color: 'rgba(255,255,255,0.25)', maxWidth: 200, lineHeight: 1.3 }}>{line.note}</span>}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* Minimap */}
        <div style={{ borderLeft: '1px solid rgba(255,255,255,0.04)', display: 'flex', flexDirection: 'column', padding: '6px 4px', gap: 1 }}>
          {HEAT_LINES.map((line, i) => (
            <div key={i} style={{ flex: 1, borderRadius: 1, background: line.r === 0 ? 'rgba(255,255,255,0.07)' : RISK_GUTTER[line.r], opacity: triggered ? (line.r === 0 ? 0.5 : 0.85) : 0, transition: `opacity 0.3s ease ${i * 0.03}s`, boxShadow: line.r === 3 ? `0 0 3px ${RISK_GUTTER[line.r]}80` : 'none' }} />
          ))}
        </div>
      </div>
      <div style={{ padding: '7px 18px', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '0.42rem', color: 'rgba(255,255,255,0.18)' }}>
          {riskCounts[3]} contradiction{riskCounts[3] !== 1 ? 's' : ''} · {riskCounts[2]} inconsistenc{riskCounts[2] !== 1 ? 'ies' : 'y'} · {riskCounts[1]} watch flag{riskCounts[1] !== 1 ? 's' : ''}
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: '0.42rem', color: 'rgba(255,255,255,0.1)' }}>Every line color-coded in real time</span>
      </div>
    </div>
  )
}

// ─── DEPOSITION INTELLIGENCE REPORT ──────────────────────────────────────────

const W_METRICS = [
  { label: 'Consistency Index',         v: 34, color: '#ff4757', note: '12 deviations flagged · page:line cited' },
  { label: 'Evasion Rate',              v: 67, color: '#ffa502', note: 'Deflection cluster: Qs 4, 7, 11, 14' },
  { label: 'Contradiction Density',     v: 83, color: '#ff4757', disp: '8.3/hr', note: '2.1× above firm historical average' },
  { label: 'Exhibit Response Accuracy', v: 41, color: '#ffa502', note: 'Recall failure on Ex. 3, 7, 12' },
  { label: 'Correction Frequency',      v: 60, color: '#fd79a8', disp: '6×', note: '4 self-amendments on material facts' },
]

const D_METRICS = [
  { label: 'Question Efficiency',       v: 82, color: '#2ed573', note: 'Strong productive-to-total ratio' },
  { label: 'Follow-Up Capture Rate',    v: 71, color: '#1e90ff', note: '4 AI-suggested threads not pursued' },
  { label: 'Exhibit Utilization',       v: 71, color: '#00d2d3', disp: '5 / 7', note: 'Strategic deployment timing: solid' },
  { label: 'Timeline Coverage',         v: 88, color: '#2ed573', note: '3 key case events not addressed' },
  { label: 'Pressure Point Conversion', v: 64, color: '#ffa502', note: '36% of flagged contradictions passed over' },
]

const CW = [
  { name: 'Robert Harmon', role: 'Primary Deponent',     score: 4.2, bar: 42, vuln: 8, color: '#ff4757', badge: 'HIGH RISK'  },
  { name: 'Patricia Chen', role: 'Corroborating · CFO',  score: 8.1, bar: 81, vuln: 1, color: '#2ed573', badge: 'STABLE'     },
  { name: 'David Mills',   role: 'Adverse · Facilities', score: 6.3, bar: 63, vuln: 4, color: '#ffa502', badge: 'VULNERABLE' },
]

const CONFLICTS_DATA = [
  { a: 'Harmon', b: 'Mills', sev: 'HIGH', topic: 'Server room access: timing conflicts by 47 minutes' },
  { a: 'Harmon', b: 'Chen',  sev: 'HIGH', topic: 'Authorization chain for facility entry diverges' },
  { a: 'Mills',  b: 'Chen',  sev: 'MED',  topic: 'Q4 disclosure: Chen confirms, Mills denies knowledge' },
]

function ScoreArc({ v, color, size = 92 }: { v: number; color: string; size?: number }) {
  const r = size * 0.38, cx = size / 2, cy = size / 2
  const circ = 2 * Math.PI * r
  const arc = circ * 0.75
  const fill = (v / 10) * arc
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(135deg)', display: 'block' }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.07)"
        strokeWidth={3.5} strokeDasharray={`${arc} ${circ - arc}`} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color}
        strokeWidth={3.5} strokeDasharray={`${fill} ${circ - fill}`} strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${color}70)`, transition: 'stroke-dasharray 1.1s cubic-bezier(.4,0,.2,1) 0.2s' }}
      />
    </svg>
  )
}

function IntelReportDemo() {
  const [tab, setTab] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTriggered(true); setTrigger(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!triggered) return
    setTrigger(false)
    const t = setTimeout(() => setTrigger(true), 60)
    return () => clearTimeout(t)
  }, [tab]) // eslint-disable-line react-hooks/exhaustive-deps

  const metrics = tab === 0 ? W_METRICS : D_METRICS
  const scoreVal = tab === 0 ? 4.2 : 7.8
  const scoreColor = tab === 0 ? '#ff4757' : '#2ed573'
  const TABS = ['Witness Intelligence', 'Depo Performance', 'Cross-Witness Intel']
  const TAB_COLORS = ['#ff4757', '#2ed573', '#a29bfe']

  return (
    <div ref={ref} style={{
      background: '#090909', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
      maxWidth: 820, margin: '0 auto',
    }}>
      {/* Chrome */}
      <div style={{ background: '#0f0f0f', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
        {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#222' }}/>)}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, padding: '3px 18px', fontFamily: 'monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)' }}>
            app.ithildin.com/reports/harmon-v-calloway
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: '#0c0c0c', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', padding: '0 14px' }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            padding: '9px 14px', background: 'transparent', border: 'none',
            borderBottom: tab === i ? `1.5px solid ${TAB_COLORS[i]}` : '1.5px solid transparent',
            fontFamily: 'monospace', fontSize: '0.52rem', letterSpacing: '0.08em', textTransform: 'uppercase',
            color: tab === i ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.22)',
            cursor: 'pointer', transition: 'all 0.18s ease', whiteSpace: 'nowrap',
          }}>
            {t}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', paddingRight: 2 }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.44rem', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.05em' }}>
            Harmon v. Calloway · 3 depositions
          </span>
        </div>
      </div>

      {/* Body */}
      {tab < 2 ? (
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', height: 345 }}>
          {/* Score panel */}
          <div style={{ borderRight: '1px solid rgba(255,255,255,0.05)', background: '#080808', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px 16px', gap: 10 }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.42rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', textAlign: 'center' }}>
              {tab === 0 ? 'Credibility Score' : 'Performance Score'}
            </p>
            <div style={{ position: 'relative', width: 92, height: 92 }}>
              <ScoreArc v={trigger ? scoreVal : 0} color={scoreColor} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.55rem', color: scoreColor, lineHeight: 1, filter: `drop-shadow(0 0 8px ${scoreColor}55)` }}>
                  {scoreVal}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: '0.4rem', color: 'rgba(255,255,255,0.22)' }}>/10</span>
              </div>
            </div>
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 300, color: 'rgba(255,255,255,0.45)' }}>
                {tab === 0 ? 'Robert Harmon' : 'Harmon v. Calloway'}
              </p>
              <span style={{ fontFamily: 'monospace', fontSize: '0.4rem', letterSpacing: '0.12em', color: scoreColor, background: `${scoreColor}15`, border: `1px solid ${scoreColor}28`, borderRadius: 3, padding: '2px 7px', textTransform: 'uppercase' }}>
                {tab === 0 ? 'HIGH RISK' : 'ABOVE AVERAGE'}
              </span>
            </div>
            {/* Sparkline */}
            <svg width={118} height={22} style={{ opacity: 0.3, marginTop: 4 }}>
              {([18,13,15,9,12,6,10,5,8,3] as number[]).map((y, i, arr) => i === 0 ? null : (
                <line key={i} x1={13*(i-1)} y1={arr[i-1]} x2={13*i} y2={y}
                  stroke={scoreColor} strokeWidth={1.2} strokeLinecap="round" />
              ))}
              {([18,13,15,9,12,6,10,5,8,3] as number[]).map((y, i) => (
                <circle key={i} cx={13*i} cy={y} r={1.3} fill={scoreColor} />
              ))}
            </svg>
          </div>

          {/* Metrics */}
          <div style={{ padding: '18px 20px', overflowY: 'auto' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.42rem', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.16)', textTransform: 'uppercase', marginBottom: 16 }}>
              {tab === 0 ? 'Credibility Breakdown' : 'Strategy Breakdown'}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {metrics.map((m, i) => (
                <div key={m.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)' }}>{m.label}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: m.color, filter: `drop-shadow(0 0 3px ${m.color}50)` }}>
                      {m.disp ?? `${m.v}%`}
                    </span>
                  </div>
                  <div style={{ height: 2.5, background: 'rgba(255,255,255,0.05)', borderRadius: 2, marginBottom: 4, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 2,
                      background: `linear-gradient(90deg, ${m.color}88, ${m.color})`,
                      boxShadow: `0 0 6px ${m.color}50`,
                      width: trigger ? `${m.v}%` : '0%',
                      transition: `width 0.75s cubic-bezier(.4,0,.2,1) ${i * 0.1}s`,
                    }} />
                  </div>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.44rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.02em' }}>{m.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Cross-Witness */
        <div style={{ height: 345, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {/* Witnesses */}
          <div style={{ borderRight: '1px solid rgba(255,255,255,0.05)', padding: '18px 20px', overflowY: 'auto' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.42rem', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.16)', textTransform: 'uppercase', marginBottom: 16 }}>
              Witness Registry · 3
            </p>
            {CW.map((w, i) => (
              <div key={w.name} style={{ paddingBottom: 14, marginBottom: i < CW.length - 1 ? 14 : 0, borderBottom: i < CW.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 7 }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 300, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>{w.name}</p>
                    <p style={{ fontFamily: 'monospace', fontSize: '0.42rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.04em' }}>{w.role}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: w.color, filter: `drop-shadow(0 0 4px ${w.color}50)`, display: 'block' }}>{w.score}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.38rem', letterSpacing: '0.1em', color: w.color, opacity: 0.65, textTransform: 'uppercase' }}>{w.badge}</span>
                  </div>
                </div>
                <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 1, overflow: 'hidden', marginBottom: 5 }}>
                  <div style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${w.color}60, ${w.color})`,
                    boxShadow: `0 0 5px ${w.color}40`,
                    width: trigger ? `${w.bar}%` : '0%',
                    transition: `width 0.8s cubic-bezier(.4,0,.2,1) ${i * 0.12}s`,
                  }} />
                </div>
                <span style={{ fontFamily: 'monospace', fontSize: '0.4rem', color: 'rgba(255,255,255,0.18)' }}>
                  {w.vuln} impeachment point{w.vuln !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>

          {/* Conflicts */}
          <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.42rem', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.16)', textTransform: 'uppercase', marginBottom: 16 }}>
              Testimony Conflicts · {CONFLICTS_DATA.length}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {CONFLICTS_DATA.map((c, i) => (
                <div key={i} style={{
                  padding: '9px 11px',
                  background: 'rgba(255,255,255,0.015)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderLeft: `2px solid ${c.sev === 'HIGH' ? '#ff4757' : '#ffa502'}`,
                  borderRadius: '0 4px 4px 0',
                  opacity: trigger ? 1 : 0,
                  transform: trigger ? 'translateY(0)' : 'translateY(6px)',
                  transition: `opacity 0.4s ease ${i * 0.12 + 0.1}s, transform 0.4s ease ${i * 0.12 + 0.1}s`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.44rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
                      {c.a} ↔ {c.b}
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.4rem', letterSpacing: '0.1em', color: c.sev === 'HIGH' ? '#ff4757' : '#ffa502' }}>{c.sev}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.63rem', fontWeight: 300, color: 'rgba(255,255,255,0.42)', lineHeight: 1.4 }}>{c.topic}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <p style={{ fontFamily: 'monospace', fontSize: '0.4rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.14)', textTransform: 'uppercase', marginBottom: 8 }}>
                Impeachment Priority
              </p>
              {[...CW].sort((a, b) => b.vuln - a.vuln).map(w => (
                <div key={w.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>{w.name}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.52rem', color: w.color, filter: `drop-shadow(0 0 3px ${w.color}40)` }}>{w.vuln} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ padding: '7px 18px', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          {[
            { dot: '#ff4757', label: '4.2 · Harmon · HIGH RISK' },
            { dot: '#2ed573', label: '7.8 · Depo · ABOVE AVG' },
            { dot: '#a29bfe', label: '3 conflicts · 13 vuln. pts' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: f.dot, boxShadow: `0 0 4px ${f.dot}80` }} />
              <span style={{ fontFamily: 'monospace', fontSize: '0.42rem', color: 'rgba(255,255,255,0.14)' }}>{f.label}</span>
            </div>
          ))}
        </div>
        <span style={{ fontFamily: 'monospace', fontSize: '0.42rem', color: 'rgba(255,255,255,0.1)' }}>
          Generated · 01:14:32 post-deposition
        </span>
      </div>
    </div>
  )
}

// ─── PSYCHOLOGICAL PROFILE ────────────────────────────────────────────────────

const PSYCH_STAGES = [
  {
    time: '0:28',
    label: 'Baseline Established',
    color: '#7c6fff',
    // chart values: all axes show "concern level" (confidence/consistency inverted)
    chart: [28, 28, 31, 22, 25],
    dims: [
      { name: 'Defensiveness',         raw: 28, hi: true,  note: 'Cooperative: direct, unqualified responses' },
      { name: 'Confidence',            raw: 72, hi: false, note: 'Steady delivery: minimal response latency' },
      { name: 'Deception Indicators',  raw: 31, hi: true,  note: 'Within baseline range: no flags' },
      { name: 'Narrative Consistency', raw: 78, hi: false, note: 'Tight: story holds across all segments' },
      { name: 'Pressure Response',     raw: 25, hi: true,  note: 'Stable: no avoidance on direct questions' },
    ],
  },
  {
    time: '1:02',
    label: 'Stress Emerging',
    color: '#b36fff',
    chart: [51, 52, 58, 38, 44],
    dims: [
      { name: 'Defensiveness',         raw: 51, hi: true,  note: '↑ Hedging language detected: Qs 7, 11, 14' },
      { name: 'Confidence',            raw: 48, hi: false, note: '↓ Response latency increasing (+0.8s avg)' },
      { name: 'Deception Indicators',  raw: 58, hi: true,  note: '⚡ Deviation from baseline: flagging' },
      { name: 'Narrative Consistency', raw: 62, hi: false, note: '↓ Minor gaps appearing in 0–30 min account' },
      { name: 'Pressure Response',     raw: 44, hi: true,  note: '↑ Answer quality drops on exhibit challenges' },
    ],
  },
  {
    time: '1:14',
    label: 'Critical Zone',
    color: '#ff5f8d',
    chart: [74, 69, 82, 61, 71],
    dims: [
      { name: 'Defensiveness',         raw: 74, hi: true,  note: '⚠ 14 qualifiers in last 8 responses' },
      { name: 'Confidence',            raw: 31, hi: false, note: '⚠ 6 self-corrections: over-explanation pattern' },
      { name: 'Deception Indicators',  raw: 82, hi: true,  note: '🔴 2.4σ above baseline: strong pattern detected' },
      { name: 'Narrative Consistency', raw: 39, hi: false, note: '🔴 3 direct contradictions confirmed' },
      { name: 'Pressure Response',     raw: 71, hi: true,  note: '⚠ Sharp degradation on badge log exhibits' },
    ],
  },
]

function radarPts(vals: number[], size: number) {
  const cx = size / 2, cy = size / 2, r = size * 0.36
  return vals.map((v, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / vals.length
    const ratio = v / 100
    return [cx + ratio * r * Math.cos(angle), cy + ratio * r * Math.sin(angle)] as [number, number]
  })
}

function radarGrid(size: number, n: number, rings: number) {
  const cx = size / 2, cy = size / 2, r = size * 0.36
  return Array.from({ length: rings }, (_, ri) => {
    const ratio = (ri + 1) / rings
    const pts = Array.from({ length: n }, (__, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n
      return `${cx + ratio * r * Math.cos(angle)},${cy + ratio * r * Math.sin(angle)}`
    })
    return pts.join(' ')
  })
}

function PsychProfileDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState(0)
  const [triggered, setTriggered] = useState(false)
  const [vals, setVals] = useState(PSYCH_STAGES[0].chart)
  const animRef = useRef<number>()
  const fromVals = useRef(PSYCH_STAGES[0].chart)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTriggered(true); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Auto-cycle stages
  useEffect(() => {
    if (!triggered) return
    const t = setInterval(() => setStage(s => (s + 1) % PSYCH_STAGES.length), 3200)
    return () => clearInterval(t)
  }, [triggered])

  // Tween toward new stage values
  useEffect(() => {
    const target = PSYCH_STAGES[stage].chart
    const from = [...fromVals.current]
    let start = 0
    const dur = 1100
    if (animRef.current) cancelAnimationFrame(animRef.current)
    function step(ts: number) {
      if (!start) start = ts
      const t = Math.min((ts - start) / dur, 1)
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
      setVals(from.map((v, i) => v + (target[i] - v) * e))
      if (t < 1) animRef.current = requestAnimationFrame(step)
      else fromVals.current = target
    }
    animRef.current = requestAnimationFrame(step)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [stage])

  const s = PSYCH_STAGES[stage]
  const pts = radarPts(vals, 220)
  const ptsStr = pts.map(([x, y]) => `${x},${y}`).join(' ')
  const grid = radarGrid(220, 5, 4)
  const axisLabels = ['Defensiveness', 'Confidence', 'Deception', 'Consistency', 'Pressure']
  const SIZE = 220

  return (
    <div ref={ref} style={{
      background: '#090909', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
      maxWidth: 820, margin: '0 auto',
    }}>
      {/* Chrome */}
      <div style={{ background: '#0f0f0f', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
        {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: '#222' }}/>)}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, padding: '3px 18px', fontFamily: 'monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)' }}>
            app.ithildin.com/profile/harmon · psychological analysis
          </div>
        </div>
        {/* Live indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, animation: 'pulse 1.5s ease-in-out infinite', boxShadow: `0 0 6px ${s.color}` }}/>
          <span style={{ fontFamily: 'monospace', fontSize: '0.48rem', color: s.color, letterSpacing: '0.1em' }}>LIVE</span>
        </div>
      </div>

      {/* Header bar */}
      <div style={{ padding: '9px 18px', background: '#0b0b0b', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 300, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em' }}>
          Witness Psychological Profile · Robert Harmon
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {PSYCH_STAGES.map((st, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, opacity: stage === i ? 1 : 0.3, transition: 'opacity 0.3s' }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: st.color }} />
              <span style={{ fontFamily: 'monospace', fontSize: '0.44rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em' }}>{st.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', height: 340 }}>
        {/* Radar */}
        <div style={{ borderRight: '1px solid rgba(255,255,255,0.05)', background: '#080808', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 10px', gap: 12 }}>
          <svg width={SIZE} height={SIZE} style={{ overflow: 'visible' }}>
            {/* Grid rings */}
            {grid.map((pts, i) => (
              <polygon key={i} points={pts} fill="none"
                stroke="rgba(255,255,255,0.05)" strokeWidth={0.8} />
            ))}
            {/* Axis lines */}
            {Array.from({ length: 5 }, (_, i) => {
              const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5
              const r = SIZE * 0.36
              return (
                <line key={i}
                  x1={SIZE/2} y1={SIZE/2}
                  x2={SIZE/2 + r * Math.cos(angle)}
                  y2={SIZE/2 + r * Math.sin(angle)}
                  stroke="rgba(255,255,255,0.07)" strokeWidth={0.8} />
              )
            })}
            {/* Ghost trail, previous stage */}
            <polygon points={radarPts(PSYCH_STAGES[Math.max(0, stage - 1)].chart, SIZE).map(([x,y]) => `${x},${y}`).join(' ')}
              fill={`${PSYCH_STAGES[Math.max(0, stage - 1)].color}08`}
              stroke={`${PSYCH_STAGES[Math.max(0, stage - 1)].color}22`}
              strokeWidth={1} strokeDasharray="3 3" />
            {/* Main polygon */}
            <polygon points={ptsStr}
              fill={`${s.color}18`}
              stroke={s.color}
              strokeWidth={1.5}
              style={{ filter: `drop-shadow(0 0 6px ${s.color}60)`, transition: 'fill 0.6s ease, stroke 0.6s ease' }}
            />
            {/* Data points */}
            {pts.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={3}
                fill={s.color}
                style={{ filter: `drop-shadow(0 0 4px ${s.color})` }} />
            ))}
            {/* Axis labels */}
            {Array.from({ length: 5 }, (_, i) => {
              const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5
              const r = SIZE * 0.36 + 16
              const x = SIZE/2 + r * Math.cos(angle)
              const y = SIZE/2 + r * Math.sin(angle)
              return (
                <text key={i} x={x} y={y}
                  textAnchor="middle" dominantBaseline="middle"
                  fontFamily="monospace" fontSize="7.5"
                  fill="rgba(255,255,255,0.28)"
                  letterSpacing="0.5">
                  {axisLabels[i]}
                </text>
              )
            })}
          </svg>
          {/* Stage label */}
          <div style={{ textAlign: 'center' }}>
            <span style={{
              fontFamily: 'monospace', fontSize: '0.44rem', letterSpacing: '0.1em',
              color: s.color, background: `${s.color}15`,
              border: `1px solid ${s.color}30`, borderRadius: 3,
              padding: '2px 8px', textTransform: 'uppercase',
              transition: 'color 0.6s, background 0.6s, border-color 0.6s',
              boxShadow: `0 0 8px ${s.color}20`,
            }}>
              {s.label}
            </span>
          </div>
        </div>

        {/* Dimensions */}
        <div style={{ padding: '18px 22px', overflowY: 'auto' }}>
          <p style={{ fontFamily: 'monospace', fontSize: '0.42rem', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.16)', textTransform: 'uppercase', marginBottom: 18 }}>
            Behavioral Dimensions · {s.time}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {s.dims.map((d, i) => {
              const barVal = d.hi ? d.raw : 100 - d.raw
              const barColor = barVal > 65 ? '#ff4757' : barVal > 40 ? '#ffa502' : '#2ed573'
              return (
                <div key={d.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 300, color: 'rgba(255,255,255,0.52)' }}>{d.name}</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', color: barColor, filter: `drop-shadow(0 0 3px ${barColor}50)`, transition: 'color 0.5s' }}>
                      {d.raw}%
                    </span>
                  </div>
                  <div style={{ height: 2.5, background: 'rgba(255,255,255,0.05)', borderRadius: 2, marginBottom: 5, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 2,
                      background: `linear-gradient(90deg, ${barColor}88, ${barColor})`,
                      boxShadow: `0 0 5px ${barColor}50`,
                      width: `${d.raw}%`,
                      transition: `width 0.75s cubic-bezier(.4,0,.2,1) ${i * 0.08}s, background 0.5s ease`,
                    }} />
                  </div>
                  <p style={{ fontFamily: 'monospace', fontSize: '0.44rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.02em', transition: 'opacity 0.4s' }}>
                    {d.note}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '7px 18px', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '0.42rem', color: 'rgba(255,255,255,0.14)' }}>Dimensions: 5</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.42rem', color: 'rgba(255,255,255,0.14)' }}>Baseline locked: 0:18</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.42rem', color: s.color, transition: 'color 0.6s' }}>
            Profile status: {s.label}
          </span>
        </div>
        <span style={{ fontFamily: 'monospace', fontSize: '0.42rem', color: 'rgba(255,255,255,0.1)' }}>
          Updating every 90s · Harmon v. Calloway
        </span>
      </div>
    </div>
  )
}

export default function Product() {
  useReveal()

  return (
    <main style={{ background: 'var(--bg)' }}>
      <Nav />

      <section style={{ padding: '160px 52px 60px', textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
        <p className="label" style={{ marginBottom: 20 }}>Live Demonstration</p>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 20 }}>
          Watch Ithildin work
        </h1>
        <p className="msg-line msg-line--center">
          It isn&rsquo;t a better lawyer across the table. It&rsquo;s a better record.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>
          Live transcription, contradiction detection, and follow-up suggestions as testimony unfolds.
        </p>
      </section>

      <section style={{ padding: '0 52px 80px' }}>
        <DepoDemo />
      </section>

      {/* ── LIVE: Psych Profile + Heat Map ── */}
      {/* PsychProfile section hidden. Uncomment to restore
      <section style={{ padding: '60px 52px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <div className="reveal" style={{ marginBottom: 52 }}>
          <p className="label" style={{ marginBottom: 18 }}>Behavioral Intelligence</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 16 }}>
            The witness&rsquo;s psychology.<br/>Mapped in real time.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
            Ithildin builds a live psychological profile as testimony unfolds, tracking defensiveness, deception patterns, and narrative integrity across every 30-minute interval.
          </p>
        </div>
      </section>
      <section style={{ padding: '0 52px 60px' }}>
        <PsychProfileDemo />
      </section>
      */}

      <section style={{ padding: '40px 52px 20px', textAlign: 'center' }}>
        <div className="reveal" style={{ marginBottom: 48 }}>
          <p className="label" style={{ marginBottom: 18 }}>Deposition Heat Map</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 16 }}>
            Every line. Color-coded<br/>by risk.
          </h2>
          <p className="msg-line msg-line--center">
            Nothing you caught walks out of the room.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
            A visual transcript where clean testimony is green, inconsistencies are orange, and contradictions glow red. At a glance, see exactly where the deposition got dangerous.
          </p>
        </div>
      </section>
      <section style={{ padding: '0 52px 80px' }}>
        <HeatMapDemo />
      </section>

      {/* ── PRE-DEPOSITION: Master + Witness Chronology ── */}
      <section style={{ padding: '60px 52px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <div className="reveal" style={{ marginBottom: 52 }}>
          <p className="label" style={{ marginBottom: 18 }}>Before You Walk In</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 16 }}>
            The entire case story.<br/>One screen.
          </h2>
          <p className="msg-line msg-line--center">
            You did the prep. This makes sure none of it is wasted.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
            Upload your documents and Ithildin builds the case timeline and evidence map automatically. Gaps, conflicts, and all.
          </p>
        </div>
      </section>
      <section style={{ padding: '0 52px 48px' }}>
        <div className="reveal" style={{ marginBottom: 16 }}>
          <p className="demo-caption">Master Chronology</p>
        </div>
        <MasterChronologyDemo />
      </section>
      <section style={{ padding: '0 52px 80px' }}>
        <div className="reveal" style={{ marginBottom: 16 }}>
          <p className="demo-caption">Witness Chronology</p>
        </div>
        <WitnessChronologyDemo />
      </section>

      {/* ── POST-DEPOSITION: Analysis ── */}
      <section style={{ padding: '60px 52px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <div className="reveal" style={{ marginBottom: 52 }}>
          <p className="label" style={{ marginBottom: 18 }}>Post-Deposition Intelligence</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 16 }}>
            Every deposition.<br/>Scored. Analyzed. Mapped.
          </h2>
          <p className="msg-line msg-line--center">
            The gap isn&rsquo;t talent. It&rsquo;s what happens between the transcript and the brief.
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
            The moment testimony ends, Ithildin builds a complete intelligence report. Witness credibility scored, your strategy graded, and cross-witness conflicts surfaced automatically.
          </p>
        </div>
      </section>
      <section style={{ padding: '0 52px 80px' }}>
        <IntelReportDemo />
      </section>

      <section style={{ padding: '80px 52px 80px', borderTop: '1px solid rgba(255,255,255,0.06)', maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 60 }}>
          <p className="label" style={{ marginBottom: 18 }}>How It Works</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.4rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
            Four steps.<br/>Complete intelligence.
          </h2>
          <p className="msg-line" style={{ marginTop: 18 }}>
            Your instincts, with citations.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', borderTop: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { n: '01', title: 'Upload Documents', body: 'Case files, prior testimony, contracts, exhibits. Ithildin ingests and indexes everything automatically.' },
            { n: '02', title: 'Receive Your Outline', body: 'Structured outline with AI-suggested questions and exhibit references, ready to refine.' },
            { n: '03', title: 'Depose with Intelligence', body: 'Live transcription and contradiction detection. Flags appear the moment testimony conflicts.' },
            { n: '04', title: 'Review & Impeach', body: 'AI summaries, citations, a draft impeachment brief, and audio/video sync within minutes.' },
          ].map((s, i) => (
            <div key={s.n} className="reveal" style={{
              padding: '44px 40px', borderRight: '1px solid rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              transitionDelay: `${(i % 2) * 0.1}s`,
            }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#1a1a1a', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 20 }}>{s.n}</p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--white)', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.65 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '120px 52px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="reveal">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em', lineHeight: 1.08, marginBottom: 20 }}>
            Built for firms that can&rsquo;t<br/>afford to miss anything.
          </h2>
          <p className="msg-line" style={{ marginBottom: 44 }}>
            Assume the other side is already running it.
          </p>
          <Link href="/demo" className="btn btn-solid btn-rect">
            Book a Demo
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
