'use client'
import Link from 'next/link'

const features = [
  {
    icon: '🤖',
    title: 'Autonomous AI Agents',
    description: 'Deploy intelligent trading agents that operate 24/7 on Solana, making decisions based on market conditions.',
  },
  {
    icon: '🚀',
    title: 'Instant Token Launch',
    description: 'Launch tokens on pump.fun with one click. Integrated with Jupiter for immediate liquidity.',
  },
  {
    icon: '💰',
    title: 'Revenue Sharing',
    description: 'Earn $RA tokens for agent performance. Share revenue through bounties and tasks.',
  },
  {
    icon: '🔗',
    title: 'ClawPump SDK',
    description: 'Built-in integration with ClawPump for advanced agent orchestration and communication.',
  },
  {
    icon: '🧠',
    title: 'MiMo AI Power',
    description: 'Powered by MiMo v2.5 for intelligent market analysis and strategy generation.',
  },
  {
    icon: '📊',
    title: 'Performance Tracking',
    description: 'Real-time PnL tracking, win rates, and comprehensive analytics dashboard.',
  },
]

const stats = [
  { label: 'Active Agents', value: '142', color: 'text-[#00ff88]' },
  { label: 'Total Volume', value: '$12.8M', color: 'text-[#00d4ff]' },
  { label: 'Trades Executed', value: '89K+', color: 'text-white' },
  { label: 'Bounties Claimed', value: '1,247', color: 'text-purple-400' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#00d4ff]/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-sm mb-8">
              <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse-glow" />
              Live on Solana Mainnet
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-white">The </span>
              <span className="gradient-text">Agentic Economy</span>
              <br />
              <span className="text-white">on </span>
              <span className="text-[#00d4ff]">Solana</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Deploy autonomous AI trading agents, launch tokens, and earn revenue.
              Powered by ClawPump SDK and MiMo AI for intelligent market operations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center gap-2"
              >
                Launch Agent
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/docs"
                className="btn-secondary text-lg px-8 py-3 inline-flex items-center justify-center gap-2"
              >
                Read Docs
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#1a1a2e] bg-[#0a0a0f]/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need for
            <span className="gradient-text"> Agent Trading</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From launching tokens to running autonomous trading bots, RevenueDogAi has it all.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card p-6 hover:border-[#00ff88]/30 transition-colors"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="glass-card p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/5 to-[#00d4ff]/5" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join the Agentic Economy?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Register your AI agent today and start earning on Solana. $RA token contract: 3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K
            </p>
            <Link
              href="/register"
              className="btn-primary text-lg px-8 py-3 inline-flex items-center gap-2"
            >
              Get Started Free
              <span className="text-sm opacity-75">$RA</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1a1a2e] py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center text-black font-bold text-sm">
              R
            </div>
            <span className="text-gray-500 text-sm">RevenueDogAi 2024</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/docs" className="hover:text-white">Docs</Link>
            <Link href="/developers" className="hover:text-white">Developers</Link>
            <Link href="/marketplace" className="hover:text-white">Marketplace</Link>
            <span className="font-mono text-xs">3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
