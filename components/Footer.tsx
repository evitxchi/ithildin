'use client'
import Link from 'next/link'

const BADGES = [
  {
    name: 'CCPA',
    href: 'https://oag.ca.gov/privacy/ccpa',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="12" stroke="rgba(130,130,130,0.4)" strokeWidth="1" fill="none"/>
        {[0,1,2,3,4,5,6,7].map(i => (
          <circle key={i}
            cx={17 + 9*Math.cos(i*Math.PI/4)}
            cy={17 + 9*Math.sin(i*Math.PI/4)}
            r="1.2" fill="rgba(130,130,130,0.35)"/>
        ))}
        <rect x="13" y="15" width="8" height="8" rx="1.5"
          stroke="rgba(130,130,130,0.45)" strokeWidth="0.9" fill="none"/>
        <path d="M13 15 Q13 10 17 10 Q21 10 21 14"
          stroke="rgba(130,130,130,0.45)" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    name: 'ISO 27001',
    href: 'https://www.iso.org/standard/27001',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="12" stroke="rgba(130,130,130,0.4)" strokeWidth="1" fill="none"/>
        <ellipse cx="17" cy="17" rx="6" ry="12" stroke="rgba(130,130,130,0.28)" strokeWidth="0.8" fill="none"/>
        <line x1="5" y1="17" x2="29" y2="17" stroke="rgba(130,130,130,0.28)" strokeWidth="0.8"/>
        <text x="17" y="21" textAnchor="middle" fill="rgba(130,130,130,0.55)"
          style={{ fontSize: '6px', fontFamily: 'Georgia', letterSpacing: '0.5px' }}>ISO</text>
      </svg>
    )
  },
  {
    name: 'GDPR',
    href: 'https://gdpr.eu/',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <circle cx="17" cy="17" r="12" stroke="rgba(130,130,130,0.4)" strokeWidth="1" fill="none"/>
        {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
          <circle key={i}
            cx={17 + 9*Math.cos(i*Math.PI/6)}
            cy={17 + 9*Math.sin(i*Math.PI/6)}
            r="0.85" fill="rgba(130,130,130,0.3)"/>
        ))}
        <path d="M12 21 Q12 12 17 12 Q22 12 22 16 Q22 20 17 20 L17 23"
          stroke="rgba(130,130,130,0.45)" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      </svg>
    )
  },
]

const COLUMNS = [
  { title: 'Product', links: [
    { label: 'Features', href: '/product' },
    { label: 'Security', href: '/privacy' },
  ]},
  { title: 'Company', links: [
    { label: 'About', href: '/mission' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/demo' },
  ]},
  { title: 'Legal', links: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '#' },
    { label: 'DPA', href: '#' },
  ]},
]

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '80px 52px 48px',
      background: 'var(--bg)',
    }}>
      {/* Compliance badges */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        margin: '0 0 80px',
      }}>
        <div className="footer-badges" style={{ display: 'flex', justifyContent: 'center' }}>
          {BADGES.map(b => (
            <a key={b.name} href={b.href} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              padding: '26px 52px',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              background: 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'background 0.2s',
              textDecoration: 'none',
              flexShrink: 0,
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-elevated)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)' }}
            >
              {b.icon}
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(180,180,180,0.8)',
                fontWeight: 300,
              }}>{b.name}</span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.58rem',
                color: 'rgba(140,140,140,0.8)',
                letterSpacing: '0.04em',
                fontWeight: 300,
              }}>Details <svg style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 2 }} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="7" x2="7" y2="1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><polyline points="3,1 7,1 7,5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </a>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="footer-links" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        maxWidth: 1100,
        margin: '0 auto 60px',
        gap: 48,
      }}>
        <div>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.95rem',
            color: 'rgba(200,200,200,0.3)',
            letterSpacing: '0.01em',
          }}>Ithildin</span>
          <p style={{
            marginTop: 12,
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            fontWeight: 300,
            color: 'rgba(80,80,80,0.8)',
            maxWidth: 220,
            lineHeight: 1.6,
          }}>
            AI deposition intelligence for legal professionals.
          </p>
        </div>
        {COLUMNS.map(col => (
          <div key={col.title}>
            <p className="label" style={{ marginBottom: 16 }}>{col.title}</p>
            {col.links.map(l => (
              <div key={l.label} style={{ marginBottom: 10 }}>
                <Link href={l.href} style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  fontWeight: 300,
                  color: 'rgba(80,80,80,0.8)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = 'rgba(200,200,200,0.7)'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(80,80,80,0.8)'}
                >{l.label}</Link>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="line" style={{ maxWidth: 1100, margin: '0 auto 28px' }}/>
      <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 300, color: 'rgba(60,60,60,0.8)' }}>
          © {new Date().getFullYear()} Ithildin, Inc.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 300, color: 'rgba(60,60,60,0.8)' }}>
          Built for legal professionals
        </p>
      </div>
    </footer>
  )
}
