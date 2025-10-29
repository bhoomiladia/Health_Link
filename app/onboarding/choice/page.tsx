"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OnboardingChoicePage() {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()

  const handleChoice = async (addMedicalInfo: boolean) => {
    setIsLoading(true)
    
    try {
      if (addMedicalInfo) {
        // Redirect to medical info onboarding
        router.push("/onboarding/medical")
      } else {
        // Update user profile as completed and go to dashboard
        const response = await fetch("/api/user/complete-profile", {
          method: "POST",
        })

        if (response.ok) {
          router.push("/dashboard")
        } else {
          throw new Error("Failed to update profile")
        }
      }
    } catch (error) {
      console.error("Error:", error)
      router.push("/dashboard") // Fallback to dashboard
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to HealthLink!</CardTitle>
          <CardDescription>
            Would you like to add your medical information now?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Button
              onClick={() => handleChoice(true)}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              Yes, Add Medical Info
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Provide your medical history, medications, and appointments for better care
            </p>
          </div>

          <div className="space-y-2">
            <Button
              onClick={() => handleChoice(false)}
              disabled={isLoading}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Skip for Now
            </Button>
            <p className="text-sm text-gray-600 text-center">
              You can always add this information later from your profile
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}