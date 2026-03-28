'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '20px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
      borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.35s ease',
    }}>
      <Link href="/" style={{
        display: 'flex', alignItems: 'center', gap: 2,
        fontFamily: 'var(--font-serif)',
        fontSize: '1.25rem',
        fontWeight: 400,
        color: '#e8e8e8',
        textDecoration: 'none',
        letterSpacing: '0.01em',
      }}>
        <img src="/ithildinlogo.png" alt="Ithildin logo" style={{ height: 62, width: 'auto' }} />
        Ithildin
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

      {/* Right: Login */}
      <Link href="/login" className="nav-link" style={{ color: 'rgba(255,255,255,0.5)' }}>
        Login
      </Link>
    </nav>
  )
}
