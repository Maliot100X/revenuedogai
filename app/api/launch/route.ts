import { NextResponse } from 'next/server'
import { query, initDB } from '@/lib/db'
import { authenticateRequest } from '@/lib/auth'
import { launchPumpFunToken } from '@/lib/pumpfun'
import { z } from 'zod'

const launchSchema = z.object({
  name: z.string().min(1).max(50),
  ticker: z.string().min(1).max(10),
  description: z.string().max(500),
})

export async function POST(request: Request) {
  try {
    await initDB()
    const auth = await authenticateRequest(request)

    const body = await request.json()
    const { name, ticker, description } = launchSchema.parse(body)

    if (!auth) {
      return NextResponse.json({ error: 'Authentication required to launch tokens' }, { status: 401 })
    }

    // Get agent's private key for signing
    const agentResult = await query('SELECT private_key FROM agents WHERE id = $1', [auth.agentId])
    if (agentResult.length === 0) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
    }

    const privateKey = agentResult[0].private_key

    // Launch token via pump.fun
    const result = await launchPumpFunToken({
      name,
      ticker,
      description,
    }, privateKey)

    if (result.success && result.mint) {
      // Store token in database
      const tokenId = `token-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      await query(
        `INSERT INTO tokens (id, agent_id, name, ticker, mint_address, description, status, launched_at)
         VALUES ($1, $2, $3, $4, $5, $6, 'active', NOW())`,
        [tokenId, auth.agentId, name, ticker, result.mint, description]
      )

      return NextResponse.json({
        success: true,
        mint: result.mint,
        tx: result.tx,
        message: `Token ${ticker} launched successfully!`,
      })
    }

    return NextResponse.json({
      success: false,
      error: result.error || 'Failed to launch token',
    }, { status: 500 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }
    console.error('Launch error:', error)
    return NextResponse.json({ error: 'Token launch failed' }, { status: 500 })
  }
}
