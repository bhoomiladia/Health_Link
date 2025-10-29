import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { db } = await connectToDatabase();

    const user = await db.collection("users").findOne({ email: session.user.email });

    if (!user) {
      console.log("User not found in DB:", session.user.email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Remove sensitive info if needed
    delete user.password;

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in /api/user/profile:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
