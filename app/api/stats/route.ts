import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
export async function GET() {
  try {
    const [agents] = await sql`SELECT COUNT(*) as count FROM agents`;
    const [tokens] = await sql`SELECT COUNT(*) as count FROM tokens WHERE status = 'live'`;
    return NextResponse.json({ agents: Number(agents.count), tokens: Number(tokens.count) });
  } catch { return NextResponse.json({ agents: 0, tokens: 0 }); }
}
