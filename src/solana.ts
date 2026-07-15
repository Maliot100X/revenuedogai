import { Connection, PublicKey } from '@solana/web3.js';
import { config } from './config';

const connection = new Connection(config.solana.rpc, 'confirmed');

export async function getBalance(address: string): Promise<number> {
  const pubkey = new PublicKey(address);
  const lamports = await connection.getBalance(pubkey);
  return lamports / 1e9;
}

export async function getTokenBalance(wallet: string, mint: string): Promise<number> {
  const pubkey = new PublicKey(wallet);
  const mintPubkey = new PublicKey(mint);
  const accounts = await connection.getParsedTokenAccountsByOwner(pubkey, { mint: mintPubkey });
  if (accounts.value.length > 0) {
    return accounts.value[0].account.data.parsed.info.tokenAmount.uiAmount || 0;
  }
  return 0;
}
