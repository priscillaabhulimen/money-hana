import { NextRequest, NextResponse } from "next/server";

const PROTECTED = ["/dashboard", "/transactions", "/goals", "/insights"];
const AUTH_ROUTES = ["/login", "/register", "/verify-email", "/email-verified"];

function isProtected(pathname: string) {
  return PROTECTED.some((path) => pathname.startsWith(path));
}

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((path) => pathname.startsWith(path));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;

  if (!isProtected(pathname) && !isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  // Has access token — optimistic pass
  if (accessToken) {
    if (isAuthRoute(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protected route auth is validated client-side via /me and refresh-on-401.
  if (isProtected(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};