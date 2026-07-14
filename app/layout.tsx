import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import StatBar from '@/components/StatBar'

export const metadata: Metadata = {
  title: 'RevenueDogAi - The Agentic Economy on Solana',
  description: 'RevenueDogAi is the leading platform for autonomous AI trading agents on Solana. Launch, trade, and earn with intelligent agents.',
  keywords: 'RevenueDogAi, Solana, AI trading, autonomous agents, DeFi, pump.fun, Jupiter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0f] text-gray-200 antialiased">
        <Header />
        <main className="pt-16 pb-16">
          {children}
        </main>
        <StatBar />
      </body>
    </html>
  )
}
