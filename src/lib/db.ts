import { neon } from '@neondatabase/serverless'

let sql: any = null

function getSql() {
  if (!sql) {
    const url = process.env.DATABASE_URL || ''
    if (url) {
      sql = neon(url)
    }
  }
  return sql
}

export async function query(text: string, params?: unknown[]) {
  const s = getSql()
  if (!s) throw new Error('DATABASE_URL not configured')
  const result = await s(text, params)
  return result
}

export async function initDB() {
  const s = getSql()
  if (!s) throw new Error('DATABASE_URL not configured')
  await s`
    CREATE TABLE IF NOT EXISTS agents (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      ticker TEXT DEFAULT '$RA',
      wallet_address TEXT NOT NULL,
      private_key TEXT NOT NULL,
      api_key TEXT UNIQUE NOT NULL,
      description TEXT DEFAULT '',
      avatar_url TEXT DEFAULT '',
      strategy TEXT DEFAULT '',
      status TEXT DEFAULT 'active',
      pnl_total REAL DEFAULT 0,
      pnl_24h REAL DEFAULT 0,
      trade_count INTEGER DEFAULT 0,
      win_rate REAL DEFAULT 0,
      balance REAL DEFAULT 0,
      sol_balance REAL DEFAULT 0,
      bounty_count INTEGER DEFAULT 0,
      task_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `
  await s`
    CREATE TABLE IF NOT EXISTS tokens (
      id TEXT PRIMARY KEY,
      agent_id TEXT REFERENCES agents(id),
      name TEXT NOT NULL,
      ticker TEXT NOT NULL,
      contract_address TEXT,
      mint_address TEXT,
      description TEXT DEFAULT '',
      initial_supply REAL DEFAULT 1000000,
      price REAL DEFAULT 0,
      market_cap REAL DEFAULT 0,
      volume_24h REAL DEFAULT 0,
      holders INTEGER DEFAULT 0,
      status TEXT DEFAULT 'pending',
      launched_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
  await s`
    CREATE TABLE IF NOT EXISTS bounties (
      id TEXT PRIMARY KEY,
      creator_id TEXT REFERENCES agents(id),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      reward_sol REAL NOT NULL,
      reward_token TEXT DEFAULT '',
      status TEXT DEFAULT 'open',
      claimer_id TEXT,
      winner_id TEXT,
      submission_url TEXT DEFAULT '',
      deadline TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `
  await s`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      creator_id TEXT REFERENCES agents(id),
      agent_id TEXT REFERENCES agents(id),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      reward_sol REAL NOT NULL,
      status TEXT DEFAULT 'open',
      claimer_id TEXT,
      submission_url TEXT DEFAULT '',
      deadline TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    )
  `
  await s`
    CREATE TABLE IF NOT EXISTS trades (
      id TEXT PRIMARY KEY,
      agent_id TEXT REFERENCES agents(id),
      input_mint TEXT NOT NULL,
      output_mint TEXT NOT NULL,
      input_amount REAL NOT NULL,
      output_amount REAL NOT NULL,
      price REAL DEFAULT 0,
      pnl REAL DEFAULT 0,
      status TEXT DEFAULT 'completed',
      tx_signature TEXT DEFAULT '',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `
}
