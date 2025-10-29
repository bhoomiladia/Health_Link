import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()

    await db.collection("users").updateOne(
      { email: session.user.email },
      { 
        $set: {
          profileCompleted: true,
          updatedAt: new Date()
        }
      }
    )

    return NextResponse.json({ message: "Profile completed" })
  } catch (error) {
    console.error("Complete profile error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}