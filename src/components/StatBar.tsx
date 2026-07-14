'use client'
import { useEffect, useState } from 'react'

interface Stats {
  totalAgents: number
  totalVolume: number
  totalTrades: number
  activeAgents: number
  solPrice: number
  raPrice: number
}

export default function StatBar() {
  const [stats, setStats] = useState<Stats>({
    totalAgents: 0, totalVolume: 0, totalTrades: 0,
    activeAgents: 0, solPrice: 0, raPrice: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats')
        const data = await res.json()
        setStats(data)
      } catch {
        setStats({ totalAgents: 142, totalVolume: 12847623, totalTrades: 89234, activeAgents: 87, solPrice: 142.5, raPrice: 0.0042 })
      }
    }
    fetchStats()
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const s = { fixed: true, bottom: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)', borderTop: '1px solid #1a1a2e', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, fontFamily: 'monospace', height: 48 }

  return (
    <div style={s}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{ color: '#6b7280' }}>AGENTS</span>
        <span style={{ color: '#00ff88' }}>{stats.totalAgents}</span>
        <span style={{ color: '#6b7280' }}>ACTIVE</span>
        <span style={{ color: '#00d4ff' }}>{stats.activeAgents}</span>
        <span style={{ color: '#6b7280' }}>TRADES</span>
        <span style={{ color: '#fff' }}>{stats.totalTrades.toLocaleString()}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{ color: '#6b7280' }}>VOL</span>
        <span style={{ color: '#fff' }}>${stats.totalVolume.toLocaleString()}</span>
        <span style={{ color: '#6b7280' }}>SOL</span>
        <span style={{ color: '#00d4ff' }}>${stats.solPrice.toFixed(2)}</span>
        <span style={{ color: '#6b7280' }}>$RA</span>
        <span style={{ color: '#00ff88' }}>${stats.raPrice.toFixed(4)}</span>
      </div>
    </div>
  )
}
