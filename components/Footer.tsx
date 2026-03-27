'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

function BinaryLogo() {
  const [art, setArt] = useState('')

  useEffect(() => {
    const cols = 120
    const rows = 20
    const cellW = 10
    const cellH = 15

    const canvas = document.createElement('canvas')
    canvas.width = cols * cellW
    canvas.height = rows * cellH
    const ctx = canvas.getContext('2d')!

    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#fff'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'

    let fontSize = Math.floor(rows * cellH * 0.84)
    ctx.font = `bold ${fontSize}px Arial`
    const measured = ctx.measureText('ITHILDIN').width
    if (measured > canvas.width * 0.94) {
      fontSize = Math.floor(fontSize * (canvas.width * 0.94) / measured)
      ctx.font = `bold ${fontSize}px Arial`
    }
    ctx.fillText('ITHILDIN', canvas.width / 2, canvas.height / 2)

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const lines: string[] = []

    for (let r = 0; r < rows; r++) {
      let line = ''
      for (let c = 0; c < cols; c++) {
        const px = Math.floor(c * cellW + cellW / 2)
        const py = Math.floor(r * cellH + cellH / 2)
        const idx = (py * canvas.width + px) * 4
        const bright = data[idx]
        if (bright > 80) {
          line += Math.random() > 0.5 ? '1' : '0'
        } else if (Math.random() < 0.08) {
          line += Math.random() > 0.5 ? '1' : '0'
        } else {
          line += '\u00a0'
        }
      }
      lines.push(line)
    }

    setArt(lines.join('\n'))
  }, [])

  if (!art) return null

  return (
    <pre className="binary-logo" style={{
      fontFamily: '"Courier New", Courier, monospace',
      fontSize: '0.72rem',
      lineHeight: 1.4,
      letterSpacing: '0.04em',
      whiteSpace: 'pre',
      overflow: 'hidden',
      padding: '60px 52px 52px',
      userSelect: 'none',
      width: '100%',
    }}>
      {art}
    </pre>
  )
}

const BADGES = [
  {
    name: 'SOC 2 II',
    href: 'https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2',
    icon: (
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path d="M17 3 L30 9 V20 C30 28 24 33 17 35 C10 33 4 28 4 20 V9 Z"
          stroke="rgba(130,130,130,0.4)" strokeWidth="1" fill="none"/>
        <path d="M11 17 L15 21 L23 13"
          stroke="rgba(130,130,130,0.45)" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
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
    href: 'https://www.iso.org/standard/27001',
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

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '80px 52px 48px',
      background: 'var(--bg)',
    }}>
      {/* Compliance badge carousel */}
      <div style={{
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        margin: '0 0 80px',
        position: 'relative',
      }}>
        {/* fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, var(--bg), transparent)', zIndex: 2, pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, var(--bg), transparent)', zIndex: 2, pointerEvents: 'none' }}/>
        <div style={{
          display: 'flex',
          animation: 'badgeScroll 18s linear infinite',
          width: 'max-content',
        }}>
          {[...BADGES, ...BADGES, ...BADGES].map((b, i) => (
            <a key={i} href={b.href} target="_blank" rel="noopener noreferrer" style={{
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
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#101010'; (e.currentTarget.parentElement as HTMLElement).style.animationPlayState = 'paused' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)'; (e.currentTarget.parentElement as HTMLElement).style.animationPlayState = 'running' }}
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
              }}>Details ↗</span>
            </a>
          ))}
        </div>
      </div>

      <BinaryLogo />

      {/* Links */}
      <div style={{
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
        {[
          { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Integrations'] },
          { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
          { title: 'Legal',   links: ['Privacy', 'Terms', 'DPA'] },
        ].map(col => (
          <div key={col.title}>
            <p className="label" style={{ marginBottom: 16 }}>{col.title}</p>
            {col.links.map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <a href="#" style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  fontWeight: 300,
                  color: 'rgba(80,80,80,0.8)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = 'rgba(200,200,200,0.7)'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(80,80,80,0.8)'}
                >{l}</a>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="line" style={{ maxWidth: 1100, margin: '0 auto 28px' }}/>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 1100, margin: '0 auto' }}>
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
