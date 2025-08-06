import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md border-primary-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary-900">Welcome Back!</CardTitle>
            <CardDescription className="text-gray-600">Sign in to access your HealthLink account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="identifier" className="text-gray-700">Phone Number or Email</Label>
                <Input id="identifier" type="text" placeholder="e.g., +91 9876543210 or your@email.com" required className="border-primary-200 focus:border-primary-500" />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm text-primary-600 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required className="border-primary-200 focus:border-primary-500" />
              </div>
              <Button asChild type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg">
                <Link href="/dashboard">Sign In</Link>
              </Button>
              <Button variant="outline" className="w-full border-primary-200 text-primary-600 hover:bg-primary-50 py-2 rounded-lg">
                Sign In with OTP
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary-600 hover:underline">
                Register
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
