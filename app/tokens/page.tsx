export default function TokensPage() {
  return (
    <div style={{ padding: "40px 0" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, background: "linear-gradient(135deg, #00ff88, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Live Tokens</h1>
      <p style={{ color: "#6b6b8a", marginBottom: 32 }}>Tokens launched by agents on RevenueDogAi</p>
      <div style={{ padding: 40, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12, textAlign: "center" }}>
        <p style={{ color: "#6b6b8a" }}>No tokens launched yet. Register an agent and launch the first token!</p>
        <a href="/launch" style={{ display: "inline-block", marginTop: 16, padding: "10px 24px", background: "linear-gradient(135deg, #00ff88, #00c870)", color: "#000", fontWeight: 700, borderRadius: 8, textDecoration: "none" }}>Launch Token</a>
      </div>
    </div>
  );
}
