'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Link from 'next/link'

export default function WaitlistPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // TODO: wire to Supabase
    await new Promise(r => setTimeout(r, 600))
    setSubmitted(true)
    setLoading(false)
  }

  function handleOAuth(provider: string) {
    // TODO: wire to Supabase OAuth
    console.log('OAuth with', provider)
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
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              We&rsquo;ll reach out when your access is ready.
            </p>
            <Link href="/" style={{
              display: 'inline-block', marginTop: 36,
              fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 300,
              color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '0.04em',
            }}>
              ← Back to home
            </Link>
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: 420 }}>
            {/* Wordmark */}
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 40, textAlign: 'center',
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
            <p style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 300,
              color: 'var(--text-muted)', lineHeight: 1.7, textAlign: 'center', marginBottom: 44,
            }}>
              Ithildin is in private beta.<br />Join the waitlist and we&rsquo;ll be in touch.
            </p>

            {/* OAuth */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              <button
                onClick={() => handleOAuth('google')}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '11px 20px', borderRadius: 4,
                  background: 'transparent', border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem', fontWeight: 300, cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                  width: '100%',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.28)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.75)' }}
              >
                <GoogleIcon />
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.08em' }}>or</span>
              <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            </div>

            {/* Email */}
            <form onSubmit={handleEmail} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4, padding: '11px 20px',
                  fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 300,
                  color: 'var(--silver)', outline: 'none', width: '100%',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(255,255,255,0.28)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
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
              fontWeight: 300, color: 'rgba(255,255,255,0.25)', textAlign: 'center', lineHeight: 1.6,
            }}>
              By joining you agree to our{' '}
              <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'underline' }}>Privacy Policy</Link>.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}
