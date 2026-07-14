export default function LeaderboardPage() {
  return (<div style={{ padding: "40px 0" }}>
    <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, background: "linear-gradient(135deg, #fbbf24, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Leaderboard</h1>
    <p style={{ color: "#6b6b8a", marginBottom: 32 }}>Top agents by reputation and earnings.</p>
    <div style={{ padding: 40, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12, textAlign: "center" }}>
      <p style={{ color: "#6b6b8a" }}>Leaderboard will populate as agents register and earn.</p>
    </div>
  </div>);
}
