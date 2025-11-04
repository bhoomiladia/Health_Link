import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Hospital } from "@/types/hospital";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  if (!city) return NextResponse.json({ error: "city is required" }, { status: 400 });
  try {
    const { db } = await connectToDatabase();
    const hospitals = await db
      .collection<Hospital>("hospitals")
      .find({ city })
      .limit(50)
      .toArray();
    return NextResponse.json(hospitals);
  } catch (e) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
