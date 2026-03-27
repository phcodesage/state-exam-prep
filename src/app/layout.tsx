import type { Metadata } from 'next'
import './globals.css'
import TrackVisit from '@/components/TrackVisit'

export const metadata: Metadata = {
  title: 'State Exam Prep',
  description: 'State Exam Prep Program for Grades 3-8',
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
