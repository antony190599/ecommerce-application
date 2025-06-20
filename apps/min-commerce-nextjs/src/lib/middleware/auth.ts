import { NextRequest, NextResponse } from "next/server";
import { getUserViaToken } from "./utils/get-user-via-token";

export default async function AuthMiddleware(req: NextRequest) {
  const user = await getUserViaToken(req);
  
  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/profile"],
};
