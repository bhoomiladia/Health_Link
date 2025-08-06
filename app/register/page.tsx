import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-lg border-primary-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary-900">Join HealthLink</CardTitle>
            <CardDescription className="text-gray-600">Create your account for faster, smarter care.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" required className="border-primary-200 focus:border-primary-500" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="age" className="text-gray-700">Age</Label>
                  <Input id="age" type="number" placeholder="e.g., 30" required className="border-primary-200 focus:border-primary-500" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+91 9876543210" required className="border-primary-200 focus:border-primary-500" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language" className="text-gray-700">Preferred Language</Label>
                <Select>
                  <SelectTrigger id="language" className="border-primary-200 focus:ring-primary-500">
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
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input id="password" type="password" required className="border-primary-200 focus:border-primary-500" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password" className="text-gray-700">Confirm Password</Label>
                <Input id="confirm-password" type="password" required className="border-primary-200 focus:border-primary-500" />
              </div>
              <Button asChild type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg">
                <Link href="/dashboard">Register</Link>
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-primary-600 hover:underline">
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
