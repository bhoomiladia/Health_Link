import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Allow public routes (login, signup, API auth)
    if (
      pathname.startsWith("/api/auth") ||
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/register" ||
      pathname === "/"
    ) {
      return NextResponse.next();
    }

    // If user is not authorized, redirect to login
    if (!req.nextauth?.token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Otherwise continue
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // only authorize if token exists
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/onboarding/:path*",
    "/profile/:path*",
    "/api/user/:path*",
  ],
};
