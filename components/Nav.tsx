'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'

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
          { label: 'Mission', href: '/mission' },
          { label: 'Privacy', href: '/privacy' },
        ].map(item => (
          <Link key={item.label} href={item.href} className="nav-link">
            {item.label}
          </Link>
        ))}
      </div>

      {/* Right: theme toggle + Login */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <ThemeToggle />
        <Link href="/login" className="nav-link">
          Login
        </Link>
      </div>
    </nav>
  )
}
