import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const isAuth = !!token;
  const isProtected = req.nextUrl.pathname.startsWith("/dashboard");

  if (isProtected && !isAuth) {
    return NextResponse.redirect(new URL("/SignIn", req.url));
  }

  return NextResponse.next();
}

// Only apply to specific routes
export const config = {
  matcher: ["/dashboard/:path*"],
};
