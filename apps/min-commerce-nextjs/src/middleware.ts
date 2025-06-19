import {AxiomMiddleware,} from "@/lib/middleware";
import { parse } from "@/lib/middleware/utils";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import AdminMiddleware from "./lib/middleware/admin";
import AuthMiddleware from "./lib/middleware/auth";

  
  export const config = {
    matcher: [
      /*
       * Match all paths except for:
       * 1. /api/ routes
       * 2. /_next/ (Next.js internals)
       * 3. /_proxy/ (proxies for third-party services)
       * 4. Metadata files: favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest
       */
      "/((?!api/|_next/|_proxy/|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest).*)",
      "/admin/:path*",
      "/profile",
    ],
  };
  
  export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const { domain, path, key, fullKey } = parse(req);

    console.log("Middleware request:", {
        domain,
        path,
        key,
        fullKey,
    });
  
    AxiomMiddleware(req, ev);

    // ADMIN MIDDLEWARE
    // validate /admin path
    if (path.startsWith("/admin")) {
        return AdminMiddleware(req);
    }
    
    // AUTH MIDDLEWARE
    // validate protected routes
    if (path.startsWith("/admin") || path === "/profile") {
        return AuthMiddleware(req);
    }

    return NextResponse.next();
  }