import { NextResponse } from "next/server";
export async function GET() { return NextResponse.json({ collected: true }); }
export async function POST() { return NextResponse.json({ collected: true }); }
