import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Move this to a config route that doesn't use Edge Runtime
export const config = {
  runtime: 'nodejs',
  matcher: '/api/:path*'
}

export function middleware(request: NextRequest) {
  const token = request.headers.get("authorization")?.split(" ")[1]

  if (!token) {
    return NextResponse.json({ message: "Missing authentication token" }, { status: 401 })
  }

  try {
    // Import JWT verification dynamically to avoid Edge Runtime issues
    const { verify } = require('jsonwebtoken')
    const decoded = verify(token, process.env.JWT_SECRET!)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("user", JSON.stringify(decoded))

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    return NextResponse.json({ message: "Invalid authentication token" }, { status: 401 })
  }
}

