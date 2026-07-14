import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
export async function GET() {
  try {
    const agents = await sql`SELECT agent_id, name, reputation, total_earned FROM agents ORDER BY reputation DESC LIMIT 50`;
    return NextResponse.json({ agents });
  } catch { return NextResponse.json({ agents: [] }); }
}
