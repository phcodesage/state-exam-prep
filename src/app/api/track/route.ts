import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { page, referrer } = body

    const ua = request.headers.get('user-agent') || ''
    const device = parseDevice(ua)

    const db = await getDatabase()
    await db.collection('visits').insertOne({
      page: page || '/',
      referrer: referrer || '',
      device,
      userAgent: ua,
      timestamp: new Date(),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 })
  }
}

function parseDevice(ua: string): 'desktop' | 'mobile' | 'tablet' {
  const lower = ua.toLowerCase()
  if (/ipad|tablet|kindle|playbook|silk/.test(lower)) return 'tablet'
  if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/.test(lower)) return 'mobile'
  return 'desktop'
}
