import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authPaths = ["/login", "/register"];
const privatePaths = ["/me"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;

  // Nếu chưa đăng nhập thì redirect về trang login
  if (privatePaths.some((path) => path.startsWith(pathname)) && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Nếu đăng nhập rồi thì không vào được trang login/register
  if (authPaths.some((path) => path.startsWith(pathname)) && !!sessionToken) {
    return NextResponse.redirect(new URL("/me", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/me", "/login", "/register"],
};
