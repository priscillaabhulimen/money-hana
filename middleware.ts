import { NextRequest, NextResponse } from "next/server";

// TODO Week 3: set this to false once real auth is wired up
const AUTH_ENABLED = false;

export function middleware(request: NextRequest) {
  if (!AUTH_ENABLED) return NextResponse.next();

  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const isProtected =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/transactions") ||
    pathname.startsWith("/goals");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/transactions/:path*", "/goals/:path*"],
};