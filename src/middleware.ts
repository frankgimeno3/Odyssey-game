import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== "/" && request.cookies.get("odyssey-authenticated")?.value !== "session") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?)$).*)"],
};
