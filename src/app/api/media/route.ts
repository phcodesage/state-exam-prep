import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySessionToken } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'

const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico']
const VIDEO_EXTS = ['.mp4', '.webm', '.mov', '.ogg']

function getMediaType(ext: string): 'image' | 'video' | 'other' {
  if (IMAGE_EXTS.includes(ext)) return 'image'
  if (VIDEO_EXTS.includes(ext)) return 'video'
  return 'other'
}

export async function GET() {
  const token = cookies().get('session')?.value
  if (!token || !verifySessionToken(token).valid) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const publicDir = path.join(process.cwd(), 'public', 'images')
    const files = fs.existsSync(publicDir) ? fs.readdirSync(publicDir) : []

    const media = files.map((file) => {
      const ext = path.extname(file).toLowerCase()
      const stat = fs.statSync(path.join(publicDir, file))
      return {
        name: file,
        url: `/images/${file}`,
        type: getMediaType(ext),
        ext,
        size: stat.size,
        updatedAt: stat.mtime,
      }
    }).filter(f => f.type !== 'other')

    return NextResponse.json(media)
  } catch {
    return NextResponse.json({ error: 'Failed to list media' }, { status: 500 })
  }
}
