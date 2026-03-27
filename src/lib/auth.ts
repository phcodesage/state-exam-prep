import crypto from 'crypto'

const DEFAULT_TTL_SECONDS = 60 * 60 * 24 // 1 day

export function getAuthSecret() {
  return process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || 'dev-secret'
}

export function createSessionToken(payload: Record<string, any>, ttlSeconds = DEFAULT_TTL_SECONDS) {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds
  const body = base64url(JSON.stringify({ ...payload, exp }))
  const data = `${header}.${body}`
  const sig = sign(data, getAuthSecret())
  return `${data}.${sig}`
}

export function verifySessionToken(token: string): { valid: boolean; payload?: any } {
  try {
    const [headerB64, bodyB64, sig] = token.split('.')
    if (!headerB64 || !bodyB64 || !sig) return { valid: false }
    const data = `${headerB64}.${bodyB64}`
    const expected = sign(data, getAuthSecret())
    if (!timingSafeEqual(sig, expected)) return { valid: false }
    const payload = JSON.parse(Buffer.from(bodyB64, 'base64url').toString('utf8'))
    if (typeof payload.exp === 'number' && payload.exp < Math.floor(Date.now() / 1000)) {
      return { valid: false }
    }
    return { valid: true, payload }
  } catch {
    return { valid: false }
  }
}

function sign(data: string, secret: string) {
  return crypto.createHmac('sha256', secret).update(data).digest('base64url')
}

function timingSafeEqual(a: string, b: string) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return crypto.timingSafeEqual(ab, bb)
}

function base64url(input: string) {
  return Buffer.from(input, 'utf8').toString('base64url')
}
