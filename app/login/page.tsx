'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    // TODO: wire to Supabase auth
    await new Promise(r => setTimeout(r, 600))
    setError('Invalid email or password.')
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
        <div style={{ width: '100%', maxWidth: 400 }}>

          {/* Logo label */}
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.6rem', letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
            marginBottom: 40, textAlign: 'center',
          }}>
            Ithildin
          </p>

          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
            fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em',
            lineHeight: 1.1, marginBottom: 10, textAlign: 'center',
          }}>
            Welcome back
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 300,
            color: 'var(--text-muted)', textAlign: 'center', marginBottom: 40,
          }}>
            Sign in to your Ithildin account.
          </p>

          {/* OAuth */}
          <button
            onClick={() => handleOAuth('google')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              width: '100%', padding: '11px 20px', borderRadius: 100,
              background: 'transparent', border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-sans)',
              fontSize: '0.8rem', fontWeight: 300, cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s', marginBottom: 24,
            }}
            onMouseEnter={e => { (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.28)'; (e.currentTarget).style.color = '#fff' }}
            onMouseLeave={e => { (e.currentTarget).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget).style.color = 'rgba(255,255,255,0.75)' }}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.08em' }}>or</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
          </div>

          {/* Email + password */}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(255,255,255,0.28)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'rgba(255,255,255,0.28)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
            />

            {error && (
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 300,
                color: 'rgba(192,57,43,0.9)', marginTop: 2,
              }}>
                {error}
              </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
              <Link href="/forgot-password" style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 300,
                color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-solid"
              style={{ width: '100%', padding: '11px 20px', marginTop: 6, opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p style={{
            marginTop: 28, fontFamily: 'var(--font-sans)', fontSize: '0.75rem',
            fontWeight: 300, color: 'rgba(255,255,255,0.3)', textAlign: 'center',
          }}>
            Don&rsquo;t have access?{' '}
            <Link href="/waitlist" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'underline' }}>
              Join the waitlist
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 100,
  padding: '11px 20px',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.82rem',
  fontWeight: 300,
  color: 'var(--silver)',
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
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
