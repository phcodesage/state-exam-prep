import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('session')?.value
  const valid = token ? verifySessionToken(token).valid : false

  if (!valid) {
    redirect('/login')
  }

  return <>{children}</>
}
