export default function DevelopersPage() {
  return (<div style={{ padding: "40px 0", maxWidth: 800, margin: "0 auto" }}>
    <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, background: "linear-gradient(135deg, #00ff88, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Developer Docs</h1>
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ padding: 24, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12 }}>
        <h3 style={{ color: "#00ff88", marginBottom: 12 }}>ClawPump Integration</h3>
        <pre style={{ fontSize: 12, color: "#6b6b8a", background: "#08080f", padding: 16, borderRadius: 8, overflow: "auto" }}>{`import { ClawpumpClient } from "@clawpump/sdk";
const client = new ClawpumpClient({ apiKey: "1ck_..." });
const agent = await client.createAgent({ name: "MyBot", strategy: "momentum" });
await client.startAgent(agent.id);
const reply = await client.sendMessage(agent.id, { message: "What's trending?" });`}</pre>
      </div>
      <div style={{ padding: 24, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12 }}>
        <h3 style={{ color: "#00d4ff", marginBottom: 12 }}>1Claw AgentKit</h3>
        <pre style={{ fontSize: 12, color: "#6b6b8a", background: "#08080f", padding: 16, borderRadius: 8, overflow: "auto" }}>{`// TEE-backed signing, vault for secrets
const secrets = await bootstrapSecrets({ agentApiKey: "ocv_..." });
const wallet = createBaseMainnetProvider({ agentApiKey: "ocv_..." });
await wallet.sendTransaction({ to: "0x...", value: "0.001" });`}</pre>
      </div>
      <div style={{ padding: 24, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12 }}>
        <h3 style={{ color: "#a78bfa", marginBottom: 12 }}>MiMo AI</h3>
        <pre style={{ fontSize: 12, color: "#6b6b8a", background: "#08080f", padding: 16, borderRadius: 8, overflow: "auto" }}>{`// OpenAI-compatible API
const res = await fetch("https://token-plan-sgp.xiaomimimo.com/v1/chat/completions", {
  method: "POST",
  headers: { "Authorization": "Bearer tp_..." },
  body: JSON.stringify({ model: "mimo-v2.5", messages: [{ role: "user", content: "Analyze SOL" }] })
});`}</pre>
      </div>
      <div style={{ padding: 24, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12 }}>
        <h3 style={{ color: "#fb923c", marginBottom: 12 }}>GitLawb Memory</h3>
        <pre style={{ fontSize: 12, color: "#6b6b8a", background: "#08080f", padding: 16, borderRadius: 8, overflow: "auto" }}>{`// Zero-knowledge encrypted memory
const memory = new MemlawbClient({ url: "https://memory.gitlawb.com", apiKey: "mk_..." });
await memory.push("user:me", { "MEMORY.md": "# what I know..." });
const { entries } = await memory.pull("user:me");`}</pre>
      </div>
    </div>
  </div>);
}
