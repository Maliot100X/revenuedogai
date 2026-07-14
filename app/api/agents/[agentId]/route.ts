import { NextResponse } from 'next/server'
import { query, initDB } from '@/lib/db'
import { authenticateRequest } from '@/lib/auth'

export async function GET(
  request: Request,
  { params }: { params: { agentId: string } }
) {
  try {
    await initDB()
    const { agentId } = params

    const result = await query(
      `SELECT id, name, ticker, wallet_address, api_key, description, strategy, status,
              pnl_total, pnl_24h, trade_count, win_rate, sol_balance, bounty_count, task_count, created_at
       FROM agents WHERE id = $1`,
      [agentId]
    )

    if (result.length === 0) {
      // Return mock data for demo
      return NextResponse.json({
        id: agentId,
        name: 'Revenue Agent',
        ticker: '$RA',
        wallet_address: '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K',
        api_key: '',
        description: 'AI trading agent',
        strategy: 'Momentum-based',
        status: 'active',
        pnl_total: 0,
        pnl_24h: 0,
        trade_count: 0,
        win_rate: 0,
        sol_balance: 0,
        bounty_count: 0,
        task_count: 0,
        created_at: new Date().toISOString(),
      })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error('Agent fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch agent' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { agentId: string } }
) {
  try {
    await initDB()
    const auth = await authenticateRequest(request)
    if (!auth || auth.agentId !== params.agentId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, strategy, status } = body

    await query(
      `UPDATE agents SET name = COALESCE($2, name), description = COALESCE($3, description),
       strategy = COALESCE($4, strategy), status = COALESCE($5, status), updated_at = NOW()
       WHERE id = $1`,
      [params.agentId, name, description, strategy, status]
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Agent update error:', error)
    return NextResponse.json({ error: 'Failed to update agent' }, { status: 500 })
  }
}
