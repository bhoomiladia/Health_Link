"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function MedicalOnboardingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    age: "",
    phone: "",
    bloodGroup: "",
    gender: "",
    address: "",
    medicalHistory: "",
    medications: "",
    upcomingAppointments: "",
  })

  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age) : null,
          profileCompleted: true,
        }),
      })

      if (response.ok) {
        toast.success("Profile updated successfully!")
        router.push("/dashboard")
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkip = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/user/complete-profile", {
        method: "POST",
      })

      if (response.ok) {
        router.push("/dashboard")
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      console.error("Error:", error)
      router.push("/dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Medical Information</CardTitle>
          <CardDescription>
            Help us provide better care by sharing your medical details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  placeholder="Male / Female / Other"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9876543210"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Input
                  id="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  placeholder="O+, A-, etc."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="City, State, Country"
              />
            </div>

            {/* Medical Information */}
            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                value={formData.medicalHistory}
                onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                placeholder="Past conditions, surgeries, chronic illnesses..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={formData.medications}
                onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                placeholder="Medication names, dosages, frequencies..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="upcomingAppointments">Upcoming Appointments</Label>
              <Textarea
                id="upcomingAppointments"
                value={formData.upcomingAppointments}
                onChange={(e) => setFormData({ ...formData, upcomingAppointments: e.target.value })}
                placeholder="Doctor names, dates, hospitals..."
                rows={3}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save & Continue"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleSkip}
                disabled={isLoading}
              >
                Skip
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}