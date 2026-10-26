'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Link from 'next/link'
import { supabase, DUPLICATE } from '@/lib/supabase'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setError('')
    setLoading(true)
    const { error } = await supabase.from('waitlist').insert({ email: email.trim().toLowerCase() })
    setLoading(false)
    /* Already on the list reads as success, so the form never reveals who has signed up */
    if (error && error.code !== DUPLICATE) {
      setError('Something went wrong. Please try again in a moment.')
      return
    }
    setSubmitted(true)
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
      }}>
        {submitted ? (
          <div style={{ textAlign: 'center', maxWidth: 420 }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              You&rsquo;re on the list.
            </p>
            <p className="sub-lede">
              We&rsquo;ll reach out when your access is ready.
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
            {/* Wordmark */}
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 40, textAlign: 'center',
            }}>
              Ithildin · Early Access
            </p>

            <h1 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 2.8rem)',
              fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em',
              lineHeight: 1.08, marginBottom: 14, textAlign: 'center',
            }}>
              Request access
            </h1>
            <p className="sub-lede" style={{ textAlign: 'center', marginBottom: 44 }}>
              Ithildin is in private beta.<br />Join the waitlist and we&rsquo;ll be in touch.
            </p>

            {/* Email */}
            <form onSubmit={handleEmail} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = 'var(--border-mid)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              />

              {error && (
                <p style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 300,
                  color: 'rgba(192,57,43,0.9)', marginTop: 2,
                }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-solid"
                style={{ width: '100%', padding: '11px 20px', opacity: loading ? 0.6 : 1 }}
              >
                {loading ? 'Joining…' : 'Join waitlist'}
              </button>
            </form>

            <p style={{
              marginTop: 28, fontFamily: 'var(--font-sans)', fontSize: '0.68rem',
              fontWeight: 300, color: 'var(--text-dim)', textAlign: 'center', lineHeight: 1.6,
            }}>
              By joining you agree to our{' '}
              <Link href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Privacy Policy</Link>.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

const inputStyle: React.CSSProperties = {
  background: 'var(--surface-accent)',
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
