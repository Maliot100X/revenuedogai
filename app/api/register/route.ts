import { NextResponse } from 'next/server'
import { query, initDB } from '@/lib/db'
import { generateApiKey } from '@/lib/auth'
import { generateWallet } from '@/lib/solana'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).default(''),
  strategy: z.string().max(1000).default(''),
})

export async function POST(request: Request) {
  try {
    await initDB()
    const body = await request.json()
    const { name, description, strategy } = registerSchema.parse(body)

    // Generate wallet and API key
    const wallet = generateWallet()
    const apiKey = generateApiKey()
    const id = `agent-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    await query(
      `INSERT INTO agents (id, name, wallet_address, private_key, api_key, description, strategy, ticker)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, name, wallet.publicKey, wallet.secretKey, apiKey, description, strategy, '$RA']
    )

    return NextResponse.json({
      id,
      name,
      walletAddress: wallet.publicKey,
      apiKey,
      ticker: '$RA',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
