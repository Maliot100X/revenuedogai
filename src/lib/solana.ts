import { Keypair, Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js'
import { SOLANA_RPC } from './constants'

const connection = new Connection(SOLANA_RPC, 'confirmed')

export function generateWallet(): { publicKey: string; secretKey: string } {
  const keypair = Keypair.generate()
  // Convert secret key to base58-like string (array of numbers as string)
  const secretKeyArray = Array.from(keypair.secretKey)
  return {
    publicKey: keypair.publicKey.toString(),
    secretKey: JSON.stringify(secretKeyArray),
  }
}

export function recoverKeypair(secretKeyStr: string): Keypair {
  const secretKeyArray = JSON.parse(secretKeyStr)
  return Keypair.fromSecretKey(new Uint8Array(secretKeyArray))
}

export async function getSolBalance(publicKeyStr: string): Promise<number> {
  try {
    const pubkey = new PublicKey(publicKeyStr)
    const balance = await connection.getBalance(pubkey)
    return balance / LAMPORTS_PER_SOL
  } catch {
    return 0
  }
}

export async function transferSOL(
  fromSecretKey: string,
  toPublicKey: string,
  amountSol: number
): Promise<string> {
  const fromKeypair = recoverKeypair(fromSecretKey)
  const toPubkey = new PublicKey(toPublicKey)

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey,
      lamports: Math.floor(amountSol * LAMPORTS_PER_SOL),
    })
  )

  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()
  transaction.recentBlockhash = blockhash
  transaction.lastValidBlockHeight = lastValidBlockHeight
  transaction.feePayer = fromKeypair.publicKey

  transaction.sign(fromKeypair)
  const signature = await connection.sendRawTransaction(transaction.serialize())
  await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight })
  return signature
}

export { connection, PublicKey, LAMPORTS_PER_SOL }
