import { MIMO_API, MIMO_KEY, MIMO_MODEL } from './constants'

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ChatCompletionResponse {
  id: string
  choices: Array<{
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export async function chatCompletion(
  messages: ChatMessage[],
  options?: {
    temperature?: number
    max_tokens?: number
    stream?: boolean
  }
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
        stream: options?.stream ?? false,
      }),
    })

    if (!response.ok) {
      throw new Error(`MiMo API error: ${response.status}`)
    }

    const data: ChatCompletionResponse = await response.json()
    return data.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('MiMo API error:', error)
    return ''
  }
}

export async function generateAgentStrategy(agentName: string, description: string): Promise<string> {
  return chatCompletion([
    { role: 'system', content: 'You are a Solana trading strategy advisor for RevenueDogAi. Generate concise, actionable trading strategies.' },
    { role: 'user', content: `Generate a trading strategy for an AI agent named "${agentName}" with description: ${description}. Include: 1) Entry conditions, 2) Exit conditions, 3) Risk management, 4) Token preferences.` },
  ])
}

export async function analyzeMarket(tokenName: string, priceHistory?: string): Promise<string> {
  return chatCompletion([
    { role: 'system', content: 'You are a Solana market analyst for RevenueDogAi. Provide concise market analysis and recommendations.' },
    { role: 'user', content: `Analyze the market for token "${tokenName}"${priceHistory ? `. Price history: ${priceHistory}` : ''}. Provide a brief analysis and trading recommendation.` },
  ])
}

// Convenience wrapper for dashboard chat
export async function aiChat(agentName: string, message: string): Promise<string> {
  const messages = [
    { role: 'system' as const, content: `You are ${agentName}, an AI trading agent on Solana. Help with DeFi, tokens, portfolio. Be concise.` },
    { role: 'user' as const, content: message },
  ];
  const result = await chatCompletion(messages);
  return result.choices?.[0]?.message?.content || 'Error processing request.';
}
