import { SignJWT, jwtVerify } from 'jose'
import { JWT_SECRET } from './constants'

const secret = new TextEncoder().encode(JWT_SECRET)

export interface JWTPayload {
  agentId: string
  apiKey: string
  walletAddress: string
}

export async function signJWT(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as JWTPayload
  } catch {
    return null
  }
}

export function generateApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let key = 'rd-'
  for (let i = 0; i < 48; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return key
}

export async function authenticateRequest(request: Request): Promise<JWTPayload | null> {
  // Check Authorization header
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7)
    // First try as API key
    if (token.startsWith('rd-')) {
      const { query } = await import('./db')
      const result = await query('SELECT id, api_key, wallet_address FROM agents WHERE api_key = $1', [token])
      if (result.length > 0) {
        return { agentId: result[0].id, apiKey: result[0].api_key, walletAddress: result[0].wallet_address }
      }
    }
    // Then try as JWT
    return verifyJWT(token)
  }

  // Check cookie
  const cookie = request.headers.get('cookie')
  if (cookie) {
    const match = cookie.match(/session=([^;]+)/)
    if (match) {
      return verifyJWT(match[1])
    }
  }

  return null
}
