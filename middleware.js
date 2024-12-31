import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isCookieExist = !!request.cookies.get("user_token");
  const PUBLIC_ROUTES = ["/auth/login", "/auth/register"];
  //   jika cookie TIDAK ada dan user sedang dihalaman private route => redirect ke '/auth/login'
  if (!PUBLIC_ROUTES.includes(pathname) && !isCookieExist) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (isCookieExist && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
};
