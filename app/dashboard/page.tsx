"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, Clock, MapPin, MessageSquare, Settings, User, Plus } from 'lucide-react'
import Link from "next/link"

interface UserData {
  name: string
  email: string
  profileCompleted: boolean
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
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
      } else {
        // If profile API fails, use session data
        setUser({
          name: session.user?.name || "User",
          email: session.user?.email || "",
          profileCompleted: session.user?.profileCompleted || false
        })
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      // Fallback to session data
      setUser({
        name: session?.user?.name || "User",
        email: session?.user?.email || "",
        profileCompleted: session?.user?.profileCompleted || false
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompleteProfile = () => {
    router.push("/onboarding/medical")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">Loading dashboard...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-2">
            Welcome, {user?.name || "User"}!
          </h1>
          <p className="text-gray-600 text-lg">
            Your healthcare companion for better health management
          </p>
          
          {/* Profile Completion Banner */}
          {!user?.profileCompleted && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-yellow-800">Complete Your Profile</h3>
                  <p className="text-yellow-700 text-sm">
                    Add your medical information for personalized healthcare experience
                  </p>
                </div>
                <Button 
                  onClick={handleCompleteProfile}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Complete Profile
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* AI Symptom Checker */}
          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-primary-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-accent-600" /> 
                AI Symptom Checker
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-gray-600">Get quick insights into your symptoms.</p>
              <Button asChild className="bg-accent-600 hover:bg-accent-700 text-white">
                <Link href="/symptom-checker">Start Check</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Token Management */}
          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-primary-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-600" /> 
                Token Management
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-gray-600">Book tokens and track your queue position.</p>
              <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white">
                <Link href="/token">Manage Tokens</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Nearby Hospitals */}
          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-primary-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary-600" /> 
                Nearby Hospitals
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-gray-600">Find hospitals and clinics near you.</p>
              <Button asChild className="bg-secondary-600 hover:bg-secondary-700 text-white">
                <Link href="/nearby-hospitals">Find Hospitals</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Emergency Tips */}
          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-primary-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" /> 
                Emergency Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-gray-600">Access quick first-aid and emergency advice.</p>
              <Button asChild variant="outline" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                <Link href="/emergency-tips">View Tips</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Profile */}
          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-primary-900 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" /> 
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-gray-600">Update your personal details and medical information.</p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/profile">View Profile</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-primary-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-600" /> 
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-gray-600">Manage app settings and notifications.</p>
              <Button asChild variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                <Link href="/settings">App Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Section (Optional) */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-primary-600">0</div>
            <div className="text-gray-600">Upcoming Appointments</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-primary-600">0</div>
            <div className="text-gray-600">Active Medications</div>
          </Card>
          <Card className="text-center p-6">
            <div className="text-2xl font-bold text-primary-600">
              {user?.profileCompleted ? "Complete" : "Incomplete"}
            </div>
            <div className="text-gray-600">Profile Status</div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}