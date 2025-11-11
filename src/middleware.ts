import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  const refreshToken = request.cookies.get("refresh_token")?.value ?? null;
  const isAuthenticated = Boolean(refreshToken);

  const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/verify"];

  const PROTECTED_ROUTES = [
    "/workspace",
    "/dashboard",
    "/profile",
    "/settings",
  ];

  const isLandingPage = pathname === "/";
  const isAuthRoute = AUTH_ROUTES.some((p) => pathname.startsWith(p));
  const isProtectedRoute = PROTECTED_ROUTES.some((p) => pathname.startsWith(p));

  // ✅ jika sudah login, buka "/" → redirect ke workspace
  if (isLandingPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  // ✅ sudah login tapi akses halaman auth → redirect
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/workspace", request.url));
  }

  // ✅ belum login tapi buka halaman protected → redirect
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
