'use client'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Mission() {
  return (
    <main style={{ background: 'var(--bg)' }}>
      <Nav />

      <article style={{
        maxWidth: 740,
        margin: '0 auto',
        padding: 'clamp(120px, 15vw, 180px) 52px clamp(100px, 12vw, 160px)',
      }}>

        {/* Eyebrow */}
        <p className="label" style={{ marginBottom: 52 }}>Mission</p>

        {/* Opening paragraph */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
          fontWeight: 300,
          lineHeight: 1.9,
          color: 'var(--text-muted)',
          marginBottom: 32,
          letterSpacing: '0.005em',
        }}>
          We're building an ethical AI company for the legal industry, one that treats transparency,
          human oversight, and bar compliance not as disclaimers, but as the foundation of every
          product decision we make.
        </p>

        {/* Vision paragraph */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
          fontWeight: 300,
          lineHeight: 1.9,
          color: 'var(--text-muted)',
          marginBottom: 64,
          letterSpacing: '0.005em',
        }}>
          We believe AI has the potential to fundamentally improve how law is practiced, how justice
          is accessed, and how the legal system serves society — and we intend to be the company
          that proves it can be done responsibly.
        </p>

        {/* 1% pull quote */}
        <blockquote style={{
          margin: '0 0 64px',
          padding: '2px 0 2px 32px',
          borderLeft: '2px solid var(--accent)',
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
            fontWeight: 300,
            lineHeight: 1.9,
            color: 'var(--text-muted)',
            letterSpacing: '0.005em',
          }}>
            From day one, we've committed{' '}
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.18em',
              fontWeight: 400,
              color: 'var(--accent)',
              letterSpacing: '-0.01em',
            }}>1%</span>
            {' '}of our revenue back to improving the legal system as a whole — funding legal aid,
            expanding access to justice, and supporting the institutions that keep law equitable.
            Because we see that not as charity, but as the clearest signal of what we actually
            stand for.
          </p>
        </blockquote>

        {/* Closing paragraph */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.05rem, 1.8vw, 1.22rem)',
          fontWeight: 300,
          lineHeight: 1.9,
          color: 'var(--text-muted)',
          letterSpacing: '0.005em',
        }}>
          We're not here to disrupt the legal world for its own sake. We're here to grow it —
          ethically and intentionally — in a way that lifts every part of the field alongside us.
        </p>

        {/* Attribution line */}
        <div style={{
          marginTop: 80,
          paddingTop: 32,
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            color: 'var(--white)',
            letterSpacing: '0.01em',
          }}>Ithildin</span>
          <span style={{ width: 1, height: 14, background: 'var(--border)' }}/>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            fontWeight: 300,
            color: 'var(--text-dim)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>Founded 2024</span>
        </div>

      </article>

      <Footer />
    </main>
  )
}
