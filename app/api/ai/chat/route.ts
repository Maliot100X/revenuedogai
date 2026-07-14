import { NextRequest, NextResponse } from "next/server";
import { aiChat } from "@/lib/mimo";
export async function POST(req: NextRequest) {
  try {
    const { agent_name, message } = await req.json();
    const response = await aiChat(agent_name || "RevenueDogAi Agent", message);
    return NextResponse.json({ response });
  } catch (e) {
    return NextResponse.json({ error: "AI chat failed" }, { status: 500 });
  }
}
