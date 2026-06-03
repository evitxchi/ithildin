'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null
    setTheme(stored || 'dark')
  }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    localStorage.setItem('theme', next)
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '20px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'var(--bg-nav-scrolled)' : 'transparent',
      borderBottom: `1px solid ${scrolled ? 'var(--border-nav-scrolled)' : 'transparent'}`,
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.35s ease',
    }}>
      <Link href="/" style={{
        display: 'flex', alignItems: 'center', gap: 2,
        fontFamily: 'var(--font-serif)',
        fontSize: '1.25rem',
        fontWeight: 400,
        color: 'var(--white)',
        textDecoration: 'none',
        letterSpacing: '0.01em',
      }}>
        <img src="/ithildinlogo.png" alt="Ithildin logo" style={{ height: 62, width: 'auto' }} />
        <span className="nav-wordmark">Ithildin</span>
      </Link>

      {/* Center links */}
      <div className="nav-center" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 36 }}>
        {[
          { label: 'Product', href: '/product' },
          { label: 'Privacy', href: '/privacy' },
        ].map(item => (
          <Link key={item.label} href={item.href} className="nav-link">
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right: theme toggle + Login */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            padding: 4,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <Link href="/login" className="nav-link">
          Login
        </Link>
      </div>
    </nav>
  )
}
