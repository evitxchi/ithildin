import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ithildin — AI Deposition Intelligence',
  description: 'Upload your case files. Depose with real-time AI intelligence. Contradictions, inconsistencies, and follow-ups surfaced as testimony unfolds.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
