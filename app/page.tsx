'use client'
import { useEffect, useRef, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Link from 'next/link'

/* ── TYPEWRITER ── */
function useTypewriter(phrases: string[]) {
  const [text, setText] = useState('')
  useEffect(() => {
    let pi = 0, ci = 0, deleting = false, paused = false
    let t: NodeJS.Timeout

    function step() {
      const phrase = phrases[pi]
      if (paused) { paused = false; deleting = true; t = setTimeout(step, 100); return }
      if (!deleting) {
        if (ci < phrase.length) {
          setText(phrase.slice(0, ++ci))
          const speed = 70 + Math.random() * 50 + (phrase[ci - 1] === ' ' ? 30 : 0)
          t = setTimeout(step, speed)
        } else {
          if (pi === phrases.length - 1) return
          paused = true; t = setTimeout(step, 1100)
        }
      } else {
        if (ci > 0) { setText(phrase.slice(0, --ci)); t = setTimeout(step, 28 + Math.random() * 18) }
        else { deleting = false; pi = (pi + 1) % phrases.length; t = setTimeout(step, 180) }
      }
    }
    t = setTimeout(step, 400)
    return () => clearTimeout(t)
  }, [])
  return text
}

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
function VisUpload({ active }: { active: boolean }) {
  const [scanY, setScanY] = useState(0)
  const [aiVisible, setAiVisible] = useState(false)
  const animRef = useRef<NodeJS.Timeout>()

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
          setTimeout(() => {
            if (cancelled) return
            setAiVisible(true)
            setTimeout(run, 1800)
          }, 200)
        }
      }, 16)
    }
    run()
    return () => { cancelled = true }
  }, [active])

  return (
    <svg width="280" height="200" viewBox="0 0 280 200" fill="none">
      <rect x="40" y="60" width="200" height="110" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      <rect x="40" y="48" width="76" height="16" rx="2" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={65 + i*60} y="78" width="46" height="60" rx="2"
            fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
          <rect x={71 + i*60} y="88" width="28" height="1.5" rx="1" fill="rgba(255,255,255,0.16)"/>
          <rect x={71 + i*60} y="93" width="22" height="1.5" rx="1" fill="rgba(255,255,255,0.08)"/>
          <rect x={71 + i*60} y="98" width="25" height="1.5" rx="1" fill="rgba(255,255,255,0.08)"/>
          <rect x={71 + i*60} y="103" width="18" height="1.5" rx="1" fill="rgba(255,255,255,0.06)"/>
        </g>
      ))}
      {/* scan line */}
      <rect x="40" y={78 + scanY} width="200" height="1.5" fill="rgba(200,169,110,0.3)"/>
      {/* AI output */}
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
  { s: 'A', t: 'Yes. I arrived around six o\'clock.', q: false },
  { s: 'Q', t: 'Did you see Mr. Calloway?', q: true },
  { s: 'A', t: 'No. I never saw Calloway there.', q: false },
  { s: 'Q', t: 'Your badge log shows otherwise.', q: true },
]

function VisTranscript({ active }: { active: boolean }) {
  const [lines, setLines] = useState<typeof LIVE_LINES>([])
  const [lineCount, setLineCount] = useState(47)
  const idx = useRef(0)

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

  return (
    <div style={{ width: 260 }}>
      <div style={{
        background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 8, overflow: 'hidden',
      }}>
        <div style={{
          padding: '8px 14px', borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 300, color: 'rgba(200,200,200,0.3)', letterSpacing: '0.06em' }}>Live Transcript</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#e74c3c', animation: 'pulse 1.2s ease-in-out infinite' }}/>
            <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(231,76,60,0.8)', letterSpacing: '0.08em' }}>REC</span>
          </div>
        </div>
        <div style={{ padding: '12px 14px', minHeight: 130, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lines.map((l, i) => (
            <div key={i} style={{ display: 'flex', gap: 7, animation: 'fadeUp 0.3s ease forwards' }}>
              <span style={{
                fontFamily: 'monospace', fontSize: '0.5rem',
                color: l.q ? 'rgba(130,130,180,0.45)' : 'rgba(180,130,130,0.45)',
                marginTop: 2, width: 9, flexShrink: 0,
              }}>{l.s}</span>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.68rem', fontWeight: 300,
                color: l.q ? 'rgba(180,180,200,0.6)' : 'rgba(215,215,215,0.75)',
                fontStyle: l.q ? 'italic' : 'normal', lineHeight: 1.5,
              }}>{l.t}</p>
            </div>
          ))}
        </div>
        <div style={{
          padding: '7px 14px', borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{ display: 'flex', gap: 1.5, alignItems: 'center', height: 12 }}>
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} style={{
                width: 1.5, borderRadius: 1,
                height: `${3 + Math.abs(Math.sin(i * 0.9)) * 6}px`,
                background: 'rgba(180,180,180,0.18)',
                animation: `pulse ${0.5 + (i % 3) * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.06}s`,
              }}/>
            ))}
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(255,255,255,0.14)' }}>
            p.14 : l.{lineCount}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── FEATURE VIS: Contradiction ── */
