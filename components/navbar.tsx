"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X, User } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  const user = session?.user

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-primary-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-primary-900">HealthLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/symptom-checker">Symptom Checker</NavLink>
            <NavLink href="/nearby-hospitals">Find Hospitals</NavLink>
            <NavLink href="/token">Token System</NavLink>
            <NavLink href="/dashboard">Dashboard</NavLink>
          </div>

          {/* Right Side - Auth or Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Button asChild variant="ghost" className="text-primary-700 hover:text-primary-900">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/profile" className="flex items-center gap-2 text-gray-700 hover:text-primary-700">
                  <User className="w-5 h-5" />
                  <span>{user.name?.split(" ")[0] || "Profile"}</span>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="border-primary-200 text-primary-700 hover:bg-primary-50"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-100">
            <div className="flex flex-col space-y-4">
              <NavLink href="/symptom-checker" mobile>Symptom Checker</NavLink>
              <NavLink href="/nearby-hospitals" mobile>Find Hospitals</NavLink>
              <NavLink href="/token" mobile>Token System</NavLink>
              <NavLink href="/dashboard" mobile>Dashboard</NavLink>

              {/* Auth / Profile for Mobile */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-primary-100">
                {!user ? (
                  <>
                    <Button asChild variant="ghost" className="text-primary-700 hover:text-primary-900">
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white">
                      <Link href="/register">Register</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 text-gray-700 hover:text-primary-700 px-3 py-2"
                    >
                      <User className="w-5 h-5" />
                      <span>{user.name?.split(" ")[0] || "Profile"}</span>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="border-primary-200 text-primary-700 hover:bg-primary-50"
                    >
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function NavLink({
  href,
  children,
  mobile = false,
}: {
  href: string
  children: React.ReactNode
  mobile?: boolean
}) {
  const baseClasses =
    "text-gray-700 hover:text-primary-600 transition-colors font-medium"
  const mobileClasses = mobile ? "block py-2" : ""

  return (
    <Link href={href} className={`${baseClasses} ${mobileClasses}`}>
      {children}
    </Link>
  )
}
