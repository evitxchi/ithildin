'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Users } from 'lucide-react'

export function PrivacyFeatures() {
  return (
    <section style={{ background: 'var(--bg)', padding: '0 0 80px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 52px' }}>
        <div className="relative">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 12,
          }}>

            {/* Card 1: Zero Training Stat */}
            <Card className="col-span-6 lg:col-span-2" style={{ overflow: 'hidden' }}>
              <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center', minHeight: 220 }}>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 224, height: 80, marginBottom: 8 }}>
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', color: 'var(--border)', opacity: 0.8 }} viewBox="0 0 254 104" fill="none">
                    <path d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z" fill="currentColor"/>
                  </svg>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', fontWeight: 400, color: 'var(--white)', position: 'relative', zIndex: 1 }}>0%</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--white)', marginBottom: 8 }}>Data Training</h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.6 }}>Your case data never trains our models. Ever.</p>
              </CardContent>
            </Card>

            {/* Card 2: Encrypted by Default */}
            <Card className="col-span-6 sm:col-span-3 lg:col-span-2" style={{ overflow: 'hidden' }}>
              <CardContent style={{ padding: '32px 24px', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                  <div style={{
                    position: 'relative',
                    width: 80, height: 80,
                    borderRadius: '50%',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      position: 'absolute', inset: -8,
                      borderRadius: '50%',
                      border: '1px solid var(--border)',
                      opacity: 0.4,
                    }}/>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                </div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--white)', marginBottom: 8 }}>Encrypted by Default</h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.6 }}>AES-256 at rest. TLS 1.3 in transit. No exceptions.</p>
              </CardContent>
            </Card>

            {/* Card 3: Compliance graph */}
            <Card className="col-span-6 sm:col-span-3 lg:col-span-2" style={{ overflow: 'hidden' }}>
              <CardContent style={{ padding: '24px 20px 0' }}>
                <svg style={{ width: '100%', color: 'var(--border)' }} viewBox="0 0 386 123" fill="none">
                  <rect width="386" height="123" rx="10"/>
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M3 123C3 123 14.3298 94.153 35.1282 88.0957C55.9266 82.0384 65.9333 80.5508 65.9333 80.5508C65.9333 80.5508 80.699 80.5508 92.1777 80.5508C103.656 80.5508 100.887 63.5348 109.06 63.5348C117.233 63.5348 117.217 91.9728 124.78 91.9728C132.343 91.9728 142.264 78.03 153.831 80.5508C165.398 83.0716 186.825 91.9728 193.761 91.9728C200.697 91.9728 206.296 63.5348 214.07 63.5348C221.844 63.5348 238.653 93.7771 244.234 91.9728C249.814 90.1684 258.8 60 266.19 60C272.075 60 284.1 88.057 286.678 88.0957C294.762 88.2171 300.192 72.9284 305.423 72.9284C312.323 72.9284 323.377 65.2437 335.553 63.5348C347.729 61.8259 348.218 82.07 363.639 80.5508C367.875 80.1335 372.949 82.2017 376.437 87.1008C379.446 91.3274 381.054 97.4325 382.521 104.647C383.479 109.364 382.521 123 382.521 123"
                    fill="url(#priv_grad1)"/>
                  <path stroke="var(--accent)" strokeWidth="2"
                    d="M3 121.077C3 121.077 15.3041 93.6691 36.0195 87.756C56.7349 81.8429 66.6632 80.9723 66.6632 80.9723C66.6632 80.9723 80.0327 80.9723 91.4656 80.9723C102.898 80.9723 100.415 64.2824 108.556 64.2824C116.696 64.2824 117.693 92.1332 125.226 92.1332C132.759 92.1332 142.07 78.5115 153.591 80.9723C165.113 83.433 186.092 92.1332 193 92.1332C199.908 92.1332 205.274 64.2824 213.017 64.2824C220.76 64.2824 237.832 93.8946 243.39 92.1332C248.948 90.3718 257.923 60.5 265.284 60.5C271.145 60.5 283.204 87.7182 285.772 87.756C293.823 87.8746 299.2 73.0802 304.411 73.0802C311.283 73.0802 321.425 65.9506 333.552 64.2824C345.68 62.6141 346.91 82.4553 362.27 80.9723C377.629 79.4892 383 106.605 383 106.605"/>
                  <defs>
                    <linearGradient id="priv_grad1" x1="3" y1="60" x2="3" y2="123" gradientUnits="userSpaceOnUse">
                      <stop stopColor="var(--accent)" stopOpacity="0.18"/>
                      <stop offset="1" stopColor="transparent" stopOpacity="0.05"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ textAlign: 'center', marginTop: 20, marginBottom: 8 }}>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--white)', marginBottom: 6 }}>Zero Retention</h2>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.6 }}>Session data is cleared after use. No persistence without consent.</p>
                </div>
              </CardContent>
            </Card>

            {/* Card 4: Attorney-Client Privilege */}
            <Card className="col-span-6 lg:col-span-3" style={{ overflow: 'hidden' }}>
              <CardContent style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, padding: 0, height: '100%' }}>
                <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32 }}>
                  <div style={{
                    position: 'relative', width: 48, height: 48, borderRadius: '50%',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '1px solid var(--border)', opacity: 0.4 }}/>
                    <Shield style={{ width: 20, height: 20, color: 'var(--text)' }} strokeWidth={1}/>
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--white)', marginBottom: 8 }}>Attorney-Client Privilege Protected</h2>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.76rem', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.65 }}>Your deposition content is confidential by design. We act as a data processor. Your firm remains in control.</p>
                  </div>
                </div>
                <div style={{
                  borderLeft: '1px solid var(--border)',
                  borderTop: '1px solid var(--border)',
                  marginTop: 24, marginRight: -1, marginBottom: -1,
                  borderRadius: '8px 0 0 0',
                  padding: '28px 20px',
                  position: 'relative',
                }}>
                  <div style={{ position: 'absolute', left: 12, top: 8, display: 'flex', gap: 4 }}>
                    {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 8, height: 8, borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--border)' }}/>)}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
                    {['GDPR Compliant', 'CCPA Ready', 'ISO 27001 Aligned'].map(item => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <circle cx="5" cy="5" r="4" stroke="var(--accent)" strokeWidth="0.8"/>
                          <polyline points="3,5 4.5,6.5 7,3.5" fill="none" stroke="var(--accent)" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 300, color: 'var(--text-muted)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 5: Role-Based Access */}
            <Card className="col-span-6 lg:col-span-3" style={{ overflow: 'hidden' }}>
              <CardContent style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, padding: 0, height: '100%' }}>
                <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 32 }}>
                  <div style={{
                    position: 'relative', width: 48, height: 48, borderRadius: '50%',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '1px solid var(--border)', opacity: 0.4 }}/>
                    <Users style={{ width: 20, height: 20, color: 'var(--text)' }} strokeWidth={1}/>
                  </div>
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--white)', marginBottom: 8 }}>Role-Based Access Control</h2>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.76rem', fontWeight: 300, color: 'var(--text-muted)', lineHeight: 1.65 }}>Limit data access by role. Every action is logged, audited, and anomaly-detected in real time.</p>
                  </div>
                </div>
                <div style={{ position: 'relative', padding: '24px 0', borderLeft: '1px solid var(--border)' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'var(--border)' }}/>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20, padding: '16px 0', height: '100%' }}>
                    {[
                      { name: 'Lead Attorney', align: 'right', img: 'https://i.pravatar.cc/40?img=11' },
                      { name: 'Associate',     align: 'left',  img: 'https://i.pravatar.cc/40?img=32' },
                      { name: 'Paralegal',     align: 'right', img: 'https://i.pravatar.cc/40?img=47' },
                    ].map(({ name, align, img }) => (
                      <div key={name} style={{
                        display: 'flex',
                        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
                        alignItems: 'center',
                        gap: 8,
                        padding: '0 16px',
                      }}>
                        {align === 'left' && <img src={img} alt={name} style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid var(--bg)' }}/>}
                        <span style={{
                          fontFamily: 'var(--font-sans)', fontSize: '0.65rem', fontWeight: 300,
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border)',
                          borderRadius: 4,
                          padding: '3px 8px',
                          background: 'var(--bg-elevated)',
                        }}>{name}</span>
                        {align === 'right' && <img src={img} alt={name} style={{ width: 28, height: 28, borderRadius: '50%', border: '2px solid var(--bg)' }}/>}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  )
}
