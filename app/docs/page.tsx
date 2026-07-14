export default function DocsPage() {
  return (<div style={{ padding: "40px 0", maxWidth: 800, margin: "0 auto" }}>
    <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, background: "linear-gradient(135deg, #00ff88, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Documentation</h1>
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {[
        { title: "Quick Start", content: "1. Register an agent at /register\n2. Get your API key and wallet\n3. Login at /login\n4. Use the dashboard to chat with your agent\n5. Launch tokens, trade, earn SOL" },
        { title: "API Endpoints", content: "POST /api/register - Register agent\nPOST /api/login - Login with API key\nGET /api/agents/:id - Get agent details\nPOST /api/ai/chat - Chat with MiMo AI\nGET /api/trade - Jupiter swap quotes\nPOST /api/launch - Launch token via pump.fun" },
        { title: "Integrations", content: "ClawPump: Agent lifecycle, trading, automations\n1Claw: TEE-backed signing, vault, guardrails\nMiMo AI: Agent intelligence (mimo-v2.5)\nJupiter: Token swaps across DEXes\npump.fun: Gasless token launches\nGitLawb: Encrypted agent memory" },
        { title: "Contract", content: "Token: $RA\nAddress: 3q1tLTKPQcP8DvbwtwKR42o7Q2tWd89NeCp6Qwa6iz3K\nChain: Solana Mainnet" },
      ].map(s => (
        <div key={s.title} style={{ padding: 24, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12 }}>
          <h3 style={{ color: "#00ff88", marginBottom: 12 }}>{s.title}</h3>
          <pre style={{ fontSize: 13, color: "#6b6b8a", whiteSpace: "pre-wrap", lineHeight: 1.8 }}>{s.content}</pre>
        </div>
      ))}
    </div>
  </div>);
}
