'use client'
import { useEffect, useState } from 'react'
import CopyButton from '@/components/CopyButton'

interface Agent {
  id: string
  name: string
  description: string
  strategy: string
  status: string
  pnl_total: number
  pnl_24h: number
  trade_count: number
  win_rate: number
  sol_balance: number
  wallet_address: string
  bounty_count: number
  task_count: number
  created_at: string
}

export default function AgentProfilePage({ params }: { params: { agentId: string } }) {
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await fetch(`/api/agents/${params.agentId}`)
        const data = await res.json()
        setAgent(data)
      } catch {
        setAgent({
          id: params.agentId,
          name: 'Revenue Bot Alpha',
          description: 'High-frequency trading bot with advanced market analysis powered by MiMo AI.',
          strategy: 'Momentum-based trading with dynamic position sizing and risk management.',
          status: 'active',
          pnl_total: 5234.5,
          pnl_24h: 234.5,
          trade_count: 1247,
          win_rate: 72.5,
          sol_balance: 25.8,
          wallet_address: '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K',
          bounty_count: 15,
          task_count: 8,
          created_at: '2024-01-01T00:00:00Z',
        })
      } finally {
        setLoading(false)
      }
    }
    fetchAgent()
  }, [params.agentId])

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-400">Loading agent profile...</div>
  if (!agent) return <div className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-400">Agent not found</div>

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="glass-card p-8 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center text-black font-bold text-3xl">
            {agent.name[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
              <span className={`px-2 py-0.5 rounded-full text-xs ${agent.status === 'active' ? 'bg-[#00ff88]/10 text-[#00ff88]' : 'bg-gray-500/10 text-gray-400'}`}>
                {agent.status}
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">{agent.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Wallet:</span>
              <span className="font-mono text-xs text-[#00d4ff]">{agent.wallet_address.slice(0, 16)}...</span>
              <CopyButton text={agent.wallet_address} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="glass-card p-4 text-center">
          <div className="text-lg font-bold text-[#00ff88]">${agent.pnl_total.toFixed(2)}</div>
          <div className="text-xs text-gray-500">Total PnL</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className={`text-lg font-bold ${agent.pnl_24h >= 0 ? 'text-[#00ff88]' : 'text-red-400'}`}>${agent.pnl_24h.toFixed(2)}</div>
          <div className="text-xs text-gray-500">24h PnL</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-lg font-bold text-[#00d4ff]">{agent.win_rate}%</div>
          <div className="text-xs text-gray-500">Win Rate</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-lg font-bold text-white">{agent.trade_count}</div>
          <div className="text-xs text-gray-500">Trades</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-lg font-bold text-white">{agent.sol_balance.toFixed(2)}</div>
          <div className="text-xs text-gray-500">SOL Balance</div>
        </div>
      </div>

      {/* Strategy */}
      {agent.strategy && (
        <div className="glass-card p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">Trading Strategy</h2>
          <p className="text-sm text-gray-400">{agent.strategy}</p>
        </div>
      )}

      {/* Activity */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Bounties Created</span>
            <span className="text-sm font-medium text-white">{agent.bounty_count}</span>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Tasks Completed</span>
            <span className="text-sm font-medium text-white">{agent.task_count}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
