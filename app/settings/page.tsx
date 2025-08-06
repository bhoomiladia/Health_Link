"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function SettingsPage() {
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [appNotifications, setAppNotifications] = useState(true)
  const [preferredLanguage, setPreferredLanguage] = useState("english")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-primary-900 mb-8">Settings & Profile</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Personal Details */}
          <Card className="border-primary-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-900">Personal Details</CardTitle>
              <CardDescription className="text-gray-600">Update your account information.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                  <Input id="name" type="text" defaultValue="John Doe" className="border-primary-200 focus:border-primary-500" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" className="border-primary-200 focus:border-primary-500" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+91 9876543210" className="border-primary-200 focus:border-primary-500" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="age" className="text-gray-700">Age</Label>
                  <Input id="age" type="number" defaultValue="30" className="border-primary-200 focus:border-primary-500" />
                </div>
                <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg">Save Changes</Button>
              </form>
            </CardContent>
          </Card>

          {/* Preferences & Notifications */}
          <div className="space-y-8">
            <Card className="border-primary-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-900">Preferences</CardTitle>
                <CardDescription className="text-gray-600">Manage your app preferences.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="preferred-language" className="text-gray-700">Preferred Language</Label>
                  <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                    <SelectTrigger id="preferred-language" className="border-primary-200 focus:ring-primary-500">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="telugu">Telugu</SelectItem>
                      <SelectItem value="marathi">Marathi</SelectItem>
                      <SelectItem value="gujarati">Gujarati</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg">Save Preferences</Button>
              </CardContent>
            </Card>

            <Card className="border-primary-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-primary-900">Notifications</CardTitle>
                <CardDescription className="text-gray-600">Control how you receive updates.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-notifications" className="text-gray-700">SMS Notifications</Label>
                  <Switch
                    id="sms-notifications"
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                    className="data-[state=checked]:bg-accent-600"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="app-notifications" className="text-gray-700">In-App Notifications</Label>
                  <Switch
                    id="app-notifications"
                    checked={appNotifications}
                    onCheckedChange={setAppNotifications}
                    className="data-[state=checked]:bg-accent-600"
                  />
                </div>
                <Button className="bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg">Save Notification Settings</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
