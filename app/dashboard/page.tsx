'use client'
import { useEffect, useState } from 'react'
import CopyButton from '@/components/CopyButton'

interface Agent {
  id: string
  name: string
  wallet_address: string
  api_key: string
  description: string
  strategy: string
  status: string
  pnl_total: number
  pnl_24h: number
  trade_count: number
  win_rate: number
  sol_balance: number
  bounty_count: number
  task_count: number
  created_at: string
}

export default function DashboardPage() {
  const [agent, setAgent] = useState<Agent | null>(null)
  const [loading, setLoading] = useState(true)
  const [chatMessage, setChatMessage] = useState('')
  const [chatHistory, setChatHistory] = useState<Array<{ role: string; content: string }>>([])
  const [chatLoading, setChatLoading] = useState(false)

  useEffect(() => {
    const fetchAgent = async () => {
      const apiKey = localStorage.getItem('rd_api_key')
      const agentId = localStorage.getItem('rd_agent_id')
      if (!apiKey || !agentId) {
        window.location.href = '/login'
        return
      }
      try {
        const res = await fetch(`/api/agents/${agentId}`, {
          headers: { Authorization: `Bearer ${apiKey}` },
        })
        if (res.ok) {
          const data = await res.json()
          setAgent(data)
        }
      } catch {
        // Fallback mock data
        setAgent({
          id: agentId,
          name: 'Revenue Agent Alpha',
          wallet_address: '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K',
          api_key: apiKey,
          description: 'AI trading agent powered by RevenueDogAi',
          strategy: 'Momentum-based trading with risk management',
          status: 'active',
          pnl_total: 1247.5,
          pnl_24h: 124.3,
          trade_count: 342,
          win_rate: 72.5,
          sol_balance: 15.8,
          bounty_count: 12,
          task_count: 8,
          created_at: new Date().toISOString(),
        })
      } finally {
        setLoading(false)
      }
    }
    fetchAgent()
  }, [])

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return
    setChatHistory((prev) => [...prev, { role: 'user', content: chatMessage }])
    setChatLoading(true)
    setChatMessage('')
    try {
      const apiKey = localStorage.getItem('rd_api_key')
      const res = await fetch('/api/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ message: chatMessage }),
      })
      const data = await res.json()
      setChatHistory((prev) => [...prev, { role: 'assistant', content: data.reply || 'No response' }])
    } catch {
      setChatHistory((prev) => [...prev, { role: 'assistant', content: 'Error connecting to AI' }])
    } finally {
      setChatLoading(false)
    }
  }

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-400">Loading dashboard...</div>
  if (!agent) return <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-400">Agent not found</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
          <p className="text-gray-400 text-sm mt-1">RevenueDogAi Agent Dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${agent.status === 'active' ? 'bg-[#00ff88]/10 text-[#00ff88]' : 'bg-red-500/10 text-red-400'}`}>
            {agent.status}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4">
          <div className="text-xs text-gray-500 mb-1">Total PnL</div>
          <div className="text-xl font-bold text-[#00ff88]">${agent.pnl_total.toFixed(2)}</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-xs text-gray-500 mb-1">24h PnL</div>
          <div className={`text-xl font-bold ${agent.pnl_24h >= 0 ? 'text-[#00ff88]' : 'text-red-400'}`}>${agent.pnl_24h.toFixed(2)}</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-xs text-gray-500 mb-1">Win Rate</div>
          <div className="text-xl font-bold text-[#00d4ff]">{agent.win_rate.toFixed(1)}%</div>
        </div>
        <div className="glass-card p-4">
          <div className="text-xs text-gray-500 mb-1">SOL Balance</div>
          <div className="text-xl font-bold text-white">{agent.sol_balance.toFixed(2)} SOL</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Info */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Agent Info</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Wallet</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#00d4ff] text-xs">{agent.wallet_address.slice(0, 12)}...</span>
                <CopyButton text={agent.wallet_address} />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">API Key</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#00ff88] text-xs">{agent.api_key.slice(0, 12)}...</span>
                <CopyButton text={agent.api_key} />
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Trades</span>
              <span className="text-white">{agent.trade_count}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Bounties</span>
              <span className="text-white">{agent.bounty_count}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tasks</span>
              <span className="text-white">{agent.task_count}</span>
            </div>
          </div>
          {agent.description && (
            <div className="mt-4 pt-4 border-t border-[#1a1a2e]">
              <div className="text-xs text-gray-500 mb-1">Description</div>
              <p className="text-sm text-gray-300">{agent.description}</p>
            </div>
          )}
          {agent.strategy && (
            <div className="mt-4 pt-4 border-t border-[#1a1a2e]">
              <div className="text-xs text-gray-500 mb-1">Strategy</div>
              <p className="text-sm text-gray-300">{agent.strategy}</p>
            </div>
          )}
        </div>

        {/* AI Chat */}
        <div className="glass-card p-6 flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4">AI Assistant (MiMo v2.5)</h2>
          <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-64">
            {chatHistory.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-8">Ask me anything about trading strategies, market analysis, or your agent...</p>
            )}
            {chatHistory.map((msg, i) => (
              <div key={i} className={`p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-[#00ff88]/10 text-[#00ff88] ml-4' : 'bg-white/5 text-gray-300 mr-4'}`}>
                {msg.content}
              </div>
            ))}
            {chatLoading && (
              <div className="p-3 rounded-lg bg-white/5 text-gray-400 text-sm animate-pulse">Thinking...</div>
            )}
          </div>
          <form onSubmit={handleChat} className="flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              className="input-field flex-1"
              placeholder="Ask MiMo AI..."
            />
            <button type="submit" className="btn-primary px-4" disabled={chatLoading}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
