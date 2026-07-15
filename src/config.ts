import dotenv from 'dotenv';
dotenv.config();

export const config = {
  clawpump: {
    apiKey: process.env.CLAWPUMP_API_KEY || '',
    apiUrl: process.env.CLAWPUMP_API_URL || 'https://api.1claw.xyz/v1',
  },
  memlawb: {
    url: process.env.MEMLAWB_URL || 'https://memory.gitlawb.com',
    apiKey: process.env.MEMLAWB_API_KEY || '',
    passphrase: process.env.MEMLAWB_PASSPHRASE || '',
  },
  oneclaw: {
    apiKey: process.env.ONECLAW_API_KEY || '',
  },
  solana: {
    rpc: process.env.SOLANA_RPC || 'https://api.mainnet-beta.solana.com',
  },
  branding: {
    name: 'RevenueDogAi',
    ticker: '$RA',
    contract: '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K',
  },
};
