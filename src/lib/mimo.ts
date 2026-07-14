import { MIMO_API, MIMO_KEY, MIMO_MODEL } from './constants'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function chatCompletion(
  messages: ChatMessage[],
  options?: { temperature?: number; max_tokens?: number }
): Promise<string> {
  try {
    const response = await fetch(`${MIMO_API}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MIMO_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MIMO_MODEL,
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.max_tokens ?? 2048,
      }),
    })
    const data = await response.json()
    return data.choices?.[0]?.message?.content || ''
  } catch (error) {
    console.error('MiMo API error:', error)
    return ''
  }
}

export async function aiChat(agentName: string, message: string): Promise<string> {
  return chatCompletion([
    { role: 'system', content: `You are ${agentName}, an AI trading agent on Solana. Help with DeFi, tokens, portfolio. Be concise.` },
    { role: 'user', content: message },
  ])
}

export async function generateAgentStrategy(agentName: string, description: string): Promise<string> {
  return chatCompletion([
    { role: 'system', content: 'You are a Solana trading strategy advisor.' },
    { role: 'user', content: `Generate a strategy for "${agentName}": ${description}` },
  ])
}

export async function analyzeMarket(tokenName: string, priceHistory?: string): Promise<string> {
  return chatCompletion([
    { role: 'system', content: 'You are a Solana market analyst.' },
    { role: 'user', content: `Analyze ${tokenName}${priceHistory ? `. History: ${priceHistory}` : ''}` },
  ])
}
