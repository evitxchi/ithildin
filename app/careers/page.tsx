import type { Metadata } from 'next'
import CareersView from './CareersView'

export const metadata: Metadata = {
  title: 'Careers | Ithildin',
  description: 'Open roles at Ithildin. Build the intelligence layer for the deposition record.',
}

export default function Careers() {
  return <CareersView />
}
