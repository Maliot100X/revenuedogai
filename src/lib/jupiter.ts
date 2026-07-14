import { JUPITER_API } from './constants'

export interface SwapQuote {
  inputMint: string
  outputMint: string
  amount: number
  slippageBps?: number
}

export interface QuoteResponse {
  inputMint: string
  outputMint: string
  inAmount: string
  outAmount: string
  otherAmountThreshold: string
  swapMode: string
  slippageBps: number
  priceImpactPct: number
  routePlan: unknown[]
}

export async function getSwapQuote(params: SwapQuote): Promise<QuoteResponse | null> {
  try {
    const { inputMint, outputMint, amount, slippageBps = 50 } = params
    const url = `${JUPITER_API}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`
    const response = await fetch(url)
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

export async function getSwapTransaction(
  quoteResponse: QuoteResponse,
  userPublicKey: string
): Promise<{ swapTransaction: string } | null> {
  try {
    const response = await fetch(`${JUPITER_API}/swap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quoteResponse,
        userPublicKey,
        wrapAndUnwrapSol: true,
        dynamicComputeUnitLimit: true,
        prioritizationFeeLamports: 'auto',
      }),
    })
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

// Well-known token mints
export const TOKEN_MINTS = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  WIF: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
  RA: '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K',
}
