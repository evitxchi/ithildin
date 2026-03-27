'use client'
import { useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

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

const PLANS = [
  {
    name: 'Solo', seats: '1 attorney', desc: 'For solo practitioners.',
    price: { monthly: 99, annual: 79 },
    features: ['First deposition free','5 depositions / month','Real-time transcription','Live contradiction detection','AI deposition outline','Exhibit management','Post-deposition summaries','Page:line citations','Audio/video sync','Email support'],
    cta: 'Start Free Trial', highlight: false,
  },
  {
    name: 'Firm', seats: 'Up to 5 attorneys', desc: 'For litigation teams.',
    price: { monthly: 199, annual: 159 },
    features: ['Everything in Solo','Unlimited depositions','Cross-deposition intelligence','Impeachment brief generator','Witness credibility scoring','AI mock deposition trainer','Suggested follow-up questions','Case timeline builder','Clio, PracticePanther, MyCase, Smokeball','Priority support'],
    cta: 'Start Free Trial', highlight: true,
  },
  {
    name: 'Enterprise', seats: 'Unlimited', desc: 'For large firms.',
    price: null,
    features: ['Everything in Firm','Multi-case pattern recognition','Rule 30(b)(6) outline generation','Custom AI on your case history','SSO / SAML','SOC 2 II review','Custom contracts & DPA','Dedicated success manager','SLA guarantee'],
    cta: 'Contact Sales', highlight: false,
  },
]

const FAQ = [
  { q: 'What happens after the free trial?', a: 'Your first deposition is free — no card required. After that, a 14-day free trial of the Firm plan begins. Cancel any time.' },
  { q: 'How is client data protected?', a: 'Ithildin is SOC 2 Type II certified, ISO 27001 compliant, GDPR and CCPA ready. All data is encrypted in transit and at rest. DPAs available on request.' },
  { q: 'How does real-time transcription work?', a: 'Ithildin connects to your audio feed — local microphone, Zoom, or court reporter feed — with automatic speaker attribution and page:line stamping.' },
  { q: 'Is annual billing available?', a: 'Yes. Annual billing saves approximately 20%. Select it during signup or contact us to switch.' },
  { q: 'Which integrations are included?', a: 'Firm and Enterprise plans include Clio, PracticePanther, MyCase, and Smokeball. Additional integrations available on request.' },
]

export default function Pricing() {
  useReveal()
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')
  const [open, setOpen] = useState<number | null>(null)

  return (
    <main style={{ background: 'var(--bg)' }}>
      <Nav />

      <section style={{ padding: '160px 52px 60px', textAlign: 'center', maxWidth: 540, margin: '0 auto' }}>
        <p className="label" style={{ marginBottom: 20 }}>Pricing</p>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(3.5rem, 7vw, 6rem)',
          fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em',
          lineHeight: 0.93, marginBottom: 18,
        }}>
          Simple.<br/>Honest.
        </h1>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', marginBottom: 28 }}>
          First deposition free. Cancel any time.
        </p>
        <div style={{ display: 'inline-flex', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 100, padding: 3, gap: 3 }}>
          {(['monthly','annual'] as const).map(b => (
            <button key={b} onClick={() => setBilling(b)} style={{
              padding: '6px 20px', borderRadius: 100,
              background: billing === b ? 'rgba(255,255,255,0.07)' : 'transparent',
              color: billing === b ? 'var(--white)' : 'rgba(255,255,255,0.3)',
              border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 300,
              transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {b.charAt(0).toUpperCase() + b.slice(1)}
              {b === 'annual' && <span style={{ fontSize: '0.6rem', color: 'var(--accent)' }}>−20%</span>}
            </button>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 52px 80px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
        }}>
          {PLANS.map((plan, i) => (
            <div key={plan.name} className="plan reveal" style={{
              background: plan.highlight ? 'var(--bg-card)' : 'transparent',
              position: 'relative', transitionDelay: `${i * 0.1}s`,
            }}>
              {plan.highlight && (
                <div style={{
                  position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
                  background: 'var(--white)', color: '#080808',
                  fontFamily: 'var(--font-sans)', fontSize: '0.54rem', fontWeight: 400,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  padding: '3px 14px', borderRadius: '0 0 6px 6px',
                }}>Most Popular</div>
              )}
              <p className="label" style={{ marginBottom: 10 }}>{plan.seats}</p>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: 'var(--white)', marginBottom: 6 }}>{plan.name}</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 300, color: 'rgba(255,255,255,0.55)', marginBottom: 24 }}>{plan.desc}</p>

              <div style={{ marginBottom: 24, display: 'flex', alignItems: 'baseline', gap: 4 }}>
                {plan.price ? (
                  <>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--white)', letterSpacing: '-0.03em' }}>
                      ${plan.price[billing]}
                    </span>
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 300, color: 'rgba(255,255,255,0.4)' }}>/mo</span>
                  </>
                ) : (
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', color: 'var(--white)', letterSpacing: '-0.03em' }}>Custom</span>
                )}
              </div>

              {plan.price ? (
                <button className={`btn ${plan.highlight ? 'btn-solid' : 'btn-ghost'}`} style={{ width: '100%', marginBottom: 24 }}>
                  {plan.cta}
                </button>
              ) : (
                <a href="mailto:sales@ithildin.com" className="btn btn-ghost" style={{ width: '100%', marginBottom: 24 }}>
                  {plan.cta}
                </a>
              )}

              <div className="line" style={{ marginBottom: 20 }}/>

              {plan.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', gap: 10, marginBottom: 11 }}>
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem', marginTop: 2, flexShrink: 0 }}>—</span>
                  <p style={{
                    fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 300,
                    color: j === 0 && i > 0 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.55)',
                    fontStyle: j === 0 && i > 0 ? 'italic' : 'normal',
                    lineHeight: 1.5,
                  }}>{f}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '60px 52px 100px', maxWidth: 720, margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="reveal" style={{ marginBottom: 48 }}>
          <p className="label" style={{ marginBottom: 18 }}>FAQ</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Common questions
          </h2>
        </div>
        {FAQ.map((item, i) => (
          <div key={i} className="reveal" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', transitionDelay: `${i * 0.05}s` }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{
              width: '100%', padding: '22px 0',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 24,
            }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', fontWeight: 300, color: 'var(--text)' }}>{item.q}</p>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '1rem', flexShrink: 0, transition: 'transform 0.3s', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</span>
            </button>
            {open === i && (
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 300,
                color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, paddingBottom: 22,
                animation: 'fadeUp 0.3s ease forwards',
              }}>{item.a}</p>
            )}
          </div>
        ))}
      </section>

      <Footer />
    </main>
  )
}
