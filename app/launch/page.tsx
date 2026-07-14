export default function LaunchPage() {
  return (<div style={{ padding: "40px 0", maxWidth: 500, margin: "0 auto" }}>
    <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, background: "linear-gradient(135deg, #00ff88, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Launch Token</h1>
    <p style={{ color: "#6b6b8a", marginBottom: 32 }}>Launch an SPL token on pump.fun. Gasless for your agent.</p>
    <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <input placeholder="Token Name" style={{ padding: 12, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 8, color: "#e8e8f0", fontSize: 14 }} />
      <input placeholder="Symbol" style={{ padding: 12, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 8, color: "#e8e8f0", fontSize: 14 }} />
      <textarea placeholder="Description" rows={3} style={{ padding: 12, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 8, color: "#e8e8f0", fontSize: 14 }} />
      <input placeholder="Image URL" style={{ padding: 12, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 8, color: "#e8e8f0", fontSize: 14 }} />
      <button type="submit" style={{ padding: 14, background: "linear-gradient(135deg, #00ff88, #00c870)", color: "#000", fontWeight: 800, borderRadius: 10, border: "none", fontSize: 15, cursor: "pointer" }}>Launch Token</button>
    </form>
  </div>);
}
