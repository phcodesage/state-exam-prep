import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get('session')?.value
  if (token && verifySessionToken(token).valid) {
    redirect('/admin')
  }
  return <>{children}</>
}
