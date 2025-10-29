import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add additional middleware logic if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all routes except auth pages
        if (req.nextUrl.pathname.startsWith('/api/auth') || 
            req.nextUrl.pathname === '/login' ||
            req.nextUrl.pathname === '/register') {
          return true
        }
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/profile/:path*",
    "/api/user/:path*"
  ]
}