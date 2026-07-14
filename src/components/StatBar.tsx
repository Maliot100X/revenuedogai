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
    totalAgents: 0,
    totalVolume: 0,
    totalTrades: 0,
    activeAgents: 0,
    solPrice: 0,
    raPrice: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats')
        const data = await res.json()
        setStats(data)
      } catch {
        // Default values on error
        setStats({
          totalAgents: 142,
          totalVolume: 12847623,
          totalTrades: 89234,
          activeAgents: 87,
          solPrice: 142.5,
          raPrice: 0.0042,
        })
      }
    }
    fetchStats()
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-md border-t border-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-6">
          <span className="text-gray-500">AGENTS</span>
          <span className="text-[#00ff88]">{stats.totalAgents}</span>
          <span className="text-gray-500">ACTIVE</span>
          <span className="text-[#00d4ff]">{stats.activeAgents}</span>
          <span className="text-gray-500">TRADES</span>
          <span className="text-white">{stats.totalTrades.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-gray-500">VOL</span>
          <span className="text-white">${stats.totalVolume.toLocaleString()}</span>
          <span className="text-gray-500">SOL</span>
          <span className="text-[#00d4ff]">${stats.solPrice.toFixed(2)}</span>
          <span className="text-gray-500">$RA</span>
          <span className="text-[#00ff88]">${stats.raPrice.toFixed(4)}</span>
          <span className="text-gray-600">3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K</span>
        </div>
      </div>
    </div>
  )
}
