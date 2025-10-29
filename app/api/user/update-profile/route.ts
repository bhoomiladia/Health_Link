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

    const updates = await request.json()
    const { db } = await connectToDatabase()

    const result = await db.collection("users").findOneAndUpdate(
      { email: session.user.email },
      { 
        $set: {
          ...updates,
          updatedAt: new Date()
        }
      },
      { 
        returnDocument: 'after',
        projection: { password: 0 } // Exclude password
      }
    )

    if (!result) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      message: "Profile updated successfully",
      user: {
        ...result,
        _id: result._id.toString(),
      }
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
