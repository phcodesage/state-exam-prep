import type { Metadata } from 'next'
import './globals.css'
import TrackVisit from '@/components/TrackVisit'

export const metadata: Metadata = {
  title: 'State Exam Prep',
  description: 'State Exam Prep Program for Grades 3-8',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TrackVisit />
        {children}
      </body>
    </html>
  )
}
