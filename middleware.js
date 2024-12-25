import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname.startsWith("/auth/login");
  const isCookieExist = !!request.cookies.get("user_token");
  //   jika cookie TIDAK ada dan user sedang dihalaman private route => redirect ke '/auth/login'
  if (!isLoginPage && !isCookieExist) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (isCookieExist && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
