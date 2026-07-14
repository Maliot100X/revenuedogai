import { CLAWPUMP_API, CLAWPUMP_KEY } from './constants'

const headers = {
  'Authorization': `Bearer ${CLAWPUMP_KEY}`,
  'Content-Type': 'application/json',
}

export interface ClawPumpAgent {
  id: string
  name: string
  description: string
  wallet_address: string
  status: string
  created_at: string
}

export async function createClawPumpAgent(data: {
  name: string
  description: string
  wallet_address: string
}): Promise<ClawPumpAgent | null> {
  try {
    const response = await fetch(`${CLAWPUMP_API}/agents`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

export async function getClawPumpAgent(agentId: string): Promise<ClawPumpAgent | null> {
  try {
    const response = await fetch(`${CLAWPUMP_API}/agents/${agentId}`, { headers })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

export async function listClawPumpAgents(): Promise<ClawPumpAgent[]> {
  try {
    const response = await fetch(`${CLAWPUMP_API}/agents`, { headers })
    if (!response.ok) return []
    const data = await response.json()
    return data.agents || data || []
  } catch {
    return []
  }
}

export async function sendClawPumpMessage(agentId: string, message: string): Promise<unknown> {
  try {
    const response = await fetch(`${CLAWPUMP_API}/agents/${agentId}/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message }),
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

export async function startClawPumpAgent(agentId: string): Promise<boolean> {
  try {
    const response = await fetch(`${CLAWPUMP_API}/agents/${agentId}/start`, {
      method: 'POST',
      headers,
    })
    return response.ok
  } catch {
    return false
  }
}

export async function stopClawPumpAgent(agentId: string): Promise<boolean> {
  try {
    const response = await fetch(`${CLAWPUMP_API}/agents/${agentId}/stop`, {
      method: 'POST',
      headers,
    })
    return response.ok
  } catch {
    return false
  }
}
