'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { OPEN_ROLES } from './roles'

/* ── SCROLL REVEAL ── */
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

const VALUES = [
  {
    name: 'Lean in',
    body: 'Nobody here waits to be handed the work. You see the gap, you take it, and you own the outcome end to end.',
  },
  {
    name: 'Fight for excellence',
    body: 'Litigators stake cases on what we ship. Close enough is not a standard we recognise, in the product or in the record.',
  },
  {
    name: 'Grow together',
    body: 'We give feedback early and plainly, and we take it the same way. The point is the best answer, not whose answer it was.',
  },
]

const PROCESS = [
  { step: '01', name: 'Apply', body: 'Send us your details and anything that shows how you work. We read every application ourselves.' },
  { step: '02', name: 'Intro call', body: 'Thirty minutes on what you have built, what you want next, and what we are building.' },
  { step: '03', name: 'Technical interview', body: 'A working session with an engineer on real problems from our stack. No whiteboard trivia.' },
  { step: '04', name: 'Build exercise', body: 'A scoped take-home you walk us through, or a paid day working alongside the team. Your call.' },
  { step: '05', name: 'Founder conversation', body: 'A final conversation with the founders on the mission, the market, and where you fit.' },
]

/* Roles are grouped under their team heading, the way the listing reads once
   there is more than one opening. */
const TEAMS = Array.from(new Set(OPEN_ROLES.map(r => r.team)))

export default function CareersView() {
  useReveal()

  return (
    <main style={{ background: 'var(--bg)' }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{
        maxWidth: 1100, margin: '0 auto', width: '100%',
        padding: '190px 52px 110px',
      }}>
        <p className="label" style={{ marginBottom: 22 }}>Careers</p>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 6.5vw, 5rem)',
          fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.03em',
          lineHeight: 1, marginBottom: 26, maxWidth: 900,
        }}>
          Work at Ithildin
        </h1>
        <p className="msg-line" style={{ maxWidth: 560, marginBottom: 44 }}>
          Shape how the record gets made.
        </p>
        <a href="#open-roles" className="btn btn-solid btn-rect">View open roles</a>
      </section>

      {/* ── FULL-BLEED BAND ── */}
      <div className="reveal band-image band-image--careers">
        <img src="/careers-band.jpg" alt="" aria-hidden="true" />
      </div>

      {/* ── MISSION ── */}
      <section className="reveal" style={{ maxWidth: 1100, margin: '0 auto', width: '100%', padding: '96px 52px' }}>
        <div className="careers-split">
          <p className="label">Why we exist</p>
          <div>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)',
              fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em',
              lineHeight: 1.1, marginBottom: 26, maxWidth: 620,
            }}>
              Build the intelligence layer for the deposition record.
            </h2>
            <p className="sub-lede" style={{ maxWidth: 560, marginBottom: 20 }}>
              A deposition is decided in the room, but the contradiction that wins it usually surfaces
              three weeks later in a transcript nobody has time to reread. We are closing that gap.
            </p>
            <p className="sub-lede" style={{ maxWidth: 560 }}>
              We are a small team in an industry where accuracy is not a metric, it is the whole job.
              So we hire people who care about being right more than being fast, and who still ship on
              a Tuesday.
            </p>
          </div>
        </div>
      </section>

      <div className="line" />

      {/* ── VALUES ── */}
      <section className="reveal" style={{ maxWidth: 1100, margin: '0 auto', width: '100%', padding: '96px 52px' }}>
        <div className="careers-split">
          <p className="label">How we work</p>
          <div className="careers-values">
            {VALUES.map(v => (
              <div key={v.name}>
                <h3 style={{
                  fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 400,
                  color: 'var(--white)', letterSpacing: '-0.015em', marginBottom: 12,
                }}>
                  {v.name}
                </h3>
                <p className="sub-lede" style={{ maxWidth: 520 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="line" />

      {/* ── OPEN ROLES ──
          One row per role, grouped by team. The whole row is the link so the
          target stays comfortable on touch. */}
      <section id="open-roles" className="reveal" style={{
        maxWidth: 1100, margin: '0 auto', width: '100%',
        padding: '96px 52px', scrollMarginTop: 90,
      }}>
        <p className="label" style={{ marginBottom: 18 }}>Open roles</p>
        <h2 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.9rem, 3.4vw, 2.9rem)',
          fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em',
          lineHeight: 1.1, marginBottom: 48,
        }}>
          {OPEN_ROLES.length} open {OPEN_ROLES.length === 1 ? 'role' : 'roles'}
        </h2>

        {TEAMS.map(team => (
          <div key={team} style={{ marginBottom: 40 }}>
            <p className="role-group-heading">{team}</p>
            {OPEN_ROLES.filter(r => r.team === team).map(role => (
              <Link key={role.slug} href={`/careers/${role.slug}`} className="role-row">
                <span className="role-row-title">{role.title}</span>
                <span className="role-row-meta">{role.location}</span>
                <span className="role-row-meta">{role.type}</span>
                <ArrowUpRight size={16} strokeWidth={1.5} className="role-row-arrow" />
              </Link>
            ))}
          </div>
        ))}

        <p className="sub-lede" style={{ maxWidth: 540 }}>
          Nothing here that fits? Write to{' '}
          <a href="mailto:careers@ithildin.io" style={{ color: 'var(--white)', textDecoration: 'underline' }}>
            careers@ithildin.io
          </a>{' '}
          and tell us what you would build.
        </p>
      </section>

      <div className="line" />

      {/* ── HIRING PROCESS ── */}
      <section className="reveal" style={{ maxWidth: 1100, margin: '0 auto', width: '100%', padding: '96px 52px 120px' }}>
        <div className="careers-split">
          <p className="label">Hiring process</p>
          <div className="careers-process">
            {PROCESS.map(p => (
              <div key={p.step} className="process-step">
                <span style={{
                  fontFamily: 'var(--font-sub)', fontSize: '0.72rem', fontWeight: 400,
                  letterSpacing: '0.12em', color: 'var(--accent)', paddingTop: 5,
                }}>
                  {p.step}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)', fontSize: '1.24rem', fontWeight: 400,
                    color: 'var(--white)', letterSpacing: '-0.01em', marginBottom: 8,
                  }}>
                    {p.name}
                  </h3>
                  <p className="sub-lede" style={{ maxWidth: 480 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
