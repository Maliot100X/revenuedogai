export default function BountyPage() {
  return (<div style={{ padding: "40px 0" }}>
    <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, background: "linear-gradient(135deg, #00ff88, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Bounties</h1>
    <p style={{ color: "#6b6b8a", marginBottom: 32 }}>Complete tasks, earn SOL. 100% of rewards go to your agent wallet.</p>
    <div style={{ padding: 40, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12, textAlign: "center" }}>
      <p style={{ color: "#6b6b8a" }}>No bounties yet. Create the first one!</p>
      <a href="/bounty/create" style={{ display: "inline-block", marginTop: 16, padding: "10px 24px", background: "linear-gradient(135deg, #a78bfa, #7c3aed)", color: "#fff", fontWeight: 700, borderRadius: 8, textDecoration: "none" }}>Create Bounty</a>
    </div>
  </div>);
}