function VisContradiction({ active }: { active: boolean }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!active) return
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2100),
    ]
    return () => timers.forEach(clearTimeout)
  }, [active])

  return (
    <div style={{ width: 280 }}>
      <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {step >= 1 && (
          <div style={{
            padding: '8px 12px', background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4,
            animation: 'fadeUp 0.35s ease forwards',
          }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(200,200,200,0.28)', marginBottom: 4, letterSpacing: '0.08em' }}>p.4:12</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 300, color: 'rgba(160,160,160,0.5)', lineHeight: 1.45, textDecoration: 'line-through' }}>
              "I never saw Calloway there."
            </p>
          </div>
        )}
        {step >= 2 && (
          <div style={{
            padding: '8px 12px', background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4,
            animation: 'fadeUp 0.35s ease forwards',
          }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(200,200,200,0.28)', marginBottom: 4, letterSpacing: '0.08em' }}>p.7:31</p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 300, color: 'rgba(215,215,215,0.75)', lineHeight: 1.45 }}>
              "I may have seen him briefly."
            </p>
          </div>
        )}
        {step >= 3 && (
          <div style={{
            padding: '10px 12px',
            background: 'rgba(192,57,43,0.08)',
            border: '1px solid rgba(192,57,43,0.18)',
            borderLeft: '2px solid rgba(192,57,43,0.6)',
            borderRadius: '0 4px 4px 0',
            animation: 'fadeUp 0.35s ease forwards',
          }}>
            <span style={{
              fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(231,76,60,0.75)',
              letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 5,
            }}>⚡ Contradiction Detected</span>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 300, color: 'rgba(255,150,140,0.65)', lineHeight: 1.45 }}>
              Badge log confirms shared server room access at 7:43 PM — Exhibit 7
            </p>
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
  { label: 'Basis',      text: 'Prior inconsistent statement — FRE 613' },
]

function VisBrief({ active }: { active: boolean }) {
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

  return (
    <div style={{ width: 270 }}>
      <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '16px 18px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.58rem', fontWeight: 300, color: 'rgba(200,200,200,0.28)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Impeachment Brief</span>
          <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(200,169,110,0.55)' }}>AUTO-GENERATED</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {BRIEF.slice(0, shown).map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
              animation: 'fadeUp 0.35s ease forwards',
            }}>
              <span style={{
                fontFamily: 'monospace', fontSize: '0.5rem',
                color: 'rgba(200,169,110,0.4)', whiteSpace: 'nowrap',
                marginTop: 2, minWidth: 50,
              }}>{item.label}</span>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 300, color: 'rgba(200,200,200,0.62)', lineHeight: 1.4 }}>
                {item.text}
              </p>
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

