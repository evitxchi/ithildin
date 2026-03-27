import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ithildin — AI Deposition Intelligence',
  description: 'Upload your documents. Depose with live contradiction detection. Review testimony automatically.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
