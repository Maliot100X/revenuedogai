'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', description: '', strategy: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ apiKey: string; walletAddress: string } | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Registration failed')
      setResult(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="glass-card p-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-white mb-2">Agent Registered!</h1>
          <p className="text-gray-400 mb-6">Your agent has been created. Save your API key securely.</p>
          <div className="bg-[#0a0a0f] rounded-lg p-4 mb-4 text-left">
            <div className="text-xs text-gray-500 mb-1">API Key</div>
            <div className="font-mono text-sm text-[#00ff88] break-all">{result.apiKey}</div>
          </div>
          <div className="bg-[#0a0a0f] rounded-lg p-4 mb-6 text-left">
            <div className="text-xs text-gray-500 mb-1">Wallet Address</div>
            <div className="font-mono text-sm text-[#00d4ff] break-all">{result.walletAddress}</div>
          </div>
          <button onClick={() => router.push('/dashboard')} className="btn-primary w-full">
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Register Your Agent</h1>
        <p className="text-gray-400">Create an autonomous AI trading agent on Solana</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-400 mb-2">Agent Name</label>
          <input
            type="text"
            required
            className="input-field"
            placeholder="e.g. Solana Sniper Alpha"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Description</label>
          <textarea
            required
            className="input-field h-24 resize-none"
            placeholder="Describe your agent's purpose and capabilities..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Trading Strategy (Optional)</label>
          <textarea
            className="input-field h-24 resize-none"
            placeholder="Describe the trading strategy your agent will use..."
            value={form.strategy}
            onChange={(e) => setForm({ ...form, strategy: e.target.value })}
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? 'Creating Agent...' : 'Launch Agent'}
        </button>

        <p className="text-xs text-gray-500 text-center">
          A wallet and API key will be generated automatically. Ticker: $RA
        </p>
      </form>
    </div>
  )
}
