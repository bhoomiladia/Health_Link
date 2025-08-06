"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from "react"

export default function TokenPage() {
  const [tokenGenerated, setTokenGenerated] = useState(false)
  const [tokenNumber, setTokenNumber] = useState("")
  const [waitTime, setWaitTime] = useState("")

  const handleGenerateToken = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate token generation
    const randomToken = `A-${Math.floor(Math.random() * 100) + 1}`
    const randomWaitTime = `${Math.floor(Math.random() * 30) + 5} minutes`
    setTokenNumber(randomToken)
    setWaitTime(randomWaitTime)
    setTokenGenerated(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary-900 mb-8">Token Management System</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Token Generation Form */}
          <Card className="border-primary-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-900">Book Your Token</CardTitle>
              <CardDescription className="text-gray-600">
                Select your hospital and describe your symptoms to get a token.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerateToken} className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="hospital" className="text-gray-700">Choose Hospital/Clinic</Label>
                  <Select required>
                    <SelectTrigger id="hospital" className="border-primary-200 focus:ring-primary-500">
                      <SelectValue placeholder="Select a hospital or clinic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="city-general">City General Hospital</SelectItem>
                      <SelectItem value="family-care">Family Care Clinic</SelectItem>
                      <SelectItem value="metro-health">Metro Health Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="symptoms" className="text-gray-700">Briefly Describe Symptoms</Label>
                  <Textarea id="symptoms" placeholder="e.g., Fever and body aches for 2 days" required className="border-primary-200 focus:border-primary-500" />
                </div>
                <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg">
                  Generate Token
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Token Status Display */}
          <Card className="border-primary-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-900 flex items-center gap-2">
                <Clock className="w-6 h-6" /> Your Current Token Status
              </CardTitle>
              <CardDescription className="text-gray-600">
                Real-time updates on your queue position and estimated wait time.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {tokenGenerated ? (
                <>
                  <div className="text-center">
                    <p className="text-gray-600 text-lg mb-2">Your Token Number:</p>
                    <div className="text-6xl font-bold text-primary-600 mb-4">{tokenNumber}</div>
                    <Badge className="bg-accent-100 text-accent-800 text-base px-4 py-2">Active</Badge>
                  </div>

                  <div className="space-y-3 text-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Clinic:</span>
                      <span className="font-medium text-primary-900">City General Hospital</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Current Token:</span>
                      <span className="font-medium text-primary-900">A-43</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Estimated Wait:</span>
                      <span className="font-medium text-secondary-600">{waitTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Queue Position:</span>
                      <span className="font-medium text-primary-900">4th in line</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-accent-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>SMS notifications enabled</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-primary-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>We&apos;ll notify you 5 minutes before your turn</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button className="bg-primary-600 hover:bg-primary-700 text-white">Reschedule</Button>
                    <Button variant="outline" className="border-destructive-200 text-destructive-600 hover:bg-destructive-50">
                      Cancel Token
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-600 py-12">
                  <p>Generate a token using the form on the left to see your status here.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
