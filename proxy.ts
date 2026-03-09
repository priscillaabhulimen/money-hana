import { NextRequest, NextResponse } from "next/server";
import { API_URL } from "@/lib/env";

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
  const refreshToken = request.cookies.get("refresh_token")?.value;

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

  // No access token but has refresh — attempt silent refresh
  if (refreshToken && isProtected(pathname)) {
    try {
      const res = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
      });

      if (res.ok) {
        const response = NextResponse.next();
        res.headers.getSetCookie().forEach((cookie) => {
          response.headers.append("Set-Cookie", cookie);
        });
        return response;
      }
    } catch {
      // Fall through to redirect
    }
  }

  // Protected route, no valid session → redirect to login
  if (isProtected(pathname)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};