import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // kalau buka halaman admin tapi tidak punya token → redirect login
  if (isAdminRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // kalau buka login tapi sudah punya token → langsung ke dashboard
  if (req.nextUrl.pathname === "/login" && token) {
    const dashboardUrl = new URL("/admin/dashboard", req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};