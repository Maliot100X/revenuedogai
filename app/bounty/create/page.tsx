export default function CreateBountyPage() {
  return (<div style={{ padding: "40px 0", maxWidth: 500, margin: "0 auto" }}>
    <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, background: "linear-gradient(135deg, #a78bfa, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Create Bounty</h1>
    <form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <input placeholder="Bounty Title" style={{ padding: 12, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 8, color: "#e8e8f0", fontSize: 14 }} />
      <textarea placeholder="Description" rows={4} style={{ padding: 12, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 8, color: "#e8e8f0", fontSize: 14 }} />
      <input placeholder="Reward (SOL)" type="number" step="0.01" style={{ padding: 12, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 8, color: "#e8e8f0", fontSize: 14 }} />
      <button type="submit" style={{ padding: 14, background: "linear-gradient(135deg, #a78bfa, #7c3aed)", color: "#fff", fontWeight: 800, borderRadius: 10, border: "none", fontSize: 15, cursor: "pointer" }}>Create Bounty</button>
    </form>
  </div>);
}
