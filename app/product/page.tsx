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
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 5rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 20 }}>
            Start your first<br/>free deposition
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.88rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', marginBottom: 40 }}>
            No credit card required.
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
