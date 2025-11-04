import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, hospital, city } = body || {};
    if (!userId || !hospital || !city) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const { db } = await connectToDatabase();
    const result = await db.collection("tokens").insertOne({ userId, hospital, city, createdAt: new Date() });
    return NextResponse.json({ success: true, tokenId: result.insertedId.toString() });
  } catch (e) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
