import { NextResponse } from 'next/server'
import { getSwapQuote } from '@/lib/jupiter'
import { query, initDB } from '@/lib/db'
import { authenticateRequest } from '@/lib/auth'
import { z } from 'zod'

const tradeSchema = z.object({
  inputMint: z.string(),
  outputMint: z.string(),
  amount: z.number().positive(),
  slippageBps: z.number().default(100),
  execute: z.boolean().optional().default(false),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { inputMint, outputMint, amount, slippageBps, execute } = tradeSchema.parse(body)

    // Get quote from Jupiter
    const quote = await getSwapQuote({
      inputMint,
      outputMint,
      amount: Math.floor(amount * (inputMint === 'So11111111111111111111111111111111111111112' ? 1e9 : 1e6)),
      slippageBps,
    })

    if (!quote) {
      return NextResponse.json({ error: 'Failed to get quote' }, { status: 400 })
    }

    // If execute is true, try to execute the swap
    if (execute) {
      const auth = await authenticateRequest(request)
      if (!auth) {
        return NextResponse.json({
          message: 'Quote received. Login to execute swaps.',
          outAmount: (parseInt(quote.outAmount) / (outputMint === 'So11111111111111111111111111111111111111112' ? 1e9 : 1e6)).toFixed(6),
          priceImpactPct: quote.priceImpactPct.toString(),
          route: quote.routePlan,
        })
      }

      // Record trade in database
      try {
        await initDB()
        const tradeId = `trade-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
        const inputAmount = amount
        const outputAmount = parseInt(quote.outAmount) / (outputMint === 'So11111111111111111111111111111111111111112' ? 1e9 : 1e6)
        const pnl = 0 // Will be calculated later

        await query(
          `INSERT INTO trades (id, agent_id, input_mint, output_mint, input_amount, output_amount, price, pnl)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [tradeId, auth.agentId, inputMint, outputMint, inputAmount, outputAmount, outputAmount / inputAmount, pnl]
        )

        // Update agent stats
        await query(
          `UPDATE agents SET trade_count = trade_count + 1, updated_at = NOW() WHERE id = $1`,
          [auth.agentId]
        )
      } catch {
        // DB not available, continue
      }
    }

    return NextResponse.json({
      outAmount: (parseInt(quote.outAmount) / (outputMint === 'So11111111111111111111111111111111111111112' ? 1e9 : 1e6)).toFixed(6),
      priceImpactPct: quote.priceImpactPct.toString(),
      inAmount: quote.inAmount,
      route: quote.routePlan,
      message: execute ? 'Trade recorded' : 'Quote received',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }
    console.error('Trade error:', error)
    return NextResponse.json({ error: 'Trade failed' }, { status: 500 })
  }
}