function VisCredibility({ active }: { active: boolean }) {
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
      const iv = setInterval(() => {
        if (cancelled) { clearInterval(iv); return }
        c++; setCount(c)
        if (c >= 48) clearInterval(iv)
      }, 18)
      CRED_ROWS.forEach((_, i) => setTimeout(() => { if (!cancelled) setRows(i + 1) }, 300 + i * 280))
      setTimeout(() => { if (!cancelled) setBars(true) }, 500)
      setTimeout(run, 300 + CRED_ROWS.length * 280 + 2000)
    }
    run()
    return () => { cancelled = true }
  }, [active])

  return (
    <div style={{ width: 280 }}>
      <div style={{ background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '18px 20px' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.6rem', fontWeight: 300, color: 'rgba(200,200,200,0.28)', letterSpacing: '0.06em' }}>Overall Credibility Score</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#e8e8e8' }}>{count}%</span>
          </div>
          <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 1, overflow: 'hidden' }}>
            <div style={{
              height: '100%', width: `${count}%`,
              background: 'linear-gradient(90deg, #e74c3c, #c8a96e)',
              borderRadius: 1, transition: 'width 0.1s linear',
            }}/>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CRED_ROWS.slice(0, rows).map((row, i) => (
            <div key={i} style={{ animation: 'fadeUp 0.35s ease forwards' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 300, color: 'rgba(130,130,130,0.5)' }}>{row.label}</span>
                <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: row.color }}>{row.score}%</span>
              </div>
              <div style={{ height: 2, background: 'rgba(255,255,255,0.04)', borderRadius: 1, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 1,
                  background: row.color,
                  width: bars ? `${row.score}%` : '0%',
                  transition: 'width 0.9s ease',
                }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── FEATURE SECTION WRAPPER ── */
function FeatSection({
  tag, title, body, vis, reverse = false, id,
}: {
  tag: string; title: string; body: string
  vis: (active: boolean) => React.ReactNode
  reverse?: boolean; id: string
}) {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !active) setActive(true) },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [active])

  const text = (
    <div style={{
      padding: '60px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      borderRight: reverse ? 'none' : '1px solid rgba(255,255,255,0.06)',
      borderLeft: reverse ? '1px solid rgba(255,255,255,0.06)' : 'none',
    }}>
      <span className="feat-tag">{tag}</span>
      <h3 className="feat-title">{title}</h3>
      <p className="feat-body">{body}</p>
    </div>
  )

  const visual = (
    <div className="feat-vis">{vis(active)}</div>
  )

  return (
    <div ref={ref} className="feat-section reveal" id={id}
      style={{ direction: 'ltr' }}>
      {reverse ? <>{visual}{text}</> : <>{text}{visual}</>}
    </div>
  )
}


/* ── BEAD WAVE ── */
function BeadWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // non-null aliases for use inside closures
    const cvs = canvas as HTMLCanvasElement
    const c2d = ctx as CanvasRenderingContext2D

    const ROWS = 22, COLS = 30
    let t = 0, animId: number, W = 0, H = 0

    function resize() {
      const dpr = window.devicePixelRatio || 1
      const rect = cvs.getBoundingClientRect()
      W = rect.width; H = rect.height
      cvs.width = W * dpr; cvs.height = H * dpr
      c2d.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    function draw() {
      c2d.clearRect(0, 0, W, H)
      const cx = W / 2

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const nx = col / (COLS - 1) - 0.5
          const ny = row / (ROWS - 1)

          const p = 0.18 + ny * 0.82

          const wave =
            Math.sin(nx * 5.5 + ny * 4.2 - t * 1.6) * 0.42 +
            Math.sin(nx * 2.8 - ny * 3.1 - t * 0.9) * 0.18

          const sx = cx + nx * W * 1.05 * p
          const sy = H * 0.06 + ny * H * 0.88 - wave * H * 0.13 * p

          const norm = Math.max(0, Math.min(1, (wave + 0.6) / 1.2))
          const alpha = 0.05 + norm * 0.62
          const r = Math.max(0.4, (0.7 + norm * 3.2) * p)

          c2d.beginPath()
          c2d.arc(sx, sy, r, 0, Math.PI * 2)
          c2d.fillStyle = `rgba(255,255,255,${Math.min(0.78, alpha).toFixed(2)})`
          c2d.fill()
        }
      }

      t += 0.012
      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
    />
  )
}

/* ── EMAIL SUBMIT ── */
function EmailCapture() {
  const [submitted, setSubmitted] = useState(false)
  const [val, setVal] = useState('')
  function submit() {
    if (!val || !val.includes('@')) return
    setSubmitted(true)
  }
  if (submitted) return (
    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 300, color: '#2e2e2e', letterSpacing: '0.03em' }}>
      You're on the list. We'll be in touch.
    </p>
  )
  return (
    <div className="email-wrap">
      <input
        className="email-input"
        type="email"
        placeholder="your@firm.com"
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
      />
      <button className="email-submit" onClick={submit}>Join Waitlist →</button>
    </div>
  )
}

