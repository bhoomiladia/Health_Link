import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, Clock, MapPin, MessageSquare, Settings, User } from 'lucide-react'
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary-900 mb-8">Welcome, John Doe!</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-primary-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-accent-600" /> AI Symptom Checker
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-gray-600">Get quick insights into your symptoms.</p>
              <Button asChild className="bg-accent-600 hover:bg-accent-700 text-white">
                <Link href="/symptom-checker">Start Check</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-primary-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-600" /> Token Management
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-gray-600">Book tokens and track your queue position.</p>
              <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white">
                <Link href="/token">Manage Tokens</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-primary-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary-600" /> Nearby Hospitals
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-gray-600">Find hospitals and clinics near you.</p>
              <Button asChild className="bg-secondary-600 hover:bg-secondary-700 text-white">
                <Link href="/nearby-hospitals">Find Hospitals</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-primary-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" /> Emergency Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-gray-600">Access quick first-aid and emergency advice.</p>
              <Button asChild variant="outline" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                <Link href="#">View Tips</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-primary-900 flex items-center gap-2">
                <User className="w-5 h-5 text-gray-600" /> Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <p className="text-gray-600">Update your personal details and preferences.</p>
              <Button asChild variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                <Link href="/settings">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-primary-200 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl text-primary-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-600" /> Settings
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
      </main>
      <Footer />
    </div>
  )
}
