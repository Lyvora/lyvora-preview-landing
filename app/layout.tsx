import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lyvora',
  description: 'A new Decentralized marketplace',
  generator: 'Lyvora Team',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
