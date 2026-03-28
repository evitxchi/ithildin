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

const LINES = [
  { s: 'Q', t: 'Mr. Harmon, you were present at the facility on March 14th?', q: true },
  { s: 'A', t: 'Yes. I was there from six until approximately nine.', q: false },
  { s: 'Q', t: 'Did you interact with Mr. Calloway that evening?', q: true },
  { s: 'A', t: 'No. I never saw Calloway there.', q: false },
  { s: 'Q', t: 'Exhibit 7 — your badge and Calloway\'s both accessed the server room at 7:43 PM.', q: true },
  { s: 'A', t: "I — well, I may have seen him briefly. I didn't think it was relevant.", q: false,
    flag: { type: 'Contradiction', detail: 'Contradicts "I never saw Calloway there." (4:12) — Badge log confirms shared access at 7:43 PM.' } },
  { s: 'Q', t: 'You testified moments ago that you never saw him. Which is accurate?', q: true },
  { s: 'A', t: 'It was brief. I forgot.', q: false,
    flag: { type: 'Blunder', detail: 'Claimed definitive absence, now claims memory lapse. Consider immediate impeachment.' } },
]

function DepoDemo() {
  const [shown, setShown] = useState<typeof LINES>([])
  const [flagged, setFlagged] = useState<number[]>([])
  const [contra, setContra] = useState(0)
  const [blund, setBlund] = useState(0)
  const [lineCount, setLineCount] = useState(47)
  const scrollRef = useRef<HTMLDivElement>(null)
  const idx = useRef(0)

  useEffect(() => {
    let t: NodeJS.Timeout
    function next() {
      if (idx.current >= LINES.length) {
        idx.current = 0
        setShown([]); setFlagged([]); setContra(0); setBlund(0); setLineCount(47)
        t = setTimeout(next, 1400); return
      }
      const i = idx.current++
      const l = LINES[i]
      setShown(prev => [...prev, l])
      setLineCount(prev => prev + 3)
      setTimeout(() => { if (scrollRef.current) scrollRef.current.scrollTop = 9999 }, 80)
      if (l.flag) {
        setTimeout(() => {
          setFlagged(prev => [...prev, i])
          if (l.flag!.type === 'Contradiction') setContra(c => c + 1)
          else setBlund(b => b + 1)
        }, 950)
      }
      t = setTimeout(next, l.q ? 1900 : 2500)
    }
    t = setTimeout(next, 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div style={{
      background: '#090909', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12, overflow: 'hidden',
      boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
      maxWidth: 820, margin: '0 auto',
    }}>
      {/* Chrome */}
      <div style={{ background: '#0f0f0f', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
        {[1,2,3].map(d => <div key={d} style={{ width: 8, height: 8, borderRadius: '50%', background: '#222' }}/>)}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#161616', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, padding: '3px 18px', fontFamily: 'monospace', fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)' }}>
            app.ithildin.com/depose/harmon-v-calloway
          </div>
        </div>
      </div>
      {/* App header */}
      <div style={{ padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.04)', background: '#0b0b0b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 300, color: 'rgba(200,200,200,0.28)', letterSpacing: '0.04em' }}>
          Harmon v. Calloway — Deposition of Robert Harmon
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#e74c3c', animation: 'pulse 1.5s ease-in-out infinite' }}/>
            <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(231,76,60,0.8)', letterSpacing: '0.1em' }}>LIVE</span>
          </div>
          <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(255,255,255,0.14)' }}>01:14:32</span>
        </div>
      </div>
      {/* Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 230px', height: 360 }}>
        <div ref={scrollRef} style={{ overflowY: 'auto', padding: '16px 18px', borderRight: '1px solid rgba(255,255,255,0.04)' }}>
          {shown.map((l, i) => (
            <div key={i} style={{ display: 'flex', gap: 9, marginBottom: 12, animation: 'fadeUp 0.35s ease forwards' }}>
              <span style={{
                fontFamily: 'monospace', fontSize: '0.52rem',
                color: l.q ? 'rgba(130,130,180,0.42)' : 'rgba(180,130,130,0.42)',
                marginTop: 2, width: 10, flexShrink: 0,
              }}>{l.s}</span>
              <div style={{ flex: 1 }}>
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 300,
                  color: l.q ? 'rgba(180,180,200,0.62)' : 'rgba(215,215,215,0.82)',
                  fontStyle: l.q ? 'italic' : 'normal', lineHeight: 1.58,
                  ...(flagged.includes(i) ? {
                    background: 'rgba(192,57,43,0.15)',
                    borderBottom: '1px solid rgba(192,57,43,0.38)',
                    borderRadius: 2, padding: '1px 3px',
                  } : {}),
                }}>{l.t}</p>
                {flagged.includes(i) && l.flag && (
                  <div style={{
                    marginTop: 7, padding: '8px 11px',
                    background: 'rgba(192,57,43,0.07)',
                    border: '1px solid rgba(192,57,43,0.15)',
                    borderLeft: '2px solid rgba(192,57,43,0.6)',
                    borderRadius: '0 3px 3px 0',
                    animation: 'fadeUp 0.3s ease forwards',
                  }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(231,76,60,0.75)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>
                      {l.flag.type === 'Contradiction' ? '⚡ ' : '⚠ '}{l.flag.type}
                    </span>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.67rem', fontWeight: 300, color: 'rgba(255,150,140,0.62)', lineHeight: 1.45 }}>
                      {l.flag.detail}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 4, padding: '6px 0', opacity: 0.3 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', animation: `pulse ${0.8 + i * 0.2}s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }}/>
            ))}
          </div>
        </div>
        {/* Sidebar */}
        <div style={{ background: '#0a0a0a', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 14, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', marginBottom: 9 }}>Suggested Follow-Ups</p>
            {['Who authorized Calloway\'s access?', 'Why omitted from your declaration?', 'How many times revised your account?'].map((q, i) => (
              <div key={i} style={{ padding: '6px 8px', marginBottom: 5, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 5 }}>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 300, color: 'rgba(200,200,200,0.45)', lineHeight: 1.4 }}>{q}</p>
              </div>
            ))}
          </div>
          <div style={{ padding: 14 }}>
            <p style={{ fontFamily: 'monospace', fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', marginBottom: 9 }}>Session</p>
            {[
              { l: 'Contradictions', v: contra, c: '#e74c3c' },
              { l: 'Blunders', v: blund, c: '#c8a96e' },
              { l: 'Lines', v: lineCount, c: 'rgba(180,180,180,0.4)' },
              { l: 'Exhibits', v: 3, c: 'rgba(180,180,180,0.4)' },
            ].map(s => (
              <div key={s.l} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.62rem', fontWeight: 300, color: 'rgba(120,120,120,0.5)' }}>{s.l}</span>
                <span style={{ fontFamily: 'monospace', fontSize: '0.68rem', color: s.c }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Waveform */}
      <div style={{ padding: '7px 18px', background: '#0b0b0b', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 1.5, alignItems: 'center', height: 14 }}>
          {Array.from({ length: 22 }).map((_, i) => (
            <div key={i} style={{
              width: 2, borderRadius: 1, background: 'rgba(180,180,180,0.18)',
              height: `${4 + Math.abs(Math.sin(i * 0.85)) * 7}px`,
              animation: `pulse ${0.5 + (i % 3) * 0.18}s ease-in-out infinite`,
              animationDelay: `${i * 0.055}s`,
            }}/>
          ))}
        </div>
        <span style={{ fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(255,255,255,0.13)' }}>Recording · 44.1kHz</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: '0.5rem', color: 'rgba(255,255,255,0.11)' }}>
          p.14 : l.{lineCount}
        </span>
      </div>
    </div>
  )
}

// ─── DEPOSITION INTELLIGENCE REPORT ──────────────────────────────────────────

const W_METRICS = [
  { label: 'Consistency Index',         v: 34, color: '#ff4757', note: '12 deviations flagged · page:line cited' },
  { label: 'Evasion Rate',              v: 67, color: '#ffa502', note: 'Deflection cluster — Qs 4, 7, 11, 14' },
  { label: 'Contradiction Density',     v: 83, color: '#ff4757', disp: '8.3/hr', note: '2.1× above firm historical average' },
  { label: 'Exhibit Response Accuracy', v: 41, color: '#ffa502', note: 'Recall failure on Ex. 3, 7, 12' },
  { label: 'Correction Frequency',      v: 60, color: '#fd79a8', disp: '6×', note: '4 self-amendments on material facts' },
]

const D_METRICS = [
  { label: 'Question Efficiency',       v: 82, color: '#2ed573', note: 'Strong productive-to-total ratio' },
  { label: 'Follow-Up Capture Rate',    v: 71, color: '#1e90ff', note: '4 AI-suggested threads not pursued' },
  { label: 'Exhibit Utilization',       v: 71, color: '#00d2d3', disp: '5 / 7', note: 'Strategic deployment timing — solid' },
  { label: 'Timeline Coverage',         v: 88, color: '#2ed573', note: '3 key case events not addressed' },
  { label: 'Pressure Point Conversion', v: 64, color: '#ffa502', note: '36% of flagged contradictions passed over' },
]

const CW = [
  { name: 'Robert Harmon', role: 'Primary Deponent',     score: 4.2, bar: 42, vuln: 8, color: '#ff4757', badge: 'HIGH RISK'  },
  { name: 'Patricia Chen', role: 'Corroborating · CFO',  score: 8.1, bar: 81, vuln: 1, color: '#2ed573', badge: 'STABLE'     },
  { name: 'David Mills',   role: 'Adverse · Facilities', score: 6.3, bar: 63, vuln: 4, color: '#ffa502', badge: 'VULNERABLE' },
]

const CONFLICTS_DATA = [
  { a: 'Harmon', b: 'Mills', sev: 'HIGH', topic: 'Server room access — timing conflicts by 47 minutes' },
  { a: 'Harmon', b: 'Chen',  sev: 'HIGH', topic: 'Authorization chain for facility entry diverges' },
  { a: 'Mills',  b: 'Chen',  sev: 'MED',  topic: 'Q4 disclosure — Chen confirms, Mills denies knowledge' },
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
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65 }}>
          Live transcription, contradiction detection, and follow-up suggestions — as testimony unfolds.
        </p>
      </section>

      <section style={{ padding: '0 52px 80px' }}>
        <DepoDemo />
      </section>

      <section style={{ padding: '60px 52px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <div className="reveal" style={{ marginBottom: 52 }}>
          <p className="label" style={{ marginBottom: 18 }}>Post-Deposition Intelligence</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em', lineHeight: 1.05, marginBottom: 16 }}>
            Every deposition.<br/>Scored. Analyzed. Mapped.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.5)', maxWidth: 500, margin: '0 auto', lineHeight: 1.65 }}>
            The moment testimony ends, Ithildin builds a complete intelligence report — witness credibility scored, your strategy graded, and cross-witness conflicts surfaced automatically.
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
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', borderTop: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { n: '01', title: 'Upload Documents', body: 'Case files, prior testimony, contracts, exhibits. Ithildin ingests and indexes everything automatically.' },
            { n: '02', title: 'Receive Your Outline', body: 'Structured outline with AI-suggested questions and exhibit references — ready to refine.' },
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
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', marginBottom: 40 }}>
            Talk to our team or deploy today.
          </p>
          <Link href="/waitlist" className="btn btn-solid" style={{ padding: '12px 36px' }}>
            Join Waitlist
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
