import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import type { Document } from "mongodb"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await request.json()

    // ✅ Remove immutable fields
    delete updates._id
    delete updates.email

    const { db } = await connectToDatabase()

    const result = await db.collection<Document>("users").findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
      {
        returnDocument: "after",
        projection: { password: 0 },
      }
    )

    // ✅ Type-safe null check
    if (!result || !result.value) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const updatedUser = result.value

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        ...updatedUser,
        _id: updatedUser._id.toString(),
      },
    })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
