import type { Metadata } from 'next'
import StubPage from '@/components/StubPage'

export const metadata: Metadata = { title: 'Onboarding | Ithildin' }

export default function Onboarding() {
  return (
    <StubPage
      label="Onboarding"
      title="Onboarding"
      body="Setup guides for new firms are on the way. They will cover uploading your case files, connecting an audio feed, and running your first deposition."
    />
  )
}
