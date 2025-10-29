// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import AuthProvider from "@/components/providers/session-provider"
import { Toaster } from "sonner"

export const metadata: Metadata = {
  title: "HealthLink - Faster, Smarter Care",
  description:
    "Linking you to faster, smarter care. AI-powered symptom checking, real-time token generation, and location-based hospital suggestions.",
  generator: "v0.dev",
  icons: {     icon: "/placeholder.svg" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body
        className={`antialiased bg-gray-50 text-gray-900 ${GeistSans.variable} ${GeistMono.variable}`}
        suppressHydrationWarning
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