/* ── PAGE ── */
export default function Home() {
  useReveal()
  const typed = useTypewriter(['Your AI Second Chair', 'Depose with Precision', 'Never Miss a Thread', 'Your AI Second Chair'])

  return (
    <main style={{ background: 'var(--bg)' }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        padding: '0 52px', position: 'relative', overflow: 'hidden',
      }}>
        <BeadWave />
        <div style={{
          position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -55%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 2,
        }}/>
        <div style={{ position: 'relative', zIndex: 3, maxWidth: 640, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className="label" style={{ marginBottom: 28 }}>AI Deposition Intelligence</p>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(3.2rem, 7.5vw, 6rem)',
            fontWeight: 400, lineHeight: 0.93, letterSpacing: '-0.025em',
            color: 'var(--white)', marginBottom: 28, minHeight: '1.05em',
          }}>
            {typed}<span className="cursor-blink"/>
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 300,
            color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 40, maxWidth: 320,
          }}>
            Upload your case files.<br />Depose with real-time AI intelligence — contradictions, inconsistencies, and follow-ups surfaced as testimony unfolds.
          </p>
          <EmailCapture />
          <p style={{
            marginTop: 14, fontFamily: 'var(--font-sans)', fontSize: '0.65rem',
            fontWeight: 300, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em',
          }}>Currently in private beta</p>
        </div>
        <div style={{
          position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)' }}/>
        </div>
      </section>

      <div className="line"/>

      {/* ── STAGES ── */}
      <section style={{ padding: '72px 52px 0', maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal">
          <p className="label" style={{ marginBottom: 18 }}>The Platform</p>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.4rem)',
            fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em',
            lineHeight: 1.05, marginBottom: 48,
          }}>Intelligence at every stage</h2>
        </div>
        <div className="stages-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
        }}>
          {[
            { n: '01', title: 'Prepare', body: 'AI case analysis. Deposition outlines. Exhibit management — before you walk in.' },
            { n: '02', title: 'Depose',  body: 'Live transcription. Contradiction detection. Follow-up suggestions — as testimony unfolds.' },
            { n: '03', title: 'Review',  body: 'AI summaries with page:line citations. Impeachment briefs. Full audio/video sync.' },
          ].map((s, i) => (
            <div key={s.n} className="reveal" style={{
              padding: '40px 32px',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              transitionDelay: `${i * 0.1}s`,
            }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#1a1a1a', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 18 }}>{s.n}</p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--white)', marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.65 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ANIMATED FEATURE SECTIONS ── */}
      <section style={{ maxWidth: 1100, margin: '72px auto 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="reveal" style={{ padding: '60px 52px 0' }}>
          <p className="label" style={{ marginBottom: 18 }}>Capabilities</p>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em',
            lineHeight: 1.1, marginBottom: 48,
          }}>Everything your case demands</h2>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <FeatSection id="f1" tag="Preparation" title="Case Analysis"
          body="Upload case files, prior depositions, and exhibits. Ithildin ingests and cross-references everything — surfacing the insights that matter before you walk in."
          vis={(a) => <VisUpload active={a} />}
        />
        <FeatSection id="f2" tag="Live Intelligence" title="Real-Time Transcription" reverse
          body="Ithildin listens and transcribes with speaker attribution, timestamps, and instant page:line references — as the witness speaks."
          vis={(a) => <VisTranscript active={a} />}
        />
        <FeatSection id="f3" tag="Live Intelligence" title="Contradiction Detection"
          body="The moment a witness contradicts prior testimony or your documents, Ithildin flags it — with the source, page, and line — in real time."
          vis={(a) => <VisContradiction active={a} />}
        />
        <FeatSection id="f4" tag="Post-Deposition" title="Impeachment Brief" reverse
          body="Automatically drafts impeachment sections from every contradiction found — cite-ready for court, generated within minutes of concluding."
          vis={(a) => <VisBrief active={a} />}
        />
        <FeatSection id="f5" tag="Intelligence" title="Witness Credibility"
          body="Consistency scoring across the full deposition. See where testimony holds, where it shifts, and where it breaks — mapped visually."
          vis={(a) => <VisCredibility active={a} />}
        />
      </div>

      {/* ── CTA ── */}
      <section style={{
        padding: '160px 52px', textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(200,200,200,0.02) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}/>
        <div className="reveal" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em',
            lineHeight: 1, marginBottom: 20,
          }}>
            Ready to depose<br/>with precision?
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', marginBottom: 44 }}>
            First deposition free. No credit card required.
          </p>
          <EmailCapture />
        </div>
      </section>

      <Footer />
    </main>
  )
}
