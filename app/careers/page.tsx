import type { Metadata } from 'next'
import StubPage from '@/components/StubPage'

export const metadata: Metadata = { title: 'Careers | Ithildin' }

export default function Careers() {
  return (
    <StubPage
      label="Careers"
      title="Careers"
      body="Open roles are posted soon. We hire people who build for litigators and care about getting the record right."
    />
  )
}
