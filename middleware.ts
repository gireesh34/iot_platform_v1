import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from 'jsonwebtoken'

// Move this to a config route that doesn't use Edge Runtime
export const config = {
  runtime: 'nodejs',
  matcher: [
    '/api/:path*',
    '/app/:path*'
  ]
}

export async function middleware(request: NextRequest) {
  // Skip auth check for login and signup routes
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  const token = request.headers.get("authorization")?.split(" ")[1]

  if (!token) {
    return NextResponse.json({ message: "Missing authentication token" }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
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

