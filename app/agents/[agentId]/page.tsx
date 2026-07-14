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
      } catch (e) {
        console.error('Failed to fetch agent:', e)
      } finally {
        setLoading(false)
      }
    }
    fetchAgent()
  }, [params.agentId])

  if (loading) return <div style={{ padding: 60, textAlign: 'center', color: '#6b6b8a' }}>Loading...</div>
  if (!agent) return <div style={{ padding: 60, textAlign: 'center', color: '#6b6b8a' }}>Agent not found</div>

  return (
    <div style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <div style={{ width: 64, height: 64, background: 'linear-gradient(135deg, #00ff88, #00d4ff)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 900, color: '#000' }}>R</div>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800 }}>{agent.name}</h1>
          <p style={{ color: '#6b6b8a', fontSize: 14 }}>{agent.description || 'No description'}</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {[
          { label: 'Status', value: agent.status, color: agent.status === 'active' ? '#00ff88' : '#ff4444' },
          { label: 'Trades', value: agent.trade_count.toString() },
          { label: 'Win Rate', value: `${(agent.win_rate * 100).toFixed(1)}%` },
          { label: 'PnL Total', value: `${agent.pnl_total.toFixed(4)} SOL` },
          { label: 'Balance', value: `${agent.sol_balance.toFixed(4)} SOL` },
          { label: 'Created', value: new Date(agent.created_at).toLocaleDateString() },
        ].map(item => (
          <div key={item.label} style={{ padding: 16, background: '#0d0d1a', border: '1px solid #1e1e3a', borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: '#6b6b8a', marginBottom: 4 }}>{item.label}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: item.color || '#e8e8f0' }}>{item.value}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, padding: 16, background: '#0d0d1a', border: '1px solid #1e1e3a', borderRadius: 8 }}>
        <div style={{ fontSize: 12, color: '#6b6b8a', marginBottom: 4 }}>Wallet</div>
        <div style={{ fontSize: 13, fontFamily: 'monospace', wordBreak: 'break-all' }}>
          {agent.wallet_address} <CopyButton text={agent.wallet_address} />
        </div>
      </div>
    </div>
  )
}
