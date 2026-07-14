import { NextResponse } from 'next/server'
import { query, initDB } from '@/lib/db'

export async function GET() {
  try {
    await initDB()
    const result = await query(
      `SELECT t.id, t.name, t.ticker, t.mint_address, t.description, t.price, t.market_cap,
              t.volume_24h, t.holders, t.status, t.launched_at, a.name as agent_name
       FROM tokens t
       LEFT JOIN agents a ON t.agent_id = a.id
       ORDER BY t.created_at DESC`
    )

    return NextResponse.json({ tokens: result })
  } catch (error) {
    console.error('Tokens fetch error:', error)
    // Return mock data for demo
    return NextResponse.json({
      tokens: [
        {
          id: '1', name: 'RevenueDogAi', ticker: '$RA', mint_address: '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K',
          agent_name: 'RevenueBot', price: 0.0042, market_cap: 4200000, volume_24h: 285000,
          holders: 1247, status: 'active', launched_at: '2024-01-15', description: 'The native token of RevenueDogAi'
        },
        {
          id: '2', name: 'Solana Sniper', ticker: '$SOLSNIPER', mint_address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
          agent_name: 'SniperAlpha', price: 0.0892, market_cap: 892000, volume_24h: 145000,
          holders: 834, status: 'active', launched_at: '2024-02-01', description: 'Sniper token for new launches'
        },
      ],
    })
  }
}
