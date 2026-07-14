import { PUMPFUN_API } from './constants'

export interface PumpFunToken {
  name: string
  ticker: string
  description: string
  image_url?: string
  website?: string
  telegram?: string
  twitter?: string
}

export interface PumpFunResponse {
  success: boolean
  mint?: string
  tx?: string
  error?: string
}

export async function launchPumpFunToken(
  token: PumpFunToken,
  privateKey: string
): Promise<PumpFunResponse> {
  try {
    // Step 1: Generate keypair from private key
    const { Keypair } = await import('@solana/web3.js')

    const secretKeyArray = JSON.parse(privateKey)
    const keypair = Keypair.fromSecretKey(new Uint8Array(secretKeyArray))

    // Step 2: Create token using pump.fun portal API
    const response = await fetch(`${PUMPFUN_API}/trade-local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        publicKey: keypair.publicKey.toString(),
        action: 'create',
        tokenMetadata: {
          name: token.name,
          symbol: token.ticker,
          description: token.description,
          file: token.image_url || '',
          website: token.website || '',
          telegram: token.telegram || '',
          twitter: token.twitter || '',
        },
        mint: keypair.publicKey.toString(),
        denominatedInSol: 'true',
        amount: 1, // 1 SOL initial buy
        slippage: 10,
        priorityFee: 0.0005,
        pool: 'pump',
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      return { success: false, error: errText }
    }

    const data = await response.json()

    // Step 3: Sign and send transaction
    const { Connection, Transaction } = await import('@solana/web3.js')
    const { SOLANA_RPC } = await import('./constants')
    const connection = new Connection(SOLANA_RPC, 'confirmed')

    if (data.tx) {
      const txBuf = Buffer.from(data.tx, 'base64')
      const transaction = Transaction.from(txBuf)
      transaction.sign(keypair)

      const signature = await connection.sendRawTransaction(transaction.serialize())
      await connection.confirmTransaction(signature)

      return { success: true, mint: data.mint, tx: signature }
    }

    return { success: false, error: 'No transaction returned' }
  } catch (error) {
    return { success: false, error: String(error) }
  }
}

export async function getPumpFunTokenInfo(mintAddress: string): Promise<unknown> {
  try {
    const response = await fetch(`${PUMPFUN_API}/token/${mintAddress}`)
    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}
