import { NextRequest, NextResponse } from "next/server";
import { getUserViaToken } from "./utils/get-user-via-token";


export default async function AdminMiddleware(req: NextRequest) {
    // Check if the request is for the admin path
    // Check if the user is authenticated
    const user = await getUserViaToken(req);

    console.log("AdminMiddleware - User:", user);

    if (!user.isAdmin) {
        // If the user is not an admin, redirect to unauthorized page
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    
    // Continue with the request
    return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*"], // Match admin paths and profile
};