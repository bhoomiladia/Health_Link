import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // ✅ Allow public routes (auth pages, home, API routes)
    if (
      pathname.startsWith("/api/auth") ||
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname === "/register"
    ) {
      return NextResponse.next();
    }

    // ✅ If token missing, redirect to login
    if (!req.nextauth?.token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(loginUrl);
    }

    // ✅ Allow the request
    return NextResponse.next();
  },
  {
    callbacks: {
      // Token is automatically added by NextAuth
      authorized: ({ token }) => !!token,
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
