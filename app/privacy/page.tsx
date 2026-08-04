'use client'
import { useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { PrivacyFeatures } from '@/components/blocks/features-8'

function useTypewriterLoop(phrases: string[]) {
  const [text, setText] = useState('')
  useEffect(() => {
    let pi = 0, ci = 0, deleting = false, paused = false
    let t: NodeJS.Timeout
    function step() {
      const phrase = phrases[pi]
      if (paused) { paused = false; deleting = true; t = setTimeout(step, 100); return }
      if (!deleting) {
        if (ci < phrase.length) {
          setText(phrase.slice(0, ++ci))
          t = setTimeout(step, 65 + Math.random() * 45 + (phrase[ci - 1] === ' ' ? 25 : 0))
        } else { paused = true; t = setTimeout(step, 1600) }
      } else {
        if (ci > 0) { setText(phrase.slice(0, --ci)); t = setTimeout(step, 25 + Math.random() * 15) }
        else { deleting = false; pi = (pi + 1) % phrases.length; t = setTimeout(step, 200) }
      }
    }
    t = setTimeout(step, 500)
    return () => clearTimeout(t)
  }, [])
  return text
}

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

const STANDARDS = [
  {
    label: 'GDPR',
    heading: 'Full compliance with EU data protection law.',
    body: [
      'Ithildin operates in full compliance with the General Data Protection Regulation (EU) 2016/679. We act as a data processor on behalf of our clients, who remain the data controllers for any personal data processed through the platform.',
      'We maintain Data Processing Agreements (DPAs) with all clients handling EU personal data. Our sub-processors are contractually bound to the same standard of protection.',
    ],
    details: [
      'Data Processing Agreements available on request',
      'Right to access, rectification, and erasure honored within 30 days',
      'Data minimization: we collect only what is necessary',
      'EU data residency options available for enterprise clients',
      'Breach notification to supervisory authority within 72 hours',
      'We do not sell or share personal data with third parties',
    ],
  },
  {
    label: 'CCPA',
    heading: 'Your California privacy rights, fully respected.',
    body: [
      'Under the California Consumer Privacy Act, California residents have specific rights regarding their personal information. Ithildin honors all CCPA rights and does not sell personal information under any circumstances.',
    ],
    details: [
      'Right to know what personal information is collected and why',
      'Right to delete personal information upon verified request',
      'Right to opt-out of the sale of personal information (we do not sell data)',
      'Right to non-discrimination for exercising any CCPA right',
      'Requests processed within 45 days of receipt',
    ],
  },
  {
    label: 'ISO 27001',
    heading: 'International standard for information security management.',
    body: [
      'Our information security management system (ISMS) is aligned with ISO/IEC 27001:2022, the international standard for managing information security risk. This means security is embedded in how we build, operate, and improve Ithildin. Not bolted on after the fact.',
    ],
    details: [
      'Formal risk assessment and treatment process',
      'Security policies reviewed and updated annually',
      'Employee security training and awareness program',
      'Supplier and vendor risk assessments',
      'Regular internal audits and management reviews',
      'Continuous improvement through nonconformity tracking',
    ],
  },
]

const LABEL_TO_ID: Record<string, string> = {
  'GDPR': 'gdpr',
  'CCPA': 'ccpa',
  'ISO 27001': 'iso27001',
}

export default function Privacy() {
  useReveal()
  const hero = useTypewriterLoop(['Your data, protected.', 'Your clients, protected.', 'Your cases, protected.'])

  return (
    <main style={{ background: 'var(--bg)' }}>
      <Nav />

      {/* Hero */}
      <section style={{ padding: '160px 52px 72px', maxWidth: 860, margin: '0 auto' }}>
        <p className="label" style={{ marginBottom: 18 }}>Security & Compliance</p>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 6vw, 5rem)',
          fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em',
          lineHeight: 1.0, marginBottom: 28, minHeight: '1.05em',
        }}>
          {hero}<span className="cursor-blink" />
        </h1>
        <p className="reveal" style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 300,
          color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 520,
        }}>
          Ithildin is built for the legal industry, where confidentiality is non-negotiable. Every system, control, and audit exists to protect your clients' most sensitive information.
        </p>
      </section>

      {/* Bento Grid */}
      <PrivacyFeatures />

      <div className="line" />

      {/* Standards */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '80px 52px' }}>
        <div style={{ marginBottom: 64 }}>
          <p className="label reveal" style={{ marginBottom: 16 }}>Compliance Standards</p>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}>Three frameworks. One commitment.</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {STANDARDS.map((s, i) => (
            <div key={s.label} id={LABEL_TO_ID[s.label]} className="reveal" style={{
              padding: '48px 0',
              borderTop: '1px solid var(--border)',
              borderBottom: i === STANDARDS.length - 1 ? '1px solid var(--border)' : 'none',
              transitionDelay: `${i * 0.1}s`,
              scrollMarginTop: '100px',
            }}>
              <div className="privacy-standard-grid" style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 48 }}>
                <div>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontSize: '0.58rem',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'var(--accent)', fontWeight: 300, display: 'block', marginBottom: 8,
                  }}>{s.label}</span>
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1.3rem',
                    color: 'var(--white)', marginBottom: 16, lineHeight: 1.2,
                  }}>{s.heading}</h3>
                  {s.body.map((p, j) => (
                    <p key={j} style={{
                      fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 300,
                      color: 'var(--text-muted)', lineHeight: 1.75,
                      marginBottom: j < s.body.length - 1 ? 14 : 24,
                    }}>{p}</p>
                  ))}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {s.details.map((d, j) => (
                      <span key={j} style={{
                        fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 300,
                        color: 'var(--text-muted)',
                        padding: '5px 14px',
                        border: '1px solid var(--border)',
                        borderRadius: 100,
                        lineHeight: 1.4,
                      }}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="line" />

      {/* Contact */}
      <section style={{ padding: '80px 52px 120px', textAlign: 'center' }}>
        <div className="reveal" style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: 18,
          }}>Questions about privacy?</h2>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 300,
            color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32,
          }}>
            Our security team is available to answer questions, provide compliance documentation, or arrange a security review for enterprise clients.
          </p>
          <a href="mailto:security@ithildin.ai" style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 300,
            color: 'rgba(200,169,110,0.85)', letterSpacing: '0.04em', textDecoration: 'none',
          }}>security@ithildin.ai →</a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
