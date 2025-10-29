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
  _id?: string
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
      setIsLoading(true)
      const response = await fetch("/api/user/profile")
      if (!response.ok) throw new Error("Failed to fetch user data")
      const userData = await response.json()
      setUser(userData)
      setEditData(userData)
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
      });
  
      if (!response.ok) throw new Error("Failed to update profile");
  
      const result = await response.json();
  
      // ✅ Immediately update state with latest data
      setUser(result.user);
      setEditData(result.user);
      setIsEditing(false);
  
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };
  

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
          <p className="text-gray-600">Loading your profile...</p>
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
          <p className="text-gray-600">Unable to load your profile.</p>
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
          <h1 className="text-3xl font-bold text-primary">My Profile</h1>
          {!isEditing ? (
            <div className="flex gap-2">
              {!user.profileCompleted && (
                <Button onClick={handleAddMedicalInfo} variant="outline">
                  Complete Medical Info
                </Button>
              )}
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleCancel} variant="outline">Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
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

          {/* PERSONAL INFO */}
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { id: "name", label: "Full Name", type: "text" },
                      { id: "age", label: "Age", type: "number" },
                      { id: "gender", label: "Gender", type: "text" },
                      { id: "bloodGroup", label: "Blood Group", type: "text" },
                      { id: "phone", label: "Phone", type: "text" },
                      { id: "address", label: "Address", type: "text", full: true },
                    ].map((field) => (
                      <div
                        key={field.id}
                        className={`space-y-2 ${field.full ? "md:col-span-2" : ""}`}
                      >
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Input
                          id={field.id}
                          type={field.type}
                          value={(editData as any)[field.id] || ""}
                          onChange={(e) =>
                            setEditData({ ...editData, [field.id]: e.target.value })
                          }
                        />
                      </div>
                    ))}
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

          {/* MEDICAL HISTORY */}
          <TabsContent value="medical">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editData.medicalHistory || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, medicalHistory: e.target.value })
                    }
                    placeholder="Past conditions, surgeries, chronic illnesses..."
                    rows={4}
                  />
                ) : (
                  <p>{user.medicalHistory || "No medical history provided yet."}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* APPOINTMENTS */}
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editData.upcomingAppointments || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, upcomingAppointments: e.target.value })
                    }
                    placeholder="Doctor names, dates, hospitals..."
                    rows={4}
                  />
                ) : (
                  <p>{user.upcomingAppointments || "No upcoming appointments."}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* MEDICATIONS */}
          <TabsContent value="medications">
            <Card>
              <CardHeader>
                <CardTitle>Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editData.medications || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, medications: e.target.value })
                    }
                    placeholder="Medication names, dosages, frequencies..."
                    rows={4}
                  />
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
