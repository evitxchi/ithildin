import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const STANDARDS = [
  {
    label: 'SOC 2 Type II',
    heading: 'Audited annually by an independent third party.',
    body: [
      'Ithildin undergoes annual SOC 2 Type II audits covering the Trust Services Criteria for Security, Availability, and Confidentiality. Unlike a Type I audit, Type II validates that our controls operate effectively over time — not just on paper.',
      'Controls assessed include: logical access management, encryption at rest and in transit, incident response procedures, change management, and continuous monitoring. Audit reports are available to enterprise clients under NDA.',
    ],
    details: [
      'AES-256 encryption at rest',
      'TLS 1.3 for all data in transit',
      'Role-based access control with least-privilege enforcement',
      'Automated vulnerability scanning and penetration testing',
      'Incident response SLA: notification within 24 hours',
    ],
  },
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
      'Data minimization — we collect only what is necessary',
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
      'Our information security management system (ISMS) is aligned with ISO/IEC 27001:2022, the international standard for managing information security risk. This means security is embedded in how we build, operate, and improve Ithildin — not bolted on after the fact.',
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

const PRACTICES = [
  { title: 'Zero retention', body: 'Deposition content is never retained beyond your active session unless you explicitly export it. We do not train models on client data.' },
  { title: 'Encryption everywhere', body: 'All data is encrypted at rest with AES-256 and in transit with TLS 1.3. Encryption keys are managed with strict access controls.' },
  { title: 'Access controls', body: 'Role-based permissions limit data access to only those who need it. All access is logged, audited, and anomaly-detected.' },
  { title: 'Audit logging', body: 'Every data access event is logged with user identity, timestamp, and action. Logs are tamper-evident and retained for 12 months.' },
  { title: 'Penetration testing', body: 'External penetration tests are conducted at least annually by independent security firms. Critical findings are remediated within 30 days.' },
  { title: 'Vulnerability management', body: 'Automated scanning runs continuously across our infrastructure. We maintain a formal vulnerability disclosure program.' },
]

export default function Privacy() {
  return (
    <main style={{ background: 'var(--bg)' }}>
      <Nav />

      {/* Hero */}
      <section style={{ padding: '160px 52px 80px', maxWidth: 860, margin: '0 auto' }}>
        <p className="label" style={{ marginBottom: 18 }}>Security & Compliance</p>
        <h1 style={{
          fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem, 6vw, 5rem)',
          fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.025em',
          lineHeight: 1.0, marginBottom: 28,
        }}>
          Your data,<br />protected.
        </h1>
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: 300,
          color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, maxWidth: 520,
        }}>
          Ithildin is built for the legal industry — where confidentiality is non-negotiable. Every system, control, and audit exists to protect your clients' most sensitive information.
        </p>
      </section>

      <div className="line" />

      {/* Standards */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '80px 52px' }}>
        <div className="" style={{ marginBottom: 64 }}>
          <p className="label" style={{ marginBottom: 16 }}>Compliance Standards</p>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.05,
          }}>Four frameworks. One commitment.</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {STANDARDS.map((s, i) => (
            <div key={s.label} className="" style={{
              padding: '48px 0',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              borderBottom: i === STANDARDS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              transitionDelay: `${i * 0.08}s`,
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
                      color: 'rgba(255,255,255,0.62)', lineHeight: 1.75,
                      marginBottom: j < s.body.length - 1 ? 14 : 24,
                    }}>{p}</p>
                  ))}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {s.details.map((d, j) => (
                      <li key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <span style={{ color: 'rgba(200,169,110,0.6)', marginTop: 2, flexShrink: 0 }}>—</span>
                        <span style={{
                          fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 300,
                          color: 'rgba(255,255,255,0.55)', lineHeight: 1.6,
                        }}>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="line" />

      {/* Data Practices */}
      <section style={{ maxWidth: 860, margin: '0 auto', padding: '80px 52px' }}>
        <div className="" style={{ marginBottom: 56 }}>
          <p className="label" style={{ marginBottom: 16 }}>Data Practices</p>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.05,
          }}>How we handle your data.</h2>
        </div>
        <div className="privacy-practices-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
        }}>
          {PRACTICES.map((p, i) => (
            <div key={p.title} className="" style={{
              padding: '32px 28px',
              borderRight: '1px solid rgba(255,255,255,0.06)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              transitionDelay: `${i * 0.06}s`,
            }}>
              <h4 style={{
                fontFamily: 'var(--font-serif)', fontSize: '1.05rem',
                color: 'var(--white)', marginBottom: 10,
              }}>{p.title}</h4>
              <p style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 300,
                color: 'rgba(255,255,255,0.55)', lineHeight: 1.7,
              }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="line" />

      {/* Contact */}
      <section style={{ padding: '80px 52px 120px', textAlign: 'center' }}>
        <div className="" style={{ maxWidth: 520, margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
            fontWeight: 400, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: 18,
          }}>Questions about privacy?</h2>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 300,
            color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 32,
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
