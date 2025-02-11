import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verify } from "jsonwebtoken"

export function middleware(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1]

  if (!token) {
    return NextResponse.json({ message: "Missing authentication token" }, { status: 401 })
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("user", JSON.stringify(decoded))
    requestHeaders.set('x-pathname', request.nextUrl.pathname)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    return NextResponse.json({ message: "Invalid authentication token" }, { status: 401 })
  }
}

export const config = {
  matcher: ["/api/drones/:path*", "/api/missions/:path*"],
}
