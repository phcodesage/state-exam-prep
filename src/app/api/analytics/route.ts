import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getDatabase } from '@/lib/mongodb'
import { verifySessionToken } from '@/lib/auth'

export const runtime = 'nodejs'

export async function GET() {
  const token = cookies().get('session')?.value
  if (!token || !verifySessionToken(token).valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const db = await getDatabase()
    const visits = db.collection('visits')

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [totalVisits, thisMonth, deviceBreakdown, topPages] = await Promise.all([
      visits.countDocuments(),
      visits.countDocuments({ timestamp: { $gte: startOfMonth } }),
      visits.aggregate([
        { $group: { _id: '$device', count: { $sum: 1 } } },
      ]).toArray(),
      visits.aggregate([
        { $group: { _id: '$page', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]).toArray(),
    ])

    const deviceMap: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0 }
    for (const d of deviceBreakdown) {
      if (d._id && deviceMap.hasOwnProperty(d._id)) {
        deviceMap[d._id] = d.count
      }
    }

    const devices = [
      { label: 'Desktop', key: 'desktop', count: deviceMap.desktop, pct: totalVisits ? Math.round((deviceMap.desktop / totalVisits) * 100) : 0 },
      { label: 'Mobile', key: 'mobile', count: deviceMap.mobile, pct: totalVisits ? Math.round((deviceMap.mobile / totalVisits) * 100) : 0 },
      { label: 'Tablet', key: 'tablet', count: deviceMap.tablet, pct: totalVisits ? Math.round((deviceMap.tablet / totalVisits) * 100) : 0 },
    ]

    const pages = topPages.map(p => ({
      path: p._id || '/',
      label: getPageLabel(p._id || '/'),
      visits: p.count,
    }))

    return NextResponse.json({
      totalVisits,
      thisMonth,
      devices,
      topPages: pages,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 })
  }
}

function getPageLabel(path: string): string {
  const labels: Record<string, string> = {
    '/': 'Home',
    '/admin': 'Admin',
    '/login': 'Login',
  }
  if (labels[path]) return labels[path]
  return path.replace(/^\//, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || 'Home'
}
