import { NextResponse } from 'next/server'
import { query, initDB } from '@/lib/db'
import { signJWT } from '@/lib/auth'
import { z } from 'zod'

const loginSchema = z.object({
  apiKey: z.string().min(1),
})

export async function POST(request: Request) {
  try {
    await initDB()
    const body = await request.json()
    const { apiKey } = loginSchema.parse(body)

    const result = await query('SELECT id, api_key, wallet_address FROM agents WHERE api_key = $1', [apiKey])

    if (result.length === 0) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }

    const agent = result[0]
    const token = await signJWT({
      agentId: agent.id,
      apiKey: agent.api_key,
      walletAddress: agent.wallet_address,
    })

    const response = NextResponse.json({
      token,
      agentId: agent.id,
      apiKey: agent.api_key,
      walletAddress: agent.wallet_address,
    })

    response.cookies.set('session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
