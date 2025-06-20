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
        const adminResult = AdminMiddleware(req);
        
        // Si el usuario está autenticado pero no tiene permisos de admin
        if (adminResult instanceof NextResponse && adminResult.status === 401) {
            // Redirigir a la página personalizada de no autorizado
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        
        return adminResult;
    }
    
    // AUTH MIDDLEWARE
    // validate protected routes
    if (path === "/profile") {
        const authResult = AuthMiddleware(req);
        
        // Si hay un problema de autorización pero el usuario está autenticado
        if (authResult instanceof NextResponse && authResult.status === 401) {
            // Redirigir a la página personalizada de no autorizado
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        
        return authResult;
    }

    return NextResponse.next();
  }