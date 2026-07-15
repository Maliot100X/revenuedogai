import dotenv from 'dotenv';
dotenv.config();

export const config = {
  // 1Claw API (agent security, vault, guardrails)
  oneclaw: {
    apiKey: process.env.ONECLAW_API_KEY || '1ck_mplQ9ec29q976-l6Nkv1S03sbErnNHrWlzfCfBfgVLg',
    apiUrl: 'https://api.1claw.xyz/v1',
  },
  // ClawPump API (agent lifecycle, trading, market intelligence)
  clawpump: {
    apiKey: process.env.CLAWPUMP_API_KEY || '',
    apiUrl: 'https://agents.clawpump.tech/api/v1',
  },
  // GitLawb Memlawb (zero-knowledge memory)
  memlawb: {
    url: process.env.MEMLAWB_URL || 'https://memory.gitlawb.com',
    apiKey: process.env.MEMLAWB_API_KEY || '',
    passphrase: process.env.MEMLAWB_PASSPHRASE || '',
  },
  // Solana
  solana: {
    rpc: process.env.SOLANA_RPC || 'https://api.mainnet-beta.solana.com',
  },
  // Branding
  branding: {
    name: 'RevenueDogAi',
    ticker: '$RA',
    contract: '3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K',
  },
};
