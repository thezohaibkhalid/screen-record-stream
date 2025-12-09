import { NextRequest, NextResponse } from "next/server";
import aj, {detectBot, shield} from "@/lib/arcjet"
import {createMiddleware} from "@arcjet/next";

export async function middleware(request: NextRequest) {
  // Check for better-auth session cookie (Edge Runtime compatible)
  // Better-auth typically uses "better-auth.session_token" as the cookie name
  const sessionToken = 
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("session_token");
  
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  
  return NextResponse.next();
}
const validate = aj
    .withRule(shield({
     mode:"LIVE",
     }))
    .withRule(detectBot({mode: "LIVE", allow: ['CATEGORY:SEARCH_ENGINE', 'GOOGLE_CRAWLER']}))

export default createMiddleware(validate)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sign-in|assets).*)"],
};