'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import type { Role } from '../roles'

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={{ marginBottom: 44 }}>
      <h2 style={{
        fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 400,
        color: 'var(--white)', letterSpacing: '-0.015em', marginBottom: 18,
      }}>
        {title}
      </h2>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map(item => (
          <li key={item} className="role-bullet">
            <span className="role-bullet-mark" aria-hidden="true" />
            <span className="sub-lede">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function RoleView({ role }: { role: Role }) {
  const [form, setForm] = useState({
    name: '', email: '', location: '', linkedin: '', portfolio: '', resume: '', note: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email) return
    setLoading(true)
    // TODO: wire to Supabase
    await new Promise(r => setTimeout(r, 600))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <main style={{ background: 'var(--bg)' }}>
      <Nav />

      {/* ── ROLE HEADER ── */}
      <section style={{ maxWidth: 780, margin: '0 auto', width: '100%', padding: '170px 52px 56px' }}>
        <Link href="/careers#open-roles" style={{
          fontFamily: 'var(--font-sub)', fontSize: '0.78rem', fontWeight: 400,
          color: 'var(--text-dim)', textDecoration: 'none', letterSpacing: '0.03em',
        }}>
          ← All open roles
        </Link>

        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
          fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.028em',
          lineHeight: 1.04, margin: '26px 0 20px',
        }}>
          {role.title}
        </h1>

        <div className="role-meta">
          <span>{role.team}</span>
          <span className="role-meta-dot" aria-hidden="true">·</span>
          <span>{role.location}</span>
          <span className="role-meta-dot" aria-hidden="true">·</span>
          <span>{role.type}</span>
        </div>

        <p className="msg-line" style={{ marginTop: 26, maxWidth: 620 }}>{role.summary}</p>

        <a href="#apply" className="btn btn-solid btn-rect" style={{ marginTop: 36 }}>Apply for this role</a>
      </section>

      <div className="line" />

      {/* ── ROLE DETAIL ── */}
      <section style={{ maxWidth: 780, margin: '0 auto', width: '100%', padding: '72px 52px 40px' }}>
        <div style={{ marginBottom: 44 }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 400,
            color: 'var(--white)', letterSpacing: '-0.015em', marginBottom: 18,
          }}>
            About the role
          </h2>
          {role.about.map(p => (
            <p key={p} className="sub-lede" style={{ marginBottom: 16 }}>{p}</p>
          ))}
        </div>

        <Section title="What you'll do" items={role.responsibilities} />
        <Section title="What we're looking for" items={role.requirements} />
        <Section title="Nice to have" items={role.bonus} />
        <Section title="What we offer" items={role.offer} />
      </section>

      <div className="line" />

      {/* ── INTEREST FORM ── */}
      <section id="apply" style={{
        maxWidth: 780, margin: '0 auto', width: '100%',
        padding: '80px 52px 120px', scrollMarginTop: 80,
      }}>
        {submitted ? (
          <div>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
              fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: 16,
            }}>
              Application received.
            </h2>
            <p className="sub-lede" style={{ maxWidth: 480 }}>
              Thanks for putting your name in. We read every application ourselves and will come back
              to you either way, usually within a week.
            </p>
            <Link href="/careers#open-roles" style={{
              display: 'inline-block', marginTop: 32,
              fontFamily: 'var(--font-sub)', fontSize: '0.8rem', fontWeight: 400,
              color: 'var(--text-dim)', textDecoration: 'none', letterSpacing: '0.03em',
            }}>
              ← All open roles
            </Link>
          </div>
        ) : (
          <>
            <p className="label" style={{ marginBottom: 18 }}>Apply</p>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.4vw, 2.4rem)',
              fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em',
              lineHeight: 1.1, marginBottom: 14,
            }}>
              Register your interest
            </h2>
            <p className="sub-lede" style={{ maxWidth: 520, marginBottom: 40 }}>
              No cover letter needed. Send us the links that show your work and a few lines on why
              this problem interests you.
            </p>

            <form onSubmit={handleSubmit} className="apply-form">
              <div className="apply-row">
                <Field label="Full name" required value={form.name} onChange={set('name')} autoComplete="name" />
                <Field label="Email" required type="email" value={form.email} onChange={set('email')} autoComplete="email" />
              </div>
              <div className="apply-row">
                <Field label="Location" value={form.location} onChange={set('location')} placeholder="City, country" />
                <Field label="LinkedIn" type="url" value={form.linkedin} onChange={set('linkedin')} placeholder="https://" />
              </div>
              <div className="apply-row">
                <Field label="GitHub or portfolio" type="url" value={form.portfolio} onChange={set('portfolio')} placeholder="https://" />
                <Field label="Link to CV" type="url" value={form.resume} onChange={set('resume')} placeholder="https://" />
              </div>

              <label className="apply-field">
                <span className="apply-label">Why this role?</span>
                <textarea
                  rows={5}
                  value={form.note}
                  onChange={set('note')}
                  placeholder="A few lines is plenty."
                  className="apply-input"
                  style={{ resize: 'vertical', lineHeight: 1.6 }}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-solid btn-rect"
                style={{ alignSelf: 'flex-start', marginTop: 8, opacity: loading ? 0.6 : 1 }}
              >
                {loading ? 'Sending…' : 'Submit application'}
              </button>
            </form>

            <p style={{
              marginTop: 26, fontFamily: 'var(--font-sub)', fontSize: '0.76rem',
              fontWeight: 400, color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: 480,
            }}>
              By applying you agree to our{' '}
              <Link href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Privacy Policy</Link>.
              We only use what you send here to assess your application.
            </p>
          </>
        )}
      </section>

      <Footer />
    </main>
  )
}

function Field({
  label, required, type = 'text', value, onChange, placeholder, autoComplete,
}: {
  label: string
  required?: boolean
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <label className="apply-field">
      <span className="apply-label">
        {label}{required && <span style={{ color: 'var(--accent)' }}> *</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="apply-input"
      />
    </label>
  )
}
