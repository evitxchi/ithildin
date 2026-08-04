import type { Metadata } from 'next'
import StubPage from '@/components/StubPage'

export const metadata: Metadata = { title: 'Help Center | Ithildin' }

export default function HelpCenter() {
  return (
    <StubPage
      label="Help Center"
      title="Help Center"
      body="Documentation and support articles are being written. Until then, our team answers questions directly."
    />
  )
}
