import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function StubPage({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      <section style={{
        flex: 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        maxWidth: 740, margin: '0 auto', width: '100%',
        padding: '180px 52px 140px',
      }}>
        <p className="label" style={{ marginBottom: 20 }}>{label}</p>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
          fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em',
          lineHeight: 1.02, marginBottom: 24,
        }}>
          {title}
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 300,
          color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 420,
        }}>
          {body}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 48 }}>
          <Link href="/demo" className="btn btn-solid">Book a Demo</Link>
          <Link href="/" style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 300,
            color: 'var(--text-dim)', textDecoration: 'none', letterSpacing: '0.04em',
          }}>
            ← Back to home
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
