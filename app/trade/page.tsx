"use client";
import { useState } from "react";
export default function TradePage() {
  const [amount, setAmount] = useState(""); const [result, setResult] = useState<any>(null); const [loading, setLoading] = useState(false);
  async function getQuote() {
    setLoading(true);
    const r = await fetch(`/api/trade?input=So11111111111111111111111111111111111111112&output=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=${Number(amount) * 1e9}`);
    const data = await r.json(); setResult(data); setLoading(false);
  }
  return (
    <div style={{ padding: "40px 0", maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, background: "linear-gradient(135deg, #00ff88, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Trade</h1>
      <p style={{ color: "#6b6b8a", marginBottom: 32 }}>Swap tokens via Jupiter v6</p>
      <div style={{ padding: 24, background: "#0d0d1a", border: "1px solid #1e1e3a", borderRadius: 12 }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: "#6b6b8a" }}>SOL Amount</label>
          <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.1" style={{ width: "100%", padding: 12, background: "#08080f", border: "1px solid #1e1e3a", borderRadius: 8, color: "#e8e8f0", fontSize: 16, marginTop: 4 }} />
        </div>
        <button onClick={getQuote} disabled={loading || !amount} style={{ width: "100%", padding: 14, background: "linear-gradient(135deg, #00ff88, #00c870)", color: "#000", fontWeight: 800, borderRadius: 10, border: "none", fontSize: 15, cursor: "pointer" }}>{loading ? "Getting Quote..." : "Get Quote"}</button>
        {result && (
          <div style={{ marginTop: 16, padding: 16, background: "#08080f", borderRadius: 8, fontSize: 13 }}>
            <p style={{ color: "#00ff88" }}>Output: {(Number(result.outAmount) / 1e6).toFixed(2)} USDC</p>
            <p style={{ color: "#6b6b8a" }}>Price Impact: {result.priceImpactPct}%</p>
            <p style={{ color: "#6b6b8a" }}>Route: {result.routePlan?.map((r: any) => r.swapInfo?.label).filter(Boolean).join(" → ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
