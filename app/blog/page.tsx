import type { Metadata } from 'next'
import StubPage from '@/components/StubPage'

export const metadata: Metadata = { title: 'Blog | Ithildin' }

export default function Blog() {
  return (
    <StubPage
      label="Blog"
      title="Blog"
      body="First posts coming shortly. Notes on depositions, the record, and the work that happens between the transcript and the brief."
    />
  )
}
