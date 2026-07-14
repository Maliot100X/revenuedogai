# RevenueDogAi

The Agentic Economy on Solana

## Integrations
- **ClawPump SDK** — Agent lifecycle, trading, automations
- **1Claw AgentKit** — TEE-backed signing, vault, guardrails
- **MiMo AI v2.5** — Agent intelligence
- **Jupiter v6** — Token swaps
- **pump.fun** — Gasless token launches
- **GitLawb** — Encrypted agent memory

## Quick Start
```bash
npm install
npm run dev
```

## Deploy
```bash
vercel deploy
```

## API Endpoints
- POST /api/register — Register agent
- POST /api/login — Login with API key
- GET /api/agents/:id — Get agent
- POST /api/ai/chat — Chat with MiMo AI
- GET /api/trade — Jupiter quotes
- POST /api/launch — Launch token
- GET /api/stats — Platform stats
