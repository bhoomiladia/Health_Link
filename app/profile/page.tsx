"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { toast } from "sonner"

interface User {
  name: string
  email: string
  phone?: string
  age?: number
  gender?: string
  bloodGroup?: string
  address?: string
  medicalHistory?: string
  medications?: string
  upcomingAppointments?: string
  profileCompleted: boolean
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<Partial<User>>({})
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    
    if (!session) {
      router.push("/login")
      return
    }
    
    fetchUserData()
  }, [session, status, router])

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/profile")
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
        setEditData(userData)
      } else {
        throw new Error("Failed to fetch user data")
      }
    } catch (error) {
      toast.error("Failed to load profile data")
      console.error("Error fetching user data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const response = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setUser(updatedUser.user || { ...user, ...editData })
        setIsEditing(false)
        toast.success("Profile updated successfully!")
        // Refresh the data
        fetchUserData()
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      toast.error("Failed to update profile")
      console.error("Error updating profile:", error)
    }
  }

  const handleCancel = () => {
    setEditData(user || {})
    setIsEditing(false)
  }

  const handleAddMedicalInfo = () => {
    router.push("/onboarding/medical")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Failed to load profile data</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-10 px-6 container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary-900">My Profile</h1>
          {!isEditing ? (
            <div className="flex gap-2">
              {!user.profileCompleted && (
                <Button onClick={handleAddMedicalInfo} variant="outline">
                  Complete Medical Info
                </Button>
              )}
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleCancel} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full sm:w-auto mx-auto">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={editData.name || ""}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={editData.age || ""}
                        onChange={(e) => setEditData({ ...editData, age: parseInt(e.target.value) || undefined })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Input
                        id="gender"
                        value={editData.gender || ""}
                        onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                        placeholder="Male / Female / Other"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bloodGroup">Blood Group</Label>
                      <Input
                        id="bloodGroup"
                        value={editData.bloodGroup || ""}
                        onChange={(e) => setEditData({ ...editData, bloodGroup: e.target.value })}
                        placeholder="O+, A-, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={editData.phone || ""}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={editData.address || ""}
                        onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                        placeholder="City, State, Country"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
                    <p><strong>Age:</strong> {user.age || "Not provided"}</p>
                    <p><strong>Gender:</strong> {user.gender || "Not provided"}</p>
                    <p><strong>Blood Group:</strong> {user.bloodGroup || "Not provided"}</p>
                    <p><strong>Address:</strong> {user.address || "Not provided"}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical History Tab */}
          <TabsContent value="medical">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="medicalHistory">Medical History</Label>
                    <Textarea
                      id="medicalHistory"
                      value={editData.medicalHistory || ""}
                      onChange={(e) => setEditData({ ...editData, medicalHistory: e.target.value })}
                      placeholder="Past conditions, surgeries, chronic illnesses..."
                      rows={4}
                    />
                  </div>
                ) : (
                  <p>{user.medicalHistory || "No medical history provided yet."}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="upcomingAppointments">Upcoming Appointments</Label>
                    <Textarea
                      id="upcomingAppointments"
                      value={editData.upcomingAppointments || ""}
                      onChange={(e) => setEditData({ ...editData, upcomingAppointments: e.target.value })}
                      placeholder="Doctor names, dates, hospitals..."
                      rows={4}
                    />
                  </div>
                ) : (
                  <p>{user.upcomingAppointments || "No upcoming appointments scheduled."}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medications Tab */}
          <TabsContent value="medications">
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="medications">Current Medications</Label>
                    <Textarea
                      id="medications"
                      value={editData.medications || ""}
                      onChange={(e) => setEditData({ ...editData, medications: e.target.value })}
                      placeholder="Medication names, dosages, frequencies..."
                      rows={4}
                    />
                  </div>
                ) : (
                  <p>{user.medications || "No medications listed."}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}