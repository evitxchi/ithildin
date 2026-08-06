'use client'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Mission() {
  return (
    <main style={{ background: 'var(--bg)' }}>
      <Nav />

      {/* Hero */}
      <section style={{
        background: 'var(--bg)',
        padding: 'clamp(160px, 20vh, 220px) 52px clamp(60px, 8vh, 90px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Plain heading. A whileInView tween here could leave the page title
            stuck part-way faded, and nothing else on this page animates. */}
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.6rem, 6.4vw, 5rem)',
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: '-0.025em',
          textAlign: 'center',
          color: 'var(--white)',
        }}>
          Ithildin<br />Mission Statement
        </h1>
      </section>

      {/* Mission text */}
      <article style={{
        maxWidth: 740,
        margin: '0 auto',
        padding: 'clamp(80px, 10vw, 120px) 52px clamp(100px, 12vw, 160px)',
      }}>

        <p className="label" style={{ marginBottom: 52 }}>Mission</p>

        <p style={{
          fontFamily: 'var(--font-sub)',
          fontSize: 'clamp(1.12rem, 1.9vw, 1.3rem)',
          fontWeight: 400,
          lineHeight: 1.9,
          color: 'var(--text-muted)',
          marginBottom: 32,
          letterSpacing: '0.005em',
        }}>
          We're building an ethical AI company for the legal industry, one that treats transparency,
          human oversight, and bar compliance not as disclaimers, but as the foundation of every
          product decision we make.
        </p>

        <p style={{
          fontFamily: 'var(--font-sub)',
          fontSize: 'clamp(1.12rem, 1.9vw, 1.3rem)',
          fontWeight: 400,
          lineHeight: 1.9,
          color: 'var(--text-muted)',
          marginBottom: 64,
          letterSpacing: '0.005em',
        }}>
          We believe AI has the potential to fundamentally improve how law is practiced, how justice
          is accessed, and how the legal system serves society, and we intend to be the company
          that proves it can be done responsibly.
        </p>

        {/* Ethics pull quote */}
        <blockquote style={{
          margin: '0 0 64px',
          padding: '2px 0 2px 32px',
          borderLeft: '2px solid var(--accent)',
        }}>
          <p style={{
            fontFamily: 'var(--font-sub)',
            fontSize: 'clamp(1.12rem, 1.9vw, 1.3rem)',
            fontWeight: 400,
            lineHeight: 1.9,
            color: 'var(--text-muted)',
            letterSpacing: '0.005em',
          }}>
            We are open about where we stand. Ethics, human oversight, and giving back to the
            profession are{' '}
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.18em',
              fontWeight: 400,
              color: 'var(--accent)',
              letterSpacing: '-0.01em',
            }}>stated up front</span>
            {' '}rather than buried in a policy page. Widening access to justice and supporting the
            institutions that keep law equitable are part of how we work, because how we practice is
            the clearest signal of what we actually stand for.
          </p>
        </blockquote>

        {/* Closing, no em dashes */}
        <p style={{
          fontFamily: 'var(--font-sub)',
          fontSize: 'clamp(1.12rem, 1.9vw, 1.3rem)',
          fontWeight: 400,
          lineHeight: 1.9,
          color: 'var(--text-muted)',
          letterSpacing: '0.005em',
        }}>
          We're not here to disrupt the legal world for its own sake. We're here to grow it,
          ethically and intentionally, in a way that lifts every part of the field alongside us.
        </p>

        {/* Attribution */}
        <div style={{
          marginTop: 80,
          paddingTop: 32,
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--white)', letterSpacing: '0.01em' }}>Ithildin</span>
          <span style={{ width: 1, height: 14, background: 'var(--border)' }} />
          <span style={{ fontFamily: 'var(--font-sub)', fontSize: '0.78rem', fontWeight: 400, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Founded 2025</span>
        </div>

      </article>

      <Footer />
    </main>
  )
}
