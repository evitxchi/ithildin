'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const VOLUMES = [
  'Fewer than 5 depositions a month',
  '5 to 15 depositions a month',
  '15 to 40 depositions a month',
  'More than 40 depositions a month',
]

export default function DemoPage() {
  const [name, setName] = useState('')
  const [firm, setFirm] = useState('')
  const [email, setEmail] = useState('')
  const [volume, setVolume] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !firm || !email) return
    setLoading(true)
    // TODO: wire to Supabase
    await new Promise(r => setTimeout(r, 600))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      <div style={{
        flex: 1,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 80px',
      }}>
        {submitted ? (
          <div style={{ textAlign: 'center', maxWidth: 420 }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Request received.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              We&rsquo;ll reach out to schedule your walkthrough.
            </p>
            <Link href="/" style={{
              display: 'inline-block', marginTop: 36,
              fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 300,
              color: 'var(--text-dim)', textDecoration: 'none', letterSpacing: '0.04em',
            }}>
              ← Back to home
            </Link>
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: 420 }}>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 40, textAlign: 'center',
            }}>
              Ithildin · Live Demo
            </p>

            <h1 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 2.8rem)',
              fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em',
              lineHeight: 1.08, marginBottom: 14, textAlign: 'center',
            }}>
              Book a demo
            </h1>
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 300,
              color: 'var(--text-muted)', lineHeight: 1.7, textAlign: 'center', marginBottom: 44,
            }}>
              A walkthrough with our team. Bring a matter and see what Ithildin surfaces in the record.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                type="text"
                required
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--border-mid)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
              <input
                type="text"
                required
                placeholder="Firm"
                value={firm}
                onChange={e => setFirm(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--border-mid)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />
              <input
                type="email"
                required
                placeholder="Work email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--border-mid)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />

              <div style={{ position: 'relative' }}>
                <select
                  value={volume}
                  onChange={e => setVolume(e.target.value)}
                  aria-label="Deposition volume"
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    cursor: 'pointer',
                    paddingRight: 44,
                    color: volume ? 'var(--silver)' : 'var(--text-dim)',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--border-mid)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                >
                  <option value="" style={optionStyle}>Deposition volume</option>
                  {VOLUMES.map(v => (
                    <option key={v} value={v} style={optionStyle}>{v}</option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  style={{
                    position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)',
                    color: 'var(--text-dim)', pointerEvents: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-solid"
                style={{ width: '100%', padding: '11px 20px', marginTop: 6, opacity: loading ? 0.6 : 1 }}
              >
                {loading ? 'Sending…' : 'Request demo'}
              </button>
            </form>

            <p style={{
              marginTop: 28, fontFamily: 'var(--font-sans)', fontSize: '0.68rem',
              fontWeight: 300, color: 'var(--text-dim)', textAlign: 'center', lineHeight: 1.6,
            }}>
              Ithildin is currently in private beta. By requesting a demo you agree to our{' '}
              <Link href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Privacy Policy</Link>.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--border)',
  borderRadius: 4,
  padding: '11px 20px',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.82rem',
  fontWeight: 300,
  color: 'var(--silver)',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
}

const optionStyle: React.CSSProperties = {
  background: 'var(--bg-card)',
  color: 'var(--text)',
}
