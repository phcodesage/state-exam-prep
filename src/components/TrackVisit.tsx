'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function TrackVisit() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname?.startsWith('/admin') || pathname?.startsWith('/login')) return

    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: pathname || '/',
        referrer: document.referrer || '',
      }),
    }).catch(() => {})
  }, [pathname])

  return null
}
