import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'
import { getDatabase } from '@/lib/mongodb'

export const runtime = 'nodejs'

const DEFAULT_CONTENT = {
  hero: {
    heading: 'State Exam Prep',
    subheading: 'Helping students in grades 3–8 master NYS ELA & Math State Exams.',
    ctaText: 'Enroll Now',
  },
  about: {
    heading: 'Why Choose Exceed Learning?',
    body: 'Our expert tutors provide targeted instruction aligned with NYS standards to help every student succeed on state exams.',
  },
  contact: {
    email: 'info@exceedlearning.com',
    phone: '(555) 123-4567',
    address: '',
  },
  footer: {
    copyright: '© 2025 Exceed Learning. All rights reserved.',
  },
}

export async function GET() {
  const token = cookies().get('session')?.value
  if (!token || !verifySessionToken(token).valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const db = await getDatabase()
    const doc = await db.collection('content').findOne({ _id: 'site' as any })
    if (!doc) {
      await db.collection('content').insertOne({ _id: 'site' as any, ...DEFAULT_CONTENT })
      return NextResponse.json(DEFAULT_CONTENT)
    }
    const { _id, ...content } = doc
    return NextResponse.json(content)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const token = cookies().get('session')?.value
  if (!token || !verifySessionToken(token).valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const db = await getDatabase()
    await db.collection('content').updateOne(
      { _id: 'site' as any },
      { $set: body },
      { upsert: true }
    )
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}
